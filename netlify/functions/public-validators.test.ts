import { describe, expect, it } from 'vitest';
import { validateBlitzPayload } from './blitz';
import { validateCommentPayload } from './comments';
import { validateKontaktPayload } from './contact';

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
      groesse: '80 qm',
      starttermin: 'sofort',
      gewerke: ['bad', 'boden'],
    });

    expect('error' in result).toBe(false);
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
