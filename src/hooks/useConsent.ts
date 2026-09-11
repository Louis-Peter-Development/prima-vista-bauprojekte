import { useEffect, useState } from 'react';

export const CONSENT_STORAGE_KEY = 'pv-cookie-consent-v1';
export const CONSENT_VERSION = 2;
/** Fired whenever the user saves a consent choice. detail = ConsentPayload */
export const CONSENT_EVENT = 'pv-cookie-consent';
/** Fired to programmatically re-open the consent banner. */
export const CONSENT_OPEN_EVENT = 'pv-cookie-open';

export type ConsentChoice = 'necessary' | 'all' | 'custom';

export type ConsentPayload = {
  version?: number;
  choice: ConsentChoice;
  analytics: boolean;
  adsMeasurement?: boolean;
  chatbot: boolean;
  youtube: boolean;
  savedAt: string;
};

export function readConsent(): ConsentPayload | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
    const payload = value as Record<string, unknown>;
    if (typeof payload.choice !== 'string' || !['necessary', 'all', 'custom'].includes(payload.choice)) return null;
    for (const purpose of ['analytics', 'adsMeasurement', 'youtube', 'chatbot']) {
      if (purpose in payload && typeof payload[purpose] !== 'boolean') return null;
    }
    if ('version' in payload && (!Number.isInteger(payload.version) || Number(payload.version) < 1)) return null;
    return value as ConsentPayload;
  } catch {
    return null;
  }
}

function hasOptionalConsent(
  consent: ConsentPayload | null,
  purpose: 'analytics' | 'youtube' | 'chatbot',
): boolean {
  if (!consent) return false;
  if (typeof consent[purpose] === 'boolean') return consent[purpose];
  // Only older choices without separate flags may inherit their original "all".
  const legacy = consent.version === undefined || consent.version === 1;
  return legacy && consent.choice === 'all';
}

/** True once the user has accepted optional/third-party media (YouTube). */
export function hasYouTubeConsent(consent: ConsentPayload | null): boolean {
  return hasOptionalConsent(consent, 'youtube');
}

/** True once the user has accepted analytics cookies/tracking. */
export function hasAnalyticsConsent(consent: ConsentPayload | null): boolean {
  return hasOptionalConsent(consent, 'analytics');
}

export function hasChatbotConsent(consent: ConsentPayload | null): boolean {
  return hasOptionalConsent(consent, 'chatbot');
}

/** Advertising measurement is a new purpose and never inherits legacy consent. */
export function hasAdsMeasurementConsent(consent: ConsentPayload | null): boolean {
  return hasAnalyticsConsent(consent)
    && consent?.version === CONSENT_VERSION
    && consent.adsMeasurement === true;
}

/** Re-open the cookie banner so the user can grant consent. */
export function openConsentBanner() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}

/** Reactive read of the current consent state; updates on save. */
export function useConsent(): ConsentPayload | null {
  const [consent, setConsent] = useState<ConsentPayload | null>(() => readConsent());

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ConsentPayload>).detail;
      setConsent(detail ?? readConsent());
    };
    const storageHandler = (event: StorageEvent) => {
      if (event.key === CONSENT_STORAGE_KEY || event.key === null) setConsent(readConsent());
    };
    window.addEventListener(CONSENT_EVENT, handler);
    window.addEventListener('storage', storageHandler);
    return () => {
      window.removeEventListener(CONSENT_EVENT, handler);
      window.removeEventListener('storage', storageHandler);
    };
  }, []);

  return consent;
}
