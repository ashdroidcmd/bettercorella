---
name: documentation
description: Where and how to update technical docs, user manual and screenshots after a change in BetterCorella.
---

# Documentation

Update only what the change affects.

These folders live in the workspace root (the parent folder of the repo), next to the repo. They are local and are **not** committed to git.

| Change | Update |
| --- | --- |
| Architecture, build, data model | `../docs/architecture/`, `../docs/features/<area>.md` |
| A process (deploy, data refresh) | `../docs/workflows/` |
| A known issue and its fix | `../docs/troubleshooting/` |
| What residents see or do | `../user-manual/<page>.md`, written in plain language for non-technical readers |
| Significant UI change | `../screenshots/<area>/`, captured with Playwright `page.screenshot()` at 1280x800 and 390x844 |

- Write in English. Link to source files with relative paths.
- Data pages must keep their official source citations.
- Never include credentials, personal data or internal-only information.
