import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CONSENT_EVENT,
  CONSENT_OPEN_EVENT,
  CONSENT_STORAGE_KEY,
  type ConsentChoice,
} from '../hooks/useConsent';

export default function CookieConsent() {
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
    <aside className="pv-cookie" aria-label="Cookie-Hinweis">
      <div className="pv-cookie__content">
        <div>
          <div className="pv-cookie__eyebrow"><span className="rule-red"></span> Datenschutz</div>
          <h2>Cookies & Dienste</h2>
          <p>
            Wir nutzen notwendige Technologien für den Betrieb der Website. Optionale Dienste wie Analyse, eingebettete YouTube-Videos und unser Claude-basierter Chatbot werden erst nach Ihrer Zustimmung aktiviert.
          </p>
          <Link className="pv-cookie__link" to="/datenschutz">Datenschutzerklärung ansehen</Link>
        </div>
        <div className="pv-cookie__actions">
          <button className="btn btn--light" type="button" onClick={() => saveChoice('necessary')}>
            Nur notwendige
          </button>
          <button className="btn btn--solid" type="button" onClick={() => saveChoice('all')}>
            Alle akzeptieren
          </button>
        </div>
      </div>
    </aside>
  );
}
