import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { LifePage } from '@/features/town/life-page'

export const metadata = pageMetadata('/city/life')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/city/life" />
      <LifePage />
    </>
  )
}
