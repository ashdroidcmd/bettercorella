'use client'

import { ArrowRight, MonitorSmartphone } from 'lucide-react'
import Link from 'next/link'
import { CategoryCard } from '../shared/components/CategoryCard'
import { PageHero } from '../../../components/ui/PageHero'
import { PendingPage } from '../../../components/ui/PendingPage'
import { Reveal } from '../../../components/ui/Reveal'
import { SectionHeading } from '../../../components/ui/SectionHeading'
import { SourceNote } from '../../../components/ui/SourceNote'
import { categories } from '../shared/data/categories'
import { city } from '../../../config/city'
import { services } from '../shared/data/services'

function ServicesPageContent() {
  return (
    <>
      <PageHero
        eyebrow="Municipal services"
        title="Every municipal service, in one place"
        description={`${services.length} services from the official Citizen’s Charter, grouped into ${categories.length} practical categories. Open a service for requirements, fees, forms, and the office that handles it.`}
        crumbs={[{ label: 'Services' }]}
      />

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
        <div className="container-page py-10 sm:py-12">
          <SourceNote href={city.citizensCharter} linkLabel="Open the official Citizens’ Charter">
            {"Service details are summarized from the Municipal Government’s Citizens’ Charter. Requirements, fees, and processing times can change. Confirm with the issuing office before your visit; each service record has its own verification date."}</SourceNote>
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
