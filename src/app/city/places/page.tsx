import { RouteJsonLd } from '@/components/RouteJsonLd'
import { pageMetadata } from '@/lib/metadata'
import { PlacesPage } from '@/views/PlacesPage'

export const metadata = pageMetadata('/city/places')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/city/places" />
      <PlacesPage />
    </>
  )
}
