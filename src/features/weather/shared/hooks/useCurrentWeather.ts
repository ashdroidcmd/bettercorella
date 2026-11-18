'use client'

import { useEffect, useState } from 'react'
import type { WeatherNow } from '../types/weather.ts'

export type WeatherState =
  | { status: 'loading' }
  | { status: 'ready'; data: WeatherNow }
  | { status: 'unavailable' }

/**
 * Loads current conditions from `/api/weather` after the page renders. Weather is an extra: when the
 * key is not set, the API is down or the visitor is offline, the state becomes `unavailable` and the
 * weather UI hides itself.
 */
export function useCurrentWeather(): WeatherState {
  const [state, setState] = useState<WeatherState>({ status: 'loading' })

  useEffect(() => {
    let active = true
    fetch('/api/weather', { headers: { accept: 'application/json' } })
      .then((res) => {
        if (!res.ok) throw new Error(`Weather ${res.status}`)
        return res.json() as Promise<WeatherNow>
      })
      .then((data) => {
        if (active) setState({ status: 'ready', data })
      })
      .catch(() => {
        if (active) setState({ status: 'unavailable' })
      })
    return () => {
      active = false
    }
  }, [])

  return state
}
