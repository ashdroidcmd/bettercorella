// Helpers shared by the public forms (tourism suggestions, business listings), on the client and the server.

/** Max upload after client-side resizing. Vercel functions accept request bodies up to 4.5 MB. */
export const MAX_PHOTO_BYTES = 4 * 1024 * 1024
export const PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const
/** Submissions faster than this after the form loaded are treated as bots. */
export const MIN_FILL_MS = 3000

/** A trimmed text field from FormData ('' when missing). */
export function formText(form: FormData, key: string) {
  const value = form.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

export function formChecked(form: FormData, key: string) {
  const value = form.get(key)
  return value === 'on' || value === 'true'
}

/** Truncates with an ellipsis, e.g. to Discord's embed limits. */
export function cut(value: string, max: number) {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value
}

export const isHttpUrl = (value: string) => /^https?:\/\/\S+\.\S+/i.test(value)
export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

/**
 * Adds "required" / "too short" / "too long" errors for each field in `limits` ([min, max]; min 0 = optional).
 * Fields that already have an error are left alone.
 */
export function checkLengths<K extends string>(
  input: Record<K, string>,
  limits: Record<K, readonly [number, number]>,
  labels: Record<K, string>,
  errors: Partial<Record<string, string>>,
) {
  for (const key of Object.keys(limits) as K[]) {
    if (errors[key]) continue
    const [min, max] = limits[key]
    const value = input[key]
    if (min > 0 && !value) errors[key] = `${labels[key]} is required.`
    else if (value && value.length < min) errors[key] = `${labels[key]} needs at least ${min} characters.`
    else if (value.length > max) errors[key] = `${labels[key]} can be at most ${max} characters.`
  }
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
