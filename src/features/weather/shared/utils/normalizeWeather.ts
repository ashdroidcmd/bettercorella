import type { OpenWeatherCurrent, WeatherNow } from '../types/weather.ts'

const iso = (unixSeconds: number) => new Date(unixSeconds * 1000).toISOString()
const round1 = (value: number) => Math.round(value * 10) / 10

export function normalizeWeather(raw: OpenWeatherCurrent): WeatherNow {
  const current = raw.weather[0]
  if (!current || !raw.main) throw new Error('Unexpected OpenWeather response')

  return {
    tempC: round1(raw.main.temp),
    feelsLikeC: round1(raw.main.feels_like),
    tempMinC: round1(raw.main.temp_min),
    tempMaxC: round1(raw.main.temp_max),
    humidity: raw.main.humidity,
    pressureHpa: raw.main.pressure,
    windMs: round1(raw.wind?.speed ?? 0),
    windDeg: raw.wind?.deg ?? null,
    cloudiness: raw.clouds?.all ?? 0,
    visibilityM: raw.visibility ?? null,
    rain1hMm: raw.rain?.['1h'] ?? null,
    condition: current.main,
    description: current.description,
    iconCode: current.icon,
    isDay: current.icon.endsWith('d'),
    observedAt: iso(raw.dt),
    sunrise: iso(raw.sys.sunrise),
    sunset: iso(raw.sys.sunset),
  }
}

const COMPASS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']

export function compassDirection(deg: number) {
  return COMPASS[Math.round((((deg % 360) + 360) % 360) / 45) % 8]
}

/** Time of day in Corella (Asia/Manila), e.g. "5:42 AM". */
export function formatLocalTime(value: string) {
  return new Intl.DateTimeFormat('en-PH', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Manila' }).format(
    new Date(value),
  )
}
