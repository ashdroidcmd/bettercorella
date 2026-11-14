import { RouteJsonLd } from '@/components/RouteJsonLd'
import { pageMetadata } from '@/lib/metadata'
import { BarangaysPage } from '@/views/BarangaysPage'

export const metadata = pageMetadata('/government/barangays')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/government/barangays" />
      <BarangaysPage />
    </>
  )
}
