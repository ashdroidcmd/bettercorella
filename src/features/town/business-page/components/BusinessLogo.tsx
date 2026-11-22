'use client'

import Image from 'next/image'
import type { BusinessListing } from '../../shared/types/business'
import { businessPhotos } from '../data/businessPhotos'
import { BUSINESS_ICONS } from './businessMeta'

/** The listing's logo or photo, or its category icon when none has been added. */
export function BusinessLogo({ business, size }: { business: BusinessListing; size: 'sm' | 'lg' }) {
  const photo = businessPhotos[business.slug]
  const Icon = BUSINESS_ICONS[business.category]
  const box = size === 'lg' ? 'size-16 rounded-2xl' : 'size-12 rounded-xl'
  if (photo) {
    return (
      <span className={`relative block shrink-0 overflow-hidden border border-line bg-card ${box}`}>
        <Image src={photo.image} alt={photo.alt} fill sizes="64px" className="object-cover" />
      </span>
    )
  }
  return (
    <span aria-hidden="true" className={`inline-flex shrink-0 items-center justify-center bg-brand-50 text-brand-700 ${box}`}>
      <Icon className={size === 'lg' ? 'size-8' : 'size-6'} />
    </span>
  )
}
