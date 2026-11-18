import { Church, Landmark, Leaf, MapPin, TreePine, Utensils, type LucideIcon } from 'lucide-react'
import type { SpotCategory } from '../../shared/types/tourism'

export const SPOT_CATEGORY: Record<SpotCategory, { label: string; icon: LucideIcon }> = {
  nature: { label: 'Nature', icon: TreePine },
  heritage: { label: 'Heritage', icon: Landmark },
  faith: { label: 'Church', icon: Church },
  agritourism: { label: 'Farm tour', icon: Leaf },
  food: { label: 'Food', icon: Utensils },
  other: { label: 'Attraction', icon: MapPin },
}

export const peso = (amount: number) => `₱${amount.toLocaleString('en-PH')}`
