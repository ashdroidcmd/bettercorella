'use client'

import { CalendarDays, MapPin, PartyPopper, TriangleAlert } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { TownEvent } from '../../shared/types/tourism'
import {
  anniversaryOrdinal,
  formatEventDate,
  manilaToday,
  nextOccurrence,
  scheduleLabel,
  upcomingYear,
} from '../../shared/utils/eventDates'
import { eventPhotos } from '../data/tourismPhotos'
import { PhotoFrame } from './PhotoFrame'

export function EventCard({ event }: { event: TownEvent }) {
  // Worked out after mount: the page is prerendered, so a build-time "next date" would go stale.
  const [today, setToday] = useState<string | null>(null)
  useEffect(() => setToday(manilaToday()), [])

  const next = today ? nextOccurrence(event.schedule, today) : null
  const nextYear = today ? upcomingYear(event.schedule, today) : null
  const edition =
    event.sinceYear && nextYear ? `Next: ${anniversaryOrdinal(event.sinceYear, nextYear)} anniversary, ${nextYear}` : null

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card">
      <PhotoFrame photo={eventPhotos[event.slug]} icon={PartyPopper} />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-700">
          {event.localName ?? event.category}
        </p>
        <h3 className="mt-1 text-xl font-extrabold tracking-tight text-ink-950">{event.title}</h3>

        <dl className="mt-4 space-y-2 text-sm text-ink-700">
          <div className="flex gap-2.5">
            <dt className="sr-only">When</dt>
            <CalendarDays aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-600" />
            <dd>
              <span className="font-semibold text-ink-950">{scheduleLabel(event.schedule)}</span>
              {next ? <span className="block text-ink-600">{`Next: ${formatEventDate(next)}`}</span> : null}
              {edition ? <span className="block text-ink-600">{`${edition}`}</span> : null}
              {event.lastHeld ? (
                <span className="block text-ink-500">
                  {`Last held ${formatEventDate(event.lastHeld.start)}${
                    event.lastHeld.end ? ` – ${formatEventDate(event.lastHeld.end)}` : ''
                  }${event.lastHeld.note ? ` (${event.lastHeld.note})` : ''}`}
                </span>
              ) : null}
            </dd>
          </div>
          <div className="flex gap-2.5">
            <dt className="sr-only">Where</dt>
            <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-600" />
            <dd>{event.venue}</dd>
          </div>
        </dl>

        <p className="mt-4 text-sm leading-6 text-ink-600">{event.summary}</p>

        {event.highlights?.length ? (
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink-700 marker:text-brand-400">
            {event.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}

        {event.toConfirm ? (
          <p className="mt-4 flex gap-2 rounded-xl bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-900">
            <TriangleAlert aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
            {event.toConfirm}
          </p>
        ) : null}

        <p className="mt-auto pt-4 text-xs text-ink-500">
          {'Source: '}
          <a href={event.sourceUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-brand-700">
            {event.sourceLabel}
          </a>
        </p>
      </div>
    </article>
  )
}
