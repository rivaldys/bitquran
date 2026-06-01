# ADR 001 — TanStack Query with `staleTime: Infinity` for Qur'an data

**Status:** Accepted (apply when touching each hook)

## Context

Qur'an content is immutable: 114 surahs with fixed verses, fixed Arabic text, and
stable translation/tafsir. The data is served by the external SutanLab Quran API
and consumed through TanStack Query hooks in `src/services/queries`.

Re-fetching immutable content wastes bandwidth and causes avoidable loading
states, which is especially undesirable on mid-range Android devices and slow
connections.

## Decision

- Server state is managed by **TanStack Query v5**.
- Hooks for **immutable Qur'an content** set `staleTime: Infinity` so a fetched
  surah/verse/tafsir is never considered stale and re-fetched within a session.
- The global default `staleTime` (set in `src/App.tsx`, currently 5 minutes)
  applies to anything that does not opt in to `Infinity`.
- Every hook lives in `src/services/queries`, uses the shared axios instance
  (`bitquran/services/api`), and exposes a stable `queryKey`.

## Status of implementation

Not every existing hook sets `staleTime: Infinity` yet (e.g. `useSurah` relies on
the global default). When you create or modify a Qur'an-data hook, add it.

## Consequences

- Instant renders from cache on repeat navigation.
- Cache invalidation is essentially never needed for content data.
- Truly dynamic data (if ever added, e.g. search) must opt **out** with its own
  shorter `staleTime`.
