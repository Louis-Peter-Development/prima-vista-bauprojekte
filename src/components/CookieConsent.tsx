import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'pv-cookie-consent-v1';

type CookieChoice = 'necessary' | 'all';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(window.localStorage.getItem(STORAGE_KEY) === null);
    } catch {
      setVisible(true);
    }
  }, []);

  function saveChoice(choice: CookieChoice) {
    const payload = {
      choice,
      analytics: choice === 'all',
      chatbot: choice === 'all',
      savedAt: new Date().toISOString(),
    };

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      window.dispatchEvent(new CustomEvent('pv-cookie-consent', { detail: payload }));
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
            Wir nutzen notwendige Technologien für den Betrieb der Website. Optionale Dienste wie Analyse und unser Claude-basierter Chatbot werden erst nach Ihrer Zustimmung aktiviert.
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
