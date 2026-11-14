'use client'

import { ArrowUpRight, HandHeart } from 'lucide-react'
import Link from 'next/link'
import logoLight from '../../assets/logo-light.png'
import { city } from '../../config/city'
import { ISSUES_URL, REPOSITORY_URL, SITE_NAME } from '../../config/site'
import { BackToTopButton } from './BackToTopButton'

function FacebookIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="currentColor">
      <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07Z" />
    </svg>
  )
}

function GitHubIcon({ className = 'size-5' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3Z" />
    </svg>
  )
}

const quickLinks = [
  { label: 'Town profile', href: '/town' },
  { label: 'Online services', href: '/online-services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Sitemap', href: '/sitemap' },
  { label: 'Terms of Use', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Accessibility', href: '/accessibility' },
]

const resources = [
  city.website ? { label: `Official LGU ${city.name} website`, href: city.website } : null,
  city.citizensCharter ? { label: "Citizen's Charter", href: city.citizensCharter } : null,
  city.facebook ? { label: `LGU ${city.name} Facebook`, href: city.facebook } : null,
  { label: 'Open Data (BetterGov)', href: 'https://data.bettergov.ph/' },
  { label: 'Freedom of Information', href: 'https://www.foi.gov.ph/' },
  { label: 'BLGF Portal', href: 'https://blgf.gov.ph/' },
  { label: 'BetterGov.ph', href: 'https://bettergov.ph/' },
].filter((link) => link !== null)

const headingClass = 'text-sm font-bold uppercase tracking-[0.12em] text-white/50'
const linkClass = 'text-white/80 transition hover:text-white'
const pillClass =
  'inline-flex min-h-11 items-center gap-2.5 rounded-full bg-white/[0.07] px-4 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/[0.12] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300'

export function SiteFooter() {
  return (
    <>
      <footer className="mt-auto bg-ink-950 text-white">
        <div className="container-page py-12 sm:py-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr]">
            <div>
              <img src={logoLight.src} alt={SITE_NAME} width="655" height="199" className="h-12 w-auto" />
              <p className="mt-5 max-w-sm text-sm leading-6 text-white/70">
                {`Helping the people of ${city.name} find municipal services, officials, barangays and public information, with links back to official sources.`}
              </p>
              <div className="mt-6 flex gap-3">
                {city.facebook ? (
                  <a
                    href={city.facebook}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`LGU ${city.name} on Facebook (opens in a new tab)`}
                    className="inline-flex size-11 items-center justify-center rounded-xl bg-white/[0.07] text-white/80 transition hover:bg-white/[0.12] hover:text-white"
                  >
                    <FacebookIcon />
                  </a>
                ) : null}
                <a
                  href={REPOSITORY_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${SITE_NAME} on GitHub (opens in a new tab)`}
                  className="inline-flex size-11 items-center justify-center rounded-xl bg-white/[0.07] text-white/80 transition hover:bg-white/[0.12] hover:text-white"
                >
                  <GitHubIcon />
                </a>
              </div>
            </div>

            <nav aria-label="Quick links">
              <h2 className={headingClass}>Quick links</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {quickLinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className={linkClass}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Resources">
              <h2 className={headingClass}>Resources</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {resources.map(({ label, href }) => (
                  <li key={href}>
                    <a href={href} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-1 ${linkClass}`}>
                      {label}
                      <ArrowUpRight aria-hidden="true" className="size-3.5 text-white/40" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col items-start gap-3">
              <p className="rounded-lg bg-emerald-400/10 px-3.5 py-2 text-sm font-semibold text-white/85">
                {`Cost to the people of ${city.name} =`} <span className="font-extrabold text-emerald-300">₱0</span>
              </p>
              <a href={`${ISSUES_URL}/new`} target="_blank" rel="noreferrer" className={pillClass}>
                <HandHeart aria-hidden="true" className="size-4" />
                {'Volunteer with us'}
              </a>
              <a href={`${REPOSITORY_URL}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noreferrer" className={pillClass}>
                <GitHubIcon className="size-4" />
                {'Contribute code with us'}
              </a>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6 text-xs leading-5 text-white/55">
            <p>
              {`© 2026 ${SITE_NAME} · ISC License · All public information is sourced from official government portals. ${SITE_NAME} is an independent civic project, not the official website of the Municipal Government of ${city.name}.`}
            </p>
          </div>
        </div>
      </footer>
      <BackToTopButton />
    </>
  )
}
