import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { BudgetPage } from '@/features/transparency/budget-page'

export const metadata = pageMetadata('/transparency/budget')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/transparency/budget" />
      <BudgetPage />
    </>
  )
}
