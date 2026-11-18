import { expect, test } from '@playwright/test'

// /api/weather is mocked, so these tests need no OpenWeather key or network.
const weather = {
  tempC: 28.6,
  feelsLikeC: 33.1,
  tempMinC: 27.9,
  tempMaxC: 29.4,
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
  observedAt: '2026-11-18T02:00:00.000Z',
  sunrise: '2026-11-17T21:50:00.000Z',
  sunset: '2026-11-18T09:25:00.000Z',
}

test.describe('Home weather', () => {
  test('shows current conditions in the hero and the weather section', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))
    await page.route('**/api/weather', (route) => route.fulfill({ json: weather }))

    await page.goto('/')

    const hero = page.getByRole('link', { name: /Weather now · light rain/i })
    await expect(hero).toBeVisible()
    await expect(hero).toContainText('29°C')

    const section = page.getByRole('region', { name: /^Weather in / })
    await expect(section).toBeVisible()
    await expect(section.getByText('Humidity')).toBeVisible()
    await expect(section.getByText('78%')).toBeVisible()
    await expect(section.getByText('2.6 m/s E')).toBeVisible()
    await expect(section.getByRole('link', { name: 'OpenWeather' })).toHaveAttribute(
      'href',
      'https://openweathermap.org/',
    )

    expect(errors).toEqual([])
  })

  test('hides weather when the API is unavailable', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))
    await page.route('**/api/weather', (route) =>
      route.fulfill({ status: 503, json: { error: 'not-configured' } }),
    )

    await page.goto('/')

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByRole('region', { name: /^Weather in / })).toHaveCount(0)
    await expect(page.getByRole('link', { name: /Weather now/i })).toHaveCount(0)
    expect(errors).toEqual([])
  })
})
