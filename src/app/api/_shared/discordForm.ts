// Shared handler for the public forms that post to a private Discord channel (tourism suggestions, business
// listings). It drops bots, rate-limits, validates, checks the optional photo and forwards everything to the
// webhook. Nothing is published automatically; volunteers review each post.
import { MIN_FILL_MS, sniffImageType, validatePhotoMeta } from '@/features/town/shared/utils/formFields'
import { isRateLimited } from './rateLimit'

const NO_STORE = { 'Cache-Control': 'no-store' }
export const json = (body: unknown, status = 200) => Response.json(body, { status, headers: NO_STORE })

interface DiscordFormOptions<T> {
  /** Webhook URL from a server-only env var; undefined → 503. */
  webhook: string | undefined
  /** Separates rate-limit counts between forms. */
  scope: string
  read: (form: FormData) => T
  validate: (input: T) => Partial<Record<string, string>>
  /** Discord `payload_json` body; `photoName` is set when a photo is attached. */
  payload: (input: T, photoName: string | null, now: Date) => unknown
}

export async function handleDiscordForm<T>(request: Request, options: DiscordFormOptions<T>) {
  if (!options.webhook) return json({ error: 'not-configured' }, 503)

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
  if (isRateLimited(`${options.scope}:${ip}`, now)) return json({ error: 'rate-limited' }, 429)

  const input = options.read(form)
  const fields = options.validate(input)

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
  body.set('payload_json', JSON.stringify(options.payload(input, photoName, new Date(now))))
  if (photoBytes && photoName && photoType) {
    body.set('files[0]', new Blob([photoBytes as BlobPart], { type: photoType }), photoName)
  }

  try {
    const url = new URL(options.webhook)
    url.searchParams.set('wait', 'true')
    const res = await fetch(url, { method: 'POST', body })
    if (!res.ok) throw new Error(`Discord ${res.status}`)
  } catch {
    return json({ error: 'upstream' }, 502)
  }

  return json({ ok: true })
}
