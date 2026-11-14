'use client'

import { PageHero } from '../../../components/ui/PageHero'
import { PendingSection } from '../../../components/ui/PendingSection'
import { city } from '../../../config/city'

export function BudgetPage() {
  return (
    <>
      <PageHero
        eyebrow="Public funds"
        title="Budget and spending"
        description={`Where ${city.name}'s public money comes from and how it is spent. Figures are published here only after they are checked against BLGF and Full Disclosure Policy records.`}
        crumbs={[{ label: 'Transparency', href: '/transparency' }, { label: 'Budget and spending' }]}
      />
      <PendingSection
        topic="Budget and spending figures"
        source="They will come from the Bureau of Local Government Finance (BLGF) and the documents the LGU posts under the Full Disclosure Policy."
        links={[
          {
            label: 'BLGF LGU fiscal data',
            href: 'https://blgf.gov.ph/lgu-fiscal-data/',
            description: 'Statements of receipts and expenditures for every LGU, including income sources and spending.',
          },
          {
            label: 'DILG Full Disclosure Policy portal',
            href: 'https://fdpp.dilg.gov.ph/',
            description: 'Budgets, annual procurement plans and financial reports that LGUs are required to publish.',
          },
          {
            label: 'Commission on Audit',
            href: 'https://www.coa.gov.ph',
            description: 'Annual audit reports on how local governments manage public funds.',
          },
        ]}
      />
    </>
  )
}
