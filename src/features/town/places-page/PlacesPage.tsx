'use client'

import { PageHero } from '../../../components/ui/PageHero'
import { PendingSection } from '../../../components/ui/PendingSection'
import { city } from '../../../config/city'

export function PlacesPage() {
  return (
    <>
      <PageHero
        eyebrow="Find your way"
        title="Places directory"
        description={`Government offices, health facilities, schools, markets and other everyday places in ${city.name}.`}
        crumbs={[{ label: 'Town', href: '/town' }, { label: 'Places directory' }]}
      />
      <PendingSection
        topic="Verified places"
        source="Each place will be checked against official government or institutional directories before it is listed."
        links={[
          {
            label: `Map of ${city.name}, ${city.province}`,
            href: `https://www.openstreetmap.org/search?query=${encodeURIComponent(`${city.name}, ${city.province}, Philippines`)}`,
            description: 'Open community map of the municipality on OpenStreetMap.',
          },
          {
            label: 'DOH health facility registry',
            href: 'https://nhfr.doh.gov.ph',
            description: 'National Health Facility Registry of hospitals, rural health units and barangay health stations.',
          },
        ]}
      />
    </>
  )
}
