import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { LifePage } from '@/features/town/life-page'

export const metadata = pageMetadata('/town/life')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/town/life" />
      <LifePage />
    </>
  )
}
