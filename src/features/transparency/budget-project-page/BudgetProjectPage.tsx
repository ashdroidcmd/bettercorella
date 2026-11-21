'use client'

import { PageHero } from '../../../components/ui/PageHero'
import { Disclaimers, External, StatusChip } from '../shared/components/BudgetBits'
import { longDate, phpDelta, phpFull } from '../shared/budget-api/format'
import { budgetSnapshot } from '../shared/data/budgetSnapshot'
import type { Version } from '../shared/budget-api/types'

const VERSIONS: Version[] = ['nep', 'hgab2', 'hgab3', 'api']

/** Finds a snapshot project by its URL segments. */
export function findBudgetProject(program: string, slug: string) {
  const row = budgetSnapshot.fy2027.projects.find((p) => p.dataset === program && p.slug === slug)
  return row ? budgetSnapshot.details[row.key] ?? null : null
}

export function BudgetProjectPage({ program, slug }: { program: string; slug: string }) {
  const p = findBudgetProject(program, slug)
  if (!p) return null

  const { labels } = budgetSnapshot
  const programInfo = labels.datasets.find((d) => d.key === p.dataset)
  const versionLabel = (v: Version) => labels.versions.find((r) => r.key === v)?.label ?? v.toUpperCase()
  const versions = VERSIONS.filter((v) => v !== 'api' || p.dataset === 'dpwh')
  const details: [string, string | null][] = [
    ['Program', programInfo?.label ?? p.dataset.toUpperCase()],
    ['Program line', p.program],
    ['Sub-line', p.pap],
    ['DPWH office', p.office],
    ['Region', p.region],
    ['How the two versions were matched', p.labels.match?.label ?? null],
    ['Between the House readings', p.labels.reading?.label ?? null],
    ['DPWH transparency website', p.labels.dpwh_site?.label ?? null],
    ['Length', p.length_m != null ? `${Math.round(p.length_m).toLocaleString('en-US')} m` : null],
  ]

  return (
    <>
      <PageHero
        eyebrow={`${programInfo?.short ?? p.dataset.toUpperCase()} · FY2027`}
        title={p.title}
        crumbs={[
          { label: 'Transparency', href: '/transparency' },
          { label: 'Project' },
        ]}
      />
      <section>
        <div className="container-page space-y-8 py-10 sm:py-14">
          <div className="flex flex-col gap-2">
            <StatusChip group={p.bridge_group} label={p.status_label} held={p.held} />
            {p.labels.status.help ? <p className="max-w-3xl text-sm leading-6 text-ink-600">{p.labels.status.help}</p> : null}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="rounded-2xl border border-line bg-card p-5 shadow-card">
              <h2 className="text-base font-extrabold text-ink-950">Amount in each version, with the page it is on</h2>
              <table className="mt-4 w-full text-sm">
                <tbody className="divide-y divide-line">
                  {versions.map((v) => {
                    const amount = p[`${v}_php` as const]
                    const pdf = p.pdf_url[v]
                    const page = v === 'api' ? null : p[`${v}_page` as const]
                    return (
                      <tr key={v}>
                        <th scope="row" className="py-2.5 pr-3 text-left font-semibold text-ink-700">{versionLabel(v)}</th>
                        <td className="py-2.5 pr-3 text-right tabular-nums font-bold text-ink-950">
                          {amount == null ? <span className="font-normal text-ink-400">not listed</span> : phpFull(amount)}
                        </td>
                        <td className="py-2.5 text-right">
                          {pdf ? <External href={pdf}>{page ? `Page ${page}` : 'Document'}</External> : <span className="text-ink-400">—</span>}
                        </td>
                      </tr>
                    )
                  })}
                  <tr>
                    <th scope="row" className="py-2.5 pr-3 text-left font-semibold text-ink-700">Change, House bill against the NEP</th>
                    <td className="py-2.5 pr-3 text-right tabular-nums font-bold text-ink-950">{phpDelta(p.delta_php)}</td>
                    <td />
                  </tr>
                </tbody>
              </table>
              <p className="mt-3 text-xs leading-5 text-ink-500">
                The NEP and the House bill are two versions of one budget, so the amounts are compared, never added. Open
                the page to check the figure against the document itself.
              </p>
              {p.labels.flags.length ? (
                <>
                  <h3 className="mt-5 text-sm font-extrabold text-ink-950">Notes on this line</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-700">
                    {p.labels.flags.map((f) => (
                      <li key={f.code}>
                        {f.label}
                        {f.help ? <span className="text-ink-500"> {f.help}</span> : null}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>

            <aside className="rounded-2xl border border-line bg-card p-5 text-sm shadow-card">
              <dl className="space-y-3">
                {details
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink-500">{k}</dt>
                      <dd className="mt-0.5 text-ink-900">{v}</dd>
                    </div>
                  ))}
                {p.lat != null && p.lon != null ? (
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink-500">Coordinates in the document</dt>
                    <dd className="mt-0.5">
                      <External href={`https://www.openstreetmap.org/?mlat=${p.lat}&mlon=${p.lon}#map=15/${p.lat}/${p.lon}`}>
                        {p.lat.toFixed(5)}, {p.lon.toFixed(5)}
                      </External>
                    </dd>
                  </div>
                ) : null}
              </dl>
              <div className="mt-5 space-y-1 border-t border-line pt-4">
                <p><External href={p.url}>This line on budget.bettergov.ph</External></p>
                <p><External href={`${budgetSnapshot.api}${p.api_url}`}>The API record (JSON)</External></p>
                <p className="text-xs text-ink-500">Snapshot of {longDate(budgetSnapshot.fetchedAt)}.</p>
              </div>
            </aside>
          </div>

          <Disclaimers items={budgetSnapshot.fy2027.disclaimers} />
        </div>
      </section>
    </>
  )
}
