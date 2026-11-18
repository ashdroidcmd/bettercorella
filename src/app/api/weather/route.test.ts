import { afterEach, describe, expect, it, vi } from 'vitest'
import { sampleOpenWeather as sample } from '@/features/weather/shared/utils/sampleWeather.fixture'
import { GET } from './route'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('GET /api/weather', () => {
  it('returns 503 when no API key is set', async () => {
    vi.stubEnv('OPENWEATHER_API_KEY', '')
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const res = await GET()
    expect(res.status).toBe(503)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('returns 502 when OpenWeather fails, without leaking the key', async () => {
    vi.stubEnv('OPENWEATHER_API_KEY', 'secret-key')
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{"cod":401}', { status: 401 })))

    const res = await GET()
    expect(res.status).toBe(502)
    expect(await res.text()).not.toContain('secret-key')
  })

  it('returns normalized, cacheable weather for the town', async () => {
    vi.stubEnv('OPENWEATHER_API_KEY', 'secret-key')
    const fetchMock = vi.fn().mockResolvedValue(Response.json(sample))
    vi.stubGlobal('fetch', fetchMock)

    const res = await GET()
    expect(res.status).toBe(200)
    expect(res.headers.get('Cache-Control')).toContain('s-maxage=600')

    const body = await res.json()
    expect(body).toMatchObject({ tempC: 28.6, description: 'light rain', iconCode: '10d' })
    expect(JSON.stringify(body)).not.toContain('secret-key')

    const url = new URL(String(fetchMock.mock.calls[0]?.[0]))
    expect(url.origin + url.pathname).toBe('https://api.openweathermap.org/data/2.5/weather')
    expect(url.searchParams.get('lat')).toBe('9.687')
    expect(url.searchParams.get('lon')).toBe('123.9214')
    expect(url.searchParams.get('units')).toBe('metric')
  })
})
