'use client'

import { ArrowRight, ArrowUpRight, Building2, Mail, Phone, Users } from 'lucide-react'
import Link from 'next/link'
import { OfficeCard } from '../shared/components/OfficeCard'
import { OfficialCard } from '../shared/components/OfficialCard'
import { ComingSoon } from '../../../components/ui/ComingSoon'
import { PageHero } from '../../../components/ui/PageHero'
import { Reveal } from '../../../components/ui/Reveal'
import { SectionHeading } from '../../../components/ui/SectionHeading'
import { SourceNote } from '../../../components/ui/SourceNote'
import { city } from '../../../config/city'
import { agencies, agenciesSourceUrl } from '../shared/data/agencies'
import { offices } from '../shared/data/offices'
import { officials } from '../shared/data/officials'
import { telHref } from '../../../lib/utils'

const quickLinks = [
  { label: 'Municipal officials', count: officials.length, note: 'profiles', href: '/government/officials', icon: Users },
  { label: 'Offices', count: offices.length, note: 'departments', href: '/government/offices', icon: Building2 },
  { label: 'Hotlines', count: undefined, note: 'Emergency contacts', href: '/contact#hotlines', icon: Phone },
]

const featuredOfficeSlugs = [
  'mayors-office',
  'treasurers-office',
  'civil-registrar',
  'health-office',
  'social-welfare-office',
  'engineering-office',
]

export function GovernmentPage() {

  const mayor = officials.find((official) => official.role === 'Municipal Mayor')
  const viceMayor = officials.find((official) => official.role === 'Municipal Vice Mayor')
  const councilors = officials.filter((official) => official.role === 'Sangguniang Bayan Member').slice(0, 4)
  const featuredOffices = featuredOfficeSlugs
    .map((slug) => offices.find((office) => office.slug === slug))
    .filter((office) => office !== undefined)

  return (
    <>
      <PageHero
        eyebrow="Municipal government"
        title="Who runs the town, and how to reach them"
        description={`The Municipality of ${city.name} is led by an elected mayor, vice mayor, and Sangguniang Bayan, supported by municipal offices and barangays.`}
        crumbs={[{ label: 'Government' }]}
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {quickLinks.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
               
                className="group flex items-center justify-between gap-3 rounded-2xl border border-white/15 bg-white/[0.06] p-4 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10"
              >
                <span className="flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-white/10 text-brand-300">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-white">
                      {item.label}
                    </span>
                    <span className="block text-xs text-white/60">{item.count === undefined ? item.note : item.count ? `${item.count} ${item.note}` : 'Coming soon'}</span>
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 text-white/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
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
          <Reveal>
            <SectionHeading
              eyebrow="National government agencies"
              title={`National agencies in ${city.name}`}
              description="Local offices of national agencies, with their heads as listed by the municipal government."
            />
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {agencies.map((agency) => (
              <article key={agency.slug} className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-700">{agency.agency}</p>
                <h3 className="mt-2 text-base font-extrabold leading-6 text-ink-950">{agency.officer}</h3>
                <p className="text-sm text-ink-500">{agency.position}</p>
                {agency.numbers.length || agency.email || agency.facebook ? (
                  <div className="mt-4 space-y-1.5 border-t border-line pt-4 text-sm">
                    {agency.numbers.map((number) => (
                      <a key={number} href={telHref(number)} className="flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-800">
                        <Phone aria-hidden="true" className="size-3.5 shrink-0" />
                        {number}
                      </a>
                    ))}
                    {agency.email ? (
                      <a href={`mailto:${agency.email}`} className="flex items-center gap-2 break-all text-ink-600 hover:text-brand-700">
                        <Mail aria-hidden="true" className="size-3.5 shrink-0" />
                        {agency.email}
                      </a>
                    ) : null}
                    {agency.facebook ? (
                      <a
                        href={agency.facebook.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-ink-600 hover:text-brand-700"
                      >
                        <ArrowUpRight aria-hidden="true" className="size-3.5 shrink-0" />
                        {`Facebook: ${agency.facebook.label}`}
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </article>
            ))}
          </div>

          <div className="mt-8">
            <SourceNote href={agenciesSourceUrl} linkLabel="See the National Government Agencies page">
              {`Officials, office heads and agency heads come from the Municipal Government of ${city.name}'s website, where most are published as photos; the names were read from those photos on November 17, 2026. Details can change; check with the office before relying on them.`}</SourceNote>
          </div>
        </div>
      </section>
    </>
  )
}
