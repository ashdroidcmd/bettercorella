import { expect, test, type Page } from '@playwright/test'

function trackErrors(page: Page) {
  const errors: string[] = []
  page.on('pageerror', (err) => errors.push(err.message))
  return errors
}

const LISTING = 'ashdroidcmd — Developer for hire'

test.describe('Business directory', () => {
  test('lists the sample business and opens its details', async ({ page }) => {
    const errors = trackErrors(page)
    await page.goto('/town/business')

    await expect(page.getByRole('heading', { level: 1, name: 'Business and investment' })).toBeVisible()

    const directory = page.locator('#directory')
    await expect(directory.getByRole('heading', { name: LISTING })).toBeVisible()
    const tags = directory.getByRole('list', { name: 'Offers' })
    await expect(tags.getByText('AI and chatbots')).toBeVisible()
    await expect(tags.getByText('+4 more')).toBeVisible()

    await directory.getByRole('button', { name: LISTING }).click()
    const dialog = page.getByRole('dialog', { name: LISTING })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByText('ESP32', { exact: true })).toBeVisible()
    await expect(dialog.getByText('Arduino', { exact: true })).toBeVisible()
    await expect(dialog.getByRole('link', { name: /github\.com\/ashdroidcmd/ })).toHaveAttribute(
      'href',
      'https://github.com/ashdroidcmd',
    )
    await expect(dialog.getByText('Listed by the BetterCorella maintainer.')).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    expect(errors).toEqual([])
  })

  test('shows permit links and no register form while it is hidden', async ({ page }) => {
    await page.goto('/town/business')
    await expect(page.locator('#permits').getByRole('link', { name: /Corella business permit services/ })).toBeVisible()
    await expect(page.locator('#register')).toHaveCount(0)
    await expect(page.getByRole('form', { name: 'Register your business' })).toHaveCount(0)
  })
})

// Re-enable when SHOW_BUSINESS_FORM is true in src/features/town/business-page/BusinessPage.tsx.
test.describe('Register your business form', () => {
  test.skip(true, 'Business form is hidden (SHOW_BUSINESS_FORM = false)')

  test('explains that a listing is not a business permit', async ({ page }) => {
    await page.goto('/town/business')
    const register = page.locator('#register')
    await expect(register.getByText(/It is\s*not\s*a business permit/)).toBeVisible()
    await expect(register.getByRole('link', { name: 'business permit services' }).first()).toHaveAttribute('href', '/services/business')
  })

  test('shows errors for an empty submit, including the contact rule', async ({ page }) => {
    const errors = trackErrors(page)
    let posted = false
    await page.route('**/api/business-listings', (route) => {
      posted = true
      return route.fulfill({ json: { ok: true } })
    })
    await page.goto('/town/business#register')

    const form = page.getByRole('form', { name: 'Register your business' })
    await form.getByRole('button', { name: 'Send listing' }).click()

    await expect(form.getByText('Business name is required.')).toBeVisible()
    await expect(form.getByText('Choose a category.')).toBeVisible()
    await expect(form.getByText(/Give at least one way for customers to reach you/)).toBeVisible()
    await expect(form.getByText('Please confirm you own or represent this business.')).toBeVisible()
    expect(posted).toBe(false)
    expect(errors).toEqual([])
  })

  test('sends a listing and thanks the owner', async ({ page }) => {
    const errors = trackErrors(page)
    let body = ''
    await page.route('**/api/business-listings', async (route) => {
      body = route.request().postData() ?? ''
      await route.fulfill({ json: { ok: true } })
    })
    await page.goto('/town/business#register')

    const form = page.getByRole('form', { name: 'Register your business' })
    await form.getByLabel('Business name').fill('Sambog Mushroom Supply')
    await form.getByLabel('Category').click()
    await page.getByRole('option', { name: 'Farming and agriculture' }).click()
    await form.getByLabel('What you offer').fill('Fresh oyster mushrooms and grow kits, delivered around Corella.')
    await form.getByLabel('Barangay').click()
    await page.getByRole('option', { name: 'Sambog' }).click()
    await form.getByLabel('Phone').fill('0917 123 4567')
    await form.getByRole('checkbox').check()
    await form.getByRole('button', { name: 'Send listing' }).click()

    await expect(page.getByRole('status')).toContainText('your listing request was sent')
    expect(body).toContain('Sambog Mushroom Supply')
    expect(body).toContain('name="category"\r\n\r\nagri')
    expect(errors).toEqual([])
  })
})
