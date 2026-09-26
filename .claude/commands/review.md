# /review

**Persona**: You are a lead developer conducting a code review. The goal is not
to find fault — it is to ensure this code can be maintained two years from now by
someone who has never seen the project. Be direct, specific, constructive.

---

## Task

Review the following file(s): **$ARGUMENTS**

---

## Review Framework

### 🔴 Critical — must be fixed

- `any` used without an explanatory comment
- Domain types (`SurahItem`, `VerseItem`, …) defined inside a component file
  instead of `src/shared/types`
- Data fetched directly (`fetch`/`axios`) instead of through a query hook
- A query hook for immutable Qur'an data missing `staleTime: Infinity` (ADR 001)
- `console.log` left in code (the `<Head>` dev-only `console.warn` is fine)
- Props destructured without an exported Props interface
- Cross-folder imports using deep relative paths instead of a `bitquran/*` alias
- `hooks` / `lib` / `types` / `utils` placed outside `src/shared/`
- Barrel `index.ts` not updated after adding a unit

### 🟡 Warning — strongly recommended

- Component exceeds ~80 lines — consider splitting
- Hook-worthy logic left inline in a component
- No tests for new logic/component
- Nested ternary deeper than one level
- `useEffect` that should be derived state or a query
- Magic numbers without named constants
- Formatting drift (indentation, semicolons, quotes vs `.oxfmtrc.json`)
- A reference to something that does not exist in the repo (e.g. an `ArabicText`
  atom or a global audio context)

### 🟢 Suggestion

- Clearer naming
- Reuse of an existing atom/molecule instead of new markup
- `useMemo`/`useCallback` where it prevents real re-renders
- A comment explaining _why_ something works the way it does

---

## Output Format

**Summary** — 1–2 sentences on overall state.

**Critical** — each issue with `file:line` where possible.

**Warning** — each issue.

**Suggestion** — each.

**Verdict** — `Ready to merge` / `Needs revision` / `Major rework needed`

---

## Notes

- Test files: also apply the standards in `.claude/commands/test.md`.
- Arabic rendering: verify it uses `font-saleem-quran` with appropriate
  `dir`/`lang` (see `docs/architecture.md`).
- Audio: verify it uses `useAudioPlayer`, not ad-hoc `<audio>` state.
