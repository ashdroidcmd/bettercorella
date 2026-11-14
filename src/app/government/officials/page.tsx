import { RouteJsonLd } from '@/components/RouteJsonLd'
import { pageMetadata } from '@/lib/metadata'
import { OfficialsPage } from '@/views/OfficialsPage'

export const metadata = pageMetadata('/government/officials')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/government/officials" />
      <OfficialsPage />
    </>
  )
}
