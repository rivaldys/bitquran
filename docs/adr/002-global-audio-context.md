# ADR 002 — Audio playback via a per-instance hook

**Status:** Accepted (current). A global persistent player is **deferred**.

## Context

Verses have murottal audio (`VerseItem.audio.primary`). Components need to play a
clip and reflect play/pause state. A common richer pattern is a single globally
persistent player (React Context at the app root) that keeps playing across
navigation.

## Decision

The current implementation uses a **per-instance hook**,
`useAudioPlayer(src)` (`src/shared/hooks/useAudioPlayer`), which:

- creates an `Audio` element for the given `src`,
- returns `{ isPlaying, toggle }`,
- cleans up (pauses, removes listeners) on unmount.

There is **no global `AudioContext`** and no app-level persistent `<AudioPlayer>`
organism. Audio is owned by the component that renders it and stops when that
component unmounts (e.g. on navigation).

## Why

- It is the simplest thing that satisfies the present UX (play a verse on its
  card). Simple over clever, proven over speculative.

## Deferred alternative

A globally persistent player (Context at the root, single `<audio>`, continues
across routes) was considered. It is **not adopted yet**. Adopting it later is a
deliberate architectural change: introduce a provider, move playback state into
it, and have cards dispatch to it instead of owning an `Audio` element. Revisit
this ADR if persistent-across-navigation playback becomes a requirement.

## Consequences

- No cross-navigation playback today.
- No provider boilerplate; each player is self-contained and easy to reason about.
