import { ExternalLink } from 'lucide-react'

interface MapEmbedProps {
  /** Accessible title for the iframe, e.g. "Map of Corella, Bohol". */
  title: string
  /** What Google Maps should show: a place name or "lat,lng". */
  query: string
  /** Zoom level (Google Maps `z`); omit to let Maps choose. */
  zoom?: number
  className?: string
}

/** A lazy Google Maps embed (no API key) with an "Open in Google Maps" link as a fallback. */
export function MapEmbed({ title, query, zoom, className = '' }: MapEmbedProps) {
  const q = encodeURIComponent(query)
  const src = `https://www.google.com/maps?q=${q}${zoom ? `&z=${zoom}` : ''}&output=embed`
  const href = `https://www.google.com/maps/search/?api=1&query=${q}`
  return (
    <figure className={className}>
      <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface shadow-card sm:aspect-[16/9]">
        <iframe
          title={title}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="size-full border-0"
        />
      </div>
      <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-ink-500">
        <span>Map data © Google. Boundaries are approximate.</span>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:text-brand-800"
        >
          Open in Google Maps
          <ExternalLink aria-hidden="true" className="size-3.5" />
        </a>
      </figcaption>
    </figure>
  )
}
