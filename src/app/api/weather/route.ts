// Current weather for the town, from the OpenWeather Current Weather API (free tier).
// The key stays on the server; responses are cached so all visitors share a few upstream calls per hour.
import { city } from '@/config/city'
import type { OpenWeatherCurrent } from '@/features/weather/shared/types/weather'
import { normalizeWeather } from '@/features/weather/shared/utils/normalizeWeather'

const ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather'
const CACHE_SECONDS = 600

export async function GET() {
  const key = process.env.OPENWEATHER_API_KEY
  if (!key || !city.coordinates) {
    return Response.json({ error: 'not-configured' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
  }

  const url = new URL(ENDPOINT)
  url.searchParams.set('lat', String(city.coordinates.lat))
  url.searchParams.set('lon', String(city.coordinates.lng))
  url.searchParams.set('units', 'metric')
  url.searchParams.set('appid', key)

  try {
    const res = await fetch(url, { next: { revalidate: CACHE_SECONDS } })
    if (!res.ok) throw new Error(`OpenWeather ${res.status}`)
    const data = normalizeWeather((await res.json()) as OpenWeatherCurrent)
    return Response.json(data, {
      headers: { 'Cache-Control': `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS * 2}` },
    })
  } catch {
    return Response.json({ error: 'upstream' }, { status: 502, headers: { 'Cache-Control': 'no-store' } })
  }
}
