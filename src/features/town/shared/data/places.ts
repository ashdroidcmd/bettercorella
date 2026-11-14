import { city } from '../../../../config/city.ts'

export type PlaceCategoryId =
  | 'government'
  | 'safety'
  | 'health'
  | 'education'
  | 'stay'
  | 'attractions'
  | 'parks'
  | 'transport'
  | 'finance'
  | 'faith'
  | 'everyday'

export interface PlaceCategory {
  id: PlaceCategoryId
  label: string
  mapQuery: string
  description: string
}

export interface PlaceRecord {
  id: string
  name: string
  category: PlaceCategoryId
  address: string
  sourceLabel: string
  sourceUrl: string
  note?: string
  image?: PlaceImage
}

export interface PlaceImage {
  src: string
  alt: string
  credit: string
  creditUrl: string
}

export const placeCategories: PlaceCategory[] = [
  {
    "id": "government",
    "label": "Government offices",
    "mapQuery": "government offices",
    "description": "Municipal hall, legislative, social welfare, agriculture, and barangay offices."
  },
  {
    "id": "safety",
    "label": "Safety and justice",
    "mapQuery": "police fire rescue",
    "description": "Police, fire, disaster response (MDRRMO), and courts."
  },
  {
    "id": "health",
    "label": "Health and medical",
    "mapQuery": "health center pharmacy",
    "description": "Rural health unit, barangay health stations, and pharmacies."
  },
  {
    "id": "education",
    "label": "Schools and learning",
    "mapQuery": "schools",
    "description": "Public elementary and high schools, and private schools."
  },
  {
    "id": "stay",
    "label": "Places to stay",
    "mapQuery": "resorts inns",
    "description": "Inns, resorts, and guest accommodations."
  },
  {
    "id": "attractions",
    "label": "Tourism and heritage",
    "mapQuery": "tourist attractions",
    "description": "Heritage sites, natural attractions, and points of interest."
  },
  {
    "id": "parks",
    "label": "Parks and outdoors",
    "mapQuery": "parks",
    "description": "Parks, plazas, and outdoor spaces."
  },
  {
    "id": "transport",
    "label": "Transport and ports",
    "mapQuery": "transport terminal port",
    "description": "Transport terminals and public transport stops."
  },
  {
    "id": "finance",
    "label": "Banks and payments",
    "mapQuery": "banks ATM remittance",
    "description": "Bank branches, pawnshops, and remittance centers."
  },
  {
    "id": "faith",
    "label": "Churches and faith",
    "mapQuery": "churches",
    "description": "Churches and places of worship."
  },
  {
    "id": "everyday",
    "label": "Utilities and essentials",
    "mapQuery": "market electricity water",
    "description": "Public market, electric cooperative, and waterworks."
  }
];

export const places: PlaceRecord[] = [];

export function googleMapsSearch(item: PlaceRecord): string {
  const query = encodeURIComponent(`${item.name}, ${item.address}, ${city.name}, ${city.province}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function categoryMapsSearch(category?: PlaceCategory): string {
  const place = `${city.name} ${city.province}`;
  const query = encodeURIComponent(category ? `${category.mapQuery} in ${place}` : `places in ${place}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
