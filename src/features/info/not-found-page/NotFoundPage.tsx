'use client'

import { ArrowLeft, LayoutGrid } from 'lucide-react'
import Link from 'next/link'

export function NotFoundPage() {

  return (
    <section className="container-page py-16 sm:py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">404</p>
        <h1 className="mt-3 text-balance text-3xl font-extrabold tracking-[-0.035em] text-ink-950 sm:text-4xl">
          {"Page not found"}</h1>
        <p className="mt-3 text-pretty text-[15px] leading-7 text-ink-600">
          {"The link may be old, or the page may have moved. Head back home or search for a service, office, or barangay."}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
           
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-700"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            {"Back to home"}</Link>
          <Link
            href="/services"
           
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-bold text-ink-700 transition hover:border-brand-200 hover:text-brand-700"
          >
            <LayoutGrid aria-hidden="true" className="size-4" />
            {"Browse services"}</Link>
        </div>
      </div>
    </section>
  )
}
