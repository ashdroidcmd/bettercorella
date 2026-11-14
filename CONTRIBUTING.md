# Contributing to BetterCorella

Thank you for helping with **BetterCorella** (`bettercorella`), an independent, open-source civic portal for the Municipality of Corella, Bohol, built under the **BetterGov.ph** ecosystem.

You don't need to be a developer to help. Pointing out an outdated phone number or sharing a link to an official document is just as valuable as writing code.

## 🎯 Mission & Ground Rules

BetterCorella is **non-partisan and neutral**. It exists to make public information easier to find, not to promote any official, party or candidate.

- **Official sources only.** Every fact must come from a primary source: LGU ordinances, the Citizen's Charter, official LGU pages, PSA, DILG, BLGF, PhilGEPS or DPWH. Social media posts count only when they come from an official government account.
- **Corella only.** All content must be about **Corella, Bohol**. This project was started from the BetterInabanga template, so leftover Inabanga or San Fernando content is a bug. Please report it.
- **No personal data.** Don't add private individuals' personal information, patient data, or anything not already published by the government. Never commit passwords, API keys or other secrets. Everything in this repository is public and ships to every visitor's browser.
- **When in doubt, leave it out.** A clear "information coming soon" notice is better than a wrong fee, hotline or name.

## 🛠️ How to Contribute

### 1. Report outdated or wrong information

If you find a broken link, an outdated hotline, wrong official information, or a missing service:

1. Open an issue on [GitHub Issues](https://github.com/ashdroidcmd/bettercorella/issues/new).
2. Include the page URL, what is wrong, and a link to (or photo of) the official source with the correct information.

### 2. Suggest a feature

Open an issue describing the problem it solves for residents. For major design or architecture changes, discuss them in an issue before opening a pull request. All designs must meet accessibility guidelines (WCAG 2.1 AA) and work well on mobile.

### 3. Contribute code or data

**Requirements:** Node.js 22.18+ (24 recommended) and pnpm. Run `corepack enable` once, and Node installs the pnpm version pinned in `package.json`.

1. Fork the repository, then clone your fork:
   ```bash
   git clone https://github.com/<your-username>/bettercorella.git
   cd bettercorella
   pnpm install
   ```
2. Create a branch for your change:
   ```bash
   git switch -c fix/hotline-numbers
   ```
3. Start the development server at http://localhost:3000:
   ```bash
   pnpm dev
   ```
4. Make your change. See [Where things live](#-where-things-live) below.
5. Before opening a pull request, make sure everything passes:
   ```bash
   pnpm lint
   pnpm typecheck
   pnpm test
   pnpm build
   pnpm test:e2e   # for changes to pages, navigation or layout
   ```
6. Add a line to [CHANGELOG.md](CHANGELOG.md) under `[Unreleased]` for any change residents would notice.
7. Open a pull request that explains what changed and links the official source for any data changes. GitHub Actions runs the same checks on every pull request, and a PR can only be merged once they pass. Pull requests from forks get the checks but no Vercel preview.

Use [Conventional Commits](https://www.conventionalcommits.org/) prefixes for commit messages, for example `feat:`, `fix:`, `docs:`, `chore:` or `refactor:`.

## 🗂️ Where Things Live

The code is organized by feature. See the [Project Structure](README.md#-project-structure) section of the README for the full layout.

| You want to change… | Look in |
| --- | --- |
| A page | `src/features/<feature>/<x>-page/` |
| Data used by a page (services, officials, hotlines…) | `src/features/<feature>/shared/data/` or the page's own `data/` folder |
| The site name, URL or LGU identity | `src/config/site.ts`, `src/config/city.ts` |
| Page titles, descriptions and the sitemap | `src/lib/seo/routeMetadata.ts` |
| The header, footer or shared building blocks | `src/components/layout/`, `src/components/ui/` |
| A route (URL) | `src/app/` (and add it to `routeMetadata.ts`) |

## 📜 Verifying Citations and Sources

- Every record in a `data/` folder must reference a working source URL, or a copy of the official document stored under `public/`.
- Fill in the record's verification date (`lastVerified`) when you check it. The build prints a data-freshness report that flags datasets due for review.
- If a source is unavailable or unclear, say so in the record's note rather than filling the gap with a guess.

Thank you for helping build a more transparent and connected Corella!
