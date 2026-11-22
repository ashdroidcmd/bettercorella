'use client'

import { AlertTriangle, Mail, Phone, PhoneCall } from 'lucide-react'
import { hotlines } from '../../../government/shared/data/hotlines'
import { telHref } from '../../../../lib/utils'

function dialHref(number: string) {
  return telHref(number.replace(/\s+local\s+.*$/i, ''))
}

/** The 911 banner, then a card for every other hotline. */
export function HotlinesSection() {
  const primary = hotlines.find((hotline) => hotline.primary)
  const primaryNumber = primary?.numbers[0]
  const others = hotlines.filter((hotline) => !hotline.primary)

  return (
    <section id="hotlines" aria-labelledby="hotlines-heading" className="scroll-mt-28">
      <h2 id="hotlines-heading" className="sr-only">
        Hotlines
      </h2>
      {primary && primaryNumber ? (
        <div className="relative isolate overflow-hidden rounded-3xl bg-night p-6 text-white shadow-hero sm:p-9">
          <div aria-hidden="true" className="hero-grid absolute inset-0 opacity-60" />
          <div aria-hidden="true" className="absolute -right-16 -top-16 size-56 rounded-full bg-brand-strong/30 blur-3xl" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-300">
                <AlertTriangle aria-hidden="true" className="size-4" />
                {primary.label}
              </p>
              <a
                href={dialHref(primaryNumber)}
                className="mt-3 block text-6xl font-extrabold tracking-[-0.05em] transition hover:text-brand-300 sm:text-7xl"
              >
                {primaryNumber}
              </a>
              <p className="mt-2 max-w-md text-sm leading-6 text-white/60">{primary.note}</p>
            </div>
            <a
              href={dialHref(primaryNumber)}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-4 text-sm font-extrabold text-ink-950 transition hover:bg-card"
            >
              <PhoneCall aria-hidden="true" className="size-4" />
              {`Call ${primaryNumber}`}
            </a>
          </div>
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((hotline) => (
          <article key={hotline.label} className="flex h-full flex-col rounded-2xl border border-line bg-card p-5 shadow-card">
            <div className="flex items-start gap-3">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                <Phone aria-hidden="true" className="size-4" />
              </span>
              <h3 className="text-[15px] font-bold leading-6 text-ink-950">{hotline.label}</h3>
            </div>
            <p className="mt-3 flex-1 text-sm leading-6 text-ink-600">{hotline.note}</p>
            <div className="mt-4 space-y-1.5 border-t border-line pt-4">
              {hotline.numbers.map((number) => (
                <a
                  key={number}
                  href={dialHref(number)}
                  className="block text-base font-extrabold tracking-tight text-brand-700 transition hover:text-brand-800"
                >
                  {number}
                </a>
              ))}
              {hotline.email ? (
                <a
                  href={`mailto:${hotline.email}`}
                  className="mt-2 inline-flex items-center gap-1.5 break-all text-xs font-semibold text-ink-500 transition hover:text-brand-700"
                >
                  <Mail aria-hidden="true" className="size-3.5 shrink-0" />
                  {hotline.email}
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
