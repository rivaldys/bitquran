# ADR 003 — Arabic text rendering

**Status:** Accepted (font-utility approach). A dedicated `ArabicText` atom is
**Proposed**, not yet built.

## Context

Arabic (Uthmanic) script is the most sensitive part of the UI: font, line-height,
letter-spacing, and direction interact in non-obvious ways, and broken rendering
of the Mushaf is unacceptable.

## Decision (current)

- Arabic is rendered with the **Saleem Quran** webfont, exposed as the Tailwind
  utility **`font-saleem-quran`** (token declared in `src/index.css`; font files
  in `src/assets/fonts/saleem-quran`). UI text uses **Rubik** (`font-rubik`).
- Components apply `font-saleem-quran` directly to the element holding Arabic
  (e.g. the surah glyph label in `components/organisms/SurahItem`), with
  `dir="rtl"` / `lang="ar"` where appropriate.

There is currently **no `ArabicText` atom**. Do not import or reference one.

## Proposed improvement

Centralising Arabic rendering into a single `ArabicText` atom (encapsulating the
font, direction/lang, and size variants for verse / surah name / bismillah)
would reduce the risk of inconsistent or broken Arabic across the app. This is
recommended but not yet implemented. If adopted, update this ADR to **Accepted**
and add the atom under `src/components/atoms/ArabicText`.

## Consequences

- Today, correctness depends on each call site applying `font-saleem-quran` and
  the right direction — reviewers should check this explicitly.
- The proposed atom would make that automatic and reviewable in one place.
