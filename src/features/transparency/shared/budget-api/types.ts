/**
 * The parts of the BetterGov.ph Budget API that the budget page reads. Field names are the API's.
 * Full reference: https://budget.bettergov.ph/docs and /api/v1/openapi.json.
 *
 * Ported from bettergovph/transparency-portal (MIT, https://github.com/bettergovph/transparency-portal).
 *
 * Rules the API keeps, and this site keeps too:
 * - Amounts are integer pesos. null means "this version has no such line", never zero.
 * - The NEP and the House bill are two versions of one budget: compare, never add.
 * - Pairings are candidates (leads for checking), never confirmed changes.
 */

/** The four programs the FY2027 House bill lists project by project. */
export type DatasetKey = 'dpwh' | 'fmr' | 'hfep' | 'nia'
export const DATASET_KEYS: readonly DatasetKey[] = ['dpwh', 'fmr', 'hfep', 'nia']

export type BridgeGroup = 'house_only' | 'nep_only' | 'unchanged' | 'increased' | 'decreased' | 'scope_review'
export const BRIDGE_GROUPS: readonly BridgeGroup[] = [
  'house_only',
  'nep_only',
  'unchanged',
  'increased',
  'decreased',
  'scope_review',
]

export type Version = 'nep' | 'hgab2' | 'hgab3' | 'api'

export interface Disclaimer {
  id: string
  title: string
  body: string
  url: string
}

export interface Meta {
  source_repo: string
  source_commit: string
  built_at: string
  notice: string
  [key: string]: unknown
}

export interface Envelope<T> {
  meta: Meta
  disclaimers: Disclaimer[]
  data: T
}

export interface GroupWords {
  label: string
  sub: string
  help: string
}

export interface DatasetInfo {
  key: DatasetKey
  label: string
  short: string
  bridge: { groups: Record<BridgeGroup, GroupWords> }
}

export interface Overview {
  record_versions: { key: Version; label: string }[]
  datasets: DatasetInfo[]
}

export interface ProjectRow {
  id: string
  dataset: DatasetKey
  title: string
  program: string | null
  pap: string | null
  region: string | null
  region_key: string | null
  office: string | null
  status_label: string
  bridge_group: BridgeGroup
  group_label: string
  held: boolean
  nep_php: number | null
  hgab2_php: number | null
  hgab3_php: number | null
  house_php: number | null
  api_php: number | null
  delta_php: number | null
  nep_page: number | null
  hgab2_page: number | null
  hgab3_page: number | null
  pdf_url: Partial<Record<Version, string | null>>
  lon: number | null
  lat: number | null
  url: string
  api_url: string
}

export interface Labelled {
  code: string
  label: string
  help?: string
}

export interface ProjectDetail extends ProjectRow {
  length_m: number | null
  labels: {
    status: Labelled
    match: Labelled | null
    reading: Labelled | null
    dpwh_site: Labelled | null
    flags: Labelled[]
  }
}

export interface ProjectList {
  total: number
  rows: ProjectRow[]
}

/** One DPWH office as a district page returns it. */
export interface DistrictOffice {
  id: string
  name: string
  tier: 'A' | 'B'
  tier_text: string
  years?: { fy: number; stage: string; stage_label: string; php: number | null }[]
}

export interface DistrictCard {
  id: string
  label: string
  region_key: string | null
  offices: DistrictOffice[]
  headline: { note: string }
  url: string
}

// GAA FY2020–2026 (/api/v1/gaa): the enacted budgets

/** The enacted years the API covers. */
export const GAA_YEARS = [2020, 2021, 2022, 2023, 2024, 2025, 2026] as const

/** Per year: how many lines carry the name, and their appropriation in pesos. */
export type GaaYears = Record<string, { count: number; amount: number }>

export interface GaaEnvelope<T> {
  meta: { matched?: number; [key: string]: unknown }
  data: T
  next_cursor?: string | null
}

export interface GaaDepartment {
  id: string
  description: string
}

/** A program, activity or project "family": the same name in one agency across the years. */
export interface GaaProgram {
  department_id: string
  agency_id: string
  fam_key: string
  name: string
  years: GaaYears
}
