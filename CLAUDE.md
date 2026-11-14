# Claude Code Instructions

Read `AGENTS.md` first. It holds the project rules. This file adds Claude-specific notes.

## Project

- **Name:** BetterCorella, the civic portal for the Municipality of Corella, Bohol
- **Maintainer:** ashdroidcmd (GitHub)
- **Frontend:** Next.js 16 (App Router), React 19, TypeScript 6, Tailwind CSS 4, Motion and Lenis, Lucide icons, MapLibre GL
- **Backend / Database:** none (static site; data in `src/data/*.ts`)
- **Language:** English only (language switching was removed; no i18n layer)
- **Rendering:** every route is prerendered to static HTML at build time (`generateStaticParams` for dynamic routes), so page content is in the HTML for search engines.
- **Layout:** routes in `src/app/` are thin server files (metadata + static params) that render a client view from `src/views/`. Shared UI is in `src/components/`, data in `src/data/`.
- **SEO:** `src/data/routeMetadata.ts` is the single list of routes. It drives `generateMetadata` (`src/lib/metadata.ts`), JSON-LD (`RouteJsonLd`), `/sitemap.xml` and static params. Add new routes there.
- **PWA:** Serwist (`@serwist/turbopack`). The worker source is `src/sw.ts`, served at `/serwist/sw.js`.
- **Site URL:** `NEXT_PUBLIC_SITE_URL` (default `https://bettercorella.vercel.app`), set in `src/lib/site.ts`.
- **Status:** forked from BetterInabanga, so the content still says Inabanga and the rebrand is pending.

## Commands

| Task | Command |
| --- | --- |
| Dev server | `npm run dev` (http://localhost:3000) |
| Lint | `npm run lint` (oxlint) |
| Unit tests | `npm test` (Vitest, `src/**/*.test.ts(x)`) |
| E2E tests | `npm run test:e2e` (Playwright, Chromium) |
| E2E all browsers | `npm run test:e2e:all` |
| E2E UI mode | `npm run test:e2e:ui` |
| Production build | `npm run build`, then `npm run start` (http://localhost:3000) |

## Skills

Project skills live in `.claude/skills/`: `development-workflow`, `playwright`, `documentation`, `changelog`.

## Playwright

- Tests: `e2e/`. Config: `playwright.config.ts`. It builds and starts the production server on port 3000 automatically, or reuses one already running there.
- Prefer `getByRole`, `getByLabel` and `getByText`. Avoid CSS-class selectors, since Tailwind classes change often.
- Keep assertions brand-neutral where possible. Don't assert on "Inabanga" or "Corella" unless the test is about branding.

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
