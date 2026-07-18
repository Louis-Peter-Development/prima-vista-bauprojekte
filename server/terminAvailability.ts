/**
 * Google Calendar integration for the /kontakt Erstberatung date picker.
 *
 * Authenticated as a service account (the office shares its calendar with the
 * service-account address). Visitors only ever see per-day availability
 * booleans derived from free/busy — never event titles, attendees or any
 * other calendar detail. When the three env vars are absent the feature
 * degrades gracefully: the picker works as a pure preference field.
 *
 * Env: GOOGLE_CALENDAR_ID · GOOGLE_SA_EMAIL · GOOGLE_SA_KEY (private_key from
 * the service-account JSON; literal \n sequences are normalized).
 */

import { JWT } from 'google-auth-library';

const WORK_START_HOUR = 8;
const WORK_END_HOUR = 18;
const MIN_FREE_GAP_MS = 120 * 60 * 1000; // a day counts as free with a 2h gap
const FREEBUSY_TIMEOUT_MS = 8000;
const CACHE_TTL_MS = 5 * 60 * 1000;
const TIME_ZONE = 'Europe/Berlin';

export type MonthAvailability = {
  configured: boolean;
  /** ISO date → selectable? Only present when configured. */
  days: Record<string, boolean>;
};

type BusyInterval = { start: number; end: number };

type TermineCache = Map<string, { at: number; value: MonthAvailability }>;

declare global {
  var __pvTermineCache: TermineCache | undefined;
  var __pvCalendarJwt: JWT | undefined;
}

function env(name: string): string {
  return process.env[name]?.trim() ?? '';
}

export function isCalendarConfigured(): boolean {
  return Boolean(env('GOOGLE_CALENDAR_ID') && env('GOOGLE_SA_EMAIL') && env('GOOGLE_SA_KEY'));
}

function calendarJwt(): JWT {
  if (!globalThis.__pvCalendarJwt) {
    globalThis.__pvCalendarJwt = new JWT({
      email: env('GOOGLE_SA_EMAIL'),
      key: env('GOOGLE_SA_KEY').replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });
  }
  return globalThis.__pvCalendarJwt;
}

async function accessToken(): Promise<string> {
  const { token } = await calendarJwt().getAccessToken();
  if (!token) throw new Error('Google Calendar: empty access token');
  return token;
}

/** UTC instant of `hour:00` wall-clock time in Europe/Berlin on `dateStr`. */
export function berlinInstant(dateStr: string, hour: number): Date {
  const hh = String(hour).padStart(2, '0');
  for (const offset of ['+01:00', '+02:00']) {
    const candidate = new Date(`${dateStr}T${hh}:00:00${offset}`);
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: TIME_ZONE,
      year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false,
    }).formatToParts(candidate);
    const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
    const localDate = `${get('year')}-${get('month')}-${get('day')}`;
    // "24" appears for midnight in some ICU versions; normalize before comparing.
    const localHour = get('hour') === '24' ? '00' : get('hour');
    if (localDate === dateStr && localHour === hh) return candidate;
  }
  return new Date(`${dateStr}T${hh}:00:00+01:00`);
}

/** Sunday? (derived from the date string, independent of server timezone) */
export function isSunday(dateStr: string): boolean {
  return new Date(`${dateStr}T12:00:00Z`).getUTCDay() === 0;
}

/** A day is selectable when the merged busy intervals leave a free gap of at
 *  least MIN_FREE_GAP_MS inside the 08–18 Berlin working window. */
export function isDayAvailable(dateStr: string, busy: BusyInterval[]): boolean {
  if (isSunday(dateStr)) return false;
  const windowStart = berlinInstant(dateStr, WORK_START_HOUR).getTime();
  const windowEnd = berlinInstant(dateStr, WORK_END_HOUR).getTime();

  const clipped = busy
    .map(({ start, end }) => ({ start: Math.max(start, windowStart), end: Math.min(end, windowEnd) }))
    .filter(({ start, end }) => end > start)
    .sort((a, b) => a.start - b.start);

  let cursor = windowStart;
  let maxGap = 0;
  for (const { start, end } of clipped) {
    maxGap = Math.max(maxGap, start - cursor);
    cursor = Math.max(cursor, end);
  }
  maxGap = Math.max(maxGap, windowEnd - cursor);
  return maxGap >= MIN_FREE_GAP_MS;
}

export function listMonthDays(month: string): string[] {
  const [year, monthIndex] = month.split('-').map(Number);
  const count = new Date(Date.UTC(year, monthIndex, 0)).getUTCDate();
  return Array.from({ length: count }, (_, i) => `${month}-${String(i + 1).padStart(2, '0')}`);
}

/** Today's date in Berlin as ISO yyyy-mm-dd. */
export function berlinToday(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE }).format(new Date());
}

async function fetchBusy(timeMin: string, timeMax: string): Promise<BusyInterval[]> {
  const calendarId = env('GOOGLE_CALENDAR_ID');
  const res = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${await accessToken()}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ timeMin, timeMax, timeZone: TIME_ZONE, items: [{ id: calendarId }] }),
    signal: AbortSignal.timeout(FREEBUSY_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Google freeBusy failed: HTTP ${res.status}`);
  const data = await res.json() as {
    calendars?: Record<string, { busy?: Array<{ start: string; end: string }> }>;
  };
  const busy = data.calendars?.[calendarId]?.busy ?? [];
  return busy
    .map(({ start, end }) => ({ start: Date.parse(start), end: Date.parse(end) }))
    .filter(({ start, end }) => Number.isFinite(start) && Number.isFinite(end));
}

/** Per-day availability for a month ('YYYY-MM'), cached for a few minutes. */
export async function getMonthAvailability(month: string): Promise<MonthAvailability> {
  if (!isCalendarConfigured()) return { configured: false, days: {} };

  const cache = (globalThis.__pvTermineCache ??= new Map());
  const cached = cache.get(month);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) return cached.value;

  const days = listMonthDays(month);
  const timeMin = berlinInstant(days[0], 0).toISOString();
  const nextMonthFirst = new Date(berlinInstant(days[days.length - 1], 0).getTime() + 36 * 60 * 60 * 1000);
  const timeMax = nextMonthFirst.toISOString();
  const busy = await fetchBusy(timeMin, timeMax);

  const today = berlinToday();
  const value: MonthAvailability = {
    configured: true,
    days: Object.fromEntries(days.map((day) => [
      day,
      day > today && isDayAvailable(day, busy),
    ])),
  };
  cache.set(month, value);
  return value;
}

export type ConsultationRequest = {
  date: string;            // ISO yyyy-mm-dd (preferred date)
  name: string;
  email: string;
  tel?: string;
  terminArt: string;       // 'vor-ort' | 'video'
  terminZeit: string;      // 'vormittag' | 'nachmittag' | 'flexibel'
  alternativeDate?: string;
  note?: string;
};

/** Drop a TENTATIVE, transparent all-day event on the office calendar so the
 *  request is visible in situ. Transparent so an unconfirmed request never
 *  blocks the availability other visitors see. */
export async function createConsultationEvent(request: ConsultationRequest): Promise<void> {
  if (!isCalendarConfigured()) return;
  const calendarId = env('GOOGLE_CALENDAR_ID');
  const nextDay = new Date(Date.parse(`${request.date}T12:00:00Z`) + 24 * 60 * 60 * 1000)
    .toISOString().slice(0, 10);

  const artLabel = request.terminArt === 'video' ? 'Video' : 'vor Ort';
  const zeitLabel = request.terminZeit === 'vormittag'
    ? 'Vormittag'
    : request.terminZeit === 'nachmittag' ? 'Nachmittag' : 'Flexibel';
  const description = [
    'Anfrage über das Kontaktformular — Termin noch NICHT bestätigt.',
    '',
    `Name: ${request.name}`,
    `E-Mail: ${request.email}`,
    request.tel ? `Telefon: ${request.tel}` : '',
    `Terminart: ${artLabel}`,
    `Zeitfenster: ${zeitLabel}`,
    request.alternativeDate ? `Alternativtermin: ${request.alternativeDate}` : '',
    request.note ? `\nNachricht:\n${request.note}` : '',
  ].filter(Boolean).join('\n');

  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
    {
      method: 'POST',
      headers: {
        authorization: `Bearer ${await accessToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        summary: `Anfrage Erstberatung · ${request.name} (${artLabel})`,
        description,
        start: { date: request.date },
        end: { date: nextDay },
        status: 'tentative',
        transparency: 'transparent',
      }),
      signal: AbortSignal.timeout(FREEBUSY_TIMEOUT_MS),
    },
  );
  if (!res.ok) throw new Error(`Google event insert failed: HTTP ${res.status}`);
}
