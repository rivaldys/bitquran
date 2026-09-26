# CLAUDE.md — Bitquran

> **AI Agent Entry Point.** Read this file first. Follow every reference
> listed here before making architectural decisions or writing new code.
> Everything here describes the project **as it actually is** — if you find
> code that contradicts this file, surface it rather than silently following one.

---

## Project

A web application for reading the Holy Qur'an — Arabic text, Indonesian
translation, tafsir (exegesis), and murottal audio recitation.

**Live**: https://bitquran.net
**Source data**: SutanLab Quran API (`VITE_API_URL`) — see `README.md`

---

## Tech Stack

```
Vite 8                Build tool & dev server
React 19              UI framework
TypeScript ~6         Strict mode, no `any`
TailwindCSS v4        Utility-first styling (CSS-first config in src/index.css)
React Router v7        Client-side routing (data router via createBrowserRouter)
TanStack Query v5     Server state, caching
Axios                 HTTP client (instance: default export of bitquran/services/api)
CVA                   class-variance-authority — component style variants
clsx + tailwind-merge cn() helper at bitquran/shared/utils
Vitest + Testing Library  Unit/component testing (jsdom)
Oxlint                Linting (+ ESLint only for react-hooks / react-refresh)
oxfmt                 Formatting
```

Package manager: **pnpm** (Node >= 24).

---

## Required Reading

Before writing any code, read the following:

| File                             | When to read                                            |
| -------------------------------- | ------------------------------------------------------- |
| `docs/architecture.md`           | Before any structural or routing change                 |
| `docs/conventions.md`            | Before writing any component, hook, util, or type       |
| `docs/data-model.md`             | Before touching types, the API layer, or query hooks    |
| `docs/adr/`                      | Before reversing or questioning an established decision |
| `.claude/personas/senior-dev.md` | Always — defines your role and mindset                  |

---

## Project Structure

```
src/
├── assets/                  # Static assets
│   ├── css/                 # font-config.css
│   ├── fonts/               # Rubik (UI), Saleem Quran (Arabic)
│   ├── icons/               # Icon React components + index barrel
│   └── images/              # Image assets + index barrel
├── components/              # Atomic Design system
│   ├── atoms/               # Smallest UI units
│   ├── molecules/           # Composed from atoms
│   ├── organisms/           # Complex, context-aware sections
│   ├── templates/           # Page layout shells (AppLayout, PageContentLayout)
│   └── index.ts             # Re-exports every layer — keep updated
├── pages/                   # Route-level components (lazy-loaded)
├── router/                  # Route table + mapping logic
│   ├── routes.tsx           # The Route[] definition
│   └── core/                # routeMapper, getNavbarRoutes
├── services/                # Server/data layer
│   ├── api/                 # Axios instance (default export `api`)
│   └── queries/             # TanStack Query hooks (useSurah, useAyah, …)
├── shared/                  # Cross-cutting code (NOT UI components)
│   ├── constants/           # App-wide constants
│   ├── hooks/               # Reusable behaviour hooks
│   ├── lib/                 # Wrappers around platform/3rd-party APIs (e.g. Head)
│   ├── types/               # Global & domain types
│   └── utils/               # Pure helper functions (cn, debounce, …)
└── test/                    # Vitest setup
```

> Global types, reusable hooks, third-party wrappers, and pure utilities all
> live under **`src/shared/`** — never at the root of `src/`.

---

## Import Aliases

Imports use the **`bitquran/*`** alias scheme (configured in both
`tsconfig.app.json` and `vite.config.ts`). Always prefer an alias over a
relative path that climbs out of the current folder.

```ts
import { Text, Icon } from 'bitquran/components'
import { useSurah } from 'bitquran/services/queries'
import api from 'bitquran/services/api'
import { cn, debounce } from 'bitquran/shared/utils'
import { useWindowDimensions } from 'bitquran/shared/hooks'
import type { SurahItem, VerseItem } from 'bitquran/shared/types'
import { ILLogoWide } from 'bitquran/assets/images'
```

Available aliases:
`bitquran/assets` · `bitquran/assets/images` ·
`bitquran/components` · `bitquran/pages` · `bitquran/router` ·
`bitquran/router/core` · `bitquran/services/api` · `bitquran/services/queries` ·
`bitquran/shared` · `bitquran/shared/constants` · `bitquran/shared/hooks` ·
`bitquran/shared/lib` · `bitquran/shared/types` · `bitquran/shared/utils` ·
`bitquran/package`

Within the same feature folder, short relative imports (`./Icon`,
`../useWindowDimensions`) are fine and are used in the codebase.

---

## Conventions (summary — full detail in `docs/conventions.md`)

### Components

- **Components** are default-exported function declarations:
  `export default function Toolbar(props: ToolbarProps) { … }`
- **Hooks & utils** are arrow functions assigned to a `const`, default-exported:
  `const useWindowDimensions = () => { … }` → `export default useWindowDimensions`
- One unit per folder: `ComponentName/ComponentName.tsx` (implementation) +
  `ComponentName/index.ts` (barrel export). PascalCase folder for components,
  camelCase for hooks/utils.
- Props interfaces are declared and **exported from `ComponentName.tsx`**
  (e.g. `export interface ToolbarProps { … }`) — there is no separate `.types.ts`
  file. `index.ts` is always a barrel, never implementation.

### Formatting (oxfmt — `.oxfmtrc.json`)

- Indentation: **4 spaces** · Semicolons: **none** · Quotes: **single**
- Trailing comma: **none** · `arrowParens: avoid` · `jsxBracketSameLine: true`

### Styling

- Tailwind v4, configured CSS-first via `@theme` in `src/index.css`
  (custom fonts `font-rubik`, `font-saleem-quran`; `content-container` utility).
- Component styles use **CVA** (`cva(...)`), even when there are no variants yet.
- Use **`cn()`** from `bitquran/shared/utils` to merge/condition class strings
  (it wraps `clsx` + `tailwind-merge`).

### Types

- Global & domain types → `src/shared/types/` (imported via `bitquran/shared/types`).
- Component Props types → exported from the component's `ComponentName.tsx`.

### Exports

- Every folder layer exposes a barrel `index.ts`. Update it immediately after
  adding a new file. Prefer importing through the barrel.

---

## Data & Caching

- All Qur'an data is fetched from the external API through the axios instance in
  `src/services/api` and consumed via TanStack Query hooks in
  `src/services/queries`. **Never call `axios`/`fetch` directly from a component.**
- The global default `staleTime` is set in `src/App.tsx` (5 minutes).
- Qur'an content is **immutable** (114 surahs, fixed verses & text). Query hooks
  for that data should set `staleTime: Infinity` — see
  `docs/adr/001-tanstack-query-staletime.md`. (Note: not every existing hook
  sets this yet — apply it when you touch one.)

---

## Audio

- Per-instance playback is handled by the `useAudioPlayer(src)` hook in
  `src/shared/hooks/useAudioPlayer` (returns `{ isPlaying, toggle }`).
- There is **no global audio context** in the current codebase. If a
  persistent/global player is needed, treat it as a design change and discuss
  it first — see `docs/adr/002-global-audio-context.md`.

---

## Arabic Text

- Arabic is rendered with the **Saleem Quran** webfont via the
  `font-saleem-quran` Tailwind utility (token defined in `src/index.css`).
- There is no dedicated `ArabicText` atom yet. If you introduce or extend
  Arabic rendering, centralising it is encouraged — see
  `docs/adr/003-arabic-text-atom.md` — but do not reference an atom that does
  not exist.

---

## Commands

Use these slash commands (in `.claude/commands/`) for structured tasks. Each
embeds the relevant persona and a quality checklist.

| Command                | Purpose                                                           |
| ---------------------- | ----------------------------------------------------------------- |
| `/new-atom [Name]`     | Create a new atom                                                 |
| `/new-molecule [Name]` | Create a new molecule                                             |
| `/new-organism [Name]` | Create a new organism                                             |
| `/new-feature [name]`  | Plan & scaffold a cohesive feature (pages + queries + components) |
| `/new-hook [name]`     | Create a shared hook or a query hook                              |
| `/review [path]`       | Code review with Critical/Warning/Suggestion output               |
| `/refactor [path]`     | Refactor to current conventions                                   |
| `/debug [description]` | Systematic root-cause debugging                                   |
| `/test [path]`         | Generate or complete test coverage                                |
| `/migrate [path]`      | Port a component from the legacy CRA app into this stack          |

---

## Do NOT

- ❌ Fetch data with raw `fetch`/`axios` inside a component — use a query hook
- ❌ Use `any` without an explanatory comment
- ❌ Define domain types inside a component file — they live in `shared/types`
- ❌ Put `hooks`, `lib`, `types`, or `utils` at the root of `src/` — use `shared/`
- ❌ Use relative paths that climb folders when a `bitquran/*` alias exists
- ❌ Add a dependency without flagging it first
- ❌ Leave `console.log` in committed code
- ❌ Reference files/atoms/contexts that do not exist in the repo

---

## Architecture Decisions

Key decisions are recorded in `docs/adr/`. Read before questioning an
established pattern.

| ADR   | Decision                                                         |
| ----- | ---------------------------------------------------------------- |
| `001` | TanStack Query + `staleTime: Infinity` for immutable Qur'an data |
| `002` | Audio playback approach (`useAudioPlayer` hook)                  |
| `003` | Centralising Arabic text rendering                               |
| `004` | CVA + clsx + tailwind-merge as the styling system                |
