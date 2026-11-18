/** Current conditions, trimmed from the OpenWeather Current Weather API (free tier). Times are ISO strings. */
export interface WeatherNow {
  tempC: number
  feelsLikeC: number
  tempMinC: number
  tempMaxC: number
  humidity: number
  pressureHpa: number
  windMs: number
  windDeg: number | null
  cloudiness: number
  visibilityM: number | null
  rain1hMm: number | null
  condition: string
  description: string
  iconCode: string
  isDay: boolean
  observedAt: string
  sunrise: string
  sunset: string
}

/** The subset of the OpenWeather `/data/2.5/weather` response we read. */
export interface OpenWeatherCurrent {
  weather: Array<{ main: string; description: string; icon: string }>
  main: { temp: number; feels_like: number; temp_min: number; temp_max: number; pressure: number; humidity: number }
  visibility?: number
  wind?: { speed: number; deg?: number }
  clouds?: { all: number }
  rain?: { '1h'?: number }
  dt: number
  sys: { sunrise: number; sunset: number }
}
