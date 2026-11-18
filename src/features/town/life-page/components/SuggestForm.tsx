'use client'

import { CheckCircle2, ImagePlus, LoaderCircle, Send } from 'lucide-react'
import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { CustomSelect } from '../../../../components/ui/CustomSelect'
import { ISSUES_URL } from '../../../../config/site'
import { cn } from '../../../../lib/utils'
import { BotTraps, Field, inputClass, resizePhoto, type FormStatus } from '../../shared/components/formParts'
import {
  BARANGAY_OPTIONS,
  readSuggestion,
  validatePhotoMeta,
  validateSuggestion,
  type SuggestionErrors,
  type SuggestionField,
  type SuggestionKind,
} from '../../shared/utils/suggestion'

export function SuggestForm() {
  const formId = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const [kind, setKind] = useState<SuggestionKind>('event')
  const [barangay, setBarangay] = useState('')
  const [errors, setErrors] = useState<SuggestionErrors>({})
  const [status, setStatus] = useState<FormStatus>({ state: 'idle' })
  const [startedAt, setStartedAt] = useState('')
  useEffect(() => setStartedAt(String(Date.now())), [])

  const id = (field: SuggestionField) => `${formId}-${field}`
  const errorProps = (field: SuggestionField) =>
    errors[field] ? { 'aria-invalid': true, 'aria-describedby': `${id(field)}-error` } : {}

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    const found = validateSuggestion(readSuggestion(data))
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
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0] as SuggestionField
      form.querySelector<HTMLElement>(`#${CSS.escape(id(first))}`)?.focus()
      return
    }

    setStatus({ state: 'sending' })
    try {
      const res = await fetch('/api/suggestions', { method: 'POST', body: data })
      const body = (await res.json().catch(() => ({}))) as { fields?: SuggestionErrors; error?: string }
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
              ? 'Too many suggestions from this connection. Please try again in an hour.'
              : 'We could not send your suggestion right now.',
      })
    } catch {
      setStatus({ state: 'failed', message: 'We could not send your suggestion right now.' })
    }
  }

  if (status.state === 'sent') {
    return (
      <div role="status" className="rounded-2xl border border-brand-200 bg-brand-50 p-6 text-ink-800">
        <CheckCircle2 aria-hidden="true" className="size-7 text-brand-700" />
        <p className="mt-3 text-lg font-extrabold text-ink-950">{'Thanks — a volunteer will review it.'}</p>
        <p className="mt-1 text-sm leading-6">
          {'We check every suggestion against an official source or the venue before adding it to the site.'}
        </p>
        <button
          type="button"
          onClick={() => {
            formRef.current?.reset()
            setBarangay('')
            setErrors({})
            setStartedAt(String(Date.now()))
            setStatus({ state: 'idle' })
          }}
          className="mt-4 text-sm font-bold text-brand-700 underline underline-offset-4 hover:text-brand-800"
        >
          {'Suggest another'}
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
      aria-label="Suggest a tourist spot or event"
      className="relative rounded-2xl border border-line bg-white p-5 shadow-card sm:p-7"
    >
      <fieldset>
        <legend className="text-sm font-bold text-ink-950">{'What are you suggesting?'}</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {(
            [
              ['event', 'An event or fiesta'],
              ['spot', 'A tourist spot'],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className={cn(
                'cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-300',
                kind === value ? 'border-brand-600 bg-brand-50 text-brand-800' : 'border-line text-ink-700 hover:border-brand-200',
              )}
            >
              <input
                type="radio"
                name="kind"
                value={value}
                checked={kind === value}
                onChange={() => setKind(value)}
                className="sr-only"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field label={kind === 'event' ? 'Event title' : 'Name of the place'} id={id('title')} error={errors.title} className="sm:col-span-2">
          <input
            id={id('title')}
            name="title"
            maxLength={120}
            placeholder={kind === 'event' ? 'e.g. Barangay Sambog fiesta' : 'e.g. a waterfall, viewpoint or farm'}
            className={inputClass}
            {...errorProps('title')}
          />
        </Field>

        <Field
          label="When"
          id={id('when')}
          error={errors.when}
          hint={kind === 'event' ? 'Date or dates, and whether it repeats every year.' : 'Days and hours it is open.'}
        >
          <input
            id={id('when')}
            name="when"
            maxLength={200}
            placeholder={kind === 'event' ? 'e.g. Every May 15, from 8 AM' : 'e.g. Daily, 8 AM–5 PM'}
            className={inputClass}
            {...errorProps('when')}
          />
        </Field>

        <Field label="Barangay" id={id('barangay')} error={errors.barangay}>
          <input type="hidden" name="barangay" value={barangay} />
          <CustomSelect
            id={id('barangay')}
            options={[{ value: '', label: 'Choose a barangay' }, ...BARANGAY_OPTIONS.map((name) => ({ value: name, label: name }))]}
            value={barangay}
            onChange={setBarangay}
            className="mt-1.5"
          />
        </Field>

        <Field label="Where exactly" id={id('venue')} error={errors.venue} hint="Venue, purok, landmark or address." className="sm:col-span-2">
          <input id={id('venue')} name="venue" maxLength={200} className={inputClass} {...errorProps('venue')} />
        </Field>

        <Field
          label="Details"
          id={id('details')}
          error={errors.details}
          hint="What happens there, what to expect, who runs it. At least 20 characters."
          className="sm:col-span-2"
        >
          <textarea id={id('details')} name="details" rows={5} maxLength={2000} className={inputClass} {...errorProps('details')} />
        </Field>

        <Field label="Fees or admission (optional)" id={id('fees')} error={errors.fees}>
          <input id={id('fees')} name="fees" maxLength={200} placeholder="e.g. Free, or ₱50 per person" className={inputClass} {...errorProps('fees')} />
        </Field>

        <Field label="Link (optional)" id={id('link')} error={errors.link} hint="Facebook page, website or news post.">
          <input id={id('link')} name="link" type="url" maxLength={300} placeholder="https://" className={inputClass} {...errorProps('link')} />
        </Field>

        <Field label="Photo (optional)" id={id('photo')} error={errors.photo} hint="One JPG, PNG or WebP. Only send photos you took or may share." className="sm:col-span-2">
          <div className="mt-1.5 flex items-center gap-3 rounded-xl border border-dashed border-line bg-surface px-3.5 py-3">
            <ImagePlus aria-hidden="true" className="size-5 shrink-0 text-brand-600" />
            <input
              id={id('photo')}
              name="photo"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="min-w-0 text-sm text-ink-700 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-700 file:px-3 file:py-1.5 file:text-sm file:font-bold file:text-white hover:file:bg-brand-800"
              {...errorProps('photo')}
            />
          </div>
        </Field>

        <Field label="Your name (optional)" id={id('name')} error={errors.name}>
          <input id={id('name')} name="name" maxLength={100} autoComplete="name" className={inputClass} {...errorProps('name')} />
        </Field>

        <Field label="Email or mobile (optional)" id={id('contact')} error={errors.contact} hint="Only so we can follow up. Never published.">
          <input id={id('contact')} name="contact" maxLength={120} className={inputClass} {...errorProps('contact')} />
        </Field>
      </div>

      <BotTraps startedAt={startedAt} />

      <div className="mt-6">
        <label className="flex gap-3 text-sm leading-6 text-ink-700">
          <input
            id={id('consent')}
            name="consent"
            type="checkbox"
            className="mt-1 size-4 shrink-0 accent-brand-700"
            {...errorProps('consent')}
          />
          <span>{'I have the right to share this information and photo, and it may be published on BetterCorella.'}</span>
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
          className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-800 disabled:opacity-60"
        >
          {sending ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : <Send aria-hidden="true" className="size-4" />}
          {sending ? 'Sending…' : 'Send suggestion'}
        </button>
        <p className="text-xs text-ink-500">{'Suggestions go to the volunteers, not the municipal government.'}</p>
      </div>
    </form>
  )
}
