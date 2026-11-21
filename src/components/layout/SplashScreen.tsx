'use client'

import { useEffect, useState } from 'react'
import logo from '../../assets/logo.png'
import logoLight from '../../assets/logo-light.png'

type Phase = 'loading' | 'done' | 'leaving' | 'gone'

/**
 * First-load splash: the logo in the center and a loading bar along the bottom. It sits in the
 * prerendered HTML, so it paints before JavaScript arrives, and leaves once the app hydrates.
 * It stays invisible for the first 300 ms (fast loads never see it) and hides itself after 4 s
 * even without JavaScript (see `.app-splash` in src/index.css). The root layout never remounts,
 * so client-side navigation never shows it again.
 */
export function SplashScreen() {
  const [phase, setPhase] = useState<Phase>('loading')

  useEffect(() => {
    document.documentElement.dataset.hydrated = 'true'
    setPhase('done')
    const leave = window.setTimeout(() => setPhase('leaving'), 200)
    const remove = window.setTimeout(() => setPhase('gone'), 500)
    return () => {
      window.clearTimeout(leave)
      window.clearTimeout(remove)
    }
  }, [])

  if (phase === 'gone') return null

  return (
    // The outer layer fades out on hydration; the inner layer carries the timed fade-in and the 4 s cap.
    <div
      className={`app-splash-root pointer-events-none fixed inset-0 z-[100] transition-opacity duration-300 ${phase === 'leaving' ? 'opacity-0' : ''}`}
      data-phase={phase}
      role="progressbar"
      aria-label="Loading BetterCorella"
      aria-busy={phase === 'loading'}
    >
      <div className="app-splash absolute inset-0 flex items-center justify-center bg-card">
        <img src={logo.src} alt="" width="655" height="199" className="h-16 w-auto sm:h-20 dark:hidden" />
        <img src={logoLight.src} alt="" width="655" height="199" className="hidden h-16 w-auto sm:h-20 dark:block" />
        <div className="absolute inset-x-0 bottom-0 h-1 overflow-hidden bg-line">
          <div className="app-splash-bar h-full bg-brand-strong" />
        </div>
      </div>
    </div>
  )
}
