import type { Agency } from '../types/index.ts';

// Source: "National Government Agencies" page on corella-bohol.gov.ph, read 2026-11-17. Names and positions
// come from the page's poster; numbers, emails and Facebook pages from its contact cards (PNP, DILG, BFP only).
export const agenciesSourceUrl = 'https://corella-bohol.gov.ph/national-government-agencies/';

export const agencies: Agency[] = [
  {
    slug: 'pnp',
    agency: 'PNP Corella (Municipal Police Station)',
    officer: 'PLT Elizandra Julia M. Jamora',
    position: 'Chief of Police',
    numbers: ['(038) 422-0207'],
    email: null,
    facebook: { label: 'Corella MPS BPPO', href: 'https://www.facebook.com/profile.php?id=100073941897390' },
    sourceUrl: agenciesSourceUrl,
  },
  {
    slug: 'dilg',
    agency: 'DILG Corella',
    officer: 'Josie M. Montes',
    position: 'Municipal Local Government Operations Officer (MLGOO VI)',
    numbers: [],
    email: 'dilgcorella23@gmail.com',
    facebook: { label: 'DILG Corella', href: 'https://www.facebook.com/DILGCorellaBohol' },
    sourceUrl: agenciesSourceUrl,
  },
  {
    slug: 'bfp',
    agency: 'BFP Corella Fire Station',
    officer: 'SFO2 Dave V. Caga',
    position: 'Officer-in-Charge',
    numbers: ['(038) 412-0156', '0967-798-2726'],
    email: 'corellabfp2020@gmail.com',
    facebook: { label: 'BFP RVII Corella Fire Station', href: 'https://www.facebook.com/corella.fs' },
    sourceUrl: agenciesSourceUrl,
  },
  {
    slug: 'post-office',
    agency: 'Corella Post Office',
    officer: 'Berne Roi D. Acedo',
    position: 'Postmaster',
    numbers: [],
    email: null,
    facebook: null,
    sourceUrl: agenciesSourceUrl,
  },
  {
    slug: 'comelec',
    agency: 'COMELEC Corella',
    officer: 'Shirley Ruloma',
    position: 'Election Officer',
    numbers: [],
    email: null,
    facebook: null,
    sourceUrl: agenciesSourceUrl,
  },
  {
    slug: 'bir',
    agency: 'Bureau of Internal Revenue',
    officer: 'Paraluman Pie Cabrillos',
    position: 'BIR Officer',
    numbers: [],
    email: null,
    facebook: null,
    sourceUrl: agenciesSourceUrl,
  },
];
