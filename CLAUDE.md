# Claude Code Instructions

Read `AGENTS.md` first. It holds the project rules. This file adds Claude-specific notes.

## Project

- **Name:** BetterCorella, the civic portal for the Municipality of Corella, Bohol
- **Maintainer:** ashdroidcmd (GitHub)
- **Frontend:** Vite 8, React 19, TypeScript 6, React Router 7, Tailwind CSS 4, Motion and Lenis, Lucide icons, MapLibre GL
- **Backend / Database:** none (static site; data in `src/data/*.ts`)
- **Language:** English only (language switching was removed; no i18n layer)
- **PWA:** vite-plugin-pwa. A build plugin in `vite.config.ts` prerenders route metadata, `sitemap.xml` and `robots.txt`.
- **Status:** forked from BetterInabanga, so the content still says Inabanga and the rebrand is pending.

## Commands

| Task | Command |
| --- | --- |
| Dev server | `npm run dev` (http://localhost:5173) |
| Lint | `npm run lint` (oxlint) |
| Unit tests | `npm test` (Vitest, `src/**/*.test.ts(x)`) |
| E2E tests | `npm run test:e2e` (Playwright, Chromium) |
| E2E all browsers | `npm run test:e2e:all` |
| E2E UI mode | `npm run test:e2e:ui` |
| Production build | `npm run build`, then `npm run preview` |

## Skills

Project skills live in `.claude/skills/`: `development-workflow`, `playwright`, `documentation`, `changelog`.

## Playwright

- Tests: `e2e/`. Config: `playwright.config.ts`. It starts Vite on port 5173 automatically.
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
