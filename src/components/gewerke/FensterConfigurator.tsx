import { useState } from 'react';
import RenovationCalculator from '../renovation-calculator/RenovationCalculator';
import FensterBoard, { type FensterType } from './FensterBoard';

const DEFAULT_SCOPE: Record<FensterType, number> = {
  fensterAlles: 1,
  fensterKunststoff: 1,
  fensterHolz: 1,
  fensterAluminium: 1,
  fensterFensterlaeden: 1,
  fensterRolladen: 1,
  fensterDachfenster: 1,
  fensterBalkontueren: 1,
  fensterCarportGaragentore: 1,
  fensterFensterLackierung: 1,
  fensterMarkisen: 1
};

const LABELS: Record<FensterType, string> = {
  fensterAlles: 'Alles zu Fenster',
  fensterKunststoff: 'Kunststofffenster',
  fensterHolz: 'Holzfenster',
  fensterAluminium: 'Aluminiumfenster',
  fensterFensterlaeden: 'Fensterläden',
  fensterRolladen: 'Rollladen',
  fensterDachfenster: 'Dachfenster',
  fensterBalkontueren: 'Balkontüren',
  fensterCarportGaragentore: 'Garagentore',
  fensterFensterLackierung: 'Fensterlackierung',
  fensterMarkisen: 'Markisen'
};

export default function FensterConfigurator() {
  const [activeType, setActiveType] = useState<FensterType>('fensterAlles');
  const [scope, setScope] = useState<number>(DEFAULT_SCOPE.fensterAlles);

  const handleTypeChange = (type: FensterType) => {
    setActiveType(type);
    setScope(DEFAULT_SCOPE[type]);
  };

  return (
    <div className="kalkulator__inner kalkulator__inner--stack">
      <FensterBoard
        activeType={activeType}
        onTypeChange={handleTypeChange}
      />
      <RenovationCalculator
        packageId={activeType}
        embedded
        livingArea={scope}
        onLivingAreaChange={setScope}
        kindLabel={LABELS[activeType]}
        customAreaLabel="Stück / Umfang"
      />
    </div>
  );
}
