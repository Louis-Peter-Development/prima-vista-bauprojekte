import { describe, expect, it } from 'vitest';
import { validateBlitzPayload } from '../../netlify/functions/blitz';
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
