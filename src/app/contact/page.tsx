import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { ContactPage } from '@/features/info/contact-page'

export const metadata = pageMetadata('/contact')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/contact" />
      <ContactPage />
    </>
  )
}
