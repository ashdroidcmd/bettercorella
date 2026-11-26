# Changelog

All notable changes to BetterCorella are recorded here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Loading splash on first page load: the logo in the center with a short blue loading bar (yellow leading edge) just below it, in light and dark (`SplashScreen.tsx`, rendered in the root layout). It stays invisible for the first 300 ms, so fast and repeat visits never see it. It completes and fades out once the app hydrates. It also hides itself after 4 s, or never shows without JavaScript, and it never reappears on client-side navigation.

- Light and dark mode: a sun/moon switch in the header. The site follows the device setting until a visitor picks a theme, then remembers the choice (`localStorage`, key `bettercorella-theme`). A small inline script in `layout.tsx` applies the theme before first paint, so pages don't flash. Dark mode remaps the color tokens in `src/index.css` under `:root.dark`. New fixed tokens (`card`, `night`, `primary`, `primary-hover`, `brand-strong`) replace `bg-white`, dark-section `bg-ink-950` and solid brand button fills, so heroes, the footer and white-on-blue buttons look the same in both themes. Use `bg-card` instead of `bg-white` for surfaces from now on. The header shows the light logo in dark mode, and the browser theme color follows the OS scheme.

- Business directory on `/town/business` (was a placeholder):
  - "Local businesses and services": short listing cards that open a details dialog (offerings, location, hours, contact, source). The first listing is the maintainer's "Developer for hire" service (AI, web, games, automation, IoT, ESP32, Arduino), marked as listed by the maintainer.
  - "Register your business": a free directory-listing form, built but **hidden for now** (`SHOW_BUSINESS_FORM` in `BusinessPage.tsx`) (name, category, offer, barangay, address, hours, at least one public contact, optional logo, and review-only owner name and permit number). A new route, `/api/business-listings`, posts each request to Discord (`DISCORD_BUSINESS_WEBHOOK_URL`, falling back to `DISCORD_SUGGESTIONS_WEBHOOK_URL`). The page says clearly that a listing is not a business permit.
  - "Permits and business portals": the official permit and registration links as cards.
  - A logo folder, `src/assets/business/`, and a "Local business directory" row in the data-sources table.

- Tourism and events page at `/town/life` (was the "Life and tourism" placeholder):
  - Events and fiestas: the Town Fiesta of Nuestra Señora del Villar (every April 27, with the next date shown) and Adlaw sa Corella, the founding anniversary (early September; 142nd in 2026).
  - Tourist spots: the Philippine Tarsier Sanctuary (hours, admission, visitor rules), the Corella Church of Nuestra Señora del Villar and Green Thumb Farm, shown as short cards (name, barangay, two-line summary, hours and lowest fee) that open a details dialog with hours, admission, tips, contact, directions and the source. Details not yet on an official page are marked "confirm before visiting".
  - A "Suggest a spot or event" form, built but **hidden for now** (`SHOW_SUGGEST_FORM` in `LifePage.tsx`) (title, when, barangay, venue, details, fees, link, optional photo and contact). A new server route, `/api/suggestions`, posts each suggestion to a private Discord channel through a webhook (`DISCORD_SUGGESTIONS_WEBHOOK_URL`), with mentions disabled, a honeypot, a minimum fill time, a per-connection rate limit and photo checks. Volunteers review suggestions and add them by hand.
  - A photo folder, `src/assets/tourism/{spots,events}/`, with a README on naming and credits.
  - "Tourist spots" and "Events and fiestas" rows in the data-sources table.
- Current weather for Corella on the home page: a tile in the hero's "Town at a glance" panel and a "Weather in Corella" section (temperature, condition, feels-like, humidity, wind, clouds, rain, pressure, sunrise and sunset), from the OpenWeather Current Weather API (free tier) with attribution. A new server route `/api/weather` keeps the key (`OPENWEATHER_API_KEY`) private and caches readings for 10 minutes. The weather hides itself when the key is missing or the API is unreachable. See `../docs/features/weather.md`.
- `.env.example` listing the environment variables.

- Budget portal at `/transparency/budget`, ported from BetterGov's [transparency-portal](https://github.com/bettergovph/transparency-portal) template (MIT) into the Next.js site:
  - FY2027 lines that name Corella, Bohol (NEP against House Bill 10858; DPWH, FMR, HFEP, NIA). Each line has status filters, search and CSV export.
  - Enacted GAA 2020–2026 lines naming Corella, with year totals and CSV export.
  - The Bohol 1st DEO budget by year.
  - A "How these lists are built" section that lists every query and rule, with the API's notices shown verbatim.
  - A static detail page for each FY2027 line at `/transparency/budget/<program>/<slug>`, with amounts per version and links to the exact pages of the budget documents.
  - Data comes from the BetterGov.ph Budget API through a committed snapshot (`pnpm sync:budget`, `scripts/sync-budget.ts`). The browser refreshes the FY2027 list live when the API is reachable.
  - Scope rules keep New Corella, Davao del Norte out, and a unit test enforces them.
  - Corella's own municipal budget (BLGF/FDP) is still shown as "coming soon".
- The About page has a "Data sources by section" table (`/about#data-sources`) listing every dataset with its source, record count and last-checked date, read from `src/lib/dataFreshness.ts`.
- The home page ends with the Municipal Hall card (address, trunkline, email and map), shared with the contacts page (`MunicipalHallCard`).
- Office heads and staff for the 14 offices with a page on the official municipal website, read from each page's poster, plus two offices from the website that were not in the charter (Human Resource Management, Tourism). Office pages show an "Office staff" list. The Government page has a new "National agencies in Corella" section (PNP, DILG, BFP, Post Office, COMELEC, BIR) with heads and contacts from the LGU's National Government Agencies page.
- Barangay pages show the full council for all 8 barangays (Punong Barangay, 7 kagawads, SK chairperson, secretary and treasurer), read from the officials' photos on each barangay's page on the official municipal website, and a new "How <barangay> got its name" history section.
- Corella Police Station (PNP) and Corella Fire Station (BFP) hotlines, plus extra MDRRMO (Smart, Globe) and Rural Health Unit numbers listed after the Citizen's Charter ones. The header hotline bar now shows emergency lines only (911, PNP, Fire, MDRRMO); the Municipal Hall number stays on the hotlines and contact pages.
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

- Search-engine site name is now "Corella, Bohol" (`SITE_DISPLAY_NAME` in `src/config/site.ts`), used the same way in the WebSite JSON-LD `name`, `og:site_name` and `application-name`, so Google gets one consistent name instead of falling back to "Vercel". "BetterCorella, Bohol" and "BetterCorella" stay as JSON-LD `alternateName`s, and the home `<title>` is unchanged.

- `Reveal` scroll animations no longer leave sections blank before JavaScript loads. They are now CSS-driven: sections are visible by default and only start hidden under `html.reveal-ready`, which the init script in `layout.tsx` sets and drops again if the app hasn't hydrated within 4 s. Reduced-motion users get no animation. Motion is no longer used by `Reveal`.

- Transparency is one page. `/transparency` is now the budget page: national budget lines naming Corella, then an "Official sources" list (DILG Full Disclosure Policy, BLGF, PhilGEPS, COA and the DPWH dataset) for records not on the site yet. The procurement, infrastructure projects and open-data pages, which had no Corella data, are removed along with their empty data files (`budgetDocs`, `bidDocs`, `projects`, `openData`) and data-freshness rows. `/transparency/budget`, `/transparency/procurement`, `/transparency/projects` and `/transparency/open-data` redirect to `/transparency`. Project detail pages stay at `/transparency/budget/<program>/<slug>`.

- Hotlines merged into the Contacts page (`/contact`): hotlines first (911 banner and local cards), then the Municipal Hall with its map, then feedback. The "Official channels" links are removed (the About page lists the official sources). `/government/hotlines` redirects to `/contact#hotlines`. The government page no longer repeats the emergency numbers; its "Hotlines" tile links to the contacts page. The yellow emergency box, the "About this guide" box and the bottom source note are removed, and so are the Facebook and GitHub icons in the footer.
- Home hero uses a photo of the Corella church (`src/assets/hero-corella-church.jpg`) behind a dark navy overlay. Its "Town at a glance" card shows three figures (population and barangays side by side, land area full width); the income class stays on the About page.
- Header: the "Citizen Feedback" button is removed, "Hotlines & Contact" is renamed "Contacts", an "About" link is added after it, and the nav links are aligned to the right. The feedback section on the contact page is unchanged.
- Services pages show the Citizen's Charter source note and link in the page header (new `source` prop on `PageHero`) instead of at the bottom, so it is seen first. The service category page no longer has the "Other service categories" section.
- Simpler footer (BetterCainta style): logo, short description and Facebook/GitHub icons; "Quick links" (town, online services, about, contact, FAQ, sitemap, terms, privacy, accessibility); "Resources" (official LGU website, Citizen's Charter, LGU Facebook, Open Data, FOI, BLGF, BetterGov); the "Cost to the people = ₱0" badge with Volunteer and Contribute buttons; and one bottom line with the license and the independent-project notice. The home page's bottom source note is removed, since the footer carries that notice.
- Page heroes now use the home page's dark navy (`bg-ink-950`) on every inner page, with light breadcrumbs (`Breadcrumbs` `tone="dark"`), dark stat cards and translucent chips.
- Barangays are a top-level section at `/barangays` (breadcrumb Home > Barangays); old `/government/barangays` URLs redirect permanently. The barangay search box is gone, since Corella has 8 barangays. The government page no longer repeats the barangay list, and its featured offices now point at Corella's offices (Mayor, Treasurer, Civil Registrar, Health, Social Welfare, Engineering).
- Simpler header in the BetterInabanga style: a dark 24/7 hotline bar (911, Municipal Hall, MDRRMO; hotlines with a `short` label appear automatically), then the logo, six plain links (Home, Services, Government, Transparency, Barangays, Hotlines & Contact) with no dropdowns, and a "Citizen Feedback" button that opens the new feedback section on the contact page. Town, News and About moved to the footer.
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

- Services page: the "Common situations" tags and the "Full directory" section (filters and category accordions, which also showed a leftover template count of 242). Residents browse by category cards; the Citizen's Charter source note stays.
- News section: the `/news`, `/news/archive` and news detail pages, the "Latest updates" link and section on the home page, and the news data, cards and footer and sitemap links. There is no official news source to draw from yet.
- Global site search: the header search button, the Ctrl/Cmd+K command palette, the `/search` page and the hero search bars on the home, services and category pages. The home and services pages link straight to popular services instead. In-page list filters (barangays, offices, services) stay.
- All template data from BetterInabanga and Better San Fernando (La Union): 249 services, offices, officials, 50 barangays and their map boundaries, news, legislation, projects, budget and procurement figures, places, and town profile text.
- About 750 template assets: Citizen's Charter PDFs, officials' photos, festival, place and news images, and business logos.
- `public/wp-content/`: 496 template PDFs that nothing referenced.
- Language switching (Filipino and Cebuano). The site is English only for now.
