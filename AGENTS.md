# AI Agent Instructions

## Project

**BetterCorella** is a volunteer-run, open-source civic portal for the **Municipality of Corella, Bohol, Philippines**. It shows the LGU's services, officials, barangays, hotlines, budget and news.

- Frontend only. There is no backend or database; typed data lives in each feature's `data/` folder under `src/features/`.
- It is derived from BetterInabanga (ISC). The content still describes **Inabanga** until the Corella rebrand is done. Never mix data from the two towns in a single change.

## Core Rules

1. Understand the task before you change code.
2. Use Graphify (`graphify query "..."`) to find the relevant code. Do not scan the whole repo.
3. Read only the docs, source files and tests the task needs.
4. Follow the existing patterns: React function components, Tailwind classes, feature-based folders (`src/features/<feature>/<x>-page/` plus `shared/`). The site is English only.
5. Make the smallest correct change. No unrelated refactors, dependency bumps or mass reformatting.
6. Test what you changed, and update the docs and `CHANGELOG.md` to match.
7. Review `git status` and `git diff` before you report completion.

## Context Order

1. `AGENTS.md`, then `CLAUDE.md`
2. Graphify: `graphify query`, `graphify explain`, `graphify path`
3. Relevant `../docs/` (workspace folder next to the repo, not in git)
4. Relevant source in `src/`
5. Relevant tests: `src/**/*.test.ts(x)` (Vitest) and `e2e/*.spec.ts` (Playwright)

## Before Coding, Identify

- The affected route (`src/app/<route>/page.tsx`) and its feature page (`src/features/<feature>/<x>-page/`)
- Affected components and data (the page folder, the feature's `shared/`, or `src/components/`)
- Affected tests, docs, screenshots and user-manual pages

## Data Rules

- Every public figure, official, hotline or service must cite an official source (LGU, PSA, DILG, BLGF, PhilGEPS) through the existing `sources` / `SourceNote` pattern.
- Never add personal data about private citizens, patient information, credentials or API keys. Anything in this repo is shipped to browsers and is public.

## Testing

| Change | Run |
| --- | --- |
| Any code | `npm run lint`, `npm test`, `npm run build` |
| UI, routes, navigation | `npm run test:e2e` as well |

Do not report completion while relevant tests fail.

## Documentation

Update only what the change affects:

- `../docs/` for technical changes
- `../screenshots/` for significant UI changes
- `../user-manual/` for changes to what residents see or do
- `CHANGELOG.md` for any meaningful change
- `graphify update .` after code changes (AST only, no API cost)

## Final Report

Report a summary, the files changed, the tests run with their results, the docs updated, and any remaining issues.
