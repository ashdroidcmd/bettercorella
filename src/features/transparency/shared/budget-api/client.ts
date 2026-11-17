/**
 * A small client for the BetterGov.ph Budget API (https://budget.bettergov.ph/docs). It runs in the
 * browser (live refresh) and in Node 22+ (`scripts/sync-budget.ts`), since both have `fetch`.
 * Every GET is memoised for the life of the page: the API is read-only and edge-cached.
 *
 * Ported from bettergovph/transparency-portal (MIT, https://github.com/bettergovph/transparency-portal).
 */
import type {
  DatasetKey,
  DistrictCard,
  Envelope,
  GaaDepartment,
  GaaEnvelope,
  GaaProgram,
  Overview,
  ProjectDetail,
  ProjectList,
  ProjectRow,
} from './types.ts'

export const BUDGET_API = 'https://budget.bettergov.ph'

/** The API's page-size ceiling for project lists. */
const PAGE_SIZE = 200
/** A place query that matches more than this is too broad to be one LGU's. */
const MAX_ROWS_PER_QUERY = 4000
const GAA_PAGE_SIZE = 500
const MAX_GAA_PROGRAMS = 6000

export type Params = Record<string, string | number | undefined>

const ROOT = '/api/v1/hgab/2027'

export interface BudgetClient {
  base: string
  /** Absolute URL for an API path, for "see the data" links. Paths not starting with /api/ are under /api/v1/hgab/2027. */
  href(path: string, params?: Params): string
  overview(): Promise<Envelope<Overview>>
  /** Every row matching the filters, fetched page by page. */
  allProjects(
    dataset: DatasetKey,
    filters: Params,
  ): Promise<{ list: Envelope<ProjectList>; rows: ProjectRow[]; truncated: boolean }>
  project(dataset: DatasetKey, id: string): Promise<Envelope<ProjectDetail>>
  district(id: string): Promise<Envelope<DistrictCard>>
  gaaDepartments(): Promise<GaaEnvelope<GaaDepartment[]>>
  /** Every GAA program family in one department whose name contains q, all years. */
  gaaPrograms(
    departmentId: string,
    q: string,
  ): Promise<{ first: GaaEnvelope<GaaProgram[]>; rows: GaaProgram[]; truncated: boolean }>
}

export function createBudgetClient(base: string = BUDGET_API, headers: Record<string, string> = {}): BudgetClient {
  const host = base.replace(/\/+$/, '')
  const cache = new Map<string, Promise<unknown>>()

  const href = (path: string, params: Params = {}) => {
    const url = new URL(path.startsWith('/api/') ? path : ROOT + path, host + '/')
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== '') url.searchParams.set(k, String(v))
    }
    return url.toString()
  }

  function json<T>(path: string, params: Params = {}): Promise<T> {
    const url = href(path, params)
    let hit = cache.get(url) as Promise<T> | undefined
    if (!hit) {
      hit = (async () => {
        const res = await fetch(url, { headers: { accept: 'application/json', ...headers } })
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${url}`)
        return (await res.json()) as T
      })()
      // A failed request must not stick: drop it so a retry fetches again.
      hit.catch(() => cache.delete(url))
      cache.set(url, hit)
    }
    return hit
  }

  const get = <T>(path: string, params: Params = {}) => json<Envelope<T>>(path, params)

  async function allProjects(dataset: DatasetKey, filters: Params) {
    const path = `/datasets/${dataset}/projects`
    const first = await get<ProjectList>(path, { ...filters, limit: PAGE_SIZE, offset: 0 })
    const total = Math.min(first.data.total, MAX_ROWS_PER_QUERY)
    const offsets: number[] = []
    for (let o = PAGE_SIZE; o < total; o += PAGE_SIZE) offsets.push(o)
    const pages: Envelope<ProjectList>[] = []
    for (let i = 0; i < offsets.length; i += 4) {
      const batch = offsets
        .slice(i, i + 4)
        .map((offset) => get<ProjectList>(path, { ...filters, limit: PAGE_SIZE, offset }))
      pages.push(...(await Promise.all(batch)))
    }
    const rows = [first, ...pages].flatMap((p) => p.data.rows)
    return { list: first, rows, truncated: first.data.total > MAX_ROWS_PER_QUERY }
  }

  async function gaaPrograms(departmentId: string, q: string) {
    const path = `/api/v1/gaa/departments/${departmentId}/programs`
    const first = await json<GaaEnvelope<GaaProgram[]>>(path, { q, limit: GAA_PAGE_SIZE })
    const rows = [...first.data]
    let cursor = first.next_cursor
    // The cursor chains pages, so they are fetched one after another.
    while (cursor && rows.length < MAX_GAA_PROGRAMS) {
      const page = await json<GaaEnvelope<GaaProgram[]>>(path, { q, limit: GAA_PAGE_SIZE, cursor })
      rows.push(...page.data)
      cursor = page.next_cursor
    }
    return { first, rows, truncated: Boolean(cursor) }
  }

  return {
    base: host,
    href,
    overview: () => get<Overview>(''),
    allProjects,
    project: (dataset, id) => get<ProjectDetail>(`/datasets/${dataset}/projects/${encodeURIComponent(id)}`),
    district: (id) => get<DistrictCard>(`/districts/${encodeURIComponent(id)}`),
    gaaDepartments: () => json<GaaEnvelope<GaaDepartment[]>>('/api/v1/gaa/departments'),
    gaaPrograms,
  }
}
