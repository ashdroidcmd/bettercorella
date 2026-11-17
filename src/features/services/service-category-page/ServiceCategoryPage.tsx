'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { NotFoundPage } from '../../info/not-found-page'
import { ComingSoon } from '../../../components/ui/ComingSoon'
import { PageHero } from '../../../components/ui/PageHero'
import { Reveal } from '../../../components/ui/Reveal'
import { SectionHeading } from '../../../components/ui/SectionHeading'
import { ServiceCard } from '../shared/components/ServiceCard'
import { categories } from '../shared/data/categories'
import { charterSource } from '../shared/data/charterSource'
import { services } from '../shared/data/services'

export function ServiceCategoryPage() {
  const { category: categorySlug } = useParams<{ category: string }>()
  const category = categories.find((item) => item.slug === categorySlug)
  const items = services
    .filter((service) => service.category === categorySlug)
    .sort((a, b) => a.title.localeCompare(b.title))


  if (!category) return <NotFoundPage />

  return (
    <>
      <PageHero
        eyebrow="Service category"
        title={category.name}
        description={category.description}
        crumbs={[{ label: 'Services', href: '/services' }, { label: category.shortName }]}
        source={charterSource}
      />

      <section>
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow={items.length ? `${items.length} services` : 'Coming soon'}
              title={`${category.shortName} services`}
              description={`Every ${category.shortName.toLowerCase()} service currently listed from the Citizens’ Charter. Open a service for requirements, fees, and official forms.`}
              action={
                <Link
                  href="/services"
                 
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition hover:text-brand-800"
                >
                  {"All categories"}<ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              }
            />
          </Reveal>

          {items.length ? (
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          ) : (
            <div className="mt-8">
              <ComingSoon
                topic={`${category.shortName} services`}
                source="They will come from the municipal Citizen's Charter, with requirements, fees and processing times."
              />
            </div>
          )}

        </div>
      </section>
    </>
  )
}
