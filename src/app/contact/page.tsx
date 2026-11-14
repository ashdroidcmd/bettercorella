import { RouteJsonLd } from '@/components/RouteJsonLd'
import { pageMetadata } from '@/lib/metadata'
import { ContactPage } from '@/views/ContactPage'

export const metadata = pageMetadata('/contact')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/contact" />
      <ContactPage />
    </>
  )
}
