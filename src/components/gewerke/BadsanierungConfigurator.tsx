import { useState, useEffect } from 'react';
import RenovationCalculator from '../renovation-calculator/RenovationCalculator';
import BadsanierungBoard, { type BadsanierungType } from './BadsanierungBoard';

export default function BadsanierungConfigurator() {
  const [activeType, setActiveType] = useState<BadsanierungType>('badDusche');
  const [area, setArea] = useState<number>(6);

  useEffect(() => {
    switch (activeType) {
      case 'badGaeste':
        setArea(3);
        break;
      case 'badDusche':
      case 'badWanne':
        setArea(6);
        break;
      case 'badKomplett':
      case 'badWhirlpool':
      case 'badWhirlpoolDusche':
      case 'badBarrierefrei':
        setArea(10);
        break;
    }
  }, [activeType]);

  const getLabel = (type: BadsanierungType) => {
    switch (type) {
      case 'badGaeste': return 'Gäste-WC';
      case 'badDusche': return 'Bad mit Dusche';
      case 'badWanne': return 'Bad mit Wanne';
      case 'badKomplett': return 'Wanne & Dusche';
      case 'badWhirlpool': return 'Bad mit Whirlpool';
      case 'badWhirlpoolDusche': return 'Whirlpool & Dusche';
      case 'badBarrierefrei': return 'Barrierefreies Bad';
      default: return 'Badsanierung';
    }
  };

  return (
    <div className="kalkulator__inner kalkulator__inner--stack">
      <BadsanierungBoard
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
