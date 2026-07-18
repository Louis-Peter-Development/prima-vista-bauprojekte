import { describe, expect, it } from 'vitest';
import {
  berlinInstant,
  berlinInstantAt,
  buildConsultationEvent,
  consultationEndTime,
  isDayAvailable,
  isSunday,
  isValidConsultationTime,
  listAvailableSlots,
  listMonthDays,
} from './terminAvailability.js';
import { validateKontaktPayload } from '../netlify/functions/contact.js';

function busy(dateStr: string, fromHour: number, toHour: number) {
  return {
    start: berlinInstant(dateStr, fromHour).getTime(),
    end: berlinInstant(dateStr, toHour).getTime(),
  };
}

function busyAt(dateStr: string, fromTime: string, toTime: string) {
  return {
    start: berlinInstantAt(dateStr, fromTime).getTime(),
    end: berlinInstantAt(dateStr, toTime).getTime(),
  };
}

describe('berlinInstant', () => {
  it('resolves CET (winter) and CEST (summer) offsets', () => {
    // 2026-01-15 is CET (+01:00): 08:00 Berlin == 07:00 UTC
    expect(berlinInstant('2026-01-15', 8).toISOString()).toBe('2026-01-15T07:00:00.000Z');
    // 2026-07-15 is CEST (+02:00): 08:00 Berlin == 06:00 UTC
    expect(berlinInstant('2026-07-15', 8).toISOString()).toBe('2026-07-15T06:00:00.000Z');
  });
});

describe('isDayAvailable', () => {
  // 2026-07-20 is a Monday, 2026-07-26 a Sunday.
  it('is available on an empty weekday and never on Sundays', () => {
    expect(isDayAvailable('2026-07-20', [])).toBe(true);
    expect(isSunday('2026-07-26')).toBe(true);
    expect(isDayAvailable('2026-07-26', [])).toBe(false);
  });

  it('needs a free 2h gap inside the 08–18 working window', () => {
    // busy 08–17 leaves only a 1h gap → unavailable
    expect(isDayAvailable('2026-07-20', [busy('2026-07-20', 8, 17)])).toBe(false);
    // busy 08–16 leaves 2h → available
    expect(isDayAvailable('2026-07-20', [busy('2026-07-20', 8, 16)])).toBe(true);
    // fragmented day with no 2h gap → unavailable
    expect(isDayAvailable('2026-07-20', [
      busy('2026-07-20', 9, 11),
      busy('2026-07-20', 12, 14),
      busy('2026-07-20', 15, 17),
    ])).toBe(false);
    // all-day event covering the window → unavailable
    expect(isDayAvailable('2026-07-20', [busy('2026-07-20', 0, 24)])).toBe(false);
  });

  it('ignores busy time outside the working window', () => {
    expect(isDayAvailable('2026-07-20', [busy('2026-07-20', 19, 23)])).toBe(true);
  });
});

describe('exact consultation slots', () => {
  const monday = '2026-07-20';

  it('offers half-hour starts for exact two-hour appointments', () => {
    const slots = listAvailableSlots(monday, []);
    expect(slots).toHaveLength(17);
    expect(slots[0]).toBe('08:00');
    expect(slots[1]).toBe('08:30');
    expect(slots.at(-1)).toBe('16:00');
    expect(consultationEndTime('09:30')).toBe('11:30');
  });

  it('removes every slot that overlaps an existing calendar event', () => {
    const slots = listAvailableSlots(monday, [busyAt(monday, '09:30', '11:00')]);
    expect(slots).not.toContain('08:00');
    expect(slots).not.toContain('09:30');
    expect(slots).not.toContain('10:30');
    expect(slots).toContain('11:00');
  });

  it('accepts only starts inside the 08–18 working window', () => {
    expect(isValidConsultationTime('08:00')).toBe(true);
    expect(isValidConsultationTime('09:30')).toBe(true);
    expect(isValidConsultationTime('16:00')).toBe(true);
    expect(isValidConsultationTime('07:30')).toBe(false);
    expect(isValidConsultationTime('16:30')).toBe(false);
    expect(isValidConsultationTime('vormittag')).toBe(false);
  });

  it('builds a precise two-hour blocking Google Calendar event', () => {
    const event = buildConsultationEvent({
      date: monday,
      name: 'Test Person',
      email: 'test@example.com',
      terminArt: 'video',
      terminZeit: '09:30',
      alternativeDate: '2026-07-21',
      alternativeTime: '14:00',
    });
    expect(event.start).toEqual({ dateTime: '2026-07-20T07:30:00.000Z', timeZone: 'Europe/Berlin' });
    expect(event.end).toEqual({ dateTime: '2026-07-20T09:30:00.000Z', timeZone: 'Europe/Berlin' });
    expect(event.transparency).toBe('opaque');
    expect(event.status).toBe('tentative');
    expect(event.description).toContain('Uhrzeit: 09:30–11:30 Uhr');
    expect(event.description).toContain('Alternativtermin: 2026-07-21, 14:00–16:00 Uhr');
  });
});

describe('listMonthDays', () => {
  it('enumerates the month, respecting leap years', () => {
    expect(listMonthDays('2026-02')).toHaveLength(28);
    expect(listMonthDays('2028-02')).toHaveLength(29);
    expect(listMonthDays('2026-07')[0]).toBe('2026-07-01');
    expect(listMonthDays('2026-07')[30]).toBe('2026-07-31');
  });
});

describe('validateKontaktPayload — appointment fields', () => {
  const base = {
    vorname: 'Test',
    nachname: 'Person',
    email: 'test@example.com',
    msg: 'Hallo',
    dsgvo: true,
    locale: 'de',
  };

  function future(daysAhead: number): string {
    const date = new Date(Date.now() + daysAhead * 86_400_000);
    const isoDate = date.toISOString().slice(0, 10);
    // skip to Monday when the target lands on a Sunday (Sundays are dropped)
    if (new Date(`${isoDate}T12:00:00Z`).getUTCDay() === 0) {
      return new Date(date.getTime() + 86_400_000).toISOString().slice(0, 10);
    }
    return isoDate;
  }

  it('accepts a plausible future date with an exact time', () => {
    const date = future(10);
    const result = validateKontaktPayload({
      ...base,
      wunschtermin: date,
      terminZeit: '09:30',
      terminArt: 'video',
    });
    expect('error' in result).toBe(false);
    if ('error' in result) return;
    expect(result.wunschtermin).toBe(date);
    expect(result.terminZeit).toBe('09:30');
    expect(result.terminArt).toBe('video');
  });

  it('drops past dates, Sundays and bogus values instead of rejecting', () => {
    for (const bad of ['2020-01-02', 'not-a-date', '2026-07-19' /* Sunday */]) {
      const result = validateKontaktPayload({ ...base, wunschtermin: bad });
      expect('error' in result).toBe(false);
      if ('error' in result) return;
      expect(result.wunschtermin).toBeUndefined();
      expect(result.terminZeit).toBeUndefined();
    }
  });

  it('rejects a preferred date without a valid exact time', () => {
    const result = validateKontaktPayload({
      ...base,
      wunschtermin: future(10),
      terminZeit: 'vormittag',
    });
    expect(result).toEqual({ error: 'terminZeit is required' });
  });

  it('requires an exact time when an alternative date is supplied', () => {
    const result = validateKontaktPayload({
      ...base,
      wunschtermin: future(10),
      terminZeit: '09:00',
      terminAlternativ: future(12),
    });
    expect(result).toEqual({ error: 'terminAlternativZeit is required' });
  });
});
