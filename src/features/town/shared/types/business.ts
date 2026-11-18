export type BusinessCategory =
  | 'tech'
  | 'food'
  | 'retail'
  | 'services'
  | 'agri'
  | 'lodging'
  | 'transport'
  | 'health'
  | 'other'

export interface BusinessContact {
  phone?: string
  email?: string
  facebook?: string
  website?: string
  github?: string
}

export interface BusinessListing {
  slug: string
  name: string
  category: BusinessCategory
  tagline: string
  description: string
  /** Short tags for what the business offers, e.g. "Websites and web apps". */
  offerings: string[]
  /** Must match a barangay name in `government/shared/data/barangays.ts` when set. */
  barangay?: string
  address?: string
  /** For businesses without a shop, e.g. "Corella, Bohol and remote". */
  serviceArea?: string
  hours?: string
  contact: BusinessContact
  /** Shows a "Listed by the BetterCorella maintainer" disclosure. */
  maintainerListing?: boolean
  sourceLabel: string
  sourceUrl: string
  lastVerified: string
}
