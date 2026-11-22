# BetterCorella 🇵🇭

> **An independent civic guide to the services, officials, barangays, budgets and public records of the Municipality of Corella, Bohol.**
> Built under the [BetterGov.ph LGU Directory Initiative](https://lgu.bettergov.ph/GUIDE). Adapted from [BetterInabanga](https://github.com/gerardosocias29/betterinabanga) and [Better San Fernando, La Union](https://github.com/alvindemesadev/better-san-fernando-lu).

**Live site:** [bettercorella.vercel.app](https://bettercorella.vercel.app) · **Repository:** [ashdroidcmd/bettercorella](https://github.com/ashdroidcmd/bettercorella)

> [!NOTE]
> **Rebranded to Corella, with official data.** The town profile, 86 Citizen's Charter services, 16 offices, elected officials, the 8 barangays (with PSA population and boundaries), local hotlines, the national budget lines that name Corella, and the town's fiestas and tourist spots come from official sources: the municipal website, the Citizen's Charter 2026, the PSA, the Provincial Government of Bohol and the BetterGov.ph Budget API. Legislation and the places directory are still being collected, so those sections show an "information coming soon" notice instead of guessing. Have an official document or link? [Share it](https://github.com/ashdroidcmd/bettercorella/issues).

---

## 🌟 Overview

**BetterCorella** is a community-maintained, open-source civic portal for the people of Corella, Bohol. It gathers public information that is often scattered or hard to find into one clear, mobile-friendly website:

- how to get a municipal service, and what it requires and costs
- who the elected officials and office heads are, and how to reach them
- barangay information and emergency hotlines
- where public money goes: national budget lines that name Corella
- fiestas, tourist spots, local businesses and today's weather

BetterCorella is **not** the official website of the Municipality of Corella. Every figure links to the official source it came from, so anyone can check it.

---

## 🚀 Key Pages & Features

| Area | Route | What it offers |
| --- | --- | --- |
| **Home** | `/` | Popular services, saved services, and **current weather** in Corella (OpenWeather) in the hero and a "Weather in Corella" section |
| **Services** | `/services`, `/services/:category/:slug` | The 86 services of the Corella Citizen's Charter 2026 in 12 categories, with the issuing office, who may avail, processing time, listed fees and a link to the charter page. Services can be bookmarked on your device |
| **Online services** | `/online-services` | Links to national e-government services (eGov PH, PSA, SSS, PhilHealth, Pag-IBIG, DTI and more) |
| **Government** | `/government`, `/barangays`, `/contact` | Elected officials, municipal offices and national agencies, the 8 barangays with their councils, and **24/7 emergency hotlines** |
| **Town guide** | `/town` | Town profile, history and map |
| **Tourism and events** | `/town/life` | The town fiesta (April 27) and Adlaw sa Corella, plus tourist spots (Philippine Tarsier Sanctuary, the church, Green Thumb Farm) with hours, fees, tips and directions in a details dialog |
| **Business and investment** | `/town/business` | A local business directory (starting with a developer-for-hire listing) and links to business permits and national business portals |
| **Transparency** | `/transparency` | National budget lines naming Corella (FY2027 NEP and GAA 2020–2026) from the BetterGov.ph Budget API, with detail pages, and links to official sources |
| **Offline use** | (whole site) | Installable as an app (PWA). Pages you've visited still open without a connection, which helps during emergencies |

---

## 🛠️ Tech Stack

| Area | Technology |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router) + [React 19](https://react.dev/) + TypeScript |
| Rendering | Every page is prerendered to static HTML at build time, so content is readable by search engines without JavaScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/), Plus Jakarta Sans font |
| Icons & motion | [Lucide](https://lucide.dev/), [Motion](https://motion.dev/), [Lenis](https://lenis.darkroom.engineering/) smooth scrolling |
| Maps | [MapLibre GL](https://maplibre.org/) |
| Offline / PWA | [Serwist](https://serwist.pages.dev/) service worker |
| SEO | Per-page metadata, Open Graph, JSON-LD structured data, generated `sitemap.xml` and `robots.txt` |
| Testing | [Vitest](https://vitest.dev/) (unit), [Playwright](https://playwright.dev/) (end-to-end), [oxlint](https://oxc.rs/) |
| Package manager | [pnpm](https://pnpm.io/) |
| Hosting | [Vercel](https://vercel.com/) |

There is no database. All content is typed data in the repository, so every change is reviewable in Git. Three small server routes run on Vercel, each keeping its secret on the server:

| Route | Purpose | Status |
| --- | --- | --- |
| `/api/weather` | Proxies the OpenWeather Current Weather API (free tier), cached for 10 minutes | Live |
| `/api/suggestions` | Sends "Suggest a spot or event" submissions to a private Discord channel | Form hidden for now |
| `/api/business-listings` | Sends "Register your business" requests to a private Discord channel | Form hidden for now |

Nothing sent through a form is published automatically: volunteers review it and add approved records by hand.

---

## 🗂️ Project Structure

The code is organized by feature. Each page has its own folder; code shared by several pages of a feature lives in that feature's `shared/` folder.

```
src/
├── app/                 # Next.js routes (metadata + static params; render a feature page)
│   └── api/             weather/, suggestions/, business-listings/, _shared/ (Discord form handler, rate limit)
├── features/
│   ├── home/            home-page/
│   ├── services/        services-page/, service-category-page/, service-detail-page/, online-services-page/, shared/
│   ├── government/      government-page/, officials-page/, offices-page/, barangays-page/, ... shared/
│   ├── town/            town-profile-page/, life-page/ (tourism and events), places-page/, business-page/, shared/
│   ├── transparency/    budget-page/, budget-project-page/, shared/
│   ├── weather/         shared/ (hook, tile, section, OpenWeather mapping)
│   └── info/            about-page/, contact-page/, faq-page/, privacy-page/, terms-page/, ... shared/
├── assets/              # images, incl. tourism/{spots,events}/ and business/ (each with a README)
├── components/          # layout/ (site shell), ui/ (building blocks), seo/
├── config/              # site.ts (site name and URL), city.ts (LGU identity)
└── lib/                 # utils, seo/ (metadata + route list), data freshness
```

A page folder looks like:

```
services-page/
├── components/          # components used only by this page (when needed)
├── hooks/  types/  utils/  data/
├── ServicesPage.tsx
└── index.tsx            # export { ServicesPage } from './ServicesPage'
```

---

## 💻 Getting Started Locally

**Requirements:** Node.js 22.18 or newer (Node 24 recommended) and pnpm. The exact pnpm version is pinned in `package.json`, and Corepack, which ships with Node.js, installs it for you:

```bash
corepack enable
```

1. **Clone and install:**
   ```bash
   git clone https://github.com/ashdroidcmd/bettercorella.git
   cd bettercorella
   pnpm install
   ```

2. **Run the development server** at http://localhost:3000:
   ```bash
   pnpm dev
   ```

3. **Build and run the production version:**
   ```bash
   pnpm build
   pnpm start
   ```

### Useful commands

| Command | What it does |
| --- | --- |
| `pnpm dev` | Development server with hot reload |
| `pnpm build` | Production build (prints a data-freshness report first) |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Lint with oxlint |
| `pnpm typecheck` | TypeScript type checking |
| `pnpm test` | Unit and data tests (Vitest) |
| `pnpm test:e2e` | End-to-end tests in Chromium (builds and starts the site automatically) |
| `pnpm test:e2e:all` | End-to-end tests in Chromium, Firefox, WebKit and mobile |
| `pnpm test:e2e:ui` | Playwright's interactive test runner |

### Configuration

Copy `.env.example` to `.env.local` and fill in what you need. Every variable is optional: without a key, the related feature hides itself and the rest of the site works.

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://bettercorella.vercel.app` | Public site address used in canonical URLs, the sitemap and social previews |
| `OPENWEATHER_API_KEY` | none | Server-only. [OpenWeather](https://openweathermap.org/api) key (free tier) for the home page weather. A new key can take up to about 2 hours to activate |
| `DISCORD_SUGGESTIONS_WEBHOOK_URL` | none | Server-only. Discord webhook for "Suggest a spot or event" (form hidden for now) |
| `DISCORD_BUSINESS_WEBHOOK_URL` | falls back to the suggestions webhook | Server-only. Discord webhook for "Register your business" (form hidden for now) |

Never prefix these keys with `NEXT_PUBLIC_`, which would ship them to the browser. On Vercel, add them under **Project → Settings → Environment Variables** for Production and Preview. CI doesn't need them: tests mock the APIs.

### Adding photos

- **Tourist spots and events:** `src/assets/tourism/spots/` and `src/assets/tourism/events/`, registered in `src/features/town/life-page/data/tourismPhotos.ts`.
- **Business logos:** `src/assets/business/`, registered in `src/features/town/business-page/data/businessPhotos.ts`.

Each folder's README explains naming, size (resize camera originals to about 1600 px) and credits.

---

## 🚦 CI/CD

Every pull request and every push to `main` runs the [CI workflow](.github/workflows/ci.yml) on GitHub Actions:

```
pull request ─► lint + typecheck + unit tests ─┐
                production build ──────────────┼─► preview deploy on Vercel (URL posted on the PR)
                Playwright end-to-end tests ───┘

push to main ─► same checks ─► production deploy to bettercorella.vercel.app ─► delete the merged PR's branch
```

- **Nothing deploys unless every check passes.** Vercel's own automatic Git deploys are turned off in `vercel.json`, so deploys only come from CI.
- **Previews** are built only for branches in this repository. Pull requests from forks get all the checks but no preview, because GitHub doesn't share repository secrets with forks.
- **Branch cleanup:** after a merged PR deploys to production, its branch is deleted automatically. A branch is kept if another open PR is built on top of it.

### One-time setup (maintainers)

The deploy jobs need three repository secrets, added under **Settings → Secrets and variables → Actions**:

| Secret | Where to find it |
| --- | --- |
| `VERCEL_TOKEN` | Vercel → **Account Settings → Tokens → Create** |
| `VERCEL_ORG_ID` | The `orgId` value (starts with `team_`) in `.vercel/repo.json` (see below). It's also shown as the **Team ID** in your Vercel team's Settings → General |
| `VERCEL_PROJECT_ID` | The project `id` value (starts with `prj_`) in `.vercel/repo.json`, or Vercel → project **bettercorella → Settings → General → Project ID** |

The easiest way to get both IDs: run `pnpm dlx vercel link` once in the repo, choose the existing **bettercorella** project, and copy the IDs from the generated `.vercel/repo.json` (older CLI versions write `.vercel/project.json`). The `.vercel/` folder and the `.env.local` it creates are git-ignored. `.env.local` holds a short-lived `VERCEL_OIDC_TOKEN` for local use; it is **not** the `VERCEL_TOKEN` secret.

Recommended: protect `main` under **Settings → Branches** and require the **Lint, typecheck & unit tests**, **Production build** and **End-to-end tests** checks before merging.

---

## 🤝 Contributing

Corrections and contributions are welcome, especially from people in Corella. You can help by reporting outdated information, sharing official documents, or improving the code. See [CONTRIBUTING.md](CONTRIBUTING.md) to get started.

BetterCorella is an independent, non-partisan, volunteer project under the **BetterGov.ph** ecosystem.

---

## 📜 License & Credits

- **Code:** [ISC License](LICENSE).
- **Data, photos and logos:** keep the terms of their original sources, which are cited on each page.
- **Weather data:** © [OpenWeather](https://openweathermap.org/) (CC BY-SA 4.0), credited on the home page.

BetterCorella builds on the work of:

- [BetterInabanga](https://github.com/gerardosocias29/betterinabanga), the direct template for this project
- [Better San Fernando, La Union](https://github.com/alvindemesadev/better-san-fernando-lu) by Alvin de Mesa, the original design
- [BetterGov.ph](https://bettergov.ph) and its LGU Directory Initiative
