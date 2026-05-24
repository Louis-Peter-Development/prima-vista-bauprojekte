import { useState } from 'react';
import RenovationCalculator from '../renovation-calculator/RenovationCalculator';
import MalerBoard, { type MalerType } from './MalerBoard';

const DEFAULT_SCOPE: Record<MalerType, number> = {
  malerAlles: 200,
  malerAnstrich: 200,
  malerGlaettenAnstrich: 200,
  malerTapezieren: 200,
  malerDeckenLackierung: 50,
  malerHeizkoerperLackierung: 1,
  malerFensterLackierung: 1,
  malerTuerenLackierung: 1,
  malerTreppenGelaenderLackierung: 1,
  malerFassadenAnstrich: 100
};

const LABELS: Record<MalerType, string> = {
  malerAlles: 'Alles zu Maler',
  malerAnstrich: 'Anstrich',
  malerGlaettenAnstrich: 'Glätten & Anstrich',
  malerTapezieren: 'Tapezieren',
  malerDeckenLackierung: 'Holzdecken',
  malerHeizkoerperLackierung: 'Heizkörper',
  malerFensterLackierung: 'Fenster',
  malerTuerenLackierung: 'Türen',
  malerTreppenGelaenderLackierung: 'Treppen/Geländer',
  malerFassadenAnstrich: 'Fassadenanstrich'
};

export default function MalerConfigurator() {
  const [activeType, setActiveType] = useState<MalerType>('malerAlles');
  const [scope, setScope] = useState<number>(DEFAULT_SCOPE.malerAlles);

  const handleTypeChange = (type: MalerType) => {
    setActiveType(type);
    setScope(DEFAULT_SCOPE[type]);
  };

  return (
    <div className="kalkulator__inner kalkulator__inner--stack">
      <MalerBoard
        activeType={activeType}
        onTypeChange={handleTypeChange}
      />
      <RenovationCalculator
        packageId={activeType}
        embedded
        livingArea={scope}
        onLivingAreaChange={setScope}
        kindLabel={LABELS[activeType]}
        customAreaLabel="Fläche / Etagen"
      />
    </div>
  );
}
