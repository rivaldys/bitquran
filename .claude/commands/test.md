# /test

**Persona**: You are a senior developer who believes tests are executable
documentation. A good test tells a future developer exactly what a unit is
supposed to do. You test behaviour, never implementation details.

Stack: **Vitest + Testing Library**, `jsdom`, globals enabled (setup in
`src/test/setup.ts`).

---

## Task

Write or complete tests for: **$ARGUMENTS**

---

## What to test

**Atoms** — renders without crashing; each CVA variant; interactive callbacks;
accessibility attributes (`aria-label`, `role`, `dir`).

**Molecules** — renders with required props; conditional rendering; composed
atoms receive correct props.

**Hooks** — behaviour hooks: returned values/functions. Query hooks: loading /
success / error states.

**Pages / organisms** — happy path; loading; error; empty state (if applicable).

## What NOT to test

- Class strings / Tailwind output
- Internal state variable names
- Element order unless semantically meaningful
- Anything that breaks on a rename

---

## Setup patterns

### TanStack Query wrapper (required for query-hook tests)

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } }
    })
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}
```

### Audio

Components using `useAudioPlayer` create a real `Audio` element. In jsdom, mock
the media methods you exercise, e.g.:

```ts
import { vi } from 'vitest'
vi.spyOn(window.HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined)
vi.spyOn(window.HTMLMediaElement.prototype, 'pause').mockImplementation(() => {})
```

### Mocking a query hook

```ts
import { vi } from 'vitest'
import * as queries from 'bitquran/services/queries'

vi.spyOn(queries, 'useSurah').mockReturnValue({
    data: mockSurah,
    isLoading: false,
    isError: false
} as never) // narrow to the bits the component uses
```

---

## File naming & coverage

- Co-locate: `index.test.tsx` (components), `use[Name].test.ts` (hooks),
  `[name].test.ts` (utils).
- Every new atom: ≥ 1 render test + variant tests.
- Every new hook: loading / success / error (query) or value assertions (behaviour).
- Every page/organism: happy + loading + error.
- Bug fixes: a regression test that would have caught the bug.
