'use client'

import { ArrowRight, Database, FileSearch, Landmark, MapPin, Wallet } from 'lucide-react'
import Link from 'next/link'
import { PageHero } from '../../../components/ui/PageHero'
import { Reveal } from '../../../components/ui/Reveal'
import { SectionHeading } from '../../../components/ui/SectionHeading'
import { SourceNote } from '../../../components/ui/SourceNote'
import { budgetDocs } from '../shared/data/budgetDocs'
import { city } from '../../../config/city'
import { openDataSources } from '../shared/data/openData'
import { dpwhProjects } from '../shared/data/projects'

const fundCategories = ['Budget & expenditure', 'Special funds', 'Audit & accountability']

export function TransparencyPage() {

  const procurementCount = budgetDocs.filter((doc) => doc.category === 'Procurement').length
  const budgetCount = budgetDocs.filter((doc) => fundCategories.includes(doc.category)).length
  const countLabel = (count: number, noun: string) => (count ? `${count} ${noun}` : 'Coming soon')

  return (
    <>
      <PageHero
        eyebrow="Transparency"
        title="Follow public money"
        description={`Revenue, spending, special funds, audit reports and procurement records of the Municipal Government of ${city.name}, linked to official sources.`}
        crumbs={[{ label: 'Transparency' }]}
      />

      <section>
        <div className="container-page py-12 sm:py-16">
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Document library"
                title="Where the money goes"
                description="Budget and procurement records are grouped into two plain-language collections. Records are added as they are verified against official sources; national datasets are documented separately below."
              />
            </Reveal>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <Reveal>
                <Link
                  href="/transparency/budget"
                 
                  className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Wallet aria-hidden="true" className="size-5" />
                  </span>
                  <h2 className="mt-5 text-xl font-extrabold tracking-tight text-ink-950 group-hover:text-brand-700">
                    {"Budget and spending"}</h2>
                  <p className="mt-2 flex-1 text-sm leading-6 text-ink-600">
                    {"The Local Expenditure Program, statements of receipts and expenditures, special funds, and audit reports."}</p>
                  <span className="mt-5 inline-flex items-center justify-between gap-3 border-t border-line pt-4 text-sm font-bold text-brand-700">
                    {countLabel(budgetCount, 'documents')}<ArrowRight
                      aria-hidden="true"
                      className="size-4 transition group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Reveal>

              <Reveal delay={0.06}>
                <Link
                  href="/transparency/procurement"
                 
                  className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <FileSearch aria-hidden="true" className="size-5" />
                  </span>
                  <h2 className="mt-5 text-xl font-extrabold tracking-tight text-ink-950 group-hover:text-brand-700">
                    {"Procurement and bids"}</h2>
                  <p className="mt-2 flex-1 text-sm leading-6 text-ink-600">
                    {"Annual procurement plans, quarterly bid results, bid documents, and infrastructure project status."}</p>
                  <span className="mt-5 inline-flex items-center justify-between gap-3 border-t border-line pt-4 text-sm font-bold text-brand-700">
                    {countLabel(procurementCount, 'documents')}<ArrowRight
                      aria-hidden="true"
                      className="size-4 transition group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <Link
                href="/transparency/projects"
               
                className="group mt-5 flex flex-col gap-4 rounded-2xl border border-line bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float sm:flex-row sm:items-center"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <MapPin aria-hidden="true" className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-700">{"Project tracker"}</p>
                  <h2 className="mt-1 text-xl font-extrabold tracking-tight text-ink-950 group-hover:text-brand-700">
                    {`Public works projects in ${city.name}`}</h2>
                  <p className="mt-1 text-sm leading-6 text-ink-600">
                    {"Contract values, status, contractors, and locations as published in the source records."}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-brand-700">
                  {countLabel(dpwhProjects.length, 'projects')}<ArrowRight aria-hidden="true" className="size-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>

            <Reveal delay={0.1}>
              <Link
                href="/transparency/open-data"
               
                className="group mt-5 flex flex-col gap-4 rounded-2xl border border-line bg-ink-950 p-6 text-white shadow-card transition hover:-translate-y-0.5 hover:shadow-float sm:flex-row sm:items-center"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-300">
                  <Database aria-hidden="true" className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-300">{"Open data"}</p>
                  <h2 className="mt-1 text-xl font-extrabold tracking-tight">{"See the sources behind the numbers"}</h2>
                  <p className="mt-1 text-sm leading-6 text-white/60">
                    {"National datasets on local fiscal data, boundaries, elections, public works and procurement, with their licenses and caveats."}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-brand-300">
                  {openDataSources.length} {"datasets"}<ArrowRight aria-hidden="true" className="size-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <Reveal>
                <SectionHeading eyebrow="What is published" title="Documents by category" />
              </Reveal>
              <div className="mt-5 divide-y divide-line rounded-2xl border border-line bg-white shadow-card">
                {fundCategories.map((category) => {
                  const count = budgetDocs.filter((doc) => doc.category === category).length
                  return (
                    <div key={category} className="flex items-center justify-between gap-4 px-5 py-4">
                      <span className="text-sm font-semibold text-ink-800">{category}</span>
                      <span className="text-xs font-bold uppercase tracking-[0.1em] text-ink-400">
                        {count} {count === 1 ? 'document' : 'documents'}
                      </span>
                    </div>
                  )
                })}
                <div className="flex items-center justify-between gap-4 px-5 py-4">
                  <span className="text-sm font-semibold text-ink-800">{"Procurement"}</span>
                  <span className="text-xs font-bold uppercase tracking-[0.1em] text-ink-400">
                    {procurementCount} {"documents"}</span>
                </div>
              </div>
            </div>

            <Reveal delay={0.06}>
              <div className="h-full rounded-2xl border border-line bg-ink-950 p-6 text-white shadow-card">
                <Landmark aria-hidden="true" className="size-6 text-brand-300" />
                <h2 className="mt-4 text-xl font-extrabold tracking-tight">{"The Full Disclosure Policy"}</h2>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  {"LGUs publish budget, procurement, and accountability documents under the national Full Disclosure Policy, collected on the DILG portal."}</p>
                <a
                  href="https://fdpp.dilg.gov.ph/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/15"
                >
                  {"Open the disclosure portal"}<ArrowRight aria-hidden="true" className="size-3.5" />
                </a>
              </div>
            </Reveal>
          </div>

          <div className="mt-8">
            <SourceNote href={city.website} linkLabel="Visit the official municipal website">
              {"Figures are dated individually. Budget and procurement records come from official publishers; use each linked publisher for the latest releases."}</SourceNote>
          </div>
        </div>
      </section>
    </>
  )
}
