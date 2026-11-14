import { getRoute } from '../../lib/seo/metadata'

/** Server component: renders the route's structured data (schema.org JSON-LD) into the HTML. */
export function RouteJsonLd({ path }: { path: string }) {
  const jsonLd = getRoute(path)?.jsonLd
  if (!jsonLd) return null
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here once "<" is escaped, which prevents </script> injection.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
    />
  )
}
