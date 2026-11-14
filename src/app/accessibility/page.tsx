import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { AccessibilityPage } from '@/features/info/accessibility-page'

export const metadata = pageMetadata('/accessibility')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/accessibility" />
      <AccessibilityPage />
    </>
  )
}
