# Handoff — Codebase review fixes

**Date:** 2026-06-27 · **Author:** Louis (with Claude Code)
**PR:** [prima-vista-bauprojekte#81](https://github.com/Louis-Peter-Development/prima-vista-bauprojekte/pull/81) · **Commit:** `b268124` · **Branch:** `development` → `main`

---

## TL;DR
A multi-agent fan-out review of the codebase surfaced **21 verified findings** (each adversarially re-checked). **All 21 are fixed** plus a dead-code sweep, in one commit on `development`, pushed, PR open. **58 files changed, +343 / −4,946 lines.** All gates green. Two *optional infra* sub-parts are deliberately deferred (see below).

## Current status
- ✅ Pushed to `origin/development`; PR #81 open to `main`, awaiting review/merge.
- ✅ Verified: `tsc -b` · `eslint .` · `vitest` (29/29) · `npm run build` · `npm run audit:calculator-data` · `npm run audit:duplicate-charges`.
- ⚠️ Not exercised against live MongoDB/Resend/Google — only the build/test/audit gates. Live serverless behavior needs a deploy/preview env.

---

## What shipped

### Security & robustness (Netlify functions / server)
- **Admin login rate-limit** — `netlify/functions/auth.ts`: `handleLogin` + `handleGoogleLogin` throttle (5 / 10 min) before bcrypt. Was the only mutating endpoint with no limit.
- **PDF path traversal + DoS** — `server/calculatorPdf.ts`: image/sku paths confined to `public/` via `path.resolve` containment (`withinPublic`); `doc.image()` wrapped in try/catch so a bad thumbnail falls back to the placeholder instead of 502-ing the send.
- **Generic 5xx bodies** — `netlify/functions/_shared/http.ts` new `errorResponse(err, tag)`; applied to `auth/posts/comments/likes/uploads/views`. Stops mongoose/env leakage; keeps the controlled `Invalid JSON` 400.
- **Rate-limiter IP source** — `_shared/rate-limit.ts`: dropped spoofable `x-forwarded-for` fallback; trust only platform headers.
- **`sourceUrl` allowlist** — `netlify/functions/calculator-pdf.ts` `safeSourceUrl()`: only https on `primavista-bauprojekte.com/.ch`, else falls back to default (kills office-PDF link injection).
- **Total reconciliation** — `calculator-pdf.ts` `sanitizeKalkulator`: `totalMid` derived from sanitized pick/row subtotals, not client input (PDF grand total always matches line items).
- **HSTS** — `netlify.toml`: `Strict-Transport-Security = "max-age=31536000; includeSubDomains"` (no `preload`).
- **Network timeouts** — `server/mail.ts` (Resend, 8s via `withTimeout`/`sendEmail`), `_shared/auth.ts` (Google `verifyIdToken`, 8s), `reviews.mjs` (`fetch` 7s via `AbortSignal.timeout`), `server/chat.ts` (Anthropic client 60s).
- **Stale-review cache** — `reviews.mjs`: transient Google failure serves stale cache (200, max-age 300) instead of hard 502; 502 only when cache empty.

### Calculator data & UX
- **Area-wipe bug** — `src/hooks/useRenovationCalculator.ts`: clearing the Wohnfläche field no longer resets `manualQuantities`; `recalculateRowsForArea` preserves manual rows at area 0. **Existing test updated** (`useRenovationCalculator.test.ts`) to encode the corrected behavior.
- **Sichtestrich stub** — `src/data/calculator/packages/boeden.ts`: 7 products populated with real titles/units/prices mirrored from `packageBoedenAlles`; 2 SKUs with no real definition anywhere (`BODE-701-MAT`, `v520-00029`) marked "AUF ANFRAGE" quote-only. Default quote went €0 → real.
- **Audit guard extended** — `scripts/audit-duplicate-charges.mjs`: now also FAILS on `title === sku` (raw placeholder) and any live package whose max basePrice is 0. Confirmed no other package trips it.

### Accessibility
- **Lightbox** (`src/components/Lightbox.tsx`) and **Chat** (`src/components/Chat.tsx`): focus trap (Tab cycle), focus save/restore, `aria-modal`. Chat restores focus to the launcher after the panel unmounts.
- **ProjectVideos** (`src/components/projekte/ProjectVideos.tsx`): poster `onError` falls back to the local image.

### Cleanup — 36 verified-orphan files removed (~4.6k lines)
Each re-confirmed zero-importer before deletion; build proves nothing referenced them.
- 13 legacy `src/components/gewerke/*Calculator.tsx` (NOT `HeizmethodenRouteCalculator`)
- their 13 `src/data/{elektro,fenster,maler,badsanierung,fassade,garten,kuechen,rohbau,treppen,trockenbau,tueren,wasser,zaeune}.ts`
- 7 orphaned `src/data/{heizkoerper,gasHeizung,fussbodenheizung,heizstraenge,pelletofen,saunaofen,waermepumpe}.ts`
- `src/components/wohnung-sanierung/WohnungSanierungResult.tsx`, `src/data/abdichtungPakete.tsx`, `src/data/gewerke.tsx` (re-export shim)

---

## Deferred (optional infra — flagged in PR, not done)
1. **Persistent per-account login lockout** (finding #2) — DB counter/backoff in `loginAdmin` on top of the in-memory limiter. Needs a `User` schema change; carries admin-lockout risk. The in-memory limiter is per-instance/ephemeral in serverless, so it's best-effort.
2. **Durable rate-limit store** (finding #5) — back `_shared/rate-limit.ts` with Netlify Blobs / Upstash so limits hold across Lambda instances. Architecture change.

## Reviewer attention points
- **Total reconciliation** is a behavior change: server now recomputes `totalMid`. No-op for legit payloads (sender always sets `pick.subtotal`); only diverges on tampered/oversized (>1200-row) input.
- **Area-wipe** changed an *existing* test's expectation — intentional (old test asserted the bug).
- **HSTS** uses `includeSubDomains` — fine if all `*.primavista-bauprojekte.com` subdomains are HTTPS; `preload` intentionally omitted.
- **Anthropic 60s timeout** is safe for the 600-token Haiku stream but worth a glance if max_tokens grows.

## Follow-up ideas
- Build out the two deferred infra items.
- Second review pass on areas this one didn't deeply cover: admin blog/auth flow, the 87k lines of pricing data.
- Exercise live endpoints (contact/blitz/calculator-pdf/auth/reviews) in a preview/deploy env.

## Pending client walkthrough updates — 2026-07-16

- **Company history / experience:** Daniel and Monica started working in construction in **2006**.
- The homepage currently presents **2014** in several places, including the “Bauleitung seit 2.014” statistic, “Zwölf Jahre. Eine Linie.”, the hero/supporting copy, and the About section.
- Before editing, confirm whether **2014 remains the legal Prima Vista founding year**. If so, do not replace every 2014 reference blindly; distinguish personal experience from company history.
- Recommended German wording: **“Daniel und Monica sind seit 2006 im Bauwesen tätig und führen Prima Vista seit 2014.”**
- When implementing, update the relevant homepage copy/statistic consistently in all four locales (`de`, `en`, `fr`, `it`) and revise the duration wording derived from the year.
- Status: **implemented 2026-07-18** — Louis confirmed the company dates to **2006** (2014 dropped entirely). All 2014 references replaced with 2006 in all four locales' `home.json` (hero tagline, materials chip, stats intro, founders paragraph); stats title now "Zwanzig Jahre. Eine Linie." with EN/FR/IT equivalents; `Home.tsx` counter target set to 2006; chat assistant prompt (`server/chat.ts`, Gründung) updated. Verified live in all four locales; typecheck/lint/tests/build green.

### Automatic Blitz-Angebot after website intake

- **Feature idea:** After a prospective client describes the project and provides the required details on the website, automatically calculate and email a branded **Blitz-Angebot / Vorab-Kostenschätzung** to the client.
- Reuse the structured project inputs already collected by the website/chat and ask follow-up questions when required information is missing (for example object type, location, area, requested trades, standard, timing, contact details, and email consent).
- Generate a clear price range rather than an unverified binding fixed price, include assumptions and exclusions, and state that the final offer is confirmed after review/site inspection.
- Send the client a branded email with a PDF or web summary and send the same lead details to the Prima Vista office/admin workflow.
- Add a manual-review fallback for unusual, incomplete, high-value, or out-of-range projects; prevent duplicate sends and keep an audit record of the submitted answers and calculation version.
- Reconcile the automation with the current homepage promise that the **Bauleitung prüft** the request and sends the written estimate within 24 hours; decide whether standard requests are fully automatic or require approval before sending.
- Status: **implemented 2026-07-18** (fully automatic, per Louis' decision). How it works:
  - `netlify/functions/blitz.ts` → `server/blitzFlow.ts`: consent-gated decision → dedup check → emails → Mongo audit record (`BlitzRequest` in `_shared/db.ts`, includes inputs, estimate, calc version, dedup key). DB unreachable ⇒ graceful fallback to the manual 24-h flow.
  - Pricing (`server/blitzEstimate.ts`): (a) calculator handoffs — grand total re-derived server-side from sanitized line items (client totals ignored), ±0.9/1.15 band, detailed PDF attached; (b) Haus-/Wohnung-Sanierung package requests with plausible m² — priced from `server/blitzRates.generated.ts`, engine-exact net tables sampled from the live calculator packages (regenerate: `node scripts/generate-blitz-rates.mjs`), band widened by subtype spread. Corridor €3k–900k; Gastronomie/Büro, single trades, heating, odd areas ⇒ manual review.
  - Emails: localized customer estimate (range, assumptions, "verbindlich nach Aufmaß" disclaimer) + German office notification marked "automatisch beantwortet" with the sent figures. `MAIL_DRY_RUN=1` logs instead of sending (dev).
  - Frontend: Blitz form step 5 gained a required GDPR/email-consent checkbox; success panel is mode-aware (instant vs. 24 h). Promise copy (home + blitz page, all 4 locales) now says instant for standard requests, 24 h for special cases.
  - Duplicate sends suppressed for 24 h per (email + answers + estimate) hash. Verified end-to-end via dev middleware (auto pakete / auto kalkulator incl. PDF / manual) and the full form wizard; all gates green.

### Calendar date picker for the contact form

- Add a **preferred appointment date** field with a visual calendar/date picker to the `/kontakt` “Erstberatung” form.
- Connect availability and appointment creation to the Google Calendar associated with **`primavista.bauprojekte@gmail.com`**.
- Use Google OAuth/service authorization during implementation; never place Google credentials or refresh tokens in frontend code or commit them to the repository.
- Do not allow past dates; clearly show unavailable dates and use the correct localized date format in all supported languages.
- Consider an optional preferred time/time window, appointment type (**vor Ort** or **Video**), and an alternative date so the office can schedule the consultation without an extra email round trip.
- Only expose available appointment slots to website visitors—not private calendar event names, attendees, descriptions, or other calendar details.
- Carry the selected date and appointment details into the office notification, customer confirmation, admin/lead record, and any future automatic Blitz-Angebot workflow.
- Keep the existing “Termin in 48 Stunden” promise clear: the requested date is a preference until Prima Vista confirms availability.
- Status: **idea only / not implemented**; captured for the contact-form update during the live client website walkthrough.

## Verify locally
```
npm run typecheck && npm run lint && npm run test:run && npm run build
npm run audit:calculator-data && npm run audit:duplicate-charges
```
