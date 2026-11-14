import { expect, test } from '@playwright/test'

/**
 * Smoke test: every top-level section renders the shared layout with no
 * uncaught errors. Keep assertions brand-neutral except in the branding block.
 */
const PAGES = [
  '/',
  '/services',
  '/online-services',
  '/government',
  '/government/officials',
  '/government/offices',
  '/government/barangays',
  '/government/hotlines',
  '/government/legislation',
  '/town',
  '/town/life',
  '/town/places',
  '/town/business',
  '/transparency',
  '/transparency/budget',
  '/transparency/procurement',
  '/transparency/projects',
  '/transparency/open-data',
  '/news',
  '/about',
  '/contact',
  '/faq',
]

test.describe('Smoke — main pages', () => {
  for (const path of PAGES) {
    test(`${path} renders layout without errors`, async ({ page }) => {
      const errors: string[] = []
      page.on('pageerror', (err) => errors.push(err.message))

      const response = await page.goto(path)
      expect(response?.status(), `HTTP status for ${path}`).toBe(200)

      await expect(page.locator('header').first()).toBeVisible()
      await expect(page.locator('main').first()).toBeVisible()
      await expect(page.locator('footer').first()).toBeAttached()
      await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible()

      expect(errors, `uncaught JS errors on ${path}`).toEqual([])
    })
  }

  test('unknown route shows the not-found page', async ({ page }) => {
    await page.goto('/this-page-does-not-exist')
    await expect(page.locator('main').first()).toBeVisible()
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible()
  })
})

test.describe('Navigation', () => {
  test('Ctrl+K opens the command palette', async ({ page, isMobile }) => {
    test.skip(isMobile, 'keyboard shortcut is desktop-only')
    await page.goto('/')
    await page.keyboard.press('Control+k')
    await expect(page.getByRole('dialog')).toBeVisible()
  })
})

test.describe('Server-rendered HTML (SEO)', () => {
  test('page content and metadata are in the HTML before JavaScript runs', async ({ request }) => {
    const response = await request.get('/government/officials')
    expect(response.status()).toBe(200)
    const html = await response.text()

    expect(html).toMatch(/<h1[^>]*>[^<]+/)
    expect(html).toMatch(/<title>[^<]+<\/title>/)
    expect(html).toContain('rel="canonical"')
    expect(html).toContain('property="og:title"')
  })

  test('sitemap.xml and robots.txt are served', async ({ request }) => {
    const sitemap = await request.get('/sitemap.xml')
    expect(sitemap.status()).toBe(200)
    expect(await sitemap.text()).toContain('<urlset')

    const robots = await request.get('/robots.txt')
    expect(robots.status()).toBe(200)
    expect(await robots.text()).toContain('Sitemap:')
  })

  test('unknown routes return HTTP 404', async ({ request }) => {
    const response = await request.get('/this-page-does-not-exist')
    expect(response.status()).toBe(404)
  })
})

test.describe('Corella rebrand', () => {
  test('home page and metadata say BetterCorella', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/BetterCorella/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Corella')
    const html = await page.content()
    expect(html).not.toMatch(/inabanga|san fernando/i)
  })

  test('old /city URLs redirect to /town', async ({ page }) => {
    await page.goto('/city/places')
    await expect(page).toHaveURL(/\/town\/places$/)
    await page.goto('/city')
    await expect(page).toHaveURL(/\/town$/)
  })

  test('sections without verified data show the coming-soon notice', async ({ page }) => {
    for (const path of ['/government/officials', '/transparency/budget', '/news']) {
      await page.goto(path)
      await expect(page.getByRole('heading', { name: 'Information coming soon' })).toBeVisible()
    }
  })

  test('hotlines list the national 911 line', async ({ page }) => {
    await page.goto('/government/hotlines')
    await expect(page.getByRole('link', { name: '911' }).first()).toBeVisible()
  })
})
