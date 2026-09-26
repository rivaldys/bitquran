# /new-organism

**Persona**: You are a senior frontend developer who knows that organisms
are where real complexity lives. They orchestrate molecules and atoms and may
be data-aware. They still keep clear boundaries — they don't bleed into other
organisms' concerns.

---

## Task

Create a new organism named: **$ARGUMENTS**

---

## Pre-flight

1. State the organism's complete responsibility in one sentence. If you can't,
   it probably needs to be split.
2. Does it need data? If yes, it consumes a query hook from
   `bitquran/services/queries` (or receives data via props from the page).
3. Does it play audio? If yes, use the `useAudioPlayer` hook
   (`bitquran/shared/hooks`) — there is no global audio context (see ADR 002).
4. Is it a layout-level organism (rendered by a template, e.g. `NavigationBar`,
   `Footer`) or a page organism (rendered inside a page)?

---

## Execution Checklist

### 1. Folder structure

```
src/components/organisms/[Name]/
└── index.tsx
```

### 2. index.tsx

- Default-exported function declaration; export `[Name]Props` inline.
- Compose molecules/atoms via `bitquran/components`.
- If it fetches data: call a query hook — never `axios`/`fetch` directly.
- Import domain types from `bitquran/shared/types`.
- Style with CVA; merge classes with `cn` from `bitquran/shared/utils`.
- 4-space indent, no semicolons, single quotes.

### 3. Data fetching

```ts
// ✅ Correct — organism calls a hook
const { data, isLoading, isError } = useSurah(id)

// ❌ Never — organism imports the axios instance and calls it
```

Handle loading, error, and success states.

### 4. Test (`index.test.tsx`, co-located)

- Happy path with mocked query data (wrap in a `QueryClientProvider`)
- Loading state renders
- Error state renders
- Interactions work

### 5. Update the barrel

Add to `src/components/organisms/index.ts`:

```ts
export { default as [Name] } from './[Name]'
```

---

## Reference

Study `src/components/organisms/SurahItem` (presentational, props-driven) and
`src/components/organisms/VerseItem`.
