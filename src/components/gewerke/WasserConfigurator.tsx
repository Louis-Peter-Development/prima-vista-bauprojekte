import { useState } from 'react';
import RenovationCalculator from '../renovation-calculator/RenovationCalculator';
import WasserBoard, { type WasserType } from './WasserBoard';

const DEFAULT_SCOPE: Record<WasserType, number> = {
  wasserAlles: 8,
  wasserBadezimmer: 1,
  wasserGaesteWc: 1,
  wasserKueche: 1,
  wasserWaschmaschine: 1,
  wasserKeller: 1,
  wasserGarten: 1,
  wasserSpuelkasten: 1,
  wasserHauptstrang: 1
};

const LABELS: Record<WasserType, string> = {
  wasserAlles: 'Alles zu Wasser',
  wasserBadezimmer: 'Badezimmer',
  wasserGaesteWc: 'Gäste-WC',
  wasserKueche: 'Küche',
  wasserWaschmaschine: 'Waschmaschine',
  wasserKeller: 'Keller',
  wasserGarten: 'Garten',
  wasserSpuelkasten: 'Spülkasten',
  wasserHauptstrang: 'Hauptstrang'
};

export default function WasserConfigurator() {
  const [activeType, setActiveType] = useState<WasserType>('wasserAlles');
  const [scope, setScope] = useState<number>(DEFAULT_SCOPE.wasserAlles);

  const handleTypeChange = (type: WasserType) => {
    setActiveType(type);
    setScope(DEFAULT_SCOPE[type]);
  };

  return (
    <div className="kalkulator__inner kalkulator__inner--stack">
      <WasserBoard
        activeType={activeType}
        onTypeChange={handleTypeChange}
      />
      <RenovationCalculator
        packageId={activeType}
        embedded
        livingArea={scope}
        onLivingAreaChange={setScope}
        kindLabel={LABELS[activeType]}
        customAreaLabel="Anschlüsse / Umfang"
      />
    </div>
  );
}
