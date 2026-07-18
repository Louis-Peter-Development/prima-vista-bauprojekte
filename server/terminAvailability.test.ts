import { describe, expect, it } from 'vitest';
import {
  berlinInstant,
  isDayAvailable,
  isSunday,
  listMonthDays,
} from './terminAvailability.js';
import { validateKontaktPayload } from '../netlify/functions/contact.js';

function busy(dateStr: string, fromHour: number, toHour: number) {
  return {
    start: berlinInstant(dateStr, fromHour).getTime(),
    end: berlinInstant(dateStr, toHour).getTime(),
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

  it('accepts a plausible future date with enums', () => {
    const date = future(10);
    const result = validateKontaktPayload({
      ...base,
      wunschtermin: date,
      terminZeit: 'vormittag',
      terminArt: 'video',
    });
    expect('error' in result).toBe(false);
    if ('error' in result) return;
    expect(result.wunschtermin).toBe(date);
    expect(result.terminZeit).toBe('vormittag');
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

  it('drops unknown enum values', () => {
    const result = validateKontaktPayload({
      ...base,
      wunschtermin: future(10),
      terminZeit: 'midnight',
      terminArt: 'hologram',
    });
    expect('error' in result).toBe(false);
    if ('error' in result) return;
    expect(result.terminZeit).toBeUndefined();
    expect(result.terminArt).toBeUndefined();
  });
});
