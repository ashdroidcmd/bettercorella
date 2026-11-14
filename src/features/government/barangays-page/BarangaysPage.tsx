'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BarangayMap } from './components/BarangayMap'
import { ComingSoon } from '../../../components/ui/ComingSoon'
import { MapEmbed } from '../../../components/ui/MapEmbed'
import { PageHero } from '../../../components/ui/PageHero'
import { Reveal } from '../../../components/ui/Reveal'
import { SectionHeading } from '../../../components/ui/SectionHeading'
import { SourceNote } from '../../../components/ui/SourceNote'
import { StatCard } from '../../../components/ui/StatCard'
import { barangayMap } from '../shared/data/barangayMap'
import { barangayDilgSourceUrl, barangays } from '../shared/data/barangays'
import { city } from '../../../config/city'
import { formatNumber } from '../../../lib/utils'

export function BarangaysPage() {
  const router = useRouter()

  const districtNumbers = Array.from(new Set(barangays.map((barangay) => barangay.districtNumber))).sort(
    (a, b) => a - b,
  )
  const grouped = districtNumbers
    .map((districtNumber) => ({
      districtNumber,
      items: barangays.filter((barangay) => barangay.districtNumber === districtNumber),
    }))
    .filter((group) => group.items.length > 0)
  const poblacionCount = barangays.filter((barangay) => barangay.poblacion).length

  return (
    <>
      <PageHero
        eyebrow="Barangays"
        title={city.barangayCount ? `${city.barangayCount} barangays` : 'Barangays'}
        description={`Every community in ${city.name}, with PSA population figures and elected barangay officials, added as they are verified.`}
        crumbs={[{ label: 'Barangays' }]}
      />

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
                  href="https://github.com/faeldon/philippines-psgc-shapefiles"
                  linkLabel="2023 PSA/NAMRIA boundary archive"
                  links={[
                    {
                      href: 'https://data.bettergov.ph/datasets/23',
                      label: 'Barangay boundary data on data.bettergov.ph',
                    },
                  ]}
                >
                  {'Boundaries come from the PSA/NAMRIA administrative boundary release (2023) and are approximate. Use them to explore, not to determine legal property lines.'}
                </SourceNote>
              </div>
            </Reveal>
          </section>
          ) : (
            <Reveal>
              <SectionHeading
                eyebrow="Map"
                title={`Where ${city.name} is`}
                description="An interactive map of each barangay's boundary will be added once verified boundary data is in place."
              />
              <MapEmbed className="mt-6" title={`Map of ${city.officialName}`} query={`${city.name}, ${city.province}, Philippines`} zoom={13} />
            </Reveal>
          )}

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
              {districtNumbers.length > 1 ? (
                <StatCard value={formatNumber(districtNumbers.length)} label="Districts" note="Administrative districts" />
              ) : (
                <StatCard value={city.incomeClass ?? '—'} label="Income class" note="Municipal income class (PSA)" />
              )}
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
                {(districtNumbers.length > 1 ? 'Browse by district' : 'All barangays')}
              </h2>
              <p className="mt-2 text-sm text-ink-600">
                {'Population figures use the 2024 Census of Population. Change compares 2020 with 2024.'}
              </p>
            </div>
          </div>

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
                                router.push(`/barangays/${barangay.slug}`)
                              }}
                              className="cursor-pointer transition hover:bg-surface"
                            >
                              <th scope="row" className="px-4 py-3 font-normal">
                                <Link
                                  href={`/barangays/${barangay.slug}`}
                                 
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
                              <td className="px-4 py-3 text-ink-600">{barangay.punongBarangay || 'Not yet listed'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
              })}
            </div>
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
              {'Barangay names and 2024 populations follow the PSA PSGC. Barangay officials come from each barangay’s page on the official municipal website; most are published as photos, so names are added once confirmed. The next regular barangay and SK elections are scheduled for November 2028 under Republic Act No. 12326.'}
            </SourceNote>
          </div>
        </div>
      </section>
    </>
  )
}
