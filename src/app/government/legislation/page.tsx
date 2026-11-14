import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { LegislationPage } from '@/features/government/legislation-page'

export const metadata = pageMetadata('/government/legislation')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/government/legislation" />
      <LegislationPage />
    </>
  )
}
