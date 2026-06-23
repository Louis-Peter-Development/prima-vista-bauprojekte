import { useState } from 'react';
import RenovationCalculator from '../renovation-calculator/RenovationCalculator';
import DachBoard, { type DachVariantType } from './DachBoard';

const DEFAULT_SCOPE: Record<DachVariantType, number> = {
  dachAlles: 40,
  dachNeubedachung: 40,
  dachDachstuhl: 40,
  dachInnenausbau: 30,
  dachDaemmung: 40,
  dachGauben: 1,
  dachFenster: 1,
  dachanhebung: 40,
  flachdach: 30,
  dachbodenDaemmung: 30,
};

export default function DachConfigurator() {
  const [activeType, setActiveType] = useState<DachVariantType>('dachAlles');
  const [area, setArea] = useState<number>(DEFAULT_SCOPE.dachAlles);

  function handleTypeChange(type: DachVariantType) {
    setActiveType(type);
    setArea(DEFAULT_SCOPE[type]);
  }

  const getLabel = (type: DachVariantType) => {
    switch (type) {
      case 'dachAlles': return 'Alles zu Dachsanierung';
      case 'dachNeubedachung': return 'Neubedachung';
      case 'dachDachstuhl': return 'Dachstuhl';
      case 'dachInnenausbau': return 'Dach-Innenausbau';
      case 'dachDaemmung': return 'Dachdämmung';
      case 'dachGauben': return 'Gauben';
      case 'dachFenster': return 'Dachfenster';
      case 'dachanhebung': return 'Dachanhebung hydraulisch';
      case 'flachdach': return 'Flachdach-Beschichtung';
      case 'dachbodenDaemmung': return 'Dachboden-Dämmung';
      default: return 'Dachsanierung';
    }
  };

  const getAreaLabel = (type: DachVariantType) => {
    switch (type) {
      case 'dachGauben':
        return 'Anzahl Gauben (Stk.)';
      case 'dachFenster':
        return 'Anzahl Dachfenster (Stk.)';
      default:
        return 'Dachfläche in m²';
    }
  };

  return (
    <div className="kalkulator__inner kalkulator__inner--stack">
      <DachBoard
        activeType={activeType}
        onTypeChange={handleTypeChange}
      />
      <RenovationCalculator
        packageId={activeType}
        embedded
        livingArea={area}
        onLivingAreaChange={setArea}
        kindLabel={getLabel(activeType)}
        customAreaLabel={getAreaLabel(activeType)}
      />
    </div>
  );
}
