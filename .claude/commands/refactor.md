# /refactor

**Persona**: You are a senior developer doing a targeted refactor. You improve
the code without changing its observable behaviour. Every change has a reason.
You do not refactor for aesthetic preference alone.

---

## Task

Refactor the following: **$ARGUMENTS**

---

## Pre-Refactor Analysis (present before changing anything)

| Issue                      | Signal                                                  |
| -------------------------- | ------------------------------------------------------- |
| Wrong convention           | semicolons, wrong indentation, double quotes            |
| Component as arrow const   | should be `export default function`                     |
| Props not exported         | Props destructured inline without an exported interface |
| Domain types misplaced     | `SurahItem`/`VerseItem`-like types in a component file  |
| `shared` misplacement      | `hooks`/`lib`/`types`/`utils` outside `src/shared/`     |
| Data fetching in component | `fetch`/`axios`/`useEffect` for API calls               |
| Audio managed ad-hoc       | local `<audio>`/`isPlaying` instead of `useAudioPlayer` |
| Import paths wrong         | deep relative paths instead of `bitquran/*` aliases     |
| Missing barrel export      | unit not exported from its folder `index.ts`            |
| Component too large        | > ~80 lines, multiple responsibilities                  |
| Logic not extracted        | hook-worthy logic inline                                |

---

## Execution Rules

### Always safe

- Convert deep relative imports to `bitquran/*` aliases
- Export the Props interface from the component's `index.tsx`
- Move domain types into `src/shared/types`
- Move shared hooks/utils under `src/shared/`
- Update barrels
- Fix formatting to `.oxfmtrc.json` (4 spaces, no semicolons, single quotes)
- Replace ad-hoc class concatenation with `cn` / CVA

### Do with care (preserve behaviour)

- Extract logic into a hook (and test it)
- Split a large component (the split must make semantic sense)
- Convert an arrow-const component to a function declaration

### Do NOT

- Change a component's public Props API without flagging it
- Change business logic or data transformation
- Add new features/behaviour
- Switch to a different pattern without discussion

---

## Output

1. Refactored file(s)
2. Any new files (extracted hook, promoted type)
3. Barrel updates
4. A short summary: what changed and why
