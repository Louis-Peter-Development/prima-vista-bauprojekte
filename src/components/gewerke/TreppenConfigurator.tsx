import { useState } from 'react';
import RenovationCalculator from '../renovation-calculator/RenovationCalculator';
import TreppenBoard, { type TreppenType } from './TreppenBoard';

const DEFAULT_SCOPE: Record<TreppenType, number> = {
  treppenAlles: 1,
  treppenHolztreppe: 1,
  treppenBetontreppe: 1,
  treppenDurchbruch: 1,
  treppenGelaender: 1,
  treppenAussentreppe: 1,
  treppenRaumspartreppe: 1,
  treppenDachbodentreppe: 1,
  treppenSpindeltreppe: 1,
  treppenAufbereiten: 1,
  treppenBelegung: 1
};

const LABELS: Record<TreppenType, string> = {
  treppenAlles: 'Alles zu Treppen',
  treppenHolztreppe: 'Holztreppe',
  treppenBetontreppe: 'Betontreppe',
  treppenDurchbruch: 'Treppenauge',
  treppenGelaender: 'Geländer',
  treppenAussentreppe: 'Außentreppe',
  treppenRaumspartreppe: 'Raumspartreppe',
  treppenDachbodentreppe: 'Dachbodentreppe',
  treppenSpindeltreppe: 'Spindeltreppe',
  treppenAufbereiten: 'Treppen aufbereiten',
  treppenBelegung: 'Treppenbelegung'
};

export default function TreppenConfigurator() {
  const [activeType, setActiveType] = useState<TreppenType>('treppenAlles');
  const [scope, setScope] = useState<number>(DEFAULT_SCOPE.treppenAlles);

  const handleTypeChange = (type: TreppenType) => {
    setActiveType(type);
    setScope(DEFAULT_SCOPE[type]);
  };

  return (
    <div className="kalkulator__inner kalkulator__inner--stack">
      <TreppenBoard
        activeType={activeType}
        onTypeChange={handleTypeChange}
      />
      <RenovationCalculator
        packageId={activeType}
        embedded
        livingArea={scope}
        onLivingAreaChange={setScope}
        kindLabel={LABELS[activeType]}
        customAreaLabel="Stufen / Umfang"
      />
    </div>
  );
}
