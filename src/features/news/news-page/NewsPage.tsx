'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { NewsCard } from '../shared/components/NewsCard'
import { PageHero } from '../../../components/ui/PageHero'
import { PendingPage } from '../../../components/ui/PendingPage'
import { Reveal } from '../../../components/ui/Reveal'
import { SectionHeading } from '../../../components/ui/SectionHeading'
import { SourceNote } from '../../../components/ui/SourceNote'
import { city } from '../../../config/city'
import { news, newsLastVerified } from '../shared/data/news'
import { formatDate, formatNumber } from '../../../lib/utils'

function NewsPageContent() {

  return (
    <>
      <PageHero
        eyebrow="From Municipal Hall"
        title="News and updates"
        description={`Recent announcements from the Municipal Government of ${city.name}. Every story links to its official source.`}
        crumbs={[{ label: 'News' }]}
      />

      <section>
        <div className="container-page py-12 sm:py-16">
          <div className="mb-7">
            <SectionHeading eyebrow="Latest updates" title="Recent stories" />
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {news.slice(0, 6).map((item, index) => (
              <Reveal key={item.slug} delay={(index % 3) * 0.05} className="h-full">
                <NewsCard item={item} />
              </Reveal>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-white p-5 shadow-card">
            <div>
              <p className="text-sm font-extrabold text-ink-950">Looking for an older update?</p>
              <p className="mt-0.5 text-sm text-ink-600">{formatNumber(news.length)} {'recent stories in the archive.'}</p>
            </div>
            <Link
              href="/news/archive"
             
              className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-800"
            >
              {'Open the news archive'}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <div className="mt-10">
          <SourceNote href={city.website} linkLabel="Visit the official municipal website">
            {'News summaries and images are from the municipal government. Open the official source for full stories. Last checked'} {formatDate(newsLastVerified)}.
            </SourceNote>
          </div>
        </div>
      </section>
    </>
  )
}

export function NewsPage() {
  if (!news.length) {
    return (
      <PendingPage
      eyebrow="From Municipal Hall"
      title="News and updates"
      description={`Announcements and advisories from the Municipal Government of ${city.name}, each linked to its official source.`}
      crumbs={[{ label: 'News' }]}
      topic="Municipal news and advisories"
      source="Each item will link to the official announcement."
      />
    )
  }
  return <NewsPageContent />
}
