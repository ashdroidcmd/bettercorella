import type { CityStats } from '../types';

// Headline figures (checked 2026-11-14): PSA PSGC for population, barangays and income class;
// Provincial Government of Bohol for land area (3,722 ha).
export const stats: CityStats[] = [
  { label: 'Population', value: '9,889', note: '2024 Census of Population (PSA)' },
  { label: 'Barangays', value: '8', note: 'PSA Philippine Standard Geographic Code' },
  { label: 'Income class', value: '4th', note: 'Municipal income class (PSA)' },
  { label: 'Land area', value: '37.22 km²', note: 'Provincial Government of Bohol' },
];
