/**
 * Peso and CSV helpers for the budget pages.
 * Ported from bettergovph/transparency-portal `src/lib/format.ts` and `src/lib/csv.ts` (MIT).
 */
import type { GaaRow, ScopedProject } from './scope.ts'
import { departmentShort, hasYear } from './scope.ts'
import { GAA_YEARS } from './types.ts'

/** Pesos, the way budget.bettergov.ph prints them: ₱4.74B, ₱369.4M, ₱850K. null is "—", never zero. */
export function php(n: number | null | undefined): string {
  if (n == null || !Number.isFinite(n)) return '—'
  const a = Math.abs(n)
  const [div, suffix] = a >= 1e12 ? [1e12, 'T'] : a >= 1e9 ? [1e9, 'B'] : a >= 1e6 ? [1e6, 'M'] : a >= 1e3 ? [1e3, 'K'] : [1, '']
  if (div === 1) return '₱' + Math.round(n).toLocaleString('en-US')
  const v = n / div
  const digits = Math.abs(v) >= 100 ? 1 : 2
  return '₱' + v.toLocaleString('en-US', { maximumFractionDigits: digits, minimumFractionDigits: 1 }) + suffix
}

/** Exact pesos: ₱4,744,932,000. */
export function phpFull(n: number | null | undefined): string {
  if (n == null || !Number.isFinite(n)) return '—'
  return '₱' + Math.round(n).toLocaleString('en-US')
}

/** A signed change: +₱150.0M, −₱14.00B, or "no change". */
export function phpDelta(n: number | null | undefined): string {
  if (n == null || !Number.isFinite(n)) return '—'
  if (n === 0) return 'no change'
  return (n > 0 ? '+' : '−') + php(Math.abs(n))
}

export function plural(n: number, one: string, many = one + 's'): string {
  return `${n.toLocaleString('en-US')} ${n === 1 ? one : many}`
}

/** "November 17, 2026" in Philippine time. */
export function longDate(iso: string): string {
  const d = new Date(iso)
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Manila' })
}

function cell(v: string | number | null | undefined): string {
  if (v == null) return ''
  const s = String(v)
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

const PROJECT_COLUMNS: [string, (p: ScopedProject) => string | number | null][] = [
  ['program', (p) => p.dataset],
  ['id', (p) => p.id],
  ['title', (p) => p.title],
  ['program_line', (p) => p.program],
  ['sub_line', (p) => p.pap],
  ['dpwh_office', (p) => p.office],
  ['region', (p) => p.region],
  ['status', (p) => p.status_label],
  ['unconfirmed_match', (p) => (p.held ? 'yes' : 'no')],
  ['nep_php', (p) => p.nep_php],
  ['house_bill_php', (p) => p.house_php],
  ['change_php', (p) => p.delta_php],
  ['nep_pdf', (p) => p.pdf_url.nep ?? null],
  ['house_bill_pdf', (p) => p.pdf_url.hgab3 ?? p.pdf_url.hgab2 ?? null],
  ['url', (p) => p.url],
]

/** Every FY2027 line as one CSV, with exact pesos and the source page links. */
export function projectsCsv(projects: readonly ScopedProject[]): string {
  const lines = [PROJECT_COLUMNS.map(([h]) => h).join(',')]
  for (const p of projects) lines.push(PROJECT_COLUMNS.map(([, f]) => cell(f(p))).join(','))
  return lines.join('\r\n') + '\r\n'
}

/** Every GAA row as one CSV: a column per year, exact pesos. */
export function gaaCsv(rows: readonly GaaRow[]): string {
  const head = ['department', 'agency_id', 'name', ...GAA_YEARS.map((y) => `gaa_${y}_php`), 'family_key']
  const lines = [head.join(',')]
  for (const r of rows) {
    lines.push(
      [
        departmentShort(r.department),
        r.agency_id,
        r.name,
        ...GAA_YEARS.map((y) => (hasYear(r, y) ? r.years[String(y)]!.amount : '')),
        r.fam_key,
      ]
        .map(cell)
        .join(','),
    )
  }
  return lines.join('\r\n') + '\r\n'
}

export function downloadText(filename: string, text: string, type = 'text/csv;charset=utf-8') {
  // A BOM so spreadsheet apps read the peso sign and accented names correctly.
  const blob = new Blob(['﻿', text], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
