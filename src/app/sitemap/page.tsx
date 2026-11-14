import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { SitemapPage } from '@/features/info/sitemap-page'

export const metadata = pageMetadata('/sitemap')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/sitemap" />
      <SitemapPage />
    </>
  )
}
