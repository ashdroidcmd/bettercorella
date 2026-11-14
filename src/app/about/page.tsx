import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { AboutPage } from '@/features/info/about-page'

export const metadata = pageMetadata('/about')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/about" />
      <AboutPage />
    </>
  )
}
