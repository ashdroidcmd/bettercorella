'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useSyncExternalStore } from 'react'

/** localStorage key for the visitor's choice. Read by the init script in `src/app/layout.tsx`, keep the two in sync. */
export const THEME_STORAGE_KEY = 'bettercorella-theme'

const darkQuery = '(prefers-color-scheme: dark)'

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}

const isDark = () => document.documentElement.classList.contains('dark')

function storedTheme() {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY)
  } catch {
    return null
  }
}

/** Light/dark switch. Follows the OS setting until the visitor picks a theme. */
export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, isDark, () => false)

  useEffect(() => {
    const media = window.matchMedia(darkQuery)
    const follow = () => {
      if (!storedTheme()) document.documentElement.classList.toggle('dark', media.matches)
    }
    media.addEventListener('change', follow)
    return () => media.removeEventListener('change', follow)
  }, [])

  function toggle() {
    const next = !isDark()
    document.documentElement.classList.toggle('dark', next)
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next ? 'dark' : 'light')
    } catch {
      // Storage can be blocked (private mode); the theme still applies for this page view.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label="Dark mode"
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex size-11 items-center justify-center rounded-xl text-ink-700 transition hover:bg-surface hover:text-ink-950"
    >
      <Moon aria-hidden="true" className="size-5 dark:hidden" />
      <Sun aria-hidden="true" className="hidden size-5 dark:block" />
    </button>
  )
}
