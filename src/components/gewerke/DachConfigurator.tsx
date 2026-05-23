import { useState } from 'react';
import RenovationCalculator from '../renovation-calculator/RenovationCalculator';
import DachBoard, { type DachVariantType } from './DachBoard';

export default function DachConfigurator() {
  const [activeType, setActiveType] = useState<DachVariantType>('dachAlles');
  const [area, setArea] = useState<number>(120);

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
        onTypeChange={setActiveType}
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
