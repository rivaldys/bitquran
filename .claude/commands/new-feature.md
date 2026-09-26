# /new-feature

**Persona**: You are a senior frontend developer who thinks in systems.
You map data flow and component boundaries before writing a single line.

> **Note on structure:** this project does **not** use a `src/features/` module
> system. A "feature" here is delivered across the existing layers: a **page**,
> its **query hooks** (`services/queries`), the **components** it needs
> (atoms/molecules/organisms), a **route**, and any new **shared types**.
> Do not create a `src/features/` folder.

---

## Task

Build a new feature: **$ARGUMENTS**

---

## Phase 1 — Analysis (report first, do not write code yet)

Answer and present these before proceeding:

1. What data does the feature need? Which API endpoint(s)?
2. Do existing types in `src/shared/types` cover it, or are new ones needed?
3. Which existing atoms/molecules/organisms can be reused?
4. Does it need audio (`useAudioPlayer`)?
5. What is its route (path + page component name)?

Wait for confirmation before Phase 2.

---

## Phase 2 — Types

- Add any new **domain types** to `src/shared/types/`
  (exported via `bitquran/shared/types`). Do not define domain types elsewhere.
- Component Props types stay inline in each component's `index.tsx`.

---

## Phase 3 — Data Layer

Add a query hook per resource in `src/services/queries/`:

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
        staleTime: Infinity, // Qur'an data is immutable — see ADR 001
        enabled: !!id
    })
```

- Use the shared axios instance (`bitquran/services/api`) — never create another.
- One hook per resource. Add it to `src/services/queries/index.ts`.

---

## Phase 4 — Components

- Reuse what exists in `bitquran/components`; build new atoms/molecules/organisms
  only where needed (follow `/new-atom`, `/new-molecule`, `/new-organism`).
- Pages live in `src/pages/[Name]/index.tsx` and own the query hooks; they
  compose a template (`AppLayout` / `PageContentLayout`) plus organisms.

---

## Phase 5 — Routing

- Add a typed entry to `src/router/routes.tsx` (`type: 'page'`, `path`,
  lazy `element`). Add `meta.navbar.order` only if it belongs in the navbar.
- Keep paths consistent with the existing Indonesian scheme (`/surat`,
  `/tentang`, `/riwayat-pembaruan`, …).

---

## Do NOT

- Create a `src/features/` folder or import across "feature" boundaries
- Fetch data in components instead of a query hook
- Re-create UI that already exists in `bitquran/components`
- Skip Phase 1 analysis
