import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { ServicesPage } from '@/features/services/services-page'

export const metadata = pageMetadata('/services')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/services" />
      <ServicesPage />
    </>
  )
}
