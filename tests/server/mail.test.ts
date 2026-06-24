import { describe, expect, it } from 'vitest';

import { renderBlitzEmails, type BlitzPayload } from '../../server/mail';

const sampleBlitzPayload: BlitzPayload = {
  art: 'gewerke',
  artLabel: 'Gewerke',
  groesse: '80 m² Boden, 12 Türen',
  starttermin: '1-3m',
  starterminLabel: 'In 1 – 3 Monaten',
  gewerke: ['Bäder & Sanitär', 'Böden & Beläge', 'Türen & Zargen'],
  msg: 'Altbau, Zugang über Innenhof. Bitte zuerst grob einschätzen.',
  name: 'Max Mustermann',
  email: 'max@example.com',
  tel: '+49 170 1234567',
  kalkulator: {
    kind: 'gewerke',
    kindLabel: 'Gewerke',
    scopeLabel: 'Geschätzter Umfang',
    area: 80,
    totalMin: 18000,
    totalMax: 25000,
    totalMid: 21500,
    perM2: 269,
    picks: [
      {
        key: 'boeden',
        label: 'Böden & Beläge',
        subtotal: 12500,
        tradeKey: 'boeden',
        tradeLabel: 'Böden & Beläge',
        rows: [
          {
            label: 'Parkett schleifen und versiegeln',
            quantity: 80,
            unit: 'm²',
            unitPrice: 90,
            subtotal: 7200,
          },
        ],
      },
      {
        key: 'tueren',
        label: 'Türen & Zargen',
        subtotal: 9000,
        tradeKey: 'tueren',
        tradeLabel: 'Türen & Zargen',
        rows: [
          {
            label: 'Innentür mit Zarge',
            quantity: 12,
            unit: 'Stk.',
            unitPrice: 750,
            subtotal: 9000,
          },
        ],
      },
    ],
  },
};

describe('Blitz email rendering', () => {
  it('renders clear office and customer emails without PDF attachments', () => {
    const emails = renderBlitzEmails(sampleBlitzPayload);

    expect(emails.office.subject).toContain('Blitz-Anfrage');
    expect(emails.office.replyTo).toBe('max@example.com');
    expect(emails.office.html).toContain('Gewählte Leistungen / Anfragebereich');
    expect(emails.office.html).toContain('Übernommene Kalkulation');
    expect(emails.office.html).toContain('Parkett schleifen und versiegeln');
    expect(emails.office.html).toContain('Nächster Schritt');
    expect(emails.office.html).not.toContain('Reply geht');

    expect(emails.customer.to).toBe('max@example.com');
    expect(emails.customer.subject).toContain('Ihre Blitz-Anfrage ist eingegangen');
    expect(emails.customer.html).toContain('Ihre Angaben');
    expect(emails.customer.html).toContain('Ihre ausgewählten Leistungen');
    expect(emails.customer.html).toContain('So geht es weiter');
    expect(emails.customer.html).not.toMatch(/PDF|Anhang/i);
    expect('attachments' in emails.office).toBe(false);
    expect('attachments' in emails.customer).toBe(false);
  });

  it('keeps the plain text fallback readable', () => {
    const emails = renderBlitzEmails(sampleBlitzPayload);

    expect(emails.office.text).toContain('Gewählte Leistungen / Anfragebereich:');
    expect(emails.office.text).toContain('· Bäder & Sanitär');
    expect(emails.office.text).toContain('Übernommene Kalkulation');
    expect(emails.office.text).toContain('Parkett schleifen und versiegeln');

    expect(emails.customer.text).toContain('Ihre ausgewählten Leistungen:');
    expect(emails.customer.text).toContain('· Böden & Beläge');
    expect(emails.customer.text).toContain('So geht es weiter:');
    expect(emails.customer.text).not.toMatch(/PDF|Anhang/i);
  });
});
