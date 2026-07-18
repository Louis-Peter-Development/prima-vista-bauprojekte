import { sendKontaktEmails, type KontaktPayload } from '../../server/mail.js';
import { normalizeLocale } from '../../server/i18n.js';
import {
  berlinToday,
  createConsultationEvent,
  deleteConsultationEvent,
  isConsultationSlotAvailable,
  isSunday,
  isValidConsultationTime,
} from '../../server/terminAvailability.js';
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

function sanitizeTerminZeit(v: unknown): string | undefined {
  const value = asString(v);
  return isValidConsultationTime(value) ? value : undefined;
}

export function validateKontaktPayload(body: unknown): KontaktPayload | { error: string } {
  if (!body || typeof body !== 'object') return { error: 'Invalid body' };
  if (hasSpamTrap(body)) return { error: 'Spam detected' };
  const b = body as Record<string, unknown>;
  const wunschtermin = sanitizeWunschtermin(b.wunschtermin);
  const terminZeit = wunschtermin ? sanitizeTerminZeit(b.terminZeit) : undefined;
  const terminAlternativ = wunschtermin ? sanitizeWunschtermin(b.terminAlternativ) : undefined;
  const terminAlternativZeit = terminAlternativ ? sanitizeTerminZeit(b.terminAlternativZeit) : undefined;
  if (wunschtermin && !terminZeit) return { error: 'terminZeit is required' };
  if (terminAlternativ && !terminAlternativZeit) return { error: 'terminAlternativZeit is required' };
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
    terminZeit,
    terminArt: wunschtermin ? sanitizeEnum(b.terminArt, ['vor-ort', 'video'] as const) : undefined,
    terminAlternativ,
    terminAlternativZeit,
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

  if (result.wunschtermin && result.terminZeit) {
    try {
      const available = await isConsultationSlotAvailable(result.wunschtermin, result.terminZeit);
      if (!available) return json({ error: 'slot_unavailable' }, { status: 409 });
    } catch (err) {
      console.error('[contact] calendar availability check failed', err);
      return json({ error: 'availability_unavailable' }, { status: 503 });
    }
  }

  // A successful appointment submission must have its exact timed event in
  // the linked calendar. Create it before sending confirmations, and roll it
  // back if the email delivery subsequently fails.
  let calendarEventId: string | undefined;
  if (result.wunschtermin && result.terminZeit) {
    try {
      calendarEventId = await createConsultationEvent({
        date: result.wunschtermin,
        name: `${result.vorname} ${result.nachname}`,
        email: result.email,
        tel: result.tel,
        terminArt: result.terminArt ?? 'vor-ort',
        terminZeit: result.terminZeit,
        alternativeDate: result.terminAlternativ,
        alternativeTime: result.terminAlternativZeit,
        note: result.msg,
      });
    } catch (err) {
      console.error('[contact] calendar event failed', err);
      return json({ error: 'availability_unavailable' }, { status: 503 });
    }
  }

  try {
    await sendKontaktEmails(result);
  } catch (err) {
    console.error('[contact] send failed', err);
    if (calendarEventId) {
      try {
        await deleteConsultationEvent(calendarEventId);
      } catch (rollbackError) {
        console.error('[contact] calendar rollback failed', rollbackError);
      }
    }
    return json({ error: 'Send failed' }, { status: 502 });
  }

  return json({ ok: true });
};

export const config = { path: '/api/contact' };
