// "Add a tourist spot or event" form: shared by the form (inline errors) and /api/suggestions (server checks).
import { barangays } from '../../../government/shared/data/barangays.ts'
import { checkLengths, cut, formChecked, formText as text, isHttpUrl } from './formFields.ts'

// Re-exported so existing imports keep working.
export { MAX_PHOTO_BYTES, MIN_FILL_MS, PHOTO_TYPES, sniffImageType, validatePhotoMeta } from './formFields.ts'

export const SUGGESTION_KINDS = ['spot', 'event'] as const
export type SuggestionKind = (typeof SUGGESTION_KINDS)[number]

export const OTHER_PLACE = 'Not sure / other'
export const BARANGAY_OPTIONS = [...barangays.map((b) => b.name), OTHER_PLACE]

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
    consent: formChecked(form, 'consent'),
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

  checkLengths(input, LIMITS, LABELS, errors)

  if (!BARANGAY_OPTIONS.includes(input.barangay)) errors.barangay = 'Choose a barangay.'
  if (input.link && !errors.link && !isHttpUrl(input.link)) {
    errors.link = 'Enter a full link starting with https://'
  }
  if (!input.consent) errors.consent = 'Please confirm you can share this.'

  return errors
}

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
