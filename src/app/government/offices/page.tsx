import { RouteJsonLd } from '@/components/RouteJsonLd'
import { pageMetadata } from '@/lib/metadata'
import { OfficesPage } from '@/views/OfficesPage'

export const metadata = pageMetadata('/government/offices')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/government/offices" />
      <OfficesPage />
    </>
  )
}
