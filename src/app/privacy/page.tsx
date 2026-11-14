import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { PrivacyPage } from '@/features/info/privacy-page'

export const metadata = pageMetadata('/privacy')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/privacy" />
      <PrivacyPage />
    </>
  )
}
