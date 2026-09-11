import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  hasAdsMeasurementConsent,
  hasAnalyticsConsent,
  hasChatbotConsent,
  hasYouTubeConsent,
  readConsent,
  type ConsentPayload,
} from '../../src/hooks/useConsent';

function readStored(value: unknown) {
  vi.stubGlobal('window', {
    localStorage: { getItem: (key: string) => key === CONSENT_STORAGE_KEY ? JSON.stringify(value) : null },
  });
  return readConsent();
}

afterEach(() => vi.unstubAllGlobals());

describe('versioned consent preferences', () => {
  it('preserves legacy optional-service consent without granting the new advertising purpose', () => {
    const legacy = readStored({ choice: 'all' });
    expect(hasAnalyticsConsent(legacy)).toBe(true);
    expect(hasYouTubeConsent(legacy)).toBe(true);
    expect(hasChatbotConsent(legacy)).toBe(true);
    expect(hasAdsMeasurementConsent(legacy)).toBe(false);
    expect(hasAdsMeasurementConsent(readStored({ choice: 'all', adsMeasurement: true }))).toBe(false);
  });

  it('honors explicit refusals even when the stored choice says all', () => {
    const consent = readStored({ choice: 'all', analytics: false, youtube: false, chatbot: false });
    expect(hasAnalyticsConsent(consent)).toBe(false);
    expect(hasYouTubeConsent(consent)).toBe(false);
    expect(hasChatbotConsent(consent)).toBe(false);
  });

  it('requires the current version and separate analytics plus advertising grants', () => {
    const allowed = { version: CONSENT_VERSION, choice: 'custom', analytics: true, adsMeasurement: true };
    expect(hasAdsMeasurementConsent(readStored(allowed))).toBe(true);
    for (const changes of [{ version: 1 }, { version: 3 }, { analytics: false }, { adsMeasurement: false }]) {
      expect(hasAdsMeasurementConsent(readStored({ ...allowed, ...changes }))).toBe(false);
    }
    expect(hasAdsMeasurementConsent(readStored({ version: CONSENT_VERSION, choice: 'all', analytics: true }))).toBe(false);
  });

  it('does not infer missing optional flags for new versioned choices', () => {
    const consent = readStored({ version: CONSENT_VERSION, choice: 'all' });
    expect(hasAnalyticsConsent(consent)).toBe(false);
    expect(hasYouTubeConsent(consent)).toBe(false);
    expect(hasChatbotConsent(consent)).toBe(false);
  });

  it.each([null, [], 'all', 2, {}, { choice: ['all'] }, { choice: 'unknown' },
    { choice: 'all', analytics: 'false' }, { choice: 'all', adsMeasurement: 1 },
    { choice: 'all', version: '2' }])('rejects malformed stored choices: %j', (stored) => {
    expect(readStored(stored)).toBeNull();
  });

  it('fails closed when storage cannot be read', () => {
    vi.stubGlobal('window', { localStorage: { getItem: () => { throw new Error('Unavailable'); } } });
    expect(readConsent()).toBeNull();
    expect(hasAdsMeasurementConsent(null)).toBe(false);
    expect(hasAnalyticsConsent(null)).toBe(false);
  });

  it('keeps a saved advertising refusal after reopening a current all choice', () => {
    const consent = readStored({
      version: CONSENT_VERSION, choice: 'all', analytics: true, adsMeasurement: false,
      youtube: true, chatbot: true, savedAt: '2026-09-11T18:00:00.000Z',
    } satisfies ConsentPayload);
    expect(hasAnalyticsConsent(consent)).toBe(true);
    expect(hasAdsMeasurementConsent(consent)).toBe(false);
  });
});
