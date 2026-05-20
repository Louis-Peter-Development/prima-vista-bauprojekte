import { useMemo, useState } from 'react';
import GastronomieAusbauBoard from '../../gastronomie-ausbau/GastronomieAusbauBoard';
import GastronomieAusbauResult from '../../gastronomie-ausbau/GastronomieAusbauResult';
import { GASTRONOMIE_GEWERKE, GASTRONOMIE_TYPES, type GastronomieType } from '../../../data/gastronomieAusbau';
import '../../../styles/pages/haus-sanierung.css';

export default function GastronomieAusbauEmbed() {
  const [gastronomieType, setGastronomieType] = useState<GastronomieType>('restaurant');
  const [area, setArea] = useState<number>(200);
  const [picked, setPicked] = useState<string[]>([
    'lueftung',
    'kueche',
    'sanitaer',
    'elektro',
    'boeden',
    'maler',
  ]);

  function toggle(key: string) {
    setPicked((p) => (p.includes(key) ? p.filter((k) => k !== key) : [...p, key]));
  }

  const { totalMid, totalMin, totalMax, perM2, factor } = useMemo(() => {
    const type = GASTRONOMIE_TYPES.find((t) => t.value === gastronomieType);
    const factor = type?.factor ?? 1;
    const multiLevel = type?.multiLevel ?? false;
    const pickedSet = new Set(picked);
    const sumPerM2 = GASTRONOMIE_GEWERKE
      .filter((g) => pickedSet.has(g.key) && (!g.multiLevelOnly || multiLevel))
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
  }, [gastronomieType, area, picked]);

  const hasPicks = picked.length > 0 && area > 0;

  return (
    <div className="kalkulator__inner kalk-embed">
      <GastronomieAusbauBoard
        gastronomieType={gastronomieType}
        area={area}
        picked={picked}
        onGastronomieTypeChange={setGastronomieType}
        onAreaChange={setArea}
        onToggleGewerk={toggle}
      />
      <GastronomieAusbauResult
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
  );
}
