// "Add a tourist spot or event": validates the form and posts it to a private Discord channel via a webhook.
// Nothing is published automatically; a maintainer reviews each post and adds approved records by hand.
import {
  MIN_FILL_MS,
  buildDiscordPayload,
  readSuggestion,
  sniffImageType,
  validatePhotoMeta,
  validateSuggestion,
} from '@/features/town/shared/utils/suggestion'
import { isRateLimited } from './rateLimit'

const NO_STORE = { 'Cache-Control': 'no-store' }
const json = (body: unknown, status = 200) => Response.json(body, { status, headers: NO_STORE })

export async function POST(request: Request) {
  const webhook = process.env.DISCORD_SUGGESTIONS_WEBHOOK_URL
  if (!webhook) return json({ error: 'not-configured' }, 503)

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return json({ error: 'invalid', fields: {} }, 400)
  }

  // Bots: a filled honeypot or an instant submit get a normal-looking reply and are dropped.
  const startedAt = Number(form.get('startedAt'))
  const now = Date.now()
  if (form.get('website') || !Number.isFinite(startedAt) || now - startedAt < MIN_FILL_MS) {
    return json({ ok: true })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (isRateLimited(ip, now)) return json({ error: 'rate-limited' }, 429)

  const input = readSuggestion(form)
  const fields = validateSuggestion(input)

  const photo = form.get('photo')
  let photoBytes: Uint8Array | null = null
  let photoType: string | null = null
  if (photo instanceof File && photo.size > 0) {
    const metaError = validatePhotoMeta(photo)
    photoBytes = new Uint8Array(await photo.arrayBuffer())
    photoType = sniffImageType(photoBytes)
    if (metaError || photoType !== photo.type) fields.photo = metaError ?? 'That file is not a valid photo.'
  }

  if (Object.keys(fields).length) return json({ error: 'invalid', fields }, 400)

  const photoName = photoBytes && photoType ? `photo.${photoType.split('/')[1]?.replace('jpeg', 'jpg')}` : null
  const body = new FormData()
  body.set('payload_json', JSON.stringify(buildDiscordPayload(input, photoName, new Date(now))))
  if (photoBytes && photoName && photoType) {
    body.set('files[0]', new Blob([photoBytes as BlobPart], { type: photoType }), photoName)
  }

  try {
    const url = new URL(webhook)
    url.searchParams.set('wait', 'true')
    const res = await fetch(url, { method: 'POST', body })
    if (!res.ok) throw new Error(`Discord ${res.status}`)
  } catch {
    return json({ error: 'upstream' }, 502)
  }

  return json({ ok: true })
}
