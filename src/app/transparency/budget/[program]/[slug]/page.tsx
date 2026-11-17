import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata, paramsFor } from '@/lib/seo/metadata'
import { BudgetProjectPage } from '@/features/transparency/budget-project-page'

type Props = { params: Promise<{ program: string; slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return paramsFor('/transparency/budget/[program]/[slug]')
}

export async function generateMetadata({ params: paramsPromise }: Props) {
  const params = await paramsPromise
  return pageMetadata(`/transparency/budget/${params.program}/${params.slug}`)
}

export default async function Page({ params: paramsPromise }: Props) {
  const params = await paramsPromise
  return (
    <>
      <RouteJsonLd path={`/transparency/budget/${params.program}/${params.slug}`} />
      <BudgetProjectPage program={params.program} slug={params.slug} />
    </>
  )
}
