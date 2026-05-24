import { useState } from 'react';
import RenovationCalculator from '../renovation-calculator/RenovationCalculator';
import ZaeuneBoard, { type ZaeuneType } from './ZaeuneBoard';

const DEFAULT_SCOPE: Record<ZaeuneType, number> = {
  zaeuneAluminium: 20,
  zaeuneHolz: 20,
  zaeuneGlas: 20,
  zaeuneMetall: 20,
  zaeuneDoppelstab: 20,
  zaeuneGabionen: 20,
  zaeuneSichtschutz: 20,
  zaeuneMaschendraht: 20,
  zaeuneSteck: 20,
  zaeuneVorgarten: 20,
  zaeuneSichtschutzstreifen: 20
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
