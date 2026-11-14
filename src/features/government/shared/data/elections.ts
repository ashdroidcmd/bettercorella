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
export const electionSupplementSources: ElectionSupplementSource[] = []

export const cityElections: CityElection[] = []
