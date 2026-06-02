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

- **One unit per folder**, with separate implementation and barrel files — applies to
  every layer: components, hooks, utils, and lib.
  - Components: `PascalCase/` folder → `ComponentName.tsx` (implementation) + `index.ts` (barrel)
    - e.g. `src/components/atoms/Icon/Icon.tsx` + `src/components/atoms/Icon/index.ts`
  - Hooks: `camelCase/` folder → `useHookName.ts` (implementation) + `index.ts` (barrel)
    - e.g. `src/shared/hooks/useWindowDimensions/useWindowDimensions.ts` + `index.ts`
  - Utils: `camelCase/` folder → `utilName.ts` (implementation) + `index.ts` (barrel)
    - e.g. `src/shared/utils/debounce/debounce.ts` + `index.ts`
  - Lib: same as components — `Name.tsx` + `index.ts` (barrel exports default + Props type)
- Every component folder has an **`index.ts` barrel** that re-exports the default and any public named exports:
  ```ts
  export { default } from './ComponentName'
  export type { ComponentNameProps } from './ComponentName'
  ```
- Every layer exposes a **barrel** `index.ts` that re-exports its members.
  Update the barrel immediately after adding a file.
- Co-located CSS is allowed when Tailwind can't express it
  (e.g. `Backdrop/Backdrop.css`), imported from the component's `ComponentName.tsx`.

---

## Components

```tsx
// src/components/molecules/Example/Example.tsx
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

```ts
// src/components/molecules/Example/index.ts
export { default } from './Example'
export type { ExampleProps } from './Example'
```

- Components are **default-exported function declarations**
  (`export default function Name(...)`). Do not convert these to arrow consts.
- The **Props interface is declared and exported from `ComponentName.tsx`**
  (`export interface NameProps`). Avoid separate `.types.ts` files for simple
  components. Exception: when a component folder contains multiple files that
  all share the same types (e.g. `Icon/items/*.tsx` all needing `SvgIconProps`),
  a co-located `ComponentName.types.ts` is appropriate. The barrel `index.ts`
  re-exports those types so consumers never import from `.types` directly.
- **`index.ts` is always the barrel** — it re-exports the default and any public types.
  Never put implementation in `index.ts`.
- Extend the right HTML attributes when wrapping an element, e.g.
  `interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>`.
- Import domain types from `bitquran/shared/types` — never redefine them.
- A compound component attaches sub-parts to the function
  (e.g. `Select.Option = Option`) — see `src/components/atoms/Select`.
- **`React.memo`** — wrap the function declaration directly to keep the name
  visible in DevTools:
  ```tsx
  export default memo(function HeavyList({ items }: HeavyListProps) {
      return <ul>{items.map(…)}</ul>
  })
  ```
- **`forwardRef`** — the API requires a callback, so use an arrow function and
  set `displayName` explicitly so DevTools still shows the component name:
  ```tsx
  const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
      return <input ref={ref} {...props} />
  })
  Input.displayName = 'Input'
  export default Input
  ```

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
  (setup in `vitest.setup.ts`).
- Co-locate tests with the unit: `ComponentName.test.tsx` / `useName.test.ts`.
- Test behaviour, not class strings or internal variable names. Wrap query-hook
  tests in a `QueryClientProvider`. See `.claude/commands/test.md`.
