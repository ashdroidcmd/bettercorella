'use client'

import Link from 'next/link'
import { NewsCard } from '../shared/components/NewsCard'
import { PageHero } from '../../../components/ui/PageHero'
import { PendingPage } from '../../../components/ui/PendingPage'
import { Reveal } from '../../../components/ui/Reveal'
import { SectionHeading } from '../../../components/ui/SectionHeading'
import { SourceNote } from '../../../components/ui/SourceNote'
import { city } from '../../../config/city'
import { news, newsLastVerified } from '../shared/data/news'
import { formatDate } from '../../../lib/utils'

function NewsArchivePageContent() {

  return (
    <>
      <PageHero
        eyebrow="From Municipal Hall"
        title="News archive"
        description="Browse every Municipal Hall story currently indexed by this guide. Each summary links to the original announcement."
        crumbs={[{ label: 'News', href: '/news' }, { label: 'News archive' }]}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-line bg-white/80 px-3 py-1.5 text-xs font-semibold text-ink-600 shadow-card">
            {news.length} {news.length === 1 ? 'story' : 'stories'} {"tracked"}</span>
          <Link
            href="/news"
           
            className="rounded-full border border-line bg-white/80 px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-card transition hover:border-brand-200"
          >
            {"Recent updates"}</Link>
        </div>
      </PageHero>

      <section>
        <div className="container-page py-10 sm:py-14">
          <div className="mb-7">
            <SectionHeading eyebrow="News archive" title="All indexed stories" />
          </div>
          {news.length ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {news.map((item, index) => (
                <Reveal key={item.slug} delay={(index % 3) * 0.05} className="h-full">
                  <NewsCard item={item} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-line bg-white p-6 text-sm leading-6 text-ink-600">
              {"No stories are currently indexed. Visit the official municipal channels for recent announcements."}</p>
          )}

          <div className="mt-10">
            <SourceNote href={city.website} linkLabel="Visit the official municipal website">
              {"This archive contains the stories currently tracked by the guide; it may not include every city announcement. Stories last verified on"}{' '}{formatDate(newsLastVerified)}.
            </SourceNote>
          </div>
        </div>
      </section>
    </>
  )
}

export function NewsArchivePage() {
  if (!news.length) {
    return (
      <PendingPage
      eyebrow="From Municipal Hall"
      title="News archive"
      description="Every news item tracked by this guide, each linked to the original announcement."
      crumbs={[{ label: 'News', href: '/news' }, { label: 'News archive' }]}
      topic="Municipal news and advisories"
      source="Each item will link to the official announcement."
      />
    )
  }
  return <NewsArchivePageContent />
}
