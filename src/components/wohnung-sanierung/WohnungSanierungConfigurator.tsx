import { useState } from 'react';
import RenovationCalculator from '../renovation-calculator/RenovationCalculator';
import WohnungSanierungBoard from './WohnungSanierungBoard';
import {
  WOHNUNG_TYPES,
  type WohnungType,
} from '../../data/wohnungSanierung';

type Props = {
  embedded?: boolean;
};

export default function WohnungSanierungConfigurator({ embedded }: Props) {
  const [wohnungType, setWohnungType] = useState<WohnungType>('2zi');
  
  const defaultAreas: Record<WohnungType, number> = {
    'studio': 10,
    '2zi': 10,
    '3zi': 10,
    'maisonette': 10
  };
  
  const [area, setArea] = useState<number>(defaultAreas['2zi']);

  const selectedType = WOHNUNG_TYPES.find((type) => type.value === wohnungType);

  function changeWohnungType(value: WohnungType) {
    setWohnungType(value);
    setArea(defaultAreas[value] || defaultAreas['2zi']);
  }

  return (
    <div className={`kalkulator__inner kalkulator__inner--stack${embedded ? ' kalk-embed' : ''}`}>
      <WohnungSanierungBoard
        wohnungType={wohnungType}
        onWohnungTypeChange={changeWohnungType}
      />

      <RenovationCalculator
        packageId={wohnungType}
        embedded
        livingArea={area}
        onLivingAreaChange={setArea}
        kindLabel={selectedType?.label ?? 'Wohnungs-Sanierung'}
      />
    </div>
  );
}
