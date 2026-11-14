import { RouteJsonLd } from '@/components/RouteJsonLd'
import { pageMetadata } from '@/lib/metadata'
import { ProcurementPage } from '@/views/ProcurementPage'

export const metadata = pageMetadata('/transparency/procurement')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/transparency/procurement" />
      <ProcurementPage />
    </>
  )
}
