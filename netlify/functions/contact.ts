import { sendKontaktEmails, type KontaktPayload } from '../../server/mail.js';
import { normalizeLocale } from '../../server/i18n.js';
import { berlinToday, createConsultationEvent, isSunday } from '../../server/terminAvailability.js';
import { json, methodNotAllowed } from './_shared/http';
import { checkRateLimit, hasSpamTrap, rateLimitResponse } from './_shared/rate-limit';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_DAYS_AHEAD = 190; // ~6 months, matching the picker's range

// Bound field lengths so the endpoint can't be used to send oversized mails.
const MAX_FIELD = 200;
const MAX_MSG = 5_000;

function asString(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

// Preferred dates are optional; invalid ones are dropped rather than rejected
// so an out-of-sync client can still submit the enquiry itself.
function sanitizeWunschtermin(v: unknown): string | undefined {
  const value = asString(v);
  if (!DATE_RE.test(value) || Number.isNaN(Date.parse(`${value}T12:00:00Z`))) return undefined;
  const today = berlinToday();
  if (value <= today || isSunday(value)) return undefined;
  const daysAhead = (Date.parse(`${value}T12:00:00Z`) - Date.parse(`${today}T12:00:00Z`)) / 86_400_000;
  if (daysAhead > MAX_DAYS_AHEAD) return undefined;
  return value;
}

function sanitizeEnum<T extends string>(v: unknown, allowed: readonly T[]): T | undefined {
  const value = asString(v);
  return (allowed as readonly string[]).includes(value) ? value as T : undefined;
}

export function validateKontaktPayload(body: unknown): KontaktPayload | { error: string } {
  if (!body || typeof body !== 'object') return { error: 'Invalid body' };
  if (hasSpamTrap(body)) return { error: 'Spam detected' };
  const b = body as Record<string, unknown>;
  const wunschtermin = sanitizeWunschtermin(b.wunschtermin);
  const payload: KontaktPayload = {
    vorname: asString(b.vorname),
    nachname: asString(b.nachname),
    email: asString(b.email),
    tel: asString(b.tel) || undefined,
    art: asString(b.art) || undefined,
    region: asString(b.region) || undefined,
    budget: asString(b.budget) || undefined,
    msg: asString(b.msg),
    wunschtermin,
    terminZeit: wunschtermin ? sanitizeEnum(b.terminZeit, ['vormittag', 'nachmittag', 'flexibel'] as const) : undefined,
    terminArt: wunschtermin ? sanitizeEnum(b.terminArt, ['vor-ort', 'video'] as const) : undefined,
    terminAlternativ: wunschtermin ? sanitizeWunschtermin(b.terminAlternativ) : undefined,
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
  } catch (err) {
    console.error('[contact] send failed', err);
    return json({ error: 'Send failed' }, { status: 502 });
  }

  // Best-effort: surface the request on the office calendar. The emails are
  // already out, so a Calendar hiccup must never fail the submission.
  if (result.wunschtermin) {
    try {
      await createConsultationEvent({
        date: result.wunschtermin,
        name: `${result.vorname} ${result.nachname}`,
        email: result.email,
        tel: result.tel,
        terminArt: result.terminArt ?? 'vor-ort',
        terminZeit: result.terminZeit ?? 'flexibel',
        alternativeDate: result.terminAlternativ,
        note: result.msg,
      });
    } catch (err) {
      console.error('[contact] calendar event failed', err);
    }
  }

  return json({ ok: true });
};

export const config = { path: '/api/contact' };
