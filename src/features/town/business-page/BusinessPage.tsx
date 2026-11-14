'use client'

import { PageHero } from '../../../components/ui/PageHero'
import { PendingSection } from '../../../components/ui/PendingSection'
import { city } from '../../../config/city'

export function BusinessPage() {
  return (
    <>
      <PageHero
        eyebrow="Build and invest"
        title="Business and investment"
        description={`Starting and running a business in ${city.name}: permits, local guidance and national business portals.`}
        crumbs={[{ label: 'Town', href: '/town' }, { label: 'Business and investment' }]}
      />
      <PendingSection
        topic="Local business permit steps, fees and investment information"
        source="They will come from the municipal Citizen's Charter and the Business Permits and Licensing Office."
        links={[
          {
            label: 'Central Business Portal',
            href: 'https://business.gov.ph/',
            description: 'Register and renew businesses and access national business permits online.',
          },
          {
            label: 'DTI Business Name Registration',
            href: 'https://bnrs.dti.gov.ph',
            description: 'Register a business name for a sole proprietorship with the Department of Trade and Industry.',
          },
          {
            label: 'Cities and Municipalities Competitiveness Index',
            href: 'https://cmci.dti.gov.ph',
            description: 'DTI rankings of LGU competitiveness: economy, government efficiency, infrastructure and resiliency.',
          },
        ]}
      />
    </>
  )
}
