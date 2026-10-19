# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **npm** (`package-lock.json` is the real lockfile; `pnpm-lock.yaml` is an empty leftover stub from the original v0.dev scaffold — ignore it).

```
npm install       # install deps
npm run dev       # start dev server (localhost:3000)
npm run build     # next build
npm run start     # serve production build
npm run lint      # next lint
```

There is no test suite/framework configured in this repo.

`next.config.mjs` sets `eslint.ignoreDuringBuilds: true` and `typescript.ignoreBuildErrors: true`, so `npm run build` will succeed even with lint/type errors. Run `npm run lint` and rely on editor/tsc diagnostics for real signal — don't trust a green build alone.

## Architecture

This is a single-portfolio Next.js 15 App Router site (React 18, TypeScript, Tailwind v4) for Daniel Onyeachonam, styled as a terminal/hacker-dashboard aesthetic. There is no CMS, database, or API route — every page is a `"use client"` component with its content (project lists, tech stack, resume data, etc.) hardcoded inline as arrays/objects in the page file itself.

**Pages** (`app/*/page.tsx`): `page.tsx` (home dashboard), `about`, `resume`, `portfolio`. Each is large and self-contained; there's no shared data layer between them, so duplicated content (e.g. tech stack, project categories) is edited independently per page.

**Navigation**: `components/navigation.tsx` is the sidebar actually used by all pages (fixed left sidebar, `w-75`; pages offset content with `md:w-[calc(100%-300px)]`). `components/sidebar-navigation.tsx` is an **unused, orphaned earlier version** (still has placeholder "Your Name" copy) — don't confuse the two or edit it expecting it to render.

**Theming**: `next-themes` is a dependency and `components/theme-provider.tsx` exists, but it is **never mounted** in `app/layout.tsx` — there is currently no working dark-mode toggle despite `.dark` CSS variables being fully defined in `app/globals.css`. If wiring up theme switching, mount `ThemeProvider` in the root layout.

**Styling**: Tailwind v4's CSS-first config — there is no `tailwind.config.*` file. All theme tokens (colors, radius, sidebar palette, chart colors) are defined as CSS custom properties in `:root`/`.dark` in `app/globals.css` and re-exposed via `@theme inline`. Fonts are Space Grotesk (`--font-sans`) and DM Sans (`--font-serif`), loaded via `next/font/google` in `app/layout.tsx`. Terminal-look utility classes (`.terminal-block`, `.glitch`, `.cli-prompt`, `.terminal-cursor`) also live in `globals.css`.

**UI primitives** (`components/ui/*`): shadcn/ui components (`new-york` style, see `components.json` for aliases/config). Treat as generated/vendor code — 51 files covering the full shadcn set. Prefer regenerating/adding via the shadcn CLI conventions rather than hand-rolling new primitives, and match existing primitives' patterns when editing one.

**Animations**: `components/animations/reveal-animations.tsx` wraps GSAP + `ScrollTrigger` into reusable scroll-reveal components (`FadeIn`, `SlideInRight`, `SlideInLeft`, `StaggerIn`, `ScaleIn`, etc.) used throughout every page for entrance animations.

**Custom scrollbars**: `components/ui/scrollable.tsx` wraps `overlayscrollbars-react` and is used instead of native scrolling in the sidebar nav (`navigation.tsx`) and the interactive terminal.

**Interactive terminal**: `components/terminal-ui.tsx` (`InteractiveTerminal`) is a simulated shell on the home page. Commands are matched against a hardcoded `commandResponses` map (`whoami`, `skills`, `experience`, `contact`, `education`, `help`, `clear`); unknown input renders as an error line. Content changes (e.g. updating skills/experience shown in the terminal) mean editing that map directly, not any shared content source.

**Modals**: `components/contact-modal.tsx` builds a `mailto:` link from the form fields (no backend/email API — submission just opens the user's email client). `components/project-modal.tsx` renders full project detail from the `Project` interface passed in from `app/portfolio/page.tsx` (interface is duplicated between the two files, not shared).

**Path alias**: `@/*` maps to the repo root (see `tsconfig.json` and `components.json` aliases).
