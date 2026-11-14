import { describe, expect, it } from 'vitest'
import { barangayMap } from '../features/government/shared/data/barangayMap'
import { barangays } from '../features/government/shared/data/barangays'
import { formatDataFreshnessReport, getDataFreshness } from './dataFreshness'
import { bidBulletins, bidResults } from '../features/transparency/shared/data/bidDocs'
import { budgetDocs } from '../features/transparency/shared/data/budgetDocs'
import { categories } from '../features/services/shared/data/categories'
import { city } from '../config/city'
import { SITE_NAME } from '../config/site'
import { cityElections } from '../features/government/shared/data/elections'
import { faqs } from '../features/info/faq-page/data/faqs'
import { hotlines } from '../features/government/shared/data/hotlines'
import { offices } from '../features/government/shared/data/offices'
import { officials } from '../features/government/shared/data/officials'
import { onlineServiceSlugs, onlineServices } from '../features/services/shared/data/onlineServices'
import { openDataSources } from '../features/transparency/shared/data/openData'
import { legislation, legislationSources } from '../features/government/shared/data/legislation'
import { placeCategories, places } from '../features/town/shared/data/places'
import { dpwhProjects } from '../features/transparency/shared/data/projects'
import { services } from '../features/services/shared/data/services'
import { sources } from '../features/info/about-page/data/sources'
import { stats } from '../features/town/shared/data/stats'
import { timeline } from '../features/town/shared/data/timeline'
import { buildRouteMetadata } from './seo/routeMetadata'
import { pageMetadata, paramsFor } from './seo/metadata'

// These tests check invariants that must hold whether a dataset is empty, partial or complete,
// so they keep passing as verified Corella data is added.

const http = /^https?:\/\//
const slugPattern = /^[a-z0-9-]+$/

function unique(values: string[]) {
  return new Set(values).size === values.length
}

function isDate(value: string) {
  return !Number.isNaN(Date.parse(value))
}

describe('LGU identity', () => {
  it('describes Corella, Bohol', () => {
    expect(city.name).toBe('Corella')
    expect(city.province).toBe('Bohol')
    expect(city.officialName).toBe('Municipality of Corella, Bohol')
    expect(SITE_NAME).toBe('BetterCorella')
  })

  it('only fills in figures and links that look valid', () => {
    for (const value of [city.population2024, city.population2020, city.landAreaKm2, city.revenue2024, city.expenditures2024]) {
      if (value !== null) expect(value).toBeGreaterThan(0)
    }
    for (const url of [city.website, city.citizensCharter, city.sanggunian, city.archives, city.facebook]) {
      if (url !== null) expect(url).toMatch(http)
    }
    if (city.lastVerified !== null) expect(isDate(city.lastVerified)).toBe(true)
  })

  it('contains no leftover content from the template LGUs', () => {
    const datasets = {
      city, services, offices, officials, barangays, barangayMap, hotlines, legislation, legislationSources,
      places, placeCategories, dpwhProjects, budgetDocs, bidResults, bidBulletins, cityElections, onlineServices,
      openDataSources, sources, faqs, stats, timeline, categories,
    }
    const leftovers = /inabanga|inabangnon|san fernando|sanfernando|la union/i
    for (const [name, data] of Object.entries(datasets)) {
      expect(JSON.stringify(data), `dataset "${name}"`).not.toMatch(leftovers)
    }
  })
})

describe('services and categories', () => {
  it('has 12 unique categories whose counts match the services', () => {
    expect(categories).toHaveLength(12)
    expect(unique(categories.map((category) => category.slug))).toBe(true)
    for (const category of categories) {
      expect(category.serviceCount).toBe(services.filter((service) => service.category === category.slug).length)
    }
  })

  it('has unique, complete, sourced service records', () => {
    expect(unique(services.map((service) => `${service.category}/${service.slug}`))).toBe(true)
    const categorySlugs = new Set(categories.map((category) => category.slug))
    for (const service of services) {
      expect(categorySlugs.has(service.category)).toBe(true)
      expect(service.slug).toMatch(slugPattern)
      expect(service.title.trim()).not.toBe('')
      expect(service.office.trim()).not.toBe('')
      expect(service.summary.trim()).not.toBe('')
      expect(service.classification.trim()).not.toBe('')
      expect(isDate(service.lastVerified)).toBe(true)
      expect(service.sourceUrl).toMatch(http)
      for (const pdf of service.pdfs) expect(http.test(pdf) || pdf.startsWith('/')).toBe(true)
    }
  })

  it('resolves every service to a known office', () => {
    const officeCodes = new Set(offices.map((office) => office.code).filter(Boolean))
    expect(services.filter((service) => !officeCodes.has(service.officeCode))).toEqual([])
  })

  it('lists only real services as available online', () => {
    const serviceSlugs = new Set(services.map((service) => service.slug))
    for (const slug of onlineServiceSlugs) expect(serviceSlugs.has(slug)).toBe(true)
  })

  it('links online services to official portals', () => {
    expect(onlineServices.length).toBeGreaterThan(0)
    expect(unique(onlineServices.map((service) => service.slug))).toBe(true)
    for (const service of onlineServices) {
      expect(service.name.trim()).not.toBe('')
      expect(service.url).toMatch(http)
    }
  })
})

describe('government', () => {
  it('has unique office slugs and codes with source links', () => {
    expect(unique(offices.map((office) => office.slug))).toBe(true)
    expect(unique(offices.flatMap((office) => (office.code ? [office.code] : [])))).toBe(true)
    for (const office of offices) {
      expect(office.ccUrl === '' || http.test(office.ccUrl)).toBe(true)
      expect(office.sourceUrl).toMatch(http)
    }
  })

  it('has officials with known roles', () => {
    expect(unique(officials.map((official) => official.slug))).toBe(true)
    const roles = new Set([
      'Municipal Mayor',
      'Municipal Vice Mayor',
      'Sangguniang Bayan Member',
      'ABC / Liga ng mga Barangay President',
      'SK Federation President',
    ])
    for (const official of officials) {
      expect(roles.has(official.role)).toBe(true)
      expect(official.bioUrl === '' || http.test(official.bioUrl)).toBe(true)
    }
  })

  it('has complete barangay records', () => {
    expect(unique(barangays.map((barangay) => barangay.slug))).toBe(true)
    for (const barangay of barangays) {
      expect(barangay.slug).toMatch(slugPattern)
      expect(barangay.population2024).toBeGreaterThan(0)
      if (barangay.kagawads.length) expect(barangay.punongBarangay.trim()).not.toBe('')
      expect(barangay.sourceUrl).toMatch(http)
      expect(barangay.dilgSourceUrl).toMatch(http)
    }
    if (city.barangayCount !== null && barangays.length) expect(barangays).toHaveLength(city.barangayCount)
  })

  it('maps each barangay at most once', () => {
    expect(unique(barangayMap.features.map((feature) => feature.slug))).toBe(true)
    const siteSlugs = new Set(barangays.map((barangay) => barangay.slug))
    for (const feature of barangayMap.features) {
      expect(siteSlugs.has(feature.slug)).toBe(true)
      expect(feature.path.startsWith('M')).toBe(true)
    }
  })

  it('lists hotlines with dialable numbers, led by the national 911 line', () => {
    expect(hotlines[0]?.numbers).toContain('911')
    for (const hotline of hotlines) {
      expect(hotline.label.trim()).not.toBe('')
      expect(hotline.numbers.length).toBeGreaterThan(0)
      for (const number of hotline.numbers) expect(number).toMatch(/\d/)
    }
  })

  it('has sourced legislation records', () => {
    expect(unique(legislation.map((item) => item.id))).toBe(true)
    for (const item of legislation) {
      expect(item.title.trim()).not.toBe('')
      expect(item.sourceUrl).toMatch(http)
    }
    for (const source of legislationSources) expect(source.href).toMatch(http)
  })

  it('has well-formed election records', () => {
    expect(unique(cityElections.map((election) => String(election.year)))).toBe(true)
    for (const election of cityElections) expect(election.year).toBeGreaterThanOrEqual(2000)
  })
})

describe('documents and projects', () => {
  it('has valid budget and procurement document links', () => {
    for (const doc of budgetDocs) expect(doc.url).toMatch(http)
    for (const result of bidResults) {
      expect(isDate(result.date)).toBe(true)
      expect(result.url).toMatch(http)
    }
    for (const bulletin of bidBulletins) expect(bulletin.url).toMatch(http)
  })

  it('has unique, plausible DPWH project records', () => {
    expect(unique(dpwhProjects.map((project) => project.contractId))).toBe(true)
    for (const project of dpwhProjects) {
      expect(project.title.trim()).not.toBe('')
      expect(project.budget).toBeGreaterThanOrEqual(0)
      expect(project.progress).toBeGreaterThanOrEqual(0)
      expect(project.progress).toBeLessThanOrEqual(100)
    }
  })

  it('has a well-formed open data catalog', () => {
    expect(openDataSources.length).toBeGreaterThan(0)
    expect(unique(openDataSources.map((source) => source.id))).toBe(true)
    for (const source of openDataSources) {
      expect(source.href).toMatch(http)
      if (source.resourceHref) expect(source.resourceHref).toMatch(http)
      if (source.group === 'integrated') expect(source.localHref?.startsWith('/')).toBe(true)
    }
  })

  it('has valid sources and FAQ entries', () => {
    for (const source of sources) expect(source.url).toMatch(http)
    expect(faqs.length).toBeGreaterThan(0)
    for (const faq of faqs) {
      expect(faq.q.trim()).not.toBe('')
      expect(faq.a.trim()).not.toBe('')
      expect(faq.link.startsWith('/') || http.test(faq.link)).toBe(true)
    }
  })
})

describe('route metadata', () => {
  it('covers every static and data-driven route exactly once', () => {
    const pages = buildRouteMetadata()
    expect(unique(pages.map((page) => page.path))).toBe(true)
    expect(pages.some((page) => page.path === '/search' || page.path.startsWith('/news'))).toBe(false)
    expect(pages).toHaveLength(25 + categories.length + services.length + offices.length + barangays.length)
    expect(pages.some((page) => page.path === '/town')).toBe(true)
    expect(pages.some((page) => page.path.startsWith('/city'))).toBe(false)
  })

  it('builds Next.js metadata and static params from the route list', () => {
    const meta = pageMetadata('/about')
    expect(meta.title).toEqual({ absolute: 'About this project | BetterCorella' })
    expect(meta.alternates?.canonical).toBe('/about')
    expect(meta.openGraph?.url).toBe('/about')
    expect(pageMetadata('/does-not-exist')).toEqual({})

    expect(paramsFor('/services/[category]')).toHaveLength(categories.length)
    expect(paramsFor('/services/[category]/[slug]')).toHaveLength(services.length)
  })
})

describe('data freshness', () => {
  it('marks empty datasets as pending and verified ones as current', () => {
    const report = getDataFreshness(new Date('2026-11-14T00:00:00Z'))
    for (const row of report) {
      if (row.recordCount === 0) expect(row.status).toBe('pending')
    }
    expect(report.find((row) => row.dataset === 'Emergency hotlines')?.status).toBe('current')
    expect(formatDataFreshnessReport(new Date('2026-11-14T00:00:00Z'))).toContain('Manual data freshness')
  })
})
