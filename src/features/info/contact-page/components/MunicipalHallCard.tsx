'use client'

import { ArrowUpRight, Clock, ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import { ComingSoon } from '../../../../components/ui/ComingSoon'
import { MapEmbed } from '../../../../components/ui/MapEmbed'
import { city } from '../../../../config/city'
import { telHref } from '../../../../lib/utils'

/** Municipal Hall address, trunkline, email and map. Used on the contacts page and the home page. */
export function MunicipalHallCard() {
  const hasHallContacts = Boolean(city.address || city.trunkline || city.email)

  return (
    <>
      {hasHallContacts ? (
        <div className="grid gap-6 rounded-2xl border border-line bg-white p-5 shadow-card sm:p-7 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">Municipal Hall</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink-950">{`Municipal Government of ${city.name}`}</h2>
            <dl className="mt-6 space-y-5 text-sm">
              {city.address ? (
                <div>
                  <dt className="inline-flex items-center gap-2 font-semibold text-ink-900">
                    <MapPin aria-hidden="true" className="size-4 text-brand-600" />
                    {'Address'}
                  </dt>
                  <dd className="mt-0.5 leading-6 text-ink-600">{city.address}</dd>
                </div>
              ) : null}
              {city.trunkline ? (
                <div>
                  <dt className="inline-flex items-center gap-2 font-semibold text-ink-900">
                    <Phone aria-hidden="true" className="size-4 text-brand-600" />
                    {'Trunkline'}
                  </dt>
                  <dd className="mt-0.5">
                    <a href={telHref(city.trunkline)} className="font-semibold text-brand-700 hover:text-brand-800">
                      {city.trunkline}
                    </a>
                  </dd>
                </div>
              ) : null}
              {city.email ? (
                <div>
                  <dt className="inline-flex items-center gap-2 font-semibold text-ink-900">
                    <Mail aria-hidden="true" className="size-4 text-brand-600" />
                    {'Email'}
                  </dt>
                  <dd className="mt-0.5">
                    <a href={`mailto:${city.email}`} className="break-all font-semibold text-brand-700 hover:text-brand-800">
                      {city.email}
                    </a>
                  </dd>
                </div>
              ) : null}
              {city.hours ? (
                <div>
                  <dt className="inline-flex items-center gap-2 font-semibold text-ink-900">
                    <Clock aria-hidden="true" className="size-4 text-brand-600" />
                    {'Office hours'}
                  </dt>
                  <dd className="mt-0.5 leading-6 text-ink-600">{city.hours}</dd>
                </div>
              ) : null}
            </dl>

            {city.website || city.facebook ? (
              <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-5">
                {city.website ? (
                  <a
                    href={city.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-800"
                  >
                    {'Official website'}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </a>
                ) : null}
                {city.facebook ? (
                  <a
                    href={city.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-bold text-ink-700 transition hover:border-brand-200 hover:text-brand-700"
                  >
                    {'Facebook page'}
                    <ExternalLink aria-hidden="true" className="size-4" />
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>

          {city.coordinates ? (
            <MapEmbed
              title={`Map of the ${city.name} Municipal Hall`}
              query={`${city.coordinates.lat},${city.coordinates.lng}`}
              zoom={17}
            />
          ) : null}
        </div>
      ) : (
        <ComingSoon
          topic="Municipal Hall contact details (address, phone, email, office hours)"
          source="They will be confirmed with the municipal government before they are listed."
        />
      )}
    </>
  )
}
