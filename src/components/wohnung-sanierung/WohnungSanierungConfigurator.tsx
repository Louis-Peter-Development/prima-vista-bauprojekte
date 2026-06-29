import { useState } from 'react';
import RenovationCalculator from '../renovation-calculator/RenovationCalculator';
import WohnungSanierungBoard from './WohnungSanierungBoard';
import {
  WOHNUNG_TYPES,
  type WohnungType,
} from '../../data/wohnungSanierung';

const DEFAULT_WOHNUNG_TYPE: WohnungType = '2zi';

function getWohnungTypeOption(value: WohnungType) {
  return WOHNUNG_TYPES.find((type) => type.value === value);
}

type Props = {
  embedded?: boolean;
};

export default function WohnungSanierungConfigurator({ embedded }: Props) {
  const [wohnungType, setWohnungType] = useState<WohnungType>(DEFAULT_WOHNUNG_TYPE);
  const [area, setArea] = useState<number>(() => getWohnungTypeOption(DEFAULT_WOHNUNG_TYPE)?.defaultArea ?? 100);

  const selectedType = getWohnungTypeOption(wohnungType);

  function changeWohnungType(value: WohnungType) {
    const nextType = getWohnungTypeOption(value);
    setWohnungType(value);
    if (nextType) setArea(nextType.defaultArea);
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
