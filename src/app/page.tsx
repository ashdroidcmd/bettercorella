import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { HomePage } from '@/features/home/home-page'

export const metadata = pageMetadata('/')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/" />
      <HomePage />
    </>
  )
}
