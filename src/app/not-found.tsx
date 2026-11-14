import type { Metadata } from 'next'
import { SITE_NAME } from '@/lib/site'
import { NotFoundPage } from '@/views/NotFoundPage'

export const metadata: Metadata = {
  title: { absolute: `Page not found | ${SITE_NAME}` },
  robots: { index: false },
}

export default function NotFound() {
  return <NotFoundPage />
}
