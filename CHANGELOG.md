# Changelog

All notable changes to BetterCorella are recorded here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Changed

- Reorganized `src/` into feature-based folders (`src/features/<feature>/<x>-page/` with a `shared/` folder per feature), matching the team's frontend structure.
- Migrated from Vite + React Router to Next.js 16 (App Router). Every page is now prerendered with its full content in the HTML, which search engines and AI crawlers can read without running JavaScript.
- Service worker moved from vite-plugin-pwa to Serwist.

### Added

- Started BetterCorella from the BetterInabanga template (ISC), with an ISC `LICENSE` crediting the original authors.
- Playwright end-to-end tests (`e2e/`, `playwright.config.ts`) with a smoke suite covering the main routes, the not-found page and the command palette.
- Graphify knowledge graph setup (`.graphifyignore`, git hooks).
- AI workflow docs: `AGENTS.md`, `CLAUDE.md` and `.claude/skills/`.

### Removed

- Language switching (Filipino and Cebuano). The site is English only for now.

