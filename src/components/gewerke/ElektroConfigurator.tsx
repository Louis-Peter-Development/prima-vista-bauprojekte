import { useState } from 'react';
import RenovationCalculator from '../renovation-calculator/RenovationCalculator';
import ElektroBoard, { type ElektroType } from './ElektroBoard';

const DEFAULT_SCOPE: Record<ElektroType, number> = {
  elektroAlles: 5,
  elektroNeuinstallation: 1,
  elektroSicherungskasten: 1,
  elektroNetzwerk: 50,
  elektroEinzelinstallation: 1,
  elektroLichttechnik: 3,
  elektroFreeHome: 1,
  elektroRolladen: 3,
  elektroSprechanlagen: 1,
};

export default function ElektroConfigurator() {
  const [activeType, setActiveType] = useState<ElektroType>('elektroAlles');
  const [scope, setScope] = useState<number>(DEFAULT_SCOPE.elektroAlles);

  const handleTypeChange = (type: ElektroType) => {
    setActiveType(type);
    setScope(DEFAULT_SCOPE[type]);
  };

  const getLabel = (type: ElektroType) => {
    switch (type) {
      case 'elektroAlles': return 'Alles zu Elektroinstallation';
      case 'elektroNeuinstallation': return 'Neuinstallation pro Etage';
      case 'elektroSicherungskasten': return 'Sicherungskasten';
      case 'elektroNetzwerk': return 'Netzwerk & Bus';
      case 'elektroEinzelinstallation': return 'Einzelinstallation';
      case 'elektroLichttechnik': return 'Lichttechnik & Beleuchtung';
      case 'elektroFreeHome': return 'Free Home';
      case 'elektroRolladen': return 'Rolladen-Steuerung';
      case 'elektroSprechanlagen': return 'Sprechanlagen';
      default: return 'Elektroinstallation';
    }
  };

  const getAreaLabel = (type: ElektroType) => {
    switch (type) {
      case 'elektroNeuinstallation':
      case 'elektroSicherungskasten':
        return 'Anzahl Etagen (Stk.)';
      case 'elektroNetzwerk':
        return 'Netzwerkfläche in m²';
      case 'elektroEinzelinstallation':
        return 'Anzahl Zuleitungen/Elemente (Stk.)';
      case 'elektroLichttechnik':
        return 'Anzahl Lichtpunkte (Stk.)';
      case 'elektroRolladen':
        return 'Anzahl Rolläden (Stk.)';
      case 'elektroSprechanlagen':
        return 'Anzahl Anlagen (Stk.)';
      case 'elektroFreeHome':
        return 'Smart-Home Umfang (Stk.)';
      default:
        return 'Elektro-Umfang (Stk.)';
    }
  };

  return (
    <div className="kalkulator__inner kalkulator__inner--stack">
      <ElektroBoard
        activeType={activeType}
        onTypeChange={handleTypeChange}
      />
      <RenovationCalculator
        packageId={activeType}
        embedded
        livingArea={scope}
        onLivingAreaChange={setScope}
        kindLabel={getLabel(activeType)}
        customAreaLabel={getAreaLabel(activeType)}
      />
    </div>
  );
}
