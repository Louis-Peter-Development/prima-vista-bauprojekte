import { useState } from 'react';
import RenovationCalculator from '../renovation-calculator/RenovationCalculator';
import AbdichtungKellerBoard, { type AbdichtungType } from './AbdichtungKellerBoard';

const DEFAULT_AREA: Record<AbdichtungType, number> = {
  abdichtung: 30,
  abdichtungHorizontal: 15,
  abdichtungPerimeter: 15,
  abdichtungKeller: 25,
};

export default function AbdichtungKellerConfigurator() {
  const [activeType, setActiveType] = useState<AbdichtungType>('abdichtungHorizontal');
  const [area, setArea] = useState<number>(DEFAULT_AREA.abdichtungHorizontal);

  function handleTypeChange(type: AbdichtungType) {
    setActiveType(type);
    setArea(DEFAULT_AREA[type]);
  }

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
        onTypeChange={handleTypeChange}
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
