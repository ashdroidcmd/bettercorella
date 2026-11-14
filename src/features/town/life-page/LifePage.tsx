'use client'

import { PageHero } from '../../../components/ui/PageHero'
import { PendingSection } from '../../../components/ui/PendingSection'
import { city } from '../../../config/city'

export function LifePage() {
  return (
    <>
      <PageHero
        eyebrow="Discover the town"
        title="Life and tourism"
        description={`Festivals, culture, food and things to do in ${city.name}, ${city.province}.`}
        crumbs={[{ label: 'Town', href: '/town' }, { label: 'Life and tourism' }]}
      />
      <PendingSection
        topic="Festivals, attractions and local culture"
        source="They will come from official municipal and Bohol provincial tourism sources."
        links={[
          {
            label: 'Provincial Government of Bohol',
            href: 'https://bohol.gov.ph',
            description: 'Provincial tourism programs, events and advisories for visitors.',
          },
          {
            label: 'Department of Tourism',
            href: 'https://beta.tourism.gov.ph',
            description: 'National tourism information and accredited establishments.',
          },
        ]}
      />
    </>
  )
}
