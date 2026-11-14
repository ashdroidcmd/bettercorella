'use client'

import { PageHero } from '../../../components/ui/PageHero'
import { PendingSection } from '../../../components/ui/PendingSection'
import { city } from '../../../config/city'

export function ProcurementPage() {
  return (
    <>
      <PageHero
        eyebrow="Public funds"
        title="Procurement and bids"
        description={`Bids, contract awards and suppliers of the Municipal Government of ${city.name}, based on PhilGEPS and official Bids and Awards Committee postings.`}
        crumbs={[{ label: 'Transparency', href: '/transparency' }, { label: 'Procurement and bids' }]}
      />
      <PendingSection
        topic="Bid notices and contract awards"
        source="They will come from PhilGEPS and the municipal Bids and Awards Committee."
        links={[
          {
            label: 'PhilGEPS',
            href: 'https://www.philgeps.gov.ph',
            description: 'Search public bidding notices and award notices posted by government agencies, including LGUs.',
          },
          {
            label: 'PhilGEPS awards dataset',
            href: 'https://data.bettergov.ph/datasets/5',
            description: 'Award notices, suppliers and contract amounts as open data from BetterGov.',
          },
          {
            label: 'DPWH infrastructure dataset',
            href: 'https://data.bettergov.ph/datasets/19',
            description: 'Contract-level records of national public works projects as open data from BetterGov.',
          },
        ]}
      />
    </>
  )
}
