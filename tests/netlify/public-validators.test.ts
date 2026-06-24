import { describe, expect, it } from 'vitest';
import { buildCalculatorPdf, type CalculatorPdfPayload } from '../../server/calculatorPdf';
import { validateBlitzPayload } from '../../netlify/functions/blitz';
import { validateCalculatorPdfPayload } from '../../netlify/functions/calculator-pdf';
import { validateCommentPayload } from '../../netlify/functions/comments';
import { validateKontaktPayload } from '../../netlify/functions/contact';

describe('public endpoint validators', () => {
  it('accepts a valid contact payload and rejects spam traps', () => {
    const valid = validateKontaktPayload({
      vorname: 'Ada',
      nachname: 'Lovelace',
      email: 'ada@example.com',
      msg: 'Bitte melden.',
      dsgvo: true,
    });

    expect('error' in valid).toBe(false);
    expect(validateKontaktPayload({ ...valid, website: 'https://spam.example' })).toEqual({
      error: 'Spam detected',
    });
  });

  it('accepts a valid quick-offer payload', () => {
    const result = validateBlitzPayload({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      tel: '+49 69 123',
      art: 'pakete',
      groesse: '80 qm',
      starttermin: 'sofort',
      gewerke: ['bad', 'boden'],
    });

    expect('error' in result).toBe(false);
  });

  it('accepts and sanitizes structured calculator handoffs for quick offers', () => {
    const result = validateBlitzPayload({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      tel: '+49 69 123',
      art: 'gewerke',
      groesse: '6',
      starttermin: 'sofort',
      gewerke: ['Bäder & Sanitär'],
      msg: 'Bitte mit rutschfesten Fliesen.',
      kalkulator: {
        kind: 'gewerke',
        kindLabel: 'Bad mit Wanne',
        area: 6,
        totalMin: 14000,
        totalMax: 18000,
        totalMid: 16000,
        perM2: 2596,
        picks: [{
          key: 'wasser',
          label: 'Wasserinstallation & Sanitär',
          subtotal: 3000,
          tradeKey: 'wass',
          tradeLabel: 'Wasserinstallation & Sanitär',
          rows: [{
            label: 'Vorsatz-Element | Montage',
            quantity: 2,
            unit: 'Stk',
            unitPrice: 279,
            subtotal: 558,
            sku: 'WASS-101-MON',
            description: 'Montagepaket für ein Vorsatz-Element im Badezimmer.',
            category: 'Wasserinstallation | Basis-Haus',
            subcategory: 'Leistungen & Materialien',
            type: 'Montage',
          }],
        }],
      },
    });

    expect('error' in result).toBe(false);
    expect(result).toMatchObject({
      kalkulator: {
        kindLabel: 'Bad mit Wanne',
        picks: [{
          label: 'Wasserinstallation & Sanitär',
          rows: [{ label: 'Vorsatz-Element | Montage', quantity: 2 }],
        }],
      },
    });
  });

  it('allows an open scope for quick-offer Gewerke but still requires package area', () => {
    const gewerke = validateBlitzPayload({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      tel: '+49 69 123',
      art: 'gewerke',
      starttermin: 'sofort',
      gewerke: ['Bäder & Sanitär', 'Küchen & Möbelbau'],
    });

    expect(gewerke).toMatchObject({ groesse: 'Noch offen' });

    expect(validateBlitzPayload({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      tel: '+49 69 123',
      art: 'pakete',
      starttermin: 'sofort',
    })).toEqual({ error: 'groesse is required' });
  });

  it('accepts calculator PDF requests and requires consent', () => {
    const valid = validateCalculatorPdfPayload({
      email: 'ada@example.com',
      consent: true,
      kalkulator: {
        kind: 'gewerke',
        kindLabel: 'Bad mit Wanne',
        scopeLabel: 'Wohnfläche in qm',
        area: 6,
        totalMin: 14000,
        totalMax: 18000,
        totalMid: 16000,
        perM2: 2596,
        picks: [{
          key: 'wasser',
          label: 'Wasserinstallation & Sanitär',
          subtotal: 3000,
          tradeKey: 'wasserinstallation',
          tradeLabel: 'Wasserinstallation & Sanitär',
          rows: [{
            label: 'Vorsatz-Element | Montage',
            quantity: 2,
            unit: 'Stk',
            unitPrice: 279,
            subtotal: 558,
            sku: 'WASS-101-MON',
            description: 'Montagepaket für ein Vorsatz-Element im Badezimmer.',
            category: 'Wasserinstallation | Basis-Haus',
            subcategory: 'Leistungen & Materialien',
            type: 'Montage',
          }],
        }],
      },
    });

    expect('error' in valid).toBe(false);
    expect(valid).toMatchObject({
      email: 'ada@example.com',
      kalkulator: {
        kindLabel: 'Bad mit Wanne',
        scopeLabel: 'Wohnfläche in qm',
        picks: [{ rows: [{ label: 'Vorsatz-Element | Montage', sku: 'WASS-101-MON' }] }],
      },
    });
    expect(validateCalculatorPdfPayload({ ...valid, consent: false })).toEqual({
      error: 'consent is required',
    });
  });

  it('builds a real PDF attachment for calculator requests', async () => {
    const payload: CalculatorPdfPayload = {
      email: 'ada@example.com',
      consent: true,
      kalkulator: {
        kind: 'gewerke',
        kindLabel: 'Bad mit Wanne',
        scopeLabel: 'Wohnfläche in qm',
        area: 6,
        totalMin: 14000,
        totalMax: 18000,
        totalMid: 16000,
        perM2: 2596,
        picks: [{
          key: 'wasser',
          label: 'Wasserinstallation & Sanitär',
          subtotal: 3000,
          tradeKey: 'wasserinstallation',
          tradeLabel: 'Wasserinstallation & Sanitär',
          rows: [{
            label: 'Vorsatz-Element | Montage',
            quantity: 2,
            unit: 'Stk',
            unitPrice: 279,
            subtotal: 558,
            sku: 'WASS-101-MON',
            description: 'Montagepaket für ein Vorsatz-Element im Badezimmer.',
            category: 'Wasserinstallation | Basis-Haus',
            subcategory: 'Leistungen & Materialien',
            type: 'Montage',
          }],
        }],
      },
    };

    const pdf = await buildCalculatorPdf(payload);

    expect(pdf.subarray(0, 5).toString('utf8')).toBe('%PDF-');
    expect(pdf.length).toBeGreaterThan(1000);
    expect((pdf.toString('latin1').match(/\/Type\s*\/Page\b/g) ?? []).length).toBeGreaterThanOrEqual(4);
  });

  it('rejects calculator PDF requests without a positive total', () => {
    const base = {
      email: 'ada@example.com',
      consent: true,
      kalkulator: {
        kind: 'gewerke',
        kindLabel: 'Bad mit Wanne',
        area: 6,
        totalMin: 0,
        totalMax: 0,
        totalMid: 0,
        perM2: 0,
        picks: [],
      },
    };

    expect(validateCalculatorPdfPayload(base)).toEqual({ error: 'total is invalid' });
    expect(validateCalculatorPdfPayload({
      ...base,
      kalkulator: { ...base.kalkulator, totalMid: -5 },
    })).toEqual({ error: 'total is invalid' });
  });

  it('caps the calculator rows an untrusted payload can expand into', () => {
    const rows = Array.from({ length: 200 }, (_, i) => ({
      label: `Position ${i}`,
      quantity: 1,
      unit: 'Stk',
      unitPrice: 1,
      subtotal: 1,
    }));
    const picks = Array.from({ length: 10 }, (_, i) => ({
      key: `k${i}`,
      label: `Gewerk ${i}`,
      subtotal: 200,
      tradeKey: `t${i}`,
      tradeLabel: `Gewerk ${i}`,
      rows,
    }));

    const result = validateCalculatorPdfPayload({
      email: 'ada@example.com',
      consent: true,
      kalkulator: {
        kind: 'gewerke',
        kindLabel: 'Stresstest',
        area: 10,
        totalMin: 1,
        totalMax: 2,
        totalMid: 1,
        perM2: 1,
        picks,
      },
    });

    if ('error' in result) throw new Error(result.error);
    const totalRows = result.kalkulator.picks.reduce(
      (sum, pick) => sum + (pick.rows?.length ?? 0),
      0,
    );
    expect(totalRows).toBe(1200);
  });

  it('sanitizes comments and rejects empty/spam values', () => {
    expect(validateCommentPayload({ name: 'Ada', body: 'Hallo <script>alert(1)</script>' })).toEqual({
      name: 'Ada',
      body: 'Hallo alert(1)',
    });
    expect(validateCommentPayload({ name: '', body: 'Hallo' })).toEqual({ error: 'name is required' });
    expect(validateCommentPayload({ name: 'Ada', body: 'Hallo', homepage: 'https://spam.example' })).toEqual({
      error: 'Spam detected',
    });
  });
});
