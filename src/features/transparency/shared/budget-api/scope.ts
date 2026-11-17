/**
 * Turns the Corella scope (`portal.config.ts`) into the budget page's lists. Nothing is computed
 * that the API does not publish: amounts, statuses and labels are the API's, row for row.
 *
 * Ported from bettergovph/transparency-portal `src/lib/scope.ts` and `src/lib/gaa.ts`
 * (MIT, https://github.com/bettergovph/transparency-portal).
 */
import type { BudgetClient, Params } from './client.ts'
import { budgetPortal } from './portal.config.ts'
import type {
  BridgeGroup,
  DatasetInfo,
  DatasetKey,
  Disclaimer,
  DistrictCard,
  GaaProgram,
  GroupWords,
  Meta,
  ProjectDetail,
  ProjectRow,
  Version,
} from './types.ts'
import { BRIDGE_GROUPS, GAA_YEARS } from './types.ts'

export interface ScopedProject extends ProjectRow {
  /** `<dataset>:<id>`, the key exclusions use. */
  key: string
  /** URL-safe id for `/transparency/budget/<dataset>/<slug>` (API ids contain `:` and `|`). */
  slug: string
}

export interface QueryReport {
  dataset: DatasetKey
  params: Params
  region: string
  /** Rows the API returned. */
  total: number
  /** Rows kept after the region rule and exclusions. */
  kept: number
  truncated: boolean
  api: string
}

export interface ProjectsResult {
  projects: ScopedProject[]
  queries: QueryReport[]
  disclaimers: Disclaimer[]
  meta: Pick<Meta, 'source_repo' | 'source_commit' | 'built_at' | 'notice'>
}

export interface GaaRow extends GaaProgram {
  key: string
  department: string
}

export interface GaaResult {
  rows: GaaRow[]
  /** Per department with a match: what the API matched and what was kept. */
  queries: { department: string; matched: number; kept: number; api: string }[]
  /** Departments searched. */
  searched: number
  /** Lines dropped by a name rule, with the rule. */
  dropped: { name: string; department: string; reason: string }[]
}

export interface BudgetSnapshot {
  /** ISO time the snapshot was taken. */
  fetchedAt: string
  api: string
  fy2027: ProjectsResult
  /** Full API records for the detail pages, by project key. */
  details: Record<string, ProjectDetail>
  labels: {
    groups: Record<BridgeGroup, GroupWords>
    datasets: Pick<DatasetInfo, 'key' | 'label' | 'short'>[]
    versions: { key: Version; label: string }[]
  }
  district: { card: DistrictCard; disclaimers: Disclaimer[] } | null
  gaa: GaaResult
}

export const projectKey = (dataset: string, id: string) => `${dataset}:${id}`
export const projectSlug = (id: string) =>
  id
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

/** The FY2027 lines (NEP and House bill) whose titles name Corella, Bohol. */
export async function resolveProjects(client: BudgetClient): Promise<ProjectsResult> {
  const { place, exclude } = budgetPortal
  const datasets = place.datasets
  const params: Params = { q: place.q }
  const results = await Promise.all(datasets.map((d) => client.allProjects(d, params)))
  const excluded = new Set(exclude.map((e) => e.key))

  const byKey = new Map<string, ScopedProject>()
  const queries: QueryReport[] = []
  const disclaimers = new Map<string, Disclaimer>()
  let meta: ProjectsResult['meta'] | null = null

  for (const [i, dataset] of datasets.entries()) {
    const { list, rows: fetched, truncated } = results[i]!
    // The region is applied here, not by the API: some lists give no region, and the API's region
    // filter would drop every such row. A row with no region cannot be ruled out by region.
    const rows = fetched.filter(
      (r) =>
        (r.region_key == null || r.region_key === place.region) && !excluded.has(projectKey(r.dataset, r.id)),
    )
    meta ??= pickMeta(list.meta)
    for (const d of list.disclaimers) if (!disclaimers.has(d.id)) disclaimers.set(d.id, d)
    queries.push({
      dataset,
      params,
      region: place.region,
      total: list.data.total,
      kept: rows.length,
      truncated,
      api: client.href(`/datasets/${dataset}/projects`, params),
    })
    for (const row of rows) {
      const key = projectKey(row.dataset, row.id)
      if (!byKey.has(key)) byKey.set(key, { ...row, key, slug: projectSlug(row.id) })
    }
  }

  meta ??= pickMeta((await client.overview()).meta)
  const projects = [...byKey.values()].sort(
    (a, b) =>
      (b.house_php ?? -1) - (a.house_php ?? -1) || (b.nep_php ?? -1) - (a.nep_php ?? -1) || a.title.localeCompare(b.title),
  )
  return { projects, queries, disclaimers: [...disclaimers.values()], meta }
}

function pickMeta(m: Meta): ProjectsResult['meta'] {
  return { source_repo: m.source_repo, source_commit: m.source_commit, built_at: m.built_at, notice: m.notice }
}

/** The enacted budgets (GAA FY2020–2026): every department's programs whose names contain "Corella". */
export async function resolveGaa(client: BudgetClient): Promise<GaaResult> {
  const { q, dropNames } = budgetPortal.gaa
  const excluded = new Set(budgetPortal.exclude.map((e) => e.key))
  const departments = (await client.gaaDepartments()).data
  const results: Awaited<ReturnType<BudgetClient['gaaPrograms']>>[] = []
  // A few departments at a time; each department's pages come one after another.
  for (let i = 0; i < departments.length; i += 8) {
    results.push(...(await Promise.all(departments.slice(i, i + 8).map((d) => client.gaaPrograms(d.id, q)))))
  }

  const rows = new Map<string, GaaRow>()
  const queries: GaaResult['queries'] = []
  const dropped: GaaResult['dropped'] = []
  departments.forEach((department, i) => {
    const { first, rows: fetched } = results[i]!
    const matched = first.meta.matched ?? fetched.length
    if (!matched) return
    let kept = 0
    for (const r of fetched) {
      const rule = dropNames.find((n) => r.name.toLowerCase().includes(n.contains.toLowerCase()))
      if (rule) {
        dropped.push({ name: r.name, department: department.description, reason: rule.reason })
        continue
      }
      const key = `gaa:${r.fam_key}`
      if (excluded.has(key) || !hasYearAny(r)) continue
      kept++
      if (!rows.has(key)) rows.set(key, { ...r, key, department: department.description })
    }
    queries.push({
      department: department.description,
      matched,
      kept,
      api: client.href(`/api/v1/gaa/departments/${department.id}/programs`, { q }),
    })
  })

  const sorted = [...rows.values()].sort(
    (a, b) => lastYear(b) - lastYear(a) || latestAmount(b) - latestAmount(a) || a.name.localeCompare(b.name),
  )
  return { rows: sorted, queries: queries.sort((a, b) => b.kept - a.kept), searched: departments.length, dropped }
}

/** An appropriation in that year: an amount above zero (a count alone can be a line carried forward at ₱0). */
export function hasYear(r: GaaProgram, year: number | string): boolean {
  return (r.years[String(year)]?.amount ?? 0) > 0
}

function hasYearAny(r: GaaProgram) {
  return GAA_YEARS.some((y) => hasYear(r, y))
}

function lastYear(r: GaaProgram): number {
  for (let i = GAA_YEARS.length - 1; i >= 0; i--) if (hasYear(r, GAA_YEARS[i]!)) return GAA_YEARS[i]!
  return 0
}

function latestAmount(r: GaaProgram) {
  return r.years[String(lastYear(r))]?.amount ?? 0
}

/** "Department of Public Works and Highways (DPWH)" → "DPWH"; otherwise the name. */
export function departmentShort(description: string): string {
  return /\(([^)]+)\)\s*$/.exec(description)?.[1] ?? description
}

export interface GaaYearTotal {
  year: number
  programs: number
  amount: number
}

/** Per year: how many rows carry an appropriation, and the sum. Never added across years. */
export function gaaYearTotals(rows: readonly GaaProgram[]): GaaYearTotal[] {
  return GAA_YEARS.map((year) => {
    let programs = 0
    let amount = 0
    for (const r of rows) {
      if (hasYear(r, year)) {
        programs++
        amount += r.years[String(year)]!.amount
      }
    }
    return { year, programs, amount }
  })
}

export interface Cell {
  rows: number
  nep_php: number
  house_php: number
}

export interface Summary {
  rows: number
  /** Per version: rows that have an amount in it, and the sum. Never added across versions. */
  nep: { rows: number; php: number }
  house: { rows: number; php: number }
  groups: Record<BridgeGroup, Cell>
  byDataset: Partial<Record<DatasetKey, Cell>>
}

const emptyCell = (): Cell => ({ rows: 0, nep_php: 0, house_php: 0 })

export function summarise(rows: readonly ProjectRow[]): Summary {
  const s: Summary = {
    rows: rows.length,
    nep: { rows: 0, php: 0 },
    house: { rows: 0, php: 0 },
    groups: Object.fromEntries(BRIDGE_GROUPS.map((g) => [g, emptyCell()])) as Record<BridgeGroup, Cell>,
    byDataset: {},
  }
  for (const r of rows) {
    if (r.nep_php != null) {
      s.nep.rows++
      s.nep.php += r.nep_php
    }
    if (r.house_php != null) {
      s.house.rows++
      s.house.php += r.house_php
    }
    const g = (s.groups[r.bridge_group] ??= emptyCell())
    g.rows++
    g.nep_php += r.nep_php ?? 0
    g.house_php += r.house_php ?? 0
    const d = (s.byDataset[r.dataset] ??= emptyCell())
    d.rows++
    d.nep_php += r.nep_php ?? 0
    d.house_php += r.house_php ?? 0
  }
  return s
}
