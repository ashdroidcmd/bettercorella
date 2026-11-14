import { ArrowRight, Phone, ShieldAlert, Siren } from 'lucide-react'
import Link from 'next/link'
import { city } from '../../config/city'
import { hotlines } from '../../features/government/shared/data/hotlines'
import { telHref } from '../../lib/utils'

// Hotlines with a `short` label are shown in the bar (add PNP, BFP, etc. in hotlines.ts with `short`).
const barHotlines = hotlines.filter((hotline) => hotline.short)

/** Dark top bar with 24/7 hotlines, BetterInabanga style. */
export function HotlineBar() {
  return (
    <div className="relative z-[60] bg-ink-950 text-white">
      <div className="container-page flex items-center justify-between gap-x-4 gap-y-1 py-2 text-xs">
        <div className="flex min-w-0 items-center gap-3">
          <span className="shrink-0 rounded-md bg-red-700 px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white">
            24/7 Hotlines
          </span>
          <span className="hidden truncate text-white/65 xl:inline">{`Emergency response, ${city.name}:`}</span>
        </div>

        <ul className="hidden min-w-0 flex-1 items-center justify-end gap-x-5 md:flex">
          {barHotlines.map((hotline) => {
            const Icon = hotline.primary ? Siren : /MDRRMO|PNP|BFP|police|fire|rescue/i.test(hotline.short ?? '') ? ShieldAlert : Phone
            const number = hotline.numbers[0] ?? ''
            return (
              <li key={hotline.label} className="inline-flex shrink-0 items-center gap-1.5">
                <Icon aria-hidden="true" className="size-3.5 text-accent" />
                <span className="font-bold">{hotline.short}:</span>
                <a href={telHref(number)} className="text-white/80 transition hover:text-white">
                  {number}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-4">
          <a href="tel:911" className="inline-flex items-center gap-1.5 font-bold text-accent md:hidden">
            <Siren aria-hidden="true" className="size-3.5" />
            {'Emergency: 911'}
          </a>
          <Link
            href="/government/hotlines"
            className="inline-flex items-center gap-1 font-semibold text-accent underline-offset-4 transition hover:text-white hover:underline"
          >
            {'All hotlines'}
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
