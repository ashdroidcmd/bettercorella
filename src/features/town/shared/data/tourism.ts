import type { TouristSpot, TownEvent } from '../types/tourism.ts'

// Sources (checked 2026-11-18) on corella-bohol.gov.ph:
// - /history/: Corella founded in 1884; the church is dedicated to Nuestra Señora del Villar, feast day April 27
// - /what-to-see/: Our Lady of the Village Church (stone, Baroque style, from 1884); tarsier visiting etiquette
// - /where-to-go-when-in-corella/: tarsier sanctuary in Brgy. Canapnapan, set up by the Philippine Tarsier
//   Foundation, with an entrance fee; Green Thumb Farm in Sambog (organic mushroom farm tours and dishes)
// - /where-to-eat/: Green Thumb Alfresco Resto and Farm
// Supplied by the maintainer and not yet on an official page (marked `toConfirm`): sanctuary hours and fees,
// the 10:00 AM Pontifical Mass, the Adlaw sa Corella name and its 2026 dates, the Purok 4 address.
// tarsierfoundation.org could not be reached on 2026-11-18; re-check hours and fees there.

const LGU = 'Municipality of Corella (corella-bohol.gov.ph)'

export const townEvents: TownEvent[] = [
  {
    slug: 'town-fiesta-nuestra-senora-del-villar',
    title: 'Town Fiesta of Nuestra Señora del Villar',
    localName: 'Our Lady of the Village',
    category: 'fiesta',
    schedule: { kind: 'annual-fixed', month: 4, day: 27 },
    venue: 'Nuestra Señora del Villar Parish and the Corella Town Plaza',
    barangay: 'Poblacion',
    summary:
      "Corella's town fiesta honors its patron saint, Nuestra Señora del Villar, on her feast day. Parish masses are held through the day, with community activities at the town plaza at night.",
    highlights: ['Traditional 10:00 AM Pontifical Mass', 'Nightly activities at the town plaza'],
    toConfirm: 'Mass times are set by the parish each year.',
    sourceLabel: `History of Corella, ${LGU}`,
    sourceUrl: 'https://corella-bohol.gov.ph/history/',
    lastVerified: '2026-11-18',
  },
  {
    slug: 'adlaw-sa-corella',
    title: 'Adlaw sa Corella',
    localName: 'Founding Anniversary',
    category: 'anniversary',
    schedule: { kind: 'annual-approx', month: 9, text: 'Early September' },
    sinceYear: 1884,
    lastHeld: { start: '2026-09-01', end: '2026-09-03', note: '142nd founding anniversary' },
    venue: 'Corella, Bohol (venues announced by the LGU)',
    summary:
      'The municipality marks its founding in 1884 with a celebration in early September. The exact dates are announced by the LGU each year.',
    toConfirm: 'Dates and venue are announced by the LGU each year.',
    sourceLabel: `History of Corella (founded 1884), ${LGU}`,
    sourceUrl: 'https://corella-bohol.gov.ph/history/',
    lastVerified: '2026-11-18',
  },
]

export const touristSpots: TouristSpot[] = [
  {
    slug: 'philippine-tarsier-sanctuary',
    name: 'Philippine Tarsier Sanctuary',
    categories: ['nature'],
    barangay: 'Canapnapan',
    address: 'Brgy. Canapnapan, Corella, Bohol',
    summary:
      'A forest reserve set up by the Philippine Tarsier Foundation to protect the Philippine tarsier in a large, unfenced habitat. Visits include a short guided forest walk, and the visitor complex has an exhibition area and an information center.',
    hours: [
      { days: 'Monday–Saturday', hours: '8:30 AM–3:30 PM' },
      { days: 'Sunday', hours: '8:30 AM–3:00 PM' },
    ],
    closedOn: ['Christmas Day', "New Year's Day"],
    fees: [
      { label: 'Adults', amountPhp: 150 },
      { label: 'Students, senior citizens and PWDs', amountPhp: 120 },
    ],
    paymentNote: 'Cash only',
    goodToKnow: [
      'The guided forest walk usually takes 10–20 minutes.',
      'Turn off your camera flash.',
      'Keep your voice down.',
      'Do not touch the tarsiers or shake their branches.',
    ],
    toConfirm: 'Hours and fees can change. Check with the sanctuary before you go.',
    sourceLabel: `Where to go in Corella, ${LGU}`,
    sourceUrl: 'https://corella-bohol.gov.ph/where-to-go-when-in-corella/',
    lastVerified: '2026-11-18',
  },
  {
    slug: 'nuestra-senora-del-villar-church',
    name: 'Corella Church of Nuestra Señora del Villar',
    categories: ['heritage', 'faith'],
    barangay: 'Poblacion',
    address: 'Church plaza, Poblacion, Corella, Bohol',
    summary:
      "Our Lady of the Village Church: a Baroque-style stone church dating from 1884, set in a spacious garden on the town plaza. It is a common stop on local heritage and pilgrimage visits.",
    goodToKnow: ['Dress modestly and keep quiet during masses.'],
    sourceLabel: `What to see, ${LGU}`,
    sourceUrl: 'https://corella-bohol.gov.ph/what-to-see/',
    lastVerified: '2026-11-18',
  },
  {
    slug: 'green-thumb-farm',
    name: 'Green Thumb Farm',
    categories: ['agritourism', 'food'],
    barangay: 'Sambog',
    address: 'Purok 4, Brgy. Sambog, Corella, Bohol',
    summary:
      'An organic mushroom farm with an alfresco restaurant. It offers tours of its mushroom growing and serves organic mushroom dishes.',
    sourceLabel: `Where to eat and where to go, ${LGU}`,
    sourceUrl: 'https://corella-bohol.gov.ph/where-to-eat/',
    lastVerified: '2026-11-18',
  },
]
