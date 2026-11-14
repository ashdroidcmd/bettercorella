import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata, paramsFor } from '@/lib/seo/metadata'
import { NewsDetailPage } from '@/features/news/news-detail-page'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  // /news/archive is its own static route, not a story slug.
  return paramsFor('/news/[slug]').filter((params) => params.slug !== 'archive')
}

export async function generateMetadata({ params: paramsPromise }: Props) {
  const params = await paramsPromise
  return pageMetadata(`/news/${params.slug}`)
}

export default async function Page({ params: paramsPromise }: Props) {
  const params = await paramsPromise
  return (
    <>
      <RouteJsonLd path={`/news/${params.slug}`} />
      <NewsDetailPage />
    </>
  )
}
