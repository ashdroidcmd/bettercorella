// @vitest-environment jsdom
import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Reveal } from './Reveal'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

let container: HTMLDivElement
let root: Root

beforeEach(() => {
  container = document.createElement('div')
  document.body.append(container)
  root = createRoot(container)
})

afterEach(() => {
  act(() => root.unmount())
  container.remove()
  vi.unstubAllGlobals()
})

const revealed = () => container.querySelector('[data-reveal]')?.hasAttribute('data-revealed')

describe('Reveal', () => {
  it('reveals once its content scrolls into view', () => {
    let notify: IntersectionObserverCallback = () => undefined
    const disconnect = vi.fn()
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(callback: IntersectionObserverCallback) {
          notify = callback
        }
        observe() {}
        disconnect = disconnect
      },
    )

    act(() => root.render(<Reveal>Hello</Reveal>))
    expect(container.textContent).toBe('Hello')
    expect(revealed()).toBe(false)

    act(() => notify([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver))
    expect(revealed()).toBe(true)
    expect(disconnect).toHaveBeenCalled()
  })

  it('reveals immediately when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    act(() => root.render(<Reveal delay={0.2}>Hello</Reveal>))
    expect(revealed()).toBe(true)
    expect((container.firstElementChild as HTMLElement).style.getPropertyValue('--reveal-delay')).toBe('0.2s')
  })
})
