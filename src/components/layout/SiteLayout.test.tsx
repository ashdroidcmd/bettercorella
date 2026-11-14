// @vitest-environment jsdom
import { act, useSyncExternalStore, type AnchorHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { SiteLayout } from './SiteLayout'

// Minimal in-memory stand-in for the Next.js App Router: a pathname store plus a Link that updates it.
const router = vi.hoisted(() => {
  let pathname = '/'
  const listeners = new Set<() => void>()
  return {
    get: () => pathname,
    push: (next: string) => {
      pathname = next
      listeners.forEach((listener) => listener())
    },
    subscribe: (listener: () => void) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
  }
})

function usePathnameMock() {
  return useSyncExternalStore(router.subscribe, router.get)
}

vi.mock('next/navigation', () => ({
  usePathname: usePathnameMock,
  useRouter: () => ({ push: router.push, replace: router.push, prefetch: () => undefined }),
  useSearchParams: () => new URLSearchParams(),
}))

vi.mock('next/link', () => ({
  default: ({ href, onClick, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a
      {...props}
      href={href}
      onClick={(event) => {
        onClick?.(event)
        event.preventDefault()
        router.push(href)
      }}
    >
      {children}
    </a>
  ),
}))

function RouteContent() {
  const pathname = usePathnameMock()
  return <p>{pathname === '/services' ? 'Services route content' : 'Home route content'}</p>
}

vi.mock('./ScrollProgress', () => ({ ScrollProgress: () => null }))
vi.mock('./BackToTopButton', () => ({ BackToTopButton: () => null }))
vi.mock('motion/react', async () => {
  const React = await import('react')
  return {
    AnimatePresence: ({ children }: { children: ReactNode }) => children,
    useReducedMotion: () => false,
    motion: {
      div: React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
        ({ children, ...props }, ref) => React.createElement('div', { ...props, ref }, children),
      ),
    },
  }
})

describe('SiteLayout navigation', () => {
  let container: HTMLDivElement
  let root: Root
  let originalMatchMedia: PropertyDescriptor | undefined

  beforeEach(() => {
    ;(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
    originalMatchMedia = Object.getOwnPropertyDescriptor(window, 'matchMedia')
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn((query: string) => ({
        matches: query === '(hover: hover)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(() => false),
      })),
    })

    router.push('/')
    container = document.createElement('div')
    document.body.append(container)
    root = createRoot(container)
    act(() => {
      root.render(
        <SiteLayout>
          <RouteContent />
        </SiteLayout>,
      )
    })
  })

  afterEach(() => {
    act(() => root.unmount())
    container.remove()
    if (originalMatchMedia) Object.defineProperty(window, 'matchMedia', originalMatchMedia)
    else Reflect.deleteProperty(window, 'matchMedia')
  })

  it('opens the desktop menu and closes it after navigating to its overview', () => {
    const servicesButton = Array.from(container.querySelectorAll('nav[aria-label="Main navigation"] button'))
      .find((button) => button.textContent?.trim() === 'Services')
    expect(servicesButton).toBeDefined()

    act(() => servicesButton!.dispatchEvent(new MouseEvent('click', { bubbles: true })))
    expect(servicesButton?.getAttribute('aria-expanded')).toBe('true')

    const overviewLink = Array.from(container.querySelectorAll('a'))
      .find((link) => link.textContent?.trim().startsWith('View services overview'))
    expect(overviewLink).toBeDefined()

    act(() => overviewLink!.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })))
    expect(container.textContent).toContain('Services route content')
    expect(servicesButton?.getAttribute('aria-expanded')).toBe('false')
  })
})
