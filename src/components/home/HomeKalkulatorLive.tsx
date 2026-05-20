import { useState, useEffect } from 'react';

const DEMO_STATES = [
  {
    objekt: 'Haus',
    flaeche: 142,
    gewerke: ['Bad', 'Küche', 'Elektrik'],
    price: '€ 84 – 112 Tsd.',
    note: 'Mittelwert € 98 Tsd. · ca. € 690 / m²',
  },
  {
    objekt: 'Wohnung',
    flaeche: 85,
    gewerke: ['Bad', 'Boden', 'Heizung'],
    price: '€ 52 – 71 Tsd.',
    note: 'Mittelwert € 61 Tsd. · ca. € 720 / m²',
  },
  {
    objekt: 'Haus',
    flaeche: 210,
    gewerke: ['Bad', 'Küche', 'Boden', 'Elektrik', 'Heizung'],
    price: '€ 145 – 195 Tsd.',
    note: 'Mittelwert € 170 Tsd. · ca. € 810 / m²',
  },
  {
    objekt: 'Gastro',
    flaeche: 120,
    gewerke: ['Küche', 'Boden', 'Elektrik'],
    price: '€ 95 – 130 Tsd.',
    note: 'Mittelwert € 112 Tsd. · ca. € 930 / m²',
  },
];

export default function HomeKalkulatorLive() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % DEMO_STATES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const current = DEMO_STATES[step];

  return (
    <div className="kalk__card reveal" data-delay="1" aria-hidden="true" style={{ transition: 'all 0.3s ease' }}>
      <div className="kalk__card-head">
        <span className="kalk__card-num">№ 05</span>
        <span className="kalk__card-label">Kalkulator · Live</span>
      </div>
      <div className="kalk__field">
        <span className="kalk__field-label">Objektart</span>
        <div className="kalk__chips">
          {['Haus', 'Wohnung', 'Gastro', 'Anderes'].map((o) => (
            <span key={o} className={`kalk__chip ${current.objekt === o ? 'is-on' : ''}`} style={{ transition: 'all 0.3s' }}>
              {o}
            </span>
          ))}
        </div>
      </div>
      <div className="kalk__field">
        <span className="kalk__field-label">Fläche</span>
        <div className="kalk__input">
          <span className="kalk__input-value" style={{ transition: 'all 0.3s' }}>{current.flaeche}</span>
          <span className="kalk__input-unit">m²</span>
        </div>
      </div>
      <div className="kalk__field">
        <span className="kalk__field-label">Gewerke</span>
        <div className="kalk__chips">
          {['Bad', 'Küche', 'Boden', 'Elektrik', 'Heizung'].map((g) => (
            <span key={g} className={`kalk__chip ${current.gewerke.includes(g) ? 'is-on' : ''}`} style={{ transition: 'all 0.3s' }}>
              {g}
            </span>
          ))}
        </div>
      </div>
      <div className="kalk__result">
        <span className="kalk__result-label">Live-Spanne</span>
        <span className="kalk__result-value" style={{ transition: 'all 0.3s' }}>{current.price}</span>
        <span className="kalk__result-note" style={{ transition: 'all 0.3s' }}>{current.note}</span>
      </div>
    </div>
  );
}
