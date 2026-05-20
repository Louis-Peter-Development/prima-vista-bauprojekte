import { useMemo, useState } from 'react';
import WohnungSanierungBoard from '../../wohnung-sanierung/WohnungSanierungBoard';
import WohnungSanierungResult from '../../wohnung-sanierung/WohnungSanierungResult';
import { WOHNUNG_GEWERKE, WOHNUNG_TYPES, type WohnungType } from '../../../data/wohnungSanierung';
import '../../../styles/pages/haus-sanierung.css';

export default function WohnungSanierungEmbed() {
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
    const pickedSet = new Set(picked);
    const sumPerM2 = WOHNUNG_GEWERKE
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
  }, [wohnungType, area, picked]);

  const hasPicks = picked.length > 0 && area > 0;

  return (
    <div className="kalkulator__inner kalk-embed">
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
  );
}
