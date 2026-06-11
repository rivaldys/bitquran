# Data Model — Bitquran

Global & domain types live in **`src/shared/types/`** and are imported via
`bitquran/shared/types`. This document describes the shapes that actually exist
there and how API responses are wrapped. Keep this file in sync with
`src/shared/types/index.ts`.

The data originates from the **SutanLab Quran API**, which is why the shapes are
deeply nested (e.g. `name.translation.id`, `text.arab`).

---

## Domain Types

### SurahItem

```ts
interface SurahItem {
    name: {
        long: string
        short: string
        translation: { en: string; id: string }
        transliteration: { en: string; id: string }
    }
    number: number
    numberOfVerses: number
    revelation: { arab: string; en: string; id: string }
    sequence: number
    tafsir: { id: string }
    preBismillah: {
        text: { arab: string; read: string }
        audio: { primary: string; secondary: string[] }
    } | null
    verses?: VerseItem[]
}
```

### VerseItem

```ts
interface VerseItem {
    audio: { primary: string; secondary: string[] }
    meta: {
        hizbQuarter: number
        juz: number
        manzil: number
        page: number
        ruku: number
        sajda: { obligatory: boolean; recommended: boolean }
    }
    number: { inQuran: number; inSurah: number }
    surah?: SurahItem
    tafsir: { id: { long: string; short: string } }
    text: { arab: string; transliteration: { en: string } }
    translation: { en: string; id: string }
}
```

> Terminology: a single verse is modelled as **`VerseItem`** (`text.arab` is the
> Arabic). Keep using these existing names rather than introducing parallel
> `Ayat`/`Ayah` types.

---

## UI / Support Types (also in `shared/types`)

```ts
interface IconProps {
    className?: string
    size?: number
    color?: string
    variant?: string
}
```

Routing types — `RouteComponent`, `RouteType`, and the `Route` union
(`IndexRoute | IndexRedirectRoute | PageRoute | GroupRoute | RedirectRoute`) —
also live here and drive `src/router/routes.tsx`.

---

## API Response Wrapper

The SutanLab API wraps payloads. The shape used by the query hooks is:

```ts
interface ApiResponse<T> {
    code: number
    data: T
    message: string
    status: string
}
```

A query hook unwraps it and returns the inner `data`:

```ts
// src/services/queries/useSurah.ts
const fetchSurah = async (id: string): Promise<SurahItem> => {
    const { data } = await api.get<ApiResponse<SurahItem>>(`/surah/${id}`)
    return data.data
}
```

This `ApiResponse<T>` wrapper is currently declared inside the query files. If a
second hook needs it, promote it to `src/shared/types` rather than duplicating.

---

## Placement Rules

- **Domain & shared types** (`SurahItem`, `VerseItem`, `IconProps`, route types)
  → `src/shared/types/`.
- **Component Props types** → exported inline from the component's `index.tsx`
  (e.g. `export interface ToolbarProps`). There is no `.types.ts` file convention
  in this project.
- Never define a domain type inside a component file.
