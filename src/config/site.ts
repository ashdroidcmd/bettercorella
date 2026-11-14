/** Site-wide identity. Change the deployed origin with NEXT_PUBLIC_SITE_URL (no trailing slash). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bettercorella.vercel.app').replace(/\/$/, '')

export const SITE_NAME = 'BetterCorella'
export const SITE_TITLE = 'BetterCorella, Bohol'
export const SITE_DESCRIPTION =
  'An independent civic guide to the services, officials, barangays, budgets and public records of the Municipality of Corella, Bohol.'
export const THEME_COLOR = '#0284c7'

/** Where residents report wrong information or share official sources. */
export const ISSUES_URL = 'https://github.com/ashdroidcmd/bettercorella/issues'
export const REPOSITORY_URL = 'https://github.com/ashdroidcmd/bettercorella'
