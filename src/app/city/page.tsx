import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { TownProfilePage } from '@/features/town/town-profile-page'

export const metadata = pageMetadata('/city')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/city" />
      <TownProfilePage />
    </>
  )
}
