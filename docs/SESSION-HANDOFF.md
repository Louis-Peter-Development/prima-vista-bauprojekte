# Session handoff — Prima Vista Bauprojekte

Snapshot for continuing in a new chat. For the i18n *architecture* and the
DE→EN→IT→FR terminology, see **[`docs/I18N_HANDOFF.md`](./I18N_HANDOFF.md)** and
**[`docs/i18n-glossary.md`](./i18n-glossary.md)**. This file is "where things
stand + how the repo is set up + what's next".

_Last updated: 2026-06-30._

---

## 1. TL;DR — current state

- The site is **quadrilingual: German (default) · English · Italian · French**,
  with localized URLs, plus a navbar redesign, instant search, a compact
  language switcher, an About-us link, a translated calculator product catalog
  (EN/IT), and a floor-plan picker in the apartment calculator.
- **`main`** now contains the big internationalization PR — **PR #82 was merged**
  (`origin/main` = `88f3c3f Merge pull request #82`).
- **`development`** is **3 commits ahead of `main`** — the apartment floor-plan
  picker work, pushed to `origin/development` but **not yet on `main`** (no PR
  opened for these 3 yet):
  - `42f823a` apartment-type picker as floor-plan cards with localized area overlay
  - `4874203` crop floor-plan renders text-free + show per-type thumbnails
  - `063c2c6` floor-plan preview in the apartment calculator
- Quality gates are green at the dev tip: `npm run typecheck`, `npm run lint`,
  `npm run test:run` (32 tests), `npm run audit:calculator-data` (0 errors),
  and all 10 i18n namespaces have **DE/EN/IT/FR key parity**.

## 2. Branches & working copies (read this — it's non-obvious)

- **Branches:** only **`main`** and **`development`**. (The old local
  `translations` branch was deleted; it's gone.)
- **Two working directories share one git repo:**
  - **Main folder** `/Users/.../Projects/prima-vista-bauprojekte` — the primary
    dir. It has been left **on `development`** for the next session.
  - A temporary worktree `.claude/worktrees/inspiring-gauss-61138d` (the previous
    session's). Everything in it is committed/pushed; it can be removed any time
    with `git worktree remove` — nothing lives only there.
- A `git stash` sits in the main folder (`stash@{0}` "antigravity translations
  WIP"). It's a backup of a parallel effort whose **valuable parts (the EN/IT
  product dictionaries + package photos) were already merged into development**.
  Safe to leave or `git stash drop`.
- **Git workflow used all session:** work on `development` → commit → `git push
  origin development`. `main` only changes via a PR from `development`. (Per the
  repo's git-workflow note: work on development, PR to main; no extra feature
  branches.)

## 3. To continue in the new chat

1. Work in the **main folder on `development`**. Sanity check:
   `git branch` → `* development`; `git status` → clean; `git log --oneline -1`
   → `42f823a`.
2. Make changes → `git add` → commit → `git push origin development`.
3. When ready to ship the 3 floor-plan commits (and anything new) to production,
   open a **`development` → `main`** PR (`gh pr create --base main --head
   development`). `main` deploys to production via Netlify.
4. Verify before pushing: `npm run typecheck && npm run lint && npm run
   test:run && npm run audit:calculator-data`, and check DE/EN/IT/FR JSON parity.

## 4. What was built this session (on top of the merged i18n base)

- **French (fr) as the 4th locale.** 10 `src/i18n/locales/fr/*.json` namespaces
  (parity-checked), French slugs for every route, `ROUTE_META_I18N` + server
  emails/PDF (`server/i18n.ts`) + `ErrorBoundary` + blog schema/admin tab +
  catalog formatting. `localeFromPathname`, `OG_LOCALE` and `SlugMap` are now
  generic over `LOCALES`, so a 5th language needs no special-casing.
- **Compact language switcher** (`LanguageSwitcher.tsx`) — shows the active
  locale, expands on hover/click; reads the list from `LOCALES`.
- **Navbar** (`Header.tsx`): Services dropdown (Packages/Trades/Heating),
  Contact link, **search** (`SearchBar.tsx` + `src/data/searchIndex.ts`,
  pages + services + magazine), and an **About us** link → `/#ueber-uns`
  (founders section on Home).
- **Calculator product catalog translated EN/IT.** `src/i18n/catalog/{en,it}.json`
  (~1.1k entries keyed by the canonical-German string) are consulted by
  `localizeCatalog` in `src/i18n/calculatorCatalog.ts`. **FR products still fall
  back to German** (no `fr.json` yet).
- **Apartment calculator floor-plan picker** (`WohnungSanierungBoard.tsx`):
  the 4 type choices (studio 50 / 2-room 100 / 3-room 150 / maisonette 200 m²)
  are cropped, text-free floor-plan cards with a **localized** area overlay
  (`{n} qm/m²` + Wohnfläche/Living area/Superficie/Surface). Images:
  `public/assets/img/leistungen/wohnung-grundriss-{50,100,150,200}.webp`.

## 5. Key files & conventions

- **i18n:** `src/i18n/routes.ts` (`LOCALES`, `SLUGS`, path helpers),
  `src/i18n/config.ts` (namespaces), `src/i18n/locales/<loc>/<ns>.json`.
  Always import `Link`/`NavLink` from `src/i18n/Link`. Add a locale via the
  recipe in `I18N_HANDOFF.md` §3.
- **Calculator catalog (render-only translation):**
  `src/i18n/calculatorCatalog.ts` — `localizeCatalog(key, german, locale)` plus
  the `catalog/` dicts and locale-aware `formatTsd`/`formatEuroLocalized`.
  **NEVER edit the German `title`/`sku`/`id` in `src/data/calculator/packages/*`**
  — the pricing engine, the `audit:calculator-data` script and the server PDF
  key on them. Translate at render only.
- **Images:** source renders are staged (gitignored) under
  `docs/Leistungen/...`; optimize to webp into `public/assets/img/` with
  `cwebp`/`magick`. Floor-plan renders carry baked-in **German** text — crop it
  out and overlay localized labels via CSS (see the apartment picker).
- **Server is i18n'd separately** (`server/i18n.ts`, no i18next) — its `Locale`
  type is defined locally; keep it in sync when adding a locale.
- **Admin** (`/admin/*`) is intentionally outside the localized URL space; its
  chrome stays German.

## 6. Open follow-ups (none blocking)

- **Ship the floor-plan work to `main`** (open the dev→main PR for the 3 commits).
- **FR product catalog:** add `src/i18n/catalog/fr.json` (~1.1k entries) and add
  `fr` to `PRODUCT_DICT` in `calculatorCatalog.ts` so French product
  titles/descriptions stop falling back to German. EN/IT are done.
- **Haus-Sanierung floor plans:** the user has source renders under
  `docs/Leistungen/Komplett-Pakete/Haus-Sanierung` (50/100/150/200 m² — note
  those sizes match the *apartment* presets, not the house types 60/60/120/120).
  A house floor-plan picker could be added if wanted.
- **Apartment cards** currently show area only (no "Studio / 2-room" type name);
  the type label is on the `aria-label`. Add it visibly if desired.
- **Legal pages** (Impressum/Datenschutz) are provisional machine translation in
  all non-German locales — need a lawyer's review before launch.
- Optional: refresh the older "trilingual" wording still scattered in some docs.
