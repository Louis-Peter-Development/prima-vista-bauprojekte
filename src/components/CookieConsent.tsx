import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '../i18n/Link';
import {
  CONSENT_EVENT,
  CONSENT_OPEN_EVENT,
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  hasAdsMeasurementConsent,
  hasAnalyticsConsent,
  hasChatbotConsent,
  hasYouTubeConsent,
  readConsent,
  type ConsentChoice,
  type ConsentPayload,
} from '../hooks/useConsent';

type Preferences = {
  analytics: boolean;
  adsMeasurement: boolean;
  youtube: boolean;
  chatbot: boolean;
};

function savedPreferences(consent: ConsentPayload | null): Preferences {
  return {
    analytics: hasAnalyticsConsent(consent),
    adsMeasurement: hasAdsMeasurementConsent(consent),
    youtube: hasYouTubeConsent(consent),
    chatbot: hasChatbotConsent(consent),
  };
}

export default function CookieConsent() {
  const { t } = useTranslation();
  const panelRef = useRef<HTMLElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [banner, setBanner] = useState(() => {
    const consent = readConsent();
    return {
      visible: consent?.version !== CONSENT_VERSION,
      preferences: savedPreferences(consent),
      saveError: false,
    };
  });
  const { visible, preferences, saveError } = banner;

  useEffect(() => {
    if (visible) panelRef.current?.focus({ preventScroll: true });
  }, [visible]);

  useEffect(() => {
    const openHandler = () => {
      openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setBanner({ visible: true, preferences: savedPreferences(readConsent()), saveError: false });
    };
    window.addEventListener(CONSENT_OPEN_EVENT, openHandler);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, openHandler);
  }, []);

  function updatePreference(purpose: keyof Preferences, checked: boolean) {
    setBanner((previous) => {
      const next = { ...previous.preferences, [purpose]: checked };
      if (!next.analytics) next.adsMeasurement = false;
      return { ...previous, preferences: next, saveError: false };
    });
  }

  function saveChoice(choice: ConsentChoice) {
    const selected = choice === 'custom' ? preferences : {
      analytics: choice === 'all',
      adsMeasurement: choice === 'all',
      youtube: choice === 'all',
      chatbot: choice === 'all',
    };
    const payload: ConsentPayload = {
      version: CONSENT_VERSION,
      choice,
      ...selected,
      adsMeasurement: selected.analytics && selected.adsMeasurement,
      savedAt: new Date().toISOString(),
    };

    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      setBanner((previous) => ({ ...previous, saveError: true }));
      return;
    }
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: payload }));
    setBanner((previous) => ({ ...previous, visible: false, saveError: false }));
    openerRef.current?.focus({ preventScroll: true });
  }

  if (!visible) return null;

  return (
    <aside ref={panelRef} className="pv-cookie" aria-label={t('cookie.aria')} tabIndex={-1}>
      <div className="pv-cookie__content">
        <div>
          <div className="pv-cookie__eyebrow"><span className="rule-red"></span> {t('cookie.eyebrow')}</div>
          <h2>{t('cookie.title')}</h2>
          <p>{t('cookie.body')}</p>
          <Link className="pv-cookie__link" to="/datenschutz">{t('cookie.policy')}</Link>
        </div>
        <fieldset className="pv-cookie__preferences">
          <legend>{t('cookie.preferences')}</legend>
          {(['analytics', 'adsMeasurement', 'youtube', 'chatbot'] as const).map((purpose) => (
            <label className="pv-cookie__option" key={purpose}>
              <input
                type="checkbox"
                name={purpose}
                checked={preferences[purpose]}
                disabled={purpose === 'adsMeasurement' && !preferences.analytics}
                onChange={(event) => updatePreference(purpose, event.currentTarget.checked)}
              />
              <span>
                <strong>{t(`cookie.${purpose}`)}</strong>
                <span>{t(`cookie.${purpose}Description`)}</span>
              </span>
            </label>
          ))}
        </fieldset>
        {saveError && <p className="pv-cookie__error" role="alert">{t('cookie.saveError')}</p>}
        <div className="pv-cookie__actions">
          <button className="btn btn--light" type="button" onClick={() => saveChoice('necessary')}>
            {t('cookie.necessary')}
          </button>
          <button className="btn btn--light" type="button" onClick={() => saveChoice('custom')}>
            {t('cookie.saveSelection')}
          </button>
          <button className="btn btn--solid" type="button" onClick={() => saveChoice('all')}>
            {t('cookie.acceptAll')}
          </button>
        </div>
      </div>
    </aside>
  );
}
