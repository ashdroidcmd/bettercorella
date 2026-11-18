import type { OpenWeatherCurrent } from '../types/weather.ts'

// Shape of a real /data/2.5/weather response (units=metric), trimmed.
export const sampleOpenWeather: OpenWeatherCurrent & Record<string, unknown> = {
  coord: { lon: 123.9214, lat: 9.687 },
  weather: [{ main: 'Rain', description: 'light rain', icon: '10d' }],
  base: 'stations',
  main: { temp: 28.64, feels_like: 33.1, temp_min: 28.64, temp_max: 28.64, pressure: 1009, humidity: 78 },
  visibility: 10000,
  wind: { speed: 2.57, deg: 110 },
  rain: { '1h': 0.42 },
  clouds: { all: 75 },
  dt: 1795000000,
  sys: { sunrise: 1794960000, sunset: 1795002000 },
  timezone: 28800,
  name: 'Corella',
}
