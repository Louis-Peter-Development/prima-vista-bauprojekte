import { useState } from 'react';
import RenovationCalculator from '../renovation-calculator/RenovationCalculator';
import ZaeuneBoard, { type ZaeuneType } from './ZaeuneBoard';

const DEFAULT_SCOPE: Record<ZaeuneType, number> = {
  zaeuneAluminium: 10,
  zaeuneHolz: 10,
  zaeuneGlas: 10,
  zaeuneMetall: 10,
  zaeuneDoppelstab: 10,
  zaeuneGabionen: 10,
  zaeuneSichtschutz: 10,
  zaeuneMaschendraht: 10,
  zaeuneSteck: 10,
  zaeuneVorgarten: 10,
  zaeuneSichtschutzstreifen: 10
};

const LABELS: Record<ZaeuneType, string> = {
  zaeuneAluminium: 'Aluminiumzaun',
  zaeuneHolz: 'Holzzaun',
  zaeuneGlas: 'Glaszaun',
  zaeuneMetall: 'Metallzaun',
  zaeuneDoppelstab: 'Doppelstabmatten',
  zaeuneGabionen: 'Gabionenzaun',
  zaeuneSichtschutz: 'Sichtschutzzaun',
  zaeuneMaschendraht: 'Maschendrahtzaun',
  zaeuneSteck: 'Steckzaun',
  zaeuneVorgarten: 'Vorgartenzaun',
  zaeuneSichtschutzstreifen: 'Sichtschutzstreifen'
};

export default function ZaeuneConfigurator() {
  const [activeType, setActiveType] = useState<ZaeuneType>('zaeuneAluminium');
  const [scope, setScope] = useState<number>(DEFAULT_SCOPE.zaeuneAluminium);

  const handleTypeChange = (type: ZaeuneType) => {
    setActiveType(type);
    setScope(DEFAULT_SCOPE[type]);
  };

  return (
    <div className="kalkulator__inner kalkulator__inner--stack">
      <ZaeuneBoard
        activeType={activeType}
        onTypeChange={handleTypeChange}
      />
      <RenovationCalculator
        packageId={activeType}
        embedded
        livingArea={scope}
        onLivingAreaChange={setScope}
        kindLabel={LABELS[activeType]}
        customAreaLabel="Zaunlänge / Umfang"
      />
    </div>
  );
}
