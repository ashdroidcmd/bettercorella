import type { FactGroup, TimelineItem } from './types';

export const pillars = [
  {
    "title": "Social development",
    "description": "Healthcare access, rural health outposts, social assistance (AICS), senior citizen and PWD welfare, and support for marginalized communities across all 50 barangays."
  },
  {
    "title": "Economic development",
    "description": "Raffia handloom weaving modernization, sustainable agriculture, fisherfolk support, Port of U-og commerce, and micro-enterprise development."
  },
  {
    "title": "Environmental management",
    "description": "Conservation of the Inabanga River watershed, Danajon Bank double-barrier reef marine sanctuaries, mangrove reforestation, and climate-resilient flood mitigation."
  },
  {
    "title": "Administrative governance",
    "description": "Digital citizen transparency, participatory barangay budgeting, ethical civil service, and streamlined municipal licensing."
  }
];

export const factGroups: FactGroup[] = [
  {
    "title": "Geography and climate",
    "facts": [
      {
        "label": "Land area",
        "value": "168.49 km²",
        "note": "Municipal total land area covering 50 mainland, riverfront, and island barangays."
      },
      {
        "label": "Population density",
        "value": "About 288 people per km²",
        "note": "PSA 2024 (higher density in island barangays like Cuaming and coastal town center)"
      },
      {
        "label": "Terrain",
        "value": "Alluvial delta, river plains, and rolling limestone hills",
        "note": "Dominated by the Inabanga River basin, the largest river system in Bohol, emptying into the Cebu Strait"
      },
      {
        "label": "Climate",
        "value": "Type IV — evenly distributed rainfall",
        "note": "Mild tropical maritime climate without a pronounced dry season, moderated by sea breezes"
      },
      {
        "label": "Boundaries",
        "value": "Camotes Sea and Danajon Bank to the north, Clarin and Tubigon to the west, Buenavista and Dagohoy to the east, and Sagbayan and Danao to the south"
      },
      {
        "label": "Barangay profile",
        "value": "50 barangays: 6 coastal, 2 island, 42 inland & riverfront",
        "note": "Organized into 8 municipal administrative districts"
      }
    ]
  },
  {
    "title": "People",
    "facts": [
      {
        "label": "Population (2024)",
        "value": "48,536",
        "note": "PSA Census of Population"
      },
      {
        "label": "Population (2020)",
        "value": "48,536",
        "note": "PSA 2020 Census of Population"
      },
      {
        "label": "Growth rate",
        "value": "+0.55%",
        "note": "PSA intercensal estimate"
      },
      {
        "label": "Households (2024)",
        "value": "11,840",
        "note": "Average household size of 4.1"
      },
      {
        "label": "Literacy rate",
        "value": "95.2%",
        "note": "DepEd Bohol Division / PSA"
      },
      {
        "label": "Languages",
        "value": "Sinugboanon (Boholano Cebuano dialect), Tagalog/Filipino, and English",
        "note": "Sinugboanon is the universal mother tongue spoken throughout all 50 barangays"
      }
    ]
  },
  {
    "title": "Economy and finance",
    "facts": [
      {
        "label": "Classification",
        "value": "3rd class municipality",
        "note": "Province of Bohol, 2nd Congressional District"
      },
      {
        "label": "Poverty incidence",
        "value": "16.4%",
        "note": "PSA 2023 Municipal Small Area Estimates"
      },
      {
        "label": "Municipal revenue (2024)",
        "value": "₱248,642,180.00",
        "note": "LGU Inabanga Annual Financial Statement / BLGF"
      },
      {
        "label": "Municipal expenditures (2024)",
        "value": "₱221,850,320.00",
        "note": "Operating expenditures and capital outlays"
      },
      {
        "label": "Specialty industry",
        "value": "Raffia weaving capital of Bohol",
        "note": "Over 1,200 active handloom weavers producing world-class raffia cloth, bags, and tikog mats"
      },
      {
        "label": "Cooperatives & associations",
        "value": "24 active registered cooperatives",
        "note": "Includes Inabanga Loomweavers Association and Fisherfolk Cooperatives"
      }
    ]
  },
  {
    "title": "Agriculture and fisheries",
    "facts": [
      {
        "label": "Rice farming",
        "value": "3,420 hectares irrigated and rainfed palay",
        "note": "Supported by the Inabanga River irrigation system"
      },
      {
        "label": "Coconut and copra",
        "value": "4,150 hectares planted to coconut palms",
        "note": "Major source of copra and buri palm fiber (raffia) raw materials"
      },
      {
        "label": "Fisheries & aquaculture",
        "value": "Over 2,800 registered municipal fisherfolk (FishR / BoatR)",
        "note": "Brackish milkfish (bangus) ponds, mud crab farming, and Danajon Bank seaweed (guso) cultivation"
      },
      {
        "label": "Root crops & corn",
        "value": "Cassava, sweet potato (camote), and white corn",
        "note": "Upland food staples in southern and eastern barangays"
      },
      {
        "label": "Livestock & poultry",
        "value": "Swine, native chicken, carabao draft animals, and goats",
        "note": "Supervised by the Municipal Agriculture Office (MAO)"
      }
    ]
  },
  {
    "title": "Infrastructure and utilities",
    "facts": [
      {
        "label": "Road network",
        "value": "184.6 km municipal, provincial, and national roads",
        "note": "Includes the paved Bohol Circumferential Highway connecting Tubigon and Talibon"
      },
      {
        "label": "Seaport",
        "value": "Port of U-og (Fish Landing & Municipal Port)",
        "note": "Connects Inabanga mainland to Cuaming and Hambongan islands and Cebu coastal trade"
      },
      {
        "label": "Electric power",
        "value": "100% of mainland barangays energized",
        "note": "Serviced by Bohol I Electric Cooperative (BOHECO I)"
      },
      {
        "label": "Water supply",
        "value": "Inabanga Municipal Waterworks System (Levels I, II, & III)",
        "note": "Spring-fed and deep well gravity systems managed by the LGU"
      },
      {
        "label": "Telecommunications",
        "value": "Globe, Smart/TNT, DITO, and fiber internet providers",
        "note": "Mobile cellular towers cover the town center, highway corridor, and island communities"
      }
    ]
  },
  {
    "title": "Health and education",
    "facts": [
      {
        "label": "Rural health unit",
        "value": "1 Municipal Health Center (RHU Inabanga)",
        "note": "Accredited PhilHealth Konsulta provider with 24/7 birthing clinic and ambulance service"
      },
      {
        "label": "Barangay health stations",
        "value": "50 Barangay Health Stations (BHS)",
        "note": "Staffed by Barangay Health Workers (BHWs) and visiting municipal nurses"
      },
      {
        "label": "Secondary schools",
        "value": "8 public high schools",
        "note": "Including Inabanga High School and San Jose National High School"
      },
      {
        "label": "Elementary schools",
        "value": "32 public elementary schools",
        "note": "Under DepEd Division of Bohol (Inabanga North and South Districts)"
      },
      {
        "label": "Child development centers",
        "value": "52 daycare and early childhood centers",
        "note": "Supervised by the Municipal Social Welfare and Development Office (MSWDO)"
      }
    ]
  }
];

export const history: TimelineItem[] = [
  {
    "year": "Pre-Colonial Era",
    "title": "The name Inabangan",
    "text": "Early Boholano settlers named the community 'Inabangan' (from the root 'abang', meaning rented or toll paid). According to oral tradition, travelers crossing the mighty Inabanga River—the longest river in Bohol—paid toll to boatmen, or shared tributes with nature along the fertile riverbanks."
  },
  {
    "year": "1744",
    "title": "Jesuit settlement and Saint Paul Parish",
    "text": "Jesuit missionaries founded the settlement of Inabanga and established the Saint Paul the Apostle Parish Church on the banks of the Inabanga River, organizing the local communities into Christian reducciones."
  },
  {
    "year": "1744–1829",
    "title": "The Francisco Dagohoy Rebellion",
    "text": "Inabanga played a legendary role during the 85-year Dagohoy Rebellion, the longest revolt against colonial rule in Philippine history. Francisco Dagohoy and his Boholano freedom fighters used the rugged tributaries of the Inabanga River and the limestone labyrinth of Macaban Cave as sanctuary, strategic hideouts, and supply lines."
  },
  {
    "year": "1768",
    "title": "Augustinian Recollect administration",
    "text": "Following the expulsion of the Jesuits from the Philippines in 1768, the Augustinian Recollect Fathers assumed spiritual and administrative care of Inabanga, expanding community roads and agricultural production."
  },
  {
    "year": "1879",
    "title": "Coral stone parish church construction",
    "text": "The landmark coral stone Saint Paul the Apostle Church was constructed near the river, built from hand-hewn mamposteria coral stone and molave timber, becoming a spiritual and cultural anchor for north-western Bohol."
  },
  {
    "year": "1899–1901",
    "title": "Philippine-American War resistance",
    "text": "During the Philippine-American War, Inabanga patriots joined the Boholano revolutionary resistance under General Pedro Samson, defending the town's waterways and interior trails against invading forces."
  },
  {
    "year": "1942–1945",
    "title": "World War II resistance and liberation",
    "text": "During the Japanese occupation of Bohol, local Inabanga volunteers joined the Bohol Area Command (BAC) guerrilla units, protecting inland food supplies and guiding Allied intelligence until Bohol's full liberation in May 1945."
  },
  {
    "year": "1950s–1980s",
    "title": "Birth of the Raffia capital",
    "text": "Inabanga pioneered the extraction and handloom weaving of raffia fibers from buri palm fronds. Backed by generations of women weavers, Inabanga earned nationwide acclaim as the 'Raffia Capital of Bohol,' supplying natural fabrics across the Philippines and international markets."
  },
  {
    "year": "Modern Era",
    "title": "Eco-tourism, Port of U-og, and digital transparency",
    "text": "Inabanga continues to lead in community eco-tourism through the Inabanga River Nature Park, marine protection in the Danajon Bank, modern fishing port facilities at Port of U-og, and digital civic governance through Better Inabanga."
  }
];

export const mapLinks = [
  {
    "label": "National Geoportal municipal base mapping",
    "url": "https://geoportal.gov.ph/"
  },
  {
    "label": "Inabanga River flood hazard map (MDRRMO / HazardHunterPH)",
    "url": "https://hazardhunter.georisk.gov.ph/"
  },
  {
    "label": "Danajon Bank marine sanctuary and coastal zone inventory",
    "url": "https://bmb.gov.ph/"
  },
  {
    "label": "Official 50 barangay registry and PSGC boundaries",
    "url": "https://psa.gov.ph/classification/psgc/barangays/0701224000"
  },
  {
    "label": "Municipal road network and bridge infrastructure map (DPWH)",
    "url": "https://dpwh.gov.ph/"
  }
];
