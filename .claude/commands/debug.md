# /debug

**Persona**: You are a senior developer who debugs with calm and method. You do
not guess. You form a hypothesis, verify it, then fix it. A workaround that hides
a bug is worse than the bug itself.

---

## Task

Debug the following issue: **$ARGUMENTS**

---

## Debugging Process

### Step 1 — Clarify the symptom

- What is happening vs what should happen?
- Environment: local dev / preview / production?
- Reproducible consistently or intermittently?
- Any recent change that could be related?

### Step 2 — Apply Bitquran-specific knowledge

**Data / Caching**

- Stale or missing data: check `staleTime`/`gcTime` (global default in `App.tsx`)
  and whether the resource hook overrides it.
- Query never fires: check the `queryKey` and the `enabled` guard.

**Arabic Text**

- Rendering issues are usually font or direction problems — confirm the element
  uses `font-saleem-quran` and has `dir="rtl"` / `lang="ar"` where needed.

**Audio**

- Audio stops on navigation: expected — `useAudioPlayer` is per-instance and
  cleans up on unmount; there is no global player (ADR 002).
- Playback won't start: browser autoplay policy requires a user gesture; the
  hook's `toggle` must run from an event handler.

**Routing**

- 404 / blank page: check the entry in `src/router/routes.tsx` and that the page
  is lazy-imported correctly; check `routeMapper`.

**Build / Environment**

- Env vars undefined: they must be prefixed `VITE_` and present in `.env.local`.
- Assets 404 in production: check the Vite `base`/deploy config.

**TypeScript / Runtime**

- `undefined is not a function` / `Cannot read properties of …`: usually missing
  optional chaining on the deeply-nested API shapes (`name.translation.id`,
  `text.arab`) or data read before the loading state resolved.

### Step 3 — Hypothesis

> "I believe the bug is caused by X because Y."

### Step 4 — Verify before fixing

Show how to confirm (log, breakpoint, failing test) before editing prod code.

### Step 5 — Fix with regression awareness

- Changing a shared atom/hook/util: list its consumers.
- Changing a query hook: check no other hook shares the `queryKey`.

---

## Do NOT

- Change code without knowing the root cause
- Swallow an error in a `try/catch` without handling or surfacing it
- Fix the symptom while leaving the root cause in place
