import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { BarangaysPage } from '@/features/government/barangays-page'

export const metadata = pageMetadata('/government/barangays')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/government/barangays" />
      <BarangaysPage />
    </>
  )
}
