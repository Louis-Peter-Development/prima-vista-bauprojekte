import { useState } from 'react';
import RenovationCalculator from '../renovation-calculator/RenovationCalculator';
import TrockenbauBoard, { type TrockenbauType } from './TrockenbauBoard';

const DEFAULT_SCOPE: Record<TrockenbauType, number> = {
  trockenbauAlles: 100,
  trockenbauDecken: 100,
  trockenbauWaendeStellen: 100,
  trockenbauWaendeVerkleiden: 100,
  trockenbauEstrich: 100,
  trockenbauDachschraegen: 100
};

const LABELS: Record<TrockenbauType, string> = {
  trockenbauAlles: 'Alles zu Trockenbau',
  trockenbauDecken: 'Decken abhängen',
  trockenbauWaendeStellen: 'Wände stellen',
  trockenbauWaendeVerkleiden: 'Wände verkleiden',
  trockenbauEstrich: 'Estrich/Boden',
  trockenbauDachschraegen: 'Dachschrägen'
};

export default function TrockenbauConfigurator() {
  const [activeType, setActiveType] = useState<TrockenbauType>('trockenbauAlles');
  const [scope, setScope] = useState<number>(DEFAULT_SCOPE.trockenbauAlles);

  const handleTypeChange = (type: TrockenbauType) => {
    setActiveType(type);
    setScope(DEFAULT_SCOPE[type]);
  };

  return (
    <div className="kalkulator__inner kalkulator__inner--stack">
      <TrockenbauBoard
        activeType={activeType}
        onTypeChange={handleTypeChange}
      />
      <RenovationCalculator
        packageId={activeType}
        embedded
        livingArea={scope}
        onLivingAreaChange={setScope}
        kindLabel={LABELS[activeType]}
        customAreaLabel="Fläche / Umfang"
      />
    </div>
  );
}
