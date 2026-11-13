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
    "mapQuery": "government offices Inabanga Bohol",
    "description": "Municipal hall, legislative, social welfare, agriculture, and barangay offices."
  },
  {
    "id": "safety",
    "label": "Safety and justice",
    "mapQuery": "police fire rescue Inabanga Bohol",
    "description": "Police, fire, disaster response (MDRRMO / TaRSIER 117), Coast Guard, and courts."
  },
  {
    "id": "health",
    "label": "Health and medical",
    "mapQuery": "health center pharmacy Inabanga Bohol",
    "description": "Municipal health center (RHU), island health stations, and pharmacies."
  },
  {
    "id": "education",
    "label": "Schools and learning",
    "mapQuery": "schools Inabanga Bohol",
    "description": "Public elementary, high schools, and private academies across Inabanga districts."
  },
  {
    "id": "stay",
    "label": "Places to stay",
    "mapQuery": "resorts inns Inabanga Bohol",
    "description": "Eco-lodges, island homestays, and coastal guest accommodations."
  },
  {
    "id": "attractions",
    "label": "Tourism and heritage",
    "mapQuery": "tourist attractions Inabanga Bohol",
    "description": "Saint Paul Church (1744), Inabanga River, Macaban Cave, and Danajon Reef."
  },
  {
    "id": "parks",
    "label": "Parks and outdoors",
    "mapQuery": "parks Inabanga Bohol",
    "description": "Inabanga River Nature Park, mangrove boardwalks, and town plaza."
  },
  {
    "id": "transport",
    "label": "Transport and ports",
    "mapQuery": "transport terminal port Inabanga Bohol",
    "description": "Port of U-og, integrated transport terminal, and island motorbanca docks."
  },
  {
    "id": "finance",
    "label": "Banks and payments",
    "mapQuery": "banks ATM remittance Inabanga Bohol",
    "description": "Bank branches (FCB, Landbank), pawnshops, and remittance centers."
  },
  {
    "id": "faith",
    "label": "Churches and faith",
    "mapQuery": "churches Inabanga Bohol",
    "description": "Historic Saint Paul the Apostle Parish and barangay community chapels."
  },
  {
    "id": "everyday",
    "label": "Utilities and essentials",
    "mapQuery": "market electricity water Inabanga Bohol",
    "description": "Public market, BOHECO I electric coop, and municipal waterworks."
  }
];

export const places: PlaceRecord[] = [
  {
    "id": "inabanga-municipal-hall",
    "name": "Inabanga Municipal Hall",
    "category": "government",
    "address": "Poblacion, Inabanga, Bohol 6329",
    "sourceLabel": "Municipal Government of Inabanga",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Seat of executive and administrative government of the Municipality of Inabanga."
  },
  {
    "id": "sangguniang-bayan-hall",
    "name": "Sangguniang Bayan Session Hall",
    "category": "government",
    "address": "2nd Floor, Legislative Building, Poblacion, Inabanga",
    "sourceLabel": "Sangguniang Bayan of Inabanga",
    "sourceUrl": "https://inabanga.gov.ph/sangguniang-bayan",
    "note": "Legislative chambers presided by Vice Mayor Hermogenes C. Cenabre, Jr."
  },
  {
    "id": "municipal-treasury-office",
    "name": "Municipal Treasury Office (MTO)",
    "category": "government",
    "address": "Ground Floor, Municipal Hall, Poblacion, Inabanga",
    "sourceLabel": "LGU Inabanga",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Real property tax (amilyar), business taxes, cedula, and community tax certificates."
  },
  {
    "id": "municipal-civil-registrar",
    "name": "Municipal Civil Registrar’s Office (MCR)",
    "category": "government",
    "address": "Ground Floor, Municipal Hall, Poblacion, Inabanga",
    "sourceLabel": "LGU Inabanga",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Birth certificates (COLB), marriage licenses, death certificates, and civil registry records."
  },
  {
    "id": "municipal-assessor-office",
    "name": "Municipal Assessor’s Office",
    "category": "government",
    "address": "Municipal Hall Building, Poblacion, Inabanga",
    "sourceLabel": "LGU Inabanga",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Tax declarations, property assessments, transfer of ownership, and cadastral maps."
  },
  {
    "id": "municipal-planning-office",
    "name": "Municipal Planning & Development Office (MPDO)",
    "category": "government",
    "address": "Municipal Hall Building, Poblacion, Inabanga",
    "sourceLabel": "LGU Inabanga",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Zoning clearances, Comprehensive Land Use Plan (CLUP), and socio-economic profiles."
  },
  {
    "id": "municipal-agriculture-office",
    "name": "Municipal Agriculture Office (MAO)",
    "category": "government",
    "address": "Agricultural Services Complex, Poblacion, Inabanga",
    "sourceLabel": "LGU Inabanga",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Fisherfolk registration (FishR/BoatR), palay seeds, organic farming, and veterinary aid."
  },
  {
    "id": "municipal-social-welfare",
    "name": "Municipal Social Welfare & Development Office (MSWDO)",
    "category": "government",
    "address": "Poblacion, Inabanga, Bohol",
    "sourceLabel": "LGU Inabanga",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Assistance to Individuals in Crisis Situations (AICS), Senior Citizen IDs, and PWD support."
  },
  {
    "id": "port-of-u-og-admin",
    "name": "Port of U-og Municipal Port Authority",
    "category": "government",
    "address": "Barangay U-og, Inabanga, Bohol",
    "sourceLabel": "LGU Inabanga / PPA",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Coastal gateway linking mainland Inabanga to Cuaming and Hambongan islands and Cebu."
  },
  {
    "id": "comelec-inabanga",
    "name": "COMELEC Municipal Office",
    "category": "government",
    "address": "Municipal Hall Compound, Poblacion, Inabanga",
    "sourceLabel": "Commission on Elections",
    "sourceUrl": "https://comelec.gov.ph",
    "note": "Voter registration, biometric capture, and certification of voter records."
  },
  {
    "id": "post-office-inabanga",
    "name": "Philippine Postal Corporation (PhilPost Inabanga)",
    "category": "government",
    "address": "Poblacion, Inabanga, Bohol 6329",
    "sourceLabel": "PhilPost",
    "sourceUrl": "https://phlpost.gov.ph",
    "note": "Postal ID issuance, package delivery, registered mail, and express services."
  },
  {
    "id": "inabanga-liga-hall",
    "name": "Liga ng mga Barangay (ABC) Hall",
    "category": "government",
    "address": "Poblacion, Inabanga, Bohol",
    "sourceLabel": "LGU Inabanga",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Headquarters of the Association of Barangay Captains representing 50 barangays."
  },
  {
    "id": "pnp-inabanga",
    "name": "Inabanga Municipal Police Station",
    "category": "safety",
    "address": "Poblacion, Inabanga, Bohol (Hotline: (038) 512-9039)",
    "sourceLabel": "Philippine National Police",
    "sourceUrl": "https://pnp.gov.ph",
    "note": "24/7 law enforcement, police clearances, crime prevention, and community patrol."
  },
  {
    "id": "bfp-inabanga",
    "name": "Bureau of Fire Protection – Inabanga Fire Station",
    "category": "safety",
    "address": "Poblacion, Inabanga, Bohol (Hotline: 0927-528-1232)",
    "sourceLabel": "Bureau of Fire Protection",
    "sourceUrl": "https://bfp.gov.ph",
    "note": "24/7 fire suppression, emergency rescue, and Fire Safety Inspection Certificates (FSIC)."
  },
  {
    "id": "mdrrmo-operation-center",
    "name": "MDRRMO Inabanga 24/7 Disaster Operations Center",
    "category": "safety",
    "address": "Poblacion, Inabanga, Bohol (Hotline: (038) 510-8164 / 0917-814-4117)",
    "sourceLabel": "MDRRMO Inabanga",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Emergency dispatch, weather monitoring, ambulance dispatch, and flood hazard coordination."
  },
  {
    "id": "tarsier-117-substation",
    "name": "TaRSIER 117 Inabanga Sub-station",
    "category": "safety",
    "address": "Poblacion, Inabanga, Bohol",
    "sourceLabel": "Provincial Government of Bohol",
    "sourceUrl": "https://bohol.gov.ph",
    "note": "Provincial emergency response unit supporting vehicular and severe rescue incidents."
  },
  {
    "id": "coast-guard-inabanga",
    "name": "Philippine Coast Guard – Inabanga Sub-Station",
    "category": "safety",
    "address": "Port of U-og, Barangay U-og, Inabanga",
    "sourceLabel": "Philippine Coast Guard",
    "sourceUrl": "https://coastguard.gov.ph",
    "note": "Maritime safety inspection, sea rescue, and Danajon Bank coastal enforcement."
  },
  {
    "id": "municipal-trial-court",
    "name": "Municipal Trial Court of Inabanga",
    "category": "safety",
    "address": "Hall of Justice, Poblacion, Inabanga",
    "sourceLabel": "Supreme Court of the Philippines",
    "sourceUrl": "https://sc.judiciary.gov.ph",
    "note": "First-level judicial court hearing civil and criminal cases under municipal jurisdiction."
  },
  {
    "id": "inabanga-rhu-main",
    "name": "Inabanga Rural Health Unit (Main Health Center)",
    "category": "health",
    "address": "Poblacion, Inabanga, Bohol (Hotline: (038) 510-8118)",
    "sourceLabel": "Department of Health / LGU Inabanga",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "PhilHealth Konsulta, maternal birthing clinic, infant immunization, and TB-DOTS clinic."
  },
  {
    "id": "cuaming-health-station",
    "name": "Barangay Health Station – Cuaming Island",
    "category": "health",
    "address": "Barangay Cuaming, Inabanga",
    "sourceLabel": "RHU Inabanga",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Island primary care outpost staffed by resident nurses and barangay health workers."
  },
  {
    "id": "hambongan-health-station",
    "name": "Barangay Health Station – Hambongan Island",
    "category": "health",
    "address": "Barangay Hambongan, Inabanga",
    "sourceLabel": "RHU Inabanga",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Community primary clinic providing first aid and child vaccination in Hambongan."
  },
  {
    "id": "san-jose-health-station",
    "name": "Barangay Health Station – San Jose",
    "category": "health",
    "address": "Barangay San Jose, Inabanga",
    "sourceLabel": "RHU Inabanga",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Health substation serving District 8 upland communities."
  },
  {
    "id": "luyo-health-station",
    "name": "Barangay Health Station – Luyo",
    "category": "health",
    "address": "Barangay Luyo, Inabanga",
    "sourceLabel": "RHU Inabanga",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Serving agricultural households in the central valley corridor."
  },
  {
    "id": "tgp-pharmacy-inabanga",
    "name": "The Generics Pharmacy (TGP Inabanga)",
    "category": "health",
    "address": "Poblacion, Inabanga, Bohol",
    "sourceLabel": "TGP",
    "sourceUrl": "https://tgp.com.ph",
    "note": "Affordable generic maintenance medications, vitamins, and first-aid supplies."
  },
  {
    "id": "inabanga-central-elem",
    "name": "Inabanga Central Elementary School",
    "category": "education",
    "address": "Poblacion, Inabanga, Bohol",
    "sourceLabel": "DepEd Bohol",
    "sourceUrl": "https://deped.gov.ph",
    "note": "Primary district school and central educational campus of Inabanga North District."
  },
  {
    "id": "inabanga-high-school",
    "name": "Inabanga High School",
    "category": "education",
    "address": "Poblacion, Inabanga, Bohol",
    "sourceLabel": "DepEd Bohol",
    "sourceUrl": "https://deped.gov.ph",
    "note": "Public secondary school offering Junior and Senior High School academic tracks."
  },
  {
    "id": "san-jose-national-high",
    "name": "San Jose National High School",
    "category": "education",
    "address": "Barangay San Jose, Inabanga",
    "sourceLabel": "DepEd Bohol",
    "sourceUrl": "https://deped.gov.ph",
    "note": "Comprehensive high school serving southeastern upland barangays."
  },
  {
    "id": "cuaming-high-school",
    "name": "Cuaming National High School",
    "category": "education",
    "address": "Barangay Cuaming, Inabanga",
    "sourceLabel": "DepEd Bohol",
    "sourceUrl": "https://deped.gov.ph",
    "note": "Island secondary school providing education for fishing youth in Danajon Bank."
  },
  {
    "id": "saint-paul-academy",
    "name": "Saint Paul Academy",
    "category": "education",
    "address": "Poblacion, Inabanga, Bohol",
    "sourceLabel": "Diocese of Talibon",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Private Catholic parochial high school founded beside Saint Paul Parish."
  },
  {
    "id": "saint-paul-church",
    "name": "Saint Paul the Apostle Parish Church (1744)",
    "category": "attractions",
    "address": "Poblacion, Inabanga, Bohol",
    "sourceLabel": "Diocese of Talibon / National Historical Commission",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Historic coral stone parish church founded by the Jesuits in 1744 on the riverbanks."
  },
  {
    "id": "macaban-cave",
    "name": "Macaban Cave (Dagohoy Revolt Sanctuary)",
    "category": "attractions",
    "address": "Barangay Lonoy Cainsican, Inabanga",
    "sourceLabel": "Municipal Tourism Office",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Historical subterranean cavern utilized as hiding sanctuary during the Dagohoy Rebellion."
  },
  {
    "id": "mt-ilihan-viewpoint",
    "name": "Mt. Ilihan Pilgrimage Grotto & Viewpoint",
    "category": "attractions",
    "address": "Barangay Ilihan, Inabanga",
    "sourceLabel": "Municipal Tourism Office",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Scenic hilltop sanctuary offering breathtaking panoramic vistas of north-western Bohol."
  },
  {
    "id": "cuaming-island-reef",
    "name": "Cuaming Island & Danajon Double Barrier Reef",
    "category": "attractions",
    "address": "Barangay Cuaming, Inabanga",
    "sourceLabel": "Bohol Tourism Office",
    "sourceUrl": "https://bohol.gov.ph",
    "note": "Pristine double barrier reef formation, marine sanctuaries, and lively island community."
  },
  {
    "id": "hambongan-island",
    "name": "Hambongan Island & Seaweed Sanctuaries",
    "category": "attractions",
    "address": "Barangay Hambongan, Inabanga",
    "sourceLabel": "Municipal Tourism Office",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Idyllic island known for clear waters, mangrove fringes, and traditional seaweed culture."
  },
  {
    "id": "raffia-weaving-hub",
    "name": "Inabanga Loomweavers Handicraft Center",
    "category": "attractions",
    "address": "Barangay San Jose / Poblacion, Inabanga",
    "sourceLabel": "DTI Bohol / LGU Inabanga",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Showcase and production center for buri palm raffia textiles, bags, hats, and mats."
  },
  {
    "id": "inabanga-river-nature-park",
    "name": "Inabanga River Nature Park",
    "category": "parks",
    "address": "Barangay Lawis / Riverside, Inabanga",
    "sourceLabel": "Municipal Government of Inabanga",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Scenic riverside promenade, eco-walkway, picnic kiosks, and river boat cruise dock."
  },
  {
    "id": "inabanga-town-plaza",
    "name": "Inabanga Town Plaza & Children’s Park",
    "category": "parks",
    "address": "Poblacion, Inabanga, Bohol",
    "sourceLabel": "LGU Inabanga",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Public civic square, landscaped gardens, basketball court, and municipal auditorium."
  },
  {
    "id": "lawis-mangrove-boardwalk",
    "name": "Lawis Coastal Mangrove Boardwalk",
    "category": "parks",
    "address": "Barangay Lawis, Inabanga",
    "sourceLabel": "MENRO Inabanga",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Protected mangrove eco-trail supporting resident wading birds and marine nurseries."
  },
  {
    "id": "port-of-u-og-terminal",
    "name": "Port of U-og Ferry & Fish Landing Terminal",
    "category": "transport",
    "address": "Barangay U-og, Inabanga, Bohol",
    "sourceLabel": "PPA / LGU Inabanga",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Daily passenger motorbancas to Cuaming and Hambongan islands and coastal cargo vessels."
  },
  {
    "id": "inabanga-transport-terminal",
    "name": "Inabanga Integrated Public Transport Terminal",
    "category": "transport",
    "address": "Poblacion, Inabanga (Highway Junction)",
    "sourceLabel": "LGU Inabanga",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Buses, passenger vans, and jeepneys connecting to Tagbilaran, Tubigon, and Talibon."
  },
  {
    "id": "first-consolidated-bank",
    "name": "First Consolidated Bank (FCB Inabanga)",
    "category": "finance",
    "address": "Poblacion, Inabanga, Bohol",
    "sourceLabel": "First Consolidated Bank",
    "sourceUrl": "https://fcb.com.ph",
    "note": "Full-service banking, agricultural loans, savings accounts, and 24/7 ATM services."
  },
  {
    "id": "landbank-cash-point",
    "name": "Land Bank of the Philippines – Inabanga Point",
    "category": "finance",
    "address": "Ground Floor, Municipal Hall, Poblacion",
    "sourceLabel": "Land Bank of the Philippines",
    "sourceUrl": "https://landbank.com.ph",
    "note": "ATM cash dispensing and government payroll disbursement point."
  },
  {
    "id": "palawan-express-inabanga",
    "name": "Palawan Express Pera Padala",
    "category": "finance",
    "address": "Poblacion, Inabanga, Bohol",
    "sourceLabel": "Palawan Pawnshop",
    "sourceUrl": "https://palawanpawnshop.com",
    "note": "Domestic money remittance, pawn brokering, and bills payment services."
  },
  {
    "id": "m-lhuillier-inabanga",
    "name": "M Lhuillier Financial Services",
    "category": "finance",
    "address": "Poblacion, Inabanga, Bohol",
    "sourceLabel": "M Lhuillier",
    "sourceUrl": "https://mlhuillier.com",
    "note": "Quick cash loans, international money transfer, and insurance services."
  },
  {
    "id": "cebuana-lhuillier-inabanga",
    "name": "Cebuana Lhuillier Pawnshop",
    "category": "finance",
    "address": "Poblacion, Inabanga, Bohol",
    "sourceLabel": "Cebuana Lhuillier",
    "sourceUrl": "https://cebuanalhuillier.com",
    "note": "Pawn loans, domestic remittances, micro-insurance, and electronic cash."
  },
  {
    "id": "saint-paul-parish",
    "name": "Parish of Saint Paul the Apostle",
    "category": "faith",
    "address": "Poblacion, Inabanga, Bohol",
    "sourceLabel": "Diocese of Talibon",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Principal Roman Catholic parish church celebrating Sunday and daily Holy Masses."
  },
  {
    "id": "cuaming-chapel",
    "name": "San Pedro Apostol Chapel – Cuaming Island",
    "category": "faith",
    "address": "Barangay Cuaming, Inabanga",
    "sourceLabel": "Parish of Saint Paul",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Island community chapel serving local fisherfolk families."
  },
  {
    "id": "san-jose-chapel",
    "name": "Saint Joseph the Worker Chapel",
    "category": "faith",
    "address": "Barangay San Jose, Inabanga",
    "sourceLabel": "Parish of Saint Paul",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Barangay chapel and venue for community spiritual gatherings in District 8."
  },
  {
    "id": "inabanga-public-market",
    "name": "Inabanga Public Market & Trading Center",
    "category": "everyday",
    "address": "Poblacion, Inabanga, Bohol",
    "sourceLabel": "LGU Inabanga",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Fresh seafood, agricultural produce, native delicacies, and dry goods."
  },
  {
    "id": "boheco-i-office",
    "name": "BOHECO I Field Collection Office",
    "category": "everyday",
    "address": "Poblacion, Inabanga, Bohol",
    "sourceLabel": "Bohol I Electric Cooperative",
    "sourceUrl": "https://boheco1.com.ph",
    "note": "Electric service applications, billing payments, and customer assistance."
  },
  {
    "id": "inabanga-waterworks",
    "name": "Inabanga Municipal Waterworks System",
    "category": "everyday",
    "address": "Poblacion, Inabanga, Bohol",
    "sourceLabel": "LGU Inabanga",
    "sourceUrl": "https://inabanga.gov.ph",
    "note": "Water connection applications, meter maintenance, and public water supply services."
  }
];

export function googleMapsSearch(item: PlaceRecord): string {
  const query = encodeURIComponent(`${item.name}, ${item.address}, Inabanga, Bohol`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function categoryMapsSearch(category?: PlaceCategory): string {
  const query = encodeURIComponent(category ? `${category.mapQuery} in Inabanga Bohol` : 'places in Inabanga Bohol');
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
