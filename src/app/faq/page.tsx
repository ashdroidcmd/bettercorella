import { RouteJsonLd } from '@/components/RouteJsonLd'
import { pageMetadata } from '@/lib/metadata'
import { FaqPage } from '@/views/FaqPage'

export const metadata = pageMetadata('/faq')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/faq" />
      <FaqPage />
    </>
  )
}
