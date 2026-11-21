'use client'

import { Clock, Code, ExternalLink, Globe, Info, Mail, MapPin, Phone, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Ref } from 'react'
import { telHref } from '../../../../lib/utils'
import { businessCategoryLabels } from '../../shared/data/businesses'
import type { BusinessListing } from '../../shared/types/business'
import { BusinessLogo } from './BusinessLogo'

/** Full details of a business listing in a native modal dialog (Esc, backdrop click and the X button close it). */
export function BusinessDetailsDialog({ business, ref }: { business: BusinessListing; ref: Ref<HTMLDialogElement> }) {
  const titleId = `business-${business.slug}-title`
  const { contact } = business
  const contactLinks: Array<{ icon: LucideIcon; label: string; href: string; external?: boolean }> = [
    ...(contact.phone ? [{ icon: Phone, label: contact.phone, href: telHref(contact.phone) }] : []),
    ...(contact.email ? [{ icon: Mail, label: contact.email, href: `mailto:${contact.email}` }] : []),
    ...(contact.facebook ? [{ icon: Globe, label: 'Facebook page', href: contact.facebook, external: true }] : []),
    ...(contact.website ? [{ icon: Globe, label: contact.website.replace(/^https?:\/\//, ''), href: contact.website, external: true }] : []),
    ...(contact.github ? [{ icon: Code, label: contact.github.replace(/^https?:\/\//, ''), href: contact.github, external: true }] : []),
  ]

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close()
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-xl overflow-hidden rounded-2xl bg-card p-0 text-ink-950 shadow-float backdrop:bg-night/60 backdrop:backdrop-blur-sm"
    >
      <div data-lenis-prevent className="max-h-[85vh] overflow-y-auto overscroll-contain p-5 sm:p-7">
        <div className="flex items-start gap-4">
          <BusinessLogo business={business} size="lg" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-700">
              {businessCategoryLabels[business.category]}
            </p>
            <h2 id={titleId} className="mt-1 text-2xl font-extrabold leading-tight tracking-tight">
              {business.name}
            </h2>
          </div>
          <form method="dialog">
            <button
              type="submit"
              aria-label="Close"
              className="inline-flex size-9 items-center justify-center rounded-full text-ink-500 transition hover:bg-surface hover:text-ink-950"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </form>
        </div>

        <p className="mt-4 text-[15px] font-semibold leading-7 text-ink-800">{business.tagline}</p>
        <p className="mt-2 text-[15px] leading-7 text-ink-700">{business.description}</p>

        <section className="mt-5">
          <h3 className="text-sm font-bold">What they offer</h3>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {business.offerings.map((tag) => (
              <li key={tag} className="rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-800">
                {tag}
              </li>
            ))}
          </ul>
        </section>

        <dl className="mt-5 space-y-2 text-sm text-ink-700">
          {business.address || business.barangay || business.serviceArea ? (
            <div className="flex gap-2.5">
              <dt className="sr-only">Location</dt>
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-600" />
              <dd>
                {[business.address, business.barangay && `Brgy. ${business.barangay}`, business.serviceArea]
                  .filter(Boolean)
                  .join(' · ')}
              </dd>
            </div>
          ) : null}
          {business.hours ? (
            <div className="flex gap-2.5">
              <dt className="sr-only">Hours</dt>
              <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-600" />
              <dd>{business.hours}</dd>
            </div>
          ) : null}
        </dl>

        {contactLinks.length ? (
          <section className="mt-5">
            <h3 className="text-sm font-bold">Contact</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {contactLinks.map(({ icon: Icon, label, href, external }) => (
                <li key={href}>
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="inline-flex items-center gap-2 rounded-xl border border-line px-3 py-2 text-sm font-bold text-brand-700 transition hover:border-brand-200 hover:bg-brand-50"
                  >
                    <Icon aria-hidden="true" className="size-4" />
                    {label}
                    {external ? <ExternalLink aria-hidden="true" className="size-3 text-ink-400" /> : null}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="mt-6 space-y-1.5 border-t border-line pt-4 text-xs text-ink-500">
          {business.maintainerListing ? (
            <p className="flex gap-1.5">
              <Info aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-brand-600" />
              {'Listed by the BetterCorella maintainer.'}
            </p>
          ) : null}
          <p>
            {`${business.sourceLabel} · `}
            {'BetterCorella does not endorse listed businesses.'}
          </p>
        </div>
      </div>
    </dialog>
  )
}
