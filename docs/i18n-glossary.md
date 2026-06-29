# Translation glossary & i18n guide

Prima Vista is a German construction company. The site is **trilingual**:
German (default), English and Italian. This file keeps terminology, tone and
the technical conventions consistent as translation rolls out across the site.

## Tone of voice
Premium, confident, understated. Short declarative sentences. Avoid hype and
exclamation marks. The German copy addresses the customer formally (Sie); keep
English neutral-professional and Italian formal (Lei / "il suo progetto").

## Domain glossary (DE → EN → IT)
Keep these consistent everywhere. Where a term is a Prima Vista product name it
is translated, not left in German.

| German | English | Italian |
| --- | --- | --- |
| Sanierung | renovation | ristrutturazione |
| Renovierung | refurbishment | rinnovo |
| Gewerk / Gewerke | trade / trades | lavorazione / lavorazioni (nav: Lavori) |
| Komplett-Pakete | complete packages | pacchetti completi |
| Blitz-Angebot | express quote | preventivo express |
| Kalkulator | calculator | preventivatore |
| Festpreisgarantie | fixed-price guarantee | garanzia di prezzo fisso |
| Bauleitung | site management | direzione lavori |
| Generalunternehmer | main contractor | general contractor |
| aus einer Hand | from a single source | da un unico interlocutore |
| Werksgewähr | workmanship warranty | garanzia |
| Haus-Sanierung | house renovation | ristrutturazione casa |
| Wohnung-Sanierung | apartment renovation | ristrutturazione appartamento |
| Gastronomie-Ausbau | restaurant fit-out | allestimento ristorazione |
| Büro-Ausbau | office fit-out | allestimento ufficio |
| Wärmepumpe | heat pump | pompa di calore |
| Heizkörper | radiator | radiatore |
| Fußbodenheizung | underfloor heating | riscaldamento a pavimento |
| Termin vereinbaren | book an appointment | fissa un appuntamento |

Proper nouns stay unchanged: **Prima Vista**, **Bauprojekte**, **Frankfurt**,
**Emmenbrücke**, founder names (Daniel & Monica), phone numbers, addresses,
email addresses. City names may be localized in body copy (Francoforte) but not
in addresses.

## Architecture (how it works)
- **Locales & default**: `de` (default, un-prefixed URLs), `en`, `it`.
  Defined in `src/i18n/routes.ts`.
- **URLs**: German keeps its original slugs (`/gewerke`). English and Italian
  use a locale prefix **and** translated slugs (`/en/trades`, `/it/mestieri`).
  The slug table lives in `src/i18n/routes.ts` (`SLUGS`).
- **Canonical path = the German path.** Components link with German paths
  (`to="/gewerke"`); the localized `<Link>`/`<NavLink>` in `src/i18n/Link.tsx`
  rewrite them to the active locale. Always import Link/NavLink from
  `../i18n/Link`, **not** from `react-router-dom`.
- **Strings** live in `src/i18n/locales/<locale>/<namespace>.json`. Namespaces
  so far: `common` (chrome: nav, header, footer, shared CTAs) and `home`.
  Add a namespace per page/area as translation expands and register it in
  `src/i18n/config.ts`.
- **Markup in strings**: stylized headings keep `<br/>` and `<em>` inside the
  JSON and are rendered with `<Trans components={{ em: <em/>, br: <br/> }} />`.
- **Metadata**: per-route titles/descriptions live in `src/data/routeMeta.ts`
  (`ROUTE_META` = German, `ROUTE_META_I18N` = en/it overrides). `<html lang>`,
  canonical URL, `og:locale` and `hreflang` alternates are emitted automatically
  by `src/utils/metadata.ts` + `src/i18n/LocaleSync.tsx`.
- **Admin** (`/admin/...`) is intentionally outside the localized URL space.

## How to translate a page (the repeatable recipe)
1. Create `src/i18n/locales/{de,en,it}/<page>.json`; the German file is the
   verbatim source of truth extracted from the component.
2. Register the namespace in `src/i18n/config.ts`.
3. In the component: `import { Link } from '../i18n/Link'`, call
   `useTranslation('<page>')`, replace literal text with `t('…')` and stylized
   headings with `<Trans>`.
4. Add the page's `en`/`it` meta to `ROUTE_META_I18N` in `routeMeta.ts`.
5. Translate **in context** (whole sections at once), not key-by-key — that is
   what keeps the copy natural. Follow the glossary above.
6. Verify: `npm run typecheck && npm run lint`, then check the page in all three
   languages in the browser.

## Namespaces
`common` (chrome: nav, header, footer, cookie banner, 404, contact-preset msg),
`home` (full Home page), `legal` (Impressum + Datenschutz), `kontakt` (contact
page), `pages` (all overview + trade/package/heating page shells: calc.*, gw.*,
trade.*, gewerke.*, pakete.*, heizmethoden.*), `projects` (Projekte + details),
`kalk` (calculator hub + pickers), `blitz` (express-quote intro + form).
Register new ones in `config.ts`.

Pattern for data-driven pages: reduce the `src/data/*` file to layout/render
metadata + a stable `key`, and move all display text to the relevant namespace
keyed by that key (see gewerke.ts / komplettPakete.tsx / projects.ts).

Shared page shells: `GewerkePage` (17 trade pages), `CalcPage` (4 package + 7
heating pages) — each page is a thin call passing structural props + a key.

Server-contract rule: for `<select>`/radio enums that get POSTed (contact
region/budget, blitz art/starttermin), keep the submitted VALUE canonical German
and only localize the displayed label, so server email templates don't change.

## Status
- ✅ Foundation: i18n library, localized routing, language switcher, locale
  metadata/hreflang.
- ✅ Phase 1–2: global chrome (Header, Footer, cookie consent) + the entire
  Home page incl. all subcomponents.
- ✅ Phase 3 (self-contained pages): NotFound, Impressum, Datenschutz.
  NOTE: legal/privacy pages carry a "German version is binding" note and need a
  lawyer's review before launch — machine translation of legal text is provisional.
- ✅ Phase 4a (contact system): Kontakt page, form + validation + success/error
  states, FAQ. EndCtaLocal decoupled — pass an explicit `art` prop on translated
  pages (don't rely on label keyword matching); preset message is localized via
  `common.contactPresetMsg`. Select VALUES stay canonical German (server contract);
  only the display is localized.
- ✅ Phase 4b–d (overview pages): Heizmethoden, Gewerke, KomplettPakete.
- ✅ Phase 4e: Projekte overview + all 17 detail pages + ProjectGallery + videos.
- ✅ Phase 4f: 17 trade detail page SHELLS (GewerkePage).
- ✅ Phase 4g: 4 package + 7 heating page SHELLS (CalcPage).
- ✅ Phase 4h: Kalkulator hub (page + KalkCategoryPicker/KalkLeafPicker, 28 leaves).
- ✅ Phase 4i: BlitzAngebot intro + 5-step form wizard chrome.

  => Every page header/intro/form-chrome/CTA across the site is trilingual.

- ✅ Phase 5 (this pass) — the three deeper clusters are now done:
  1. **Calculator catalog chrome**: render-only `src/i18n/calculatorCatalog.ts`
     (SKU-keyed `localizeCatalog` + locale-aware `formatTsd`/`formatGroupedInt`/
     `formatEuroLocalized`); the 3 result components, configurator boards,
     `RenovationCalculator`, `CalculatorPdfSender` and blitz step-2 display moved
     to the `kalk` namespace. German titles/SKUs untouched; `audit:calculator-data`
     green. ⏳ The ~5,738 individual product line-item titles fall back to German
     until `CATALOG_TRANSLATIONS` is filled (bulk MT pass).
  2. **Server outbound text**: `server/i18n.ts` (standalone catalogue +
     `normalizeLocale` + formatters); `locale` threaded through the contact/blitz/
     calculator-pdf payloads + 3 client callers. Customer emails + PDF localized;
     internal office emails stay German by design.
  3. **Blog**: new `blog` namespace; `Blog`/`BlogDetail` trilingual; per-language
     `PostDocument.translations` subdoc with German-fallback `serialize(post, locale)`
     (no migration needed); `AdminEditor` DE/EN/IT content tabs. Admin UI stays German.
- Data-layer leftovers (safe to prune): unused German display fields now
  superseded by i18n on `projects.ts`, `gewerke.ts` (TRADES name/lead,
  PROCESS_STEPS), `kalkulatorNav.ts`, `komplettPakete` originals;
  `src/data/home.ts` hero-slide `alt` + featured-project captions.
