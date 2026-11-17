'use client'

import { Download } from 'lucide-react'
import { useMemo, useState } from 'react'
import { SectionHeading } from '../../../../components/ui/SectionHeading'
import { External } from '../../shared/components/BudgetBits'
import { downloadText, gaaCsv, php, phpFull } from '../../shared/budget-api/format'
import { departmentShort, gaaYearTotals, hasYear, type BudgetSnapshot } from '../../shared/budget-api/scope'
import { GAA_YEARS } from '../../shared/budget-api/types'

const PAGE = 15

/** CSS bars: one per year, scaled to the largest. No chart library, as in the upstream portal. */
function YearBars({ items, label }: { items: { key: string; year: string; php: number; note?: string }[]; label: string }) {
  const max = Math.max(1, ...items.map((i) => i.php))
  return (
    <div className="overflow-x-auto">
    <div
      role="img"
      aria-label={`${label}: ${items.map((i) => `${i.year} ${phpFull(i.php)}`).join(', ')}`}
      className="flex h-48 items-end gap-2 sm:gap-3"
    >
      {items.map((i) => (
        <div key={i.key} className="flex h-full min-w-11 flex-1 flex-col items-center justify-end gap-1">
          <span className="text-[10px] font-bold tabular-nums text-ink-700 sm:text-xs">{i.php ? php(i.php) : '—'}</span>
          <span
            className={`w-full rounded-t-md ${i.note ? 'bg-accent' : 'bg-brand-600'}`}
            style={{ height: `${Math.max(2, (i.php / max) * 100)}%` }}
          />
          <span className="text-[10px] font-semibold text-ink-500 sm:text-xs">{i.year}</span>
          {i.note ? <span className="-mt-1 text-[9px] font-semibold uppercase text-ink-400">{i.note}</span> : null}
        </div>
      ))}
    </div>
    </div>
  )
}

export function HistorySection({ district, gaa }: Pick<BudgetSnapshot, 'district' | 'gaa'>) {
  const [shown, setShown] = useState(PAGE)
  const totals = useMemo(() => gaaYearTotals(gaa.rows), [gaa.rows])
  const office = district?.card.offices[0]

  return (
    <section aria-labelledby="history-h" className="space-y-10">
      <SectionHeading
        eyebrow="Enacted budgets · GAA 2020–2026"
        title="What past national budgets set aside"
        description="The General Appropriations Act (GAA) is the budget as signed into law. These are amounts authorized, not amounts spent."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="min-w-0 rounded-2xl border border-line bg-white p-5 shadow-card">
          <h3 className="text-base font-extrabold text-ink-950">Lines that name Corella, per year</h3>
          <p className="mt-1 text-sm text-ink-600">Sum of the GAA lines in the table below, for each year they are funded.</p>
          <div className="mt-6">
            <YearBars
              label="GAA lines naming Corella"
              items={totals.map((t) => ({ key: String(t.year), year: String(t.year), php: t.amount }))}
            />
          </div>
        </div>

        {office ? (
          <div className="min-w-0 rounded-2xl border border-line bg-white p-5 shadow-card">
            <h3 className="text-base font-extrabold text-ink-950">{office.name}</h3>
            <p className="mt-1 text-sm text-ink-600">
              The DPWH office that serves {district.card.label}, which includes Corella. Whole-office budget, not
              Corella&apos;s share. {office.tier_text}.
            </p>
            <div className="mt-6">
              <YearBars
                label={`${office.name} budget by year`}
                items={(office.years ?? []).map((y) => ({
                  key: `${y.fy}-${y.stage}`,
                  year: String(y.fy),
                  php: y.php ?? 0,
                  ...(y.stage === 'gaa' ? {} : { note: y.stage === 'nep' ? 'NEP' : 'House' }),
                }))}
              />
            </div>
            <p className="mt-3 text-xs text-ink-500">
              2027 is not law yet: the NEP and the House bill are shown side by side, not added.{' '}
              <External href={district.card.url}>District page on budget.bettergov.ph</External>
            </p>
          </div>
        ) : null}
      </div>

      <div>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h3 className="text-lg font-extrabold text-ink-950">GAA lines naming Corella ({gaa.rows.length})</h3>
          <button
            type="button"
            onClick={() => downloadText('corella-gaa-2020-2026.csv', gaaCsv(gaa.rows))}
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2 text-xs font-bold text-ink-700 transition hover:border-brand-200 hover:text-brand-700"
          >
            <Download aria-hidden="true" className="size-4" />
            Download CSV
          </button>
        </div>
        <div
          role="region"
          aria-label="GAA 2020 to 2026 lines naming Corella"
          tabIndex={0}
          className="mt-4 overflow-x-auto rounded-2xl border border-line bg-white shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          <table className="w-full min-w-[960px] text-left text-sm">
            <caption className="sr-only">Enacted budget lines naming Corella, by year</caption>
            <thead className="bg-surface text-[11px] font-bold uppercase tracking-[0.1em] text-ink-500">
              <tr>
                <th scope="col" className="px-4 py-3">Program, activity or project</th>
                {GAA_YEARS.map((y) => (
                  <th key={y} scope="col" className="px-3 py-3 text-right">{y}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {gaa.rows.slice(0, shown).map((r) => (
                <tr key={r.key} className="align-top hover:bg-surface">
                  <th scope="row" className="max-w-sm px-4 py-3 font-normal">
                    <span className="block font-semibold leading-5 text-ink-950">{r.name}</span>
                    <span className="mt-0.5 block text-xs font-semibold text-ink-500">{departmentShort(r.department)}</span>
                  </th>
                  {GAA_YEARS.map((y) => (
                    <td key={y} className="whitespace-nowrap px-3 py-3 text-right tabular-nums text-ink-700">
                      {hasYear(r, y) ? php(r.years[String(y)]!.amount) : <span className="text-ink-400">—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {shown < gaa.rows.length ? (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <p className="text-xs font-semibold text-ink-500">Showing {shown} of {gaa.rows.length}</p>
            <button
              type="button"
              onClick={() => setShown(gaa.rows.length)}
              className="rounded-xl border border-line bg-white px-4 py-2 text-xs font-bold text-ink-700 transition hover:border-brand-200 hover:text-brand-700"
            >
              Show all
            </button>
          </div>
        ) : null}
        <p className="mt-3 text-xs leading-5 text-ink-500">
          A line is listed because its name contains &ldquo;Corella&rdquo;. Some roads, such as the Tagbilaran
          City–Corella–Sikatuna–Loboc Road, run through neighbouring towns too, so a line&apos;s amount is not all spent
          in Corella.
        </p>
      </div>
    </section>
  )
}
