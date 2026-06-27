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

## Verify locally
```
npm run typecheck && npm run lint && npm run test:run && npm run build
npm run audit:calculator-data && npm run audit:duplicate-charges
```
