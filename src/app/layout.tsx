import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import type { ReactNode } from 'react'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { SplashScreen } from '@/components/layout/SplashScreen'
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL, THEME_COLOR } from '@/config/site'
import { Providers } from '@/app/providers'
import '@/index.css'

// Runs before first paint:
// - applies the saved theme (or the OS setting), so dark mode never flashes light. The storage key
//   must match THEME_STORAGE_KEY in src/components/layout/ThemeToggle.tsx.
// - turns on scroll reveal (`reveal-ready`), and turns it off again if the app hasn't hydrated within
//   4 s (SplashScreen sets `data-hydrated`), so content is never stuck hidden. Keep 4 s in sync with
//   `.app-splash` in src/index.css.
const initScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('bettercorella-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))d.classList.add('dark')}catch(e){}d.classList.add('reveal-ready');setTimeout(function(){if(!d.dataset.hydrated)d.classList.remove('reveal-ready')},4000)})()`

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_TITLE,
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: { 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: THEME_COLOR },
    { media: '(prefers-color-scheme: dark)', color: '#071321' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
        <noscript>
          <style>{'.app-splash-root{display:none}'}</style>
        </noscript>
      </head>
      <body>
        <SplashScreen />
        <Providers>
          <SiteLayout>{children}</SiteLayout>
        </Providers>
      </body>
    </html>
  )
}
