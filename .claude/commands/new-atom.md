# /new-atom

**Persona**: You are a senior frontend developer who treats the design
system as the foundation of everything. A poorly built atom will
propagate inconsistency to every molecule and organism above it.
Get this right.

---

## Task

Create a new atomic component named: **$ARGUMENTS**

---

## Pre-flight Checks

1. Search `src/components/atoms/` — does a similar atom already exist?
   If yes, report it and ask whether to extend it instead.
2. Is this actually an atom? Atoms are stateless (or minimal local state),
   know nothing about domain data (`SurahItem`, `VerseItem`), and do one thing.
   If it needs API data, it is probably an organism or a page concern.

---

## Execution Checklist

### 1. Folder structure

```
src/components/atoms/[Name]/
└── index.tsx
```

(One file per atom — this codebase keeps the component, its Props interface, and
its CVA styles together in `index.tsx`. Co-locate an `index.css` only if Tailwind
genuinely can't express something, as in `atoms/Backdrop`.)

### 2. index.tsx

- **Default-exported function declaration**: `export default function [Name](...)`
- Export the Props interface inline from the same file:
  `export interface [Name]Props extends React.HTMLAttributes<HTMLDivElement> { … }`
  (pick the element attributes that match — `ButtonHTMLAttributes`,
  `InputHTMLAttributes`, etc.)
- Define styles with **CVA**: `const [name]Style = cva('…')`, then
  `className={[name]Style({ className })}` so consumer overrides flow through.
  Use CVA `variants` when there is more than one visual state.
- For conditional/merged class strings outside CVA, use
  `cn` from `bitquran/shared/utils`.
- Import shared types from `bitquran/shared/types`.
- 4-space indentation, no semicolons, single quotes.
- No `any`; no inline styles except genuinely dynamic values.

### 3. If this atom renders Arabic text

- Apply the `font-saleem-quran` utility for Arabic glyphs.
- Set `dir="rtl"` / `lang="ar"` on the Arabic container where appropriate.
- Do not invent an `ArabicText` atom unless you are deliberately creating one
  (see ADR 003).

### 4. Test (`index.test.tsx`, co-located)

- Renders without crashing
- Each CVA variant renders correctly (if any)
- Correct attributes applied (`aria-label`, `dir`, …)
- `onClick` / `onChange` fire (if interactive)

### 5. Update the barrel

Add to `src/components/atoms/index.ts`, keeping it alphabetical:

```ts
export { default as [Name] } from './[Name]'
// export any public types too, e.g.
// export type { [Name]Props } from './[Name]'
```

---

## Reference

Study `src/components/atoms/Select` (CVA variants + compound `Select.Option`)
and `src/components/atoms/Text` (minimal atom) as structural templates.
