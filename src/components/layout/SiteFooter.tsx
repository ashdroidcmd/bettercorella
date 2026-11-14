'use client'

import { ArrowUpRight, ChevronDown, Clock, ExternalLink, HandHeart, Mail, MapPin, Phone } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import Link from 'next/link'
import logoLight from '../../assets/logo-light.png'
import { categories } from '../../features/services/shared/data/categories'
import { city } from '../../config/city'
import { ISSUES_URL, REPOSITORY_URL, SITE_NAME } from '../../config/site'
import { telHref } from '../../lib/utils'
import { BackToTopButton } from './BackToTopButton'

function FooterGroup({ title, children }: { title: string; children: ReactNode }) {
  const [desktopOpen, setDesktopOpen] = useState(false)

  useEffect(() => {
    const breakpoint = window.matchMedia('(min-width: 1024px)')
    const updateOpenState = () => setDesktopOpen(breakpoint.matches)
    updateOpenState()
    breakpoint.addEventListener('change', updateOpenState)
    return () => breakpoint.removeEventListener('change', updateOpenState)
  }, [])

  return (
    <details
      open={desktopOpen}
      className="group/footer rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0"
    >
      <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.16em] text-white/60 focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300 [&::-webkit-details-marker]:hidden lg:min-h-0 lg:cursor-default">
        {title}
        <ChevronDown
          aria-hidden="true"
          className="size-4 shrink-0 text-white/50 transition group-open/footer:rotate-180 lg:hidden"
        />
      </summary>
      <div className="mt-3 lg:mt-4">{children}</div>
    </details>
  )
}

export function SiteFooter() {

  return (
    <>
      <footer className="mt-auto bg-ink-950 text-white">
        <div className="container-page py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_0.8fr_0.8fr_1.1fr]">
            <div>
              <div>
                <img
                  src={logoLight.src}
                  alt={SITE_NAME}
                  width="802"
                  height="199"
                  className="h-10 w-auto"
                />
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">
                  {'Bohol · Civic guide'}
                </p>
              </div>
              <p className="mt-5 max-w-sm text-sm leading-6 text-white/60">
                {`A clearer, independent guide to ${city.name}'s municipal services, public officials, barangays, and public money. Built with open data and links to official sources.`}
              </p>
            </div>

            <FooterGroup title="Explore">
              <ul className="space-y-2.5 text-sm">
                {[
                  { label: 'All services', href: '/services' },
                  { label: 'Online services', href: '/online-services' },
                  { label: 'Municipal government', href: '/government' },
                  { label: 'Municipal officials', href: '/government/officials' },
                  { label: 'Barangays', href: '/government/barangays' },
                  { label: 'Ordinances and executive orders', href: '/government/legislation' },
                  { label: 'Town profile', href: '/town' },
                  { label: 'Life and tourism', href: '/town/life' },
                  { label: 'Places directory', href: '/town/places' },
                  { label: 'Business and investment', href: '/town/business' },
                  { label: 'Transparency', href: '/transparency' },
                  { label: 'Infrastructure projects', href: '/transparency/projects' },
                  { label: 'News', href: '/news' },
                  { label: 'News archive', href: '/news/archive' },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-white/70 transition hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterGroup>

            <FooterGroup title="Service categories">
              <ul className="space-y-2.5 text-sm">
                {categories.slice(0, 6).map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/services/${category.slug}`}
                     
                      className="text-white/70 transition hover:text-white"
                    >
                      {category.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterGroup>

            <FooterGroup title="Municipal Hall">
              <ul className="space-y-3 text-sm text-white/70">
                {city.address ? (
                  <li className="flex gap-2.5">
                    <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-300" />
                    <span>{city.address}</span>
                  </li>
                ) : null}
                {city.trunkline ? (
                  <li className="flex gap-2.5">
                    <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-300" />
                    <a href={telHref(city.trunkline)} className="transition hover:text-white">
                      {city.trunkline}
                    </a>
                  </li>
                ) : null}
                {city.email ? (
                  <li className="flex gap-2.5">
                    <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-300" />
                    <a href={`mailto:${city.email}`} className="break-all transition hover:text-white">
                      {city.email}
                    </a>
                  </li>
                ) : null}
                {city.hours ? (
                  <li className="flex gap-2.5">
                    <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-300" />
                    <span>{city.hours}</span>
                  </li>
                ) : null}
                {!city.address && !city.trunkline && !city.email ? (
                  <li className="flex gap-2.5">
                    <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-300" />
                    <span>{`Municipal Hall contact details for ${city.name} will be listed once verified.`}</span>
                  </li>
                ) : null}
              </ul>
            </FooterGroup>
          </div>

          <section
            aria-label="Official and broader civic ecosystem"
            className="mt-10 grid gap-8 border-t border-white/10 py-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center"
          >
            <div className="flex items-start gap-4">
              <a
                href="https://bettergov.ph/"
                target="_blank"
                rel="noreferrer"
                aria-label="BetterGov.ph national civic portal (opens in a new tab)"
                className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 shadow-xs transition hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
              >
                <img
                  src="/logos/bettergov-icon-primary.svg"
                  alt="BetterGov.ph"
                  width="48"
                  height="48"
                  className="size-full object-contain"
                />
              </a>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">
                  {'Official & broader ecosystem'}
                </p>
                <nav aria-label="Official and broader civic ecosystem" className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  {city.website ? (
                    <a href={city.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-white/85 transition hover:text-white">
                      {'Official municipal website'}
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    </a>
                  ) : null}
                  <a href="https://bettergov.ph/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-white/85 transition hover:text-white">
                    {'National services — BetterGov'}
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </a>
                  <a href="https://lgu.bettergov.ph/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-white/85 transition hover:text-white">
                    {'Other LGUs — BetterLGU'}
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </a>
                </nav>
                <p className="mt-3 text-xs leading-5 text-white/55">
                  {`${SITE_NAME} is an independent civic project, not the official website of the Municipal Government of ${city.name}.`}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-white/75">
                {`Cost to the people of ${city.name}`} <span className="ml-1 font-extrabold text-emerald-300">₱0</span>
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={`${ISSUES_URL}/new`}
                  target="_blank"
                  rel="noreferrer"
                  title="Offer to help or suggest an improvement"
                  className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
                >
                  <HandHeart aria-hidden="true" className="size-4" />
                  {'Volunteer with us'}
                </a>
                <a
                  href={REPOSITORY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
                >
                  <ExternalLink aria-hidden="true" className="size-4" />
                  {'Open-source on GitHub'}
                </a>
                <a
                  href={`${REPOSITORY_URL}/blob/main/CONTRIBUTING.md`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
                >
                  {'Contribute code with us'}
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </a>
              </div>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/60 lg:flex-row lg:items-center lg:justify-between">
            <p>
              {`© 2026 ${SITE_NAME}. Independent civic project. Source dates vary by dataset; see page citations.`}
            </p>
            <nav aria-label="Legal and site links" className="flex flex-wrap gap-x-5 gap-y-2">
              {[
                { label: 'Sitemap', href: '/sitemap' },
                { label: 'Accessibility', href: '/accessibility' },
                { label: 'Privacy', href: '/privacy' },
                { label: 'Terms', href: '/terms' },
                { label: 'Contact', href: '/contact' },
              ].map(({ label, href }) => (
                <Link key={href} href={href} className="transition hover:text-white">
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </footer>
      <BackToTopButton />
    </>
  )
}
