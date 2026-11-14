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
        topic="Investment information and a local business guide"
        source="Business permit services are already listed under Services from the Citizen's Charter; investment details will come from the municipal government."
        links={[
          {
            label: 'Corella business permit services',
            href: '/services/business',
            description: "New and renewal business permit requirements from the Corella Citizen's Charter 2026.",
          },
          {
            label: 'Corella Online Business Permit Application',
            href: 'https://bpbc3.ibpls.com/corellabohol',
            description: 'Apply for or renew a business permit online, linked from the official municipal website.',
          },
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
