'use client'

import { ArrowUpRight } from 'lucide-react'
import { ComingSoon } from './ComingSoon'
import { SectionHeading } from './SectionHeading'

export interface OfficialLink {
  label: string
  href: string
  description: string
}

interface PendingSectionProps {
  /** What is missing, e.g. "Budget and spending figures". */
  topic: string
  /** The official source the data will come from. */
  source?: string
  /** Official places residents can check in the meantime. */
  links?: OfficialLink[]
}

/** Page body for a section whose Corella data has not been verified yet. */
export function PendingSection({ topic, source, links = [] }: PendingSectionProps) {
  return (
    <section>
      <div className="container-page space-y-12 py-12 sm:py-16">
        <ComingSoon topic={topic} {...(source ? { source } : {})} />

        {links.length ? (
          <div>
            <div className="mb-6">
              <SectionHeading eyebrow="In the meantime" title="Official sources you can check" />
            </div>
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float"
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="text-base font-bold text-ink-950">{link.label}</span>
                      <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-ink-400 transition group-hover:text-brand-700" />
                    </span>
                    <span className="mt-1.5 text-sm leading-6 text-ink-600">{link.description}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  )
}
