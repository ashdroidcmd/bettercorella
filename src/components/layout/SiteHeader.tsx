'use client'

import { Menu, MessageSquarePlus, X } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import logo from '../../assets/logo.png'

/** Six plain links: a small town needs no dropdown menus. */
const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', activePaths: ['/online-services'] },
  { label: 'Government', href: '/government', exclude: ['/government/hotlines'] },
  { label: 'Transparency', href: '/transparency' },
  { label: 'Barangays', href: '/barangays' },
  { label: 'Hotlines & Contact', href: '/contact', activePaths: ['/government/hotlines'] },
]

type NavLink = (typeof navLinks)[number] & { activePaths?: string[]; exclude?: string[] }

function isActive(link: NavLink, pathname: string) {
  const matches = (path: string) => pathname === path || pathname.startsWith(`${path}/`)
  if (link.href === '/') return pathname === '/'
  if (link.exclude?.some(matches)) return false
  return matches(link.href) || Boolean(link.activePaths?.some(matches))
}

const FEEDBACK_HREF = '/contact#feedback'

export function SiteHeader() {
  const lenis = useLenis()
  const reduceMotion = useReducedMotion()
  const pathname = usePathname()
  const [menuPath, setMenuPath] = useState<string | null>(null)
  const menuOpen = menuPath === pathname
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuPath(null)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [menuOpen])

  const linkClass = (active: boolean) =>
    `rounded-xl px-3.5 py-2 text-[15px] font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-950 ${
      active ? 'bg-brand-50 font-semibold text-brand-700' : 'text-ink-600 hover:bg-surface hover:text-ink-950'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4 lg:h-20">
        <Link
          href="/"
          aria-label="BetterCorella home"
          onClick={(event) => {
            setMenuPath(null)
            if (pathname !== '/') return
            event.preventDefault()
            if (lenis) lenis.scrollTo(0, { immediate: Boolean(reduceMotion) })
            else window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
          }}
          className="flex shrink-0 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
        >
          <img src={logo.src} alt="BetterCorella" width="655" height="199" className="h-10 w-auto sm:h-12" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link, pathname)
              return (
                <li key={link.href}>
                  <Link href={link.href} aria-current={active ? 'page' : undefined} className={linkClass(active)}>
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={FEEDBACK_HREF}
            className="hidden items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 sm:inline-flex"
          >
            <MessageSquarePlus aria-hidden="true" className="size-4" />
            {'Citizen Feedback'}
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuPath(menuOpen ? null : pathname)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex size-11 items-center justify-center rounded-xl text-ink-700 transition hover:bg-surface lg:hidden"
          >
            {menuOpen ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full z-40 h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-white shadow-lg lg:hidden"
        >
          <nav aria-label="Main" className="container-page py-4">
            <ul className="space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link, pathname)
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      onClick={() => setMenuPath(null)}
                      className={`block rounded-xl px-4 py-3 text-base font-semibold ${
                        active ? 'bg-brand-50 text-brand-700' : 'text-ink-800 hover:bg-surface'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
            <Link
              href={FEEDBACK_HREF}
              onClick={() => setMenuPath(null)}
              className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-base font-bold text-white transition hover:bg-brand-700"
            >
              <MessageSquarePlus aria-hidden="true" className="size-5" />
              {'Citizen Feedback'}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
