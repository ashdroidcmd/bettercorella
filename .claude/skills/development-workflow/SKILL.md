---
name: development-workflow
description: Standard end-to-end procedure for implementing any feature, fix or content change in BetterCorella. Use at the start of every coding task.
---

# Development Workflow

1. **Understand** the task and restate the acceptance criteria.
2. **Locate** the relevant code with `graphify query "<feature>"`, then `graphify explain "<Component>"` if needed. Routes are in `src/App.tsx`, pages in `src/pages/`, data in `src/data/`.
3. **Read** only the relevant docs (`../docs/`), source and tests.
4. **Plan** a short list of the files to change.
5. **Implement** the smallest correct change, reusing existing components (`PageHero`, `SectionHeading`, `SourceNote`, cards) and data types (`src/data/types.ts`). The site is English only.
6. **Verify:** `npm run lint`, `npm test`, `npm run build`, plus `npm run test:e2e` for UI changes.
7. **Document** using the `documentation` and `changelog` skills.
8. **Refresh the graph** with `graphify update .`.
9. **Review** `git status` and `git diff`: only intended files, no secrets, no debug code.
10. **Report** the summary, files, tests, docs and remaining issues.
