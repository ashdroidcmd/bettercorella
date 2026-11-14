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
        source="They will come from official municipal and Bohol provincial tourism sources. The town fiesta honors Nuestra Señora del Villar every April 27, and Corella is known as the home of the Philippine tarsier."
        links={[
          {
            label: 'What to see in Corella',
            href: 'https://corella-bohol.gov.ph/what-to-see/',
            description: 'Church plaza, Cristo Rey monument, old houses and the Spanish-period escuelas, from the official municipal website.',
          },
          {
            label: 'History of Corella',
            href: 'https://corella-bohol.gov.ph/history/',
            description: 'From Nug-as to the tarsier town of Bohol, on the official municipal website.',
          },
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
