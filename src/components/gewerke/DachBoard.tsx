import { scrollToCalculatorResult } from '../../utils/scrollToCalculatorResult';

export type DachVariantType = 
  | 'dachAlles'
  | 'dachNeubedachung'
  | 'dachDachstuhl'
  | 'dachInnenausbau'
  | 'dachDaemmung'
  | 'dachGauben'
  | 'dachFenster'
  | 'dachanhebung'
  | 'flachdach'
  | 'dachbodenDaemmung';

type VariantDefinition = {
  value: DachVariantType;
  label: string;
  detail: string;
  num: string;
};

const DACH_TYPES: VariantDefinition[] = [
  { value: 'dachAlles', label: 'Alles zu Dachsanierung', detail: 'Komplettdach', num: '01' },
  { value: 'dachNeubedachung', label: 'Neubedachung', detail: 'Dacheindeckung', num: '02' },
  { value: 'dachDachstuhl', label: 'Dachstuhl', detail: 'Konstruktion', num: '03' },
  { value: 'dachInnenausbau', label: 'Dach-Innenausbau', detail: 'Dachraum', num: '04' },
  { value: 'dachDaemmung', label: 'Dachdämmung', detail: 'Energieeffizienz', num: '05' },
  { value: 'dachGauben', label: 'Gauben', detail: 'Mehr Raum', num: '06' },
  { value: 'dachFenster', label: 'Dachfenster', detail: 'Belichtung', num: '07' },
  { value: 'dachanhebung', label: 'Dachanhebung hydraulisch', detail: 'Aufstockung', num: '08' },
  { value: 'flachdach', label: 'Flachdach-Beschichtung', detail: 'Flachdach', num: '09' },
  { value: 'dachbodenDaemmung', label: 'Dachboden-Dämmung', detail: 'Geschossdecke', num: '10' },
];

type Props = {
  activeType: DachVariantType;
  onTypeChange: (value: DachVariantType) => void;
};

export default function DachBoard({
  activeType,
  onTypeChange,
}: Props) {
  function chooseType(value: DachVariantType) {
    onTypeChange(value);
    scrollToCalculatorResult();
  }

  return (
    <div className="kalk-board">
      <div className="kalk-board__field reveal">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">01</span>
          <span className="kalk-board__label">Dachvariante</span>
          <span className="kalk-board__hint">Wählen Sie den gewünschten Kalkulator</span>
        </div>
        <div className="haus-types" style={{ flexWrap: 'wrap', gap: '12px' }}>
          {DACH_TYPES.map((t) => (
            <button
              key={t.num}
              type="button"
              className={`haus-types__opt${t.value === activeType ? ' is-on' : ''}`}
              onClick={() => chooseType(t.value)}
              aria-pressed={t.value === activeType}
              style={{ flex: '1 1 calc(33.333% - 12px)', minWidth: '180px' }}
            >
              <span className="haus-types__label">{t.label}</span>
              <span className="haus-types__detail" style={{ fontSize: '13px', lineHeight: '1.4' }}>{t.detail}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
