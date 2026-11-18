'use client'

import { ArrowRight, Clock, MapPin, Ticket } from 'lucide-react'
import { useRef } from 'react'
import type { TouristSpot } from '../../shared/types/tourism'
import { spotPhotos } from '../data/tourismPhotos'
import { PhotoFrame } from './PhotoFrame'
import { SpotDetailsDialog } from './SpotDetailsDialog'
import { SPOT_CATEGORY, peso } from './spotMeta'

/** Short card: photo, name, place, a two-line summary and quick facts. The full details open in a dialog. */
export function SpotCard({ spot }: { spot: TouristSpot }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const primary = SPOT_CATEGORY[spot.categories[0] ?? 'other']
  const firstHours = spot.hours?.[0]
  const lowestFee = spot.fees?.length ? Math.min(...spot.fees.map((fee) => fee.amountPhp)) : null
  const open = () => dialogRef.current?.showModal()

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float">
      <PhotoFrame photo={spotPhotos[spot.slug]} icon={primary.icon} />
      <div className="flex flex-1 flex-col p-5">
        <ul className="flex flex-wrap gap-1.5" aria-label="Type">
          {spot.categories.map((category) => (
            <li key={category} className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-bold text-brand-700">
              {SPOT_CATEGORY[category].label}
            </li>
          ))}
        </ul>
        <h3 className="mt-3 text-lg font-extrabold tracking-tight text-ink-950">
          <button type="button" onClick={open} className="text-left after:absolute after:inset-0 group-hover:text-brand-700">
            {spot.name}
          </button>
        </h3>
        <p className="mt-1 flex gap-1.5 text-sm text-ink-500">
          <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-600" />
          {`Brgy. ${spot.barangay}`}
        </p>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-ink-600">{spot.summary}</p>

        {firstHours || lowestFee !== null ? (
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-ink-700">
            {firstHours ? (
              <li className="flex items-center gap-1.5">
                <Clock aria-hidden="true" className="size-3.5 text-brand-600" />
                {`${firstHours.days.replace('Monday–Saturday', 'Mon–Sat')}, ${firstHours.hours}`}
              </li>
            ) : null}
            {lowestFee !== null ? (
              <li className="flex items-center gap-1.5">
                <Ticket aria-hidden="true" className="size-3.5 text-brand-600" />
                {spot.fees && spot.fees.length > 1 ? `From ${peso(lowestFee)}` : peso(lowestFee)}
              </li>
            ) : null}
          </ul>
        ) : null}

        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-bold text-brand-700" aria-hidden="true">
          {'View details'}
          <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
        </span>
      </div>
      <SpotDetailsDialog ref={dialogRef} spot={spot} />
    </article>
  )
}
