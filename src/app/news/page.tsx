import { RouteJsonLd } from '@/components/RouteJsonLd'
import { pageMetadata } from '@/lib/metadata'
import { NewsPage } from '@/views/NewsPage'

export const metadata = pageMetadata('/news')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/news" />
      <NewsPage />
    </>
  )
}
