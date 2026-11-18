import type { StaticImageData } from 'next/image'

// Logos and photos live in src/assets/business/ (see the README there). Import one, then map the listing's slug to it.

export interface BusinessPhoto {
  image: StaticImageData
  alt: string
}

export const businessPhotos: Record<string, BusinessPhoto> = {}
