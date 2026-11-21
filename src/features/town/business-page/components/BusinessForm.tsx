'use client'

import { CheckCircle2, ImagePlus, LoaderCircle, Send } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { CustomSelect } from '../../../../components/ui/CustomSelect'
import { ISSUES_URL } from '../../../../config/site'
import { BotTraps, Field, inputClass, resizePhoto, type FormStatus } from '../../shared/components/formParts'
import { businessCategoryLabels } from '../../shared/data/businesses'
import {
  BUSINESS_BARANGAY_OPTIONS,
  BUSINESS_CATEGORIES,
  readBusinessListing,
  validateBusinessListing,
  type BusinessErrors,
  type BusinessField,
} from '../../shared/utils/businessListing'
import { validatePhotoMeta } from '../../shared/utils/formFields'

const FIELD_ORDER: BusinessField[] = [
  'businessName', 'category', 'offer', 'barangay', 'address', 'hours',
  'contact', 'phone', 'email', 'link', 'photo', 'ownerName', 'permitNo', 'consent',
]

export function BusinessForm() {
  const formId = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const [category, setCategory] = useState('')
  const [barangay, setBarangay] = useState('')
  const [errors, setErrors] = useState<BusinessErrors>({})
  const [status, setStatus] = useState<FormStatus>({ state: 'idle' })
  const [startedAt, setStartedAt] = useState('')
  useEffect(() => setStartedAt(String(Date.now())), [])

  const id = (field: BusinessField) => `${formId}-${field}`
  const errorProps = (field: BusinessField) =>
    errors[field] ? { 'aria-invalid': true, 'aria-describedby': `${id(field)}-error` } : {}

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    const found = validateBusinessListing(readBusinessListing(data))
    const photo = data.get('photo')
    if (photo instanceof File && photo.size > 0) {
      const resized = await resizePhoto(photo)
      const photoError = validatePhotoMeta(resized)
      if (photoError) found.photo = photoError
      else data.set('photo', resized, resized.name)
    } else {
      data.delete('photo')
    }

    setErrors(found)
    const first = FIELD_ORDER.find((field) => found[field])
    if (first) {
      const target = first === 'contact' ? 'phone' : first
      form.querySelector<HTMLElement>(`#${CSS.escape(id(target))}`)?.focus()
      return
    }

    setStatus({ state: 'sending' })
    try {
      const res = await fetch('/api/business-listings', { method: 'POST', body: data })
      const body = (await res.json().catch(() => ({}))) as { fields?: BusinessErrors }
      if (res.ok) {
        setStatus({ state: 'sent' })
        return
      }
      if (res.status === 400 && body.fields) setErrors(body.fields)
      setStatus({
        state: 'failed',
        message:
          res.status === 400
            ? 'Please check the highlighted fields.'
            : res.status === 429
              ? 'Too many requests from this connection. Please try again in an hour.'
              : 'We could not send your listing right now.',
      })
    } catch {
      setStatus({ state: 'failed', message: 'We could not send your listing right now.' })
    }
  }

  if (status.state === 'sent') {
    return (
      <div role="status" className="rounded-2xl border border-brand-200 bg-brand-50 p-6 text-ink-800">
        <CheckCircle2 aria-hidden="true" className="size-7 text-brand-700" />
        <p className="mt-3 text-lg font-extrabold text-ink-950">{'Thanks — your listing request was sent.'}</p>
        <p className="mt-1 text-sm leading-6">
          {'A volunteer will check it and may contact you before it appears in the directory.'}
        </p>
        <button
          type="button"
          onClick={() => {
            formRef.current?.reset()
            setCategory('')
            setBarangay('')
            setErrors({})
            setStartedAt(String(Date.now()))
            setStatus({ state: 'idle' })
          }}
          className="mt-4 text-sm font-bold text-brand-700 underline underline-offset-4 hover:text-brand-800"
        >
          {'Register another business'}
        </button>
      </div>
    )
  }

  const sending = status.state === 'sending'

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-label="Register your business"
      className="relative rounded-2xl border border-line bg-card p-5 shadow-card sm:p-7"
    >
      <fieldset>
        <legend className="text-base font-extrabold text-ink-950">{'About the business'}</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="Business name" id={id('businessName')} error={errors.businessName}>
            <input id={id('businessName')} name="businessName" maxLength={120} className={inputClass} {...errorProps('businessName')} />
          </Field>

          <Field label="Category" id={id('category')} error={errors.category}>
            <input type="hidden" name="category" value={category} />
            <CustomSelect
              id={id('category')}
              options={[
                { value: '', label: 'Choose a category' },
                ...BUSINESS_CATEGORIES.map((value) => ({ value, label: businessCategoryLabels[value] })),
              ]}
              value={category}
              onChange={setCategory}
              className="mt-1.5"
            />
          </Field>

          <Field
            label="What you offer"
            id={id('offer')}
            error={errors.offer}
            hint="Products or services, prices if you like, and what makes you different. At least 20 characters."
            className="sm:col-span-2"
          >
            <textarea id={id('offer')} name="offer" rows={4} maxLength={1500} className={inputClass} {...errorProps('offer')} />
          </Field>

          <Field label="Barangay" id={id('barangay')} error={errors.barangay}>
            <input type="hidden" name="barangay" value={barangay} />
            <CustomSelect
              id={id('barangay')}
              options={[
                { value: '', label: 'Choose a barangay' },
                ...BUSINESS_BARANGAY_OPTIONS.map((name) => ({ value: name, label: name })),
              ]}
              value={barangay}
              onChange={setBarangay}
              className="mt-1.5"
            />
          </Field>

          <Field label="Address or landmark (optional)" id={id('address')} error={errors.address}>
            <input id={id('address')} name="address" maxLength={200} placeholder="e.g. Purok 2, near the chapel" className={inputClass} {...errorProps('address')} />
          </Field>

          <Field label="Hours (optional)" id={id('hours')} error={errors.hours} className="sm:col-span-2">
            <input id={id('hours')} name="hours" maxLength={120} placeholder="e.g. Mon–Sat, 7 AM–6 PM" className={inputClass} {...errorProps('hours')} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="mt-7" aria-describedby={errors.contact ? `${id('contact')}-error` : `${id('contact')}-hint`}>
        <legend className="text-base font-extrabold text-ink-950">{'How customers reach you'}</legend>
        {errors.contact ? (
          <p id={`${id('contact')}-error`} className="mt-1 text-sm font-semibold text-red-700">
            {errors.contact}
          </p>
        ) : (
          <p id={`${id('contact')}-hint`} className="mt-1 text-xs text-ink-500">
            {'At least one. These are shown publicly on your listing.'}
          </p>
        )}
        <div className="mt-4 grid gap-5 sm:grid-cols-3">
          <Field label="Phone" id={id('phone')} error={errors.phone}>
            <input id={id('phone')} name="phone" type="tel" maxLength={40} autoComplete="tel" placeholder="0917 123 4567" className={inputClass} {...errorProps('phone')} />
          </Field>
          <Field label="Email" id={id('email')} error={errors.email}>
            <input id={id('email')} name="email" type="email" maxLength={120} autoComplete="email" className={inputClass} {...errorProps('email')} />
          </Field>
          <Field label="Facebook page or website" id={id('link')} error={errors.link}>
            <input id={id('link')} name="link" type="url" maxLength={300} placeholder="https://" className={inputClass} {...errorProps('link')} />
          </Field>
        </div>
      </fieldset>

      <div className="mt-7">
        <Field label="Logo or photo (optional)" id={id('photo')} error={errors.photo} hint="One JPG, PNG or WebP of your shop, product or logo.">
          <div className="mt-1.5 flex items-center gap-3 rounded-xl border border-dashed border-line bg-surface px-3.5 py-3">
            <ImagePlus aria-hidden="true" className="size-5 shrink-0 text-brand-600" />
            <input
              id={id('photo')}
              name="photo"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="min-w-0 text-sm text-ink-700 file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-bold file:text-white hover:file:bg-primary-hover"
              {...errorProps('photo')}
            />
          </div>
        </Field>
      </div>

      <fieldset className="mt-7">
        <legend className="text-base font-extrabold text-ink-950">{'For our review (not published)'}</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="Your name and role (optional)" id={id('ownerName')} error={errors.ownerName} hint="e.g. Maria Santos, owner">
            <input id={id('ownerName')} name="ownerName" maxLength={100} autoComplete="name" className={inputClass} {...errorProps('ownerName')} />
          </Field>
          <Field label="DTI or business permit no. (optional)" id={id('permitNo')} error={errors.permitNo} hint="Helps us verify the business.">
            <input id={id('permitNo')} name="permitNo" maxLength={60} className={inputClass} {...errorProps('permitNo')} />
          </Field>
        </div>
      </fieldset>

      <BotTraps startedAt={startedAt} />

      <div className="mt-7">
        <label className="flex gap-3 text-sm leading-6 text-ink-700">
          <input id={id('consent')} name="consent" type="checkbox" className="mt-1 size-4 shrink-0 accent-brand-700" {...errorProps('consent')} />
          <span>{'I own or represent this business, and these details may be published on BetterCorella.'}</span>
        </label>
        {errors.consent ? (
          <p id={`${id('consent')}-error`} className="mt-1 pl-7 text-sm font-semibold text-red-700">
            {errors.consent}
          </p>
        ) : null}
      </div>

      {status.state === 'failed' ? (
        <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
          {`${status.message} `}
          {status.message.startsWith('Please') ? null : (
            <>
              {'You can also '}
              <a href={ISSUES_URL} target="_blank" rel="noreferrer" className="font-bold underline underline-offset-2">
                {'send it as a GitHub issue'}
              </a>
              .
            </>
          )}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={sending}
          aria-busy={sending}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-hover disabled:opacity-60"
        >
          {sending ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : <Send aria-hidden="true" className="size-4" />}
          {sending ? 'Sending…' : 'Send listing'}
        </button>
        <p className="text-xs text-ink-500">
          {'Free. This is not a business permit — for that, see '}
          <Link href="/services/business" className="font-semibold text-brand-700 underline underline-offset-2">
            {'business permit services'}
          </Link>
          .
        </p>
      </div>
    </form>
  )
}
