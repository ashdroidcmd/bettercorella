import { RouteJsonLd } from '@/components/RouteJsonLd'
import { pageMetadata } from '@/lib/metadata'
import { TermsPage } from '@/views/TermsPage'

export const metadata = pageMetadata('/terms')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/terms" />
      <TermsPage />
    </>
  )
}
