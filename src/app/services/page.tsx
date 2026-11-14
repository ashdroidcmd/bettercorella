import { RouteJsonLd } from '@/components/RouteJsonLd'
import { pageMetadata } from '@/lib/metadata'
import { ServicesPage } from '@/views/ServicesPage'

export const metadata = pageMetadata('/services')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/services" />
      <ServicesPage />
    </>
  )
}
