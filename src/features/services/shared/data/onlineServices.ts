import type { OnlineService } from '../types/index.ts';

// Slugs of Corella services that can be completed online. Empty until the municipal Citizen's
// Charter is verified (see services.ts).
export const onlineServiceSlugs: string[] = [];

// National e-government portals available to every Corella resident.
export const onlineServices: OnlineService[] = [
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
