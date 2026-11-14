import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { NewsPage } from '@/features/news/news-page'

export const metadata = pageMetadata('/news')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/news" />
      <NewsPage />
    </>
  )
}
