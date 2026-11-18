import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { resetRateLimit } from './rateLimit'
import { POST } from './route'

const WEBHOOK = 'https://discord.com/api/webhooks/123/secret-token'
const JPEG = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0, 0x10, 0x4a, 0x46, 0x49, 0x46])

function formWith(overrides: Record<string, string | Blob> = {}) {
  const form = new FormData()
  const fields: Record<string, string | Blob> = {
    kind: 'spot',
    title: 'Canapnapan viewpoint',
    when: 'Daily, sunrise to sunset',
    barangay: 'Canapnapan',
    venue: 'Hilltop past the chapel',
    details: 'A hilltop with a view of the river and the tarsier forest, about ten minutes up a footpath.',
    consent: 'on',
    startedAt: String(Date.now() - 60_000),
    ...overrides,
  }
  for (const [key, value] of Object.entries(fields)) form.set(key, value)
  return form
}

const post = (form: FormData, ip = '203.0.113.7') =>
  POST(new Request('http://localhost/api/suggestions', { method: 'POST', body: form, headers: { 'x-forwarded-for': ip } }))

let fetchMock: ReturnType<typeof vi.fn>

beforeEach(() => {
  resetRateLimit()
  vi.stubEnv('DISCORD_SUGGESTIONS_WEBHOOK_URL', WEBHOOK)
  fetchMock = vi.fn().mockResolvedValue(Response.json({ id: '1' }))
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('POST /api/suggestions', () => {
  it('returns 503 when the webhook is not configured', async () => {
    vi.stubEnv('DISCORD_SUGGESTIONS_WEBHOOK_URL', '')
    const res = await post(formWith())
    expect(res.status).toBe(503)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('silently drops bot submissions (honeypot or instant submit)', async () => {
    expect((await post(formWith({ website: 'http://spam.example' }))).status).toBe(200)
    expect((await post(formWith({ startedAt: String(Date.now()) }))).status).toBe(200)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('rejects invalid input with field errors', async () => {
    const res = await post(formWith({ title: '', consent: '' }))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(Object.keys(body.fields).sort()).toEqual(['consent', 'title'])
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('rejects a file that only claims to be an image', async () => {
    const fake = new File(['<html>not a photo</html>'], 'photo.jpg', { type: 'image/jpeg' })
    const res = await post(formWith({ photo: fake }))
    expect(res.status).toBe(400)
    expect((await res.json()).fields.photo).toBeDefined()
  })

  it('rejects an oversize photo', async () => {
    const big = new Uint8Array(4 * 1024 * 1024 + 1)
    big.set(JPEG)
    const res = await post(formWith({ photo: new File([big], 'photo.jpg', { type: 'image/jpeg' }) }))
    expect(res.status).toBe(400)
  })

  it('posts an embed with the photo to Discord, with mentions disabled', async () => {
    const res = await post(formWith({ details: '@everyone A hilltop with a view of the river and forest.', photo: new File([JPEG], 'x.jpg', { type: 'image/jpeg' }) }))
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })

    const [url, init] = fetchMock.mock.calls[0] as [URL, RequestInit]
    expect(String(url)).toBe(`${WEBHOOK}?wait=true`)
    const body = init.body as FormData
    const payload = JSON.parse(String(body.get('payload_json')))
    expect(payload.allowed_mentions).toEqual({ parse: [] })
    expect(payload.embeds[0].title).toBe('🗺️ Tourist spot: Canapnapan viewpoint')
    expect(payload.embeds[0].image).toEqual({ url: 'attachment://photo.jpg' })
    const file = body.get('files[0]') as File
    expect(file.name).toBe('photo.jpg')
    expect(file.type).toBe('image/jpeg')
  })

  it('returns 502 when Discord fails, without exposing the webhook', async () => {
    fetchMock.mockResolvedValue(new Response('nope', { status: 500 }))
    const res = await post(formWith())
    expect(res.status).toBe(502)
    expect(await res.text()).not.toContain('secret-token')
  })

  it('limits each connection to 5 suggestions per hour', async () => {
    for (let i = 0; i < 5; i++) expect((await post(formWith())).status).toBe(200)
    expect((await post(formWith())).status).toBe(429)
    expect((await post(formWith(), '198.51.100.1')).status).toBe(200)
  })
})
