'use client'

import { ArrowRight, ArrowUpRight, Building2, MapPin, Phone, Users } from 'lucide-react'
import Link from 'next/link'
import { OfficeCard } from '../shared/components/OfficeCard'
import { OfficialCard } from '../shared/components/OfficialCard'
import { ComingSoon } from '../../../components/ui/ComingSoon'
import { PageHero } from '../../../components/ui/PageHero'
import { Reveal } from '../../../components/ui/Reveal'
import { SectionHeading } from '../../../components/ui/SectionHeading'
import { SourceNote } from '../../../components/ui/SourceNote'
import { barangays } from '../shared/data/barangays'
import { city } from '../../../config/city'
import { hotlines } from '../shared/data/hotlines'
import { offices } from '../shared/data/offices'
import { officials } from '../shared/data/officials'
import { formatNumber, telHref } from '../../../lib/utils'

const quickLinks = [
  { label: 'Municipal officials', count: officials.length, note: 'profiles', href: '/government/officials', icon: Users },
  { label: 'Offices', count: offices.length, note: 'departments', href: '/government/offices', icon: Building2 },
  { label: 'Barangays', count: barangays.length, note: 'communities', href: '/government/barangays', icon: MapPin },
  { label: 'Hotlines', count: undefined, note: 'Emergency contacts', href: '/government/hotlines', icon: Phone },
]

const featuredOfficeSlugs = [
  'office-of-the-city-treasurer',
  'local-economic-and-business-development-office',
  'civil-registrar-s-office',
  'city-health-office',
  'city-social-welfare-and-development-office',
  'office-of-the-city-engineer',
]

export function GovernmentPage() {

  const mayor = officials.find((official) => official.role === 'Municipal Mayor')
  const viceMayor = officials.find((official) => official.role === 'Municipal Vice Mayor')
  const councilors = officials.filter((official) => official.role === 'Sangguniang Bayan Member').slice(0, 4)
  const featuredOffices = featuredOfficeSlugs
    .map((slug) => offices.find((office) => office.slug === slug))
    .filter((office) => office !== undefined)
  const topBarangays = [...barangays].sort((a, b) => b.population2024 - a.population2024).slice(0, 5)
  const keyHotlines = hotlines.slice(0, 4)

  return (
    <>
      <PageHero
        eyebrow="Municipal government"
        title="Who runs the town, and how to reach them"
        description={`The Municipality of ${city.name} is led by an elected mayor, vice mayor, and Sangguniang Bayan, supported by municipal offices and barangays.`}
        crumbs={[{ label: 'Government' }]}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
               
                className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float"
              >
                <span className="flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-ink-950 group-hover:text-brand-700">
                      {item.label}
                    </span>
                    <span className="block text-xs text-ink-500">{item.count === undefined ? item.note : item.count ? `${item.count} ${item.note}` : 'Coming soon'}</span>
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 text-ink-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-700"
                />
              </Link>
            )
          })}
        </div>
      </PageHero>

      <section>
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Municipal leadership"
              title="Your elected officials"
              description="The mayor and vice mayor lead the executive branch; the Sangguniang Bayan handles legislation."
              action={
                <Link
                  href="/government/officials"
                 
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition hover:text-brand-800"
                >
                  {"All officials"}<ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              }
            />
          </Reveal>

          {!mayor && !viceMayor && !councilors.length ? (
            <div className="mt-8">
              <ComingSoon topic="Elected municipal officials" source="They will come from official municipal sources and COMELEC results." />
            </div>
          ) : null}

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {mayor ? (
              <Reveal>
                <OfficialCard official={mayor} featured />
              </Reveal>
            ) : null}
            {viceMayor ? (
              <Reveal delay={0.06}>
                <OfficialCard official={viceMayor} featured />
              </Reveal>
            ) : null}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {councilors.map((official) => (
              <OfficialCard key={official.slug} official={official} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Departments and offices"
              title="Where municipal work happens"
              description="From business permits to health services, these are the offices residents visit most."
              action={
                <Link
                  href="/government/offices"
                 
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition hover:text-brand-800"
                >
                  {"All offices"}<ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              }
            />
          </Reveal>

          {featuredOffices.length ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredOffices.map((office) => (
                <OfficeCard key={office.slug} office={office} />
              ))}
            </div>
          ) : (
            <div className="mt-8">
              <ComingSoon topic="Municipal offices and their contacts" source="They will come from the municipal office directory and Citizen's Charter." />
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="container-page py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <Reveal>
                <SectionHeading
                  eyebrow="Barangays"
                  title="The town, community by community"
                  description={barangays.length ? `${city.name} has ${barangays.length} barangays. These are the five largest by population.` : `The barangays of ${city.name}, with population and officials.`}
                  action={
                    <Link
                      href="/government/barangays"
                     
                      className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition hover:text-brand-800"
                    >
                      {"All barangays"}<ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                  }
                />
              </Reveal>

              {topBarangays.length ? (
              <ol className="mt-6 divide-y divide-line rounded-2xl border border-line bg-white shadow-card">
                {topBarangays.map((barangay, index) => (
                  <li key={barangay.slug}>
                    <Link
                      href={`/government/barangays/${barangay.slug}`}
                     
                      className="group flex items-center gap-4 px-5 py-4 transition hover:bg-surface"
                    >
                      <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-surface text-xs font-extrabold text-ink-500">
                        {index + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-bold text-ink-950 group-hover:text-brand-700">
                          {barangay.name}
                        </span>
                        <span className="block text-xs text-ink-500">
                          {barangay.district} {"· Rank"}{' '}{barangay.rank} {`of ${barangays.length}`}</span>
                      </span>
                      <span className="shrink-0 text-sm font-bold text-ink-700">
                        {formatNumber(barangay.population2024)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
              ) : (
                <div className="mt-6">
                  <ComingSoon topic="Barangays" source="Names and populations will come from the PSA." />
                </div>
              )}
            </div>

            <Reveal delay={0.08}>
              <div className="h-full rounded-2xl border border-line bg-ink-950 p-6 text-white shadow-card sm:p-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">{"Emergency contacts"}</p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight">{"Help, without the guesswork"}</h2>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  {"National emergency lines now; local MDRRMO, police and fire contacts once they are verified."}</p>

                <div className="mt-6 space-y-3">
                  {keyHotlines.map((hotline) => (
                    <div key={hotline.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.1em] text-brand-300">{hotline.label}</p>
                      <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                        {hotline.numbers.map((number) => (
                          <a
                            key={number}
                            href={telHref(number)}
                            className="text-lg font-extrabold tracking-tight text-white transition hover:text-brand-200"
                          >
                            {number}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs leading-5 text-white/55">
                  {"Call 911 for immediate emergencies anywhere in the Philippines."}</p>

                <Link
                  href="/government/hotlines"
                 
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-300 transition hover:text-white"
                >
                  {"All hotlines"}<ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="mt-8">
            <SourceNote href={city.website} linkLabel="Visit the official municipal website">
              {`Officials, office contacts and barangay records are added as they are verified with the Municipal Government of ${city.name}, the PSA and DILG. Details can change; use official directories for the latest information.`}</SourceNote>
          </div>
        </div>
      </section>
    </>
  )
}
