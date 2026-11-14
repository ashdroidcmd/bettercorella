'use client'

import { ArrowRight, MapPin, Search, X } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BarangayMap } from './components/BarangayMap'
import { ComingSoon } from '../../../components/ui/ComingSoon'
import { EmptyState } from '../../../components/ui/EmptyState'
import { PageHero } from '../../../components/ui/PageHero'
import { Reveal } from '../../../components/ui/Reveal'
import { SectionHeading } from '../../../components/ui/SectionHeading'
import { SourceNote } from '../../../components/ui/SourceNote'
import { StatCard } from '../../../components/ui/StatCard'
import { barangayMap } from '../shared/data/barangayMap'
import { barangayDilgSourceUrl, barangays } from '../shared/data/barangays'
import { city } from '../../../config/city'
import { formatNumber, normalize } from '../../../lib/utils'

export function BarangaysPage() {
  const router = useRouter()

  const [query, setQuery] = useState('')
  const [activeSuggestion, setActiveSuggestion] = useState(0)
  const normalizedQuery = normalize(query)
  const filtered = barangays.filter((barangay) => {
    if (!normalizedQuery) return true
    return [barangay.name, barangay.district, barangay.punongBarangay, barangay.skChairperson ?? ''].some(
      (value) => normalize(value).includes(normalizedQuery),
    )
  })
  const suggestions = normalizedQuery
    ? [...filtered]
        .sort((a, b) => {
          const rank = (name: string) => {
            const normalizedName = normalize(name)
            if (normalizedName === normalizedQuery) return 0
            return normalizedName.startsWith(normalizedQuery) ? 1 : 2
          }
          return rank(a.name) - rank(b.name) || a.name.localeCompare(b.name)
        })
        .slice(0, 6)
    : []
  const districtNumbers = Array.from(new Set(barangays.map((barangay) => barangay.districtNumber))).sort(
    (a, b) => a - b,
  )
  const grouped = districtNumbers
    .map((districtNumber) => ({
      districtNumber,
      items: filtered.filter((barangay) => barangay.districtNumber === districtNumber),
    }))
    .filter((group) => group.items.length > 0)
  const poblacionCount = barangays.filter((barangay) => barangay.poblacion).length

  return (
    <>
      <PageHero
        eyebrow="Barangays"
        title={city.barangayCount ? `${city.barangayCount} barangays` : 'Barangays'}
        description={`Every community in ${city.name}, with PSA population figures and elected barangay officials, added as they are verified.`}
        crumbs={[{ label: 'Government', href: '/government' }, { label: 'Barangays' }]}
        overflowVisible
      >
        {barangays.length ? (
        <div className="relative z-30 max-w-md">
          <label htmlFor="barangay-search" className="sr-only">
            {'Search barangays'}
          </label>
          <div className="flex items-center gap-2 rounded-2xl border border-line bg-white p-1.5 shadow-float focus-within:ring-2 focus-within:ring-brand-300">
            <Search aria-hidden="true" className="ml-2 size-5 shrink-0 text-ink-400" />
            <input
              id="barangay-search"
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setActiveSuggestion(0)
              }}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown' && suggestions.length) {
                  event.preventDefault()
                  setActiveSuggestion((index) => Math.min(index + 1, suggestions.length - 1))
                } else if (event.key === 'ArrowUp' && suggestions.length) {
                  event.preventDefault()
                  setActiveSuggestion((index) => Math.max(index - 1, 0))
                } else if (event.key === 'Enter' && suggestions.length) {
                  event.preventDefault()
                  const suggestion = suggestions[activeSuggestion] ?? suggestions[0]
                  if (suggestion) router.push(`/government/barangays/${suggestion.slug}`)
                } else if (event.key === 'Escape' && query) {
                  setQuery('')
                  setActiveSuggestion(0)
                }
              }}
              placeholder="Search barangay or punong barangay…"
              autoComplete="off"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={Boolean(normalizedQuery)}
              aria-controls="barangay-search-results"
              aria-activedescendant={
                suggestions[activeSuggestion] ? `barangay-result-${suggestions[activeSuggestion].slug}` : undefined
              }
              className="min-w-0 flex-1 bg-transparent py-2 text-base text-ink-900 outline-none placeholder:text-ink-400"
            />
            {query ? (
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setActiveSuggestion(0)
                }}
                aria-label="Clear barangay search"
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-ink-600 transition hover:bg-surface hover:text-ink-700"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            ) : null}
          </div>
          {normalizedQuery ? (
            <ul
              id="barangay-search-results"
              role="listbox"
              aria-label="Barangay search results"
              data-lenis-prevent
              className="scrollbar-slim absolute left-0 right-0 top-full z-40 mt-2 max-h-80 overflow-y-auto overscroll-contain rounded-2xl border border-line bg-white p-2 shadow-hero"
            >
              {suggestions.length ? (
                suggestions.map((barangay, index) => (
                  <li key={barangay.slug} role="presentation">
                    <button
                      type="button"
                      id={`barangay-result-${barangay.slug}`}
                      role="option"
                      aria-selected={index === activeSuggestion}
                      onMouseEnter={() => setActiveSuggestion(index)}
                      onClick={() => router.push(`/government/barangays/${barangay.slug}`)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                        index === activeSuggestion ? 'bg-brand-50' : 'hover:bg-surface'
                      }`}
                    >
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                        <MapPin aria-hidden="true" className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="truncate text-sm font-bold text-ink-950">{barangay.name}</span>
                          {barangay.poblacion ? (
                            <span className="rounded-full bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-brand-700">
                              {"Poblacion"}</span>
                          ) : null}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-ink-500">
                          {barangay.district} · {formatNumber(barangay.population2024)} {"residents in 2024"}</span>
                        <span className="mt-0.5 block truncate text-xs text-ink-500">
                          {'Punong Barangay'}: {barangay.punongBarangay}
                        </span>
                      </span>
                      <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-ink-400" />
                    </button>
                  </li>
                ))
              ) : (
                <li className="px-3 py-4 text-sm text-ink-500" role="status">
                  {'No barangays found for'} “{query.trim()}”. {'Try a name, district, or barangay official.'}
                </li>
              )}
            </ul>
          ) : null}
        </div>
        ) : null}
      </PageHero>

      <section>
        <div className="container-page py-8 sm:py-16">
          {barangayMap.features.length ? (
          <section>
            <Reveal delay={0.06}>
              <SectionHeading
                eyebrow="Barangay map"
                title="See where every barangay sits"
                description="Click a barangay to zoom in and raise it above the map. Drag to explore nearby boundaries, or open its profile for full details."
              />
              <div className="mt-6">
                <BarangayMap />
              </div>
              <div className="mt-4">
                <SourceNote
                  href="https://data.bettergov.ph/datasets/23"
                  linkLabel="Barangay boundary data on data.bettergov.ph"
                  links={[
                    {
                      href: 'https://github.com/altcoder/philippines-psgc-shapefiles',
                      label: '2023 PSA/NAMRIA boundary archive',
                    },
                  ]}
                >
                  {'Boundaries are simplified from the PSA/NAMRIA barangay boundary release and are approximate. Use them to explore, not to determine legal property lines.'}
                </SourceNote>
              </div>
            </Reveal>
          </section>
          ) : null}

          {barangays.length ? (
          <>
          <Reveal className="mt-8 sm:mt-10">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              <StatCard value={formatNumber(barangays.length)} label="Barangays" note={`Across ${city.name}`} />
              <StatCard
                value={formatNumber(barangays.reduce((total, barangay) => total + barangay.population2024, 0))}
                label="Residents"
                note="PSA Census of Population"
              />
              <StatCard value={formatNumber(districtNumbers.length)} label="Districts" note="Administrative districts" />
              <StatCard
                value={formatNumber(poblacionCount)}
                label="Poblacion barangays"
                note="Town-center barangays"
              />
            </div>
          </Reveal>

          <div className="mt-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">Directory</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.025em] text-ink-950 sm:text-3xl">
                {(normalizedQuery ? 'Search results' : 'Browse by district')}
              </h2>
              <p className="mt-2 text-sm text-ink-600">
                {normalizedQuery
                  ? 'Showing filtered barangay results'
                  : 'Population figures use the 2024 Census of Population. Change compares 2020 with 2024.'}
              </p>
            </div>
            {normalizedQuery ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-semibold text-ink-700 transition hover:border-brand-200 hover:text-brand-700"
              >
                {'Clear search'}
              </button>
            ) : null}
          </div>

          {grouped.length ? (
            <div className="mt-8 space-y-10">
              {grouped.map((group) => {
                const districtName = group.items[0]?.district ?? `District ${group.districtNumber}`
                const districtPopulation = group.items.reduce(
                  (total, barangay) => total + barangay.population2024,
                  0,
                )

                return (
                  <div key={group.districtNumber}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-3">
                      <h3 className="text-lg font-extrabold tracking-tight text-ink-950">{districtName}</h3>
                      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">
                        {group.items.length} {(group.items.length === 1 ? 'barangay' : 'barangays')} ·{' '}
                        {formatNumber(districtPopulation)} {'residents'}
                      </p>
                    </div>

                    <p className="mb-2 text-xs text-ink-600 sm:hidden">Swipe the table horizontally to view all columns.</p>
                    <div
                      role="region"
                      aria-label={`${districtName} barangay directory`}
                      tabIndex={0}
                      className="mt-4 overflow-x-auto rounded-2xl border border-line bg-white shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                    >
                      <table className="min-w-[760px] w-full text-left text-sm">
                        <caption className="sr-only">
                          {"Barangays in"}{' '}{districtName}{`, ${city.name}, ${city.province}`}</caption>
                        <thead className="bg-surface text-[11px] font-bold uppercase tracking-[0.1em] text-ink-500">
                          <tr>
                            <th scope="col" className="px-4 py-3">
                              {'Barangay'}
                            </th>
                            <th scope="col" className="px-4 py-3 text-right">
                              {'Population 2024'}
                            </th>
                            <th scope="col" className="px-4 py-3 text-right">
                              {'Share'}
                            </th>
                            <th scope="col" className="px-4 py-3 text-right">
                              {'Change'}
                            </th>
                            <th scope="col" className="px-4 py-3 text-right">
                              {'Rank'}
                            </th>
                            <th scope="col" className="px-4 py-3">
                              {'Punong Barangay'}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                          {group.items.map((barangay) => (
                            <tr
                              key={barangay.slug}
                              onClick={(event) => {
                                if (event.target instanceof Element && event.target.closest('a, button')) return
                                router.push(`/government/barangays/${barangay.slug}`)
                              }}
                              className="cursor-pointer transition hover:bg-surface"
                            >
                              <th scope="row" className="px-4 py-3 font-normal">
                                <Link
                                  href={`/government/barangays/${barangay.slug}`}
                                 
                                  className="inline-flex flex-wrap items-center gap-2 font-bold text-ink-950 hover:text-brand-700"
                                >
                                  {barangay.name}
                                  {barangay.poblacion ? (
                                    <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-brand-700">
                                      {'Poblacion'}
                                    </span>
                                  ) : null}
                                </Link>
                              </th>
                              <td className="px-4 py-3 text-right font-semibold tabular-nums text-ink-800">
                                {formatNumber(barangay.population2024)}
                              </td>
                              <td className="px-4 py-3 text-right tabular-nums text-ink-600">{barangay.share}</td>
                              <td className="px-4 py-3 text-right tabular-nums text-ink-600">{barangay.change}</td>
                              <td className="px-4 py-3 text-right tabular-nums text-ink-600">#{barangay.rank}</td>
                              <td className="px-4 py-3 text-ink-600">{barangay.punongBarangay}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="mt-8">
              <EmptyState
                title="No barangays found"
                description="Try a different barangay name, district, or punong barangay."
                action={
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-800"
                  >
                    {'Show all barangays'}
                  </button>
                }
              />
            </div>
          )}
          </>
          ) : (
            <ComingSoon
              topic="Barangay names, populations and officials"
              source="Names and populations will come from the PSA Philippine Standard Geographic Code and census; officials from the DILG barangay officials directory."
            />
          )}

          <div className="mt-10">
            <SourceNote
              href="https://psa.gov.ph/classification/psgc"
              linkLabel="PSA Philippine Standard Geographic Code"
              links={[
                { href: barangayDilgSourceUrl, label: 'DILG barangay officials directory' },
                { href: 'https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/2/103013', label: 'Republic Act No. 12326' },
              ]}
            >
              {'Barangay names and populations follow the PSA. Barangay officials follow the DILG directory. The next regular barangay and SK elections are scheduled for November 2028 under Republic Act No. 12326.'}
            </SourceNote>
          </div>
        </div>
      </section>
    </>
  )
}
