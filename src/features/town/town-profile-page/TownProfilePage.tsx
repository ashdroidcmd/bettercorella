'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { PageHero } from '../../../components/ui/PageHero'
import { PendingSection } from '../../../components/ui/PendingSection'
import { StatCard } from '../../../components/ui/StatCard'
import { city } from '../../../config/city'
import { formatNumber } from '../../../lib/utils'

export function TownProfilePage() {
  return (
    <>
      <PageHero
        eyebrow="Town profile"
        title={city.officialName}
        description={`${city.name} is a municipality in the province of ${city.province}, ${city.region}. Its profile (population, land area, barangays, history) is added here as each figure is checked against an official source.`}
        crumbs={[{ label: 'Town' }]}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard value={city.province} label="Province" note={city.region} />
          <StatCard
            value={city.population2024 === null ? 'Pending' : formatNumber(city.population2024)}
            label="Population"
            note="PSA Census of Population"
          />
          <StatCard
            value={city.landAreaKm2 === null ? 'Pending' : `${city.landAreaKm2} km²`}
            label="Land area"
            note="PSA"
          />
          <StatCard
            value={city.barangayCount === null ? 'Pending' : `${city.barangayCount} barangays`}
            label="Barangays"
            note="PSA Philippine Standard Geographic Code"
          />
        </div>
      </PageHero>

      <PendingSection
        topic="Town facts, history and maps"
        source="Population, land area and barangays will come from the Philippine Statistics Authority (PSA); history and local context from official LGU and provincial sources."
        links={[
          {
            label: 'PSA Philippine Standard Geographic Code',
            href: 'https://psa.gov.ph/classification/psgc',
            description: 'The official list of municipalities and barangays, with their PSGC codes.',
          },
          {
            label: 'PSA Central Visayas (Region VII)',
            href: 'https://rsso07.psa.gov.ph',
            description: 'Census and population statistics for Bohol and its municipalities.',
          },
          {
            label: 'Provincial Government of Bohol',
            href: 'https://bohol.gov.ph',
            description: 'Provincial profile, programs and advisories.',
          },
        ]}
      />

      <section className="border-t border-line bg-surface">
        <div className="container-page flex flex-wrap gap-3 py-10">
          {[
            { label: 'Life and tourism', href: '/town/life' },
            { label: 'Places directory', href: '/town/places' },
            { label: 'Business and investment', href: '/town/business' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-bold text-brand-700 transition hover:border-brand-200 hover:bg-brand-50"
            >
              {link.label}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
