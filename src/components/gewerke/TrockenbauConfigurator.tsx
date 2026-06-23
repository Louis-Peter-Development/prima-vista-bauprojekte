import { useState } from 'react';
import RenovationCalculator from '../renovation-calculator/RenovationCalculator';
import TrockenbauBoard, { type TrockenbauType } from './TrockenbauBoard';

const DEFAULT_SCOPE: Record<TrockenbauType, number> = {
  trockenbauAlles: 20,
  trockenbauDecken: 20,
  trockenbauWaendeStellen: 20,
  trockenbauWaendeVerkleiden: 20,
  trockenbauEstrich: 20,
  trockenbauDachschraegen: 20
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
