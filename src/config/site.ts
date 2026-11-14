/** Site-wide identity. Change the deployed origin with NEXT_PUBLIC_SITE_URL (no trailing slash). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bettercorella.vercel.app').replace(/\/$/, '')

export const SITE_NAME = 'Better Inabanga'
export const SITE_TITLE = 'Better Inabanga, Bohol'
export const SITE_DESCRIPTION =
  'A clearer, independent guide to Municipality of Inabanga, Bohol services, officials, barangays, budgets, and public records.'
export const THEME_COLOR = '#0284c7'
