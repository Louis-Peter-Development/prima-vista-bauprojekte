import { scrollToCalculatorResult } from '../../utils/scrollToCalculatorResult';

export type FensterType =
  | 'fensterAlles'
  | 'fensterKunststoff'
  | 'fensterHolz'
  | 'fensterAluminium'
  | 'fensterFensterlaeden'
  | 'fensterRolladen'
  | 'fensterDachfenster'
  | 'fensterBalkontueren'
  | 'fensterCarportGaragentore'
  | 'fensterFensterLackierung'
  | 'fensterMarkisen';

type VariantDefinition = {
  value: FensterType;
  label: string;
  detail: string;
  num: string;
};

const TYPES: VariantDefinition[] = [
  { value: 'fensterAlles', label: 'Alles zu Fenster', detail: 'Alle Varianten', num: '01' },
  { value: 'fensterKunststoff', label: 'Kunststofffenster', detail: 'Montage', num: '02' },
  { value: 'fensterHolz', label: 'Holzfenster', detail: 'Montage', num: '03' },
  { value: 'fensterAluminium', label: 'Aluminiumfenster', detail: 'Montage', num: '04' },
  { value: 'fensterFensterlaeden', label: 'Fensterläden', detail: 'Montage', num: '05' },
  { value: 'fensterRolladen', label: 'Rollladen', detail: 'Montage', num: '06' },
  { value: 'fensterDachfenster', label: 'Dachfenster', detail: 'Montage', num: '07' },
  { value: 'fensterBalkontueren', label: 'Balkontüren', detail: 'Montage', num: '08' },
  { value: 'fensterCarportGaragentore', label: 'Garagentore', detail: 'Carport', num: '09' },
  { value: 'fensterFensterLackierung', label: 'Fensterlackierung', detail: 'Maler', num: '10' },
  { value: 'fensterMarkisen', label: 'Markisen', detail: 'Montage', num: '11' },
];

type Props = {
  activeType: FensterType;
  onTypeChange: (value: FensterType) => void;
};

export default function FensterBoard({
  activeType,
  onTypeChange,
}: Props) {
  function chooseType(value: FensterType) {
    onTypeChange(value);
    scrollToCalculatorResult();
  }

  return (
    <div className="kalk-board">
      <div className="kalk-board__field reveal">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">01</span>
          <span className="kalk-board__label">Fensterleistung</span>
          <span className="kalk-board__hint">Wählen Sie den gewünschten Kalkulator</span>
        </div>
        <div className="haus-types" style={{ flexWrap: 'wrap', gap: '12px' }}>
          {TYPES.map((type) => (
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
