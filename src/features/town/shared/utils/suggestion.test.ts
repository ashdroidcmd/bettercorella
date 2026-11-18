import { describe, expect, it } from 'vitest'
import {
  buildDiscordPayload,
  readSuggestion,
  sniffImageType,
  validatePhotoMeta,
  validateSuggestion,
  type SuggestionInput,
} from './suggestion.ts'

const validSuggestion: SuggestionInput = {
  kind: 'event',
  title: 'Sambog barangay fiesta',
  when: 'Every May 15',
  barangay: 'Sambog',
  venue: 'Sambog covered court',
  details: 'Mass in the morning, then a basketball league final and a dance at night.',
  fees: '',
  link: '',
  name: '',
  contact: '',
  consent: true,
}

describe('validateSuggestion', () => {
  it('accepts a complete suggestion', () => {
    expect(validateSuggestion(validSuggestion)).toEqual({})
  })

  it('flags missing required fields', () => {
    const errors = validateSuggestion({ ...validSuggestion, title: '', when: '', venue: '', details: '', consent: false })
    expect(Object.keys(errors).sort()).toEqual(['consent', 'details', 'title', 'venue', 'when'])
  })

  it('checks kind, barangay, lengths and links', () => {
    const errors = validateSuggestion({
      ...validSuggestion,
      kind: 'concert',
      barangay: 'Somewhere else',
      details: 'Too short',
      fees: 'x'.repeat(201),
      link: 'facebook page',
    })
    expect(errors.kind).toBeDefined()
    expect(errors.barangay).toBeDefined()
    expect(errors.details).toMatch(/at least 20/)
    expect(errors.fees).toMatch(/at most 200/)
    expect(errors.link).toMatch(/https/)
  })

  it('allows "not sure" as the barangay', () => {
    expect(validateSuggestion({ ...validSuggestion, barangay: 'Not sure / other' })).toEqual({})
  })
})

describe('readSuggestion', () => {
  it('trims text and reads the consent checkbox', () => {
    const form = new FormData()
    form.set('kind', 'spot')
    form.set('title', '  Falls  ')
    form.set('consent', 'on')
    expect(readSuggestion(form)).toMatchObject({ kind: 'spot', title: 'Falls', when: '', consent: true })
  })
})

describe('photos', () => {
  it('checks type and size', () => {
    expect(validatePhotoMeta({ type: 'image/jpeg', size: 1000 })).toBeNull()
    expect(validatePhotoMeta({ type: 'image/gif', size: 1000 })).toMatch(/JPG/)
    expect(validatePhotoMeta({ type: 'image/png', size: 5 * 1024 * 1024 })).toMatch(/4 MB/)
  })

  it('detects the real image type from the bytes', () => {
    expect(sniffImageType(new Uint8Array([0xff, 0xd8, 0xff, 0xe0]))).toBe('image/jpeg')
    expect(sniffImageType(new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))).toBe('image/png')
    expect(sniffImageType(new TextEncoder().encode('RIFF\0\0\0\0WEBPVP8 '))).toBe('image/webp')
    expect(sniffImageType(new TextEncoder().encode('<script>alert(1)</script>'))).toBeNull()
  })
})

describe('buildDiscordPayload', () => {
  it('builds an embed with mentions disabled', () => {
    const payload = buildDiscordPayload(
      { ...validSuggestion, details: '@everyone come!' + ' x'.repeat(10), name: 'Ana', contact: '0917 000 0000' },
      'photo.jpg',
      new Date('2026-11-18T00:00:00Z'),
    )
    expect(payload.allowed_mentions).toEqual({ parse: [] })
    const embed = payload.embeds[0]!
    expect(embed.title).toBe('📅 Event: Sambog barangay fiesta')
    expect(embed.image).toEqual({ url: 'attachment://photo.jpg' })
    expect(embed.footer.text).toBe('From Ana · 0917 000 0000')
    expect(embed.fields.map((f) => f.name)).toEqual(['When', 'Barangay', 'Venue / address'])
  })

  it('truncates to Discord limits and omits the image without a photo', () => {
    const payload = buildDiscordPayload({ ...validSuggestion, kind: 'spot', title: 'T'.repeat(300) }, null)
    const embed = payload.embeds[0]!
    expect(embed.title.length).toBe(256)
    expect(embed.title.startsWith('🗺️ Tourist spot')).toBe(true)
    expect('image' in embed).toBe(false)
  })
})
