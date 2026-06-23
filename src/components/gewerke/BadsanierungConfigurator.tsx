import { useState } from 'react';
import RenovationCalculator from '../renovation-calculator/RenovationCalculator';
import BadsanierungBoard, { type BadsanierungType } from './BadsanierungBoard';

const DEFAULT_AREA: Record<BadsanierungType, number> = {
  badGaeste: 3,
  badDusche: 5,
  badWanne: 5,
  badKomplett: 8,
  badWhirlpool: 8,
  badWhirlpoolDusche: 8,
  badBarrierefrei: 8,
};

export default function BadsanierungConfigurator() {
  const [activeType, setActiveType] = useState<BadsanierungType>('badDusche');
  const [area, setArea] = useState<number>(DEFAULT_AREA.badDusche);

  function handleTypeChange(type: BadsanierungType) {
    setActiveType(type);
    setArea(DEFAULT_AREA[type]);
  }

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
