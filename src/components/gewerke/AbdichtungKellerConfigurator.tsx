import { useState } from 'react';
import RenovationCalculator from '../renovation-calculator/RenovationCalculator';
import AbdichtungKellerBoard, { type AbdichtungType } from './AbdichtungKellerBoard';

export default function AbdichtungKellerConfigurator() {
  const [activeType, setActiveType] = useState<AbdichtungType>('abdichtungHorizontal');
  const [area, setArea] = useState<number>(100);

  const getLabel = (type: AbdichtungType) => {
    switch (type) {
      case 'abdichtungHorizontal': return 'Horizontal-Abdichtung';
      case 'abdichtungPerimeter': return 'Perimeter-Abdichtung';
      case 'abdichtungKeller': return 'Keller-Abdichtung (Innen)';
      case 'abdichtung': return 'Komplette Abdichtung';
      default: return 'Abdichtung';
    }
  };

  return (
    <div className="kalkulator__inner kalkulator__inner--stack">
      <AbdichtungKellerBoard
        activeType={activeType}
        onTypeChange={setActiveType}
      />
      <RenovationCalculator
        packageId={activeType}
        embedded
        livingArea={area}
        onLivingAreaChange={setArea}
        kindLabel={getLabel(activeType)}
      />
    </div>
  );
}
