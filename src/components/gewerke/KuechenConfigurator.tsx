import { useState } from 'react';
import RenovationCalculator from '../renovation-calculator/RenovationCalculator';
import KuechenBoard, { type KuechenType } from './KuechenBoard';

const DEFAULT_SCOPE: Record<KuechenType, number> = {
  kuecheAlles: 7,
  kuecheKomplettkueche: 7,
  kuecheSingleMinikuechen: 3,
  kuecheBuerokueche: 5,
  kuecheEinbaukueche: 7,
  kuecheKuechenzeile: 4,
  kuecheArbeitsplatteSpuele: 4,
  kuecheDunstabzugshaube: 1,
  kuecheBodenDecken: 20,
  kuecheElektroBeleuchtung: 1,
  kuecheWasserinstallation: 1
};

const LABELS: Record<KuechenType, string> = {
  kuecheAlles: 'Alles zu Küchen',
  kuecheKomplettkueche: 'Komplettküche',
  kuecheSingleMinikuechen: 'Single-/Miniküche',
  kuecheBuerokueche: 'Büroküche',
  kuecheEinbaukueche: 'Einbauküche',
  kuecheKuechenzeile: 'Küchenzeile',
  kuecheArbeitsplatteSpuele: 'Arbeitsplatte & Spüle',
  kuecheDunstabzugshaube: 'Dunstabzugshaube',
  kuecheBodenDecken: 'Boden & Decken',
  kuecheElektroBeleuchtung: 'Elektro & Beleuchtung',
  kuecheWasserinstallation: 'Wasserinstallation'
};

export default function KuechenConfigurator() {
  const [activeType, setActiveType] = useState<KuechenType>('kuecheAlles');
  const [scope, setScope] = useState<number>(DEFAULT_SCOPE.kuecheAlles);

  const handleTypeChange = (type: KuechenType) => {
    setActiveType(type);
    setScope(DEFAULT_SCOPE[type]);
  };

  return (
    <div className="kalkulator__inner kalkulator__inner--stack">
      <KuechenBoard
        activeType={activeType}
        onTypeChange={handleTypeChange}
      />
      <RenovationCalculator
        packageId={activeType}
        embedded
        livingArea={scope}
        onLivingAreaChange={setScope}
        kindLabel={LABELS[activeType]}
        customAreaLabel="Küchenumfang"
      />
    </div>
  );
}
