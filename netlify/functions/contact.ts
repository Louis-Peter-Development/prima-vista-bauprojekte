import { sendKontaktEmails, type KontaktPayload } from '../../server/mail.js';
import { normalizeLocale } from '../../server/i18n.js';
import { json, methodNotAllowed } from './_shared/http';
import { checkRateLimit, hasSpamTrap, rateLimitResponse } from './_shared/rate-limit';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Bound field lengths so the endpoint can't be used to send oversized mails.
const MAX_FIELD = 200;
const MAX_MSG = 5_000;

function asString(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

export function validateKontaktPayload(body: unknown): KontaktPayload | { error: string } {
  if (!body || typeof body !== 'object') return { error: 'Invalid body' };
  if (hasSpamTrap(body)) return { error: 'Spam detected' };
  const b = body as Record<string, unknown>;
  const payload: KontaktPayload = {
    vorname: asString(b.vorname),
    nachname: asString(b.nachname),
    email: asString(b.email),
    tel: asString(b.tel) || undefined,
    art: asString(b.art) || undefined,
    region: asString(b.region) || undefined,
    budget: asString(b.budget) || undefined,
    msg: asString(b.msg),
    locale: normalizeLocale(b.locale),
  };
  if (!payload.vorname) return { error: 'vorname is required' };
  if (!payload.nachname) return { error: 'nachname is required' };
  if (!payload.email || !EMAIL_RE.test(payload.email)) return { error: 'email is invalid' };
  if (!payload.msg) return { error: 'msg is required' };
  if (!b.dsgvo) return { error: 'dsgvo consent is required' };
  const overField = [payload.vorname, payload.nachname, payload.email, payload.tel, payload.art, payload.region, payload.budget]
    .some((field) => (field?.length ?? 0) > MAX_FIELD);
  if (overField || payload.msg.length > MAX_MSG) return { error: 'field too long' };
  return payload;
}

export default async (req: Request) => {
  if (req.method !== 'POST') return methodNotAllowed(['POST']);

  const rateLimit = checkRateLimit(req, {
    key: 'contact',
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

  const result = validateKontaktPayload(body);
  if ('error' in result) {
    return json(result, { status: 400 });
  }

  try {
    await sendKontaktEmails(result);
    return json({ ok: true });
  } catch (err) {
    console.error('[contact] send failed', err);
    return json({ error: 'Send failed' }, { status: 502 });
  }
};

export const config = { path: '/api/contact' };
