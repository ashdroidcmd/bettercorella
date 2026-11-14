import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { PlacesPage } from '@/features/town/places-page'

export const metadata = pageMetadata('/city/places')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/city/places" />
      <PlacesPage />
    </>
  )
}
