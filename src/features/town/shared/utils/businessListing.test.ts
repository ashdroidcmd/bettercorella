import { describe, expect, it } from 'vitest'
import {
  buildBusinessDiscordPayload,
  readBusinessListing,
  validateBusinessListing,
  type BusinessListingInput,
} from './businessListing.ts'

const valid: BusinessListingInput = {
  businessName: 'Aling Nena Sari-sari',
  category: 'retail',
  offer: 'Groceries, load, ice and cold drinks for the neighbourhood.',
  barangay: 'Poblacion',
  address: 'Near the plaza',
  hours: 'Daily, 6 AM–9 PM',
  phone: '0917 123 4567',
  email: '',
  link: '',
  ownerName: 'Nena Cruz, owner',
  permitNo: 'BP-2026-0042',
  consent: true,
}

describe('validateBusinessListing', () => {
  it('accepts a complete listing', () => {
    expect(validateBusinessListing(valid)).toEqual({})
  })

  it('requires the name, offer, category, barangay and consent', () => {
    const errors = validateBusinessListing({ ...valid, businessName: '', offer: '', category: '', barangay: '', consent: false })
    expect(Object.keys(errors).sort()).toEqual(['barangay', 'businessName', 'category', 'consent', 'offer'])
  })

  it('needs at least one contact', () => {
    const errors = validateBusinessListing({ ...valid, phone: '', email: '', link: '' })
    expect(errors.contact).toMatch(/at least one/)
    expect(validateBusinessListing({ ...valid, phone: '', email: 'shop@example.com' })).toEqual({})
    expect(validateBusinessListing({ ...valid, phone: '', link: 'https://facebook.com/shop' })).toEqual({})
  })

  it('checks contact formats', () => {
    const errors = validateBusinessListing({ ...valid, phone: 'call me', email: 'not-an-email', link: 'facebook' })
    expect(errors.phone).toBeDefined()
    expect(errors.email).toBeDefined()
    expect(errors.link).toBeDefined()
  })

  it('accepts "online / serves all of Corella" as the barangay', () => {
    expect(validateBusinessListing({ ...valid, barangay: 'Online / serves all of Corella' })).toEqual({})
  })

  it('rejects unknown categories', () => {
    expect(validateBusinessListing({ ...valid, category: 'casino' }).category).toBeDefined()
  })
})

describe('readBusinessListing', () => {
  it('trims fields and reads consent', () => {
    const form = new FormData()
    form.set('businessName', '  Shop  ')
    form.set('consent', 'on')
    expect(readBusinessListing(form)).toMatchObject({ businessName: 'Shop', phone: '', consent: true })
  })
})

describe('buildBusinessDiscordPayload', () => {
  it('separates public contact from review-only details and disables mentions', () => {
    const payload = buildBusinessDiscordPayload({ ...valid, offer: '@everyone ' + valid.offer }, 'photo.jpg')
    expect(payload.allowed_mentions).toEqual({ parse: [] })
    const embed = payload.embeds[0]!
    expect(embed.title).toBe('🏪 Business: Aling Nena Sari-sari')
    expect(embed.image).toEqual({ url: 'attachment://photo.jpg' })
    const fields = Object.fromEntries(embed.fields.map((f) => [f.name, f.value]))
    expect(fields['Category']).toBe('Retail and sari-sari')
    expect(fields['Contact (public)']).toBe('0917 123 4567')
    expect(fields['For review only (not published)']).toBe('Owner: Nena Cruz, owner\nPermit no.: BP-2026-0042')
  })

  it('omits the review field and image when not given', () => {
    const embed = buildBusinessDiscordPayload({ ...valid, ownerName: '', permitNo: '' }, null).embeds[0]!
    expect(embed.fields.some((f) => f.name.startsWith('For review'))).toBe(false)
    expect('image' in embed).toBe(false)
  })
})
