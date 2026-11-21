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
  '/barangays',
  '/government/legislation',
  '/town',
  '/town/life',
  '/town/places',
  '/town/business',
  '/transparency',
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
  test('header has the hotline bar and an About link', async ({ page, isMobile }) => {
    await page.goto('/')
    await expect(page.locator('a[href="tel:911"]').first()).toBeVisible()
    if (!isMobile) {
      await page.getByRole('banner').getByRole('link', { name: 'About', exact: true }).click()
      await expect(page).toHaveURL(/\/about$/)
    }
  })

  test('global search and news are removed', async ({ request }) => {
    for (const path of ['/search', '/news']) {
      const response = await request.get(path)
      expect(response.status(), path).toBe(404)
    }
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

  test('old /government/barangays URLs redirect to /barangays', async ({ page }) => {
    await page.goto('/government/barangays/poblacion')
    await expect(page).toHaveURL(/\/barangays\/poblacion$/)
    await expect(page.getByRole('navigation', { name: 'Breadcrumb' })).not.toContainText('Government')
  })

  test('old transparency sub-pages redirect to the one transparency page', async ({ page }) => {
    for (const path of ['/transparency/budget', '/transparency/procurement', '/transparency/projects', '/transparency/open-data']) {
      await page.goto(path)
      await expect(page).toHaveURL(/\/transparency$/)
    }
  })

  test('budget page lists national budget lines naming Corella, with detail pages', async ({ page }) => {
    // Keep the test on the committed snapshot, independent of the live API.
    await page.route('https://budget.bettergov.ph/**', (route) => route.abort())
    await page.goto('/transparency')
    const table = page.getByRole('region', { name: 'FY2027 budget lines for Corella' })
    await expect(table.getByRole('row').nth(1)).toBeVisible()
    const gaa = page.getByRole('region', { name: 'GAA 2020 to 2026 lines naming Corella' })
    await expect(gaa).toBeVisible()
    await expect(table).not.toContainText(/New Corella|Davao/)
    await expect(gaa).not.toContainText(/New Corella|Davao/)

    await table.getByRole('link').first().click()
    await expect(page).toHaveURL(/\/transparency\/budget\/[a-z]+\/[a-z0-9-]+$/, { timeout: 20_000 })
    await expect(page.getByRole('heading', { name: 'Amount in each version, with the page it is on' })).toBeVisible()
  })

  test('government pages list Corella officials and barangays', async ({ page }) => {
    await page.goto('/government/officials')
    await expect(page.getByText('Juan Manuel Y. Lim').first()).toBeVisible()
    await page.goto('/barangays/cancatac')
    await expect(page.getByRole('heading', { level: 1, name: 'Cancatac' })).toBeVisible()
    await expect(page.getByText('Apolio C. Lumactud').first()).toBeVisible()
  })

  test('about page lists the source and date of every dataset', async ({ page }) => {
    await page.goto('/about#data-sources')
    await expect(page.getByRole('heading', { name: 'Which source each section uses' })).toBeVisible()
    await expect(page.locator('#data-sources').getByText('Emergency hotlines')).toBeVisible()
  })

  test('government page lists national agencies and office pages name their heads', async ({ page }) => {
    await page.goto('/government')
    await expect(page.getByRole('heading', { name: 'National agencies in Corella' })).toBeVisible()
    await expect(page.getByText('Josie M. Montes')).toBeVisible()
    await page.goto('/government/offices/treasurers-office')
    await expect(page.getByText('Reynaldo D. Salang').first()).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Office staff' })).toBeVisible()
  })

  test('barangay pages show the name origin and the full council', async ({ page }) => {
    await page.goto('/barangays/anislag')
    await expect(page.getByRole('heading', { name: 'How Anislag got its name' })).toBeVisible()
    await expect(page.getByText('Dexter M. Curayag').first()).toBeVisible()
    await expect(page.getByText('Janice S. Inte')).toBeVisible()
  })

  test('services come from the Corella Citizen\'s Charter', async ({ page }) => {
    await page.goto('/services/business/bplo-service-issuance-of-business-permits-licenses-for-new')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Business Permits')
    await expect(page.getByText('Available online').first()).toBeVisible()
    await expect(page.getByText(/Citizen's Charter 2026/).first()).toBeVisible()
  })

  test('town and contact pages embed a titled map', async ({ page }) => {
    await page.goto('/town')
    await expect(page.locator('iframe[title^="Map of"]')).toHaveCount(1)
    await page.goto('/contact')
    await expect(page.locator('iframe[title*="Municipal Hall"]')).toHaveCount(1)
  })

  test('contacts page lists the hotlines, led by 911', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.getByRole('link', { name: '911' }).first()).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Corella Police Station (PNP)' })).toBeVisible()
  })

  test('old /government/hotlines URL redirects to the contacts page', async ({ page }) => {
    await page.goto('/government/hotlines')
    await expect(page).toHaveURL(/\/contact#hotlines$/)
  })
})

test.describe('Theme', () => {
  test('dark mode toggle applies and persists across reloads', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await page.goto('/')
    const html = page.locator('html')
    const toggle = page.getByRole('button', { name: 'Dark mode' })

    await expect(html).not.toHaveClass(/\bdark\b/)
    await expect(toggle).toHaveAttribute('aria-pressed', 'false')

    await toggle.click()
    await expect(html).toHaveClass(/\bdark\b/)
    await expect(toggle).toHaveAttribute('aria-pressed', 'true')

    await page.reload()
    await expect(html).toHaveClass(/\bdark\b/)

    await page.getByRole('button', { name: 'Dark mode' }).click()
    await expect(html).not.toHaveClass(/\bdark\b/)
  })

  test('follows the OS setting when no theme is saved', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')
    await expect(page.locator('html')).toHaveClass(/\bdark\b/)
    await expect(page.getByRole('button', { name: 'Dark mode' })).toHaveAttribute('aria-pressed', 'true')
  })
})
