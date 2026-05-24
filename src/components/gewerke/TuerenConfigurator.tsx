import { useState } from 'react';
import RenovationCalculator from '../renovation-calculator/RenovationCalculator';
import TuerenBoard, { type TuerenType } from './TuerenBoard';

const DEFAULT_SCOPE: Record<TuerenType, number> = {
  tuerenAlles: 1,
  tuerenZimmertueren: 1,
  tuerenSchiebetueren: 1,
  tuerenGlastueren: 1,
  tuerenBalkonTerrassen: 1,
  tuerenHaustueren: 1,
  tuerenKellertueren: 1,
  tuerenGaragentore: 1,
  tuerenToreEinfahrt: 1
};

const LABELS: Record<TuerenType, string> = {
  tuerenAlles: 'Alles zu Türen',
  tuerenZimmertueren: 'Zimmertüren',
  tuerenSchiebetueren: 'Schiebetüren',
  tuerenGlastueren: 'Glastüren',
  tuerenBalkonTerrassen: 'Balkon/Terrasse',
  tuerenHaustueren: 'Haustüren',
  tuerenKellertueren: 'Kellertüren',
  tuerenGaragentore: 'Garagentore',
  tuerenToreEinfahrt: 'Tore/Einfahrt'
};

export default function TuerenConfigurator() {
  const [activeType, setActiveType] = useState<TuerenType>('tuerenAlles');
  const [scope, setScope] = useState<number>(DEFAULT_SCOPE.tuerenAlles);

  const handleTypeChange = (type: TuerenType) => {
    setActiveType(type);
    setScope(DEFAULT_SCOPE[type]);
  };

  return (
    <div className="kalkulator__inner kalkulator__inner--stack">
      <TuerenBoard
        activeType={activeType}
        onTypeChange={handleTypeChange}
      />
      <RenovationCalculator
        packageId={activeType}
        embedded
        livingArea={scope}
        onLivingAreaChange={setScope}
        kindLabel={LABELS[activeType]}
        customAreaLabel="Türen / Umfang"
      />
    </div>
  );
}
