import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { resetRateLimit } from '../_shared/rateLimit'
import { POST } from './route'

const BUSINESS_HOOK = 'https://discord.com/api/webhooks/1/business-token'
const SUGGESTIONS_HOOK = 'https://discord.com/api/webhooks/2/suggestions-token'
const JPEG = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0, 0x10, 0x4a, 0x46, 0x49, 0x46])

function formWith(overrides: Record<string, string | Blob> = {}) {
  const form = new FormData()
  const fields: Record<string, string | Blob> = {
    businessName: 'Sambog Mushroom Supply',
    category: 'agri',
    offer: 'Fresh oyster mushrooms and grow kits, delivered around Corella.',
    barangay: 'Sambog',
    phone: '0917 123 4567',
    consent: 'on',
    startedAt: String(Date.now() - 60_000),
    ...overrides,
  }
  for (const [key, value] of Object.entries(fields)) form.set(key, value)
  return form
}

const post = (form: FormData, ip = '203.0.113.9') =>
  POST(new Request('http://localhost/api/business-listings', { method: 'POST', body: form, headers: { 'x-forwarded-for': ip } }))

let fetchMock: ReturnType<typeof vi.fn>

beforeEach(() => {
  resetRateLimit()
  vi.stubEnv('DISCORD_BUSINESS_WEBHOOK_URL', BUSINESS_HOOK)
  vi.stubEnv('DISCORD_SUGGESTIONS_WEBHOOK_URL', SUGGESTIONS_HOOK)
  fetchMock = vi.fn().mockResolvedValue(Response.json({ id: '1' }))
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('POST /api/business-listings', () => {
  it('returns 503 when no webhook is configured', async () => {
    vi.stubEnv('DISCORD_BUSINESS_WEBHOOK_URL', '')
    vi.stubEnv('DISCORD_SUGGESTIONS_WEBHOOK_URL', '')
    expect((await post(formWith())).status).toBe(503)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('uses the business webhook, or falls back to the suggestions webhook', async () => {
    await post(formWith())
    expect(String(fetchMock.mock.calls[0]?.[0])).toBe(`${BUSINESS_HOOK}?wait=true`)

    vi.stubEnv('DISCORD_BUSINESS_WEBHOOK_URL', '')
    await post(formWith())
    expect(String(fetchMock.mock.calls[1]?.[0])).toBe(`${SUGGESTIONS_HOOK}?wait=true`)
  })

  it('silently drops bots', async () => {
    expect((await post(formWith({ website: 'spam' }))).status).toBe(200)
    expect((await post(formWith({ startedAt: String(Date.now()) }))).status).toBe(200)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('rejects a listing without any contact', async () => {
    const res = await post(formWith({ phone: '' }))
    expect(res.status).toBe(400)
    expect((await res.json()).fields.contact).toBeDefined()
  })

  it('rejects a fake image', async () => {
    const res = await post(formWith({ photo: new File(['not an image'], 'logo.png', { type: 'image/png' }) }))
    expect(res.status).toBe(400)
    expect((await res.json()).fields.photo).toBeDefined()
  })

  it('posts the listing and logo to Discord with mentions disabled', async () => {
    const res = await post(formWith({ permitNo: 'BP-1', photo: new File([JPEG], 'logo.jpg', { type: 'image/jpeg' }) }))
    expect(res.status).toBe(200)
    const body = (fetchMock.mock.calls[0] as [URL, RequestInit])[1].body as FormData
    const payload = JSON.parse(String(body.get('payload_json')))
    expect(payload.allowed_mentions).toEqual({ parse: [] })
    expect(payload.embeds[0].title).toBe('🏪 Business: Sambog Mushroom Supply')
    expect(JSON.stringify(payload)).toContain('Permit no.: BP-1')
    expect((body.get('files[0]') as File).name).toBe('photo.jpg')
  })

  it('returns 502 when Discord fails, without exposing the webhook', async () => {
    fetchMock.mockResolvedValue(new Response('nope', { status: 500 }))
    const res = await post(formWith())
    expect(res.status).toBe(502)
    expect(await res.text()).not.toContain('business-token')
  })

  it('rate-limits separately from the suggestions form', async () => {
    for (let i = 0; i < 5; i++) expect((await post(formWith())).status).toBe(200)
    expect((await post(formWith())).status).toBe(429)
  })
})
