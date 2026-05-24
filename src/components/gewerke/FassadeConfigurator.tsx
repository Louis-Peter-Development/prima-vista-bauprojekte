import { useState } from 'react';
import RenovationCalculator from '../renovation-calculator/RenovationCalculator';
import FassadeBoard, { type FassadeType } from './FassadeBoard';

const DEFAULT_SCOPE: Record<FassadeType, number> = {
  fassadeAlles: 100,
  fassadeDaemmung: 100,
  fassadeAnstrich: 100,
  fassadeHolzverkleidung: 100,
  fassadeSockeldaemmung: 50,
  fassadeKlinkerSteinriemchen: 100,
  fassadePlattenverkleidung: 100,
  fassadeNatursteinverkleidung: 100,
  fassadeVorhangfassade: 100,
  fassadeVerblendmauerwerk: 100
};

const LABELS: Record<FassadeType, string> = {
  fassadeAlles: 'Alles zu Fassade',
  fassadeDaemmung: 'Dämmung & Anstrich',
  fassadeAnstrich: 'Anstrich',
  fassadeHolzverkleidung: 'Holzverkleidung',
  fassadeSockeldaemmung: 'Sockeldämmung',
  fassadeKlinkerSteinriemchen: 'Klinkerriemchen',
  fassadePlattenverkleidung: 'Plattenverkleidung',
  fassadeNatursteinverkleidung: 'Naturstein',
  fassadeVorhangfassade: 'Vorhangfassade',
  fassadeVerblendmauerwerk: 'Verblendmauerwerk'
};

export default function FassadeConfigurator() {
  const [activeType, setActiveType] = useState<FassadeType>('fassadeAlles');
  const [scope, setScope] = useState<number>(DEFAULT_SCOPE.fassadeAlles);

  const handleTypeChange = (type: FassadeType) => {
    setActiveType(type);
    setScope(DEFAULT_SCOPE[type]);
  };

  return (
    <div className="kalkulator__inner kalkulator__inner--stack">
      <FassadeBoard
        activeType={activeType}
        onTypeChange={handleTypeChange}
      />
      <RenovationCalculator
        packageId={activeType}
        embedded
        livingArea={scope}
        onLivingAreaChange={setScope}
        kindLabel={LABELS[activeType]}
        customAreaLabel="Fassadenfläche"
      />
    </div>
  );
}
