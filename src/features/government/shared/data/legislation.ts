export type LegislationKind = 'Ordinance' | 'Executive Order' | 'Proposed Ordinance'
export type LegislationStatus = 'Enacted' | 'Issued' | 'Proposed'

export interface LegislationItem {
  id: string
  number: string
  title: string
  kind: LegislationKind
  status: LegislationStatus
  year: number
  summary: string
  sourceUrl: string
}

export interface LegislationSource {
  label: string
  href: string
  coverage: string
}

// Set to the official Sangguniang Bayan page once confirmed.
export const legislationSourceUrl: string | null = null

export const legislationSources: LegislationSource[] = []

export const legislation: LegislationItem[] = []
