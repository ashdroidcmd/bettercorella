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

- Official cards are text-only (role, name, term, profile link); no portrait frame.
- ZIP code 6337 added to the LGU profile.
- README, CLAUDE.md and AGENTS.md describe the current data status; remaining "city" wording in search examples and labels changed to "municipal".
- Interactive barangay map is back for Corella: the 8 barangay boundaries from the PSA/NAMRIA 2023 administrative boundaries (`public/data/barangay-boundaries.geojson`), centred on Corella, with population bands and colors sized for Corella's barangays.
- Google Maps embeds (`src/components/ui/MapEmbed.tsx`, lazy, no API key) on the town profile, the contact page (Municipal Hall) and the barangays page, with an "Open in Google Maps" link; the privacy page mentions the embed.
- Town profile page rebuilt with Corella facts (district, income class, PSGC code, barangays, patroness and fiesta) and a short history from the official municipal website; headline stats on the home and About pages; Corella sources listed first on the About page; Life and Business pages link to the official "What to see", history, business permit services and online permit application.
- 86 municipal services from the Corella Citizen's Charter 2026 (2nd edition), across 14 offices and all 12 service categories. Each record has the office, classification, transaction type, who may avail, the charter's description, processing time, the peso amounts listed and a link to its charter page.
- Online services: Corella's online business permit application and LBP online payment are listed first, and the two business permit services are marked "Available online".
- Government data for Corella:
  - **officials:** mayor, vice mayor, 7 Sangguniang Bayan members, ABC and SK Federation presidents (official municipal website, term 2025–2028)
  - **barangays:** 8 barangays with PSA codes and 2024 population, 2020/2015 census figures, computed share and growth, and Cancatac's barangay council
  - **offices:** 14 municipal offices with phone numbers and office emails from the Citizen's Charter 2026
  - **hotlines:** Municipal Hall, MDRRMO and Municipal Health Office numbers added after 911
  - official cards without portraits show initials instead of an empty photo frame; empty election history is hidden; barangay and office pages no longer show template numbers ("of 50", city population) or "city" wording
- LGU profile (`src/config/city.ts`) filled with verified facts: 2024 population 9,889 and 2020 population 9,479, 8 barangays, 4th income class (PSA), 1st District and 37.22 km² land area (Province of Bohol), Municipal Hall address, phone (038) 422-3865, email, official website, Citizen's Charter, Facebook page and tagline (corella-bohol.gov.ph).
- New BetterCorella logo: Corella's PSA/NAMRIA map outline in blue with the Philippine flag sun, plus a "Better Corella" wordmark in Plus Jakarta Sans. Header and footer use the horizontal logo; favicon, app icons and the social preview image use the new mark.
- New color palette matched to the BetterCorella logo: Philippine blue `#0038A8` as the brand color (buttons, links, theme color) and sun gold `#FCD116` as the accent. The template's sky blue is gone.
- The site font is now Plus Jakarta Sans (self-hosted by `next/font`), replacing Figtree.
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

- Global site search: the header search button, the Ctrl/Cmd+K command palette, the `/search` page and the hero search bars on the home, services and category pages. The home and services pages link straight to popular services instead. In-page list filters (barangays, offices, services) stay.
- All template data from BetterInabanga and Better San Fernando (La Union): 249 services, offices, officials, 50 barangays and their map boundaries, news, legislation, projects, budget and procurement figures, places, and town profile text.
- About 750 template assets: Citizen's Charter PDFs, officials' photos, festival, place and news images, and business logos.
- `public/wp-content/`: 496 template PDFs that nothing referenced.
- Language switching (Filipino and Cebuano). The site is English only for now.
