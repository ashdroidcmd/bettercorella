import { RouteJsonLd } from '@/components/RouteJsonLd'
import { pageMetadata } from '@/lib/metadata'
import { SitemapPage } from '@/views/SitemapPage'

export const metadata = pageMetadata('/sitemap')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/sitemap" />
      <SitemapPage />
    </>
  )
}
