import { RouteJsonLd } from '@/components/RouteJsonLd'
import { pageMetadata } from '@/lib/metadata'
import { CityProfilePage } from '@/views/CityProfilePage'

export const metadata = pageMetadata('/city')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/city" />
      <CityProfilePage />
    </>
  )
}
