import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { ProcurementPage } from '@/features/transparency/procurement-page'

export const metadata = pageMetadata('/transparency/procurement')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/transparency/procurement" />
      <ProcurementPage />
    </>
  )
}
