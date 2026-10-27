# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal research blog ("230's Blog"), built on the Astro Sphere theme: a fully static site with Astro 4, Tailwind, TypeScript, and a few SolidJS islands. No SSR, no adapters; everything is pre-rendered at build time via `getStaticPaths`. Site copy/nav labels are configured in Chinese in `src/consts.ts`.

## Commands

- `npm run dev` — dev server at `localhost:4321` (`dev:network` for LAN access)
- `npm run build` — runs `astro check && astro build`; type errors fail the build
- `npm run preview` — preview the production build
- `npm run astro check` — type-check only
- `npm run lint` / `lint:fix` — stale scripts: the ESLint config and dependency were removed, so these error out
- No test suite exists

Both `package-lock.json` and `pnpm-lock.yaml` are present; npm is the actively used package manager.

## Architecture

**Config & types** — `src/consts.ts` is the single site configuration (SITE, per-page titles, nav LINKS, SOCIALS); its types live in `src/types.ts`. Content schemas (Zod) are in `src/content/config.ts`. Path alias `@*` maps to `src/*` (`@components`, `@layouts`, `@consts`, `@lib/utils`, `@types`, `@styles`).

**Content collections** — `src/content/` holds three collections: `blog` and `projects` (posts with title/summary/date/tags, optional `draft`, `demoUrl`/`repoUrl`), `legal`. Posts are folders with `index.md`/`index.mdx` (MDX can import `.astro` components). Blog posts are the author's own research/learning notes in Chinese; the theme's original demo/documentation content has been removed.

**Draft gotcha** — `draft: true` filters entries out of list pages and search, but `getStaticPaths` in the `[...slug].astro` detail routes and `rss.xml.ts` do **not** filter drafts, so draft pages are still built and included in the RSS feed.

**Page composition** — every page wraps content in `PageLayout` (HTML shell: `BaseHead` + `Header` + `Drawer` + `Footer`), then `TopLayout` + `BottomLayout` (both just `Container` wrappers). Blog/project detail pages instead use `ArticleTopLayout` / `ArticleBottomLayout`, which render entry metadata and compute prev/next links (modulo-wrapped around the sorted collection).

**Search (SolidJS islands)** — `SearchCollection.tsx` (blog & projects list pages) and `Search.tsx` (`/search` page) are `client:load` islands using Fuse.js fuzzy search over slug/title/summary/tags, plus tag filtering and sort toggle. They cast all entries to `CollectionEntry<"blog">` regardless of source collection — preserve that shape when editing.

**Client scripts** — plain JS in `public/js/`, loaded as inline scripts from `BaseHead.astro`: `theme.js` (class-based dark mode on `<html>`, persisted in `localStorage.theme`, wired to header/drawer buttons), `animate.js` (staggered reveal of `.animate` elements), `scroll.js` (header scrolled state), `copy.js` (code-block copy buttons), `bg.js` (particle/star background). These listen for `astro:after-swap` events; the ViewTransitions component in `BaseHead.astro` is currently commented out.

**Dark mode** — Tailwind `darkMode: ["class"]`; styles toggle off the `dark` class on `<html>`.

**Generated endpoints** — `src/pages/rss.xml.ts` and `robots.txt.ts`; sitemap via the `@astrojs/sitemap` integration. `site` in `astro.config.mjs` must be set for RSS/sitemap/OG URLs to be correct.
