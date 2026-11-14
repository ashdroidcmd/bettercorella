import { RouteJsonLd } from '@/components/RouteJsonLd'
import { pageMetadata } from '@/lib/metadata'
import { PrivacyPage } from '@/views/PrivacyPage'

export const metadata = pageMetadata('/privacy')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/privacy" />
      <PrivacyPage />
    </>
  )
}
