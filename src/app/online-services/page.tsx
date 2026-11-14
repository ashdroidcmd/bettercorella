import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { OnlineServicesPage } from '@/features/services/online-services-page'

export const metadata = pageMetadata('/online-services')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/online-services" />
      <OnlineServicesPage />
    </>
  )
}
