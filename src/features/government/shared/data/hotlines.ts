import type { Hotline } from '../types/index.ts';

// 911 and 8888 are national lines. Corella numbers come from the "List of Offices" in the Citizen's
// Charter 2026 (checked 2026-11-14). Police (PNP), fire (BFP) and 24/7 rescue numbers are still pending:
// the official site shows them only as images. Entries with `short` appear in the header hotline bar
// (add e.g. "short": "PNP" when a verified police number is added).
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
    "label": "Corella Municipal Hall (Office of the Mayor)",
    "numbers": [
      "(038) 422-3865"
    ],
    "email": "municipality.corella@gmail.com",
    "note": "Municipal Hall trunkline, also used for public assistance and complaints. Office hours; not a 24/7 line. Source: Citizen's Charter 2026.",
    "short": "Municipal Hall"
  },
  {
    "label": "MDRRMO Corella",
    "numbers": [
      "0920-378-8788"
    ],
    "email": "corella.drrm@gmail.com",
    "note": "Municipal Disaster Risk Reduction and Management Office. Office number from the Citizen's Charter 2026; 24/7 availability not yet confirmed.",
    "short": "MDRRMO"
  },
  {
    "label": "Municipal Health Office",
    "numbers": [
      "0932-843-6516"
    ],
    "email": "corellamho@yahoo.com",
    "note": "Rural health unit services. Office number from the Citizen's Charter 2026; for medical emergencies call 911."
  },
  {
    "label": "Citizens' Complaint Hotline",
    "numbers": [
      "8888"
    ],
    "note": "National hotline for reporting red tape, corruption, and complaints about government services."
  }
];
