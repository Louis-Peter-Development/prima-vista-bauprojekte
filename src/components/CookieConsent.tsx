import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '../i18n/Link';
import {
  CONSENT_EVENT,
  CONSENT_OPEN_EVENT,
  CONSENT_STORAGE_KEY,
  type ConsentChoice,
} from '../hooks/useConsent';

export default function CookieConsent() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(window.localStorage.getItem(CONSENT_STORAGE_KEY) === null);
    } catch {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    const openHandler = () => setVisible(true);
    window.addEventListener(CONSENT_OPEN_EVENT, openHandler);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, openHandler);
  }, []);

  function saveChoice(choice: ConsentChoice) {
    const payload = {
      choice,
      analytics: choice === 'all',
      chatbot: choice === 'all',
      youtube: choice === 'all',
      savedAt: new Date().toISOString(),
    };

    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(payload));
      window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: payload }));
    } finally {
      setVisible(false);
    }
  }

  if (!visible) return null;

  return (
    <aside className="pv-cookie" aria-label={t('cookie.aria')}>
      <div className="pv-cookie__content">
        <div>
          <div className="pv-cookie__eyebrow"><span className="rule-red"></span> {t('cookie.eyebrow')}</div>
          <h2>{t('cookie.title')}</h2>
          <p>{t('cookie.body')}</p>
          <Link className="pv-cookie__link" to="/datenschutz">{t('cookie.policy')}</Link>
        </div>
        <div className="pv-cookie__actions">
          <button className="btn btn--light" type="button" onClick={() => saveChoice('necessary')}>
            {t('cookie.necessary')}
          </button>
          <button className="btn btn--solid" type="button" onClick={() => saveChoice('all')}>
            {t('cookie.acceptAll')}
          </button>
        </div>
      </div>
    </aside>
  );
}
