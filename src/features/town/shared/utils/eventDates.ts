import type { EventSchedule } from '../types/tourism.ts'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export function monthName(month: number) {
  return MONTHS[month - 1] ?? ''
}

/** "Every April 27" or "Every year, early September". */
export function scheduleLabel(schedule: EventSchedule) {
  return schedule.kind === 'annual-fixed'
    ? `Every ${monthName(schedule.month)} ${schedule.day}`
    : `Every year, ${schedule.text.charAt(0).toLowerCase()}${schedule.text.slice(1)}`
}

/**
 * Next date of a fixed annual event, on or after `today` (Philippine calendar date, YYYY-MM-DD).
 * Returns null for events whose dates are set each year.
 */
export function nextOccurrence(schedule: EventSchedule, today: string): string | null {
  if (schedule.kind !== 'annual-fixed') return null
  const [year] = today.split('-').map(Number) as [number]
  const pad = (n: number) => String(n).padStart(2, '0')
  const thisYear = `${year}-${pad(schedule.month)}-${pad(schedule.day)}`
  return thisYear >= today ? thisYear : `${year + 1}-${pad(schedule.month)}-${pad(schedule.day)}`
}

/** Year of the next celebration: this year until the event's month has passed, then next year. */
export function upcomingYear(schedule: EventSchedule, today: string) {
  const next = nextOccurrence(schedule, today)
  if (next) return Number(next.slice(0, 4))
  const [year, month] = today.split('-').map(Number) as [number, number]
  return month > schedule.month ? year + 1 : year
}

/** Today's date in Corella (Asia/Manila), as YYYY-MM-DD. */
export function manilaToday(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Manila' }).format(now)
}

/** "Tue, Apr 27, 2027" for a YYYY-MM-DD date. */
export function formatEventDate(isoDate: string) {
  return new Intl.DateTimeFormat('en-PH', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${isoDate}T00:00:00Z`))
}

/** 1 → "1st", 142 → "142nd", 111 → "111th". */
export function ordinal(n: number) {
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`
  return `${n}${{ 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] ?? 'th'}`
}

/** The anniversary number for a given year, e.g. founded 1884 → 2027 is the 143rd. */
export function anniversaryOrdinal(sinceYear: number, year: number) {
  return ordinal(year - sinceYear)
}
