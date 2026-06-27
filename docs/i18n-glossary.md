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

## Status
- ✅ Foundation: i18n library, localized routing, language switcher, locale
  metadata/hreflang.
- ✅ Translated: global chrome (Header, Footer), Home page.
- ⏳ Remaining: hero/marquee + other home subcomponents, all other pages,
  `src/data/*` (incl. calculator packages), forms + validation, cookie consent,
  server emails (`server/mail.ts`) & PDF (`server/calculatorPdf.ts`), and the
  DB-backed blog (per-language schema + admin editor).
