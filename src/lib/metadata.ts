import type { Metadata } from 'next'
import { buildRouteMetadata, type RouteMetadata } from '../data/routeMetadata'
import { SITE_NAME, SITE_TITLE } from './site'

const routes = new Map(buildRouteMetadata().map((route) => [route.path, route]))

export function getRoute(path: string): RouteMetadata | undefined {
  return routes.get(path)
}

/** Next.js metadata (title, description, canonical, Open Graph, Twitter) for a prerendered path. */
export function pageMetadata(path: string): Metadata {
  const page = routes.get(path)
  if (!page) return {}

  const title = path === '/' ? page.title : `${page.title} | ${SITE_NAME}`
  const image = page.image ?? '/og.png'

  return {
    title: { absolute: title },
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description: page.description,
      url: path,
      type: page.type ?? 'website',
      siteName: SITE_TITLE,
      locale: 'en_PH',
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: page.description,
      images: [{ url: image, alt: title }],
    },
  }
}

/**
 * Lists the params of every prerendered path matching a route pattern,
 * e.g. paramsFor('/services/[category]/[slug]') -> [{ category, slug }, ...].
 * Reusing the sitemap's route list keeps static pages and sitemap in sync.
 */
export function paramsFor(pattern: string): Array<Record<string, string>> {
  const names: string[] = []
  const regex = new RegExp(
    `^${pattern.replace(/\[(\w+)\]/g, (_match, name: string) => {
      names.push(name)
      return '([^/]+)'
    })}$`,
  )
  const params: Array<Record<string, string>> = []
  for (const path of routes.keys()) {
    const match = regex.exec(path)
    if (match) params.push(Object.fromEntries(names.map((name, index) => [name, match[index + 1] ?? ''])))
  }
  return params
}
