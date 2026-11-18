// Best-effort only: each serverless instance keeps its own counts in memory.
const LIMIT = 5
const WINDOW_MS = 60 * 60 * 1000
const recent = new Map<string, number[]>()

/** Records a hit for `key` and returns true when it is over 5 per hour. */
export function isRateLimited(key: string, now = Date.now()) {
  const hits = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  const limited = hits.length >= LIMIT
  recent.set(key, limited ? hits : [...hits, now])
  return limited
}

export function resetRateLimit() {
  recent.clear()
}
