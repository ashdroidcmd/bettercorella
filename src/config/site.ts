/** Site-wide identity. Change the deployed origin with NEXT_PUBLIC_SITE_URL (no trailing slash). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bettercorella.vercel.app').replace(/\/$/, '')

export const SITE_NAME = 'BetterCorella'
export const SITE_TITLE = 'BetterCorella, Bohol'
/** Site name shown by search engines (WebSite JSON-LD, og:site_name). */
export const SITE_DISPLAY_NAME = 'Corella, Bohol'
export const SITE_DESCRIPTION =
  'An independent civic guide to the services, officials, barangays, budgets and public records of the Municipality of Corella, Bohol.'
export const THEME_COLOR = '#0038A8'

/** Where residents report wrong information or share official sources. */
export const ISSUES_URL = 'https://github.com/ashdroidcmd/bettercorella/issues'
export const REPOSITORY_URL = 'https://github.com/ashdroidcmd/bettercorella'
