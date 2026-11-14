import { barangays } from '../../features/government/shared/data/barangays.ts'
import { categories } from '../../features/services/shared/data/categories.ts'
import { city } from '../../config/city.ts'
import { faqs } from '../../features/info/faq-page/data/faqs.ts'
import { news } from '../../features/news/shared/data/news.ts'
import { offices } from '../../features/government/shared/data/offices.ts'
import { services } from '../../features/services/shared/data/services.ts'
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL as DEFAULT_ORIGIN } from '../../config/site.ts'

export interface RouteMetadata {
  path: string
  title: string
  description: string
  image?: string
  type?: 'website' | 'article'
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>
  lastmod?: string | undefined
  priority?: number
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
}

/** "Corella, Bohol" */
const PLACE = `${city.name}, ${city.province}`
/** "Municipal Government of Corella, Bohol" */
const LGU = `Municipal Government of ${PLACE}`

function makeBreadcrumbs(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${DEFAULT_ORIGIN}${item.path}`,
    })),
  }
}

/** The LGU as a schema.org organization, including only verified contact fields. */
function lguOrganization() {
  return {
    '@type': 'GovernmentOrganization',
    name: LGU,
    ...(city.website ? { url: city.website } : {}),
  }
}

function homeJsonLd() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      alternateName: SITE_TITLE,
      url: DEFAULT_ORIGIN,
      description: SITE_DESCRIPTION,
      inLanguage: 'en',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${DEFAULT_ORIGIN}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'AdministrativeArea',
      name: PLACE,
      alternateName: city.officialName,
      containedInPlace: { '@type': 'AdministrativeArea', name: `Province of ${city.province}` },
      ...(city.website ? { url: city.website } : {}),
      ...(city.trunkline ? { telephone: city.trunkline } : {}),
      ...(city.coordinates
        ? { geo: { '@type': 'GeoCoordinates', latitude: city.coordinates.lat, longitude: city.coordinates.lng } }
        : {}),
    },
  ]
}

const home = { name: 'Home', path: '/' }
const government = { name: 'Municipal Government', path: '/government' }
const town = { name: 'Town Profile', path: '/town' }
const transparency = { name: 'Transparency', path: '/transparency' }

const staticRoutes: RouteMetadata[] = [
  {
    path: '/',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    priority: 1.0,
    changefreq: 'daily',
    jsonLd: homeJsonLd(),
  },
  {
    path: '/services',
    title: 'Municipal services',
    description: `Municipal services of ${PLACE}, grouped by category, with requirements, fees and official forms from the Citizen's Charter as they are verified.`,
    priority: 0.9,
    changefreq: 'weekly',
    jsonLd: makeBreadcrumbs([home, { name: 'Services', path: '/services' }]),
  },
  {
    path: '/government',
    title: 'Municipal government',
    description: `Elected officials, municipal offices, barangays, legislation and emergency hotlines of ${PLACE}.`,
    priority: 0.9,
    changefreq: 'weekly',
    jsonLd: makeBreadcrumbs([home, government]),
  },
  {
    path: '/government/officials',
    title: 'Municipal officials',
    description: `The mayor, vice mayor and Sangguniang Bayan of ${PLACE}, listed once verified against official sources.`,
    priority: 0.8,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([home, government, { name: 'Officials', path: '/government/officials' }]),
  },
  {
    path: '/government/offices',
    title: 'Municipal offices',
    description: `Municipal offices and departments of ${PLACE}, with contacts and the services they handle.`,
    priority: 0.8,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([home, government, { name: 'Offices', path: '/government/offices' }]),
  },
  {
    path: '/government/barangays',
    title: 'Barangays',
    description: `The barangays of ${PLACE}, with PSA population figures and elected barangay officials as they are verified.`,
    priority: 0.8,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([home, government, { name: 'Barangays', path: '/government/barangays' }]),
  },
  {
    path: '/government/hotlines',
    title: 'Emergency hotlines',
    description: `Emergency hotlines for ${PLACE}: the national 911 line now, with local MDRRMO, police, fire and health contacts once verified.`,
    priority: 0.8,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([home, government, { name: 'Emergency Hotlines', path: '/government/hotlines' }]),
  },
  {
    path: '/government/legislation',
    title: 'Ordinances and executive orders',
    description: `Ordinances, resolutions and executive orders of ${PLACE}, with links to official copies.`,
    priority: 0.8,
    changefreq: 'weekly',
    jsonLd: makeBreadcrumbs([home, government, { name: 'Legislation', path: '/government/legislation' }]),
  },
  {
    path: '/town',
    title: 'Town profile',
    description: `Profile of ${PLACE}: location, population, history and local context from official sources.`,
    priority: 0.8,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([home, town]),
  },
  {
    path: '/town/life',
    title: 'Life and tourism',
    description: `Culture, festivals and things to do in ${PLACE}.`,
    priority: 0.7,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([home, town, { name: 'Life & Tourism', path: '/town/life' }]),
  },
  {
    path: '/town/places',
    title: 'Places directory',
    description: `Government offices, health facilities, schools and other places in ${PLACE}.`,
    priority: 0.7,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([home, town, { name: 'Places Directory', path: '/town/places' }]),
  },
  {
    path: '/town/business',
    title: 'Business and investment',
    description: `Starting and running a business in ${PLACE}: permits, guidance and national business portals.`,
    priority: 0.7,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([home, town, { name: 'Business & Investment', path: '/town/business' }]),
  },
  {
    path: '/online-services',
    title: 'Online services',
    description: 'National e-government portals available to every resident, from eGov PH to PhilJobNet and PhilGEPS.',
    priority: 0.8,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([home, { name: 'Online Services', path: '/online-services' }]),
  },
  {
    path: '/transparency',
    title: 'Transparency',
    description: `Budget, procurement, infrastructure projects and open data for ${PLACE}, linked to official sources.`,
    priority: 0.8,
    changefreq: 'weekly',
    jsonLd: makeBreadcrumbs([home, transparency]),
  },
  {
    path: '/transparency/budget',
    title: 'Budget and spending',
    description: `Where ${PLACE}'s public money comes from and how it is spent, based on BLGF and Full Disclosure Policy records.`,
    priority: 0.7,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([home, transparency, { name: 'Budget & Spending', path: '/transparency/budget' }]),
  },
  {
    path: '/transparency/procurement',
    title: 'Procurement and bids',
    description: `Bids, awards and contracts of ${PLACE}, based on PhilGEPS and official procurement records.`,
    priority: 0.7,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([home, transparency, { name: 'Procurement', path: '/transparency/procurement' }]),
  },
  {
    path: '/transparency/projects',
    title: 'Infrastructure projects',
    description: `Public works projects in ${PLACE}, based on DPWH and municipal records.`,
    priority: 0.7,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([home, transparency, { name: 'Projects', path: '/transparency/projects' }]),
  },
  {
    path: '/transparency/open-data',
    title: 'Open data',
    description: 'National open datasets covering local governments: fiscal data, boundaries, elections, public works, procurement and hazard maps.',
    priority: 0.6,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([home, transparency, { name: 'Open Data', path: '/transparency/open-data' }]),
  },
  {
    path: '/news',
    title: 'News',
    description: `Announcements and advisories for ${PLACE}, each linked to its official source.`,
    priority: 0.8,
    changefreq: 'weekly',
    jsonLd: makeBreadcrumbs([home, { name: 'News', path: '/news' }]),
  },
  {
    path: '/news/archive',
    title: 'News archive',
    description: `All news items tracked by ${SITE_NAME}, with links to the official source.`,
    priority: 0.7,
    changefreq: 'weekly',
    jsonLd: makeBreadcrumbs([home, { name: 'News', path: '/news' }, { name: 'Archive', path: '/news/archive' }]),
  },
  {
    path: '/about',
    title: 'About this project',
    description: `${SITE_NAME} is an independent civic guide to municipal services, officials, barangays, budgets and public records in ${PLACE}.`,
    priority: 0.5,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([home, { name: 'About', path: '/about' }]),
  },
  {
    path: '/contact',
    title: 'Contact and sources',
    description: `How to reach ${SITE_NAME}, and official channels of ${PLACE} as they are verified.`,
    priority: 0.5,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([home, { name: 'Contact', path: '/contact' }]),
  },
  {
    path: '/faq',
    title: 'Frequently asked questions',
    description: `Quick answers about ${SITE_NAME}, emergencies, online services and how to help.`,
    priority: 0.7,
    changefreq: 'monthly',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
      makeBreadcrumbs([home, { name: 'FAQ', path: '/faq' }]),
    ],
  },
  {
    path: '/search',
    title: 'Search',
    description: 'Find a municipal service, an office, a barangay or a page across the guide.',
    priority: 0.5,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([home, { name: 'Search', path: '/search' }]),
  },
  {
    path: '/sitemap',
    title: 'Sitemap',
    description: `Every section of ${SITE_NAME}: services, government, town guide, transparency, news and site information.`,
    priority: 0.5,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([home, { name: 'Sitemap', path: '/sitemap' }]),
  },
  {
    path: '/accessibility',
    title: 'Accessibility',
    description: `How ${SITE_NAME} approaches keyboard access, screen readers, reduced motion, contrast and accessible public documents.`,
    priority: 0.5,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([home, { name: 'Accessibility', path: '/accessibility' }]),
  },
  {
    path: '/privacy',
    title: 'Privacy',
    description: `Privacy practices for ${SITE_NAME}: no accounts, no advertising, and local-only search.`,
    priority: 0.5,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([home, { name: 'Privacy', path: '/privacy' }]),
  },
  {
    path: '/terms',
    title: 'Terms of use',
    description: `Terms for using ${SITE_NAME}, an independent civic guide that is not the official municipal website.`,
    priority: 0.5,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([home, { name: 'Terms of Use', path: '/terms' }]),
  },
]

export function buildRouteMetadata(): RouteMetadata[] {
  const categoryName = new Map(categories.map((c) => [c.slug, c.name]))

  const categoryRoutes: RouteMetadata[] = categories.map((category) => ({
    path: `/services/${category.slug}`,
    title: category.name,
    description: category.description,
    priority: 0.8,
    changefreq: 'weekly',
    jsonLd: makeBreadcrumbs([
      home,
      { name: 'Services', path: '/services' },
      { name: category.name, path: `/services/${category.slug}` },
    ]),
  }))

  const serviceRoutes: RouteMetadata[] = services.map((service) => {
    const catName = categoryName.get(service.category) ?? service.category
    return {
      path: `/services/${service.category}/${service.slug}`,
      title: service.title,
      description: service.summary,
      lastmod: service.lastVerified,
      priority: 0.7,
      changefreq: 'monthly',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'GovernmentService',
          name: service.title,
          description: service.summary,
          serviceType: catName,
          url: `${DEFAULT_ORIGIN}/services/${service.category}/${service.slug}`,
          provider: {
            '@type': 'GovernmentOrganization',
            name: service.office,
            parentOrganization: lguOrganization(),
          },
          areaServed: { '@type': 'AdministrativeArea', name: PLACE },
        },
        makeBreadcrumbs([
          home,
          { name: 'Services', path: '/services' },
          { name: catName, path: `/services/${service.category}` },
          { name: service.title, path: `/services/${service.category}/${service.slug}` },
        ]),
      ],
    }
  })

  const officeRoutes: RouteMetadata[] = offices.map((office) => ({
    path: `/government/offices/${office.slug}`,
    title: office.name,
    description: `Contact details, location, and ${services.filter((service) => service.officeCode === office.code).length} municipal services handled by the ${office.name} in ${PLACE}.`,
    priority: 0.7,
    changefreq: 'monthly',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'GovernmentOffice',
        name: office.name,
        url: `${DEFAULT_ORIGIN}/government/offices/${office.slug}`,
        address: office.address,
        telephone: office.contact,
        parentOrganization: lguOrganization(),
      },
      makeBreadcrumbs([
        home,
        government,
        { name: 'Offices', path: '/government/offices' },
        { name: office.name, path: `/government/offices/${office.slug}` },
      ]),
    ],
  }))

  const barangayRoutes: RouteMetadata[] = barangays.map((barangay) => ({
    path: `/government/barangays/${barangay.slug}`,
    title: barangay.name,
    description: `${barangay.name}, ${city.officialName}: population history and barangay officials.`,
    priority: 0.7,
    changefreq: 'monthly',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'AdministrativeArea',
        name: barangay.name,
        url: `${DEFAULT_ORIGIN}/government/barangays/${barangay.slug}`,
        containedInPlace: { '@type': 'AdministrativeArea', name: PLACE },
      },
      makeBreadcrumbs([
        home,
        government,
        { name: 'Barangays', path: '/government/barangays' },
        { name: barangay.name, path: `/government/barangays/${barangay.slug}` },
      ]),
    ],
  }))

  const newsRoutes: RouteMetadata[] = news.map((item) => ({
    path: `/news/${item.slug}`,
    title: item.title,
    description: item.excerpt,
    image: item.image,
    type: 'article' as const,
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: item.date ? item.date.split('T')[0] : undefined,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: item.title,
        description: item.excerpt,
        image: `${DEFAULT_ORIGIN}${item.image}`,
        datePublished: item.date,
        url: `${DEFAULT_ORIGIN}/news/${item.slug}`,
        author: { '@type': 'Organization', name: LGU },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          logo: { '@type': 'ImageObject', url: `${DEFAULT_ORIGIN}/pwa-512.png` },
        },
      },
      makeBreadcrumbs([home, { name: 'News', path: '/news' }, { name: item.title, path: `/news/${item.slug}` }]),
    ],
  }))

  return [...staticRoutes, ...categoryRoutes, ...serviceRoutes, ...officeRoutes, ...barangayRoutes, ...newsRoutes]
}
