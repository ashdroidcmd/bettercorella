import { RouteJsonLd } from '@/components/RouteJsonLd'
import { pageMetadata } from '@/lib/metadata'
import { LifePage } from '@/views/LifePage'

export const metadata = pageMetadata('/city/life')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/city/life" />
      <LifePage />
    </>
  )
}
