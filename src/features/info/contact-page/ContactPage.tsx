'use client'

import { MessageSquarePlus } from 'lucide-react'
import { PageHero } from '../../../components/ui/PageHero'
import { city } from '../../../config/city'
import { ISSUES_URL, SITE_NAME } from '../../../config/site'
import { telHref } from '../../../lib/utils'
import { HotlinesSection } from './components/HotlinesSection'
import { MunicipalHallCard } from './components/MunicipalHallCard'

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacts"
        title="Hotlines and contacts"
        description={`Call 911 for any emergency. Below are ${city.name}'s police, fire, MDRRMO and municipal numbers, the Municipal Hall, and how to send feedback.`}
        crumbs={[{ label: 'Contacts' }]}
      />

      <div className="container-page py-10 sm:py-14">
        <HotlinesSection />

        <section id="municipal-hall" className="mt-12 scroll-mt-28">
          <MunicipalHallCard />
        </section>

        <section id="feedback" className="mt-12 scroll-mt-28 rounded-2xl border border-line bg-card p-5 shadow-card sm:p-7">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
            <MessageSquarePlus aria-hidden="true" className="size-4" />
            {'Citizen feedback'}
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink-950">{'Feedback and complaints'}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-600">
            {`The Municipal Government of ${city.name} accepts feedback and complaints about its services through these channels, as listed in its Citizen’s Charter 2026.`}
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-line bg-surface p-4">
              <h3 className="text-sm font-bold text-ink-950">{'In person'}</h3>
              <p className="mt-1 text-sm leading-6 text-ink-600">
                {'Fill out the customer feedback form and drop it in the box near the Public Assistance and Complaints Desk at the Municipal Hall.'}
              </p>
            </div>
            <div className="rounded-xl border border-line bg-surface p-4">
              <h3 className="text-sm font-bold text-ink-950">{'By email or phone'}</h3>
              <p className="mt-1 text-sm leading-6 text-ink-600">
                {city.email ? (
                  <a href={`mailto:${city.email}`} className="break-all font-semibold text-brand-700 hover:text-brand-800">
                    {city.email}
                  </a>
                ) : null}
                {city.trunkline ? (
                  <>
                    <br />
                    <a href={telHref(city.trunkline)} className="font-semibold text-brand-700 hover:text-brand-800">
                      {city.trunkline}
                    </a>
                  </>
                ) : null}
              </p>
              <p className="mt-1 text-xs leading-5 text-ink-500">{'Feedback needing a reply is answered within three days, according to the charter.'}</p>
            </div>
            <div className="rounded-xl border border-line bg-surface p-4">
              <h3 className="text-sm font-bold text-ink-950">{`Errors on ${SITE_NAME}`}</h3>
              <p className="mt-1 text-sm leading-6 text-ink-600">
                {'This guide is independent, not the official municipal website. To correct something on this site, '}
                <a href={ISSUES_URL} target="_blank" rel="noreferrer" className="font-semibold text-brand-700 hover:text-brand-800">
                  {'report it on GitHub'}
                </a>
                .
              </p>
            </div>
          </div>
        </section>


      </div>
    </>
  )
}
