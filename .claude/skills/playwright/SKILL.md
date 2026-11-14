---
name: playwright
description: How to write, run and debug Playwright end-to-end tests in BetterCorella. Use when adding/changing UI behaviour, routes or navigation.
---

# Playwright

- Config: `playwright.config.ts`. Tests: `e2e/*.spec.ts`. Playwright runs `npm run build && npm run start` on port 3000 automatically, or reuses a server already running there.
- Run with `npm run test:e2e` (Chromium), `npm run test:e2e:all` (Firefox, WebKit, mobile), `npm run test:e2e:ui`, `npm run test:e2e:headed`, or `npx playwright test e2e/smoke.spec.ts -g "/news"`.
- Debug with `npx playwright test --debug` or `npm run test:e2e:report`. Traces are kept on failure under `test-results/`.
- Record a new test with `npx playwright codegen http://localhost:3000`, then clean it up.

## Conventions

- One spec file per feature area, e.g. `e2e/services.spec.ts` or `e2e/barangays.spec.ts`. Add new routes to the `PAGES` list in `e2e/smoke.spec.ts`.
- Use semantic selectors (`getByRole`, `getByLabel`, `getByPlaceholder`, `getByText`). Don't select on Tailwind classes.
- Collect `pageerror` events and assert there are none.
- Skip desktop-only interactions on mobile with `test.skip(isMobile, ...)`.
- Keep assertions brand-neutral unless the test is about branding.
