import { useState } from 'react';
import RenovationCalculator from '../renovation-calculator/RenovationCalculator';
import FassadeBoard, { type FassadeType } from './FassadeBoard';

const DEFAULT_SCOPE: Record<FassadeType, number> = {
  fassadeAlles: 40,
  fassadeDaemmung: 40,
  fassadeAnstrich: 40,
  fassadeHolzverkleidung: 40,
  fassadeSockeldaemmung: 20,
  fassadeKlinkerSteinriemchen: 40,
  fassadePlattenverkleidung: 40,
  fassadeNatursteinverkleidung: 40,
  fassadeVorhangfassade: 40,
  fassadeVerblendmauerwerk: 40
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
