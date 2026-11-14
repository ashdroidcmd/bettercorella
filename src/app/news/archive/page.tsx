import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { NewsArchivePage } from '@/features/news/news-archive-page'

export const metadata = pageMetadata('/news/archive')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/news/archive" />
      <NewsArchivePage />
    </>
  )
}
