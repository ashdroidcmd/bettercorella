import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { BusinessPage } from '@/features/town/business-page'

export const metadata = pageMetadata('/town/business')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/town/business" />
      <BusinessPage />
    </>
  )
}
