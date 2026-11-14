import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { GovernmentPage } from '@/features/government/government-page'

export const metadata = pageMetadata('/government')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/government" />
      <GovernmentPage />
    </>
  )
}
