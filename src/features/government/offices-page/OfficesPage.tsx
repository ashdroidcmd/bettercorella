'use client'

import { Search, X } from 'lucide-react'
import { useState } from 'react'
import { EmptyState } from '../../../components/ui/EmptyState'
import { OfficeCard } from '../shared/components/OfficeCard'
import { PageHero } from '../../../components/ui/PageHero'
import { PendingPage } from '../../../components/ui/PendingPage'
import { SectionHeading } from '../../../components/ui/SectionHeading'
import { SourceNote } from '../../../components/ui/SourceNote'
import { city } from '../../../config/city'
import { offices } from '../shared/data/offices'
import { normalize } from '../../../lib/utils'

function OfficesPageContent() {

  const [query, setQuery] = useState('')
  const normalizedQuery = normalize(query)
  const filtered = offices.filter((office) => {
    if (!normalizedQuery) return true
    return [office.name, office.sector, office.head, office.code ?? ''].some((value) =>
      normalize(value).includes(normalizedQuery),
    )
  })
  const sectors = Array.from(new Set(offices.map((office) => office.sector)))
  const grouped = sectors
    .map((sector) => ({
      sector,
      items: filtered.filter((office) => office.sector === sector),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <>
      <PageHero
        eyebrow="Municipal offices"
        title="Departments and offices"
        description={`${offices.length} offices and departments. Find the office that handles your transaction, then open its contact details and services.`}
        crumbs={[{ label: 'Government', href: '/government' }, { label: 'Offices' }]}
      >
        <div className="max-w-md">
          <label htmlFor="office-search" className="sr-only">
            {'Search offices'}
          </label>
          <div className="flex items-center gap-2 rounded-2xl border border-line bg-white p-1.5 shadow-float focus-within:ring-2 focus-within:ring-brand-300">
            <Search aria-hidden="true" className="ml-2 size-5 shrink-0 text-ink-400" />
            <input
              id="office-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by office, sector, or head…"
              className="min-w-0 flex-1 bg-transparent py-2 text-base text-ink-900 outline-none placeholder:text-ink-400"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear office search"
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-ink-600 transition hover:bg-surface hover:text-ink-700"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            ) : null}
          </div>
        </div>
      </PageHero>

      <section>
        <div className="container-page py-12 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Directory"
              title={(normalizedQuery ? 'Search results' : 'Browse by sector')}
              description={
                normalizedQuery
                  ? 'Showing filtered office results'
                  : 'Offices are grouped the way the municipal government organizes its work.'
              }
            />
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
            <div className="mt-9 space-y-12">
              {grouped.map((group) => (
                <div key={group.sector}>
                  <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
                    <h2 className="text-lg font-extrabold tracking-tight text-ink-950">{group.sector}</h2>
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-ink-400">
                      {group.items.length} {(group.items.length === 1 ? 'office' : 'offices')}
                    </span>
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {group.items.map((office) => (
                      <OfficeCard key={office.slug} office={office} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8">
              <EmptyState
                title="No offices found"
                description="Try a different office name, sector, or department head."
                action={
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-800"
                  >
                    {'Show all offices'}
                  </button>
                }
              />
            </div>
          )}

          <div className="mt-10">
            <SourceNote href={city.website} linkLabel="View the official department directory">
              {'Official city directories list these offices and contacts. Service counts follow the Citizens’ Charter; check the source for updates before visiting.'}
            </SourceNote>
          </div>
        </div>
      </section>
    </>
  )
}

export function OfficesPage() {
  if (!offices.length) {
    return (
      <PendingPage
      eyebrow="Municipal offices"
      title="Departments and offices"
      description={`The offices and departments of the Municipal Government of ${city.name}, with contacts and the services they handle.`}
      crumbs={[{ label: 'Government', href: '/government' }, { label: 'Offices' }]}
      topic="Municipal offices and their contacts"
      source="They will come from the municipal office directory and Citizen's Charter."
      />
    )
  }
  return <OfficesPageContent />
}
