/**
 * Orchestration for a validated Blitzangebot submission — shared by the
 * Netlify function (with a Mongo-backed store) and the Vite dev middleware
 * (no store: no dedup/audit, but the same decision + email path).
 *
 * Decision → dedup check → emails → audit record. Auditing is best-effort:
 * a failing store write never fails a request whose emails already went out.
 */

import { createHash } from 'node:crypto';
import {
  BLITZ_CALC_VERSION,
  decideBlitzEstimate,
  type BlitzDecision,
  type BlitzEstimate,
} from './blitzEstimate.js';
import { sendBlitzAutoEmails, sendBlitzEmails, type BlitzPayload } from './mail.js';

const DEDUP_WINDOW_MS = 24 * 60 * 60 * 1000;

export type BlitzAuditRecord = {
  name: string;
  email: string;
  tel: string;
  art: string;
  artLabel: string;
  gewerke: string[];
  groesse: string;
  starttermin: string;
  starterminLabel: string;
  msg: string;
  locale: string;
  consent: boolean;
  hasKalkulator: boolean;
  kalkulator?: unknown;
  mode: 'auto' | 'manual';
  /** Why the manual path was taken (manual mode only). */
  reason?: string;
  emailStatus: 'sent' | 'skipped-duplicate';
  estimate?: BlitzEstimate;
  calcVersion: string;
  dedupKey: string;
};

export type BlitzStore = {
  /** True when an automatic estimate for this key was already sent within the window. */
  wasRecentlySent(dedupKey: string, windowMs: number): Promise<boolean>;
  save(record: BlitzAuditRecord): Promise<void>;
};

export type BlitzProcessResult = {
  mode: 'auto' | 'manual';
  duplicate: boolean;
};

export function blitzDedupKey(payload: BlitzPayload, estimate: BlitzEstimate): string {
  return createHash('sha256')
    .update([
      payload.email.toLocaleLowerCase('de-DE'),
      payload.art,
      [...payload.gewerke].sort().join(','),
      payload.groesse,
      payload.starttermin,
      String(estimate.totalMid),
    ].join('|'))
    .digest('hex');
}

export async function processBlitzSubmission(
  payload: BlitzPayload,
  store?: BlitzStore,
  options?: { forceManualReason?: string },
): Promise<BlitzProcessResult> {
  let decision: BlitzDecision;
  if (options?.forceManualReason) {
    decision = { mode: 'manual', reason: options.forceManualReason };
  } else if (payload.dsgvo !== true) {
    // No explicit consent → no automatic quote email; classic manual flow.
    decision = { mode: 'manual', reason: 'no-consent' };
  } else {
    decision = decideBlitzEstimate(payload);
  }

  if (decision.mode === 'manual') {
    await sendBlitzEmails(payload);
    await saveAudit(store, payload, {
      mode: 'manual',
      reason: decision.reason,
      emailStatus: 'sent',
      dedupKey: '',
    });
    return { mode: 'manual', duplicate: false };
  }

  // Present the server-recomputed totals everywhere downstream (email + PDF).
  const enriched: BlitzPayload = decision.kalkulator
    ? { ...payload, kalkulator: decision.kalkulator }
    : payload;
  const dedupKey = blitzDedupKey(payload, decision.estimate);

  let duplicate = false;
  if (store) {
    // Store errors are already mapped to the manual path by the caller (the
    // function passes forceManualReason when the DB is unreachable), so a
    // throwing dedup check here should surface, not silently double-send.
    duplicate = await store.wasRecentlySent(dedupKey, DEDUP_WINDOW_MS);
  }

  if (!duplicate) {
    await sendBlitzAutoEmails(enriched, decision.estimate);
  } else {
    console.warn(`[blitz] duplicate submission suppressed (key ${dedupKey.slice(0, 12)}…)`);
  }

  await saveAudit(store, enriched, {
    mode: 'auto',
    emailStatus: duplicate ? 'skipped-duplicate' : 'sent',
    estimate: decision.estimate,
    dedupKey,
  });
  return { mode: 'auto', duplicate };
}

async function saveAudit(
  store: BlitzStore | undefined,
  payload: BlitzPayload,
  outcome: Pick<BlitzAuditRecord, 'mode' | 'reason' | 'emailStatus' | 'estimate' | 'dedupKey'>,
): Promise<void> {
  if (!store) return;
  try {
    await store.save({
      name: payload.name,
      email: payload.email,
      tel: payload.tel,
      art: payload.art,
      artLabel: payload.artLabel,
      gewerke: payload.gewerke,
      groesse: payload.groesse,
      starttermin: payload.starttermin,
      starterminLabel: payload.starterminLabel,
      msg: payload.msg,
      locale: payload.locale ?? 'de',
      consent: payload.dsgvo === true,
      hasKalkulator: Boolean(payload.kalkulator),
      kalkulator: payload.kalkulator ?? undefined,
      calcVersion: BLITZ_CALC_VERSION,
      ...outcome,
    });
  } catch (err) {
    console.error('[blitz] audit save failed', err);
  }
}
