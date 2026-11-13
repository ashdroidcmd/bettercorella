import type { OnlineService } from './types.ts';

export const onlineServiceSlugs: string[] = [
  'issuance-of-business-permits-online-application',
  'issuance-of-online-individual-work-permit',
  'issuance-of-community-tax-certificate-cedula',
];

export const onlineServices: OnlineService[] = [
  {
    slug: 'eps',
    name: 'E-Participation & Citizen Feedback',
    shortName: 'ICoNS',
    description: 'Send inquiries, feedback, and service requests directly to the Municipality of Inabanga public information desk.',
    url: 'https://www.facebook.com/municipalityofinabanga',
    category: 'Feedback'
  },
  {
    slug: 'ebpls',
    name: 'Central Business Portal (eBPLS)',
    shortName: 'CBP',
    description: 'Apply for, register, and renew business permits and national licenses online via the Central Business Portal.',
    url: 'https://business.gov.ph/',
    category: 'Business'
  },
  {
    slug: 'egov',
    name: 'eGov PH Super App',
    shortName: 'eGov PH',
    description: 'Access unified local and national government services, digital IDs, PhilHealth, and municipal permits.',
    url: 'https://e.gov.ph/',
    category: 'Government'
  },
  {
    slug: 'toms',
    name: 'Cedula & Tax Payment Assistance',
    shortName: 'Treasury',
    description: 'Requirements and online guidance for community tax certificates (cedula) and municipal taxes.',
    url: 'https://e.gov.ph/',
    category: 'Taxes',
    note: "Payable online via eGov PH or at the Municipal Treasurer's Office at Inabanga Municipal Hall."
  },
  {
    slug: 'jobs',
    name: 'PhilJobNet & Public Employment (PESO)',
    shortName: 'PESO',
    description: 'Search verified job vacancies, PESO Inabanga placement services, and government employment opportunities.',
    url: 'https://philjobnet.gov.ph/',
    category: 'Employment'
  },
  {
    slug: 'fhis',
    name: 'Health Services & DOH Konsulta',
    shortName: 'DOH Konsulta',
    description: 'PhilHealth Konsulta registration and health center services managed by the Inabanga Rural Health Unit.',
    url: 'https://e.gov.ph/',
    category: 'Health',
    note: 'Sanitary permits and health certificates are issued in person at the Rural Health Unit (RHU) in Poblacion.'
  },
  {
    slug: 'pmis',
    name: 'Civil Service Careers Portal',
    shortName: 'CSC',
    description: 'Browse official government career opportunities, eligibility requirements, and civil service postings.',
    url: 'https://csc.gov.ph/',
    category: 'Government'
  },
  {
    slug: 'bac-forms',
    name: 'PhilGEPS Government Procurement',
    shortName: 'PhilGEPS',
    description: 'Access public bidding notices, procurement documents, and award notices for Inabanga projects.',
    url: 'https://www.philgeps.gov.ph/',
    category: 'Procurement'
  },
  {
    slug: 'sb-e-archives',
    name: 'Provincial & Municipal Legislative Records',
    shortName: 'Legislative',
    description: 'Access legislative archives, provincial ordinances, and resolutions passed by the Sangguniang Bayan.',
    url: 'https://bohol.gov.ph/',
    category: 'Government'
  },
  {
    slug: 'dts',
    name: "Document Tracking & Verification",
    shortName: "eGov Tracking",
    description: "Track official inquiries, government permits, and verify municipal certifications.",
    url: 'https://e.gov.ph/',
    category: 'Government',
    note: "Inquire directly at the Mayor's Office, Ground Floor, Inabanga Municipal Hall, Poblacion."
  }
];
