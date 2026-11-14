export interface BarangayMapFeature {
  slug: string
  name: string
  areaSqKm: number
  labelX: number
  labelY: number
  path: string
}

export interface BarangayMapProjection {
  originX: number
  originY: number
  scaleX: number
  scaleY: number
  padding: number
}

export interface BarangayMapTile {
  tileZ: number
  tileX: number
  tileY: number
  x: number
  y: number
  width: number
  height: number
}

export const barangayMap = {
  viewBox: '0 0 1000 700',
  cityOutline: 'M24,24 L976,24 L976,676 L24,676 Z',
  projection: {
    originX: 13811650.0,
    originY: -1118320.0,
    scaleX: 0.05,
    scaleY: 0.05,
    padding: 24.0,
  },
  tiles: [] as BarangayMapTile[],
  // Boundary features return once official Corella barangay boundaries (PSA/NAMRIA) are sourced.
  features: [] as BarangayMapFeature[]
};
