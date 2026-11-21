'use client'

import { ArrowUpRight, RefreshCw } from 'lucide-react'
import { PageHero } from '../../../components/ui/PageHero'
import { SectionHeading } from '../../../components/ui/SectionHeading'
import { city } from '../../../config/city'
import { longDate } from '../shared/budget-api/format'
import { budgetSnapshot } from '../shared/data/budgetSnapshot'
import { HistorySection } from './components/HistorySection'
import { ProjectsSection } from './components/ProjectsSection'
import { SourcesSection } from './components/SourcesSection'
import { useLiveBudget } from './hooks/useLiveBudget'

const detailKeys: ReadonlySet<string> = new Set(Object.keys(budgetSnapshot.details))

/** Where residents can check what this page does not cover yet. */
const officialSources = [
  {
    label: 'DILG Full Disclosure Policy portal',
    href: 'https://fdpp.dilg.gov.ph/',
    description: 'The annual budget, 20% development fund, disaster fund and procurement plans LGUs must post.',
  },
  {
    label: 'BLGF LGU fiscal data',
    href: 'https://blgf.gov.ph/lgu-fiscal-data/',
    description: 'Statements of receipts and expenditures: where the town’s income comes from and how it is spent.',
  },
  {
    label: 'PhilGEPS',
    href: 'https://www.philgeps.gov.ph',
    description: 'Bid notices and contract awards posted by government agencies, including LGUs.',
  },
  {
    label: 'Commission on Audit',
    href: 'https://www.coa.gov.ph',
    description: 'Annual audit reports on how local governments manage public funds.',
  },
  {
    label: 'DPWH projects on data.bettergov.ph',
    href: 'https://data.bettergov.ph/datasets/19',
    description: 'Contract-level records of national public works: contractor, status and progress.',
  },
]

export function BudgetPage() {
  const { data: fy2027, live } = useLiveBudget(budgetSnapshot.fy2027)

  return (
    <>
      <PageHero
        eyebrow="Transparency"
        title="Budget and public funds"
        description={`National budget lines that name ${city.name}, Bohol: the proposed 2027 budget and the enacted budgets of 2020 to 2026, with links to the documents behind every figure.`}
      >
        <p className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white/80">
          <RefreshCw aria-hidden="true" className="size-3.5" />
          {live.status === 'live'
            ? `Updated live from the Budget API · ${longDate(live.checkedAt)}`
            : `Snapshot of ${longDate(budgetSnapshot.fetchedAt)} from the BetterGov.ph Budget API`}
        </p>
      </PageHero>

      <section>
        <div className="container-page space-y-16 py-10 sm:py-14">
          <ProjectsSection projects={fy2027.projects} labels={budgetSnapshot.labels} detailKeys={detailKeys} />
          <HistorySection district={budgetSnapshot.district} gaa={budgetSnapshot.gaa} />
          <SourcesSection snapshot={budgetSnapshot} fy2027={fy2027} />

          <section aria-labelledby="official-sources-h">
            <SectionHeading
              eyebrow="Official sources"
              title={`${city.name}'s own records`}
              description={`The municipal budget, procurement and audit reports are not published on this site yet. Check them at the source.`}
            />
            <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {officialSources.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-full flex-col rounded-2xl border border-line bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float"
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="text-base font-bold text-ink-950">{link.label}</span>
                      <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-ink-400 transition group-hover:text-brand-700" />
                    </span>
                    <span className="mt-1.5 text-sm leading-6 text-ink-600">{link.description}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </>
  )
}
