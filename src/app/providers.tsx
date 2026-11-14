'use client'

import { SerwistProvider, useSerwist } from '@serwist/turbopack/react'
import { MotionConfig } from 'motion/react'
import { useEffect, type ReactNode } from 'react'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { SmoothScroll } from '@/components/layout/SmoothScroll'

const UPDATE_CHECK_INTERVAL = 60 * 60 * 1000

/** Checks for a new service worker hourly and when the tab regains focus, so visitors get fresh content. */
function ServiceWorkerUpdates() {
  const { serwist } = useSerwist()

  useEffect(() => {
    if (!serwist) return
    let lastCheck = 0
    const check = () => {
      if (document.visibilityState !== 'visible' || !navigator.onLine) return
      if (Date.now() - lastCheck < 60_000) return
      lastCheck = Date.now()
      void serwist.update().catch(() => {
        // A failed check is retried on the next focus, visibility change, or interval.
      })
    }
    const interval = window.setInterval(check, UPDATE_CHECK_INTERVAL)
    window.addEventListener('focus', check)
    document.addEventListener('visibilitychange', check)
    return () => {
      window.clearInterval(interval)
      window.removeEventListener('focus', check)
      document.removeEventListener('visibilitychange', check)
    }
  }, [serwist])

  return null
}

/** Client-side app shell: service worker, reduced-motion preference, Lenis smooth scrolling, scroll reset. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <SerwistProvider swUrl="/serwist/sw.js" disable={process.env.NODE_ENV === 'development'}>
      <ServiceWorkerUpdates />
      <MotionConfig reducedMotion="user">
        <SmoothScroll>
          <ScrollToTop />
          {children}
        </SmoothScroll>
      </MotionConfig>
    </SerwistProvider>
  )
}
