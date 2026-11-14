export interface RevenueSource {
  key: 'tax' | 'nonTax' | 'nta' | 'otherNational' | 'grants'
  label: string
  amount: number
}

export interface CityFiscalPeer {
  name: string
  province: string
  annualRegularIncome: number
  localSources: number
  ownSourceShare: number
  ntaShare: number
}

export const fiscalSourceUrl = 'https://blgf.gov.ph/lgu-fiscal-data/'

export const fiscal2024 = {
  totalIncome: 248642180.00,
  totalLocalSources: 56234680.00,
  totalTaxRevenue: 32115450.00,
  totalNonTaxRevenue: 24119230.00,
  nta: 192407500.00,
  otherNationalShares: 0.00,
  grants: 0.00,
  totalOperatingExpenditures: 221850320.00,
  netOperatingIncome: 26791860.00,
  capitalOutlay: 49728436.00,
  specialEducationFund: 6250000.00,
  disasterFund: {
    appropriation: 12432109.00,
    spent: 8940250.00,
    quickResponseAppropriation: 3729632.70,
    quickResponseSpent: 2150000.00,
  },
}

export const revenueSources2024: RevenueSource[] = [
  { key: 'tax', label: 'Local taxes & real property tax', amount: fiscal2024.totalTaxRevenue },
  { key: 'nonTax', label: 'Regulatory fees & municipal charges', amount: fiscal2024.totalNonTaxRevenue },
  { key: 'nta', label: 'National Tax Allotment (NTA)', amount: fiscal2024.nta },
  { key: 'otherNational', label: 'Other national shares', amount: fiscal2024.otherNationalShares },
  { key: 'grants', label: 'Grants & developmental aid', amount: fiscal2024.grants },
]

export const boholMunicipalities2024: CityFiscalPeer[] = [
  {
    name: 'Inabanga',
    province: 'Bohol',
    annualRegularIncome: 248642180.00,
    localSources: 56234680.00,
    ownSourceShare: 0.2262,
    ntaShare: 0.7738,
  },
  {
    name: 'Tubigon',
    province: 'Bohol',
    annualRegularIncome: 265420150.00,
    localSources: 68540200.00,
    ownSourceShare: 0.2582,
    ntaShare: 0.7418,
  },
  {
    name: 'Clarin',
    province: 'Bohol',
    annualRegularIncome: 148920400.00,
    localSources: 28450100.00,
    ownSourceShare: 0.1910,
    ntaShare: 0.8090,
  },
  {
    name: 'Buenavista',
    province: 'Bohol',
    annualRegularIncome: 172650300.00,
    localSources: 32150000.00,
    ownSourceShare: 0.1862,
    ntaShare: 0.8138,
  },
  {
    name: 'Carmen',
    province: 'Bohol',
    annualRegularIncome: 285140800.00,
    localSources: 74180500.00,
    ownSourceShare: 0.2602,
    ntaShare: 0.7398,
  },
  {
    name: 'Trinidad',
    province: 'Bohol',
    annualRegularIncome: 195380200.00,
    localSources: 39840000.00,
    ownSourceShare: 0.2039,
    ntaShare: 0.7961,
  },
  {
    name: 'Talibon',
    province: 'Bohol',
    annualRegularIncome: 320850600.00,
    localSources: 82450300.00,
    ownSourceShare: 0.2570,
    ntaShare: 0.7430,
  },
  {
    name: 'Getafe',
    province: 'Bohol',
    annualRegularIncome: 184290500.00,
    localSources: 35620000.00,
    ownSourceShare: 0.1933,
    ntaShare: 0.8067,
  },
  {
    name: 'Ubay',
    province: 'Bohol',
    annualRegularIncome: 380620400.00,
    localSources: 98750200.00,
    ownSourceShare: 0.2594,
    ntaShare: 0.7406,
  },
]

// Keep export alias for any legacy consumers
export const ilocosCities2024 = boholMunicipalities2024
