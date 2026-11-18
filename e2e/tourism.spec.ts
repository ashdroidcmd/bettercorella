import { expect, test, type Page } from '@playwright/test'

function trackErrors(page: Page) {
  const errors: string[] = []
  page.on('pageerror', (err) => errors.push(err.message))
  return errors
}

test.describe('Tourism and events', () => {
  test('lists the fiestas and tourist spots', async ({ page }) => {
    const errors = trackErrors(page)
    await page.goto('/town/life')

    await expect(page.getByRole('heading', { level: 1, name: 'Tourism and events' })).toBeVisible()

    const events = page.locator('#events')
    await expect(events.getByRole('heading', { name: 'Town Fiesta of Nuestra Señora del Villar' })).toBeVisible()
    await expect(events.getByText('Every April 27')).toBeVisible()
    await expect(events.getByText(/^Next: \w{3}, Apr 27, \d{4}$/)).toBeVisible()
    await expect(events.getByText(/^Next: \d+(st|nd|rd|th) anniversary, \d{4}$/)).toBeVisible()
    await expect(events.getByRole('heading', { name: 'Adlaw sa Corella' })).toBeVisible()

    const spots = page.locator('#spots')
    await expect(spots.getByRole('heading', { name: 'Philippine Tarsier Sanctuary' })).toBeVisible()
    await expect(spots.getByText('From ₱120')).toBeVisible()
    await expect(spots.getByRole('heading', { name: 'Green Thumb Farm' })).toBeVisible()

    expect(errors).toEqual([])
  })

  test('opens a tourist spot’s full details in a dialog', async ({ page }) => {
    const errors = trackErrors(page)
    await page.goto('/town/life')

    await page.getByRole('button', { name: 'Philippine Tarsier Sanctuary' }).click()
    const dialog = page.getByRole('dialog', { name: 'Philippine Tarsier Sanctuary' })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByText('₱150')).toBeVisible()
    await expect(dialog.getByText("Closed on Christmas Day and New Year's Day.")).toBeVisible()
    await expect(dialog.getByText('Turn off your camera flash.')).toBeVisible()
    await expect(dialog.getByRole('link', { name: /Get directions to Philippine Tarsier Sanctuary/ })).toHaveAttribute(
      'href',
      /google\.com\/maps/,
    )

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()

    await page.getByRole('button', { name: 'Green Thumb Farm' }).click()
    const farm = page.getByRole('dialog', { name: 'Green Thumb Farm' })
    await expect(farm).toBeVisible()
    await farm.getByRole('button', { name: 'Close' }).click()
    await expect(farm).toBeHidden()

    expect(errors).toEqual([])
  })

  test('does not show the suggestion form while it is hidden', async ({ page }) => {
    await page.goto('/town/life')
    await expect(page.getByRole('heading', { level: 1, name: 'Tourism and events' })).toBeVisible()
    await expect(page.locator('#suggest')).toHaveCount(0)
    await expect(page.getByRole('form', { name: 'Suggest a tourist spot or event' })).toHaveCount(0)
  })
})

// Re-enable when SHOW_SUGGEST_FORM is true in src/features/town/life-page/LifePage.tsx.
test.describe('Suggestion form', () => {
  test.skip(true, 'Suggestion form is hidden (SHOW_SUGGEST_FORM = false)')

  test('shows errors for an empty suggestion', async ({ page }) => {
    const errors = trackErrors(page)
    let posted = false
    await page.route('**/api/suggestions', (route) => {
      posted = true
      return route.fulfill({ json: { ok: true } })
    })
    await page.goto('/town/life#suggest')

    const form = page.getByRole('form', { name: 'Suggest a tourist spot or event' })
    await form.getByRole('button', { name: 'Send suggestion' }).click()

    await expect(form.getByText('Event title')).toBeVisible()
    await expect(form.getByText('Name or title is required.')).toBeVisible()
    await expect(form.getByText('Choose a barangay.')).toBeVisible()
    await expect(form.getByText('Please confirm you can share this.')).toBeVisible()
    expect(posted).toBe(false)
    expect(errors).toEqual([])
  })

  test('sends a suggestion and thanks the visitor', async ({ page }) => {
    const errors = trackErrors(page)
    let body = ''
    await page.route('**/api/suggestions', async (route) => {
      body = route.request().postData() ?? ''
      await route.fulfill({ json: { ok: true } })
    })
    await page.goto('/town/life#suggest')

    const form = page.getByRole('form', { name: 'Suggest a tourist spot or event' })
    await form.getByText('A tourist spot').click()
    await form.getByLabel('Name of the place').fill('Canapnapan viewpoint')
    await form.getByLabel('When').fill('Daily, sunrise to sunset')
    await form.getByLabel('Barangay').click()
    await page.getByRole('option', { name: 'Canapnapan' }).click()
    await form.getByLabel('Where exactly').fill('Hilltop past the chapel')
    await form.getByLabel('Details').fill('A hilltop with a view of the river and the tarsier forest.')
    await form.getByRole('checkbox').check()
    await form.getByRole('button', { name: 'Send suggestion' }).click()

    await expect(page.getByRole('status')).toContainText('a volunteer will review it')
    expect(body).toContain('Canapnapan viewpoint')
    expect(body).toContain('name="kind"\r\n\r\nspot')
    expect(errors).toEqual([])
  })
})
