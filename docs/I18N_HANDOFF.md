# Internationalization (DE / EN / IT) — Handoff

Status of the trilingual rollout on the **`translations`** branch, and how to
pick it up. For terminology, the per-page recipe and the glossary, see the
companion doc **[`docs/i18n-glossary.md`](./i18n-glossary.md)** — this handoff is
the higher-level "where things stand + how to continue + how to ship".

---

## 1. TL;DR

- The site was **German-only**; it is now **trilingual: German (default) +
  English + Italian**, with localized URLs.
- **The entire navigable site is translated** — every page header/intro, every
  form's interface, the calculator hub, navigation, footer, legal pages, the
  cookie banner and all CTAs — in DE/EN/IT, verified live in the browser.
- **Phase 5 (this pass): all three deeper subsystems are now done** — calculator
  catalog chrome + render-only number/currency localization, customer-facing
  server emails + PDF, and the blog (page chrome + per-language post schema).
  See §6 for what each entailed. The **one** intentional remainder is the
  ~5,738 individual calculator product line-item titles, which render via a
  render-only SKU layer with **German fallback** until a bulk translation pass
  fills `src/i18n/calculatorCatalog.ts` — pricing data is never touched.
- All work is committed on `translations`. Quality gates were green at **every**
  commit: `npm run typecheck`, `npm run lint`, `npm run test:run` (29 tests).

---

## 2. Branch & how to ship

- Branch: **`translations`**, based on `development`. Working tree clean.
- Per the repo's git workflow, open a PR from `translations` → `main` (or merge
  into `development` first). Netlify deploys `main` to production; CI runs lint,
  typecheck, tests, the calculator-data audit, the build and a prod dependency
  audit on every push/PR.
- **No new runtime dependencies of concern**: added `i18next` + `react-i18next`
  only. No env vars, no build/Netlify config changes.
- Nothing here changes server behavior or the DB yet (those are in §6), so this
  branch is safe to ship on its own as a front-end-only release.

---

## 3. Architecture (what was built)

Stack: **i18next + react-i18next**, JSON resource files, all under `src/i18n/`.

| File | Purpose |
| --- | --- |
| `src/i18n/config.ts` | i18next init; registers all namespaces + locale JSON. **Add new namespaces here.** |
| `src/i18n/routes.ts` | The single source of truth: locales, the slug table, and all the path helpers. |
| `src/i18n/Link.tsx` | Drop-in `Link`/`NavLink` that localize their `to`. **Import these, not react-router's.** |
| `src/i18n/useLocale.ts` | `useLocale()`, `useLocalizedPath()`, `useSwitchLocale()`. |
| `src/i18n/LocaleSync.tsx` | Keeps `<html lang>` + i18next language in sync with the URL. |
| `src/i18n/locales/{de,en,it}/*.json` | The translations (8 namespaces × 3 locales = 24 files). |

**Locales & URLs.** German is the default and keeps its **original, un-prefixed
URLs** (`/gewerke`) so existing SEO/bookmarks never break. English and Italian
get a locale prefix **and** translated slugs (`/en/trades`, `/it/mestieri`).
The slug table lives in `SLUGS` in `routes.ts`.

**Canonical path = the German path.** Components link with German paths
(`to="/gewerke"`); the localized `<Link>` rewrites them per active locale.
`toCanonicalPath()` reverses any localized URL back to German so pathname-based
logic (nav highlighting, route metadata) keeps working. Admin (`/admin/*`) is
intentionally outside the localized space.

**Routing.** `src/App.tsx` generates a `<Route>` for every page × every locale
from the registry. **Metadata** (`<title>`, description, canonical, `og:locale`,
`hreflang` alternates) is emitted automatically by `src/utils/metadata.ts` +
`LocaleSync`; per-route titles live in `src/data/routeMeta.ts` (`ROUTE_META` =
German, `ROUTE_META_I18N` = en/it overrides).

**Namespaces:** `common`, `home`, `legal`, `kontakt`, `pages`, `projects`,
`kalk`, `blitz`.

**Shared page shells (to avoid 28× copy-paste):**
- `components/gewerke/GewerkePage.tsx` — the 17 trade pages.
- `components/common/CalcPage.tsx` — the 4 package + 7 heating pages.
Each real page is a thin call passing structural props (`crumbNumber`,
`backgroundImage`, `photoSet`, configurator) + a translation `key`.

### Adding a 4th language later
1. Add the code to `LOCALES` + the label maps in `routes.ts`, and an `en`/`it`
   sibling for every slug in `SLUGS`.
2. Add a `<locale>/` folder with the 8 JSON files.
3. Register it in `config.ts` and add a `ROUTE_META_I18N` block.
Everything else (routing, switcher, hreflang) is generated.

---

## 4. Conventions you must follow

- **Links:** import `Link`/`NavLink` from `../i18n/Link`, never from
  `react-router-dom`. Keep using German paths in `to`.
- **Markup in strings** (`<br/>`, `<em>`, `<strong>`): keep it in the JSON and
  render with `<Trans i18nKey="ns:key" components={{ em: <em/>, br: <br/> }} />`.
- **Arrays** (lists, meta, FAQ): store as JSON arrays, read with
  `t('key', { returnObjects: true }) as T[]`.
- **Server-contract rule (important):** for any `<select>`/radio whose value is
  **POSTed** to the server (contact `region`/`budget`, blitz `art`/`starttermin`),
  keep the submitted **value canonical German** and localize only the **display**.
  This keeps `server/mail.ts` templates working unchanged. See `KontaktForm.tsx`
  and `BlitzForm.tsx`.
- **CTA → contact-form preset:** `EndCtaLocal` was decoupled from German keyword
  matching. On translated pages pass an explicit **`art`** prop (e.g.
  `art="einzel"`); the preset message is localized via `common.contactPresetMsg`.
- **Data-driven pages:** reduce the `src/data/*` file to layout/render metadata +
  a stable `key`; move display text into the namespace keyed by that key.
- **Page titles:** prefer `ROUTE_META_I18N` over `usePageTitle`. (Dynamic pages
  like ProjektDetail still use `usePageTitle` with a `t()` value — that's fine.)

---

## 5. How to verify

```bash
npm run typecheck && npm run lint && npm run test:run   # all green
npm run dev                                             # then click DE | EN | IT
```
Manual spot-check: switch languages in the header on a few pages; confirm the
switcher keeps you on the equivalent page (it maps localized → canonical →
localized), and that `<html lang>` + the page `<title>` change.

**Before shipping the calculator catalog (§6.1):** also run
`npm run audit:calculator-data` and sanity-check a couple of calculator totals —
that catalog is pricing-coupled.

---

## 6. The three clusters — now DONE (Phase 5)

All three were completed in this pass. What each entailed:

### 6.1 Calculator product catalog  ✅ *(pricing-coupled — render-only)*
- New `src/i18n/calculatorCatalog.ts`: a **render-only** `CATALOG_TRANSLATIONS`
  `Map` + `localizeCatalog(key, german, locale)`, plus locale-aware
  `formatTsd` / `formatGroupedInt` / `formatEuroLocalized`. The German
  `title`/`sku`/`id` source fields are **never** touched — verified: `git status`
  on `src/data/calculator/packages` is empty and `audit:calculator-data` is green.
- Calculator chrome moved into the `kalk` namespace (`result.*`, `types.*`,
  `gastro.*`, `haus.*`, `buero.*`, `wohnung.*`, `gw.*`, `board.*`, `reno.*`,
  `pdf.*`): the 3 `*Result` components, **all 22 configurator boards** (the 4
  package boards haus/wohnung/buero/gastro + the 18 per-trade/heating
  `gewerke/*Board.tsx`, each wired via `gw.<trade>.types.<value>` keyed by the
  stable option value), `RenovationCalculator` (type labels + category/section
  titles via the SKU layer), `CalculatorPdfSender` modal, and the blitz step-2
  service display (POSTed values stay canonical German).
- ⚠️ Remainder: the ~5,738 individual product `row.title` values fall back to
  German via `localizeCatalog`. Seed `CATALOG_TRANSLATIONS` (or a bulk MT pass) to
  finish them; the seam is in place and pricing-safe.

### 6.2 Server outbound text  ✅
- New `server/i18n.ts`: a dependency-free `Record<Locale, …>` string catalogue +
  `normalizeLocale`, code→label maps, and locale-aware euro/number/quantity
  formatters. `locale` is threaded through the `/api/contact`, `/api/blitz`,
  `/api/calculator-pdf` payloads + validators (default `de`) and the 3 client
  callers (`useLocale()`).
- Localized by request locale: the **customer** confirmation emails + the
  calculator-PDF covering email + the generated PDF (`server/calculatorPdf.ts`).
  **Internal office-notification emails stay German** by design (read by the team).
  `tests/server/mail.test.ts` extended with en/it cases (32 tests green).

### 6.3 Blog  ✅
- New `blog` namespace (registered in `config.ts`); `Blog.tsx` + `BlogDetail.tsx`
  fully trilingual incl. per-locale date formatting; fetches pass `?locale=`.
- **Per-language post schema** (the data-model change): `PostDocument.translations`
  optional `{ en?, it? }` subdoc holding `{title, body, excerpt, readingTime}`.
  Top-level fields stay the **canonical German**; `posts.ts` `serialize(post, locale)`
  resolves `translations[locale]` with **German fallback** — so existing posts need
  **no migration**. `AdminEditor` gained DE/EN/IT content tabs; slug/counters/status
  stay global. Admin UI chrome is intentionally left German (outside localized URLs).

### 6.4 Live-audit follow-ups (caught by a page-by-page EN/IT sweep)  ✅
A function-word page scan misses noun-only German, so a **static "German literal
but no `useTranslation`"** sweep was run across every component. It surfaced and
fixed:
- **All 19 configurator boards** (18 `gewerke/*Board.tsx` + `WohnungSanierungBoard`)
  — see the note in §6.1 (`gw.*` keys keyed by the stable option `value`).
- **Home featured-project captions** (`FeaturedProjects.tsx`, `home.featured.projects.*`)
  — e.g. "Küche Eichenholz" → "Oak Kitchen"/"Cucina in rovere"; reuses the
  `projects` namespace wording. Hero-slide `alt`s in `home.ts` are not rendered here.
- **Calculator `customAreaLabel`s** (11) — localized at render via
  `localizeCatalog`; the handoff `scopeLabel` stays canonical German.
- **The `Chat.tsx` "Bau-Concierge" widget** — new `chat` namespace; brand name
  localized (EN "Construction Concierge" / IT "Concierge edile"); **`locale` is
  threaded to `/api/chat`** and `server/chat.ts` appends a language instruction so
  the bot replies in the visitor's language (German default unchanged).
- **`Lightbox.tsx`** (close/prev/next aria + "Mehr erfahren" → `cta.learnMore`,
  i18n `Link`) and **`ErrorBoundary.tsx`** (self-contained per-locale fallback copy).
- **Intentionally still German:** the `/admin/*` UI chrome (internal tooling) and
  the ~5,738 calculator product titles/descriptions (render-only German fallback).

---

## 7. Known flags & cleanup

- **Legal pages need a lawyer.** `Impressum` and `Datenschutz` carry a visible
  "the German version is legally binding" note; the EN/IT legal text is a
  provisional machine translation and should be reviewed before launch.
- **Interim German** (render-only fallback): the ~5,738 calculator product
  line-item titles/descriptions (see §6.1) and blog post bodies authored without
  an en/it translation (fall back to German per §6.3).
- **Minor leftovers:** `src/data/home.ts` hero-slide `alt` text is still German
  (screen-reader only; not rendered as visible text). Featured-project captions
  are now localized (§6.4).
- **Safe to prune** (dead German display fields now superseded by i18n):
  `projects.ts` (title/ttl/meta/headline/…), `gewerke.ts` (`TRADES` name/lead,
  `PROCESS_STEPS`), `komplettPakete` originals, `kalkulatorNav.ts` labels,
  `FAQ`/`createContactPresetFromCtaLabel` were already removed from `kontakt.ts`.
  Left in place to keep diffs reviewable; delete in a follow-up once verified.

---

## 8. Commit map (this branch, on top of `development`)

```
i18n foundation: trilingual DE/EN/IT with localized routing
Phase 2  full Home experience
Phase 3  self-contained pages (404 + legal)
Phase 4a contact system (form, FAQ, presets) + EndCtaLocal decoupling
Phase 4b Heizmethoden     4c Gewerke     4d KomplettPakete
Phase 4e Projekte (overview + 17 detail pages)
Phase 4f 17 trade page shells (GewerkePage)
Phase 4g 4 package + 7 heating page shells (CalcPage)
Phase 4h Kalkulator hub (+ pickers)
Phase 4i Blitz-Angebot intro + form wizard
```
