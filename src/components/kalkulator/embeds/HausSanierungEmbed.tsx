import { useMemo, useState } from 'react';
import HausSanierungBoard from '../../haus-sanierung/HausSanierungBoard';
import HausSanierungResult from '../../haus-sanierung/HausSanierungResult';
import { HAUS_GEWERKE, HOUSE_TYPES, type HouseType } from '../../../data/hausSanierung';
import '../../../styles/pages/haus-sanierung.css';

export default function HausSanierungEmbed() {
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
    const pickedSet = new Set(picked);
    const sumPerM2 = HAUS_GEWERKE
      .filter((g) => pickedSet.has(g.key) && (!g.requiresDach || hasDach))
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
    <div className="kalkulator__inner kalk-embed">
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
  );
}
