# BetterCorella: rebrand TODO

What's left to finish turning the BetterInabanga template into a complete civic guide for **Corella, Bohol**.

The identity, branding, routes (`/city` → `/town`) and the removal of template data are **done** (commit `30f8f7e` on `feat/rebrand-site`). Every data page now shows an "Information coming soon" notice. What remains is shipping that work and adding **verified Corella data**.

> **How to add a dataset:** open the file listed below, add records that cite an official `sourceUrl` and a `lastVerified` date (`YYYY-MM-DD`), and run the checks in [Definition of done](#5-definition-of-done-for-every-data-pr). The page switches from the coming-soon notice to its full layout automatically. Never copy data from another LGU: `src/lib/data.test.ts` fails if Inabanga, San Fernando or La Union content appears.

---

## 1. Ship the rebrand

- [ ] Open the PR: [`feat/rebrand-site` → `main`](https://github.com/ashdroidcmd/bettercorella/compare/main...feat/rebrand-site?expand=1)
- [ ] CI passes: **Lint, typecheck & unit tests**, **Production build**, **End-to-end tests**
- [ ] **Deploy preview (Vercel)** succeeds and posts a preview URL on the PR. This also re-tests the `--archive=tgz` upload fix, which needs the Vercel daily upload limit to have reset.
  - If it fails with `api-upload-free`, wait 24 hours and click **Re-run failed jobs**
- [ ] Review the preview on desktop and mobile: header, footer, home page, a coming-soon page, hotlines, `/city` → `/town` redirect, favicon and social preview
- [ ] Merge the PR
- [ ] **Deploy production** succeeds and bettercorella.vercel.app shows BetterCorella
- [ ] **Delete merged branch** removes `feat/rebrand-site` on GitHub
- [ ] Protect `main`: Settings → Branches → require the three CI checks before merging

## 2. Decisions to make

- [ ] `/services` while there are no services: keep the coming-soon page, or show the 12 category cards ("Services coming soon")?
- [ ] Brand: keep the placeholder **BetterCorella** wordmark and blue/gold palette, or design a final logo? Assets: `public/favicon.*`, `public/pwa-*.png`, `public/apple-touch-icon.png`, `public/og.png`, `src/assets/logo*.png`
- [ ] Domain: stay on `bettercorella.vercel.app` or use a custom domain? If custom, set `NEXT_PUBLIC_SITE_URL` in Vercel and update `src/config/site.ts`, `README.md` and `public/llms.txt`
- [ ] Languages: bring back Filipino/Cebuano later? Removed in the "English only" change; see git history.

## 3. Collect official sources first

Gather these links or documents before entering data. Keep a note of each URL and the date you checked it.

- [ ] Official municipal website and/or official Facebook page of the Municipality of Corella
- [ ] Municipal **Citizen's Charter** (PDF or web page)
- [ ] PSA **PSGC** page for Corella, Bohol: official barangay list and PSGC codes
- [ ] PSA **Census of Population** table: municipal and barangay population
- [ ] DILG **Barangay Information System**: barangay captains, kagawads, SK chairpersons
- [ ] **COMELEC** results for the latest elections: mayor, vice mayor, Sangguniang Bayan
- [ ] **BLGF** Statement of Receipts and Expenditures for Corella
- [ ] DILG **Full Disclosure Policy** portal entries for Corella: budget, procurement, SEF and disaster fund reports
- [ ] **PhilGEPS**: the exact organization name used for Corella's notices and awards
- [ ] **DPWH** dataset on data.bettergov.ph filtered to Corella projects
- [ ] PSA/NAMRIA **barangay boundaries** for Corella (data.bettergov.ph dataset 23)
- [ ] Local emergency numbers confirmed with the LGU: MDRRMO, PNP, BFP, rural health unit, Municipal Hall

## 4. Add data (one dataset per PR)

Work roughly top to bottom; later items depend on earlier ones (services reference offices, for example).

### LGU profile: `src/config/city.ts`
- [ ] `population2024`, `population2020`, `populationYear` (PSA census)
- [ ] `landAreaKm2` (PSA)
- [ ] `barangayCount` (PSA PSGC)
- [ ] `zip`, `coordinates`, `district` (congressional district), `incomeClass`
- [ ] Municipal Hall contacts: `address`, `trunkline`, `email`, `hours` (confirmed with the LGU)
- [ ] Official links: `website`, `citizensCharter`, `sanggunian`, `archives`, `facebook`
- [ ] Finances: `revenue2024`, `expenditures2024` (BLGF)
- [ ] Optional: `tagline` (official), `povertyIncidence`/`povertyYear` (PSA)
- [ ] Set `lastVerified`

### Government: `src/features/government/shared/data/`
- [ ] `barangays.ts`: one record per barangay (`slug`, `name`, `district`, `population2024`/`2020`/`2015`, `punongBarangay`, `kagawads`, `skChairperson`, `sourceUrl`, `dilgSourceUrl`). The count must match `city.barangayCount`.
- [ ] `barangayMap.ts` + `public/data/barangay-boundaries.geojson`: boundary features for the interactive map (PSA/NAMRIA). The map appears automatically once `features` is non-empty.
- [ ] `officials.ts`: mayor, vice mayor, Sangguniang Bayan members, ABC president, SK federation president (`slug`, `name`, `role`, `photo`, `bioUrl`, `note`)
- [ ] `elections.ts`: `cityElections` history (COMELEC / OpenHalalan)
- [ ] `offices.ts`: municipal offices and departments (`slug`, `name`, `code`, `sector`, `head`, `position`, `contact`, `email`, `address`, `locals`, `ccUrl`, `sourceUrl`)
- [ ] `hotlines.ts`: add local MDRRMO, PNP, BFP, RHU and Municipal Hall numbers, plus Bohol TaRSIER 117 once its numbers are verified. Keep `911` first.
- [ ] `legislation.ts`: ordinances, resolutions and executive orders, plus `legislationSources`; set `legislationSourceUrl`

### Services: `src/features/services/shared/data/`
- [ ] `services.ts`: Citizen's Charter services (`slug`, `title`, `office`, `officeCode`, `category`, `classification`, `transactionType`, `whoMayAvail`, `description`, `summary`, `fees`, `pdfs`, `sourceUrl`, `lastVerified`). Every `officeCode` must exist in `offices.ts`.
- [ ] Downloadable forms, if any, in `public/forms/`, referenced from each service's `pdfs`
- [ ] `onlineServices.ts`: add Corella's own online services, if any, and list services that can be done online in `onlineServiceSlugs`

### News: `src/features/news/shared/data/news.ts`
- [ ] Announcements from official channels (`slug`, `title`, `date`, `excerpt`, `image`, `sourceUrl`), newest first; set `newsLastVerified`
- [ ] News images in `public/news/` (only images the LGU published, with credit)

### Transparency: `src/features/transparency/shared/data/`
- [ ] `budgetDocs.ts`: budget, SEF, disaster fund and audit documents from the FDP portal
- [ ] `bidDocs.ts`: `bidResults` and `bidBulletins` (PhilGEPS / BAC)
- [ ] `projects.ts`: DPWH projects for Corella (`dpwhProjects`, `dpwhMapBounds`)
- [ ] Move entries in `openData.ts` to `group: 'integrated'` (with `localHref`) once a Corella extract is on the site
- [ ] Optional: restore the rich budget and procurement layouts (charts, fiscal comparisons) from git history at commit `a619b14` and feed them Corella figures

### Town: `src/features/town/shared/data/`
- [ ] `stats.ts`: headline figures for the home and about pages
- [ ] `timeline.ts`: short history with sources (shown on the about page)
- [ ] `places.ts`: verified places (offices, health facilities, schools, markets…)
- [ ] Rewrite `src/features/town/{town-profile-page,life-page,business-page,places-page}` with real Corella content once sources exist. The old rich layouts are in git history at `a619b14`.

## 5. Definition of done for every data PR

- [ ] Every record has an official `sourceUrl` and, where the type has one, `lastVerified`
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm test:e2e` pass (in PowerShell)
- [ ] The leftover-data guard in `src/lib/data.test.ts` passes
- [ ] The data-freshness report (printed by `pnpm build`) shows the dataset as **CURRENT**, not PENDING. Update the matching row in `src/lib/dataFreshness.ts` (`source`, `lastVerified`).
- [ ] Remove or relax the e2e "coming soon" check in `e2e/smoke.spec.ts` for that page
- [ ] `CHANGELOG.md` entry under `[Unreleased]`
- [ ] `graphify update .`

## 6. Nice to have / cleanup

- [ ] Playwright screenshots of key pages in `../screenshots/` (workspace folder)
- [ ] Plain-language user-manual pages in `../user-manual/` (finding a service, hotlines, reading the budget)
- [ ] Delete the stray `graphify-out/` folder in the workspace root (`D:\Projects\better-corella\graphify-out`)
- [ ] Lighthouse and accessibility pass on the production site
- [ ] Upgrade pnpm 10 → 12 (`packageManager` in `package.json`)
- [ ] CI: plan for the GitHub runner `ubuntu-latest` → Ubuntu 26 migration (notice in workflow runs)
