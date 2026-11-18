'use client'

import { ArrowRight, MapPin } from 'lucide-react'
import { useRef } from 'react'
import { businessCategoryLabels } from '../../shared/data/businesses'
import type { BusinessListing } from '../../shared/types/business'
import { BusinessDetailsDialog } from './BusinessDetailsDialog'
import { BusinessLogo } from './BusinessLogo'

const MAX_TAGS = 4

/** Short listing card. The full details open in a dialog. */
export function BusinessCard({ business }: { business: BusinessListing }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const extra = business.offerings.length - MAX_TAGS
  const place = business.barangay ? `Brgy. ${business.barangay}` : business.serviceArea

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float">
      <div className="flex items-start gap-4">
        <BusinessLogo business={business} size="sm" />
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-700">
            {businessCategoryLabels[business.category]}
          </p>
          <h3 className="mt-1 text-lg font-extrabold leading-snug tracking-tight text-ink-950">
            <button
              type="button"
              onClick={() => dialogRef.current?.showModal()}
              className="text-left after:absolute after:inset-0 group-hover:text-brand-700"
            >
              {business.name}
            </button>
          </h3>
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-6 text-ink-600">{business.tagline}</p>

      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Offers">
        {business.offerings.slice(0, MAX_TAGS).map((tag) => (
          <li key={tag} className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-semibold text-ink-700 ring-1 ring-line">
            {tag}
          </li>
        ))}
        {extra > 0 ? <li className="px-1 py-0.5 text-xs font-semibold text-ink-500">{`+${extra} more`}</li> : null}
      </ul>

      <div className="mt-auto flex items-center justify-between gap-3 pt-4">
        {place ? (
          <span className="flex min-w-0 items-center gap-1.5 text-xs text-ink-500">
            <MapPin aria-hidden="true" className="size-3.5 shrink-0 text-brand-600" />
            <span className="truncate">{place}</span>
          </span>
        ) : (
          <span />
        )}
        <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-brand-700" aria-hidden="true">
          {'View details'}
          <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
        </span>
      </div>
      <BusinessDetailsDialog ref={dialogRef} business={business} />
    </article>
  )
}
