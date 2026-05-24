import { scrollToCalculatorResult } from '../../utils/scrollToCalculatorResult';

export type TuerenType =
  | 'tuerenAlles'
  | 'tuerenZimmertueren'
  | 'tuerenSchiebetueren'
  | 'tuerenGlastueren'
  | 'tuerenBalkonTerrassen'
  | 'tuerenHaustueren'
  | 'tuerenKellertueren'
  | 'tuerenGaragentore'
  | 'tuerenToreEinfahrt';

type VariantDefinition = {
  value: TuerenType;
  label: string;
  detail: string;
  num: string;
};

const TYPES: VariantDefinition[] = [
  { value: 'tuerenAlles', label: 'Alles zu Türen', detail: 'Alle Varianten', num: '01' },
  { value: 'tuerenZimmertueren', label: 'Zimmertüren', detail: 'Montage', num: '02' },
  { value: 'tuerenSchiebetueren', label: 'Schiebetüren', detail: 'Montage', num: '03' },
  { value: 'tuerenGlastueren', label: 'Glastüren', detail: 'Montage', num: '04' },
  { value: 'tuerenBalkonTerrassen', label: 'Balkon/Terrasse', detail: 'Türen', num: '05' },
  { value: 'tuerenHaustueren', label: 'Haustüren', detail: 'Montage', num: '06' },
  { value: 'tuerenKellertueren', label: 'Kellertüren', detail: 'Montage', num: '07' },
  { value: 'tuerenGaragentore', label: 'Garagentore', detail: 'Montage', num: '08' },
  { value: 'tuerenToreEinfahrt', label: 'Tore/Einfahrt', detail: 'Montage', num: '09' },
];

type Props = {
  activeType: TuerenType;
  onTypeChange: (value: TuerenType) => void;
};

export default function TuerenBoard({
  activeType,
  onTypeChange,
}: Props) {
  function chooseType(value: TuerenType) {
    onTypeChange(value);
    scrollToCalculatorResult();
  }

  return (
    <div className="kalk-board">
      <div className="kalk-board__field reveal">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">01</span>
          <span className="kalk-board__label">Türleistung</span>
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
