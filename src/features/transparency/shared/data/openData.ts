export type OpenDataSourceGroup = 'integrated' | 'reference'

export interface OpenDataSource {
  id: string
  name: string
  publisher: string
  description: string
  coverage: string
  formats: string
  license: string
  href: string
  resourceHref?: string
  resourceLabel?: string
  localHref?: string
  localLabel?: string
  group: OpenDataSourceGroup
  note?: string
}

export const openDataPortalUrl = 'https://data.bettergov.ph/datasets'

// National open datasets that cover Corella. Entries move to the 'integrated' group (with a
// localHref) once a Corella extract has been checked and published on this site.
export const openDataSources: OpenDataSource[] = [
  {
    id: 'blgf',
    name: 'LGU fiscal data',
    publisher: 'Bureau of Local Government Finance',
    description:
      'Statements of receipts and expenditures, regular income, disaster funds, and special education fund reports for every LGU.',
    coverage: 'All LGUs, annual and quarterly reports',
    formats: 'XLSX, PDF',
    license: 'Public domain',
    href: 'https://data.bettergov.ph/datasets/9',
    group: 'reference',
  },
  {
    id: 'barangay-boundaries',
    name: 'Barangay boundaries',
    publisher: 'PSA and NAMRIA, curated by Manuel Balmeo',
    description:
      'Hierarchical GeoJSON boundaries for regions, provinces, municipalities, cities, and barangays, matched to PSGC codes.',
    coverage: 'All Philippine barangays, 2023 boundary version',
    formats: 'GeoJSON, ZIP',
    license: 'MIT',
    href: 'https://data.bettergov.ph/datasets/23',
    group: 'reference',
  },
  {
    id: 'openhalalan',
    name: 'Election winners',
    publisher: 'OpenHalalan',
    description:
      'Winning candidates in Philippine national and local elections, with vote counts for recent cycles.',
    coverage: '2001–2025 winners',
    formats: 'CSV',
    license: 'ODbL 1.0',
    href: 'https://data.bettergov.ph/datasets/25',
    group: 'reference',
  },
  {
    id: 'dpwh',
    name: 'DPWH infrastructure projects',
    publisher: 'Department of Public Works and Highways',
    description:
      'Contract-level records for national roads, bridges, flood control, buildings, and other public works.',
    coverage: 'Nationwide, 2016–2025',
    formats: 'Parquet',
    license: 'CC0 1.0',
    href: 'https://data.bettergov.ph/datasets/19',
    group: 'reference',
  },
  {
    id: 'philgeps',
    name: 'PhilGEPS awards',
    publisher: 'Philippine Government Electronic Procurement System',
    description:
      'Award notices, suppliers, contract amounts, and award dates from the government procurement portal.',
    coverage: 'Nationwide, 2016–2025',
    formats: 'Parquet',
    license: 'CC0 1.0',
    href: 'https://data.bettergov.ph/datasets/5',
    group: 'reference',
    note: 'Award notices are not a payment ledger.',
  },
  {
    id: 'noah',
    name: 'Hazard maps',
    publisher: 'Project NOAH, DOST',
    description:
      'Flood, landslide, and storm-surge hazard maps from Project NOAH, packaged as a national PMTiles archive.',
    coverage: 'Philippines, multi-hazard',
    formats: 'PMTiles',
    license: 'ODC-ODbL',
    href: 'https://data.bettergov.ph/datasets/22',
    group: 'reference',
    note: 'The national tile archive is about 5.2 GB, so the site links to it instead of embedding it.',
  },
  {
    id: 'coa',
    name: 'Audit agency index',
    publisher: 'Commission on Audit',
    description:
      'The Commission on Audit’s index of agencies with annual audit reports, including local government audit agencies.',
    coverage: 'Audit agency list, 2023',
    formats: 'PDF',
    license: 'Public domain',
    href: 'https://data.bettergov.ph/datasets/14',
    resourceHref:
      'https://www.coa.gov.ph/download/10/list-of-audit-agencies-with-annual-audit-reports/296/local-government-audit-agencies.pdf',
    resourceLabel: 'Local government audit agencies',
    group: 'reference',
    note: 'The dataset indexes audit agencies; it does not contain the full audit reports.',
  },
]
