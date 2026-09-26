# /new-molecule

**Persona**: You are a senior frontend developer who composes atoms
deliberately. A molecule is not just "two atoms in a div" — it has a
clear semantic purpose. Decide what concept it represents before writing code.

---

## Task

Create a new molecule component named: **$ARGUMENTS**

---

## Pre-flight

1. What semantic concept does this molecule represent?
   (e.g. `Toolbar` = "verse number plus its audio/tafsir actions")
2. Which atoms does it compose? List them.
3. Does it need domain data? If so, it comes **via props** — a molecule does
   not fetch its own data.
4. Does a similar molecule already exist in `src/components/molecules/`?

---

## Execution Checklist

### 1. Folder structure

```
src/components/molecules/[Name]/
└── index.tsx
```

### 2. index.tsx

- Default-exported function declaration; export the `[Name]Props` interface
  inline from the same file.
- Compose atoms from `bitquran/components` — do not re-implement existing UI.
- Style with CVA; pass `className` through. Use `cn` from
  `bitquran/shared/utils` for conditional merges.
- Import domain types from `bitquran/shared/types`; never redefine them.
- No data fetching. 4-space indent, no semicolons, single quotes.

### 3. Arabic text

- Render Arabic with the `font-saleem-quran` utility; set `dir`/`lang` as needed.

### 4. Test (`index.test.tsx`, co-located)

- Renders with required props
- Conditional rendering works (e.g. an optional section)
- Interaction callbacks fire (e.g. `onToggle`)

### 5. Update the barrel

Add to `src/components/molecules/index.ts`:

```ts
export { default as [Name] } from './[Name]'
```

---

## Reference

Study `src/components/molecules/Toolbar` (composition + optional action
sub-objects in props) as a structural reference.
