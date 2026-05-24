import { scrollToCalculatorResult } from '../../utils/scrollToCalculatorResult';

export type TrockenbauType =
  | 'trockenbauAlles'
  | 'trockenbauDecken'
  | 'trockenbauWaendeStellen'
  | 'trockenbauWaendeVerkleiden'
  | 'trockenbauEstrich'
  | 'trockenbauDachschraegen';

type VariantDefinition = {
  value: TrockenbauType;
  label: string;
  detail: string;
  num: string;
};

const TYPES: VariantDefinition[] = [
  { value: 'trockenbauAlles', label: 'Alles zu Trockenbau', detail: 'Alle Varianten', num: '01' },
  { value: 'trockenbauDecken', label: 'Decken abhängen', detail: 'Decken', num: '02' },
  { value: 'trockenbauWaendeStellen', label: 'Wände stellen', detail: 'Ständerwerk', num: '03' },
  { value: 'trockenbauWaendeVerkleiden', label: 'Wände verkleiden', detail: 'Beplankung', num: '04' },
  { value: 'trockenbauEstrich', label: 'Estrich/Boden', detail: 'Trockenbau', num: '05' },
  { value: 'trockenbauDachschraegen', label: 'Dachschrägen', detail: 'Ausbau', num: '06' },
];

type Props = {
  activeType: TrockenbauType;
  onTypeChange: (value: TrockenbauType) => void;
};

export default function TrockenbauBoard({
  activeType,
  onTypeChange,
}: Props) {
  function chooseType(value: TrockenbauType) {
    onTypeChange(value);
    scrollToCalculatorResult();
  }

  return (
    <div className="kalk-board">
      <div className="kalk-board__field reveal">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">01</span>
          <span className="kalk-board__label">Trockenbauleistung</span>
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
