import type { MetadataRoute } from 'next'
import { buildRouteMetadata } from '@/lib/seo/routeMetadata'
import { SITE_URL } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split('T')[0]

  return buildRouteMetadata().map((page) => {
    const depth = page.path.split('/').length
    return {
      url: new URL(page.path, SITE_URL).toString(),
      lastModified: page.lastmod ?? today,
      changeFrequency: page.changefreq ?? (page.path === '/' ? 'daily' : page.path.startsWith('/news') ? 'weekly' : 'monthly'),
      priority: page.priority ?? (page.path === '/' ? 1 : depth === 2 ? 0.8 : 0.6),
    }
  })
}
