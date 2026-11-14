'use client'

import type { Crumb } from './Breadcrumbs'
import { PageHero } from './PageHero'
import { PendingSection, type OfficialLink } from './PendingSection'

interface PendingPageProps {
  eyebrow: string
  title: string
  description: string
  crumbs: Crumb[]
  /** What is missing, e.g. "Municipal officials". */
  topic: string
  source?: string
  links?: OfficialLink[]
}

/** A whole page for a section whose Corella data has not been verified yet. */
export function PendingPage({ eyebrow, title, description, crumbs, topic, source, links }: PendingPageProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} crumbs={crumbs} />
      <PendingSection topic={topic} {...(source ? { source } : {})} {...(links ? { links } : {})} />
    </>
  )
}
