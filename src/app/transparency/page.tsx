import { RouteJsonLd } from '@/components/RouteJsonLd'
import { pageMetadata } from '@/lib/metadata'
import { TransparencyPage } from '@/views/TransparencyPage'

export const metadata = pageMetadata('/transparency')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/transparency" />
      <TransparencyPage />
    </>
  )
}
