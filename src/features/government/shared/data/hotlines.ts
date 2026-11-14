import type { Hotline } from '../types/index.ts';

// Only national hotlines are listed until Corella's local emergency numbers (MDRRMO, PNP, BFP,
// RHU, Municipal Hall) are verified against an official LGU source.
export const hotlines: Hotline[] = [
  {
    "label": "National Emergency Hotline",
    "numbers": [
      "911"
    ],
    "note": "24/7 nationwide emergency line for police, fire, and medical emergencies. Free to call from any mobile or landline.",
    "primary": true
  },
  {
    "label": "Citizens' Complaint Hotline",
    "numbers": [
      "8888"
    ],
    "note": "National hotline for reporting red tape, corruption, and complaints about government services."
  }
];
