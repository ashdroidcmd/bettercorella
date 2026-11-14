import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata, paramsFor } from '@/lib/seo/metadata'
import { ServiceCategoryPage } from '@/features/services/service-category-page'

type Props = { params: Promise<{ category: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return paramsFor('/services/[category]')
}

export async function generateMetadata({ params: paramsPromise }: Props) {
  const params = await paramsPromise
  return pageMetadata(`/services/${params.category}`)
}

export default async function Page({ params: paramsPromise }: Props) {
  const params = await paramsPromise
  return (
    <>
      <RouteJsonLd path={`/services/${params.category}`} />
      <ServiceCategoryPage />
    </>
  )
}
