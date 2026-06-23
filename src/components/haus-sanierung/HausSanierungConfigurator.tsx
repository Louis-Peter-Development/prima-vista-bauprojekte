import { useMemo, useState } from 'react';
import RenovationCalculator from '../renovation-calculator/RenovationCalculator';
import HausSanierungBoard from './HausSanierungBoard';
import HausSanierungResult from './HausSanierungResult';
import {
  HAUS_GEWERKE,
  HOUSE_TYPES,
  type HouseType,
} from '../../data/hausSanierung';

const DETAILED_CALCULATOR_TYPES: HouseType[] = ['1e', '2e', '1e-d', '2e-d'];

const DEFAULT_PICKED = [
  'bad',
  'boeden',
  'elektro',
  'fenster',
  'heizflaechen',
  'maler',
  'planung',
  'wasser',
];

type Props = {
  embedded?: boolean;
};

export default function HausSanierungConfigurator({ embedded }: Props) {
  const [houseType, setHouseType] = useState<HouseType>(DETAILED_CALCULATOR_TYPES[0]);
  const [area, setArea] = useState<number>(10);
  const [picked, setPicked] = useState<string[]>(DEFAULT_PICKED);

  const selectedType = HOUSE_TYPES.find((type) => type.value === houseType);
  const showsDetailedCalculator = DETAILED_CALCULATOR_TYPES.includes(houseType);

  function changeHouseType(value: HouseType) {
    const nextType = HOUSE_TYPES.find((type) => type.value === value);
    setHouseType(value);
    if (!nextType?.includesDach) {
      setPicked((current) => current.filter((key) => {
        const gewerk = HAUS_GEWERKE.find((item) => item.key === key);
        return !gewerk?.requiresDach;
      }));
    }
  }

  const { totalMid, totalMin, totalMax, perM2, factor } = useMemo(() => {
    const type = HOUSE_TYPES.find((item) => item.value === houseType);
    const factor = type?.factor ?? 1;
    const hasDach = type?.includesDach ?? false;
    const pickedSet = new Set(picked);
    const sumPerM2 = HAUS_GEWERKE
      .filter((gewerk) => pickedSet.has(gewerk.key) && (!gewerk.requiresDach || hasDach))
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
  }, [houseType, area, picked]);

  const hasPicks = picked.length > 0 && area > 0;

  return (
    <div className={`kalkulator__inner${showsDetailedCalculator ? ' kalkulator__inner--stack' : ''}${embedded ? ' kalk-embed' : ''}`}>
      <HausSanierungBoard
        houseType={houseType}
        onHouseTypeChange={changeHouseType}
      />

      {showsDetailedCalculator ? (
        <RenovationCalculator
          packageId={houseType}
          embedded
          livingArea={area}
          onLivingAreaChange={setArea}
          kindLabel={selectedType?.label ?? '1 Etage ohne Dach'}
        />
      ) : (
        <HausSanierungResult
          hasPicks={hasPicks}
          totalMin={totalMin}
          totalMax={totalMax}
          totalMid={totalMid}
          perM2={perM2}
          area={area}
          picked={picked}
          factor={factor}
          kindLabel={selectedType?.label ?? 'Haus-Sanierung'}
        />
      )}
    </div>
  );
}
