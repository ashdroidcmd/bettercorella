import { RouteJsonLd } from '@/components/RouteJsonLd'
import { pageMetadata, paramsFor } from '@/lib/metadata'
import { ServiceDetailPage } from '@/views/ServiceDetailPage'

type Props = { params: Promise<{ category: string; slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return paramsFor('/services/[category]/[slug]')
}

export async function generateMetadata({ params: paramsPromise }: Props) {
  const params = await paramsPromise
  return pageMetadata(`/services/${params.category}/${params.slug}`)
}

export default async function Page({ params: paramsPromise }: Props) {
  const params = await paramsPromise
  return (
    <>
      <RouteJsonLd path={`/services/${params.category}/${params.slug}`} />
      <ServiceDetailPage />
    </>
  )
}
