import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { FaqPage } from '@/features/info/faq-page'

export const metadata = pageMetadata('/faq')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/faq" />
      <FaqPage />
    </>
  )
}
