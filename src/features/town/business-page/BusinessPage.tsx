'use client'

import { ArrowUpRight, FileCheck2 } from 'lucide-react'
import Link from 'next/link'
import { PageHero } from '../../../components/ui/PageHero'
import { Reveal } from '../../../components/ui/Reveal'
import { SectionHeading } from '../../../components/ui/SectionHeading'
import { SourceNote } from '../../../components/ui/SourceNote'
import { city } from '../../../config/city'
import { ISSUES_URL } from '../../../config/site'
import { businesses } from '../shared/data/businesses'
import { BusinessCard } from './components/BusinessCard'
import { BusinessForm } from './components/BusinessForm'

const BPLO_ONLINE = 'https://bpbc3.ibpls.com/corellabohol'

const permitLinks = [
  {
    label: 'Corella business permit services',
    href: '/services/business',
    description: "New and renewal business permit requirements from the Corella Citizen's Charter 2026.",
  },
  {
    label: 'Corella Online Business Permit Application',
    href: BPLO_ONLINE,
    description: 'Apply for or renew a business permit online, linked from the official municipal website.',
  },
  {
    label: 'Central Business Portal',
    href: 'https://business.gov.ph/',
    description: 'Register and renew businesses and access national business permits online.',
  },
  {
    label: 'DTI Business Name Registration',
    href: 'https://bnrs.dti.gov.ph',
    description: 'Register a business name for a sole proprietorship with the Department of Trade and Industry.',
  },
  {
    label: 'Cities and Municipalities Competitiveness Index',
    href: 'https://cmci.dti.gov.ph',
    description: 'DTI rankings of LGU competitiveness: economy, government efficiency, infrastructure and resiliency.',
  },
]

// The "Register your business" form: hidden until the Discord webhook is set up.
// See docs/features/business-directory.md ("Enabling the form").
const SHOW_BUSINESS_FORM = false

const pageLinks = [
  ['#directory', 'Local businesses'],
  ...(SHOW_BUSINESS_FORM ? [['#register', 'Register your business']] : []),
  ['#permits', 'Permits and portals'],
]

export function BusinessPage() {
  return (
    <>
      <PageHero
        eyebrow="Build and invest"
        title="Business and investment"
        description={`Local businesses and services in ${city.name}${SHOW_BUSINESS_FORM ? ', a free directory listing,' : ','} and the permits you need to start or renew a business.`}
        crumbs={[{ label: 'Town', href: '/town' }, { label: 'Business and investment' }]}
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

      <section id="directory" className="scroll-mt-24">
        <div className="container-page py-14 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Directory"
              title="Local businesses and services"
              description={`Shops, services and freelancers in and around ${city.name}. Listings come from the businesses themselves.`}
              action={
                SHOW_BUSINESS_FORM ? (
                  <a href="#register" className="text-sm font-bold text-brand-700 hover:text-brand-800">
                    {'Add your business'}
                  </a>
                ) : undefined
              }
            />
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {businesses.map((business, index) => (
              <Reveal key={business.slug} delay={index * 0.05} className="h-full">
                <BusinessCard business={business} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {SHOW_BUSINESS_FORM ? (
      <section id="register" className="scroll-mt-24 border-t border-line bg-surface">
        <div className="container-page grid gap-8 py-14 sm:py-16 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Free listing"
              title="Register your business"
              description="Run a shop, eatery, farm, repair service or freelance business in Corella? Send your details and a volunteer will add you to the directory."
            />
            <p className="mt-5 flex gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              <FileCheck2 aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              <span>
                {'This adds you to the BetterCorella directory. It is '}
                <strong>{'not'}</strong>
                {' a business permit. To register with the municipality, see '}
                <Link href="/services/business" className="font-bold underline underline-offset-2">
                  {'business permit services'}
                </Link>
                {' or '}
                <a href={BPLO_ONLINE} target="_blank" rel="noreferrer" className="font-bold underline underline-offset-2">
                  {'apply online'}
                </a>
                .
              </span>
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <BusinessForm />
          </Reveal>
        </div>
      </section>
      ) : null}

      <section id="permits" className="scroll-mt-24 border-t border-line">
        <div className="container-page py-14 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Start or renew"
              title="Permits and business portals"
              description="Official requirements and online services for registering and renewing a business."
            />
          </Reveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {permitLinks.map((link) => {
              const external = link.href.startsWith('http')
              const className =
                'group flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float'
              const content = (
                <>
                  <span className="flex items-start justify-between gap-3 text-base font-extrabold tracking-tight text-ink-950 group-hover:text-brand-700">
                    {link.label}
                    <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-ink-400 group-hover:text-brand-700" />
                  </span>
                  <span className="mt-2 text-sm leading-6 text-ink-600">{link.description}</span>
                </>
              )
              return (
                <li key={link.href}>
                  {external ? (
                    <a href={link.href} target="_blank" rel="noreferrer" className={className}>
                      {content}
                    </a>
                  ) : (
                    <Link href={link.href} className={className}>
                      {content}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="container-page py-10">
          <SourceNote href={ISSUES_URL} linkLabel="Report a wrong listing">
            {'Listings are provided by the businesses and checked by volunteers before they appear. BetterCorella and the municipal government do not endorse them.'}
          </SourceNote>
        </div>
      </section>
    </>
  )
}
