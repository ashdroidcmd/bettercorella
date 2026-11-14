'use client'

import { Suspense, type ReactNode } from 'react'
import { ErrorBoundary } from './ErrorBoundary'
import { HotlineBar } from './HotlineBar'
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
      <HotlineBar />

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
