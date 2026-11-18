'use client'

import { ExternalLink } from 'lucide-react'
import type { ReactNode } from 'react'
import type { BridgeGroup, Disclaimer } from '../budget-api/types'

const groupTone: Record<BridgeGroup, string> = {
  house_only: 'bg-amber-50 text-amber-800',
  nep_only: 'bg-rose-50 text-rose-700',
  unchanged: 'bg-emerald-50 text-emerald-700',
  increased: 'bg-sky-50 text-sky-800',
  decreased: 'bg-violet-50 text-violet-700',
  scope_review: 'bg-slate-100 text-slate-700',
}

/** The API's status for a 2027 line, coloured by its group. */
export function StatusChip({ group, label, held }: { group: BridgeGroup; label: string; held: boolean }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-1">
      <span
        className={`inline-flex rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] ${groupTone[group]}`}
      >
        {label}
      </span>
      {held ? (
        <span
          className="inline-flex rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-600"
          title="The pairing of NEP and House lines is not confirmed."
        >
          Unconfirmed match
        </span>
      ) : null}
    </span>
  )
}

export function External({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={
        className ??
        'inline-flex items-center gap-1 font-semibold text-brand-700 underline decoration-brand-300 underline-offset-2 hover:text-brand-800'
      }
    >
      {children}
      <ExternalLink aria-hidden="true" className="size-3.5 shrink-0" />
    </a>
  )
}

/** The API's own notices, verbatim, wherever its figures appear. */
export function Disclaimers({ items }: { items: Disclaimer[] }) {
  if (!items.length) return null
  return (
    <div className="space-y-3 rounded-2xl border border-amber-200 bg-amber-50/60 p-4 text-sm leading-6 text-ink-700">
      {items.map((d) => (
        <div key={d.id}>
          <p className="font-bold text-ink-900">{d.title}</p>
          <p className="mt-1">
            {d.body}{' '}
            <a
              href={d.url}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-brand-700 underline decoration-brand-300 underline-offset-2"
            >
              Read the full notice
            </a>
            .
          </p>
        </div>
      ))}
    </div>
  )
}
