import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { SearchPage } from '@/features/search/search-page'

export const metadata = pageMetadata('/search')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/search" />
      <SearchPage />
    </>
  )
}
