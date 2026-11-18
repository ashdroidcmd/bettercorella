/**
 * What counts as Corella's in the national budget data. Every rule here is published on the budget
 * page, so a reader can check why a line is (or is not) listed.
 *
 * - FY2027 lines: the API's search needs every word in the title or listing, so "Corella Bohol"
 *   keeps New Corella, Davao del Norte out, and Region VII (Central Visayas) is kept as a backstop.
 * - GAA 2020–2026 lines: the GAA search is a plain substring match and carries no region, so it
 *   searches "Corella" and drops lines whose names point to New Corella, Davao del Norte.
 */
import type { DatasetKey } from './types.ts'
import { DATASET_KEYS } from './types.ts'

export interface PlaceQuery {
  /** What readers see. */
  label: string
  /** The FY2027 search: every word must appear in the line's title or listing. */
  q: string
  /** A region key to keep a common name to one region. Rows with no region stay. */
  region: string
  /** Programs to search. */
  datasets: readonly DatasetKey[]
}

/** A line removed by hand. Published with its reason on the budget page. */
export interface Exclusion {
  /** `<dataset>:<id>` for an FY2027 line, or `gaa:<family key>` for a GAA program. */
  key: string
  reason: string
}

export interface NameRule {
  /** Case-insensitive text; a GAA line whose name contains it is dropped. */
  contains: string
  reason: string
}

export interface BudgetPortalConfig {
  name: string
  place: PlaceQuery
  district: string
  gaa: { q: string; dropNames: NameRule[] }
  exclude: Exclusion[]
}

export const budgetPortal: BudgetPortalConfig = {
  name: 'Municipality of Corella, Bohol',
  place: { label: 'Corella', q: 'Corella Bohol', region: 'VII', datasets: DATASET_KEYS },
  /** Legislative district whose DPWH office serves Corella. */
  district: 'leg:bohol:1st',
  gaa: {
    q: 'Corella',
    dropNames: [
      { contains: 'New Corella', reason: 'New Corella is a different town, in Davao del Norte.' },
      { contains: 'Davao', reason: 'Corella, Bohol is in Central Visayas; lines naming Davao are elsewhere.' },
    ],
  },
  exclude: [],
}
