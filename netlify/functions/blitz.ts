import { sendBlitzEmails, type BlitzPayload } from '../../server/mail.js';
import { json, methodNotAllowed } from './_shared/http';
import { checkRateLimit, hasSpamTrap, rateLimitResponse } from './_shared/rate-limit';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

function asStringArray(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];
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
    name: asString(b.name),
    email: asString(b.email),
    tel: asString(b.tel),
  };
  if (!payload.name) return { error: 'name is required' };
  if (!payload.email || !EMAIL_RE.test(payload.email)) return { error: 'email is invalid' };
  if (!payload.tel) return { error: 'tel is required' };
  if (!payload.groesse) return { error: 'groesse is required' };
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
