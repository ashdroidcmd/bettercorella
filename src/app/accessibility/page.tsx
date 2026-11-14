import { RouteJsonLd } from '@/components/RouteJsonLd'
import { pageMetadata } from '@/lib/metadata'
import { AccessibilityPage } from '@/views/AccessibilityPage'

export const metadata = pageMetadata('/accessibility')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/accessibility" />
      <AccessibilityPage />
    </>
  )
}
