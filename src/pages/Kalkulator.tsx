import { useMemo, useState } from 'react';
import PageIntro from '../components/common/PageIntro';
import KalkBoard from '../components/kalkulator/KalkBoard';
import KalkResult from '../components/kalkulator/KalkResult';
import {
  GEWERKE,
  OBJEKT_OPTIONS,
  QUALITY_OPTIONS,
  type Objekt,
  type Quality,
} from '../data/kalkulator';
import '../styles/pages/kalkulator.css';

export default function Kalkulator() {
  const [objekt, setObjekt] = useState<Objekt>('wohnung');
  const [flaeche, setFlaeche] = useState<number>(120);
  const [quality, setQuality] = useState<Quality>('gehoben');
  const [picked, setPicked] = useState<string[]>(['bad', 'kueche', 'boden', 'elektro']);

  function toggle(key: string) {
    setPicked((p) => p.includes(key) ? p.filter(k => k !== key) : [...p, key]);
  }

  const { totalMid, totalMin, totalMax, perM2, objektFactor, qMult } = useMemo(() => {
    const objektFactor = OBJEKT_OPTIONS.find(o => o.value === objekt)?.baseFactor ?? 1;
    const qMult = QUALITY_OPTIONS.find(q => q.value === quality)?.multiplier ?? 1;
    const sumPerM2 = GEWERKE.filter(g => picked.includes(g.key))
      .reduce((acc, g) => acc + g.pricePerM2, 0);
    const adjustedPerM2 = sumPerM2 * objektFactor * qMult;
    const total = adjustedPerM2 * flaeche;
    return {
      totalMid: total,
      totalMin: total * 0.85,
      totalMax: total * 1.20,
      perM2: adjustedPerM2,
      objektFactor,
      qMult,
    };
  }, [objekt, flaeche, quality, picked]);

  const hasPicks = picked.length > 0 && flaeche > 0;
  const sliderPct = ((flaeche - 20) / (500 - 20)) * 100;

  return (
    <>
      <PageIntro
        className="kalk-intro"
        backgroundImage="/assets/img/photo-parkett-altbau.jpg"
        crumbNumber="06"
        crumbLabel="Kalkulator · Live-Schätzung"
        title={<>Was kostet<br />Ihr <em>Bauprojekt?</em></>}
        lede="Ein paar Klicks. Eine ehrliche Spanne. Auf Basis von Daten aus über 400 abgeschlossenen Projekten in Hessen und der Innerschweiz — ohne Anmeldung, ohne Verkaufstaktik."
        meta={[
          { label: 'Berechnung', value: 'Live, in Echtzeit' },
          { label: 'Datenbasis', value: '412 reale Projekte' },
          { label: 'Genauigkeit', value: '± 15 % Vorab-Spanne' },
          { label: 'Festpreis', value: 'Auf Wunsch in 24 Std.' },
        ]}
      />

      <section className="kalkulator">
        <div className="kalkulator__inner">
          <KalkBoard
            objekt={objekt}
            flaeche={flaeche}
            quality={quality}
            picked={picked}
            sliderPct={sliderPct}
            onObjektChange={setObjekt}
            onFlaecheChange={setFlaeche}
            onQualityChange={setQuality}
            onToggleGewerk={toggle}
          />
          <KalkResult
            hasPicks={hasPicks}
            totalMin={totalMin}
            totalMax={totalMax}
            totalMid={totalMid}
            perM2={perM2}
            flaeche={flaeche}
            picked={picked}
            objektFactor={objektFactor}
            qMult={qMult}
          />
        </div>
      </section>
    </>
  );
}
