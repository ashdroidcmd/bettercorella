export interface DpwhProject {
  contractId: string
  title: string
  year: number
  budget: number
  status: string
  progress: number
  contractor: string
}

export interface YearTotal {
  year: number
  projects: number
  amount: number
}

export interface AwardeeTotal {
  name: string
  awards: number
  amount: number
}

export const dpwhSourceUrl = 'https://data.bettergov.ph/datasets/19'
export const philgepsSourceUrl = 'https://data.bettergov.ph/datasets/5'

export const dpwhSanFernando = {
  totalProjects: 249,
  totalBudget: 3528676621.06,
  completed: 230,
  ongoing: 16,
  forProcurement: 3,
  recentYears: [
    { year: 2021, projects: 26, amount: 334689727.06 },
    { year: 2022, projects: 26, amount: 254666281.51 },
    { year: 2023, projects: 22, amount: 306079397.24 },
    { year: 2024, projects: 30, amount: 889430274.07 },
    { year: 2025, projects: 14, amount: 330779454.11 },
  ] satisfies YearTotal[],
  largestProjects: [
    {
      contractId: '24HC0103',
      title: 'Inabanga River Flood Mitigation and Dike Protection, Barangay Ilaud & Poblacion',
      year: 2024,
      budget: 144597478.87,
      status: 'Ongoing',
      progress: 92.64,
      contractor: 'B. Vicencio Builders & Supply',
    },
    {
      contractId: '25HC0070',
      title: 'Rehabilitation and Expansion of Port of U-og Maritime Facilities',
      year: 2025,
      budget: 144044907.29,
      status: 'Ongoing',
      progress: 0.14,
      contractor: 'Lab-Pro Construction & Development',
    },
    {
      contractId: '24HC0088',
      title: 'Seawall and Coastal Storm Surge Protection, Barangay Lawis',
      year: 2024,
      budget: 96499014.82,
      status: 'Completed',
      progress: 100,
      contractor: 'B. Vicencio Builders & Supply',
    },
    {
      contractId: '24HC0090',
      title: 'Farm-to-Market Road Concrete Paving, Barangay Luyo–Cagawasan',
      year: 2024,
      budget: 96499003,
      status: 'Completed',
      progress: 100,
      contractor: 'N.N. Yu Construction Inc.',
    },
    {
      contractId: '24HC0089',
      title: 'Multi-Purpose Evacuation Center & Disaster Resilience Complex, Poblacion',
      year: 2024,
      budget: 96498830.56,
      status: 'Completed',
      progress: 100,
      contractor: 'B. Vicencio Builders & Supply',
    },
  ] satisfies DpwhProject[],
}

export const philgepsSanFernando = {
  totalAwards: 619,
  totalAmount: 1538452845.25,
  topAwardees: [
    { name: 'B. Vicencio Builders & Supply', awards: 53, amount: 224214981.56 },
    { name: 'Lab-Pro Construction & Development', awards: 39, amount: 98964330.98 },
    { name: 'N.N. Yu Construction Inc.', awards: 36, amount: 93362374.61 },
    { name: 'J.A. Achacoso Construction & Supply', awards: 41, amount: 77948743.05 },
    { name: 'Inabanga Builders & Heavy Equipment Services', awards: 16, amount: 75493655.99 },
  ] satisfies AwardeeTotal[],
  topAward: {
    title: 'Construction of Inabanga River Flood Mitigation Dike',
    awardee: 'B. Vicencio Builders & Supply',
    amount: 38895056.93,
    year: 2023,
  },
}

export const dpwhInabanga = dpwhSanFernando
export const philgepsInabanga = philgepsSanFernando
