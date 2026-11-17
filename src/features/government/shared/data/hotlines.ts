import type { Hotline } from '../types/index.ts';

// 911 and 8888 are national lines. Office numbers come from the "List of Offices" in the Citizen's
// Charter 2026 (checked 2026-11-14). Police and fire numbers, and the extra MDRRMO and RHU numbers listed
// after the charter ones, were added 2026-11-17 from the Corella Fire Station's own post, the Corella
// Police Station's Facebook page and a public contact listing. Entries with `short` appear in the header
// hotline bar; keep it to emergency lines.
export const hotlines: Hotline[] = [
  {
    "label": "National Emergency Hotline",
    "numbers": [
      "911"
    ],
    "note": "24/7 nationwide emergency line for police, fire, and medical emergencies. Free to call from any mobile or landline.",
    "primary": true,
    "short": "Emergency"
  },
  {
    "label": "Corella Police Station (PNP)",
    "numbers": [
      "0998-598-6413",
      "(038) 411-2979"
    ],
    "email": "corellapsbppo@gmail.com",
    "note": "Corella Municipal Police Station, Corella–Balilihan Road. Numbers from a public contact listing and the station's Facebook page. For any emergency you can also call 911.",
    "short": "PNP"
  },
  {
    "label": "Corella Fire Station (BFP)",
    "numbers": [
      "0967-798-2726",
      "(038) 412-0156"
    ],
    "note": "Bureau of Fire Protection station hotline, as posted by the Corella Fire Station, Bohol. For any emergency you can also call 911.",
    "short": "Fire"
  },
  {
    "label": "MDRRMO Corella",
    "numbers": [
      "0920-378-8788",
      "0977-814-6028",
      "0961-622-1790",
      "0906-294-3585"
    ],
    "email": "corella.drrm@gmail.com",
    "note": "Municipal Disaster Risk Reduction and Management Office. The first number is from the Citizen's Charter 2026; the others (MDRRMO, Smart and Globe emergency lines) are from a public contact listing. 24/7 availability not yet confirmed.",
    "short": "MDRRMO"
  },
  {
    "label": "Corella Municipal Hall (Office of the Mayor)",
    "numbers": [
      "(038) 422-3865"
    ],
    "email": "municipality.corella@gmail.com",
    "note": "Municipal Hall trunkline, also used for public assistance and complaints. Office hours; not a 24/7 line. Source: Citizen's Charter 2026."
  },
  {
    "label": "Municipal Health Office",
    "numbers": [
      "0932-843-6516",
      "(038) 422-0260",
      "0939-741-0779"
    ],
    "email": "corellamho@yahoo.com",
    "note": "Rural Health Unit services. The first number is from the Citizen's Charter 2026; the landline and second mobile are from a public contact listing. For medical emergencies call 911."
  },
  {
    "label": "Citizens' Complaint Hotline",
    "numbers": [
      "8888"
    ],
    "note": "National hotline for reporting red tape, corruption, and complaints about government services."
  }
];
