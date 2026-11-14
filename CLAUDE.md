# Claude Code Instructions

Read `AGENTS.md` first. It holds the project rules. This file adds Claude-specific notes.

## Project

- **Name:** BetterCorella, the civic portal for the Municipality of Corella, Bohol
- **Maintainer:** ashdroidcmd (GitHub)
- **Frontend:** Next.js 16 (App Router), React 19, TypeScript 6, Tailwind CSS 4, Motion and Lenis, Lucide icons, MapLibre GL
- **Backend / Database:** none (static site; typed data in each feature's `data/` folder)
- **Package manager:** pnpm (version pinned in `package.json` `packageManager`; run `corepack enable` once). Use `pnpm add`, never `npm install`. Dependencies allowed to run install scripts are listed in `pnpm-workspace.yaml`.
- **Language:** English only (language switching was removed; no i18n layer)
- **Rendering:** every route is prerendered to static HTML at build time (`generateStaticParams` for dynamic routes), so page content is in the HTML for search engines.
- **Structure (feature-based):**
  - `src/app/`: Next.js routes only. Each `page.tsx` sets metadata and static params, then renders a feature page.
  - `src/features/<feature>/<x>-page/`: one folder per page, holding the page component, `index.tsx` (re-export) and, when needed, `components/`, `hooks/`, `types/`, `utils/` and `data/`.
  - `src/features/<feature>/shared/`: code used by more than one page of that feature (`components/`, `data/`, `types/`, `utils/`).
  - `src/components/{layout,ui,seo}`: feature-agnostic UI (site shell, building blocks, JSON-LD).
  - `src/config/`: `site.ts` (site name/URL) and `city.ts` (LGU identity).
  - `src/lib/`: `utils.ts`, `seo/` (metadata + route list), `dataFreshness.ts` and cross-feature data tests.
  - Features: `home`, `services`, `government`, `town`, `transparency`, `news`, `search`, `info`.
  - Import with relative paths inside `src/features` and `src/lib` (the data files must also load in plain Node for `scripts/data-freshness.ts`). Files in `src/app/` use `@/`.
- **SEO:** `src/lib/seo/routeMetadata.ts` is the single list of routes. It drives `generateMetadata` (`src/lib/seo/metadata.ts`), JSON-LD (`RouteJsonLd`), `/sitemap.xml` and static params. Add new routes there.
- **PWA:** Serwist (`@serwist/turbopack`). The worker source is `src/sw.ts`, served at `/serwist/sw.js`.
- **Site URL:** `NEXT_PUBLIC_SITE_URL` (default `https://bettercorella.vercel.app`), set in `src/config/site.ts`.
- **Status:** rebranded to Corella, Bohol. Corella data is pending verification, so data pages render `ComingSoon` / `PendingPage` (`src/components/ui/`) until records are added.
- **Adding data:** fill the feature's `data/` file with records that cite an official `sourceUrl` and a `lastVerified` date, and set verified fields in `src/config/city.ts`. Pages switch from the coming-soon state to the full layout automatically.

## Commands

| Task | Command |
| --- | --- |
| Dev server | `pnpm dev` (http://localhost:3000) |
| Lint | `pnpm lint` (oxlint) |
| Typecheck | `pnpm typecheck` |
| Unit tests | `pnpm test` (Vitest, `src/**/*.test.ts(x)`) |
| E2E tests | `pnpm test:e2e` (Playwright, Chromium) |
| E2E all browsers | `pnpm test:e2e:all` |
| E2E UI mode | `pnpm test:e2e:ui` |
| Production build | `pnpm build`, then `pnpm start` (http://localhost:3000) |

## CI/CD

`.github/workflows/ci.yml` runs lint, typecheck, unit tests, build and e2e on every PR and every push to `main`. A deploy to Vercel (a preview for PRs, production for `main`) happens only after all of them pass. After a production deploy, the merged PR's branch is deleted. Vercel's Git auto-deploy is disabled in `vercel.json`. Keep the workflow passing: don't merge red PRs.

## Rebrand checklist

The remaining rebrand and data work is tracked in `../TODO.md` (workspace root, next to `../docs/`; not in git). Read it before picking up rebrand or data tasks, and tick items off when done.

## Skills

Project skills live in `.claude/skills/`: `development-workflow`, `playwright`, `documentation`, `changelog`.

## Playwright

- Tests: `e2e/`. Config: `playwright.config.ts`. It builds and starts the production server on port 3000 automatically, or reuses one already running there.
- Prefer `getByRole`, `getByLabel` and `getByText`. Avoid CSS-class selectors, since Tailwind classes change often.
- Keep assertions brand-neutral where possible. Only the `Corella rebrand` block in `e2e/smoke.spec.ts` asserts on branding.

## Style

Match the surrounding code. Keep things simple, add no new abstractions without a need, and keep comments short.

## Completion

Before you report done: lint, unit tests and build pass; e2e passes for UI changes; docs and CHANGELOG are updated; `graphify update .` has run; `git diff` is reviewed.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
