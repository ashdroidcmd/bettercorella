'use client'

import { ChevronRight, House } from 'lucide-react'
import Link from 'next/link'
import { cn } from '../../lib/utils'

export interface Crumb {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: Crumb[]
  className?: string
  /** `dark` for use on the dark page hero. */
  tone?: 'light' | 'dark'
}

export function Breadcrumbs({ items, className, tone = 'light' }: BreadcrumbsProps) {
  const dark = tone === 'dark'
  const linkClass = dark
    ? 'font-medium text-white/60 transition hover:text-white'
    : 'font-medium text-ink-500 transition hover:text-brand-700'

  return (
    <nav aria-label="Breadcrumb" className={cn('flex flex-wrap items-center gap-x-2 gap-y-1 text-sm', className)}>
      <Link href="/" className={cn('inline-flex items-center gap-1.5', linkClass)}>
        <House aria-hidden="true" className="size-3.5" />
        <span>Home</span>
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
            <ChevronRight aria-hidden="true" className={cn('size-3.5', dark ? 'text-white/30' : 'text-ink-400')} />
            {item.href && !isLast ? (
              <Link href={item.href} className={linkClass}>
                <span>{item.label}</span>
              </Link>
            ) : (
              <span
                aria-current={isLast ? 'page' : undefined}
                className={cn('font-semibold', dark ? 'text-white/90' : 'text-ink-700')}
              >
                <span>{item.label}</span>
              </span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
