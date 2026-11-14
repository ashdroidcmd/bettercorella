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

- CI deploys now upload the source and let Vercel build remotely, instead of uploading a prebuilt output (`--prebuilt`). The source is uploaded as a single `tgz` archive (`--archive=tgz`), which fixes the "Upload aborted" / `api-upload-free` failures caused by the Hobby plan's limit of 5,000 file uploads per day.
- Vercel's automatic Git deployments are disabled (`vercel.json`); deploys now come only from CI.
- **Rebranded the site to BetterCorella** (Municipality of Corella, Bohol):
  - site name, metadata, structured data, PWA manifest, `llms.txt`, header and footer
  - a new BetterCorella wordmark, favicon, app icons and social preview image (no official LGU seal)
  - `src/config/city.ts` holds only verified LGU facts; unknown figures are `null` and show as pending
  - data pages show an "Information coming soon" notice with a link to share official sources, instead of template data
  - hotlines list the national 911 and 8888 lines until local numbers are verified
  - online services, open data and sources list national portals and datasets
- The town section moved from `/city` to `/town`; old `/city` URLs redirect permanently.
- `README.md`, `CONTRIBUTING.md` and `package.json` describe BetterCorella and credit the BetterInabanga and Better San Fernando projects.
- Switched the package manager from npm to pnpm (`pnpm-lock.yaml`, version pinned via `packageManager`).
- Reorganized `src/` into feature-based folders (`src/features/<feature>/<x>-page/` with a `shared/` folder per feature), matching the team's frontend structure.
- Migrated from Vite + React Router to Next.js 16 (App Router). Every page is now prerendered with its full content in the HTML, which search engines and AI crawlers can read without running JavaScript.
- Service worker moved from vite-plugin-pwa to Serwist.

### Removed

- All template data from BetterInabanga and Better San Fernando (La Union): 249 services, offices, officials, 50 barangays and their map boundaries, news, legislation, projects, budget and procurement figures, places, and town profile text.
- About 750 template assets: Citizen's Charter PDFs, officials' photos, festival, place and news images, and business logos.
- `public/wp-content/`: 496 template PDFs that nothing referenced.
- Language switching (Filipino and Cebuano). The site is English only for now.
