import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { HotlinesPage } from '@/features/government/hotlines-page'

export const metadata = pageMetadata('/government/hotlines')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/government/hotlines" />
      <HotlinesPage />
    </>
  )
}
