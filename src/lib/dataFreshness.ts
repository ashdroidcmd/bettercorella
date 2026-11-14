import { barangays } from '../features/government/shared/data/barangays.ts'
import { city } from '../config/city.ts'
import { offices } from '../features/government/shared/data/offices.ts'
import { officials } from '../features/government/shared/data/officials.ts'
import { services } from '../features/services/shared/data/services.ts'
import { bidResults } from '../features/transparency/shared/data/bidDocs.ts'
import { budgetDocs } from '../features/transparency/shared/data/budgetDocs.ts'
import { cityElections } from '../features/government/shared/data/elections.ts'
import { hotlines } from '../features/government/shared/data/hotlines.ts'
import { legislation } from '../features/government/shared/data/legislation.ts'
import { news, newsLastVerified } from '../features/news/shared/data/news.ts'
import { onlineServices } from '../features/services/shared/data/onlineServices.ts'
import { openDataSources } from '../features/transparency/shared/data/openData.ts'
import { places } from '../features/town/shared/data/places.ts'
import { dpwhProjects } from '../features/transparency/shared/data/projects.ts'

export interface DataFreshnessRow {
  dataset: string
  source: string
  recordCount: number
  lastVerified: string | null
  reviewEveryDays: number
}

export interface DataFreshnessResult extends DataFreshnessRow {
  ageDays: number | null
  /** `pending`: no Corella records yet (waiting for a verified source). */
  status: 'current' | 'stale' | 'unknown' | 'pending'
}

function oldestVerificationDate(records: Array<{ lastVerified: string }>) {
  return records.map((record) => record.lastVerified).sort()[0] ?? null
}

/**
 * Datasets maintained by hand. When you add or re-check records, update `lastVerified` (ISO date)
 * and keep `source` pointing at the official origin.
 */
export const manuallyMaintainedData: DataFreshnessRow[] = [
  {
    dataset: 'LGU profile',
    source: 'PSA (population, land area), DILG and LGU (contacts)',
    recordCount: city.population2024 === null && city.address === null ? 0 : 1,
    lastVerified: city.lastVerified,
    reviewEveryDays: 365,
  },
  {
    dataset: 'Service charter records',
    source: "Municipal Citizen's Charter",
    recordCount: services.length,
    lastVerified: oldestVerificationDate(services),
    reviewEveryDays: 365,
  },
  {
    dataset: 'Municipal office directory',
    source: "Municipal office directory and Citizen's Charter",
    recordCount: offices.length,
    lastVerified: null,
    reviewEveryDays: 180,
  },
  {
    dataset: 'Elected officials',
    source: 'Official municipal sources and COMELEC',
    recordCount: officials.length,
    lastVerified: null,
    reviewEveryDays: 90,
  },
  {
    dataset: 'Barangays',
    source: 'PSA PSGC and census; DILG barangay officials directory',
    recordCount: barangays.length,
    lastVerified: null,
    reviewEveryDays: 180,
  },
  {
    dataset: 'Election history',
    source: 'BetterGov OpenHalalan dataset and COMELEC results',
    recordCount: cityElections.length,
    lastVerified: null,
    reviewEveryDays: 365,
  },
  {
    dataset: 'News',
    source: 'Official municipal announcements',
    recordCount: news.length,
    lastVerified: news.length ? newsLastVerified : null,
    reviewEveryDays: 14,
  },
  {
    dataset: 'Legislation',
    source: 'Sangguniang Bayan and municipal executive orders',
    recordCount: legislation.length,
    lastVerified: null,
    reviewEveryDays: 30,
  },
  {
    dataset: 'Emergency hotlines',
    source: 'National hotlines (911, 8888); local numbers pending LGU verification',
    recordCount: hotlines.length,
    lastVerified: '2026-11-14',
    reviewEveryDays: 90,
  },
  {
    dataset: 'Online services',
    source: 'National e-government portals; links checked November 14, 2026',
    recordCount: onlineServices.length,
    lastVerified: '2026-11-14',
    reviewEveryDays: 90,
  },
  {
    dataset: 'Bid results',
    source: 'PhilGEPS and municipal Bids and Awards Committee postings',
    recordCount: bidResults.length,
    lastVerified: null,
    reviewEveryDays: 90,
  },
  {
    dataset: 'Budget documents',
    source: 'DILG Full Disclosure Policy portal and BLGF',
    recordCount: budgetDocs.length,
    lastVerified: null,
    reviewEveryDays: 180,
  },
  {
    dataset: 'DPWH projects',
    source: 'BetterGov extract of DPWH infrastructure projects',
    recordCount: dpwhProjects.length,
    lastVerified: null,
    reviewEveryDays: 180,
  },
  {
    dataset: 'Places directory',
    source: 'Government and institutional directories',
    recordCount: places.length,
    lastVerified: null,
    reviewEveryDays: 90,
  },
  {
    dataset: 'Open-data source registry',
    source: 'National datasets on data.bettergov.ph; each keeps its own upstream dates',
    recordCount: openDataSources.length,
    lastVerified: '2026-11-14',
    reviewEveryDays: 180,
  },
]

export function getDataFreshness(asOf = new Date()): DataFreshnessResult[] {
  const today = Date.UTC(asOf.getUTCFullYear(), asOf.getUTCMonth(), asOf.getUTCDate())

  return manuallyMaintainedData.map((row) => {
    if (row.recordCount === 0) return { ...row, ageDays: null, status: 'pending' }
    if (!row.lastVerified) return { ...row, ageDays: null, status: 'unknown' }

    const verifiedDate = new Date(`${row.lastVerified}T00:00:00Z`)
    if (Number.isNaN(verifiedDate.getTime())) return { ...row, ageDays: null, status: 'unknown' }

    const ageDays = Math.max(0, Math.floor((today - verifiedDate.getTime()) / 86_400_000))
    return {
      ...row,
      ageDays,
      status: ageDays > row.reviewEveryDays ? 'stale' : 'current',
    }
  })
}

export function formatDataFreshnessReport(asOf = new Date()) {
  const report = getDataFreshness(asOf)
  const lines = [
    'Manual data freshness',
    ...report.map((row) => {
      if (row.status === 'pending') return `- PENDING: ${row.dataset} — no records yet; source: ${row.source}`
      const verified = row.lastVerified ? `${row.lastVerified} (${row.ageDays} days ago)` : 'not recorded'
      const count = `${row.recordCount} ${row.recordCount === 1 ? 'record' : 'records'}`
      return `- ${row.status.toUpperCase()}: ${row.dataset} — ${count}; verified ${verified}; source: ${row.source}`
    }),
  ]
  return lines.join('\n')
}
