'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { NotFoundPage } from '../../info/not-found-page'
import { ComingSoon } from '../../../components/ui/ComingSoon'
import { PageHero } from '../../../components/ui/PageHero'
import { Reveal } from '../../../components/ui/Reveal'
import { SearchBox } from '../../search/shared/components/SearchBox'
import { SectionHeading } from '../../../components/ui/SectionHeading'
import { ServiceCard } from '../shared/components/ServiceCard'
import { SourceNote } from '../../../components/ui/SourceNote'
import { categories } from '../shared/data/categories'
import { city } from '../../../config/city'
import { services } from '../shared/data/services'

export function ServiceCategoryPage() {
  const { category: categorySlug } = useParams<{ category: string }>()
  const category = categories.find((item) => item.slug === categorySlug)
  const items = services
    .filter((service) => service.category === categorySlug)
    .sort((a, b) => a.title.localeCompare(b.title))


  if (!category) return <NotFoundPage />

  const otherCategories = categories.filter((item) => item.slug !== category.slug)

  return (
    <>
      <PageHero
        eyebrow="Service category"
        title={category.name}
        description={category.description}
        crumbs={[{ label: 'Services', href: '/services' }, { label: category.shortName }]}
        overflowVisible
      >
        <div className="max-w-2xl">
          <SearchBox large placeholder={`Search within ${category.shortName.toLowerCase()} or all services…`} />
        </div>
      </PageHero>

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

          <div className="mt-8">
            <SourceNote href={city.citizensCharter} linkLabel="Open the official Citizen’s Charter">
              {"Service details are summarized from the Municipal Government’s Citizen’s Charter. Requirements, fees, and processing times can change. Confirm with the issuing office before your visit; each service record has its own verification date."}</SourceNote>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="container-page py-12 sm:py-16">
          <SectionHeading
            eyebrow="Keep exploring"
            title="Other service categories"
            description="Browse the rest of the charter by category."
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {otherCategories.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
               
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-semibold text-ink-700 shadow-sm transition hover:border-brand-200 hover:text-brand-700"
              >
                {item.shortName}
                {item.serviceCount ? (
                  <span className="rounded-full bg-surface px-2 py-0.5 text-[11px] font-bold text-ink-500">
                    {item.serviceCount}
                  </span>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
