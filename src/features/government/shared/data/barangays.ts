import type { Barangay } from '../types/index.ts';

export const barangayDilgSourceUrl = 'https://beta.dilg.gov.ph/barangay-officials-directory';

// Sources (checked 2026-11-14):
// - PSA PSGC: names, codes (0701215001-008), urban/rural, 2024 POPCEN population
// - 2020 census (PSA, via PhilAtlas) and 2015 census (PSA, via bohol.ph)
// - Barangay officials: each barangay's page on corella-bohol.gov.ph (`dilgSourceUrl`). Cancatac lists them as
//   text; for the other seven the names and positions were read from the officials' photos on 2026-11-17
//   The printed name wins where it differs from the photo's filename; "Tahel" (Canangca-an) and "Lumatao"
//   (Tanday) were confirmed by the maintainer on 2026-11-17.
// - nameOrigin: our own summary of the "Origin of its name" story on the same barangay page.
// share/change/apgr are computed from the census figures (2020 to 2024).
export const barangays: Barangay[] = [
  {
    "slug": "anislag",
    "name": "Anislag",
    "district": "Corella, Bohol",
    "districtNumber": 1,
    "population2024": 1623,
    "population2020": 1564,
    "population2015": 1434,
    "share": "16.4%",
    "change": "+3.8%",
    "apgr": "0.89%",
    "rank": 2,
    "poblacion": false,
    "punongBarangay": "Dexter M. Curayag",
    "kagawads": [
      "Marcos S. Boñul",
      "Jesse P. Caluba",
      "Ma. Gina S. Añong",
      "Cosme A. Llorente",
      "Jocelyn A. Calvis",
      "Bernardino D. Curayag",
      "Gil C. Darunday"
    ],
    "skChairperson": "Justine Angel M. Caluba",
    "secretary": "Eugenia R. de la Gracia",
    "treasurer": "Janice S. Inte",
    "officialsVerified": "2026-11-17",
    "nameOrigin": [
      "Before the Americans came, this area was still thick forest where anislag trees grew in large numbers. People from nearby communities came here to cut wood.",
      "Asked where they were headed, they would say they were going to the place of the anislag trees, and the name stayed."
    ],
    "sourceUrl": "https://psa.gov.ph/classification/psgc/barangays/0701215000",
    "dilgSourceUrl": "https://corella-bohol.gov.ph/barangay-anislag/"
  },
  {
    "slug": "canangca-an",
    "name": "Canangca-an",
    "district": "Corella, Bohol",
    "districtNumber": 1,
    "population2024": 1025,
    "population2020": 1034,
    "population2015": 952,
    "share": "10.4%",
    "change": "-0.9%",
    "apgr": "-0.21%",
    "rank": 6,
    "poblacion": false,
    "punongBarangay": "German J. Tahel",
    "kagawads": [
      "Joel S. Varquez",
      "Marcial M. Caliao",
      "Romeo D. Mar",
      "Teodula C. Malayao",
      "Raul C. Malanog",
      "Mariano M. Malanog",
      "Arnel M. Arado"
    ],
    "skChairperson": "Eljay L. Calamongay",
    "secretary": "Monalisa C. Lina",
    "treasurer": "Eugenia S. Malanog",
    "officialsVerified": "2026-11-17",
    "nameOrigin": [
      "Long ago a large jackfruit (nangka) tree with wide, spreading branches stood here. People from other communities gathered in its shade to meet and pass the time, including cockfights held beneath it.",
      "When asked where they were going, people answered that they were going to \"kanangka-an\", the place of the jackfruit, and the barangay became known as Canangca-an."
    ],
    "sourceUrl": "https://psa.gov.ph/classification/psgc/barangays/0701215000",
    "dilgSourceUrl": "https://corella-bohol.gov.ph/barangay-canangcaan/"
  },
  {
    "slug": "canapnapan",
    "name": "Canapnapan",
    "district": "Corella, Bohol",
    "districtNumber": 1,
    "population2024": 1040,
    "population2020": 940,
    "population2015": 902,
    "share": "10.5%",
    "change": "+10.6%",
    "apgr": "2.46%",
    "rank": 5,
    "poblacion": false,
    "punongBarangay": "John Kenneth T. Lao",
    "kagawads": [
      "Roel A. Tajantajan",
      "Patricio A. Ceballos",
      "Tasionito A. Ighot",
      "Delfin L. Sayon",
      "Adelo C. Sayon",
      "Mario Ighot",
      "Epefania S. Gawala"
    ],
    "skChairperson": "Marjorie I. Gawala",
    "secretary": "Maria Imee M. Sayon",
    "treasurer": "Nelia A. Nariz",
    "officialsVerified": "2026-11-17",
    "nameOrigin": [
      "The name comes from the local word \"kadapdapan\", a place where dapdap trees grow in abundance. The dapdap has very large leaves and flame-red flowers that bloom in March and April.",
      "Dapdap trees were plentiful here in the early days, which gave the barangay its name."
    ],
    "sourceUrl": "https://psa.gov.ph/classification/psgc/barangays/0701215000",
    "dilgSourceUrl": "https://corella-bohol.gov.ph/barangay-canapnapan/"
  },
  {
    "slug": "cancatac",
    "name": "Cancatac",
    "district": "Corella, Bohol",
    "districtNumber": 1,
    "population2024": 1145,
    "population2020": 1081,
    "population2015": 943,
    "share": "11.6%",
    "change": "+5.9%",
    "apgr": "1.39%",
    "rank": 4,
    "poblacion": false,
    "punongBarangay": "Apolio C. Lumactud",
    "kagawads": [
      "Zenide W. Sarigumba",
      "Arturo Q. Bonita",
      "Ralp R. Ongcoy",
      "Donato O. Grado",
      "Renato W. Ejera",
      "Rogelio M. Ongcoy",
      "Julito R. Ongcoy"
    ],
    "skChairperson": "Alexus John Emmanuel P. Ramo",
    "secretary": "Jovannie Y. Salang",
    "treasurer": null,
    "officialsVerified": "2026-11-17",
    "nameOrigin": [
      "Cancatac sits on the borders with the neighbouring towns of Alburquerque and Sikatuna. Its name comes from \"caracatac\", a local word for many people talking at once so that nothing can be understood.",
      "The story goes that a chieftain called his men together to stop rampant animal theft, but everyone spoke at the same time and nothing was decided. One man compared them to a \"caracatac\", and the chieftain closed the meeting saying they would \"caracatac\" again the next week. The word came to stand for the place where these people lived."
    ],
    "sourceUrl": "https://psa.gov.ph/classification/psgc/barangays/0701215000",
    "dilgSourceUrl": "https://corella-bohol.gov.ph/barangay-cancatac/"
  },
  {
    "slug": "pandol",
    "name": "Pandol",
    "district": "Corella, Bohol",
    "districtNumber": 1,
    "population2024": 854,
    "population2020": 802,
    "population2015": 713,
    "share": "8.6%",
    "change": "+6.5%",
    "apgr": "1.52%",
    "rank": 7,
    "poblacion": false,
    "punongBarangay": "Esmeraldo O. Maligsa",
    "kagawads": [
      "Victor D. Malayao",
      "Heriberto S. Godornes",
      "Heracleo N. Malayao",
      "Rezz Vonny N. Amasa",
      "Celencio O. Maligsa",
      "Victor C. Agur",
      "Araceli A. Sumaylo"
    ],
    "skChairperson": "Pia B. Aque",
    "secretary": "Ruth C. Baugbog",
    "treasurer": "Lolita I. Gaterin",
    "officialsVerified": "2026-11-17",
    "nameOrigin": [
      "\"Pandol\" is a local word for accidentally kicking something lying on or just above the ground.",
      "Long before the Spaniards arrived, people here grew sweet potatoes (camote) in abundance. Rain washed away the topsoil and left the tubers exposed, so people walking through the fields often kicked them by accident. The word \"napandol\" came into use, was later shortened to \"Pandol\", and became the name of the place."
    ],
    "sourceUrl": "https://psa.gov.ph/classification/psgc/barangays/0701215000",
    "dilgSourceUrl": "https://corella-bohol.gov.ph/barangay-pandol/"
  },
  {
    "slug": "poblacion",
    "name": "Poblacion",
    "district": "Corella, Bohol",
    "districtNumber": 1,
    "population2024": 1386,
    "population2020": 1332,
    "population2015": 1260,
    "share": "14.0%",
    "change": "+4.1%",
    "apgr": "0.96%",
    "rank": 3,
    "poblacion": true,
    "punongBarangay": "Ronald Jose T. Malanog",
    "kagawads": [
      "Edwin P. Ladeza",
      "Ronald I. Badiang",
      "Hazel Imery I. Alpas",
      "Meljun L. Vale",
      "Ma. Zita L. Doroy",
      "Arturo T. Barrera",
      "Danilo T. Tajantajan"
    ],
    "skChairperson": "Miles Julian C. Cuarteros",
    "secretary": "Ma. Cynthia D. Doria",
    "treasurer": "Maria Eleuteria A. Daohog",
    "officialsVerified": "2026-11-17",
    "nameOrigin": [
      "Poblacion is the most central place in the whole town. As in Spanish times, nearly all of the municipality's activities are held here, which is why it is called the Poblacion, the town proper."
    ],
    "sourceUrl": "https://psa.gov.ph/classification/psgc/barangays/0701215000",
    "dilgSourceUrl": "https://corella-bohol.gov.ph/barangay-poblacion/"
  },
  {
    "slug": "sambog",
    "name": "Sambog",
    "district": "Corella, Bohol",
    "districtNumber": 1,
    "population2024": 1965,
    "population2020": 1896,
    "population2015": 1498,
    "share": "19.9%",
    "change": "+3.6%",
    "apgr": "0.86%",
    "rank": 1,
    "poblacion": false,
    "punongBarangay": "Rey Anthony N. Rebuta",
    "kagawads": [
      "Silvia R. Narisma",
      "Nilo J. Dante",
      "Raul V. Rebuta",
      "Shyane B. Ponte",
      "Ursesio Amon",
      "Danilo V. Gawat",
      "Lourdino B. Sale"
    ],
    "skChairperson": "Joshua C. Geloca",
    "secretary": "Cecilia S. Daquio",
    "treasurer": "Arnel T. Itong",
    "officialsVerified": "2026-11-17",
    "nameOrigin": [
      "In the local dialect, \"sambog\" means \"mixed\" or \"mixture\".",
      "On the eastern side of the barangay, two small valleys meet to form a larger valley north of the center. In the rainy season, water from the two valleys flows east and mixes in the larger valley before flowing out, and the barangay took its name from this meeting of waters."
    ],
    "sourceUrl": "https://psa.gov.ph/classification/psgc/barangays/0701215000",
    "dilgSourceUrl": "https://corella-bohol.gov.ph/barangay-sambog/"
  },
  {
    "slug": "tanday",
    "name": "Tanday",
    "district": "Corella, Bohol",
    "districtNumber": 1,
    "population2024": 851,
    "population2020": 830,
    "population2015": 777,
    "share": "8.6%",
    "change": "+2.5%",
    "apgr": "0.60%",
    "rank": 8,
    "poblacion": false,
    "punongBarangay": "Reynaldo D. Malayao",
    "kagawads": [
      "Moises P. Maragañas Jr.",
      "Lorna M. Rebuta",
      "Joseph G. Lumatao",
      "Michael O. Rebuta",
      "Jaime L. Mainit",
      "Victoriano J. Ahit",
      "Ma. Cresel D. Lamay"
    ],
    "skChairperson": "Melva M. Rebuta",
    "secretary": "Jennifer M. Macalam",
    "treasurer": "Lucita B. Alturas",
    "officialsVerified": "2026-11-17",
    "nameOrigin": [
      "At a spot the old folks called \"Bungahan\", on the boundary between Tanday in Corella and Tanday in Baclayon, there was a very large tree whose roots spread out and overlapped on the ground. People passing by took notice of it.",
      "The local word for \"overlap\" is \"tanday\", and the barangay came to be known by that name."
    ],
    "sourceUrl": "https://psa.gov.ph/classification/psgc/barangays/0701215000",
    "dilgSourceUrl": "https://corella-bohol.gov.ph/barangay-tanday/"
  }
];
