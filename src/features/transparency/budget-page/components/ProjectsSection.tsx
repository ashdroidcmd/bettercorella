'use client'

import { Download, Search, X } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { CustomSelect } from '../../../../components/ui/CustomSelect'
import { SectionHeading } from '../../../../components/ui/SectionHeading'
import { StatCard } from '../../../../components/ui/StatCard'
import { normalize } from '../../../../lib/utils'
import { External, StatusChip } from '../../shared/components/BudgetBits'
import { downloadText, php, phpDelta, plural, projectsCsv } from '../../shared/budget-api/format'
import { summarise, type BudgetSnapshot, type ScopedProject } from '../../shared/budget-api/scope'
import { BRIDGE_GROUPS, type BridgeGroup, type DatasetKey } from '../../shared/budget-api/types'

interface Props {
  projects: ScopedProject[]
  labels: BudgetSnapshot['labels']
  /** Project keys that have a prerendered detail page. */
  detailKeys: ReadonlySet<string>
}

export function ProjectsSection({ projects, labels, detailKeys }: Props) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<BridgeGroup | ''>('')
  const [program, setProgram] = useState<DatasetKey | ''>('')

  const summary = useMemo(() => summarise(projects), [projects])
  const programName = (k: DatasetKey) => labels.datasets.find((d) => d.key === k)?.short ?? k.toUpperCase()

  const filtered = useMemo(() => {
    const q = normalize(query)
    return projects.filter((p) => {
      if (status && p.bridge_group !== status) return false
      if (program && p.dataset !== program) return false
      if (!q) return true
      return normalize([p.title, p.program, p.pap, p.office].join(' ')).includes(q)
    })
  }, [projects, query, status, program])
  const narrowed = filtered.length !== projects.length

  return (
    <section aria-labelledby="fy2027-h">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard value={String(summary.rows)} label="FY2027 lines" note="Titles naming Corella, Bohol" />
        <StatCard value={php(summary.nep.php)} label="NEP" note={`${plural(summary.nep.rows, 'line')} · the President's proposal`} />
        <StatCard value={php(summary.house.php)} label="House bill" note={`${plural(summary.house.rows, 'line')} · compared, not added`} />
        <StatCard
          value={String(summary.groups.house_only.rows)}
          label="In the House bill only"
          note={`${php(summary.groups.house_only.house_php)} · insertion candidates`}
        />
      </div>

      <div className="mt-12">
        <SectionHeading
          eyebrow="FY2027 budget · NEP and House Bill 10858"
          title="Projects that name Corella"
          description="Each line as the National Expenditure Program (NEP) and the House bill publish it. A dash means that document has no such line."
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by status">
        {BRIDGE_GROUPS.filter((g) => summary.groups[g].rows).map((g) => {
          const active = status === g
          return (
            <button
              key={g}
              type="button"
              aria-pressed={active}
              title={labels.groups[g].help}
              onClick={() => setStatus(active ? '' : g)}
              className={`rounded-xl border px-3.5 py-2 text-left text-xs font-bold transition ${
                active
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : 'border-line bg-white text-ink-700 hover:border-brand-200 hover:text-brand-700'
              }`}
            >
              {labels.groups[g].label} · {summary.groups[g].rows}
            </button>
          )
        })}
      </div>

      <div className="mt-4 grid gap-3 rounded-2xl border border-line bg-white p-4 shadow-card sm:grid-cols-[1.6fr_1fr_auto]">
        <label className="relative block">
          <span className="sr-only">Search FY2027 projects</span>
          <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Barangay, road, building…"
            className="w-full rounded-xl border border-line bg-surface py-2.5 pl-9 pr-12 text-sm text-ink-900 outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear project search"
              className="absolute right-1 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-lg text-ink-600 hover:bg-white"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          ) : null}
        </label>
        <CustomSelect
          ariaLabel="Filter by program"
          value={program}
          options={[
            { value: '', label: 'All programs' },
            ...(Object.keys(summary.byDataset) as DatasetKey[]).map((k) => ({
              value: k,
              label: `${programName(k)} (${summary.byDataset[k]!.rows})`,
            })),
          ]}
          onChange={(v) => setProgram(v as DatasetKey | '')}
        />
        <button
          type="button"
          onClick={() => downloadText('corella-fy2027-budget-lines.csv', projectsCsv(filtered))}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-bold text-ink-700 transition hover:border-brand-200 hover:text-brand-700"
        >
          <Download aria-hidden="true" className="size-4" />
          Download CSV{narrowed ? ` (${filtered.length})` : ''}
        </button>
      </div>

      {filtered.length ? (
        <div
          role="region"
          aria-label="FY2027 budget lines for Corella"
          tabIndex={0}
          className="mt-5 overflow-x-auto rounded-2xl border border-line bg-white shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          <table className="w-full min-w-[820px] text-left text-sm">
            <caption className="sr-only">FY2027 budget lines whose titles name Corella, Bohol</caption>
            <thead className="bg-surface text-[11px] font-bold uppercase tracking-[0.1em] text-ink-500">
              <tr>
                <th scope="col" className="px-4 py-3">Project</th>
                <th scope="col" className="px-4 py-3">Status</th>
                <th scope="col" className="px-4 py-3 text-right">NEP</th>
                <th scope="col" className="px-4 py-3 text-right">House bill</th>
                <th scope="col" className="px-4 py-3 text-right">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((p) => (
                <tr key={p.key} className="align-top transition hover:bg-surface">
                  <th scope="row" className="max-w-md px-4 py-3 font-normal">
                    {detailKeys.has(p.key) ? (
                      <Link
                        href={`/transparency/budget/${p.dataset}/${p.slug}`}
                        className="block font-bold leading-5 text-ink-950 hover:text-brand-700"
                      >
                        {p.title}
                      </Link>
                    ) : (
                      <External href={p.url} className="inline-flex items-center gap-1 font-bold leading-5 text-ink-950 hover:text-brand-700">
                        {p.title}
                      </External>
                    )}
                    <span className="mt-0.5 block text-xs font-semibold text-ink-500">
                      {programName(p.dataset)}
                      {p.office ? ` · ${p.office.replace(/ District Engineering Office$/, ' DEO')}` : ''}
                    </span>
                  </th>
                  <td className="px-4 py-3">
                    <StatusChip group={p.bridge_group} label={p.status_label} held={p.held} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums text-ink-600">{php(p.nep_php)}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right font-bold tabular-nums text-ink-950">{php(p.house_php)}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums text-ink-600">{phpDelta(p.delta_php)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-5 rounded-2xl border border-line bg-white p-8 text-center text-sm text-ink-600 shadow-card">
          No line matches. Try fewer words or clear the filters.
        </p>
      )}
      <p className="mt-3 text-xs leading-5 text-ink-500">
        Amounts are in pesos, as each document publishes them. The NEP and the House bill are two versions of one budget:
        their totals are compared, never added. &ldquo;House bill only&rdquo; and &ldquo;NEP only&rdquo; lines are
        candidates to check, not confirmed changes.
      </p>
    </section>
  )
}
