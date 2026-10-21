---
name: add-portfolio-project
description: Audit a real project repo and add/refresh it as an entry on the Portfolio and Resume pages, with a verified tech stack and a live screenshot. Use when onboarding a new real project onto this site, or when an existing project's listed tech stack needs re-verifying against its actual source instead of guesses from the live site alone.
---

# Add/refresh a portfolio project

Turns one real repo into an accurate `Project` entry on `app/portfolio/page.tsx` + a matching entry on `app/resume/page.tsx`, backed by a full source audit — never by guessing from the live site or trusting a stale README.

**Argument**: the project's folder name (e.g. `/add-portfolio-project farmzone-server`), or a full path. If omitted, ask the user for it before doing anything else.

## Step 1: Locate the repo

Resolve the argument against known project-repo homes, in order:
1. `../portfolio-projects/<arg>` (sibling to this repo — `Dev/portfolio/portfolio-projects/`, the primary home for Daniel's own full-stack projects)
2. `~/Desktop/Dev/Classified/<arg>` (commissioned/client projects)
3. Treat the argument as a path as-is if it already looks like one

If none of those resolve, `ls`/`Glob` the usual `Dev/` subdirectories (`Classified/*`, `portfolio/portfolio-projects/*`, and any sibling dirs) and ask the user where it lives — don't guess silently. Note whether it has a `.git` dir and, if so, grep `git remote -v` for its GitHub identity.

## Step 2: Deep source audit (don't guess from the live site)

Last time this was done from shipped JS bundles and browser poking — it undersold real backend work (e.g. missed Redis/BullMQ entirely) and asserted a wrong library (claimed Resend when nothing was wired up). Don't repeat that: read the actual source.

For one or two repos, read directly. For more, or for a repo with a large/unfamiliar surface, launch one **Explore** agent per repo in parallel, each prompted to:
- Read `package.json` (or language equivalent) fully — every dependency, not just the obvious ones
- Read every file under the main source tree, not just entry points
- Read `README.md` *and* any `CLAUDE.md` — then **cross-check their claims against actual code**. Stale/aspirational READMEs are common (e.g. "Redis is optional" while a lock service throws at boot without it). Flag every contradiction explicitly, don't silently trust the doc.
- List `.env`/`.env.example` variable **names only** — never print values — to infer integrated services
- Check `git log --oneline` for commit count, first/last commit dates, and any live URL referenced in README/CLAUDE.md/config
- Check CI config (`.github/workflows/*`) for what's actually automated (test/lint/build/deploy) — don't assume a CI file means full coverage
- Note what's a real, wired-up feature vs. a dependency that's present but **never actually imported/used** (grep for it) — both happen often (e.g. a chart lib installed but no chart ever rendered, an ORM-adjacent package with zero call sites)

Each agent should report back grouped by category (framework, database, auth, infra, notable patterns), each claim with a one-line citation of the file it was confirmed in.

**If an audit surfaces a real secret committed to source** (API key, private key, password) — stop and flag it to the user directly, outside of and before any portfolio copy. Never work around it, never reference it in copy either way.

## Step 3: Decide what's honest to claim

House rules, carried over from this site's existing content:
- No invented metrics. A number is only usable if it's published on the project's own live site/dashboard, or the user states it directly. Absent that, write features and architecture, not stats.
- Skill/experience language stays modest — no "Expert", capability claims should match what the code actually demonstrates.
- **Link rule**: show the **live link** when the project is deployed; show a **GitHub link** only for a project that isn't deployed. Both are independent optional fields on `Project` (`liveUrl?`, `githubUrl?`) — `components/project-modal.tsx` already renders each conditionally, so this needs no component change, just setting the right field(s) on the new entry.
- Category: match what's **actually in this repo** — a frontend-only client consuming a separate, absent backend is "Web Applications", not "Full-Stack Projects", even if the product as a whole is full-stack elsewhere.

If any of category / link exposure / whether to capture a screenshot is ambiguous, ask the user with `AskUserQuestion` rather than assuming — these are judgment calls, not derivable facts.

## Step 4: Capture a screenshot

Use the Chrome browser tools to screenshot the live project at the existing convention: 1280×632 (matches `aspect-[1280/632]` in `components/project-modal.tsx`, so nothing crops). Pick a view that represents the product well (a distinctive feature screen beats a generic landing hero when one exists). Save to `public/projects/<slug>.jpg`.

If the project isn't deployed, ask the user for an image instead of fabricating one.

## Step 5: Write the entries

`app/portfolio/page.tsx` — add/update a `Project` object in the `projects` array: `id`, `title`, `description` (one line), `longDescription` (one paragraph, cites real architecture), `image`, `technologies` (the tech that actually defines this repo — cap the visible list to what's most distinctive, the modal shows the full array), `category`, `year`, `status`, `features` / `challenges` / `results` (each a few bullets grounded in Step 2's findings, not generic filler), `liveUrl` and/or `githubUrl` per the link rule, `metrics` only if real numbers exist.

`app/resume/page.tsx` — add/update the matching simpler entry in its `projects` array (`name`, `type`, `status`, `tech`, `liveUrl`, optional `metrics`). Keep the tech list consistent with the Portfolio entry — this has drifted before and was a specific complaint.

No other component changes are normally needed — `project-modal.tsx` and the category sidebar (`categoryMap`/`categoryDefs`/`categoryIcons` in `app/portfolio/page.tsx`) already handle arbitrary entries; only add a new category there if one doesn't already exist for this project's type.

## Step 6: Verify

```
npm run lint
npx tsc --noEmit
npm run build
```

Then check in-browser: the new/updated card renders in the grid, category filter counts and isolates correctly, the modal opens with the screenshot uncropped and the right buttons (live/GitHub per the link rule, metrics section only if real), and the Resume Projects tab matches.

## Guardrails

- Never commit or push — that's a separate, explicit instruction from the user every time, per this repo's established workflow.
- Don't fabricate anything to fill a gap — an empty `metrics` field or a shorter feature list is correct when the real data isn't there.
- Don't expand scope into unrelated fixes found along the way (other stale/fake content, security issues) without surfacing them to the user first — note them, don't silently fix or silently ignore them.
