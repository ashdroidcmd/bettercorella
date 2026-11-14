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

export const legislationSourceUrl = 'https://inabanga.gov.ph/sangguniang-bayan/'

export const legislationSources: LegislationSource[] = [
  {
    label: 'Municipal ordinances',
    href: 'https://inabanga.gov.ph/sangguniang-bayan/',
    coverage: 'Enacted municipal ordinances enacted by the Sangguniang Bayan of Inabanga.',
  },
  {
    label: 'Proposed ordinances',
    href: 'https://inabanga.gov.ph/sangguniang-bayan/',
    coverage: 'Draft legislative measures currently under committee review.',
  },
  {
    label: 'Resolutions',
    href: 'https://inabanga.gov.ph/sangguniang-bayan/',
    coverage: 'Municipal resolutions passed during regular legislative sessions.',
  },
  {
    label: 'Executive orders',
    href: 'https://inabanga.gov.ph/transparency/',
    coverage: 'Executive orders issued by the Municipal Mayor of Inabanga, Bohol.',
  },
  {
    label: 'Full disclosure records',
    href: 'https://inabanga.gov.ph/transparency/',
    coverage: 'Historical and statutory disclosure archives of the Municipal Government.',
  },
]

export const legislation: LegislationItem[] = [
  {
    id: 'ordinance-2026-08',
    number: 'Municipal Ordinance No. 2026-08',
    title: 'Raffia Weavers & Loomcraft Livelihood Code',
    kind: 'Ordinance',
    status: 'Enacted',
    year: 2026,
    summary:
      'Institutionalizes municipal support, artisan training, market linkage, and welfare protection for raffia handloom weavers in Inabanga.',
    sourceUrl: 'https://inabanga.gov.ph/sangguniang-bayan/',
  },
  {
    id: 'ordinance-2026-07',
    number: 'Municipal Ordinance No. 2026-07',
    title: 'Inabanga River Eco-Tourism and Watershed Management Code',
    kind: 'Ordinance',
    status: 'Enacted',
    year: 2026,
    summary:
      'Regulates river cruise navigation, bank easement protection, and conservation measures along the Inabanga River basin.',
    sourceUrl: 'https://inabanga.gov.ph/sangguniang-bayan/',
  },
  {
    id: 'ordinance-2026-06',
    number: 'Municipal Ordinance No. 2026-06',
    title: 'Social Welfare & Burial Assistance (Pakikiramay)',
    kind: 'Ordinance',
    status: 'Enacted',
    year: 2026,
    summary:
      'Strengthens municipal financial assistance and compassionate funeral support for indigent families across all 50 barangays.',
    sourceUrl: 'https://inabanga.gov.ph/sangguniang-bayan/',
  },
  {
    id: 'proposed-2026-01',
    number: 'Draft Ordinance No. 2026-01',
    title: 'Real Property Tax (Amilyar) Amnesty Code',
    kind: 'Proposed Ordinance',
    status: 'Proposed',
    year: 2026,
    summary:
      'Proposes temporary condonation of penalties, interests, and surcharges on delinquent real property taxes to stimulate local economic recovery.',
    sourceUrl: 'https://inabanga.gov.ph/sangguniang-bayan/',
  },
  {
    id: 'ordinance-2025-22',
    number: 'Municipal Ordinance No. 2025-22',
    title: 'Barangay Disaster Risk Auxiliary Brigades',
    kind: 'Ordinance',
    status: 'Enacted',
    year: 2025,
    summary:
      'Establishes community-level emergency first-responder auxiliary brigades in every barangay, coordinated with the MDRRMO.',
    sourceUrl: 'https://inabanga.gov.ph/sangguniang-bayan/',
  },
  {
    id: 'ordinance-2025-21',
    number: 'Municipal Ordinance No. 2025-21',
    title: 'Danajon Bank Marine Sanctuary Protection',
    kind: 'Ordinance',
    status: 'Enacted',
    year: 2025,
    summary:
      'Delineates municipal water protection zones, penalizes illegal fishing, and promotes sustainable seaweed cultivation in island barangays.',
    sourceUrl: 'https://inabanga.gov.ph/sangguniang-bayan/',
  },
  {
    id: 'executive-order-61-2026',
    number: 'Executive Order No. 61-2026',
    title: 'MDRRMC Reconstitution and Disaster Contingency Protocol',
    kind: 'Executive Order',
    status: 'Issued',
    year: 2026,
    summary:
      'Reconstitutes the Municipal Disaster Risk Reduction and Management Council under Mayor Dexter M. Ancla, defining seasonal flood contingency operations.',
    sourceUrl: 'https://inabanga.gov.ph/transparency/',
  },
  {
    id: 'executive-order-60-2026',
    number: 'Executive Order No. 60-2026',
    title: 'Municipal Agriculture and Fisheries Modernization Committee',
    kind: 'Executive Order',
    status: 'Issued',
    year: 2026,
    summary:
      'Convenes a multi-sectoral technical working group to accelerate farm mechanization, irrigation canal repairs, and cold storage access.',
    sourceUrl: 'https://inabanga.gov.ph/transparency/',
  },
  {
    id: 'executive-order-59-2026',
    number: 'Executive Order No. 59-2026',
    title: 'Municipal Poverty Reduction and Cooperative Action Team',
    kind: 'Executive Order',
    status: 'Issued',
    year: 2026,
    summary:
      'Coordinates livelihood programs, micro-enterprise seed grants, and training for rural women and artisanal weaving associations.',
    sourceUrl: 'https://inabanga.gov.ph/transparency/',
  },
  {
    id: 'executive-order-58-2026',
    number: 'Executive Order No. 58-2026',
    title: 'Port of U-og Facility Audit and Port Operations Team',
    kind: 'Executive Order',
    status: 'Issued',
    year: 2026,
    summary:
      'Creates an operational monitoring task force to inspect maritime facilities, passenger boarding safety, and cargo logistics at Port of U-og.',
    sourceUrl: 'https://inabanga.gov.ph/transparency/',
  },
  {
    id: 'executive-order-57-2026',
    number: 'Executive Order No. 57-2026',
    title: 'Municipal Incident Management Team (MIMT) Mobilization',
    kind: 'Executive Order',
    status: 'Issued',
    year: 2026,
    summary:
      'Activates the Municipal Incident Management Team for unified typhoon and flash-flood response across low-lying river delta barangays.',
    sourceUrl: 'https://inabanga.gov.ph/transparency/',
  },
  {
    id: 'executive-order-56-2026',
    number: 'Executive Order No. 56-2026',
    title: 'Inabanga River Dike Inspection and Flood Mitigation Task Force',
    kind: 'Executive Order',
    status: 'Issued',
    year: 2026,
    summary:
      'Directs the Municipal Engineering Office and MDRRMO to conduct joint structural monitoring of river protection dikes and seawalls.',
    sourceUrl: 'https://inabanga.gov.ph/transparency/',
  },
  {
    id: 'executive-order-54-2026',
    number: 'Executive Order No. 54-2026',
    title: 'Municipal Tertiary Scholarship Board Reconstitution',
    kind: 'Executive Order',
    status: 'Issued',
    year: 2026,
    summary:
      'Expands educational scholarship grants and technical-vocational allowances for deserving college students across Inabanga.',
    sourceUrl: 'https://inabanga.gov.ph/transparency/',
  },
  {
    id: 'executive-order-53-2026',
    number: 'Executive Order No. 53-2026',
    title: 'PRAISE Committee for Civil Service Excellence',
    kind: 'Executive Order',
    status: 'Issued',
    year: 2026,
    summary:
      'Reconstitutes the Program on Awards and Incentives for Service Excellence to recognize exemplary municipal employees and barangay leaders.',
    sourceUrl: 'https://inabanga.gov.ph/transparency/',
  },
]
