import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { OfficesPage } from '@/features/government/offices-page'

export const metadata = pageMetadata('/government/offices')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/government/offices" />
      <OfficesPage />
    </>
  )
}
