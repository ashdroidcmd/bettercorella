import { RouteJsonLd } from '@/components/RouteJsonLd'
import { pageMetadata } from '@/lib/metadata'
import { NewsArchivePage } from '@/views/NewsArchivePage'

export const metadata = pageMetadata('/news/archive')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/news/archive" />
      <NewsArchivePage />
    </>
  )
}
