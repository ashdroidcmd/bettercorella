import type { Source } from '../types';

// Official sources BetterCorella draws on: Corella's own sources first (checked 2026-11-14), then
// national and provincial sources.
export const sources: Source[] = [
  {
    name: 'Municipality of Corella (official website)',
    url: 'https://corella-bohol.gov.ph/',
    note: 'Officials, offices, barangay pages, history, contacts and announcements'
  },
  {
    name: "Corella Citizen's Charter 2026 (2nd edition)",
    url: 'https://corella-bohol.gov.ph/citizens-charter/',
    note: 'The 86 municipal services, their requirements, fees and processing times, and office contacts'
  },
  {
    name: 'PSA PSGC: Corella, Bohol',
    url: 'https://psa.gov.ph/classification/psgc/barangays/0701215000',
    note: 'Official barangay list, codes, income class and 2024 Census population'
  },
  {
    name: 'Provincial Government of Bohol: Corella',
    url: 'https://bohol.gov.ph/about/municipalities/1st-district/corella/',
    note: 'Congressional district, land area and the 2025–2028 municipal mayor'
  },
  {
    name: 'PSA Philippine Standard Geographic Code',
    url: 'https://psa.gov.ph/classification/psgc',
    note: 'National masterlist of provinces, municipalities and barangays'
  },
  {
    name: 'PSA Central Visayas (Region VII)',
    url: 'https://rsso07.psa.gov.ph',
    note: 'Official census and population figures for Bohol and its municipalities'
  },
  {
    name: 'DILG Barangay Information System',
    url: 'https://beta.dilg.gov.ph/barangay-officials-directory',
    note: 'Directory of elected barangay and SK officials'
  },
  {
    name: 'DILG Full Disclosure Policy Portal',
    url: 'https://fdpp.dilg.gov.ph/',
    note: 'Budgets, procurement and financial documents that LGUs must publish'
  },
  {
    name: 'Bureau of Local Government Finance',
    url: 'https://blgf.gov.ph/lgu-fiscal-data/',
    note: 'LGU Statements of Receipts and Expenditures (income and spending)'
  },
  {
    name: 'Commission on Audit',
    url: 'https://www.coa.gov.ph',
    note: 'Annual audit reports on LGU finances'
  },
  {
    name: 'PhilGEPS Procurement Portal',
    url: 'https://www.philgeps.gov.ph',
    note: 'Public bidding notices and contract awards'
  },
  {
    name: 'BetterGov Open Data Portal',
    url: 'https://data.bettergov.ph',
    note: 'Curated national infrastructure (DPWH) and procurement (PhilGEPS) open datasets'
  },
  {
    name: 'Provincial Government of Bohol',
    url: 'https://bohol.gov.ph',
    note: 'Provincial programs, advisories and contacts'
  },
  {
    name: 'Online Government Services',
    url: 'https://e.gov.ph',
    note: 'eGov PH portal for national government services'
  }
];
