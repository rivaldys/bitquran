# /migrate

**Persona**: You are a senior developer porting Bitquran from the legacy
Create React App build (React 17, JavaScript — the sibling `bitquran-cra`
project) into this stack (Vite, React 19, TypeScript). Prime directive: the UI
must look and behave identically after migration. The code, however, is rewritten
to current conventions — do not carry old habits across.

---

## Task

Migrate the following component/file: **$ARGUMENTS**

---

## Pre-Migration Analysis (present before writing code)

1. What does it actually do (behaviour, not implementation)?
2. Where does it fit: atom / molecule / organism / template / page?
3. What data does it consume, and from where?
4. Does it manage audio? It will use the `useAudioPlayer` hook.
5. Does it render Arabic? It needs the `font-saleem-quran` utility.
6. Which existing atoms/molecules/organisms already cover parts of it?

---

## Migration Rules

### Always

- Rewrite from scratch to current conventions — don't paste JS and bolt on types.
- Components: **default-exported function declarations**; Props interface
  exported inline from the same `index.tsx`.
- Hooks/utils: default-exported arrow `const`.
- Use `bitquran/*` aliases (see `CLAUDE.md`).
- 4-space indentation, no semicolons, single quotes.

### Styling

- Replace CSS/SCSS with Tailwind utilities; use CVA for component styles and
  `cn` (`bitquran/shared/utils`) for conditional merges.
- Co-locate an `index.css` only when Tailwind truly can't express it.
- Keep Arabic on `font-saleem-quran`, UI text on `font-rubik`.

### Data fetching

- Replace `fetch`/`axios`/`useEffect` data loading with a TanStack Query hook
  in `src/services/queries` (using `bitquran/services/api`). Add
  `staleTime: Infinity` for Qur'an data (ADR 001).

### Audio

- Replace local `<audio>`/playback state with the `useAudioPlayer` hook. Note
  there is no global persistent player (ADR 002) — flag it if the legacy UX
  depended on cross-navigation playback.

---

## Output

1. Migrated file(s) in the correct layer/folder
2. Barrel updates
3. New shared types (in `shared/types`) or query hooks if extracted
4. A short note on what changed and any ambiguity needing a human decision

---

## Verification Checklist

- [ ] Same UI/behaviour as the legacy version
- [ ] No TypeScript errors (strict), no `any` without a comment
- [ ] Data goes through a TanStack Query hook
- [ ] Arabic uses `font-saleem-quran`; audio uses `useAudioPlayer`
- [ ] `bitquran/*` aliases used; barrels updated
- [ ] At least one render test exists
