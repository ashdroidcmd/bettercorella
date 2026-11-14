import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { TermsPage } from '@/features/info/terms-page'

export const metadata = pageMetadata('/terms')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/terms" />
      <TermsPage />
    </>
  )
}
