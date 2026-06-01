# ADR 004 — CVA + clsx + tailwind-merge for styling

**Status:** Accepted

## Context

The app uses TailwindCSS v4 (configured CSS-first in `src/index.css`). Components
need a consistent, type-friendly way to declare class strings, express variants,
and let callers override classes without specificity fights or duplicate
conflicting Tailwind utilities.

## Decision

- **`class-variance-authority` (CVA)** declares component class strings and their
  variants. Even single-style atoms use `cva('…')` for consistency, and pass the
  consumer `className` through: `style({ className })`. See
  `src/components/atoms/Select` (variants) and `src/components/atoms/Text`.
- **`cn()`** (`src/shared/utils/cn`, exported from `bitquran/shared/utils`)
  composes class strings outside CVA. It wraps **`clsx`** (conditional joining)
  and **`tailwind-merge`** (last conflicting utility wins):

  ```ts
  import { type ClassValue, clsx } from 'clsx'
  import { twMerge } from 'tailwind-merge'
  const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
  export default cn
  ```

- `cn` lives in `shared/utils` (pure helper), **not** `shared/lib` (which is for
  third-party/platform wrappers such as `Head`).

## Consequences

- One predictable pattern for component styling and overrides.
- Conflicting Tailwind classes resolve deterministically via `tailwind-merge`.
- Dependencies: `class-variance-authority`, `clsx`, `tailwind-merge`.
