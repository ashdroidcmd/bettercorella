import type { OnlineService } from '../types/index.ts';

// Slugs of Corella charter services that can be started online (business permits through the
// municipality's online BPLS, linked from corella-bohol.gov.ph, checked 2026-11-14).
export const onlineServiceSlugs: string[] = [
  'bplo-service-issuance-of-business-permits-licenses-for-new',
  'bplo-service-renewal-of-business-permits-licenses',
];

// Corella's own online services first, then national e-government portals.
export const onlineServices: OnlineService[] = [
  {
    slug: 'corella-business-permit',
    name: 'Corella Online Business Permit Application',
    shortName: 'Business permit (Corella)',
    description: 'Apply for a new business permit or renew one with the Municipality of Corella online, linked from the official municipal website.',
    url: 'https://bpbc3.ibpls.com/corellabohol',
    category: 'Business'
  },
  {
    slug: 'corella-online-payment',
    name: 'Corella Online Payment (LBP iAccess)',
    shortName: 'Online payment (Corella)',
    description: 'Pay municipal fees and taxes online through Landbank, as linked from the official municipal website.',
    url: 'https://corella-bohol.gov.ph/online-payment/',
    category: 'Government'
  },
  {
    slug: 'egov',
    name: 'eGov PH Super App',
    shortName: 'eGov PH',
    description: 'One app for national government services, digital IDs and selected local government transactions.',
    url: 'https://e.gov.ph/',
    category: 'Government'
  },
  {
    slug: 'business',
    name: 'Central Business Portal',
    shortName: 'CBP',
    description: 'Register and renew businesses and access national business permits and licenses online.',
    url: 'https://business.gov.ph/',
    category: 'Business'
  },
  {
    slug: 'jobs',
    name: 'PhilJobNet',
    shortName: 'PhilJobNet',
    description: 'Search verified job vacancies and government employment services from DOLE.',
    url: 'https://philjobnet.gov.ph/',
    category: 'Employment'
  },
  {
    slug: 'csc',
    name: 'Civil Service Commission',
    shortName: 'CSC',
    description: 'Government career opportunities, civil service exams and eligibility requirements.',
    url: 'https://csc.gov.ph/',
    category: 'Government'
  },
  {
    slug: 'philgeps',
    name: 'PhilGEPS Government Procurement',
    shortName: 'PhilGEPS',
    description: 'Public bidding notices, procurement documents and award notices from government agencies.',
    url: 'https://www.philgeps.gov.ph/',
    category: 'Procurement'
  },
  {
    slug: 'bohol',
    name: 'Provincial Government of Bohol',
    shortName: 'Bohol',
    description: 'Provincial programs, advisories and public records of the Province of Bohol.',
    url: 'https://bohol.gov.ph/',
    category: 'Government'
  }
];
