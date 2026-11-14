'use client'

import {
  ArrowRight,
  Bookmark,
  Briefcase,
  Clock,
  Landmark,
  MapPin,
  MonitorSmartphone,
  Phone,
  TreePalm,
  X,
} from 'lucide-react'
import Link from 'next/link'
import { CategoryCard } from '../../services/shared/components/CategoryCard'
import { Reveal } from '../../../components/ui/Reveal'
import { SectionHeading } from '../../../components/ui/SectionHeading'
import { StatCard } from '../../../components/ui/StatCard'
import logoMark from '../../../assets/logo-1x1.png'
import { categories } from '../../services/shared/data/categories'
import { city } from '../../../config/city'
import { stats } from '../../town/shared/data/stats'
import { removeSavedService, useSavedServices } from '../../services/shared/utils/savedServices'
import { telHref } from '../../../lib/utils'

const featuredCategories = categories.slice(0, 6)
const popularServices = [
  { label: 'Business permit', href: '/services/business/bplo-service-issuance-of-business-permits-licenses-for-new' },
  { label: 'Birth, marriage and death certificates', href: '/services/certificates/issuance-of-certification-certified-true-copy' },
  { label: 'Real property tax', href: '/services/taxes/real-property-tax' },
  { label: 'Cedula', href: '/services/taxes/community-tax-certificate' },
  { label: 'Senior citizen, PWD and solo parent ID', href: '/services/social/securing-certificates-at-the-municipal-social-welfare-and' },
]

const exploreLinks = [
  {
    title: 'Town profile',
    href: '/town',
    description: `Facts, history, maps, and figures about ${city.name}.`,
    icon: Landmark,
  },
  {
    title: 'Life and tourism',
    href: '/town/life',
    description: 'Culture, festivals, and things to do.',
    icon: TreePalm,
  },
  {
    title: 'Business and investment',
    href: '/town/business',
    description: 'Permits, guidance, and national business portals.',
    icon: Briefcase,
  },
  {
    title: 'Online services',
    href: '/online-services',
    description: 'National portals for permits, jobs, and records.',
    icon: MonitorSmartphone,
  },
]

export function HomePage() {


  const savedServices = useSavedServices()

  return (
    <>
      <section className="relative isolate z-30 overflow-visible bg-ink-950 text-white">
        <div className="container-page relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
          <div className="min-w-0">
            <Reveal>
              <div className="flex flex-wrap items-center gap-2 text-xs text-white/65">
                <span className="font-semibold text-white/90">Independent civic guide</span>
                <span className="text-white/30" aria-hidden="true">•</span>
                <Link href="/about" className="underline underline-offset-4 transition hover:text-white">
                  {'How this project works'}
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-6 max-w-3xl text-balance text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                {`${city.name}, made clearer.`}
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-white/65 sm:text-lg">
                {'Find municipal services, meet your officials, explore the barangays, and follow public money — with links back to the official sources.'}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">{'Popular services'}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {popularServices.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:bg-white/10 hover:text-white"
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-ink-950 transition hover:bg-white"
                >
                  {'Browse services'}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <aside className="rounded-3xl border border-white/15 bg-white/[0.06] p-5 shadow-hero backdrop-blur-sm sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">
                    {`${city.name}, ${city.province}`}</p>
                  <p className="mt-1 text-xl font-extrabold tracking-tight">Town at a glance</p>
                </div>
                <img
                  src={logoMark.src}
                  alt=""
                  width="512"
                  height="512"
                  className="size-12 shrink-0 rounded-xl object-contain"
                />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {stats.length ? (
                  stats.map((stat) => <StatCard key={stat.label} {...stat} tone="dark" />)
                ) : (
                  <>
                    <StatCard value={city.province} label="Province" note={city.region} tone="dark" />
                    <StatCard value={city.type} label="LGU type" note="Local government unit" tone="dark" />
                  </>
                )}
              </div>

              <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm text-white/60">
                {city.address ? (
                  <p className="flex gap-2.5">
                    <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-300" />
                    <span>{city.address}</span>
                  </p>
                ) : null}
                {city.trunkline ? (
                  <p className="flex gap-2.5">
                    <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-300" />
                    <a href={telHref(city.trunkline)} className="transition hover:text-white">
                      {city.trunkline}
                    </a>
                  </p>
                ) : null}
                {city.hours ? (
                  <p className="flex gap-2.5">
                    <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-300" />
                    <span>{city.hours}</span>
                  </p>
                ) : null}
                {!city.address && !city.trunkline ? (
                  <p className="flex gap-2.5">
                    <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-300" />
                    <span>{'Town facts and Municipal Hall contacts are added as they are verified against official sources.'}</span>
                  </p>
                ) : null}
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {savedServices.length ? (
        <section className="border-b border-line bg-surface">
          <div className="container-page py-10 sm:py-12">
            <div id="saved" className="scroll-mt-24 flex flex-wrap items-center justify-between gap-3">
              <h2 className="inline-flex items-center gap-2 text-lg font-extrabold tracking-tight text-ink-950">
                <Bookmark aria-hidden="true" className="size-4 text-brand-700" />
                {'Your saved services'}
              </h2>
              <Link
                href="/services"
               
                className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 transition hover:text-brand-800"
              >
                {'All services'}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>

            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {savedServices.map((service) => (
                <li key={`${service.category}-${service.slug}`} className="flex items-stretch gap-2">
                  <Link
                    href={`/services/${service.category}/${service.slug}`}
                   
                    className="group flex min-w-0 flex-1 items-center justify-between gap-3 rounded-xl border border-line bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-bold text-ink-950 group-hover:text-brand-700">
                        {service.title}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-ink-500">{service.office}</span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-ink-400 transition group-hover:translate-x-0.5 group-hover:text-brand-700"
                    />
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeSavedService(service)}
                    aria-label={`${'Remove from saved services'}: ${service.title}`}
                    className="inline-flex w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-white text-ink-400 transition hover:border-red-200 hover:text-red-600"
                  >
                    <X aria-hidden="true" className="size-4" />
                  </button>
                </li>
              ))}
            </ul>

            <p className="mt-3 text-xs text-ink-500">Saved in this browser only — no account needed.</p>
          </div>
        </section>
      ) : null}

      <section>
        <div className="container-page py-16 sm:py-20">
          <div id="services" className="scroll-mt-24">
            <Reveal>
              <SectionHeading
                eyebrow="Municipal services"
                title="What do you need today?"
                description="Start with the services residents and businesses use most, grouped the way Municipal Hall organizes them."
                action={
                  <Link
                    href="/services"
                   
                    className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition hover:text-brand-800"
                  >
                    {'All services'}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                }
              />
            </Reveal>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCategories.map((category, index) => (
              <Reveal key={category.slug} delay={index * 0.05} className="h-full">
                <CategoryCard category={category} count={category.serviceCount} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-24 border-t border-line bg-surface">
        <div className="container-page py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Get to know the town"
              title={`Explore ${city.name}`}
              description="Beyond transactions: the town’s profile, its life and tourism, doing business here, and the portals that save you a trip."
            />
          </Reveal>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {exploreLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <Reveal key={link.href} delay={index * 0.05} className="h-full">
                  <Link
                    href={link.href}
                   
                    className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float"
                  >
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <h3 className="mt-4 text-base font-extrabold tracking-tight text-ink-950">{link.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-ink-600">{link.description}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-700">
                      {'Explore'}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
