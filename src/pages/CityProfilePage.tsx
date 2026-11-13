import { LocalizedText } from '../i18n/LocalizedText'
import { ArrowRight, ExternalLink, Map, Milestone, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SourceNote } from '../components/SourceNote'
import { StatCard } from '../components/StatCard'
import { city } from '../data/city'
import { factGroups, history, mapLinks, pillars } from '../data/cityProfile'
import { formatDate, formatNumber } from '../lib/utils'
import { usePageMeta } from '../lib/usePageMeta'

export function CityProfilePage() {
  usePageMeta(
    'City profile',
    'The Municipality of Inabanga, Bohol in numbers: geography, people, economy, agriculture, infrastructure, health, education, and a timeline from 1572 to cityhood.',
  )

  return (
    <>
      <PageHero
        eyebrow="Town profile"
        title="Municipality of Inabanga, Bohol"
        description="A historic municipality of 50 barangays situated in north-western Bohol along the majestic Inabanga River, celebrated for its world-class raffia handloom weaving, rich heritage, and marine sanctuaries in the Danajon Bank."
        crumbs={[{ label: 'Town' }]}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            value={`${city.landAreaKm2} km²`}
            label="Land area · PSA"
            note="Covering 50 mainland, riverfront, and island communities"
          />
          <StatCard
            value={formatNumber(city.population2024)}
            label="Population (2024)"
            note="PSA Census of Population"
          />
          <StatCard value="+0.55%" label="Growth rate" note="PSA annual estimate" />
          <StatCard value={`${city.barangayCount} barangays`} label="Communities" note="Organized in 8 districts" />
        </div>
      </PageHero>

      <section>
        <div className="container-page py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              <div className="space-y-4 text-[15px] leading-7 text-ink-600">
                <p>
                  <LocalizedText text={"Inabanga is a vibrant municipality on the north-western coast of Bohol, situated along the Inabanga River—the largest and longest river system in the province. Its fertile plains, scenic karst hills, and coastal wetlands support a thriving community founded on agriculture, artisanal craft, and fisheries."} /></p>
                <p>
                  <LocalizedText text={"Recognized across the country as the 'Raffia Capital of Bohol', Inabanga preserves an illustrious handloom weaving tradition where local artisans transform buri palm fibers into exquisite textiles, hats, bags, and mats that reach domestic and international markets."} /></p>
                <p>
                  <LocalizedText text={"The municipality also serves as a coastal gateway to the Danajon Bank double-barrier reef through the Port of U-og and the vibrant island communities of Cuaming and Hambongan. With rich historical roots tied to the legendary Dagohoy Rebellion, Inabanga bridges deep cultural heritage with progressive civic development."} /></p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-2xl border border-line bg-surface p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-700"><LocalizedText text={"Strategic vision"} /></p>
                <h2 className="mt-2 text-xl font-extrabold tracking-tight text-ink-950">
                  <LocalizedText text={"Four pillars of development"} /></h2>
                <p className="mt-2 text-sm leading-6 text-ink-600">
                  <LocalizedText text={"The city focuses its inter-sectoral plans on four pillars, with the welfare of residents at the center."} /></p>
                <ul className="mt-5 space-y-4">
                  {pillars.map((pillar) => (
                    <li key={pillar.title} className="flex gap-3">
                      <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-brand-700 shadow-sm">
                        <ShieldCheck aria-hidden="true" className="size-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-ink-950"><LocalizedText text={pillar.title} /></span>
                        <span className="mt-0.5 block text-sm leading-6 text-ink-600"><LocalizedText text={pillar.description} /></span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Facts and figures"
              title="The city in numbers"
              description="Published figures from the city government, the Philippine Statistics Authority, and partner agencies. Where sources differ, the difference is noted."
            />
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {factGroups.map((group, index) => (
              <Reveal key={group.title} delay={(index % 3) * 0.05} className="h-full">
                <div className="h-full rounded-2xl border border-line bg-white p-5 shadow-card">
                  <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.1em] text-ink-950">
                    <Sparkles aria-hidden="true" className="size-4 text-brand-700" />
                    <LocalizedText text={group.title} />
                  </h3>
                  <dl className="mt-4 space-y-3 text-sm">
                    {group.facts.map((fact) => (
                      <div key={fact.label} className="border-b border-line pb-3 last:border-b-0 last:pb-0">
                        <dt className="text-xs font-semibold text-ink-500"><LocalizedText text={fact.label} /></dt>
                        <dd className="mt-0.5 font-semibold leading-6 text-ink-900"><LocalizedText text={fact.value} /></dd>
                        {fact.note ? <dd className="mt-0.5 text-xs leading-5 text-ink-500"><LocalizedText text={fact.note} /></dd> : null}
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="History"
              title="Historical Milestones of Inabanga"
              description="A condensed timeline of the places and events that shaped Inabanga, from 1744 parish founding to modern times."
              action={
                <a
                  href="https://drive.google.com/open?id=1ujckYlGTC0qpOMpxQag7KPmMFZCuCGsK"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition hover:text-brand-800"
                >
                  <LocalizedText text={"Complete archival history"} /><ExternalLink aria-hidden="true" className="size-4" />
                </a>
              }
            />
          </Reveal>

          <ol className="relative mt-8 space-y-8 border-l border-line pl-6 sm:pl-8">
            {history.map((item) => (
              <li key={item.year + item.title} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[31px] top-1 size-3 rounded-full border-2 border-white bg-brand-600 sm:-left-[39px]"
                />
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-700">{item.year}</p>
                <h3 className="mt-1 text-lg font-extrabold tracking-tight text-ink-950"><LocalizedText text={item.title} /></h3>
                <p className="mt-1.5 text-sm leading-6 text-ink-600"><LocalizedText text={item.text} /></p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Maps"
              title="Land use, hazards, and boundaries"
              description="Published planning maps from the city government open in a new tab."
            />
          </Reveal>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {mapLinks.map((mapLink) => (
              <li key={mapLink.url}>
                <a
                  href={mapLink.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4 text-sm font-semibold text-ink-800 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700 hover:shadow-float"
                >
                  <span className="inline-flex items-center gap-2">
                    <Map aria-hidden="true" className="size-4 shrink-0 text-brand-700" />
                    <LocalizedText text={mapLink.label} />
                  </span>
                  <ExternalLink
                    aria-hidden="true"
                    className="size-3.5 shrink-0 text-ink-400 transition group-hover:text-brand-700"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Keep exploring"
              title="Life and business in the city"
              description="Beyond government services: what to see and do, and why businesses invest in Inabanga."
            />
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Reveal>
              <Link
                to="/city/life"
                viewTransition
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Milestone aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-extrabold tracking-tight text-ink-950 group-hover:text-brand-700">
                  <LocalizedText text={"Life and tourism"} /></h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-ink-600">
                  <LocalizedText text={"Beach circuits, heritage sites, festivals, local food, and everything you need to plan a visit."} /></p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-700">
                  <LocalizedText text={"Explore the city"} /><ArrowRight aria-hidden="true" className="size-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>

            <Reveal delay={0.06}>
              <Link
                to="/city/business"
                viewTransition
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Users aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-extrabold tracking-tight text-ink-950 group-hover:text-brand-700">
                  <LocalizedText text={"Business and investment"} /></h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-ink-600">
                  <LocalizedText text={"Competitive rankings, priority sectors, cost of doing business, and the permits you need to start."} /></p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-700">
                  <LocalizedText text={"See the business profile"} /><ArrowRight aria-hidden="true" className="size-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          </div>

          <div className="mt-10">
            <SourceNote
              href="https://inabanga.gov.ph"
              linkLabel="Official Inabanga municipal portal"
              links={[
                {
                  href: 'https://rsso07.psa.gov.ph',
                  label: 'PSA Region VII Central Visayas: Bohol Census figures',
                },
                {
                  href: 'https://psa.gov.ph/classification/psgc/barangays/0701224000',
                  label: 'PSA Inabanga Bohol 50 barangay roster and PSGC records',
                },
                {
                  href: 'https://psa.gov.ph/system/files/psy/2025%20PSY%20Final_signed.pdf',
                  label: 'PSA Statistical Yearbook: population and area',
                },
              ]}
            >
              <LocalizedText text={"City profile, facts, maps, and history are published by the Municipal Government of Inabanga, with figures from the Philippine Statistics Authority and the Bohol Ecological Profile. Core city-profile sources were checked on"} trailingSpace />{formatDate(city.lastVerified)}<LocalizedText text={"; each linked dataset carries its own source date."} /></SourceNote>
          </div>
        </div>
      </section>
    </>
  )
}
