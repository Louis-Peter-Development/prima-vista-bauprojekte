import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  ESTIMATE_MAX_TOTAL,
  decideBlitzEstimate,
  parseAreaM2,
  recomputeKalkulatorMid,
} from './blitzEstimate.js';
import { blitzDedupKey, processBlitzSubmission, type BlitzAuditRecord, type BlitzStore } from './blitzFlow.js';
import type { BlitzPayload } from './mail.js';

function basePayload(overrides: Partial<BlitzPayload> = {}): BlitzPayload {
  return {
    art: 'pakete',
    artLabel: 'Komplettpakete',
    groesse: '120',
    starttermin: 'sofort',
    starterminLabel: 'So schnell wie möglich',
    gewerke: ['Haussanierung'],
    msg: '',
    name: 'Test Person',
    email: 'test@example.com',
    tel: '+49 123 456',
    dsgvo: true,
    locale: 'de',
    ...overrides,
  };
}

function expectDefaultHandoffTotal(
  decision: ReturnType<typeof decideBlitzEstimate>,
  roundedTotalMid: number,
  exactTotalMid = roundedTotalMid,
) {
  expect(decision.mode).toBe('auto');
  if (decision.mode !== 'auto') throw new Error(`expected auto estimate, received ${decision.reason}`);

  const handoff = decision.kalkulator;
  if (!handoff) throw new Error('expected a server-generated calculator handoff');

  expect(decision.estimate.totalMid).toBe(roundedTotalMid);
  expect(handoff.totalMid).toBeCloseTo(exactTotalMid, 6);
  expect(recomputeKalkulatorMid(handoff)).toBeCloseTo(exactTotalMid, 6);
  return { decision, handoff };
}

describe('parseAreaM2', () => {
  it('parses plain and decimal-comma numbers', () => {
    expect(parseAreaM2('120')).toBe(120);
    expect(parseAreaM2('120,5')).toBe(120.5);
    expect(parseAreaM2('ca. 85 m²')).toBe(85);
  });

  it('returns null for non-numeric scope', () => {
    expect(parseAreaM2('Noch offen')).toBeNull();
    expect(parseAreaM2('')).toBeNull();
    expect(parseAreaM2('-120')).toBeNull();
  });
});

describe('decideBlitzEstimate — pakete', () => {
  it('builds the exact default 1e Haussanierung at an off-grid area', () => {
    const { decision, handoff } = expectDefaultHandoffTotal(
      decideBlitzEstimate(basePayload({ groesse: '83' })),
      146_709,
      146_708.88,
    );

    expect(decision.estimate.basis).toBe('pakete');
    expect(handoff.kindLabel).toBe('1× Etage ohne Dach');
    expect(handoff.area).toBe(83);
    expect(handoff.picks.flatMap((pick) => pick.rows ?? [])).toHaveLength(122);
  });

  it('builds the exact default 2-Zimmer-Wohnung at 100 m²', () => {
    const { decision, handoff } = expectDefaultHandoffTotal(
      decideBlitzEstimate(basePayload({ gewerke: ['Wohnungssanierung'], groesse: '100' })),
      147_156,
      147_155.79,
    );

    expect(decision.estimate.basis).toBe('pakete');
    expect(handoff.kindLabel).toBe('2-Zimmer-Wohnung');
    expect(handoff.area).toBe(100);
    expect(handoff.picks.flatMap((pick) => pick.rows ?? [])).toHaveLength(107);
  });

  it('builds the default Restaurant calculation with all six default trades', () => {
    const { handoff } = expectDefaultHandoffTotal(
      decideBlitzEstimate(basePayload({ gewerke: ['Gastronomieausbau'], groesse: '60' })),
      93_150,
    );

    expect(handoff.kindLabel).toBe('Restaurant');
    expect(handoff.area).toBe(60);
    expect(handoff.picks).toHaveLength(6);
  });

  it('builds the default Klassisches Büro calculation with all seven default trades', () => {
    const { handoff } = expectDefaultHandoffTotal(
      decideBlitzEstimate(basePayload({ gewerke: ['Büroausbau'], groesse: '50' })),
      34_500,
    );

    expect(handoff.kindLabel).toBe('Klassisches Büro');
    expect(handoff.area).toBe(50);
    expect(handoff.picks).toHaveLength(7);
  });

  it('continues to accept legacy hyphenated package labels', () => {
    const haus = decideBlitzEstimate(basePayload({ gewerke: ['Haus-Sanierung'] }));
    const wohnung = decideBlitzEstimate(basePayload({ gewerke: ['Wohnung-Sanierung'], groesse: '100' }));
    expect(haus.mode).toBe('auto');
    expect(wohnung.mode).toBe('auto');
  });

  it('falls back to manual for negative, missing, or implausible areas', () => {
    expect(decideBlitzEstimate(basePayload({ groesse: '-120' })).mode).toBe('manual');
    expect(decideBlitzEstimate(basePayload({ groesse: 'Noch offen' })))
      .toEqual({ mode: 'manual', reason: 'area-missing' });
    expect(decideBlitzEstimate(basePayload({ groesse: '12' })))
      .toEqual({ mode: 'manual', reason: 'area-out-of-range' });
    expect(decideBlitzEstimate(basePayload({ groesse: '5000' })))
      .toEqual({ mode: 'manual', reason: 'area-out-of-range' });
  });

  it('falls back to manual for non-paket categories', () => {
    const decision = decideBlitzEstimate(basePayload({ art: 'gewerke', gewerke: ['Trockenbau'] }));
    expect(decision).toEqual({ mode: 'manual', reason: 'art-not-priceable' });
  });
});

describe('decideBlitzEstimate — kalkulator handoff', () => {
  const handoff = {
    kind: 'pakete',
    kindLabel: '2-Zimmer-Wohnung',
    area: 100,
    picks: [
      { key: 'bad', label: 'Bad', subtotal: 1, rows: [
        { label: 'Wanne', quantity: 1, unit: 'Stk.', unitPrice: 30_000, subtotal: 30_000 },
        { label: 'Fliesen', quantity: 20, unit: 'qm', unitPrice: 1_000, subtotal: 20_000 },
      ] },
      { key: 'kueche', label: 'Küche', subtotal: 10_000 },
    ],
    totalMin: 1,
    totalMax: 2,
    totalMid: 1, // tampered client total — must be ignored
    perM2: 1,
  };

  it('re-derives the total from picks and ignores client totals', () => {
    expect(recomputeKalkulatorMid(handoff)).toBe(60_000);
    const decision = decideBlitzEstimate(basePayload({ kalkulator: handoff }));
    expect(decision.mode).toBe('auto');
    if (decision.mode !== 'auto') return;
    expect(decision.estimate.basis).toBe('kalkulator');
    expect(decision.estimate.totalMid).toBe(60_000);
    expect(decision.estimate.totalMin).toBe(54_000);
    expect(decision.estimate.totalMax).toBe(69_000);
    // the enriched handoff carries the recomputed totals for email + PDF
    expect(decision.kalkulator?.totalMid).toBe(60_000);
  });

  it('routes out-of-corridor totals to manual review', () => {
    const huge = {
      ...handoff,
      picks: [{ key: 'x', label: 'X', subtotal: ESTIMATE_MAX_TOTAL + 1 }],
    };
    expect(decideBlitzEstimate(basePayload({ kalkulator: huge })))
      .toEqual({ mode: 'manual', reason: 'kalkulator-total-out-of-range' });
  });
});

describe('processBlitzSubmission', () => {
  beforeAll(() => { process.env.MAIL_DRY_RUN = '1'; });
  afterAll(() => { delete process.env.MAIL_DRY_RUN; });

  function fakeStore(recentlySent = false) {
    const saved: BlitzAuditRecord[] = [];
    const store: BlitzStore = {
      async wasRecentlySent() { return recentlySent; },
      async save(record) { saved.push(record); },
    };
    return { store, saved };
  }

  it('sends the automatic estimate and audits it', async () => {
    const { store, saved } = fakeStore();
    const result = await processBlitzSubmission(basePayload(), store);
    expect(result).toEqual({ mode: 'auto', duplicate: false });
    expect(saved).toHaveLength(1);
    expect(saved[0].mode).toBe('auto');
    expect(saved[0].emailStatus).toBe('sent');
    expect(saved[0].estimate?.totalMid).toBeGreaterThan(0);
    expect(saved[0].calcVersion).toContain('blitz-auto');
    expect(saved[0].dedupKey).toHaveLength(64);
  });

  it('suppresses duplicate estimates within the window', async () => {
    const { store, saved } = fakeStore(true);
    const result = await processBlitzSubmission(basePayload(), store);
    expect(result).toEqual({ mode: 'auto', duplicate: true });
    expect(saved[0].emailStatus).toBe('skipped-duplicate');
  });

  it('takes the manual path without consent', async () => {
    const { store, saved } = fakeStore();
    const result = await processBlitzSubmission(basePayload({ dsgvo: false }), store);
    expect(result).toEqual({ mode: 'manual', duplicate: false });
    expect(saved[0].reason).toBe('no-consent');
  });

  it('honours a forced manual reason (store unavailable)', async () => {
    const result = await processBlitzSubmission(basePayload(), undefined, {
      forceManualReason: 'store-unavailable',
    });
    expect(result).toEqual({ mode: 'manual', duplicate: false });
  });

  it('derives a stable dedup key that varies by email', () => {
    const estimate = { basis: 'pakete' as const, totalMin: 1, totalMid: 2, totalMax: 3, perM2: 0, areaM2: 120 };
    const a = blitzDedupKey(basePayload(), estimate);
    const b = blitzDedupKey(basePayload(), estimate);
    const c = blitzDedupKey(basePayload({ email: 'other@example.com' }), estimate);
    expect(a).toBe(b);
    expect(a).not.toBe(c);
  });
});
