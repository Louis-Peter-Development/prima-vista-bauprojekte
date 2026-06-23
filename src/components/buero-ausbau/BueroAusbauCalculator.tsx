import { useMemo, useState } from 'react';
import {
  BUERO_GEWERKE,
  BUERO_TYPES,
  type BueroType,
} from '../../data/bueroAusbau';
import BueroAusbauBoard from './BueroAusbauBoard';
import BueroAusbauResult from './BueroAusbauResult';

const DEFAULT_PICKED = [
  'trockenbau',
  'akustik',
  'elektro',
  'netzwerk',
  'licht',
  'boeden',
  'maler',
];

type Props = {
  embedded?: boolean;
};

export default function BueroAusbauCalculator({ embedded }: Props) {
  const [bueroType, setBueroType] = useState<BueroType>('klassisch');
  const [area, setArea] = useState<number>(50);
  const [picked, setPicked] = useState<string[]>(DEFAULT_PICKED);

  function toggle(key: string) {
    setPicked((current) => (
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key]
    ));
  }

  const { totalMid, totalMin, totalMax, perM2, factor } = useMemo(() => {
    const type = BUERO_TYPES.find((item) => item.value === bueroType);
    const factor = type?.factor ?? 1;
    const pickedSet = new Set(picked);
    const sumPerM2 = BUERO_GEWERKE
      .filter((gewerk) => pickedSet.has(gewerk.key))
      .reduce((sum, gewerk) => sum + gewerk.pricePerM2, 0);
    const adjustedPerM2 = sumPerM2 * factor;
    const total = adjustedPerM2 * area;

    return {
      totalMid: total,
      totalMin: total * 0.85,
      totalMax: total * 1.2,
      perM2: adjustedPerM2,
      factor,
    };
  }, [bueroType, area, picked]);

  const hasPicks = picked.length > 0 && area > 0;
  const selectedType = BUERO_TYPES.find((type) => type.value === bueroType);

  return (
    <div className={`kalkulator__inner${embedded ? ' kalk-embed' : ''}`}>
      <BueroAusbauBoard
        bueroType={bueroType}
        area={area}
        picked={picked}
        onBueroTypeChange={setBueroType}
        onAreaChange={setArea}
        onToggleGewerk={toggle}
      />
      <BueroAusbauResult
        hasPicks={hasPicks}
        totalMin={totalMin}
        totalMax={totalMax}
        totalMid={totalMid}
        perM2={perM2}
        area={area}
        picked={picked}
        factor={factor}
        kindLabel={selectedType?.label ?? 'Büro-Ausbau'}
      />
    </div>
  );
}
