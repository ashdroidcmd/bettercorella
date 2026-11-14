import { RouteJsonLd } from '@/components/RouteJsonLd'
import { pageMetadata } from '@/lib/metadata'
import { BudgetPage } from '@/views/BudgetPage'

export const metadata = pageMetadata('/transparency/budget')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/transparency/budget" />
      <BudgetPage />
    </>
  )
}
