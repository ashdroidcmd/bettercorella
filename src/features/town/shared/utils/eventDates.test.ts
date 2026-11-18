import { describe, expect, it } from 'vitest'
import {
  anniversaryOrdinal,
  formatEventDate,
  manilaToday,
  nextOccurrence,
  ordinal,
  scheduleLabel,
  upcomingYear,
} from './eventDates.ts'

const fiesta = { kind: 'annual-fixed', month: 4, day: 27 } as const
const anniversary = { kind: 'annual-approx', month: 9, text: 'Early September' } as const

describe('event dates', () => {
  it('finds the next fiesta date', () => {
    expect(nextOccurrence(fiesta, '2026-11-18')).toBe('2027-04-27')
    expect(nextOccurrence(fiesta, '2027-04-26')).toBe('2027-04-27')
    expect(nextOccurrence(fiesta, '2027-04-27')).toBe('2027-04-27')
    expect(nextOccurrence(fiesta, '2027-04-28')).toBe('2028-04-27')
  })

  it('has no fixed next date for events set each year', () => {
    expect(nextOccurrence(anniversary, '2026-11-18')).toBeNull()
  })

  it('finds the upcoming celebration year', () => {
    expect(upcomingYear(anniversary, '2026-08-20')).toBe(2026)
    expect(upcomingYear(anniversary, '2026-09-02')).toBe(2026)
    expect(upcomingYear(anniversary, '2026-11-18')).toBe(2027)
    expect(upcomingYear(fiesta, '2026-11-18')).toBe(2027)
  })

  it('labels schedules', () => {
    expect(scheduleLabel(fiesta)).toBe('Every April 27')
    expect(scheduleLabel(anniversary)).toBe('Every year, early September')
  })

  it('formats dates with the weekday', () => {
    expect(formatEventDate('2027-04-27')).toMatch(/Tue.*Apr.*27.*2027/)
  })

  it('uses the Manila calendar date', () => {
    // 2026-11-18 17:00 UTC is already 2026-11-19 in Manila.
    expect(manilaToday(new Date('2026-11-18T17:00:00Z'))).toBe('2026-11-19')
  })

  it('numbers anniversaries', () => {
    expect(anniversaryOrdinal(1884, 2026)).toBe('142nd')
    expect(anniversaryOrdinal(1884, 2027)).toBe('143rd')
    expect(ordinal(1)).toBe('1st')
    expect(ordinal(11)).toBe('11th')
    expect(ordinal(112)).toBe('112th')
    expect(ordinal(121)).toBe('121st')
  })
})
