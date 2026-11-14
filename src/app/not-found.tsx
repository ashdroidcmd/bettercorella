import type { Metadata } from 'next'
import { SITE_NAME } from '@/config/site'
import { NotFoundPage } from '@/features/info/not-found-page'

export const metadata: Metadata = {
  title: { absolute: `Page not found | ${SITE_NAME}` },
  robots: { index: false },
}

export default function NotFound() {
  return <NotFoundPage />
}
