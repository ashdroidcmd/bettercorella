import { RouteJsonLd } from '@/components/RouteJsonLd'
import { pageMetadata } from '@/lib/metadata'
import { SearchPage } from '@/views/SearchPage'

export const metadata = pageMetadata('/search')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/search" />
      <SearchPage />
    </>
  )
}
