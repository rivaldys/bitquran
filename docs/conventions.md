# Conventions — Bitquran

These conventions describe how this codebase is **actually written**. Match the
surrounding code; when in doubt, copy the closest existing example.

---

## Formatting

Controlled by **oxfmt** (`.oxfmtrc.json`). Run `pnpm fmt` before committing.

| Rule | Value |
|---|---|
| Indentation | 4 spaces |
| Semicolons | none |
| Quotes | single |
| Trailing comma | none |
| `arrowParens` | avoid (`x => …`, not `(x) => …`) |
| `bracketSpacing` | true (`{ foo }`) |
| `jsxBracketSameLine` | true |

---

## Files & Folders

- **One unit per folder**, entry point is `index.ts` / `index.tsx`.
  - Components: `PascalCase/` folder → `src/components/atoms/Icon/index.tsx`
  - Hooks: `camelCase/` folder → `src/shared/hooks/useWindowDimensions/index.ts`
  - Utils: `camelCase/` folder → `src/shared/utils/debounce/index.ts`
- Every layer exposes a **barrel** `index.ts` that re-exports its members.
  Update the barrel immediately after adding a file.
- Co-located CSS is allowed when Tailwind can't express it
  (e.g. `Backdrop/index.css`), imported from the component's `index.tsx`.

---

## Components

```tsx
// src/components/molecules/Example/index.tsx
import { cva } from 'class-variance-authority'
import type { ReactNode } from 'react'

export interface ExampleProps {
    children: ReactNode
    className?: string
}

const exampleStyle = cva('flex items-center')

export default function Example({ children, className }: ExampleProps) {
    return <div className={exampleStyle({ className })}>{children}</div>
}
```

- Components are **default-exported function declarations**
  (`export default function Name(...)`). Do not convert these to arrow consts.
- The **Props interface is declared and exported from the same `index.tsx`**
  (`export interface NameProps`). There is no separate `.types.ts` file.
- Extend the right HTML attributes when wrapping an element, e.g.
  `interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>`.
- Import domain types from `bitquran/shared/types` — never redefine them.
- A compound component attaches sub-parts to the function
  (e.g. `Select.Option = Option`) — see `src/components/atoms/Select`.

---

## Hooks & Utilities

```ts
// src/shared/utils/debounce/index.ts
const debounce = <T extends (...args: unknown[]) => void>(func: T, delay: number) => { … }
export default debounce
```

- Hooks and utils are **arrow functions** assigned to a `const`, then
  `export default`. The barrel re-exports them as named:
  `export { default as debounce } from './debounce'`.
- Hooks: clean up side effects in the `useEffect` return; give an explicit
  return type when the shape isn't obvious.
- Utils: keep them **pure** (no React, no I/O). Anything with a third-party
  client or platform side effect belongs in `shared/lib`, not `shared/utils`.

---

## Styling

- Tailwind v4 is configured **CSS-first** in `src/index.css` via `@theme`
  (fonts `font-rubik`, `font-saleem-quran`) and `@utility` (`content-container`).
- Component classes go through **CVA** (`cva(...)`), even single-style atoms.
  Pass consumer overrides through: `style({ className })`.
- Use **`cn()`** from `bitquran/shared/utils` to join/condition class strings
  when not using CVA directly (it merges with `clsx` + `tailwind-merge`).
- Inline styles only for genuinely dynamic values Tailwind can't express.

---

## Types

- **Global & domain types** → `src/shared/types/` (e.g. `SurahItem`,
  `VerseItem`, `IconProps`, route types). Import via `bitquran/shared/types`.
- **Component Props types** → exported inline from the component's `index.tsx`.
- Prefer `interface` for object shapes, `type` for unions.
- Avoid `any`; every unavoidable `any` needs an explanatory comment.

---

## Imports

- Use the `bitquran/*` aliases for cross-folder imports (see `CLAUDE.md`).
- Short relative imports inside the same feature folder are fine
  (`./Icon`, `../useWindowDimensions`).
- Prefer the barrel (`bitquran/components`) over deep file paths.

---

## Routing

- Routes are plain objects typed by the `Route` union in `shared/types`,
  listed in `src/router/routes.tsx`, and turned into React Router config by
  `src/router/core/routeMapper`.
- A route's `type` is `'page' | 'redirect' | 'group'`. Navbar entries are
  derived from `meta.navbar.order` via `getNavbarRoutes`.
- Page components are **lazy-loaded** (`lazy(() => import(...))`).

---

## Data Fetching

- One query hook per resource in `src/services/queries` (`useSurah`, `useAyah`,
  `useSurahList`). Components call the hook — never `axios`/`fetch` directly.
- Use the shared axios instance: `import api from 'bitquran/services/api'`.
- `queryKey` is an array including every variable the query depends on.
- For immutable Qur'an data set `staleTime: Infinity` (see ADR 001).

---

## Testing

- Vitest + Testing Library, `jsdom` environment, globals enabled
  (setup in `src/test/setup.ts`).
- Co-locate tests with the unit: `Name.test.tsx` / `useName.test.ts`.
- Test behaviour, not class strings or internal variable names. Wrap query-hook
  tests in a `QueryClientProvider`. See `.claude/commands/test.md`.
