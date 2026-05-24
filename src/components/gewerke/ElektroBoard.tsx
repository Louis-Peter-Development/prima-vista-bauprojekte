import { scrollToCalculatorResult } from '../../utils/scrollToCalculatorResult';

export type ElektroType =
  | 'elektroAlles'
  | 'elektroNeuinstallation'
  | 'elektroSicherungskasten'
  | 'elektroNetzwerk'
  | 'elektroEinzelinstallation'
  | 'elektroLichttechnik'
  | 'elektroFreeHome'
  | 'elektroRolladen'
  | 'elektroSprechanlagen';

type VariantDefinition = {
  value: ElektroType;
  label: string;
  detail: string;
  num: string;
};

const ELEKTRO_TYPES: VariantDefinition[] = [
  { value: 'elektroAlles', label: 'Alles zu Elektro', detail: 'Komplettpaket', num: '01' },
  { value: 'elektroNeuinstallation', label: 'Neuinstallation', detail: 'Pro Etage', num: '02' },
  { value: 'elektroSicherungskasten', label: 'Sicherungskasten', detail: 'Verteilung', num: '03' },
  { value: 'elektroNetzwerk', label: 'Netzwerk & Bus', detail: 'Daten & KNX', num: '04' },
  { value: 'elektroEinzelinstallation', label: 'Einzelinstallation', detail: 'Zuleitung & Element', num: '05' },
  { value: 'elektroLichttechnik', label: 'Lichttechnik', detail: 'Beleuchtung', num: '06' },
  { value: 'elektroFreeHome', label: 'Free Home', detail: 'Smart Home', num: '07' },
  { value: 'elektroRolladen', label: 'Rolladen-Steuerung', detail: 'Beschattung', num: '08' },
  { value: 'elektroSprechanlagen', label: 'Sprechanlagen', detail: 'Türkommunikation', num: '09' },
];

type Props = {
  activeType: ElektroType;
  onTypeChange: (value: ElektroType) => void;
};

export default function ElektroBoard({
  activeType,
  onTypeChange,
}: Props) {
  function chooseType(value: ElektroType) {
    onTypeChange(value);
    scrollToCalculatorResult();
  }

  return (
    <div className="kalk-board">
      <div className="kalk-board__field reveal">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">01</span>
          <span className="kalk-board__label">Elektroleistung</span>
          <span className="kalk-board__hint">Wählen Sie den gewünschten Kalkulator</span>
        </div>
        <div className="haus-types" style={{ flexWrap: 'wrap', gap: '12px' }}>
          {ELEKTRO_TYPES.map((type) => (
            <button
              key={type.num}
              type="button"
              className={`haus-types__opt${type.value === activeType ? ' is-on' : ''}`}
              onClick={() => chooseType(type.value)}
              aria-pressed={type.value === activeType}
              style={{ flex: '1 1 calc(33.333% - 12px)', minWidth: '180px' }}
            >
              <span className="haus-types__label">{type.label}</span>
              <span className="haus-types__detail" style={{ fontSize: '13px', lineHeight: '1.4' }}>{type.detail}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
