// "Register your business" form: shared by the form (inline errors) and /api/business-listings (server checks).
import { barangays } from '../../../government/shared/data/barangays.ts'
import { businessCategoryLabels } from '../data/businesses.ts'
import type { BusinessCategory } from '../types/business.ts'
import { checkLengths, cut, formChecked, formText, isEmail, isHttpUrl } from './formFields.ts'

export const ONLINE_OR_ALL = 'Online / serves all of Corella'
export const BUSINESS_BARANGAY_OPTIONS = [...barangays.map((b) => b.name), ONLINE_OR_ALL]
export const BUSINESS_CATEGORIES = Object.keys(businessCategoryLabels) as BusinessCategory[]

const LIMITS = {
  businessName: [2, 120],
  offer: [20, 1500],
  address: [0, 200],
  hours: [0, 120],
  phone: [0, 40],
  email: [0, 120],
  link: [0, 300],
  ownerName: [0, 100],
  permitNo: [0, 60],
} as const

const LABELS: Record<keyof typeof LIMITS, string> = {
  businessName: 'Business name',
  offer: 'What you offer',
  address: 'Address',
  hours: 'Hours',
  phone: 'Phone',
  email: 'Email',
  link: 'Facebook page or website',
  ownerName: 'Your name',
  permitNo: 'Permit number',
}

export interface BusinessListingInput {
  businessName: string
  category: string
  offer: string
  barangay: string
  address: string
  hours: string
  phone: string
  email: string
  link: string
  ownerName: string
  permitNo: string
  consent: boolean
}

export type BusinessField = keyof BusinessListingInput | 'photo' | 'contact'
export type BusinessErrors = Partial<Record<BusinessField, string>>

export function readBusinessListing(form: FormData): BusinessListingInput {
  return {
    businessName: formText(form, 'businessName'),
    category: formText(form, 'category'),
    offer: formText(form, 'offer'),
    barangay: formText(form, 'barangay'),
    address: formText(form, 'address'),
    hours: formText(form, 'hours'),
    phone: formText(form, 'phone'),
    email: formText(form, 'email'),
    link: formText(form, 'link'),
    ownerName: formText(form, 'ownerName'),
    permitNo: formText(form, 'permitNo'),
    consent: formChecked(form, 'consent'),
  }
}

export function validateBusinessListing(input: BusinessListingInput): BusinessErrors {
  const errors: BusinessErrors = {}

  checkLengths(input, LIMITS, LABELS, errors)

  if (!BUSINESS_CATEGORIES.includes(input.category as BusinessCategory)) errors.category = 'Choose a category.'
  if (!BUSINESS_BARANGAY_OPTIONS.includes(input.barangay)) errors.barangay = 'Choose a barangay.'
  if (input.email && !errors.email && !isEmail(input.email)) errors.email = 'Enter a valid email address.'
  if (input.link && !errors.link && !isHttpUrl(input.link)) errors.link = 'Enter a full link starting with https://'
  if (input.phone && !errors.phone && !/^[+\d][\d\s()-]{6,}$/.test(input.phone)) errors.phone = 'Enter a valid phone number.'
  if (!input.phone && !input.email && !input.link) {
    errors.contact = 'Give at least one way for customers to reach you: phone, email, or a Facebook page or website.'
  }
  if (!input.consent) errors.consent = 'Please confirm you own or represent this business.'

  return errors
}

/** Discord webhook body (sent as `payload_json`). Mentions are disabled so a submitter can't ping anyone. */
export function buildBusinessDiscordPayload(input: BusinessListingInput, photoName: string | null, now = new Date()) {
  const contact = [input.phone, input.email, input.link].filter(Boolean).join('\n')
  const review = [input.ownerName && `Owner: ${input.ownerName}`, input.permitNo && `Permit no.: ${input.permitNo}`]
    .filter(Boolean)
    .join('\n')

  const fields = [
    { name: 'Category', value: businessCategoryLabels[input.category as BusinessCategory] ?? input.category, inline: true },
    { name: 'Barangay', value: input.barangay, inline: true },
    ...(input.address ? [{ name: 'Address', value: input.address, inline: false }] : []),
    ...(input.hours ? [{ name: 'Hours', value: input.hours, inline: true }] : []),
    { name: 'Contact (public)', value: contact, inline: false },
    ...(review ? [{ name: 'For review only (not published)', value: review, inline: false }] : []),
  ].map((field) => ({ ...field, value: cut(field.value, 1024) }))

  return {
    username: 'BetterCorella business listings',
    allowed_mentions: { parse: [] as string[] },
    embeds: [
      {
        title: cut(`🏪 Business: ${input.businessName}`, 256),
        description: cut(input.offer, 4096),
        color: 0x16a34a,
        fields,
        timestamp: now.toISOString(),
        ...(photoName ? { image: { url: `attachment://${photoName}` } } : {}),
      },
    ],
  }
}
