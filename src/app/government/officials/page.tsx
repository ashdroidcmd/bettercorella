import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { OfficialsPage } from '@/features/government/officials-page'

export const metadata = pageMetadata('/government/officials')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/government/officials" />
      <OfficialsPage />
    </>
  )
}
