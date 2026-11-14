'use client'

import { ExternalLink, ShieldCheck } from 'lucide-react'
import { Suspense, type ReactNode } from 'react'
import { city } from '../../config/city'
import { ErrorBoundary } from './ErrorBoundary'
import { PageFallback } from './PageFallback'
import { ScrollProgress } from './ScrollProgress'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <a
        href="#main-content"
        className="sr-only z-[70] rounded-lg bg-white px-4 py-2 font-semibold text-brand-700 shadow-lg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {'Skip to content'}
      </a>
      <div className="relative z-[60] bg-ink-950 text-white">
        <div className="container-page flex flex-col gap-y-1 py-1.5 text-[11px] sm:text-xs lg:flex-row lg:items-center lg:justify-between lg:gap-x-6">
          <p className="inline-flex items-center gap-1.5 text-white/65">
            <ShieldCheck aria-hidden="true" className="size-3.5 text-accent" />
            {'An independent civic project, not the official municipal website'}
          </p>
          <div className="flex items-center justify-between gap-x-3 lg:justify-end lg:gap-x-4">
            {city.website ? (
              <a
                href={city.website}
                target="_blank"
                rel="noreferrer"
                aria-label="Official municipal website"
                className="inline-flex items-center gap-1 text-white/70 transition hover:text-white"
              >
                <span className="lg:hidden">LGU website</span>
                <span className="hidden lg:inline">Official municipal website</span>
                <ExternalLink aria-hidden="true" className="size-3" />
              </a>
            ) : null}
            <a href="tel:911" aria-label="Emergency: 911" className="font-bold text-accent transition hover:text-white">
              <span aria-hidden="true" className="lg:hidden">911</span>
              <span className="hidden lg:inline">Emergency: 911</span>
            </a>
          </div>
        </div>
      </div>

      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="flex-1 scroll-mt-24">
        <ErrorBoundary>
          <Suspense fallback={<PageFallback />}>
            {children}
          </Suspense>
        </ErrorBoundary>
      </main>

      <SiteFooter />
    </div>
  )
}
