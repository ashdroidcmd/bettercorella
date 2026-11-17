'use client'

import { ArrowRight, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { PageHero } from '../../../components/ui/PageHero'
import { PendingSection } from '../../../components/ui/PendingSection'
import { city } from '../../../config/city'
import { longDate } from '../shared/budget-api/format'
import { budgetSnapshot } from '../shared/data/budgetSnapshot'
import { HistorySection } from './components/HistorySection'
import { ProjectsSection } from './components/ProjectsSection'
import { SourcesSection } from './components/SourcesSection'
import { useLiveBudget } from './hooks/useLiveBudget'

const detailKeys: ReadonlySet<string> = new Set(Object.keys(budgetSnapshot.details))

export function BudgetPage() {
  const { data: fy2027, live } = useLiveBudget(budgetSnapshot.fy2027)

  return (
    <>
      <PageHero
        eyebrow="Public funds"
        title="Budget and spending"
        description={`National budget lines that name ${city.name}, Bohol: the proposed 2027 budget and the enacted budgets of 2020 to 2026. ${city.name}'s own municipal budget is listed below once it is verified against BLGF and Full Disclosure Policy records.`}
        crumbs={[{ label: 'Transparency', href: '/transparency' }, { label: 'Budget and spending' }]}
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

          <Link
            href="/transparency/projects"
            className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-white p-5 shadow-card transition hover:border-brand-200"
          >
            <span>
              <span className="block text-base font-bold text-ink-950">Infrastructure projects</span>
              <span className="mt-1 block text-sm text-ink-600">
                DPWH contracts in {city.name}: contractor, status and progress.
              </span>
            </span>
            <ArrowRight aria-hidden="true" className="size-5 shrink-0 text-ink-400 group-hover:text-brand-700" />
          </Link>
        </div>
      </section>

      <PendingSection
        topic={`${city.name}'s own municipal budget`}
        source="The national Budget API does not cover LGU budgets. Income, expenditure and the annual budget will come from the Bureau of Local Government Finance (BLGF) and the documents the LGU posts under the Full Disclosure Policy."
        links={[
          {
            label: 'BLGF LGU fiscal data',
            href: 'https://blgf.gov.ph/lgu-fiscal-data/',
            description: 'Statements of receipts and expenditures for every LGU, including income sources and spending.',
          },
          {
            label: 'DILG Full Disclosure Policy portal',
            href: 'https://fdpp.dilg.gov.ph/',
            description: 'Budgets, annual procurement plans and financial reports that LGUs are required to publish.',
          },
          {
            label: 'Commission on Audit',
            href: 'https://www.coa.gov.ph',
            description: 'Annual audit reports on how local governments manage public funds.',
          },
        ]}
      />
    </>
  )
}
