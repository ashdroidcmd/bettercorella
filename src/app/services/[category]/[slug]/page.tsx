import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata, paramsFor } from '@/lib/seo/metadata'
import { ServiceDetailPage } from '@/features/services/service-detail-page'

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
