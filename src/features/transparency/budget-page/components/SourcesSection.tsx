'use client'

import { SectionHeading } from '../../../../components/ui/SectionHeading'
import { Disclaimers, External } from '../../shared/components/BudgetBits'
import { budgetPortal } from '../../shared/budget-api/portal.config'
import { longDate } from '../../shared/budget-api/format'
import type { BudgetSnapshot, ProjectsResult } from '../../shared/budget-api/scope'

interface Props {
  snapshot: BudgetSnapshot
  fy2027: ProjectsResult
}

/** How the lists were built: every API query, every rule and the API's notices. */
export function SourcesSection({ snapshot, fy2027 }: Props) {
  const { place, gaa, exclude } = budgetPortal
  return (
    <section aria-labelledby="sources-h" id="how-this-list-is-built" className="space-y-6">
      <SectionHeading
        eyebrow="Sources and method"
        title="How these lists are built"
        description="Every figure comes from the BetterGov.ph Budget API, which reads the published budget documents. Check any list yourself with the links below."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-card p-5 text-sm leading-6 text-ink-700 shadow-card">
          <h3 className="text-base font-extrabold text-ink-950">FY2027 lines</h3>
          <p className="mt-1">
            Search &ldquo;{place.q}&rdquo; in each program. Every word must appear in the line. Rows outside Region{' '}
            {place.region} (Central Visayas) are dropped, which keeps out New Corella, Davao del Norte.
          </p>
          <ul className="mt-3 space-y-1">
            {fy2027.queries.map((q) => (
              <li key={q.dataset}>
                <External href={q.api}>{q.dataset.toUpperCase()}</External>: API returned {q.total}, kept {q.kept}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-line bg-card p-5 text-sm leading-6 text-ink-700 shadow-card">
          <h3 className="text-base font-extrabold text-ink-950">GAA 2020–2026 lines</h3>
          <p className="mt-1">
            Search &ldquo;{gaa.q}&rdquo; in the programs of all {snapshot.gaa.searched} departments. The GAA has no region,
            so lines are dropped by name:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {gaa.dropNames.map((r) => (
              <li key={r.contains}>
                &ldquo;{r.contains}&rdquo;: {r.reason}
              </li>
            ))}
          </ul>
          <ul className="mt-3 space-y-1">
            {snapshot.gaa.queries.map((q) => (
              <li key={q.api}>
                <External href={q.api}>{q.department}</External>: matched {q.matched}, kept {q.kept}
              </li>
            ))}
          </ul>
          <p className="mt-2">{snapshot.gaa.dropped.length} lines were dropped by these rules.</p>
        </div>
      </div>

      {exclude.length ? (
        <div className="rounded-2xl border border-line bg-card p-5 text-sm text-ink-700 shadow-card">
          <h3 className="text-base font-extrabold text-ink-950">Removed by hand</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {exclude.map((e) => (
              <li key={e.key}>
                <code>{e.key}</code>: {e.reason}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="text-sm leading-6 text-ink-600">
        Snapshot taken {longDate(snapshot.fetchedAt)} from{' '}
        <External href="https://budget.bettergov.ph/docs">the BetterGov.ph Budget API</External>, built from{' '}
        <External href={fy2027.meta.source_repo}>its source repository</External>. Page design and query rules adapted
        from <External href="https://github.com/bettergovph/transparency-portal">bettergovph/transparency-portal</External>{' '}
        (MIT).
      </p>

      <Disclaimers items={fy2027.disclaimers} />
    </section>
  )
}
