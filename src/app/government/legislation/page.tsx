import { RouteJsonLd } from '@/components/RouteJsonLd'
import { pageMetadata } from '@/lib/metadata'
import { LegislationPage } from '@/views/LegislationPage'

export const metadata = pageMetadata('/government/legislation')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/government/legislation" />
      <LegislationPage />
    </>
  )
}
