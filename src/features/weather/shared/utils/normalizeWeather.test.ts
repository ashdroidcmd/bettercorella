import { describe, expect, it } from 'vitest'
import { compassDirection, formatLocalTime, normalizeWeather } from './normalizeWeather.ts'
import { sampleOpenWeather as sample } from './sampleWeather.fixture.ts'
import { weatherIcon } from './weatherIcon.ts'

describe('normalizeWeather', () => {
  it('maps the OpenWeather response to WeatherNow', () => {
    expect(normalizeWeather(sample)).toEqual({
      tempC: 28.6,
      feelsLikeC: 33.1,
      tempMinC: 28.6,
      tempMaxC: 28.6,
      humidity: 78,
      pressureHpa: 1009,
      windMs: 2.6,
      windDeg: 110,
      cloudiness: 75,
      visibilityM: 10000,
      rain1hMm: 0.42,
      condition: 'Rain',
      description: 'light rain',
      iconCode: '10d',
      isDay: true,
      observedAt: new Date(1795000000 * 1000).toISOString(),
      sunrise: new Date(1794960000 * 1000).toISOString(),
      sunset: new Date(1795002000 * 1000).toISOString(),
    })
  })

  it('handles missing optional blocks and night icons', () => {
    const { rain: _rain, wind: _wind, visibility: _visibility, ...rest } = sample
    const result = normalizeWeather({ ...rest, weather: [{ main: 'Clear', description: 'clear sky', icon: '01n' }] })
    expect(result.rain1hMm).toBeNull()
    expect(result.windMs).toBe(0)
    expect(result.windDeg).toBeNull()
    expect(result.visibilityM).toBeNull()
    expect(result.isDay).toBe(false)
  })

  it('rejects a response without conditions', () => {
    expect(() => normalizeWeather({ ...sample, weather: [] })).toThrow()
  })
})

describe('weather helpers', () => {
  it('gives compass directions', () => {
    expect(compassDirection(0)).toBe('N')
    expect(compassDirection(110)).toBe('E')
    expect(compassDirection(350)).toBe('N')
    expect(compassDirection(225)).toBe('SW')
  })

  it('formats times in Asia/Manila', () => {
    expect(formatLocalTime('2026-11-18T00:00:00.000Z')).toMatch(/^8:00\s?(AM|am)$/)
  })

  it('picks day and night icons', () => {
    expect(weatherIcon('01d')).not.toBe(weatherIcon('01n'))
    expect(weatherIcon('99x')).toBe(weatherIcon('03d'))
  })
})
