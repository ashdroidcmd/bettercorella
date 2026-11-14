'use client'

import { useLenis } from 'lenis/react'
import { useReducedMotion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useLayoutEffect } from 'react'

/** Resets scroll (or jumps to the URL hash) on navigation, including when Lenis drives scrolling. */
export function ScrollToTop() {
  const pathname = usePathname()
  const lenis = useLenis()
  const reduceMotion = useReducedMotion()

  useLayoutEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        if (lenis) {
          lenis.scrollTo(target)
        } else {
          target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
        }
        return
      }
    }

    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [pathname, lenis, reduceMotion])

  return null
}
