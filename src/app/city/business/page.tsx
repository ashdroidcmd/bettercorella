import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { BusinessPage } from '@/features/town/business-page'

export const metadata = pageMetadata('/city/business')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/city/business" />
      <BusinessPage />
    </>
  )
}
