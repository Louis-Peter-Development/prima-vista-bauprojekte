import { useState, useEffect } from 'react';
import RenovationCalculator from '../renovation-calculator/RenovationCalculator';
import BarrierefreiesBadBoard, { type BarrierefreiType } from './BarrierefreiesBadBoard';

export default function BarrierefreiesBadConfigurator() {
  const [activeType, setActiveType] = useState<BarrierefreiType>('barrierefreiDusche');
  const [area, setArea] = useState<number>(4);

  useEffect(() => {
    switch (activeType) {
      case 'barrierefreiDusche':
      case 'barrierefreiWc':
        setArea(4);
        break;
      case 'barrierefreiSenioren':
        setArea(6);
        break;
      case 'barrierefreiRollstuhl':
        setArea(8);
        break;
    }
  }, [activeType]);

  const getLabel = (type: BarrierefreiType) => {
    switch (type) {
      case 'barrierefreiDusche': return 'Ebenerdige Dusche';
      case 'barrierefreiWc': return 'WC & Waschtisch';
      case 'barrierefreiSenioren': return 'Seniorengerechtes Bad';
      case 'barrierefreiRollstuhl': return 'Rollstuhlgerecht (Komplett)';
      default: return 'Barrierefreies Bad';
    }
  };

  return (
    <div className="kalkulator__inner kalkulator__inner--stack">
      <BarrierefreiesBadBoard
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
