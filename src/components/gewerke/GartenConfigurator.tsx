import { useState } from 'react';
import RenovationCalculator from '../renovation-calculator/RenovationCalculator';
import GartenBoard, { type GartenType } from './GartenBoard';

const DEFAULT_SCOPE: Record<GartenType, number> = {
  gartenAlles: 1,
  gartenBeleuchtung: 1,
  gartenBlockstufen: 1,
  gartenCarport: 1,
  gartenHochbeete: 1,
  gartenGartenhaus: 1,
  gartenGartenmauern: 1,
  gartenGeraetehaus: 1,
  gartenPavillon: 1,
  gartenTerrassenHolz: 20,
  gartenTerrassenStein: 20,
  gartenUeberdachung: 1,
  gartenWintergarten: 1,
  gartenZaunanlagen: 1,
  gartenWasserwirtschaft: 1
};

const LABELS: Record<GartenType, string> = {
  gartenAlles: 'Alles zu Garten',
  gartenBeleuchtung: 'Beleuchtung',
  gartenBlockstufen: 'Blockstufen',
  gartenCarport: 'Carport',
  gartenHochbeete: 'Hochbeete',
  gartenGartenhaus: 'Gartenhaus',
  gartenGartenmauern: 'Gartenmauern',
  gartenGeraetehaus: 'Gerätehaus',
  gartenPavillon: 'Pavillon',
  gartenTerrassenHolz: 'Terrasse Holz',
  gartenTerrassenStein: 'Terrasse Stein',
  gartenUeberdachung: 'Überdachung',
  gartenWintergarten: 'Wintergarten',
  gartenZaunanlagen: 'Zaunanlagen',
  gartenWasserwirtschaft: 'Wasserwirtschaft'
};

export default function GartenConfigurator() {
  const [activeType, setActiveType] = useState<GartenType>('gartenAlles');
  const [scope, setScope] = useState<number>(DEFAULT_SCOPE.gartenAlles);

  const handleTypeChange = (type: GartenType) => {
    setActiveType(type);
    setScope(DEFAULT_SCOPE[type]);
  };

  return (
    <div className="kalkulator__inner kalkulator__inner--stack">
      <GartenBoard
        activeType={activeType}
        onTypeChange={handleTypeChange}
      />
      <RenovationCalculator
        packageId={activeType}
        embedded
        livingArea={scope}
        onLivingAreaChange={setScope}
        kindLabel={LABELS[activeType]}
        customAreaLabel="Gartenumfang"
      />
    </div>
  );
}
