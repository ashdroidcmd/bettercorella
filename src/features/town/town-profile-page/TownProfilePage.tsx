'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { PageHero } from '../../../components/ui/PageHero'
import { Reveal } from '../../../components/ui/Reveal'
import { SectionHeading } from '../../../components/ui/SectionHeading'
import { SourceNote } from '../../../components/ui/SourceNote'
import { StatCard } from '../../../components/ui/StatCard'
import { city } from '../../../config/city'
import { formatNumber } from '../../../lib/utils'
import { timeline, timelineSourceUrl } from '../shared/data/timeline'

const PENDING = 'Pending verification'

export function TownProfilePage() {
  const facts: Array<[string, string]> = [
    ['Official name', city.officialName],
    ['Province and region', `${city.province}, ${city.region}`],
    ['Congressional district', city.district ?? PENDING],
    ['Income class', city.incomeClass ? `${city.incomeClass} class municipality` : PENDING],
    ['PSGC code', '0701215000'],
    ['Barangays', city.barangayCount === null ? PENDING : `${city.barangayCount} (all rural)`],
    ['Population (2020)', city.population2020 === null ? PENDING : formatNumber(city.population2020)],
    ['Patroness and fiesta', 'Nuestra Señora del Villar, April 27'],
    ['ZIP code', city.zip ?? PENDING],
  ]

  return (
    <>
      <PageHero
        eyebrow="Town profile"
        title={city.officialName}
        description={`${city.name} is a ${city.incomeClass ? `${city.incomeClass} class ` : ''}municipality in the ${city.district ?? `province of ${city.province}`}, ${city.region}${city.tagline ? `: ${city.tagline.charAt(0).toLowerCase()}${city.tagline.slice(1)}` : ''}.`}
        crumbs={[{ label: 'Town' }]}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard value={city.province} label="Province" note={city.region} />
          <StatCard
            value={city.population2024 === null ? 'Pending' : formatNumber(city.population2024)}
            label="Population"
            note={`${city.populationYear ?? 2024} Census of Population (PSA)`}
          />
          <StatCard
            value={city.landAreaKm2 === null ? 'Pending' : `${city.landAreaKm2} km²`}
            label="Land area"
            note="Provincial Government of Bohol"
          />
          <StatCard
            value={city.barangayCount === null ? 'Pending' : `${city.barangayCount} barangays`}
            label="Barangays"
            note="PSA Philippine Standard Geographic Code"
          />
        </div>
      </PageHero>

      <section>
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading eyebrow="Facts" title={`${city.name} at a glance`} />
          </Reveal>
          <dl className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {facts.map(([label, value]) => (
              <div key={label} className="border-b border-line pb-4">
                <dt className="text-xs font-bold uppercase tracking-[0.12em] text-ink-400">{label}</dt>
                <dd className={`mt-1 text-[15px] font-semibold leading-6 ${value === PENDING ? 'text-ink-400' : 'text-ink-900'}`}>
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {timeline.length ? (
        <section className="border-t border-line bg-surface">
          <div className="container-page py-12 sm:py-16">
            <Reveal>
              <SectionHeading eyebrow="History" title={`A short history of ${city.name}`} />
            </Reveal>
            <ol className="mt-8 space-y-0">
              {timeline.map((item) => (
                <li
                  key={item.year}
                  className="relative grid gap-2 border-l border-line pb-8 pl-6 last:pb-0 sm:grid-cols-[8rem_1fr] sm:gap-6"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-[7px] top-1.5 size-3 rounded-full border-2 border-white bg-brand-600 ring-1 ring-brand-200"
                  />
                  <p className="text-sm font-extrabold text-brand-700">{item.year}</p>
                  <div>
                    <h3 className="text-base font-bold text-ink-950">{item.title}</h3>
                    <p className="mt-1 max-w-3xl text-sm leading-6 text-ink-600">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      <section className="border-t border-line">
        <div className="container-page py-8">
          <SourceNote
            href="https://psa.gov.ph/classification/psgc/barangays/0701215000"
            linkLabel="PSA PSGC: Corella"
            links={[
              { href: 'https://bohol.gov.ph/about/municipalities/1st-district/corella/', label: 'Provincial Government of Bohol' },
              { href: timelineSourceUrl, label: 'History (official municipal website)' },
            ]}
          >
            {'Population, barangays and income class follow the PSA; district and land area follow the provincial government; history follows the official municipal website. Figures marked pending are added once they are verified.'}
          </SourceNote>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="container-page flex flex-wrap gap-3 py-10">
          {[
            { label: 'Barangays', href: '/government/barangays' },
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
