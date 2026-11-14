# Changelog

All notable changes to BetterCorella are recorded here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- GitHub Actions CI/CD (`.github/workflows/ci.yml`):
  - lint, typecheck, unit tests, production build and Playwright tests on every pull request and every push to `main`
  - a Vercel preview deploy for each PR (same-repo branches only), with the URL posted on the PR
  - a production deploy from `main`, only after every check passes
  - automatic deletion of a merged PR's branch after a successful production deploy
- `pnpm typecheck` script.
- Started BetterCorella, the civic guide for the Municipality of Corella, Bohol, from the BetterInabanga template (ISC), with an ISC `LICENSE` crediting the original authors.
- Playwright end-to-end tests (`e2e/`, `playwright.config.ts`): a smoke suite covering the main routes, the not-found page and the command palette, plus checks that page content and metadata are in the server HTML.
- Graphify knowledge graph setup (`.graphifyignore`, git hooks).
- AI workflow docs: `AGENTS.md`, `CLAUDE.md` and `.claude/skills/`.
- Project metadata in `package.json`: homepage, repository, issue tracker and the minimum Node.js version (22.18).

### Changed

- Vercel's automatic Git deployments are disabled (`vercel.json`); deploys now come only from CI.
- **Rebrand to Corella (in progress):** `README.md`, `CONTRIBUTING.md` and `package.json` now describe BetterCorella. They point to the `ashdroidcmd/bettercorella` repository and `bettercorella.vercel.app`, and credit the BetterInabanga and Better San Fernando projects. Site pages and data are rebranded in later steps.
- Switched the package manager from npm to pnpm (`pnpm-lock.yaml`, version pinned via `packageManager`).
- Reorganized `src/` into feature-based folders (`src/features/<feature>/<x>-page/` with a `shared/` folder per feature), matching the team's frontend structure.
- Migrated from Vite + React Router to Next.js 16 (App Router). Every page is now prerendered with its full content in the HTML, which search engines and AI crawlers can read without running JavaScript.
- Service worker moved from vite-plugin-pwa to Serwist.

### Removed

- Language switching (Filipino and Cebuano). The site is English only for now.
