import { sendCalculatorPdfEmail, type KalkulatorHandoff } from '../../server/mail.js';
import { json, methodNotAllowed } from './_shared/http';
import { checkRateLimit, hasSpamTrap, rateLimitResponse } from './_shared/rate-limit';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type CalculatorPdfRequest = {
  email: string;
  consent: boolean;
  kalkulator: KalkulatorHandoff;
  sourceUrl?: string;
};

function asString(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
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

function sanitizeKalkulator(v: unknown): KalkulatorHandoff | null {
  const source = asObject(v);
  if (!source) return null;

  const picks = Array.isArray(source.picks)
    ? source.picks.slice(0, 80).map((pickValue) => {
      const pick = asObject(pickValue);
      if (!pick) return null;
      const rows = Array.isArray(pick.rows)
        ? pick.rows.slice(0, 500).map((rowValue) => {
          const row = asObject(rowValue);
          if (!row) return null;
          return {
            label: asString(row.label),
            quantity: asNumber(row.quantity),
            unit: asString(row.unit),
            unitPrice: asNumber(row.unitPrice),
            subtotal: asNumber(row.subtotal),
          };
        }).filter((row): row is NonNullable<typeof row> => Boolean(row && row.label))
        : undefined;

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
  if (!kindLabel) return null;

  return {
    kind: asString(source.kind) || 'gewerke',
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

export function validateCalculatorPdfPayload(body: unknown): CalculatorPdfRequest | { error: string } {
  if (!body || typeof body !== 'object') return { error: 'Invalid body' };
  if (hasSpamTrap(body)) return { error: 'Spam detected' };

  const b = body as Record<string, unknown>;
  const kalkulator = sanitizeKalkulator(b.kalkulator);
  const payload: CalculatorPdfRequest = {
    email: asString(b.email),
    consent: b.consent === true,
    kalkulator: kalkulator as KalkulatorHandoff,
    sourceUrl: asString(b.sourceUrl) || undefined,
  };

  if (!payload.email || !EMAIL_RE.test(payload.email)) return { error: 'email is invalid' };
  if (!payload.consent) return { error: 'consent is required' };
  if (!kalkulator) return { error: 'kalkulator is required' };
  if (!Number.isFinite(payload.kalkulator.totalMid)) return { error: 'total is invalid' };
  return payload;
}

export default async (req: Request) => {
  if (req.method !== 'POST') return methodNotAllowed(['POST']);

  const rateLimit = checkRateLimit(req, {
    key: 'calculator-pdf',
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });
  if (!rateLimit.ok) return rateLimitResponse(rateLimit);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const result = validateCalculatorPdfPayload(body);
  if ('error' in result) {
    return json(result, { status: 400 });
  }

  try {
    await sendCalculatorPdfEmail(result);
    return json({ ok: true });
  } catch (err) {
    console.error('[calculator-pdf] send failed', err);
    return json({ error: 'Send failed' }, { status: 502 });
  }
};

export const config = { path: '/api/calculator-pdf' };
