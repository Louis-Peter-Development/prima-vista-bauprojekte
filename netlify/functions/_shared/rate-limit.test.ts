import { beforeEach, describe, expect, it } from 'vitest';
import { checkRateLimit, getClientIp, hasSpamTrap } from './rate-limit';

describe('rate limit helpers', () => {
  beforeEach(() => {
    globalThis.__pvRateLimit = new Map();
  });

  it('reads the Netlify client IP header first', () => {
    const req = new Request('https://example.com', {
      headers: {
        'x-nf-client-connection-ip': '203.0.113.10',
        'x-forwarded-for': '198.51.100.1, 198.51.100.2',
      },
    });

    expect(getClientIp(req)).toBe('203.0.113.10');
  });

  it('blocks requests after the configured limit', () => {
    const req = new Request('https://example.com', {
      headers: { 'x-forwarded-for': '198.51.100.1' },
    });

    expect(checkRateLimit(req, { key: 'test', limit: 2, windowMs: 60_000 }).ok).toBe(true);
    expect(checkRateLimit(req, { key: 'test', limit: 2, windowMs: 60_000 }).ok).toBe(true);
    const blocked = checkRateLimit(req, { key: 'test', limit: 2, windowMs: 60_000 });
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfter).toBeGreaterThan(0);
  });

  it('detects filled honeypot fields', () => {
    expect(hasSpamTrap({ name: 'Ada', website: 'https://spam.example' })).toBe(true);
    expect(hasSpamTrap({ name: 'Ada', website: '' })).toBe(false);
  });
});
