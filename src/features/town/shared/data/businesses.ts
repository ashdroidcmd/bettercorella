import type { BusinessCategory, BusinessListing } from '../types/business.ts'

export const businessCategoryLabels: Record<BusinessCategory, string> = {
  tech: 'Tech and IT',
  food: 'Food and drinks',
  retail: 'Retail and sari-sari',
  services: 'Services and repairs',
  agri: 'Farming and agriculture',
  lodging: 'Lodging and tourism',
  transport: 'Transport and delivery',
  health: 'Health and wellness',
  other: 'Other',
}

// Listings come from the business owners (the "Register your business" form, reviewed by volunteers).
// They are not endorsed by BetterCorella or the municipal government.
export const businesses: BusinessListing[] = [
  {
    slug: 'ashdroidcmd-developer-for-hire',
    name: 'ashdroidcmd — Developer for hire',
    category: 'tech',
    tagline: 'Freelance software and hardware projects, from websites to microcontrollers.',
    description:
      'Freelance developer taking on projects for businesses, schools and individuals: AI tools and chatbots, websites and web apps, games, automation scripts, and IoT devices built on ESP32 and Arduino. Also the developer behind BetterCorella.',
    offerings: [
      'AI and chatbots',
      'Websites and web apps',
      'Games',
      'Automation and scripts',
      'IoT',
      'ESP32',
      'Arduino',
      'Custom projects',
    ],
    serviceArea: 'Corella, Bohol and remote',
    contact: { github: 'https://github.com/ashdroidcmd' },
    maintainerListing: true,
    sourceLabel: 'Listed by the owner',
    sourceUrl: 'https://github.com/ashdroidcmd',
    lastVerified: '2026-11-19',
  },
]
