export interface ElectionWinner {
  name: string
  party: string
}

export interface CityElection {
  year: number
  mayor: ElectionWinner | null
  viceMayor: ElectionWinner | null
}

export interface ElectionSupplementSource {
  year: number
  url: string
}

export const electionSourceUrl = 'https://comelec.gov.ph'
export const electionSupplementSources: ElectionSupplementSource[] = [
  {
    year: 2007,
    url: 'https://comelec.gov.ph',
  },
  {
    year: 2010,
    url: 'https://comelec.gov.ph',
  },
  {
    year: 2013,
    url: 'https://comelec.gov.ph',
  },
]

export const cityElections: CityElection[] = [
  {
    year: 2001,
    mayor: { name: 'Jose Jono Jumamoy', party: 'Lakas-NUCD-UMDP' },
    viceMayor: { name: 'Wenceslao Lao', party: 'Lakas-NUCD-UMDP' },
  },
  {
    year: 2004,
    mayor: { name: 'Jose Jono Jumamoy', party: 'Lakas-CMD' },
    viceMayor: { name: 'Wenceslao Lao', party: 'Lakas-CMD' },
  },
  {
    year: 2007,
    mayor: { name: 'Jose Jono Jumamoy', party: 'Lakas-CMD' },
    viceMayor: { name: 'Wenceslao Lao', party: 'Lakas-CMD' },
  },
  {
    year: 2010,
    mayor: { name: 'Jose Jono Jumamoy', party: 'Lakas-Kampi-CMD' },
    viceMayor: { name: 'Roygie Jumamoy', party: 'Lakas-Kampi-CMD' },
  },
  {
    year: 2013,
    mayor: { name: 'Roygie Jumamoy', party: 'Liberal Party' },
    viceMayor: { name: 'Wenceslao Lao', party: 'Liberal Party' },
  },
  {
    year: 2016,
    mayor: { name: 'Roygie Jumamoy', party: 'Liberal Party' },
    viceMayor: { name: 'Rodrigo B. Petecio', party: 'Liberal Party' },
  },
  {
    year: 2019,
    mayor: { name: 'Roygie Jumamoy', party: 'NUP' },
    viceMayor: { name: 'Jose Jono Jumamoy', party: 'NUP' },
  },
  {
    year: 2022,
    mayor: { name: 'Jose Jono Jumamoy', party: 'NPC' },
    viceMayor: { name: 'Roygie Jumamoy', party: 'NUP' },
  },
  {
    year: 2025,
    mayor: { name: 'Dexter M. Ancla', party: 'Lakas-CMD' },
    viceMayor: { name: 'Hermogenes C. Cenabre, Jr.', party: 'Independent' },
  },
]
