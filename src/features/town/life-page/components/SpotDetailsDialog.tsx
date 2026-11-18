'use client'

import { Clock, ExternalLink, Globe, Mail, MapPin, Navigation, Phone, Ticket, TriangleAlert, X } from 'lucide-react'
import type { Ref } from 'react'
import { telHref } from '../../../../lib/utils'
import type { TouristSpot } from '../../shared/types/tourism'
import { spotPhotos } from '../data/tourismPhotos'
import { PhotoFrame } from './PhotoFrame'
import { SPOT_CATEGORY, peso } from './spotMeta'

function directionsUrl(spot: TouristSpot) {
  const query = spot.coordinates ? `${spot.coordinates.lat},${spot.coordinates.lng}` : `${spot.name}, ${spot.address}`
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

/** Full details of a tourist spot in a native modal dialog (Esc, backdrop click and the X button close it). */
export function SpotDetailsDialog({ spot, ref }: { spot: TouristSpot; ref: Ref<HTMLDialogElement> }) {
  const titleId = `spot-${spot.slug}-title`
  const primary = SPOT_CATEGORY[spot.categories[0] ?? 'other']
  const contact = spot.contact

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      // A click on the backdrop lands on the <dialog> itself, outside the content panel.
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close()
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-2xl bg-white p-0 text-ink-950 shadow-float backdrop:bg-ink-950/60 backdrop:backdrop-blur-sm"
    >
      <div data-lenis-prevent className="max-h-[85vh] overflow-y-auto overscroll-contain">
        <div className="relative">
          <PhotoFrame photo={spotPhotos[spot.slug]} icon={primary.icon} />
          <form method="dialog" className="absolute right-3 top-3">
            <button
              type="submit"
              aria-label="Close"
              className="inline-flex size-9 items-center justify-center rounded-full bg-white/90 text-ink-700 shadow-card transition hover:bg-white hover:text-ink-950"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </form>
        </div>

        <div className="p-5 sm:p-7">
          <ul className="flex flex-wrap gap-1.5" aria-label="Type">
            {spot.categories.map((category) => (
              <li key={category} className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-bold text-brand-700">
                {SPOT_CATEGORY[category].label}
              </li>
            ))}
          </ul>
          <h2 id={titleId} className="mt-3 text-2xl font-extrabold tracking-tight">
            {spot.name}
          </h2>
          <p className="mt-1 flex gap-1.5 text-sm text-ink-500">
            <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-600" />
            {spot.address}
          </p>

          <p className="mt-4 text-[15px] leading-7 text-ink-700">{spot.summary}</p>

          {spot.toConfirm ? (
            <p className="mt-4 flex gap-2 rounded-xl bg-amber-50 px-3 py-2 text-sm leading-6 text-amber-900">
              <TriangleAlert aria-hidden="true" className="mt-1 size-4 shrink-0" />
              {spot.toConfirm}
            </p>
          ) : null}

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {spot.hours?.length ? (
              <section>
                <h3 className="flex items-center gap-1.5 text-sm font-bold">
                  <Clock aria-hidden="true" className="size-4 text-brand-600" />
                  Hours
                </h3>
                <dl className="mt-2 space-y-1 text-sm">
                  {spot.hours.map((row) => (
                    <div key={row.days} className="flex justify-between gap-3">
                      <dt className="text-ink-600">{row.days}</dt>
                      <dd className="font-semibold">{row.hours}</dd>
                    </div>
                  ))}
                </dl>
                {spot.closedOn?.length ? (
                  <p className="mt-1.5 text-xs text-ink-500">{`Closed on ${spot.closedOn.join(' and ')}.`}</p>
                ) : null}
              </section>
            ) : null}

            {spot.fees?.length ? (
              <section>
                <h3 className="flex items-center gap-1.5 text-sm font-bold">
                  <Ticket aria-hidden="true" className="size-4 text-brand-600" />
                  Admission
                </h3>
                <dl className="mt-2 space-y-1 text-sm">
                  {spot.fees.map((fee) => (
                    <div key={fee.label} className="flex justify-between gap-3">
                      <dt className="text-ink-600">{fee.label}</dt>
                      <dd className="font-semibold">{peso(fee.amountPhp)}</dd>
                    </div>
                  ))}
                </dl>
                {spot.paymentNote ? <p className="mt-1.5 text-xs text-ink-500">{spot.paymentNote}</p> : null}
              </section>
            ) : null}
          </div>

          {spot.goodToKnow?.length ? (
            <section className="mt-6">
              <h3 className="text-sm font-bold">Good to know</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-ink-700 marker:text-brand-400">
                {spot.goodToKnow.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {contact && Object.values(contact).some(Boolean) ? (
            <section className="mt-6">
              <h3 className="text-sm font-bold">Contact</h3>
              <ul className="mt-2 space-y-1.5 text-sm text-ink-700">
                {contact.phone ? (
                  <li className="flex items-center gap-2">
                    <Phone aria-hidden="true" className="size-4 text-brand-600" />
                    <a href={telHref(contact.phone)} className="hover:text-brand-700">{contact.phone}</a>
                  </li>
                ) : null}
                {contact.email ? (
                  <li className="flex items-center gap-2">
                    <Mail aria-hidden="true" className="size-4 text-brand-600" />
                    <a href={`mailto:${contact.email}`} className="hover:text-brand-700">{contact.email}</a>
                  </li>
                ) : null}
                {[contact.website, contact.facebook].filter(Boolean).map((href) => (
                  <li key={href} className="flex items-center gap-2">
                    <Globe aria-hidden="true" className="size-4 text-brand-600" />
                    <a href={href} target="_blank" rel="noreferrer" className="break-all hover:text-brand-700">{href}</a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-line pt-5">
            <a
              href={directionsUrl(spot)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-800"
            >
              <Navigation aria-hidden="true" className="size-4" />
              {'Get directions'}
              <span className="sr-only">{` to ${spot.name}`}</span>
            </a>
            <a
              href={spot.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-ink-500 underline underline-offset-2 hover:text-brand-700"
            >
              {`Source: ${spot.sourceLabel}`}
              <ExternalLink aria-hidden="true" className="size-3" />
            </a>
          </div>
        </div>
      </div>
    </dialog>
  )
}
