export interface BudgetAllocation {
  category: string;
  amount: number;
  percentage: number;
  description: string;
  color: string;
  hexColor: string;
}

export interface TransparencyProject {
  id: string;
  title: string;
  location: string;
  budget: number;
  sourceOfFund: string;
  status: 'Completed' | 'Ongoing' | 'Bidding' | 'Planning';
  contractor?: string;
  completionPercentage: number;
  targetDate: string;
}

export const municipalBudget2025: {
  totalBudget: number;
  internalRevenueAllotment: number;
  localRevenue: number;
  allocations: BudgetAllocation[];
} = {
  totalBudget: 248650000, // ₱248.65M Annual Budget Estimate
  internalRevenueAllotment: 221200000, // National Tax Allotment (NTA)
  localRevenue: 27450000, // Real property taxes, regulatory fees, market collections
  allocations: [
    {
      category: 'General Public Services (Personnel & Admin)',
      amount: 99460000,
      percentage: 40,
      description: 'Salaries of civil servants, operational expenses, public safety, and governance offices.',
      color: 'bg-inabanga-900',
      hexColor: '#043e23',
    },
    {
      category: '20% Municipal Development Fund (MDF)',
      amount: 49730000,
      percentage: 20,
      description: 'Capital outlays, rural roads, water supply systems, disaster mitigation, and tourism infrastructure.',
      color: 'bg-inabanga-700',
      hexColor: '#086b3c',
    },
    {
      category: 'Social Services & Welfare (Health, MSWD, Senior)',
      amount: 44757000,
      percentage: 18,
      description: 'Rural Health Unit medicines, emergency assistance (AICS), scholarship grants, nutrition programs.',
      color: 'bg-amber-500',
      hexColor: '#f59e0b',
    },
    {
      category: 'Economic Services (Agriculture, Fisheries & Tourism)',
      amount: 29838000,
      percentage: 12,
      description: 'Fisherfolk support, seed & fertilizer subsidies, mat weaving livelihood, farm-to-market paths.',
      color: 'bg-emerald-600',
      hexColor: '#16a34a',
    },
    {
      category: 'Local Disaster Risk Reduction & Management (5% LDRRMF)',
      amount: 12436329,
      percentage: 5,
      description: 'Disaster preparedness, quick response fund (QRF), rescue vehicles, and coastal relief supplies.',
      color: 'bg-rose-600',
      hexColor: '#e11d48',
    },
    {
      category: 'Special Education Fund (SEF) & Youth Development',
      amount: 12436329,
      percentage: 5,
      description: 'Public elementary/secondary school facilities repair, instructional aids, and SK youth initiatives.',
      color: 'bg-sky-600',
      hexColor: '#0284c7',
    },
  ],
};

export const priorityProjects2025: TransparencyProject[] = [
  {
    id: 'proj-01',
    title: 'Concreting of Barangay Farm-to-Market Road (Bahan to Banahao)',
    location: 'Brgy. Bahan & Brgy. Banahao, Inabanga',
    budget: 9850000,
    sourceOfFund: '20% Municipal Development Fund',
    status: 'Completed',
    contractor: 'Bohol Coastal Builders & Supply',
    completionPercentage: 100,
    targetDate: 'Q1 2025',
  },
  {
    id: 'proj-02',
    title: 'Upgrading of Inabanga River Eco-Tourism Boardwalk & Docking Facility',
    location: 'Brgy. Ilaud - Brgy. Tungod',
    budget: 14200000,
    sourceOfFund: 'Provincial & Municipal Joint Tourism Grant',
    status: 'Ongoing',
    contractor: 'Inabanga Civil Engineering Consortium',
    completionPercentage: 78,
    targetDate: 'Q4 2025',
  },
  {
    id: 'proj-03',
    title: 'Establishment of Municipal Weaving & Crafts Innovation Center (Tikog Hub)',
    location: 'Brgy. Cawayan, Inabanga',
    budget: 7500000,
    sourceOfFund: 'DTI - LGU Shared Service Facility Fund',
    status: 'Ongoing',
    contractor: 'Visayas Heritage Craftbuilders Inc.',
    completionPercentage: 65,
    targetDate: 'Q3 2025',
  },
  {
    id: 'proj-04',
    title: 'Expansion of Level III Potable Water Distribution Pipeline',
    location: 'Brgy. Anonang, Brgy. Datag, and Brgy. Dagnawan',
    budget: 12000000,
    sourceOfFund: 'Municipal Waterworks Capital Outlay',
    status: 'Ongoing',
    contractor: 'AquaFlow Bohol Engineering',
    completionPercentage: 45,
    targetDate: 'Q1 2026',
  },
  {
    id: 'proj-05',
    title: 'Construction of 24/7 Evacuation & Disaster Operations Center Phase II',
    location: 'Municipal Government Center, Poblacion',
    budget: 18500000,
    sourceOfFund: 'NDRRMC Local Disaster Fund & 5% LDRRMF',
    status: 'Bidding',
    completionPercentage: 10,
    targetDate: 'Q2 2026',
  },
  {
    id: 'proj-06',
    title: 'Installation of Solar Streetlights along Poblacion - Lawis Coastal Road',
    location: 'Brgy. Poblacion to Brgy. Lawis',
    budget: 4900000,
    sourceOfFund: '20% Development Fund',
    status: 'Completed',
    contractor: 'SunPower Philippines Technologies',
    completionPercentage: 100,
    targetDate: 'Q2 2025',
  },
];

export const fullDisclosureLinks = [
  {
    title: 'Annual Budget Report (2025)',
    description: 'Executive Budget, Appropriation Ordinance, and Statement of Receipts & Expenditures.',
    category: 'Budget',
    quarter: 'Annual 2025',
    fileType: 'PDF',
    size: '4.8 MB',
    url: '#',
  },
  {
    title: 'Annual Procurement Plan (APP 2025)',
    description: 'Complete breakdown of goods, infrastructure projects, and consulting services for procurement.',
    category: 'Procurement',
    quarter: 'Q1 2025',
    fileType: 'PDF',
    size: '3.2 MB',
    url: '#',
  },
  {
    title: '20% Component of the National Tax Allotment (NTA) Utilization',
    description: 'Quarterly status of projects implemented under the 20% development fund.',
    category: 'Development',
    quarter: 'Q2 2025',
    fileType: 'PDF',
    size: '1.9 MB',
    url: '#',
  },
  {
    title: 'Local Disaster Risk Reduction & Management Fund (LDRRMF) Report',
    description: 'Expenditure report on pre-disaster preparedness, rescue equipment, and relief goods stockpile.',
    category: 'Disaster Risk',
    quarter: 'Q2 2025',
    fileType: 'PDF',
    size: '2.1 MB',
    url: '#',
  },
  {
    title: 'Commission on Audit (COA) Annual Audit Report',
    description: 'Official findings, audit certificate, and executive summary from the Commission on Audit.',
    category: 'COA Report',
    quarter: 'Calendar Year 2024',
    fileType: 'PDF',
    size: '6.4 MB',
    url: '#',
  },
];
