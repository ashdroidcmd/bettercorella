import {
  Bed,
  Cpu,
  HeartPulse,
  Sprout,
  Store,
  Truck,
  Utensils,
  Wrench,
  Briefcase,
  type LucideIcon,
} from 'lucide-react'
import type { BusinessCategory } from '../../shared/types/business'

export const BUSINESS_ICONS: Record<BusinessCategory, LucideIcon> = {
  tech: Cpu,
  food: Utensils,
  retail: Store,
  services: Wrench,
  agri: Sprout,
  lodging: Bed,
  transport: Truck,
  health: HeartPulse,
  other: Briefcase,
}
