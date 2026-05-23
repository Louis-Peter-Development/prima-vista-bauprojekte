import { useState } from 'react';
import RenovationCalculator from '../renovation-calculator/RenovationCalculator';
import BoedenBoard, { type BoedenGridType } from './BoedenBoard';

export default function BoedenConfigurator() {
  const [activeType, setActiveType] = useState<BoedenGridType>('boedenParkettVerlegung');
  const [area, setArea] = useState<number>(45);

  const getLabel = (type: BoedenGridType) => {
    switch (type) {
      case 'boedenParkettVerlegung': return 'Parkett Verlegung';
      case 'boedenLaminatVerlegung': return 'Laminat Verlegung';
      case 'boedenFliesenVerlegung': return 'Fliesen Verlegung';
      case 'boedenSockelleisten': return 'Sockelleisten Verlegung';
      case 'boedenParkettAufbereiten': return 'Parkett Aufbereiten';
      case 'boedenKorkboden': return 'Korkboden Verlegung';
      case 'boedenVinyl': return 'Vinyl / Linoleum Verlegung';
      case 'boedenEstrichplatten': return 'Estrichplatten Verlegung';
      case 'boedenSichtestrich': return 'Sichtestrich Verlegung';
      case 'boedenTeppich': return 'Teppich Verlegung';
      case 'boedenAlles': return 'Alles zu Böden';
      default: return 'Böden & Beläge';
    }
  };

  return (
    <div className="kalkulator__inner kalkulator__inner--stack">
      <BoedenBoard
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
