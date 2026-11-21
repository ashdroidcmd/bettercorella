'use client'

import { Cloud, CloudRain, Droplets, Gauge, Sunrise, Sunset, Thermometer, Wind } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from '../../../../components/ui/Reveal'
import { SectionHeading } from '../../../../components/ui/SectionHeading'
import { city } from '../../../../config/city'
import type { WeatherState } from '../hooks/useCurrentWeather.ts'
import type { WeatherNow } from '../types/weather.ts'
import { compassDirection, formatLocalTime } from '../utils/normalizeWeather.ts'
import { weatherIcon } from '../utils/weatherIcon.ts'

const OPENWEATHER_URL = 'https://openweathermap.org/'

/** "Weather in Corella" section with current conditions. Renders nothing when weather is unavailable. */
export function WeatherSection({ weather }: { weather: WeatherState }) {
  if (weather.status === 'unavailable') return null

  return (
    <section id="weather" aria-label={`Weather in ${city.name}`} className="scroll-mt-24 border-b border-line">
      <div className="container-page py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Weather"
            title={`Weather in ${city.name}`}
            description="Current conditions at the town centre, refreshed about every 10 minutes."
          />
        </Reveal>

        {weather.status === 'loading' ? (
          <div aria-hidden="true" className="mt-8 h-56 animate-pulse rounded-2xl border border-line bg-surface" />
        ) : (
          <WeatherDetails data={weather.data} />
        )}
      </div>
    </section>
  )
}

function WeatherDetails({ data }: { data: WeatherNow }) {
  const Icon = weatherIcon(data.iconCode)
  const wind = `${data.windMs} m/s${data.windDeg === null ? '' : ` ${compassDirection(data.windDeg)}`}`

  const details: Array<{ icon: LucideIcon; label: string; value: string }> = [
    { icon: Thermometer, label: 'Feels like', value: `${Math.round(data.feelsLikeC)}°C` },
    { icon: Droplets, label: 'Humidity', value: `${data.humidity}%` },
    { icon: Wind, label: 'Wind', value: wind },
    { icon: Cloud, label: 'Cloud cover', value: `${data.cloudiness}%` },
    { icon: CloudRain, label: 'Rain, last hour', value: data.rain1hMm === null ? 'None' : `${data.rain1hMm} mm` },
    { icon: Gauge, label: 'Pressure', value: `${data.pressureHpa} hPa` },
    { icon: Sunrise, label: 'Sunrise', value: formatLocalTime(data.sunrise) },
    { icon: Sunset, label: 'Sunset', value: formatLocalTime(data.sunset) },
  ]

  return (
    <Reveal delay={0.06}>
      <div className="mt-8 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="flex items-center gap-5 rounded-2xl border border-line bg-card p-6 shadow-card">
          <span className="inline-flex size-16 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
            <Icon aria-hidden="true" className="size-9" />
          </span>
          <div className="min-w-0">
            <p className="text-5xl font-extrabold tracking-tight text-ink-950">{`${Math.round(data.tempC)}°C`}</p>
            <p className="mt-1 text-base font-semibold capitalize text-ink-800">{data.description}</p>
            <p className="mt-1 text-sm text-ink-500">
              {`Low ${Math.round(data.tempMinC)}°C · High ${Math.round(data.tempMaxC)}°C`}
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {details.map(({ icon: DetailIcon, label, value }) => (
            <div key={label} className="rounded-2xl border border-line bg-card p-4 shadow-card">
              <dt className="flex items-center gap-1.5 text-xs font-semibold text-ink-500">
                <DetailIcon aria-hidden="true" className="size-3.5 text-brand-600" />
                {label}
              </dt>
              <dd className="mt-1.5 text-base font-extrabold text-ink-950">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="mt-4 text-xs text-ink-500">
        {`Updated ${formatLocalTime(data.observedAt)} · Weather data © `}
        <a
          href={OPENWEATHER_URL}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-brand-700 underline decoration-brand-300 underline-offset-2 hover:text-brand-800"
        >
          OpenWeather
        </a>
        {'. For storm warnings, follow PAGASA and the MDRRMO.'}
      </p>
    </Reveal>
  )
}
