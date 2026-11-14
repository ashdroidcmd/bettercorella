import type { ServiceCategory } from '../types/index.ts';
import { services } from './services.ts';

const categoryList: ServiceCategory[] = [
  {
    "slug": "business",
    "name": "Business & permits",
    "shortName": "Business",
    "icon": "Briefcase",
    "description": "Start, renew, or close a business, and secure the clearances you need to operate.",
    "examples": [
      "Business permit",
      "Mayor's permit",
      "Zoning clearance"
    ],
    "serviceCount": 0
  },
  {
    "slug": "taxes",
    "name": "Taxes & property",
    "shortName": "Taxes",
    "icon": "ReceiptText",
    "description": "Pay taxes, secure a community tax certificate, and manage property records.",
    "examples": [
      "Cedula",
      "Real property tax",
      "Tax declaration"
    ],
    "serviceCount": 0
  },
  {
    "slug": "certificates",
    "name": "Certificates & records",
    "shortName": "Certificates",
    "icon": "FileBadge",
    "description": "Birth, marriage, death, and other civil registry records for residents and families.",
    "examples": [
      "Birth certificate",
      "Marriage certificate",
      "Death certificate"
    ],
    "serviceCount": 0
  },
  {
    "slug": "health",
    "name": "Health & wellness",
    "shortName": "Health",
    "icon": "HeartPulse",
    "description": "Municipal health programs, clinics, sanitation, and medical support.",
    "examples": [
      "Health certificate",
      "Vaccination",
      "Medical assistance"
    ],
    "serviceCount": 0
  },
  {
    "slug": "social",
    "name": "Social services",
    "shortName": "Social",
    "icon": "HandHeart",
    "description": "Assistance for seniors, persons with disabilities, solo parents, children, and families in crisis.",
    "examples": [
      "Senior citizen ID",
      "PWD assistance",
      "Solo parent ID"
    ],
    "serviceCount": 0
  },
  {
    "slug": "agriculture",
    "name": "Agriculture & fisheries",
    "shortName": "Agriculture",
    "icon": "Sprout",
    "description": "Support for farmers, fisherfolk, and livestock owners.",
    "examples": [
      "Farmer registration",
      "Seedlings",
      "Animal health"
    ],
    "serviceCount": 0
  },
  {
    "slug": "infrastructure",
    "name": "Infrastructure & engineering",
    "shortName": "Infrastructure",
    "icon": "HardHat",
    "description": "Building permits, occupancy, road works, and engineering records.",
    "examples": [
      "Building permit",
      "Occupancy certificate",
      "Excavation permit"
    ],
    "serviceCount": 0
  },
  {
    "slug": "environment",
    "name": "Environment",
    "shortName": "Environment",
    "icon": "Leaf",
    "description": "Permits, inspections, and programs for a cleaner, greener town.",
    "examples": [
      "Environmental permit",
      "Tree cutting",
      "Waste management"
    ],
    "serviceCount": 0
  },
  {
    "slug": "safety",
    "name": "Safety & disaster",
    "shortName": "Safety",
    "icon": "ShieldAlert",
    "description": "Emergency response, disaster preparedness, and public safety services.",
    "examples": [
      "Emergency response",
      "Disaster training",
      "Safety clearance"
    ],
    "serviceCount": 0
  },
  {
    "slug": "employment",
    "name": "Jobs & livelihood",
    "shortName": "Jobs",
    "icon": "BriefcaseBusiness",
    "description": "Job matching, livelihood programs, and support for workers and OFWs.",
    "examples": [
      "Job fair",
      "SPES",
      "Livelihood assistance"
    ],
    "serviceCount": 0
  },
  {
    "slug": "youth",
    "name": "Education & youth",
    "shortName": "Youth",
    "icon": "GraduationCap",
    "description": "Library, scholarships, youth programs, and learning resources.",
    "examples": [
      "Library card",
      "Scholarship",
      "Youth programs"
    ],
    "serviceCount": 0
  },
  {
    "slug": "governance",
    "name": "Governance & administration",
    "shortName": "Governance",
    "icon": "Landmark",
    "description": "Records, personnel, legal, and general municipal administration services.",
    "examples": [
      "Records request",
      "Employment verification",
      "Legal assistance"
    ],
    "serviceCount": 0
  }
];

/** Categories with `serviceCount` computed from the verified services in services.ts. */
export const categories: ServiceCategory[] = categoryList.map((category) => ({
  ...category,
  serviceCount: services.filter((service) => service.category === category.slug).length,
}));
