import { useMemo, useState } from 'react';
import PageIntro from '../components/common/PageIntro';
import WohnungSanierungBoard from '../components/wohnung-sanierung/WohnungSanierungBoard';
import WohnungSanierungResult from '../components/wohnung-sanierung/WohnungSanierungResult';
import {
  WOHNUNG_GEWERKE,
  WOHNUNG_TYPES,
  type WohnungType,
} from '../data/wohnungSanierung';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/kalkulator.css';
import '../styles/pages/haus-sanierung.css';

export default function WohnungSanierung() {
  usePageTitle('Wohnung-Sanierung kalkulieren');
  const [wohnungType, setWohnungType] = useState<WohnungType>('2zi');
  const [area, setArea] = useState<number>(100);
  const [picked, setPicked] = useState<string[]>([
    'bad',
    'boeden',
    'elektro',
    'kueche',
    'maler',
    'planung',
    'tueren',
  ]);

  function toggle(key: string) {
    setPicked((p) => (p.includes(key) ? p.filter((k) => k !== key) : [...p, key]));
  }

  const { totalMid, totalMin, totalMax, perM2, factor } = useMemo(() => {
    const type = WOHNUNG_TYPES.find((t) => t.value === wohnungType);
    const factor = type?.factor ?? 1;
    const multiLevel = type?.multiLevel ?? false;
    const sumPerM2 = WOHNUNG_GEWERKE
      .filter((g) => picked.includes(g.key) && (!g.multiLevelOnly || multiLevel))
      .reduce((acc, g) => acc + g.pricePerM2, 0);
    const adjustedPerM2 = sumPerM2 * factor;
    const total = adjustedPerM2 * area;
    return {
      totalMid: total,
      totalMin: total * 0.85,
      totalMax: total * 1.2,
      perM2: adjustedPerM2,
      factor,
    };
  }, [wohnungType, area, picked]);

  const hasPicks = picked.length > 0 && area > 0;

  return (
    <>
      <PageIntro
        className="kalk-intro"
        backgroundImage="/assets/img/photo-parkett-altbau.jpg"
        crumbNumber="08"
        crumbLabel="Wohnung-Sanierung · Konfigurator"
        title={<>Wohnung-Sanierung<br /><em>nach Maß.</em></>}
        lede="Vier Wohnungstypen, vier Flächen, zwölf Gewerke. Vom Bad-Refresh bis zur Maisonette-Vollsanierung — die Schätzung aktualisiert sich live."
        meta={[
          { label: 'Wohnungstypen', value: '4 Konfigurationen' },
          { label: 'Gewerke', value: '12 Positionen' },
          { label: 'Genauigkeit', value: '± 15 % Vorab-Spanne' },
          { label: 'Bauzeit', value: 'ab 6 Wochen' },
        ]}
      />

      <section className="kalkulator">
        <div className="kalkulator__inner">
          <WohnungSanierungBoard
            wohnungType={wohnungType}
            area={area}
            picked={picked}
            onWohnungTypeChange={setWohnungType}
            onAreaChange={setArea}
            onToggleGewerk={toggle}
          />
          <WohnungSanierungResult
            hasPicks={hasPicks}
            totalMin={totalMin}
            totalMax={totalMax}
            totalMid={totalMid}
            perM2={perM2}
            area={area}
            picked={picked}
            factor={factor}
          />
        </div>
      </section>
    </>
  );
}
