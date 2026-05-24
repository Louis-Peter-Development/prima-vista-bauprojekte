import { scrollToCalculatorResult } from '../../utils/scrollToCalculatorResult';

export type FassadeType =
  | 'fassadeAlles'
  | 'fassadeDaemmung'
  | 'fassadeAnstrich'
  | 'fassadeHolzverkleidung'
  | 'fassadeSockeldaemmung'
  | 'fassadeKlinkerSteinriemchen'
  | 'fassadePlattenverkleidung'
  | 'fassadeNatursteinverkleidung'
  | 'fassadeVorhangfassade'
  | 'fassadeVerblendmauerwerk';

type VariantDefinition = {
  value: FassadeType;
  label: string;
  detail: string;
  num: string;
};

const TYPES: VariantDefinition[] = [
  { value: 'fassadeAlles', label: 'Alles zu Fassade', detail: 'Alle Varianten', num: '01' },
  { value: 'fassadeDaemmung', label: 'Dämmung & Anstrich', detail: 'WDVS', num: '02' },
  { value: 'fassadeAnstrich', label: 'Anstrich', detail: 'Fassade', num: '03' },
  { value: 'fassadeHolzverkleidung', label: 'Holzverkleidung', detail: 'Fassade', num: '04' },
  { value: 'fassadeSockeldaemmung', label: 'Sockeldämmung', detail: 'Sockel', num: '05' },
  { value: 'fassadeKlinkerSteinriemchen', label: 'Klinkerriemchen', detail: 'Verkleidung', num: '06' },
  { value: 'fassadePlattenverkleidung', label: 'Plattenverkleidung', detail: 'Fassade', num: '07' },
  { value: 'fassadeNatursteinverkleidung', label: 'Naturstein', detail: 'Verkleidung', num: '08' },
  { value: 'fassadeVorhangfassade', label: 'Vorhangfassade', detail: 'Fassade', num: '09' },
  { value: 'fassadeVerblendmauerwerk', label: 'Verblendmauerwerk', detail: 'Fassade', num: '10' },
];

type Props = {
  activeType: FassadeType;
  onTypeChange: (value: FassadeType) => void;
};

export default function FassadeBoard({
  activeType,
  onTypeChange,
}: Props) {
  function chooseType(value: FassadeType) {
    onTypeChange(value);
    scrollToCalculatorResult();
  }

  return (
    <div className="kalk-board">
      <div className="kalk-board__field reveal">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">01</span>
          <span className="kalk-board__label">Fassadenleistung</span>
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
