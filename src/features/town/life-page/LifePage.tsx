'use client'

import { PageHero } from '../../../components/ui/PageHero'
import { Reveal } from '../../../components/ui/Reveal'
import { SectionHeading } from '../../../components/ui/SectionHeading'
import { SourceNote } from '../../../components/ui/SourceNote'
import { city } from '../../../config/city'
import { touristSpots, townEvents } from '../shared/data/tourism'
import { EventCard } from './components/EventCard'
import { SpotCard } from './components/SpotCard'
import { SuggestForm } from './components/SuggestForm'

// The Discord suggestion form: hidden until the webhook is set up. See docs/features/tourism-events.md.
const SHOW_SUGGEST_FORM = false

const pageLinks = [
  ['#events', 'Events and fiestas'],
  ['#spots', 'Places to visit'],
  ...(SHOW_SUGGEST_FORM ? [['#suggest', 'Suggest a spot or event']] : []),
]

export function LifePage() {
  return (
    <>
      <PageHero
        eyebrow="Discover the town"
        title="Tourism and events"
        description={`${city.tagline ? `${city.tagline}. ` : ''}Fiestas, celebrations and places to visit in ${city.name}, ${city.province}.`}
        crumbs={[{ label: 'Town', href: '/town' }, { label: 'Tourism and events' }]}
      >
        <nav aria-label="On this page" className="flex flex-wrap gap-2">
          {pageLinks.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:bg-white/10 hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>
      </PageHero>

      <section id="events" className="scroll-mt-24">
        <div className="container-page py-14 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Events and fiestas"
              title={`Celebrations in ${city.name}`}
              description="The town fiesta and the founding anniversary, held every year."
            />
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {townEvents.map((event, index) => (
              <Reveal key={event.slug} delay={index * 0.05} className="h-full">
                <EventCard event={event} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="spots" className="scroll-mt-24 border-t border-line bg-surface">
        <div className="container-page py-14 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Places to visit"
              title="Tourist spots"
              description="Nature, heritage and farm visits around town, with hours and fees where known."
            />
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {touristSpots.map((spot, index) => (
              <Reveal key={spot.slug} delay={index * 0.05} className="h-full">
                <SpotCard spot={spot} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {SHOW_SUGGEST_FORM ? (
      <section id="suggest" className="scroll-mt-24 border-t border-line">
        <div className="container-page grid gap-8 py-14 sm:py-16 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Help fill this page"
              title="Suggest a spot or event"
              description="Know a fiesta, festival, falls, viewpoint or farm that should be here? Send the basics. A volunteer checks it before anything is published."
            />
          </Reveal>
          <Reveal delay={0.06}>
            <SuggestForm />
          </Reveal>
        </div>
      </section>
      ) : null}

      <section className="border-t border-line">
        <div className="container-page py-10">
          <SourceNote
            href="https://corella-bohol.gov.ph/what-to-see/"
            linkLabel="What to see in Corella"
            links={[
              { href: 'https://corella-bohol.gov.ph/history/', label: 'History of Corella' },
              { href: 'https://beta.tourism.gov.ph', label: 'the Department of Tourism' },
            ]}
          >
            {'Schedules, hours and fees can change. Confirm with the venue or the municipal government before you go. Official sources:'}
          </SourceNote>
        </div>
      </section>
    </>
  )
}
