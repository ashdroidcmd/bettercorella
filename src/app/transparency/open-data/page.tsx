import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { OpenDataPage } from '@/features/transparency/open-data-page'

export const metadata = pageMetadata('/transparency/open-data')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/transparency/open-data" />
      <OpenDataPage />
    </>
  )
}
