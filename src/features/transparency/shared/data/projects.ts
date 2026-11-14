export interface DpwhProjectRecord {
  contractId: string
  title: string
  year: number
  budget: number
  status: string
  progress: number
  contractor: string
  category: string
  barangay: string | null
  latitude: number | null
  longitude: number | null
  startDate: string | null
  completionDate: string | null
  sourceOfFunds: string | null
}

export const dpwhProjectSourceUrl = 'https://data.bettergov.ph/datasets/19'

export const dpwhMapBounds = {
  minLat: 9.93155,
  maxLat: 10.11383,
  minLng: 123.9856,
  maxLng: 124.1627,
}

export const dpwhProjects: DpwhProjectRecord[] = []
