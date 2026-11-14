import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata, paramsFor } from '@/lib/seo/metadata'
import { BarangayDetailPage } from '@/features/government/barangay-detail-page'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return paramsFor('/government/barangays/[slug]')
}

export async function generateMetadata({ params: paramsPromise }: Props) {
  const params = await paramsPromise
  return pageMetadata(`/government/barangays/${params.slug}`)
}

export default async function Page({ params: paramsPromise }: Props) {
  const params = await paramsPromise
  return (
    <>
      <RouteJsonLd path={`/government/barangays/${params.slug}`} />
      <BarangayDetailPage />
    </>
  )
}
