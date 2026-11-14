'use client'

import { AlertTriangle, ArrowRight, ArrowUpRight, Clock, ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import { ComingSoon } from '../../../components/ui/ComingSoon'
import { MapEmbed } from '../../../components/ui/MapEmbed'
import { PageHero } from '../../../components/ui/PageHero'
import { SourceNote } from '../../../components/ui/SourceNote'
import { city } from '../../../config/city'
import { ISSUES_URL, REPOSITORY_URL, SITE_NAME } from '../../../config/site'
import { telHref } from '../../../lib/utils'

/** Official municipal channels; only verified ones (non-null) are shown. */
const officialLinks = [
  { label: 'Official municipal website', href: city.website, note: 'News, announcements, and municipal departments' },
  { label: 'Citizen’s Charter', href: city.citizensCharter, note: 'Service requirements, fees, and steps' },
  { label: 'Sangguniang Bayan', href: city.sanggunian, note: 'Ordinances, resolutions, and legislative records' },
  { label: 'Ordinance archives', href: city.archives, note: 'Archived municipal ordinances' },
].filter((link): link is { label: string; href: string; note: string } => Boolean(link.href))

export function ContactPage() {
  const hasHallContacts = Boolean(city.address || city.trunkline || city.email)

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Reach Municipal Hall, or find the right source"
        description={`This independent guide does not process municipal transactions. For permits, records, assistance, and official answers, contact the Municipal Government of ${city.name} directly.`}
        crumbs={[{ label: 'Contact' }]}
      />

      <div className="container-page py-10 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          {hasHallContacts ? (
            <div className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">Municipal Hall</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink-950">{`Municipal Government of ${city.name}`}</h2>
              <dl className="mt-6 space-y-5 text-sm">
                {city.address ? (
                  <div>
                    <dt className="inline-flex items-center gap-2 font-semibold text-ink-900">
                      <MapPin aria-hidden="true" className="size-4 text-brand-600" />
                      {'Address'}
                    </dt>
                    <dd className="mt-0.5 leading-6 text-ink-600">{city.address}</dd>
                  </div>
                ) : null}
                {city.trunkline ? (
                  <div>
                    <dt className="inline-flex items-center gap-2 font-semibold text-ink-900">
                      <Phone aria-hidden="true" className="size-4 text-brand-600" />
                      {'Trunkline'}
                    </dt>
                    <dd className="mt-0.5">
                      <a href={telHref(city.trunkline)} className="font-semibold text-brand-700 hover:text-brand-800">
                        {city.trunkline}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {city.email ? (
                  <div>
                    <dt className="inline-flex items-center gap-2 font-semibold text-ink-900">
                      <Mail aria-hidden="true" className="size-4 text-brand-600" />
                      {'Email'}
                    </dt>
                    <dd className="mt-0.5">
                      <a href={`mailto:${city.email}`} className="break-all font-semibold text-brand-700 hover:text-brand-800">
                        {city.email}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {city.hours ? (
                  <div>
                    <dt className="inline-flex items-center gap-2 font-semibold text-ink-900">
                      <Clock aria-hidden="true" className="size-4 text-brand-600" />
                      {'Office hours'}
                    </dt>
                    <dd className="mt-0.5 leading-6 text-ink-600">{city.hours}</dd>
                  </div>
                ) : null}
              </dl>

              {city.coordinates ? (
                <MapEmbed
                  className="mt-6"
                  title={`Map of the ${city.name} Municipal Hall`}
                  query={`${city.coordinates.lat},${city.coordinates.lng}`}
                  zoom={17}
                />
              ) : null}

              {city.website || city.facebook ? (
                <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-5">
                  {city.website ? (
                    <a
                      href={city.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-800"
                    >
                      {'Official website'}
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                    </a>
                  ) : null}
                  {city.facebook ? (
                    <a
                      href={city.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-bold text-ink-700 transition hover:border-brand-200 hover:text-brand-700"
                    >
                      {'Facebook page'}
                      <ExternalLink aria-hidden="true" className="size-4" />
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : (
            <ComingSoon
              topic="Municipal Hall contact details (address, phone, email, office hours)"
              source="They will be confirmed with the municipal government before they are listed."
            />
          )}

          <div className="space-y-5">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-800">
                <AlertTriangle aria-hidden="true" className="size-4" />
                {'Emergency'}
              </p>
              <p className="mt-2 text-sm leading-6 text-amber-900/80">
                {'For police, fire, or medical emergencies, call'}{' '}
                <a href="tel:911" className="font-extrabold text-amber-950 underline decoration-amber-400 underline-offset-2">
                  911
                </a>{' '}
                {'immediately.'}
              </p>
              <Link
                href="/government/hotlines"
                className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-amber-900 hover:text-amber-950"
              >
                {'All emergency hotlines'}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
              <h2 className="text-base font-extrabold text-ink-950">About this guide</h2>
              <p className="mt-2 text-sm leading-6 text-ink-600">
                {`${SITE_NAME} is an independent volunteer project and cannot process municipal requests. To report a correction or share an official source, open an issue on the project's GitHub page.`}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                <a
                  href={ISSUES_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-800"
                >
                  {'Report a correction'}
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
                <a
                  href={REPOSITORY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-800"
                >
                  {'Project on GitHub'}
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
                <Link href="/about" className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-800">
                  {'About the project'}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {officialLinks.length ? (
          <section className="mt-12">
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">Official channels</h2>
            <p className="mt-2 text-2xl font-extrabold tracking-tight text-ink-950">Go straight to the source</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {officialLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start justify-between gap-4 rounded-2xl border border-line bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float"
                >
                  <span>
                    <span className="block text-sm font-bold text-ink-950 group-hover:text-brand-700">{item.label}</span>
                    <span className="mt-1 block text-xs leading-5 text-ink-500">{item.note}</span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-ink-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-700"
                  />
                </a>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-10">
          <SourceNote href="https://corella-bohol.gov.ph/contact-us/" linkLabel="Contact page of the official municipal website">
            {'Municipal Hall address, phone and email come from the official municipal website and the Citizen’s Charter 2026 (checked November 14, 2026). Office hours are added once confirmed with the LGU.'}
          </SourceNote>
        </div>
      </div>
    </>
  )
}
