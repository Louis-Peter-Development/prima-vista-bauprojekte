import { useState } from 'react';
import RenovationCalculator from '../renovation-calculator/RenovationCalculator';
import HeizmethodenBoard, { type HeizmethodenType } from './HeizmethodenBoard';
import '../../styles/pages/kalkulator.css';
import '../../styles/pages/haus-sanierung.css';

const DEFAULT_SCOPE: Record<HeizmethodenType, number> = {
  heizmethodenHeizkoerper: 1,
  heizmethodenHeizstraenge: 50,
  heizmethodenFussbodenheizung: 100,
  heizmethodenWaermepumpe: 1,
  heizmethodenGasHeizung: 1,
  heizmethodenPelletofen: 1,
  heizmethodenSaunaofen: 1,
};

const LABELS: Record<HeizmethodenType, string> = {
  heizmethodenHeizkoerper: 'Heizkörper',
  heizmethodenHeizstraenge: 'Heizstränge',
  heizmethodenFussbodenheizung: 'Fußbodenheizung',
  heizmethodenWaermepumpe: 'Wärmepumpe',
  heizmethodenGasHeizung: 'Gas-Heizung',
  heizmethodenPelletofen: 'Pelletofen',
  heizmethodenSaunaofen: 'Saunaofen',
};

const AREA_LABELS: Record<HeizmethodenType, string> = {
  heizmethodenHeizkoerper: 'Anzahl Heizkörper / Umfang',
  heizmethodenHeizstraenge: 'Laufmeter Heizstränge',
  heizmethodenFussbodenheizung: 'Fläche in qm',
  heizmethodenWaermepumpe: 'Anzahl Anlagen / Umfang',
  heizmethodenGasHeizung: 'Anzahl Anlagen / Umfang',
  heizmethodenPelletofen: 'Anzahl Anlagen / Umfang',
  heizmethodenSaunaofen: 'Anzahl Anlagen / Umfang',
};

type Props = {
  initialType?: HeizmethodenType;
};

export default function HeizmethodenConfigurator({
  initialType = 'heizmethodenHeizkoerper',
}: Props) {
  const [activeType, setActiveType] = useState<HeizmethodenType>(initialType);
  const [scope, setScope] = useState<number>(DEFAULT_SCOPE[initialType]);

  const handleTypeChange = (type: HeizmethodenType) => {
    setActiveType(type);
    setScope(DEFAULT_SCOPE[type]);
  };

  return (
    <div className="kalkulator__inner kalkulator__inner--stack">
      <HeizmethodenBoard
        activeType={activeType}
        onTypeChange={handleTypeChange}
      />
      <RenovationCalculator
        packageId={activeType}
        embedded
        livingArea={scope}
        onLivingAreaChange={setScope}
        kindLabel={LABELS[activeType]}
        customAreaLabel={AREA_LABELS[activeType]}
      />
    </div>
  );
}
