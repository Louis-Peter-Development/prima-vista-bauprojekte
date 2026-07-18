/**
 * Google Calendar integration for the /kontakt Erstberatung date picker.
 *
 * Authenticated as a service account (the office shares its calendar with the
 * service-account address). Visitors only ever see available appointment
 * start times derived from free/busy — never event titles, attendees or any
 * other calendar detail. When the three env vars are absent the feature
 * degrades gracefully: the picker works as a pure preference field.
 *
 * Env: GOOGLE_CALENDAR_ID · GOOGLE_SA_EMAIL · GOOGLE_SA_KEY (private_key from
 * the service-account JSON; literal \n sequences are normalized).
 */

import { JWT } from 'google-auth-library';

const WORK_START_HOUR = 8;
const WORK_END_HOUR = 18;
export const CONSULTATION_DURATION_MINUTES = 120;
const SLOT_STEP_MINUTES = 30;
const FREEBUSY_TIMEOUT_MS = 8000;
const CACHE_TTL_MS = 60 * 1000;
const TIME_ZONE = 'Europe/Berlin';

export type MonthAvailability = {
  configured: boolean;
  /** ISO date → selectable? Only present when configured. */
  days: Record<string, boolean>;
  /** ISO date → available two-hour slot start times (Berlin wall-clock). */
  slots: Record<string, string[]>;
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

/** UTC instant of `HH:mm` wall-clock time in Europe/Berlin on `dateStr`. */
export function berlinInstantAt(dateStr: string, time: string): Date {
  const [hour, minute] = time.split(':').map(Number);
  const hh = String(hour).padStart(2, '0');
  const mm = String(minute).padStart(2, '0');
  for (const offset of ['+01:00', '+02:00']) {
    const candidate = new Date(`${dateStr}T${hh}:${mm}:00${offset}`);
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: TIME_ZONE,
      year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false,
    }).formatToParts(candidate);
    const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
    const localDate = `${get('year')}-${get('month')}-${get('day')}`;
    // "24" appears for midnight in some ICU versions; normalize before comparing.
    const localHour = get('hour') === '24' ? '00' : get('hour');
    if (localDate === dateStr && localHour === hh && get('minute') === mm) return candidate;
  }
  return new Date(`${dateStr}T${hh}:${mm}:00+01:00`);
}

/** Backwards-compatible hour helper used by tests and month boundaries. */
export function berlinInstant(dateStr: string, hour: number): Date {
  return berlinInstantAt(dateStr, `${String(hour).padStart(2, '0')}:00`);
}

/** Sunday? (derived from the date string, independent of server timezone) */
export function isSunday(dateStr: string): boolean {
  return new Date(`${dateStr}T12:00:00Z`).getUTCDay() === 0;
}

function timeFromMinutes(total: number): string {
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

export function isValidConsultationTime(time: string): boolean {
  if (!/^\d{2}:\d{2}$/.test(time)) return false;
  const [hour, minute] = time.split(':').map(Number);
  const total = hour * 60 + minute;
  return minute >= 0
    && minute < 60
    && total >= WORK_START_HOUR * 60
    && total + CONSULTATION_DURATION_MINUTES <= WORK_END_HOUR * 60
    && total % SLOT_STEP_MINUTES === 0;
}

export function consultationEndTime(startTime: string): string {
  const [hour, minute] = startTime.split(':').map(Number);
  return timeFromMinutes(hour * 60 + minute + CONSULTATION_DURATION_MINUTES);
}

/** Exact two-hour starts that do not overlap any Google Calendar busy period. */
export function listAvailableSlots(dateStr: string, busy: BusyInterval[]): string[] {
  if (isSunday(dateStr)) return [];
  const slots: string[] = [];
  const lastStart = WORK_END_HOUR * 60 - CONSULTATION_DURATION_MINUTES;
  for (let startMinutes = WORK_START_HOUR * 60; startMinutes <= lastStart; startMinutes += SLOT_STEP_MINUTES) {
    const startTime = timeFromMinutes(startMinutes);
    const start = berlinInstantAt(dateStr, startTime).getTime();
    const end = start + CONSULTATION_DURATION_MINUTES * 60 * 1000;
    const overlaps = busy.some((interval) => interval.start < end && interval.end > start);
    if (!overlaps) slots.push(startTime);
  }
  return slots;
}

export function isDayAvailable(dateStr: string, busy: BusyInterval[]): boolean {
  return listAvailableSlots(dateStr, busy).length > 0;
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
  if (!isCalendarConfigured()) return { configured: false, days: {}, slots: {} };

  const cache = (globalThis.__pvTermineCache ??= new Map());
  const cached = cache.get(month);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) return cached.value;

  const days = listMonthDays(month);
  const timeMin = berlinInstant(days[0], 0).toISOString();
  const nextMonthFirst = new Date(berlinInstant(days[days.length - 1], 0).getTime() + 36 * 60 * 60 * 1000);
  const timeMax = nextMonthFirst.toISOString();
  const busy = await fetchBusy(timeMin, timeMax);

  const today = berlinToday();
  const slots = Object.fromEntries(days.map((day) => [
    day,
    day > today ? listAvailableSlots(day, busy) : [],
  ]));
  const value: MonthAvailability = {
    configured: true,
    days: Object.fromEntries(days.map((day) => [day, slots[day].length > 0])),
    slots,
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
  terminZeit: string;      // exact Berlin start time, HH:mm
  alternativeDate?: string;
  alternativeTime?: string;
  note?: string;
};

/** Re-check the exact slot against live free/busy immediately before submit. */
export async function isConsultationSlotAvailable(date: string, time: string): Promise<boolean> {
  if (!isValidConsultationTime(time) || isSunday(date)) return false;
  if (!isCalendarConfigured()) return true;
  const start = berlinInstantAt(date, time);
  const end = new Date(start.getTime() + CONSULTATION_DURATION_MINUTES * 60 * 1000);
  const busy = await fetchBusy(start.toISOString(), end.toISOString());
  return busy.every((interval) => interval.start >= end.getTime() || interval.end <= start.getTime());
}

export function buildConsultationEvent(request: ConsultationRequest) {
  if (!isValidConsultationTime(request.terminZeit)) throw new Error('Invalid consultation time');
  if (request.alternativeTime && !isValidConsultationTime(request.alternativeTime)) {
    throw new Error('Invalid alternative consultation time');
  }
  const start = berlinInstantAt(request.date, request.terminZeit);
  const end = new Date(start.getTime() + CONSULTATION_DURATION_MINUTES * 60 * 1000);
  const artLabel = request.terminArt === 'video' ? 'Video' : 'vor Ort';
  const zeitLabel = `${request.terminZeit}–${consultationEndTime(request.terminZeit)} Uhr`;
  const alternative = request.alternativeDate && request.alternativeTime
    ? `${request.alternativeDate}, ${request.alternativeTime}–${consultationEndTime(request.alternativeTime)} Uhr`
    : '';
  const description = [
    'Anfrage über das Kontaktformular — Termin noch NICHT bestätigt.',
    '',
    `Name: ${request.name}`,
    `E-Mail: ${request.email}`,
    request.tel ? `Telefon: ${request.tel}` : '',
    `Terminart: ${artLabel}`,
    `Uhrzeit: ${zeitLabel}`,
    alternative ? `Alternativtermin: ${alternative}` : '',
    request.note ? `\nNachricht:\n${request.note}` : '',
  ].filter(Boolean).join('\n');

  return {
    summary: `Anfrage Erstberatung · ${request.name} (${artLabel})`,
    description,
    start: { dateTime: start.toISOString(), timeZone: TIME_ZONE },
    end: { dateTime: end.toISOString(), timeZone: TIME_ZONE },
    status: 'tentative',
    transparency: 'opaque',
  };
}

/** Create a timed, tentative but opaque event. Opaque is intentional: even an
 *  unconfirmed request must reserve its precise slot so another visitor cannot
 *  select an overlapping time while the office reviews it. */
export async function createConsultationEvent(request: ConsultationRequest): Promise<string | undefined> {
  if (!isCalendarConfigured()) return undefined;
  const calendarId = env('GOOGLE_CALENDAR_ID');

  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
    {
      method: 'POST',
      headers: {
        authorization: `Bearer ${await accessToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(buildConsultationEvent(request)),
      signal: AbortSignal.timeout(FREEBUSY_TIMEOUT_MS),
    },
  );
  if (!res.ok) throw new Error(`Google event insert failed: HTTP ${res.status}`);
  const data = await res.json() as { id?: string };
  globalThis.__pvTermineCache?.delete(request.date.slice(0, 7));
  return data.id;
}

export async function deleteConsultationEvent(eventId: string): Promise<void> {
  if (!isCalendarConfigured()) return;
  const calendarId = env('GOOGLE_CALENDAR_ID');
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(eventId)}`,
    {
      method: 'DELETE',
      headers: { authorization: `Bearer ${await accessToken()}` },
      signal: AbortSignal.timeout(FREEBUSY_TIMEOUT_MS),
    },
  );
  if (!res.ok && res.status !== 404) throw new Error(`Google event delete failed: HTTP ${res.status}`);
}
