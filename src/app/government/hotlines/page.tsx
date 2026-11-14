import { RouteJsonLd } from '@/components/RouteJsonLd'
import { pageMetadata } from '@/lib/metadata'
import { HotlinesPage } from '@/views/HotlinesPage'

export const metadata = pageMetadata('/government/hotlines')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/government/hotlines" />
      <HotlinesPage />
    </>
  )
}
