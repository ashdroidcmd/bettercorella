'use client'

import { ExternalLink } from 'lucide-react'
import { city } from '../../config/city'
import { ISSUES_URL } from '../../config/site'
import { EmptyState } from './EmptyState'

interface ComingSoonProps {
  /** What is missing, e.g. "Municipal officials". */
  topic: string
  /** Optional sentence about the official source this will come from. */
  source?: string
}

/**
 * Standard notice for data that has not been verified for Corella yet. Showing this is the
 * project's policy instead of guessing (see CONTRIBUTING.md).
 */
export function ComingSoon({ topic, source }: ComingSoonProps) {
  const description = [
    `${topic} for ${city.name} will appear here once they have been checked against an official source.`,
    source,
    'Have an official document or link? Share it so it can be added.',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <EmptyState
      title="Information coming soon"
      description={description}
      action={
        <a
          href={ISSUES_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-brand-700 transition hover:border-brand-200 hover:bg-brand-50"
        >
          Share an official source
          <ExternalLink aria-hidden="true" className="size-3.5" />
        </a>
      }
    />
  )
}
