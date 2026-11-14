'use client'

import { ArrowRight, ArrowUpRight, ChevronDown, MonitorSmartphone, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { CategoryCard } from '../shared/components/CategoryCard'
import { CustomSelect } from '../../../components/ui/CustomSelect'
import { PageHero } from '../../../components/ui/PageHero'
import { PendingPage } from '../../../components/ui/PendingPage'
import { Reveal } from '../../../components/ui/Reveal'
import { SectionHeading } from '../../../components/ui/SectionHeading'
import { SourceNote } from '../../../components/ui/SourceNote'
import { categories } from '../shared/data/categories'
import { city } from '../../../config/city'
import { offices } from '../../government/shared/data/offices'
import { onlineServiceSlugs } from '../shared/data/onlineServices'
import { services } from '../shared/data/services'

const scenarios = [
  { label: 'Opening a business', href: '/services/business/bplo-service-issuance-of-business-permits-licenses-for-new' },
  { label: 'Getting a birth certificate', href: '/services/certificates/issuance-of-certification-certified-true-copy' },
  { label: 'Getting married', href: '/services/certificates/applying-for-marriage-license' },
  { label: 'Building or renovating', href: '/services/infrastructure/issuance-of-building-permit' },
  { label: 'Asking for financial help', href: '/services/social/assistance-in-crisis-situation' },
  { label: 'Paying property tax', href: '/services/taxes/real-property-tax' },
]

const officeOptions = offices
  .filter((office) => office.code)
  .sort((a, b) => a.name.localeCompare(b.name))

const channelOptions = [
  { value: 'G2C', label: 'Government to citizen (G2C)' },
  { value: 'G2B', label: 'Government to business (G2B)' },
  { value: 'G2G', label: 'Government to government (G2G)' },
]

function ServicesPageContent() {
  const [officeCode, setOfficeCode] = useState('')
  const [channel, setChannel] = useState('')
  const [onlineOnly, setOnlineOnly] = useState(false)

  const hasFilters = Boolean(officeCode || channel || onlineOnly)
  const filteredServices = useMemo(
    () =>
      services.filter((service) => {
        if (officeCode && service.officeCode !== officeCode) return false
        if (channel && !service.transactionType.includes(channel)) return false
        if (onlineOnly && !onlineServiceSlugs.includes(service.slug)) return false
        return true
      }),
    [officeCode, channel, onlineOnly],
  )

  function clearFilters() {
    setOfficeCode('')
    setChannel('')
    setOnlineOnly(false)
  }


  return (
    <>
      <PageHero
        eyebrow="Municipal services"
        title="Every municipal service, in one place"
        description={`${services.length} services from the official Citizen’s Charter, grouped into ${categories.length} practical categories. Open a service for requirements, fees, forms, and the office that handles it.`}
        crumbs={[{ label: 'Services' }]}
        overflowVisible
      >
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-400">Common situations</span>
            {scenarios.map((scenario) => (
              <Link
                key={scenario.href}
                href={scenario.href}
               
                className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-700 transition hover:border-brand-200 hover:text-brand-700"
              >
                {scenario.label}
              </Link>
            ))}
          </div>
        </div>
      </PageHero>

      <section>
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Browse by category"
              title="What do you need help with?"
              description="Start with the category that matches your transaction, then choose the exact service."
            />
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <Reveal key={category.slug} delay={(index % 3) * 0.05} className="h-full">
                <CategoryCard category={category} count={category.serviceCount} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-950 text-white">
        <div className="container-page flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-300">
              <MonitorSmartphone aria-hidden="true" className="size-5" />
            </span>
            <div>
              <h2 className="text-base font-extrabold tracking-tight">Some services can be done online</h2>
              <p className="mt-1 text-sm text-white/60">
                {'Apply for or renew a Corella business permit online, pay through Landbank, and use national portals for registration, jobs, and records.'}
              </p>
            </div>
          </div>
          <Link
            href="/online-services"
           
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/15"
          >
            {'Open online services'}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Full directory"
              title="All 242 services"
              description="Filter the directory by office, transaction type, or online availability, then expand a category."
            />
          </Reveal>

          <div className="mt-8 rounded-2xl border border-line bg-white p-4 shadow-card sm:p-5">
            <div className="flex flex-wrap items-end gap-3">
              <div className="flex min-w-[15rem] flex-1 flex-col gap-1.5">
                <label
                  htmlFor="office-filter"
                  className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-500"
                >
                  {'Office'}
                </label>
                <CustomSelect
                  id="office-filter"
                  label="Office"
                  value={officeCode}
                  options={[
                    { value: '', label: 'All offices' },
                    ...officeOptions.map((office) => ({ value: office.code ?? '', label: office.name })),
                  ]}
                  onChange={setOfficeCode}
                />
              </div>

              <div className="flex min-w-[13rem] flex-1 flex-col gap-1.5">
                <label
                  htmlFor="channel-filter"
                  className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-500"
                >
                  {'Transaction type'}
                </label>
                <CustomSelect
                  id="channel-filter"
                  label="Transaction type"
                  value={channel}
                  options={[
                    { value: '', label: 'All transaction types' },
                    ...channelOptions,
                  ]}
                  onChange={setChannel}
                />
              </div>

              <label className="inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-white px-3.5 text-sm font-semibold text-ink-700">
                <input
                  type="checkbox"
                  checked={onlineOnly}
                  onChange={(event) => setOnlineOnly(event.target.checked)}
                  className="size-4 accent-brand-700"
                />
                {'Online available'}
              </label>

              {hasFilters ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-line bg-white px-3.5 text-sm font-bold text-ink-600 transition hover:border-brand-200 hover:text-brand-700"
                >
                  {'Clear'}
                </button>
              ) : null}
            </div>
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-500" role="status">
              <SlidersHorizontal aria-hidden="true" className="size-3.5" />
              {filteredServices.length} {'of'} {services.length} {'services'} {'shown'}
            </p>
          </div>

          {filteredServices.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-line bg-white p-8 text-center">
              <p className="text-sm font-bold text-ink-800">No services match these filters.</p>
              <p className="mt-1 text-sm text-ink-500">Try a different office or transaction type.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-800"
              >
                {'Clear filters'}
              </button>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {categories.map((category) => {
                const items = filteredServices
                  .filter((service) => service.category === category.slug)
                  .sort((a, b) => a.title.localeCompare(b.title))

                if (!items.length) return null

                return (
                  <details key={category.slug} className="group rounded-2xl border border-line bg-white shadow-card">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-ink-950">{category.name}</h3>
                        <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">
                          {items.length} {(items.length === 1 ? 'service' : 'services')}
                        </p>
                      </div>
                      <span className="flex shrink-0 items-center gap-2 text-xs font-bold text-brand-700">
                        {'Open'}
                        <ChevronDown
                          aria-hidden="true"
                          className="size-4 transition duration-200 group-open:rotate-180"
                        />
                      </span>
                    </summary>
                    <div className="border-t border-line p-3 sm:p-4">
                      <div className="grid gap-1 sm:grid-cols-2">
                        {items.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${category.slug}/${service.slug}`}
                           
                            className="group/link flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-700 transition hover:bg-surface hover:text-brand-700"
                          >
                            <span className="line-clamp-2">{service.title}</span>
                            <ArrowUpRight
                              aria-hidden="true"
                              className="size-3.5 shrink-0 text-ink-400 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-brand-700"
                            />
                          </Link>
                        ))}
                      </div>
                      <div className="mt-2 px-3 pb-2">
                        <Link
                          href={`/services/${category.slug}`}
                         
                          className="text-xs font-bold text-brand-700 hover:text-brand-800"
                        >
                          {"View"}{' '}{category.shortName} {"category"}</Link>
                      </div>
                    </div>
                  </details>
                )
              })}
            </div>
          )}

          <div className="mt-8">
            <SourceNote href={city.citizensCharter} linkLabel="Open the official Citizens’ Charter">
              {"Service details are summarized from the Municipal Government’s Citizens’ Charter. Requirements, fees, and processing times can change. Confirm with the issuing office before your visit; each service record has its own verification date."}</SourceNote>
          </div>
        </div>
      </section>
    </>
  )
}

export function ServicesPage() {
  if (!services.length) {
    return (
      <PendingPage
      eyebrow="Municipal services"
      title="Municipal services, in one place"
      description={`Services of the Municipal Government of ${city.name}, grouped into practical categories, with requirements, fees, forms and the office that handles each one.`}
      crumbs={[{ label: 'Services' }]}
      topic="Citizen's Charter services"
      source="They will come from the municipal Citizen's Charter, which lists requirements, fees and processing times for every service."
      links={[
        { label: 'Online services', href: '/online-services', description: 'National e-government portals you can use now, from eGov PH to PhilJobNet.' },
        { label: 'eGov PH', href: 'https://e.gov.ph/', description: 'One app for national government services and selected local transactions.' },
      ]}
      />
    )
  }
  return <ServicesPageContent />
}
