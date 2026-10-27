# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal research blog ("230's Blog"), built on the Astro Sphere theme: a fully static site with Astro 4, Tailwind, TypeScript, and a few SolidJS islands. No SSR, no adapters; everything is pre-rendered at build time via `getStaticPaths`. Site copy lives in `src/consts.ts` (descriptions/hero text in Chinese, nav labels in English).

## Commands

- `npm run dev` — dev server at `localhost:4321` (`dev:network` for LAN access)
- `npm run build` — runs `astro check && astro build`; type errors fail the build
- `npm run preview` — preview the production build
- `npm run astro check` — type-check only
- `npm run lint` / `lint:fix` — stale scripts: the ESLint config and dependency were removed, so these error out (`preview:network` is also miswired to `astro dev --host`, not preview)
- No test suite exists

Both `package-lock.json` and `pnpm-lock.yaml` are present; npm is the actively used package manager (node_modules is npm's flat layout). The README is just the author's publish routine (`git add` / `commit -m "Update blog"` / `push`); the only GitHub workflow is a stale-issues closer — there is no deploy CI in the repo.

## Architecture

**Config & types** — `src/consts.ts` is the single site configuration (SITE, per-page titles, nav LINKS, SOCIALS); its types live in `src/types.ts`. Content schemas (Zod) are in `src/content/config.ts`.

**Path aliases** — `@consts`, `@types`, `@lib`, `@components`, `@layouts`, `@styles` are declared twice and must be kept in sync: `compilerOptions.paths` in `tsconfig.json` (tsc/language service only) and `vite.resolve.alias` in `astro.config.mjs` (bundler). There is deliberately no bare `@*` wildcard — it would also match scoped packages like `@astrojs/*`.

**Content collections** — `src/content/` holds two collections: `blog` and `projects` (posts with title/summary/date/tags, optional `draft`, plus `demoUrl`/`repoUrl` on projects). Posts are folders with `index.md`/`index.mdx` (MDX can import `.astro` components). Blog posts are the author's own research/learning notes in Chinese; the theme's original demo/documentation content has been removed.

**Draft gotcha** — `draft: true` filters entries out of list pages, search, and the article prev/next nav, but `getStaticPaths` in the `[...slug].astro` detail routes does **not** filter drafts, so draft pages are still built.

**Page composition** — every page wraps content in `PageLayout` (HTML shell: `BaseHead` + `Header` + `Drawer` + `Footer`), then `TopLayout` + `BottomLayout` (both just `Container` wrappers). Blog/project detail pages instead use `ArticleTopLayout` / `ArticleBottomLayout`, which render entry metadata and compute prev/next links (modulo-wrapped around the sorted collection).

**Search (SolidJS islands)** — `SearchCollection.tsx` (blog & projects list pages) is a `client:load` island with Fuse.js fuzzy search over slug/title/summary/tags, plus tag filtering and a sort toggle. `Search.tsx` (`/search` page) is a simpler query-only variant. Both cast all entries to `CollectionEntry<"blog">` regardless of source collection — preserve that shape when editing.

**Client scripts** — plain JS in `public/js/`. Loaded as inline scripts from `BaseHead.astro`: `theme.js` (class-based dark mode on `<html>`, persisted in `localStorage.theme`, wired to header/drawer buttons), `animate.js` (staggered reveal of `.animate` elements), `scroll.js` (header scrolled state), `copy.js` (code-block copy buttons). Exception: `bg.js` (homepage particle/star background) is loaded only by `src/pages/index.astro`. The scripts listen for `astro:after-swap` events; the ViewTransitions component in `BaseHead.astro` is currently commented out.

**Homepage backgrounds** — `src/pages/index.astro` renders light-mode particle layers and dark-mode star layers, plus `TwinklingStars`/`MeteorShower` inside `#galaxy`, all driven by `bg.js`. The dark-only gate lives on `#galaxy` itself (TwinklingStars appends clones directly into it), so dark-mode animations don't run under the light theme.

**Dark mode** — Tailwind `darkMode: ["class"]`; styles toggle off the `dark` class on `<html>`.

**Generated endpoints** — `src/pages/robots.txt.ts` (points at the sitemap index); sitemap via the `@astrojs/sitemap` integration. `site` in `astro.config.mjs` must be set for sitemap/OG/robots URLs to be correct — it is still the theme's demo URL.
