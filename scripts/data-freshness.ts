// Prints the data-freshness table before each build and flags stale datasets in GitHub Actions.
// Runs with Node's built-in TypeScript type stripping (Node 22.18+ / 24).
import { appendFile } from 'node:fs/promises'
import { formatDataFreshnessReport, getDataFreshness } from '../src/data/dataFreshness.ts'

const report = formatDataFreshnessReport()
console.info(`\n${report}`)

if (process.env.GITHUB_ACTIONS === 'true') {
  for (const row of getDataFreshness().filter((r) => r.status !== 'current')) {
    const reason = row.status === 'unknown' ? 'verification date is missing' : `${row.ageDays} days since verification`
    console.warn(`::warning title=Data review needed::${row.dataset}: ${reason}. Source: ${row.source}`)
  }
}
if (process.env.GITHUB_STEP_SUMMARY) {
  await appendFile(process.env.GITHUB_STEP_SUMMARY, `### Data freshness\n\n${report}\n`, 'utf8')
}
