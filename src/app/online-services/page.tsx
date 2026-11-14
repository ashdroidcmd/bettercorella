import { RouteJsonLd } from '@/components/RouteJsonLd'
import { pageMetadata } from '@/lib/metadata'
import { OnlineServicesPage } from '@/views/OnlineServicesPage'

export const metadata = pageMetadata('/online-services')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/online-services" />
      <OnlineServicesPage />
    </>
  )
}
