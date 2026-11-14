'use client'

import { ExternalLink } from 'lucide-react'
import type { Official } from '../types'

interface OfficialCardProps {
  official: Official
  featured?: boolean
}

/** Text-only official card: role, name, note and profile link. A small avatar shows only if a photo exists. */
export function OfficialCard({ official, featured = false }: OfficialCardProps) {
  return (
    <article
      className={`flex h-full items-start gap-4 rounded-2xl border border-line p-5 shadow-card ${
        featured ? 'border-l-4 border-l-brand-600 bg-brand-50/60 sm:p-6' : 'bg-white'
      }`}
    >
      {official.photo ? (
        <img
          src={official.photo}
          alt={`Portrait of ${official.name}`}
          loading="lazy"
          className="size-14 shrink-0 rounded-full object-cover object-top"
        />
      ) : null}
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-700">{official.role}</p>
        <h3
          className={`mt-1.5 text-balance font-extrabold leading-tight tracking-tight text-ink-950 ${
            featured ? 'text-2xl' : 'text-lg'
          }`}
        >
          {official.name}
        </h3>
        {official.note ? <p className="mt-1.5 text-xs leading-5 text-ink-500">{official.note}</p> : null}
        {official.bioUrl ? (
          <a
            href={official.bioUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-800"
          >
            {'Official profile'}
            <ExternalLink aria-hidden="true" className="size-3" />
          </a>
        ) : null}
      </div>
    </article>
  )
}
