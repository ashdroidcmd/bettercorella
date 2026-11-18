// "Add a tourist spot or event" form: shared by the form (inline errors) and /api/suggestions (server checks).
import { barangays } from '../../../government/shared/data/barangays.ts'

export const SUGGESTION_KINDS = ['spot', 'event'] as const
export type SuggestionKind = (typeof SUGGESTION_KINDS)[number]

export const OTHER_PLACE = 'Not sure / other'
export const BARANGAY_OPTIONS = [...barangays.map((b) => b.name), OTHER_PLACE]

/** Max upload after client-side resizing. Vercel functions accept request bodies up to 4.5 MB. */
export const MAX_PHOTO_BYTES = 4 * 1024 * 1024
export const PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const
/** Submissions faster than this after the form loaded are treated as bots. */
export const MIN_FILL_MS = 3000

const LIMITS = {
  title: [3, 120],
  when: [3, 200],
  venue: [3, 200],
  details: [20, 2000],
  fees: [0, 200],
  link: [0, 300],
  name: [0, 100],
  contact: [0, 120],
} as const

export interface SuggestionInput {
  kind: string
  title: string
  when: string
  barangay: string
  venue: string
  details: string
  fees: string
  link: string
  name: string
  contact: string
  consent: boolean
}

export type SuggestionField = keyof SuggestionInput | 'photo'
export type SuggestionErrors = Partial<Record<SuggestionField, string>>

const text = (form: FormData, key: string) => {
  const value = form.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

export function readSuggestion(form: FormData): SuggestionInput {
  return {
    kind: text(form, 'kind'),
    title: text(form, 'title'),
    when: text(form, 'when'),
    barangay: text(form, 'barangay'),
    venue: text(form, 'venue'),
    details: text(form, 'details'),
    fees: text(form, 'fees'),
    link: text(form, 'link'),
    name: text(form, 'name'),
    contact: text(form, 'contact'),
    consent: form.get('consent') === 'on' || form.get('consent') === 'true',
  }
}

const LABELS: Record<keyof typeof LIMITS, string> = {
  title: 'Name or title',
  when: 'When',
  venue: 'Venue or address',
  details: 'Details',
  fees: 'Fees',
  link: 'Link',
  name: 'Your name',
  contact: 'Contact',
}

export function validateSuggestion(input: SuggestionInput): SuggestionErrors {
  const errors: SuggestionErrors = {}

  if (!SUGGESTION_KINDS.includes(input.kind as SuggestionKind)) errors.kind = 'Choose a tourist spot or an event.'

  for (const [key, [min, max]] of Object.entries(LIMITS) as Array<[keyof typeof LIMITS, readonly [number, number]]>) {
    const value = input[key]
    if (min > 0 && !value) errors[key] = `${LABELS[key]} is required.`
    else if (value && value.length < min) errors[key] = `${LABELS[key]} needs at least ${min} characters.`
    else if (value.length > max) errors[key] = `${LABELS[key]} can be at most ${max} characters.`
  }

  if (!BARANGAY_OPTIONS.includes(input.barangay)) errors.barangay = 'Choose a barangay.'
  if (input.link && !errors.link && !/^https?:\/\/\S+\.\S+/i.test(input.link)) {
    errors.link = 'Enter a full link starting with https://'
  }
  if (!input.consent) errors.consent = 'Please confirm you can share this.'

  return errors
}

export function validatePhotoMeta(photo: { size: number; type: string }): string | null {
  if (!(PHOTO_TYPES as readonly string[]).includes(photo.type)) return 'Use a JPG, PNG or WebP photo.'
  if (photo.size > MAX_PHOTO_BYTES) return 'The photo must be 4 MB or smaller.'
  return null
}

/** Detects the real image type from the file's first bytes, so a renamed file can't pass as a photo. */
export function sniffImageType(bytes: Uint8Array): (typeof PHOTO_TYPES)[number] | null {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg'
  if ([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((b, i) => bytes[i] === b)) return 'image/png'
  const ascii = (from: number, to: number) => String.fromCharCode(...bytes.slice(from, to))
  if (ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP') return 'image/webp'
  return null
}

const cut = (value: string, max: number) => (value.length > max ? `${value.slice(0, max - 1)}…` : value)

/** Discord webhook body (sent as `payload_json`). Mentions are disabled so a submitter can't ping anyone. */
export function buildDiscordPayload(input: SuggestionInput, photoName: string | null, now = new Date()) {
  const isEvent = input.kind === 'event'
  const fields = [
    { name: 'When', value: input.when, inline: true },
    { name: 'Barangay', value: input.barangay, inline: true },
    { name: 'Venue / address', value: input.venue, inline: false },
    ...(input.fees ? [{ name: 'Fees', value: input.fees, inline: true }] : []),
    ...(input.link ? [{ name: 'Link', value: input.link, inline: false }] : []),
  ].map((field) => ({ ...field, value: cut(field.value, 1024) }))

  const from = [input.name, input.contact].filter(Boolean).join(' · ')

  return {
    username: 'BetterCorella suggestions',
    allowed_mentions: { parse: [] as string[] },
    embeds: [
      {
        title: cut(`${isEvent ? '📅 Event' : '🗺️ Tourist spot'}: ${input.title}`, 256),
        description: cut(input.details, 4096),
        color: isEvent ? 0xfcd116 : 0x0038a8,
        fields,
        footer: { text: cut(from ? `From ${from}` : 'No contact given', 2048) },
        timestamp: now.toISOString(),
        ...(photoName ? { image: { url: `attachment://${photoName}` } } : {}),
      },
    ],
  }
}
