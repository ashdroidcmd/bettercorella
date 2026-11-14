/**
 * Identity of the LGU this site covers.
 *
 * Only facts checked against an official source are filled in. Everything else is `null` until it
 * is verified (PSA for population and land area, the LGU for contacts, BLGF for finances), and the
 * UI hides or marks those values as pending. Record the check date in `lastVerified`.
 */
export interface CityProfile {
  name: string
  officialName: string
  shortName: string
  type: string
  province: string
  region: string
  tagline: string | null
  district: string | null
  landAreaKm2: number | null
  population2024: number | null
  population2020: number | null
  populationYear: number | null
  households2024: number | null
  averageHouseholdSize: number | null
  barangayCount: number | null
  districtCount: number | null
  coordinates: { lat: number; lng: number } | null
  elevationM: number | null
  zip: string | null
  address: string | null
  trunkline: string | null
  email: string | null
  hours: string | null
  website: string | null
  citizensCharter: string | null
  sanggunian: string | null
  archives: string | null
  facebook: string | null
  incomeClass: string | null
  povertyIncidence: string | null
  povertyYear: number | null
  revenue2024: number | null
  expenditures2024: number | null
  lastVerified: string | null
}

export const city: CityProfile = {
  name: 'Corella',
  officialName: 'Municipality of Corella, Bohol',
  shortName: 'Corella',
  type: 'Municipality',
  province: 'Bohol',
  region: 'Central Visayas (Region VII)',
  tagline: null,
  district: null,
  landAreaKm2: null,
  population2024: null,
  population2020: null,
  populationYear: null,
  households2024: null,
  averageHouseholdSize: null,
  barangayCount: null,
  districtCount: null,
  coordinates: null,
  elevationM: null,
  zip: null,
  address: null,
  trunkline: null,
  email: null,
  hours: null,
  website: null,
  citizensCharter: null,
  sanggunian: null,
  archives: null,
  facebook: null,
  incomeClass: null,
  povertyIncidence: null,
  povertyYear: null,
  revenue2024: null,
  expenditures2024: null,
  lastVerified: null,
}
