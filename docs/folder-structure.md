# Folder Structure

```
bitquran-new/
├── public/                          # Static public assets
│   ├── cover-image.png
│   ├── logo.png
│   └── logo192.png
│
├── src/
│   ├── assets/                      # Static assets (bundled)
│   │   ├── css/
│   │   │   └── font-config.css
│   │   ├── fonts/
│   │   │   ├── rubik/               # Rubik (UI font)
│   │   │   └── saleem-quran/        # Saleem Quran (Arabic font)
│   │   └── images/
│   │       ├── il_logo-wide.png
│   │       ├── il_logo.png
│   │       ├── il_quran.png
│   │       └── index.ts             # Barrel export
│   │
│   ├── components/                  # Atomic Design system
│   │   ├── atoms/                   # Smallest UI units
│   │   │   ├── AppLogo/
│   │   │   ├── BackToTop/
│   │   │   ├── Backdrop/
│   │   │   ├── Icon/
│   │   │   │   └── items/           # Individual icon components
│   │   │   ├── Input/
│   │   │   ├── SectionTitle/
│   │   │   ├── Select/
│   │   │   ├── Text/
│   │   │   ├── TextLabel/
│   │   │   ├── TextLink/
│   │   │   └── index.ts
│   │   │
│   │   ├── molecules/               # Composed from atoms
│   │   │   ├── ContentSection/
│   │   │   ├── Skeleton/
│   │   │   ├── Toolbar/
│   │   │   └── index.ts
│   │   │
│   │   ├── organisms/               # Complex, context-aware sections
│   │   │   ├── Footer/
│   │   │   ├── NavigationBar/
│   │   │   ├── SurahItem/
│   │   │   ├── VerseItem/
│   │   │   └── index.ts
│   │   │
│   │   ├── templates/               # Page layout shells
│   │   │   ├── AppLayout/
│   │   │   ├── PageContentLayout/
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts                 # Re-exports every layer
│   │
│   ├── pages/                       # Route-level components (lazy-loaded)
│   │   ├── About/
│   │   ├── ChangeLog/
│   │   ├── NotFound/
│   │   ├── Surah/
│   │   ├── SurahList/
│   │   └── Tafsir/
│   │
│   ├── router/                      # Route table + mapping logic
│   │   ├── core/
│   │   │   ├── GetElement/          # Lazy element wrapper
│   │   │   ├── getNavbarRoutes/     # Filters routes shown in navbar
│   │   │   ├── routeMapper/         # Maps route config to React Router
│   │   │   └── index.ts
│   │   ├── index.tsx                # createBrowserRouter setup
│   │   └── routes.tsx               # Route[] definition
│   │
│   ├── services/                    # Server / data layer
│   │   ├── api/
│   │   │   └── index.ts             # Axios instance (default export `api`)
│   │   └── queries/
│   │       ├── useAyah.ts
│   │       ├── useSurah.ts
│   │       ├── useSurahList.ts
│   │       └── index.ts
│   │
│   ├── shared/                      # Cross-cutting code (NOT UI components)
│   │   ├── constants/
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   │   ├── useAudioPlayer/
│   │   │   ├── useDeviceTypeWatcher/
│   │   │   ├── useWindowDimensions/
│   │   │   └── index.ts
│   │   ├── lib/                     # Wrappers around platform/3rd-party APIs
│   │   │   ├── Head/                # <head> tag manager
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   └── index.ts             # Global & domain types
│   │   └── utils/
│   │       ├── cn/                  # clsx + tailwind-merge helper
│   │       ├── debounce/
│   │       └── index.ts
│   │
│   ├── App.tsx                      # Root component + QueryClient setup
│   ├── index.css                    # Tailwind v4 @theme config
│   └── main.tsx                     # Entry point
│
├── docs/                            # Project documentation
│   ├── adr/                         # Architecture Decision Records
│   │   ├── 001-tanstack-query-staletime.md
│   │   ├── 002-global-audio-context.md
│   │   ├── 003-arabic-text-atom.md
│   │   └── 004-cva-styling.md
│   ├── architecture.md
│   ├── conventions.md
│   ├── data-model.md
│   └── folder-structure.md          # (this file)
│
├── .husky/
│   └── pre-commit                   # Runs lint-staged before commit
│
├── .claude/                         # Claude Code configuration
│   └── personas/
│       └── senior-dev.md
│
├── .env.example
├── .oxfmtrc.json                    # oxfmt formatter config
├── .oxlintrc.json                   # oxlint linter config
├── eslint.config.js                 # ESLint (react-hooks + react-refresh only)
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── vitest.setup.ts
```

## Konvensi Per Folder

Setiap komponen, hook, dan util mengikuti pola **named-impl + barrel**:

```
ComponentName/
├── ComponentName.tsx    # Implementasi + export interface Props
├── ComponentName.test.tsx
└── index.ts            # Barrel: export { default } from './ComponentName'
```

Folder PascalCase untuk komponen, camelCase untuk hook dan util.
