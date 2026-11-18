'use client'

import type { LucideIcon } from 'lucide-react'
import Image from 'next/image'
import type { TourismPhoto } from '../data/tourismPhotos'

/** The card's photo with its credit, or a branded icon panel when no photo has been added yet. */
export function PhotoFrame({ photo, icon: Icon }: { photo: TourismPhoto | undefined; icon: LucideIcon }) {
  if (!photo) {
    return (
      <div aria-hidden="true" className="flex h-24 items-center justify-center bg-brand-50 text-brand-300">
        <Icon className="size-9" />
      </div>
    )
  }

  return (
    <figure className="relative aspect-[16/9] overflow-hidden bg-surface">
      <Image
        src={photo.image}
        alt={photo.alt}
        fill
        placeholder="blur"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
        style={photo.position ? { objectPosition: photo.position } : undefined}
      />
      {photo.credit ? (
        <figcaption className="absolute bottom-0 right-0 rounded-tl-lg bg-ink-950/60 px-2 py-0.5 text-[10px] text-white/85">
          {photo.creditUrl ? (
            <a href={photo.creditUrl} target="_blank" rel="noreferrer" className="hover:text-white">
              {photo.credit}
            </a>
          ) : (
            photo.credit
          )}
        </figcaption>
      ) : null}
    </figure>
  )
}
