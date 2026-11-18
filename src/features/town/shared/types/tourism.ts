export type SpotCategory = 'nature' | 'heritage' | 'faith' | 'agritourism' | 'food' | 'other'

export interface OpeningHours {
  days: string
  hours: string
}

export interface Fee {
  label: string
  amountPhp: number
}

export interface TourismContact {
  phone?: string
  email?: string
  website?: string
  facebook?: string
}

export interface TouristSpot {
  slug: string
  name: string
  categories: SpotCategory[]
  /** Must match a barangay name in `government/shared/data/barangays.ts`. */
  barangay: string
  address: string
  coordinates?: { lat: number; lng: number }
  summary: string
  hours?: OpeningHours[]
  closedOn?: string[]
  fees?: Fee[]
  paymentNote?: string
  goodToKnow?: string[]
  contact?: TourismContact
  /** Details not yet confirmed by an official source; shown as "Confirm before visiting". */
  toConfirm?: string
  sourceLabel: string
  sourceUrl: string
  lastVerified: string
}

export type EventSchedule =
  /** Same date every year, e.g. the fiesta on April 27. */
  | { kind: 'annual-fixed'; month: number; day: number }
  /** Recurs every year in a given month, on dates set each year. */
  | { kind: 'annual-approx'; month: number; text: string }

export type EventCategory = 'fiesta' | 'anniversary' | 'festival' | 'religious' | 'other'

export interface TownEvent {
  slug: string
  title: string
  localName?: string
  category: EventCategory
  schedule: EventSchedule
  /** Year of the first celebration, used to number anniversaries (e.g. founding year). */
  sinceYear?: number
  lastHeld?: { start: string; end?: string; note?: string }
  venue: string
  barangay?: string
  summary: string
  highlights?: string[]
  organizer?: string
  toConfirm?: string
  sourceLabel: string
  sourceUrl: string
  lastVerified: string
}
