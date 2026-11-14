import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { TransparencyPage } from '@/features/transparency/transparency-page'

export const metadata = pageMetadata('/transparency')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/transparency" />
      <TransparencyPage />
    </>
  )
}
