import { RouteJsonLd } from '@/components/RouteJsonLd'
import { pageMetadata } from '@/lib/metadata'
import { HomePage } from '@/views/HomePage'

export const metadata = pageMetadata('/')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/" />
      <HomePage />
    </>
  )
}
