import { sendBlitzEmails, type BlitzPayload } from '../../server/mail.js';
import { normalizeLocale } from '../../server/i18n.js';
import { json, methodNotAllowed } from './_shared/http';
import { checkRateLimit, hasSpamTrap, rateLimitResponse } from './_shared/rate-limit';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Bound how many calculator rows an untrusted payload can expand into the
// rendered email, mirroring the calculator-pdf endpoint.
const MAX_PICKS = 80;
const MAX_ROWS_PER_PICK = 250;
const MAX_TOTAL_ROWS = 1200;

function asString(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

function asStringArray(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];
}

function asNumber(v: unknown): number {
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  if (typeof v === 'string' && v.trim()) {
    const value = Number(v.replace(',', '.'));
    return Number.isFinite(value) ? value : 0;
  }
  return 0;
}

function asObject(v: unknown): Record<string, unknown> | null {
  return v && typeof v === 'object' && !Array.isArray(v)
    ? v as Record<string, unknown>
    : null;
}

function sanitizeKalkulator(v: unknown): BlitzPayload['kalkulator'] {
  const source = asObject(v);
  if (!source) return undefined;

  let rowBudget = MAX_TOTAL_ROWS;
  const picks = Array.isArray(source.picks)
    ? source.picks.slice(0, MAX_PICKS).map((pickValue) => {
      const pick = asObject(pickValue);
      if (!pick) return null;
      const rowLimit = Math.max(0, Math.min(MAX_ROWS_PER_PICK, rowBudget));
      const rows = Array.isArray(pick.rows)
        ? pick.rows.slice(0, rowLimit).map((rowValue) => {
          const item = asObject(rowValue);
          if (!item) return null;
          return {
            label: asString(item.label),
            quantity: asNumber(item.quantity),
            unit: asString(item.unit),
            unitPrice: asNumber(item.unitPrice),
            subtotal: asNumber(item.subtotal),
          };
        }).filter((row): row is NonNullable<typeof row> => Boolean(row && row.label))
        : undefined;
      if (rows) rowBudget -= rows.length;

      return {
        key: asString(pick.key),
        label: asString(pick.label),
        subtotal: asNumber(pick.subtotal),
        tradeKey: asString(pick.tradeKey) || undefined,
        tradeLabel: asString(pick.tradeLabel) || undefined,
        rows,
      };
    }).filter((pick): pick is NonNullable<typeof pick> => Boolean(pick && pick.label))
    : [];

  const kindLabel = asString(source.kindLabel);
  if (!kindLabel && picks.length === 0) return undefined;

  return {
    kind: asString(source.kind),
    kindLabel,
    scopeLabel: asString(source.scopeLabel) || undefined,
    area: asNumber(source.area),
    picks,
    totalMin: asNumber(source.totalMin),
    totalMax: asNumber(source.totalMax),
    totalMid: asNumber(source.totalMid),
    perM2: asNumber(source.perM2),
  };
}

export function validateBlitzPayload(body: unknown): BlitzPayload | { error: string } {
  if (!body || typeof body !== 'object') return { error: 'Invalid body' };
  if (hasSpamTrap(body)) return { error: 'Spam detected' };
  const b = body as Record<string, unknown>;
  const payload: BlitzPayload = {
    art: asString(b.art),
    artLabel: asString(b.artLabel) || asString(b.art),
    groesse: asString(b.groesse),
    starttermin: asString(b.starttermin),
    starterminLabel: asString(b.starterminLabel) || asString(b.starttermin),
    gewerke: asStringArray(b.gewerke),
    msg: asString(b.msg),
    kalkulator: sanitizeKalkulator(b.kalkulator),
    name: asString(b.name),
    email: asString(b.email),
    tel: asString(b.tel),
    locale: normalizeLocale(b.locale),
  };
  if (!payload.name) return { error: 'name is required' };
  if (!payload.email || !EMAIL_RE.test(payload.email)) return { error: 'email is invalid' };
  if (!payload.tel) return { error: 'tel is required' };
  const optionalScope = ['gewerke', 'heizung', 'anderes'].includes(payload.art);
  if (!payload.groesse && !optionalScope) return { error: 'groesse is required' };
  if (!payload.groesse) payload.groesse = 'Noch offen';
  if (!payload.starttermin) return { error: 'starttermin is required' };
  return payload;
}

export default async (req: Request) => {
  if (req.method !== 'POST') return methodNotAllowed(['POST']);

  const rateLimit = checkRateLimit(req, {
    key: 'blitz',
    limit: 3,
    windowMs: 10 * 60 * 1000,
  });
  if (!rateLimit.ok) return rateLimitResponse(rateLimit);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const result = validateBlitzPayload(body);
  if ('error' in result) {
    return json(result, { status: 400 });
  }

  try {
    await sendBlitzEmails(result);
    return json({ ok: true });
  } catch (err) {
    console.error('[blitz] send failed', err);
    return json({ error: 'Send failed' }, { status: 502 });
  }
};

export const config = { path: '/api/blitz' };
