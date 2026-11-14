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

// Sources (checked 2026-11-14):
// - PSA PSGC (psa.gov.ph/classification/psgc/barangays/0701215000): population 2024, barangays, income class
// - PSA 2020 census via PhilAtlas: population 2020
// - Provincial Government of Bohol (bohol.gov.ph): 1st District, land area 3,722 ha
// - corella-bohol.gov.ph (Contact, homepage, Citizen's Charter): address, phone, email, links, tagline, coordinates
export const city: CityProfile = {
  name: 'Corella',
  officialName: 'Municipality of Corella, Bohol',
  shortName: 'Corella',
  type: 'Municipality',
  province: 'Bohol',
  region: 'Central Visayas (Region VII)',
  tagline: 'The Home of the Endemic Philippine Tarsier',
  district: '1st District of Bohol',
  landAreaKm2: 37.22,
  population2024: 9889,
  population2020: 9479,
  populationYear: 2024,
  households2024: null,
  averageHouseholdSize: null,
  barangayCount: 8,
  districtCount: null,
  coordinates: { lat: 9.687, lng: 123.9214 },
  elevationM: null,
  zip: null,
  address: 'Corella Municipal Building, S Sayon St, Poblacion, Corella, Bohol',
  trunkline: '(038) 422-3865',
  email: 'municipality.corella@gmail.com',
  hours: null,
  website: 'https://corella-bohol.gov.ph/',
  citizensCharter: 'https://corella-bohol.gov.ph/citizens-charter/',
  sanggunian: null,
  archives: null,
  facebook: 'https://www.facebook.com/profile.php?id=100087002291566',
  incomeClass: '4th',
  povertyIncidence: null,
  povertyYear: null,
  revenue2024: null,
  expenditures2024: null,
  lastVerified: '2026-11-14',
}
