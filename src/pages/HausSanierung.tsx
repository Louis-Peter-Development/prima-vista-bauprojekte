import { useMemo, useState } from 'react';
import PageIntro from '../components/common/PageIntro';
import HausSanierungBoard from '../components/haus-sanierung/HausSanierungBoard';
import HausSanierungResult from '../components/haus-sanierung/HausSanierungResult';
import {
  HAUS_GEWERKE,
  HOUSE_TYPES,
  type HouseType,
} from '../data/hausSanierung';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/kalkulator.css';
import '../styles/pages/haus-sanierung.css';

export default function HausSanierung() {
  usePageTitle('Haus-Sanierung kalkulieren');
  const [houseType, setHouseType] = useState<HouseType>('1e-d');
  const [area, setArea] = useState<number>(100);
  const [picked, setPicked] = useState<string[]>([
    'bad',
    'boeden',
    'elektro',
    'fenster',
    'heizflaechen',
    'maler',
    'planung',
    'wasser',
  ]);

  function toggle(key: string) {
    setPicked((p) => (p.includes(key) ? p.filter((k) => k !== key) : [...p, key]));
  }

  const { totalMid, totalMin, totalMax, perM2, factor } = useMemo(() => {
    const type = HOUSE_TYPES.find((t) => t.value === houseType);
    const factor = type?.factor ?? 1;
    const hasDach = type?.includesDach ?? false;
    const sumPerM2 = HAUS_GEWERKE
      .filter((g) => picked.includes(g.key) && (!g.requiresDach || hasDach))
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
  }, [houseType, area, picked]);

  const hasPicks = picked.length > 0 && area > 0;

  return (
    <>
      <PageIntro
        className="kalk-intro"
        backgroundImage="/assets/img/photo-haus-exterior.jpg"
        crumbNumber="07"
        crumbLabel="Haus-Sanierung · Konfigurator"
        title={<>Haus-Sanierung<br /><em>nach Maß.</em></>}
        lede="Vier Haustypen, vier Flächen, 16 Gewerke. Wählen Sie die Konfiguration, die zu Ihrem Vorhaben passt — die Schätzung aktualisiert sich live."
        meta={[
          { label: 'Haustypen', value: '4 Konfigurationen' },
          { label: 'Gewerke', value: '16 Positionen' },
          { label: 'Genauigkeit', value: '± 15 % Vorab-Spanne' },
          { label: 'Festpreis', value: 'Auf Wunsch in 24 Std.' },
        ]}
      />

      <section className="kalkulator">
        <div className="kalkulator__inner">
          <HausSanierungBoard
            houseType={houseType}
            area={area}
            picked={picked}
            onHouseTypeChange={setHouseType}
            onAreaChange={setArea}
            onToggleGewerk={toggle}
          />
          <HausSanierungResult
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
