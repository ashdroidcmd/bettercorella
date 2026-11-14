import { RouteJsonLd } from '@/components/RouteJsonLd'
import { pageMetadata } from '@/lib/metadata'
import { BusinessPage } from '@/views/BusinessPage'

export const metadata = pageMetadata('/city/business')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/city/business" />
      <BusinessPage />
    </>
  )
}
