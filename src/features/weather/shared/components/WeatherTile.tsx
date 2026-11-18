'use client'

import type { WeatherState } from '../hooks/useCurrentWeather.ts'
import { weatherIcon } from '../utils/weatherIcon.ts'

/** Compact "weather now" tile for the dark home hero. Renders nothing when weather is unavailable. */
export function WeatherTile({ weather }: { weather: WeatherState }) {
  if (weather.status === 'unavailable') return null

  if (weather.status === 'loading') {
    return (
      <div
        aria-hidden="true"
        className="h-[76px] animate-pulse rounded-2xl border border-white/15 bg-white/10 sm:h-[84px]"
      />
    )
  }

  const { data } = weather
  const Icon = weatherIcon(data.iconCode)

  return (
    <a
      href="#weather"
      className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm transition hover:border-white/35 hover:bg-white/15 sm:p-5"
    >
      <Icon aria-hidden="true" className="size-9 shrink-0 text-accent" />
      <span className="min-w-0">
        <span className="block text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          {`${Math.round(data.tempC)}°C`}
        </span>
        <span className="block truncate text-sm font-semibold capitalize text-white/85">
          {`Weather now · ${data.description}`}
        </span>
      </span>
    </a>
  )
}
