import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Animation logic only — canonical keys; display strings come from i18n.
const OBJEKT_CHIPS = ['Haus', 'Wohnung', 'Gastro', 'Anderes'] as const;
const TRADE_CHIPS = ['Bad', 'Küche', 'Boden', 'Elektrik', 'Heizung'] as const;

const DEMO = [
  { objekt: 'Haus', flaeche: 142, gewerke: ['Bad', 'Küche', 'Elektrik'] },
  { objekt: 'Wohnung', flaeche: 85, gewerke: ['Bad', 'Boden', 'Heizung'] },
  { objekt: 'Haus', flaeche: 210, gewerke: ['Bad', 'Küche', 'Boden', 'Elektrik', 'Heizung'] },
  { objekt: 'Gastro', flaeche: 120, gewerke: ['Küche', 'Boden', 'Elektrik'] },
];

export default function HomeKalkulatorLive() {
  const { t } = useTranslation('home');
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % DEMO.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const current = DEMO[step];

  return (
    <div className="kalk__card reveal" data-delay="1" aria-hidden="true" style={{ transition: 'all 0.3s ease' }}>
      <div className="kalk__card-head">
        <span className="kalk__card-num">№ 05</span>
        <span className="kalk__card-label">{t('kalkLive.label')}</span>
      </div>
      <div className="kalk__field">
        <span className="kalk__field-label">{t('kalkLive.objektart')}</span>
        <div className="kalk__chips">
          {OBJEKT_CHIPS.map((o) => (
            <span key={o} className={`kalk__chip ${current.objekt === o ? 'is-on' : ''}`} style={{ transition: 'all 0.3s' }}>
              {t(`kalkLive.objekt.${o}`)}
            </span>
          ))}
        </div>
      </div>
      <div className="kalk__field">
        <span className="kalk__field-label">{t('kalkLive.flaeche')}</span>
        <div className="kalk__input">
          <span className="kalk__input-value" style={{ transition: 'all 0.3s' }}>{current.flaeche}</span>
          <span className="kalk__input-unit">m²</span>
        </div>
      </div>
      <div className="kalk__field">
        <span className="kalk__field-label">{t('kalkLive.gewerke')}</span>
        <div className="kalk__chips">
          {TRADE_CHIPS.map((g) => (
            <span key={g} className={`kalk__chip ${current.gewerke.includes(g) ? 'is-on' : ''}`} style={{ transition: 'all 0.3s' }}>
              {t(`kalkLive.trade.${g}`)}
            </span>
          ))}
        </div>
      </div>
      <div className="kalk__result">
        <span className="kalk__result-label">{t('kalkLive.liveRange')}</span>
        <span className="kalk__result-value" style={{ transition: 'all 0.3s' }}>{t(`kalkLive.states.${step}.price`)}</span>
        <span className="kalk__result-note" style={{ transition: 'all 0.3s' }}>{t(`kalkLive.states.${step}.note`)}</span>
      </div>
    </div>
  );
}
