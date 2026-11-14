import { RouteJsonLd } from '@/components/RouteJsonLd'
import { pageMetadata } from '@/lib/metadata'
import { OpenDataPage } from '@/views/OpenDataPage'

export const metadata = pageMetadata('/transparency/open-data')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/transparency/open-data" />
      <OpenDataPage />
    </>
  )
}
