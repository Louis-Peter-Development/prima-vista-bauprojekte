import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type BlitzDoc = {
  num: string;
  projekt: string;
  standort: string;
  gewerke: string;
  standard: string;
  investition: string;
  datum: string;
};

export default function HomeBlitzLive() {
  const { t } = useTranslation('home');
  const docs = t('blitzLive.docs', { returnObjects: true }) as BlitzDoc[];
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % docs.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [docs.length]);

  const current = docs[step];

  return (
    <div className="blitz-home__doc reveal" aria-hidden="true" style={{ transition: 'all 0.3s ease' }}>
      <div className="blitz-home__doc-paper">
        <div className="blitz-home__doc-head">
          <div>
            <span className="blitz-home__doc-num" style={{ transition: 'opacity 0.3s' }}>{current.num}</span>
            <span className="blitz-home__doc-label">{t('blitzLive.label')}</span>
          </div>
          <span className="blitz-home__doc-stamp">{t('blitzLive.stamp')}</span>
        </div>
        <ul className="blitz-home__doc-rows">
          <li><span>{t('blitzLive.rowProjekt')}</span><strong style={{ transition: 'opacity 0.3s' }}>{current.projekt}</strong></li>
          <li><span>{t('blitzLive.rowStandort')}</span><strong style={{ transition: 'opacity 0.3s' }}>{current.standort}</strong></li>
          <li><span>{t('blitzLive.rowGewerke')}</span><strong style={{ transition: 'opacity 0.3s' }}>{current.gewerke}</strong></li>
          <li><span>{t('blitzLive.rowStandard')}</span><strong style={{ transition: 'opacity 0.3s' }}>{current.standard}</strong></li>
        </ul>
        <div className="blitz-home__doc-total">
          <span className="blitz-home__doc-total-label">{t('blitzLive.totalLabel')}</span>
          <span className="blitz-home__doc-total-value" style={{ transition: 'opacity 0.3s' }}>{current.investition}</span>
          <span className="blitz-home__doc-total-note">{t('blitzLive.totalNote')}</span>
        </div>
        <div className="blitz-home__doc-sig">
          <span className="blitz-home__doc-sig-name">{t('blitzLive.sigName')}</span>
          <span className="blitz-home__doc-sig-date" style={{ transition: 'opacity 0.3s' }}>{t('blitzLive.sigPlace')} · {current.datum}</span>
        </div>
      </div>
    </div>
  );
}
