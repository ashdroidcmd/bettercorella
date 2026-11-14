'use client'

import { ArrowUpRight, CheckCircle2, ExternalLink, MonitorSmartphone } from 'lucide-react'
import Link from 'next/link'
import { PageHero } from '../../../components/ui/PageHero'
import { Reveal } from '../../../components/ui/Reveal'
import { SectionHeading } from '../../../components/ui/SectionHeading'
import { SourceNote } from '../../../components/ui/SourceNote'
import { city } from '../../../config/city'
import { onlineServices } from '../shared/data/onlineServices'

export function OnlineServicesPage() {

  return (
    <>
      <PageHero
        eyebrow="Online services"
        title="Do it online"
        description="Official government portals for business, jobs, procurement, and records. Every link opens the agency’s own portal in a new tab."
        crumbs={[{ label: 'Services', href: '/services' }, { label: 'Online services' }]}
      >
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-700">
            {onlineServices.length} {'official portals'}
          </span>
          <span className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-700">
            {'Accounts and fees are handled by each agency'}
          </span>
        </div>
      </PageHero>

      <section>
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Systems directory"
              title="Government portals and applications"
              description={`National portals any ${city.name} resident can use. Municipal online services will be added once they are verified; many transactions still require a visit to Municipal Hall.`}
            />
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {onlineServices.map((service, index) => (
              <Reveal key={service.slug} delay={(index % 3) * 0.05} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card">
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <MonitorSmartphone aria-hidden="true" className="size-5" />
                    </span>
                    <span className="rounded-full bg-surface px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-ink-500">
                      {service.category}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-extrabold tracking-tight text-ink-950">{service.name}</h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.1em] text-brand-700">
                    {service.shortName}
                  </p>
                  <p className="mt-2 flex-1 text-sm leading-6 text-ink-600">{service.description}</p>
                  {service.note ? (
                    <p className="mt-2 inline-flex items-start gap-1.5 text-xs leading-5 text-ink-500">
                      <CheckCircle2 aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-ink-400" />
                      {service.note}
                    </p>
                  ) : null}
                  {service.url.startsWith('/') ? (
                    <Link
                      href={service.url}
                      className="group mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition hover:text-brand-800"
                    >
                      {'View'} {service.shortName}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  ) : (
                    <a
                      href={service.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition hover:text-brand-800"
                    >
                      {'Open'} {service.shortName}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-line bg-surface p-5 sm:p-6">
            <h2 className="text-base font-extrabold tracking-tight text-ink-950">Prefer to transact in person?</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-600">
              {"The municipal Citizen’s Charter lists the requirements, fees, and steps for each service, including the office that handles it."}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/services"
               
                className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-800"
              >
                {"Browse municipal services"}<ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                href="/government/hotlines"
               
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-bold text-ink-700 transition hover:border-brand-200 hover:text-brand-700"
              >
                {"Call an office"}</Link>
            </div>
          </div>

          <div className="mt-8">
            <SourceNote href="https://e.gov.ph/" linkLabel="eGov PH">
              {"Government agencies publish and operate these systems. Accounts, payments, and data are handled by each agency, not by this guide. Check the official service page before submitting information or making payments."}</SourceNote>
          </div>

          <p className="mt-6 inline-flex items-start gap-2 text-xs leading-5 text-ink-500">
            <ExternalLink aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
            {"Links open official government portals in a new tab."}</p>
        </div>
      </section>
    </>
  )
}
