'use client'

import { OfficialCard } from '../shared/components/OfficialCard'
import { PageHero } from '../../../components/ui/PageHero'
import { PendingPage } from '../../../components/ui/PendingPage'
import { Reveal } from '../../../components/ui/Reveal'
import { SectionHeading } from '../../../components/ui/SectionHeading'
import { SourceNote } from '../../../components/ui/SourceNote'
import { city } from '../../../config/city'
import { cityElections, electionSourceUrl, electionSupplementSources } from '../shared/data/elections'
import { officials } from '../shared/data/officials'

function OfficialsPageContent() {

  const mayor = officials.find((official) => official.role === 'Municipal Mayor')
  const viceMayor = officials.find((official) => official.role === 'Municipal Vice Mayor')
  const councilors = officials.filter((official) => official.role === 'Sangguniang Bayan Member')
  const exOfficio = officials.filter(
    (official) => !['Municipal Mayor', 'Municipal Vice Mayor', 'Sangguniang Bayan Member'].includes(official.role),
  )

  return (
    <>
      <PageHero
        eyebrow="Municipal officials"
        title="The people in municipal hall"
        description={`The elected leadership of ${city.name}: the mayor, vice mayor, Sangguniang Bayan members, the Liga ng mga Barangay (ABC) president, and the SK Federation representative.`}
        crumbs={[{ label: 'Government', href: '/government' }, { label: 'Officials' }]}
      />

      <section>
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Executive"
              title="Municipal leadership"
              description="The mayor leads the executive branch; the vice mayor presides over the Sangguniang Bayan."
            />
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {mayor ? (
              <Reveal>
                <OfficialCard official={mayor} featured />
              </Reveal>
            ) : null}
            {viceMayor ? (
              <Reveal delay={0.06}>
                <OfficialCard official={viceMayor} featured />
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow={`${councilors.length} members`}
              title="Sangguniang Bayan"
              description="The municipal council reviews and approves ordinances, resolutions, and the annual budget."
            />
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {councilors.map((official, index) => (
              <Reveal key={official.slug} delay={(index % 4) * 0.04} className="h-full">
                <OfficialCard official={official} />
              </Reveal>
            ))}
          </div>

          {cityElections.length ? (
          <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
            <div className="border-b border-line p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">Election history</p>
              <h3 className="mt-2 text-xl font-extrabold tracking-tight text-ink-950">Mayors and vice mayors</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-600">
                {'Winning candidates by election year. Records combine OpenHalalan and COMELEC lists where needed. Party labels follow each source.'}{' '}
                <a
                  href={electionSupplementSources[0]?.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-brand-700 underline decoration-brand-300 underline-offset-2 hover:text-brand-800"
                >
                  {'COMELEC lists of elected city/municipal candidates'}
                </a>
              </p>
            </div>
            <p className="mb-2 text-xs text-ink-600 sm:hidden">Swipe the table horizontally to view all columns.</p>
            <div
              role="region"
              aria-label="Mayors and vice mayors by election year"
              tabIndex={0}
              className="overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              <table className="w-full min-w-[620px] text-left text-sm">
                <caption className="sr-only">Mayors and vice mayors of {city.name}, {city.province}, by election year</caption>
                <thead className="bg-surface text-[11px] font-bold uppercase tracking-[0.1em] text-ink-500">
                  <tr>
                    <th scope="col" className="px-5 py-3">
                      {'Year'}
                    </th>
                    <th scope="col" className="px-5 py-3">
                      {'Mayor'}
                    </th>
                    <th scope="col" className="px-5 py-3">
                      {'Vice mayor'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {cityElections.map((election) => (
                    <tr key={election.year} className={election.year === 2025 ? 'bg-brand-50' : undefined}>
                      <th scope="row" className="px-5 py-4 align-top text-base font-extrabold tabular-nums text-ink-950">
                        {election.year}
                      </th>
                      <td className="px-5 py-4 align-top">
                        {election.mayor ? (
                          <>
                            <span className="block font-bold text-ink-900">{election.mayor.name}</span>
                            <span className="mt-0.5 block text-xs text-ink-500">{election.mayor.party}</span>
                          </>
                        ) : (
                          <span className="text-sm text-ink-500">Not in source data</span>
                        )}
                      </td>
                      <td className="px-5 py-4 align-top">
                        {election.viceMayor ? (
                          <>
                            <span className="block font-bold text-ink-900">{election.viceMayor.name}</span>
                            <span className="mt-0.5 block text-xs text-ink-500">{election.viceMayor.party}</span>
                          </>
                        ) : (
                          <span className="text-sm text-ink-500">Not in source data</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-line p-4">
              <SourceNote
                href={electionSourceUrl}
                linkLabel="OpenHalalan on data.bettergov.ph"
                links={electionSupplementSources.map((source) => ({
                  href: source.url,
                  label: `${source.year} ${'COMELEC list'}`,
                }))}
              >
                {'Election records use OpenHalalan and COMELEC lists. Missing names do not mean no election was held.'}
              </SourceNote>
            </div>
          </div>
          ) : null}
        </div>
      </section>

      {exOfficio.length ? (
        <section>
          <div className="container-page py-12 sm:py-16">
            <Reveal>
              <SectionHeading
                eyebrow="Ex-officio"
                title="Barangay and youth representation"
                description="The Liga ng mga Barangay (ABC) and SK Federation presidents sit on the municipal council as ex-officio members."
              />
            </Reveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {exOfficio.map((official) => (
                <OfficialCard key={official.slug} official={official} featured />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-line">
        <div className="container-page py-8">
          <SourceNote href={city.website} linkLabel="View official profiles">
            {'Names and roles come from the Municipal Officials page of the official municipal website (term 2025–2028). Portraits are added only when published by the LGU. This guide does not publish personal contact details.'}
          </SourceNote>
        </div>
      </section>
    </>
  )
}

export function OfficialsPage() {
  if (!officials.length) {
    return (
      <PendingPage
      eyebrow="Municipal officials"
      title="The people in Municipal Hall"
      description={`The elected leadership of ${city.name}: the mayor, vice mayor and Sangguniang Bayan members.`}
      crumbs={[{ label: 'Government', href: '/government' }, { label: 'Officials' }]}
      topic="Elected municipal officials"
      source="They will come from official municipal sources and COMELEC election results."
      links={[
        { label: 'COMELEC', href: 'https://comelec.gov.ph', description: 'Official election results and lists of elected local officials.' },
        { label: 'Election winners dataset', href: 'https://data.bettergov.ph/datasets/25', description: 'OpenHalalan dataset of winning candidates in national and local elections.' },
      ]}
      />
    )
  }
  return <OfficialsPageContent />
}
