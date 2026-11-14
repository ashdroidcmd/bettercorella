import { RouteJsonLd } from '@/components/RouteJsonLd'
import { pageMetadata, paramsFor } from '@/lib/metadata'
import { OfficeDetailPage } from '@/views/OfficeDetailPage'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return paramsFor('/government/offices/[slug]')
}

export async function generateMetadata({ params: paramsPromise }: Props) {
  const params = await paramsPromise
  return pageMetadata(`/government/offices/${params.slug}`)
}

export default async function Page({ params: paramsPromise }: Props) {
  const params = await paramsPromise
  return (
    <>
      <RouteJsonLd path={`/government/offices/${params.slug}`} />
      <OfficeDetailPage />
    </>
  )
}
