import { useState, useEffect } from 'react';

const DEMO_DOCS = [
  {
    num: '№ 06 / BA-2026-142',
    projekt: 'Wohnungssanierung · 142 m²',
    standort: 'Frankfurt-Sachsenhausen',
    gewerke: 'Bad, Küche, Elektrik, Maler',
    standard: 'Gehoben',
    investition: '€ 184 – 226 Tsd.',
    datum: '17. Mai 2026',
  },
  {
    num: '№ 06 / BA-2026-089',
    projekt: 'Haus-Sanierung · 210 m²',
    standort: 'Wiesbaden-Sonnenberg',
    gewerke: 'Dach, Fassade, Heizung, Rohbau',
    standard: 'Premium',
    investition: '€ 320 – 385 Tsd.',
    datum: '22. Mai 2026',
  },
  {
    num: '№ 06 / BA-2026-215',
    projekt: 'Gastronomie-Ausbau · 180 m²',
    standort: 'Luzern Innenstadt',
    gewerke: 'Lüftung, Sanitär, Trockenbau',
    standard: 'Objektbau / Gewerbe',
    investition: 'CHF 280 – 340 Tsd.',
    datum: '02. Juni 2026',
  },
];

export default function HomeBlitzLive() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % DEMO_DOCS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const current = DEMO_DOCS[step];

  return (
    <div className="blitz-home__doc reveal" aria-hidden="true" style={{ transition: 'all 0.3s ease' }}>
      <div className="blitz-home__doc-paper">
        <div className="blitz-home__doc-head">
          <div>
            <span className="blitz-home__doc-num" style={{ transition: 'opacity 0.3s' }}>{current.num}</span>
            <span className="blitz-home__doc-label">Vorab-Kostenschätzung</span>
          </div>
          <span className="blitz-home__doc-stamp">In 24 Std.</span>
        </div>
        <ul className="blitz-home__doc-rows">
          <li><span>Projekt</span><strong style={{ transition: 'opacity 0.3s' }}>{current.projekt}</strong></li>
          <li><span>Standort</span><strong style={{ transition: 'opacity 0.3s' }}>{current.standort}</strong></li>
          <li><span>Gewerke</span><strong style={{ transition: 'opacity 0.3s' }}>{current.gewerke}</strong></li>
          <li><span>Standard</span><strong style={{ transition: 'opacity 0.3s' }}>{current.standard}</strong></li>
        </ul>
        <div className="blitz-home__doc-total">
          <span className="blitz-home__doc-total-label">Geschätzte Investition</span>
          <span className="blitz-home__doc-total-value" style={{ transition: 'opacity 0.3s' }}>{current.investition}</span>
          <span className="blitz-home__doc-total-note">Verbindlich nach Aufmaß vor Ort.</span>
        </div>
        <div className="blitz-home__doc-sig">
          <span className="blitz-home__doc-sig-name">Daniel Vogel · Bauleitung</span>
          <span className="blitz-home__doc-sig-date" style={{ transition: 'opacity 0.3s' }}>Frankfurt/Luzern · {current.datum}</span>
        </div>
      </div>
    </div>
  );
}
