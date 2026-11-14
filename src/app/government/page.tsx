import { RouteJsonLd } from '@/components/RouteJsonLd'
import { pageMetadata } from '@/lib/metadata'
import { GovernmentPage } from '@/views/GovernmentPage'

export const metadata = pageMetadata('/government')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/government" />
      <GovernmentPage />
    </>
  )
}
