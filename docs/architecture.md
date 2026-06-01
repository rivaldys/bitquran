# Architecture — Bitquran

## Overview

Bitquran is a **client-side React SPA** (Vite + React 19). There is no backend
of our own: all data is fetched from the external **SutanLab Quran API** and
cached on the client with TanStack Query.

```
Browser (React SPA)
    └── TanStack Query cache
            └── Axios instance (bitquran/services/api, baseURL = VITE_API_URL)
                    └── SutanLab Quran API
```

---

## Layered Structure

```
pages/            Route-level screens, lazy-loaded, assemble templates + organisms
components/        Atomic Design system (atoms → molecules → organisms → templates)
router/           Route table (routes.tsx) + mapping logic (core/)
services/         Data layer: api/ (axios instance) + queries/ (TanStack hooks)
shared/           Cross-cutting non-UI code: constants, hooks, lib, types, utils
assets/           Fonts, icons, images, css
```

### Component Architecture (Atomic Design)

```
atoms        Smallest, mostly stateless UI units (Text, Icon, Input, Select, …)
molecules    Composed from atoms (Toolbar, ContentSection, Skeleton)
organisms    Complex / data-aware sections (NavigationBar, Footer, SurahItem, VerseItem)
templates    Page layout shells (AppLayout, PageContentLayout) — no business logic
pages        Route components — compose templates + organisms, own the data hooks
```

Cross-level rule: lower levels never import from higher levels. Atoms know
nothing about molecules, organisms, or pages.

---

## Routing

React Router v7 via `createBrowserRouter`. The route table is data-driven:

- `src/router/routes.tsx` — an array of typed `Route` objects (see
  `shared/types`). Each has a `type` of `'page' | 'redirect' | 'group'`.
- `src/router/core/routeMapper` — converts `Route[]` into React Router config.
- `src/router/core/getNavbarRoutes` — derives nav items from `meta.navbar.order`.
- Pages are lazy-loaded with `lazy(() => import(...))`.

Current routes:

```
/                          Beranda — surah list        (SurahList)
/surat                     → redirect to /
/surat/:id                 Detail Surat                (Surah)
/surat/:id/tafsir/:tafsirId  Tafsir                    (Tafsir)
/tentang                   Tentang                     (About)
/riwayat-pembaruan         Riwayat Pembaruan           (ChangeLog)
*                          404                         (NotFound)
```

---

## Data Flow

```
Page mounts
    → calls a TanStack Query hook from bitquran/services/queries
    → hook calls the axios instance (bitquran/services/api)
    → cached responses render instantly; otherwise fetch → cache → render
```

- No component calls `fetch`/`axios` directly — always through a query hook.
- The axios instance is the **default export** of `src/services/api`, with
  `baseURL: import.meta.env.VITE_API_URL`.
- The global default `staleTime` is configured in `src/App.tsx` (5 min). Qur'an
  content is immutable, so resource hooks should override with
  `staleTime: Infinity` (see `docs/adr/001-tanstack-query-staletime.md`).

---

## Document Head

`src/shared/lib/Head` is a small Next-style `<Head>` component that
declaratively manages `<title>`/`<meta>`/`<link>` from within the tree and
cleans up on unmount. Use it from pages for titles and metadata.

---

## Audio

Audio is handled per-instance by the **`useAudioPlayer(src)`** hook
(`src/shared/hooks/useAudioPlayer`), which creates an `Audio` element and
returns `{ isPlaying, toggle }`, cleaning up on unmount.

There is **no global/persistent audio context** in the current codebase; audio
stops when the owning component unmounts (e.g. on navigation). A globally
persistent player would be a deliberate architectural change — see
`docs/adr/002-global-audio-context.md` before attempting it.

---

## Arabic Text Rendering

Arabic text is the most sensitive part of the UI and must remain legible.

- The Arabic webfont is **Saleem Quran**, exposed as the Tailwind utility
  `font-saleem-quran` (token in `src/index.css`; font files in
  `src/assets/fonts/saleem-quran`). The UI font is **Rubik** (`font-rubik`).
- Today, Arabic is rendered directly with the `font-saleem-quran` class
  (e.g. the surah glyph label in `components/organisms/SurahItem`).
- Centralising Arabic rendering into a dedicated atom is a recommended future
  step (`docs/adr/003-arabic-text-atom.md`); until that atom exists, do not
  reference it.

---

## Styling System

- **TailwindCSS v4**, configured CSS-first in `src/index.css`
  (`@import 'tailwindcss'`, `@theme` for fonts, `@utility content-container`,
  keyframes for the skeleton shimmer).
- **CVA** (`class-variance-authority`) defines component class strings and
  variants.
- **`cn()`** (`bitquran/shared/utils`, wrapping `clsx` + `tailwind-merge`) is
  available for conditional/merged class strings outside CVA.

---

## Environment Configuration

```
VITE_APP_PORT                 Dev server port (defaults to 3000)
VITE_APP_URL                  Public app URL
VITE_API_URL                  Base URL for the Qur'an API (axios baseURL)
VITE_ASSETS_URL               Base URL for external assets
VITE_BROWSER_MIND_SECRET_KEY  Secret key (see .env.example)
```

See `.env.example`. Never commit real `.env*` files (they are git-ignored).
