import { useState } from 'react';
import RenovationCalculator from '../renovation-calculator/RenovationCalculator';
import RohbauBoard, { type RohbauType } from './RohbauBoard';

const DEFAULT_SCOPE: Record<RohbauType, number> = {
  rohbauAlles: 100,
  rohbauAbbruch: 100,
  rohbauEstrich: 100,
  rohbauStahltraeger: 1,
  rohbauVerputzen: 100,
  rohbauLichtschaechte: 1,
  rohbauSchornstein: 1,
  rohbauMauerwerk: 100,
  rohbauPflastern: 100
};

const LABELS: Record<RohbauType, string> = {
  rohbauAlles: 'Alles zu Rohbau',
  rohbauAbbruch: 'Abbruch',
  rohbauEstrich: 'Estrich',
  rohbauStahltraeger: 'Stahlträger',
  rohbauVerputzen: 'Verputzen',
  rohbauLichtschaechte: 'Lichtschächte',
  rohbauSchornstein: 'Schornstein',
  rohbauMauerwerk: 'Mauerwerk',
  rohbauPflastern: 'Pflastern'
};

export default function RohbauConfigurator() {
  const [activeType, setActiveType] = useState<RohbauType>('rohbauAlles');
  const [scope, setScope] = useState<number>(DEFAULT_SCOPE.rohbauAlles);

  const handleTypeChange = (type: RohbauType) => {
    setActiveType(type);
    setScope(DEFAULT_SCOPE[type]);
  };

  return (
    <div className="kalkulator__inner kalkulator__inner--stack">
      <RohbauBoard
        activeType={activeType}
        onTypeChange={handleTypeChange}
      />
      <RenovationCalculator
        packageId={activeType}
        embedded
        livingArea={scope}
        onLivingAreaChange={setScope}
        kindLabel={LABELS[activeType]}
        customAreaLabel="Rohbauumfang"
      />
    </div>
  );
}
