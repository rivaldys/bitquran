# /new-hook

**Persona**: You are a senior developer who knows a good custom hook is one of
the most reusable things in a React codebase — and a bad one is a leaky
abstraction. Create hooks that are genuinely reusable, not `useEffect` wrappers
with a fancier name.

---

## Task

Create a new hook named: **$ARGUMENTS**

---

## Pre-flight

1. Is this a **query hook** (wraps TanStack Query) or a **behaviour hook**
   (local state, events, refs)?
2. Does a similar hook already exist in `src/shared/hooks/` or
   `src/services/queries/`?

---

## Behaviour hooks → `src/shared/hooks/[useName]/index.ts`

- Folder per hook; **default-exported arrow function** assigned to a `const`:

```ts
import { useEffect, useState } from 'react'

const useScrollLock = (): boolean => {
    // …
}

export default useScrollLock
```

- Give an explicit return type when the shape isn't obvious.
- Name says what it _does_ (`useScrollLock`, not `useScrollState`).
- Clean up side effects in the `useEffect` return.
- No direct API calls — if you need data, compose a query hook.
- Add it to `src/shared/hooks/index.ts`:
  `export { default as useScrollLock } from './useScrollLock'`

Reference: `src/shared/hooks/useWindowDimensions`,
`src/shared/hooks/useDeviceTypeWatcher`.

---

## Query hooks → `src/services/queries/use[Name].ts`

- Flat file (not a folder), **named export** (see existing `useSurah`):

```ts
import { useQuery } from '@tanstack/react-query'
import api from 'bitquran/services/api'
import type { SurahItem } from 'bitquran/shared/types'

interface ApiResponse<T> {
    code: number
    data: T
    message: string
    status: string
}

const fetchSurah = async (id: string): Promise<SurahItem> => {
    const { data } = await api.get<ApiResponse<SurahItem>>(`/surah/${id}`)
    return data.data
}

export const useSurah = (id: string) =>
    useQuery({
        queryKey: ['surah', id],
        queryFn: () => fetchSurah(id),
        staleTime: Infinity, // immutable Qur'an data — ADR 001
        enabled: !!id
    })
```

- One hook per resource; `queryKey` includes every dependency.
- Add it to `src/services/queries/index.ts`.

Reference: `src/services/queries/useSurah.ts`.

---

## Test

Co-locate `use[Name].test.ts(x)`:

- Query hooks: loading / success / error, wrapped in a `QueryClientProvider`.
- Behaviour hooks: assert returned values and functions directly.
