import { scrollToCalculatorResult } from '../../utils/scrollToCalculatorResult';

export type TreppenType =
  | 'treppenAlles'
  | 'treppenHolztreppe'
  | 'treppenBetontreppe'
  | 'treppenDurchbruch'
  | 'treppenGelaender'
  | 'treppenAussentreppe'
  | 'treppenRaumspartreppe'
  | 'treppenDachbodentreppe'
  | 'treppenSpindeltreppe'
  | 'treppenAufbereiten'
  | 'treppenBelegung';

type VariantDefinition = {
  value: TreppenType;
  label: string;
  detail: string;
  num: string;
};

const TYPES: VariantDefinition[] = [
  { value: 'treppenAlles', label: 'Alles zu Treppen', detail: 'Alle Varianten', num: '01' },
  { value: 'treppenHolztreppe', label: 'Holztreppe', detail: 'Montage', num: '02' },
  { value: 'treppenBetontreppe', label: 'Betontreppe', detail: 'Montage', num: '03' },
  { value: 'treppenDurchbruch', label: 'Treppenauge', detail: 'Durchbruch', num: '04' },
  { value: 'treppenGelaender', label: 'Geländer', detail: 'Montage', num: '05' },
  { value: 'treppenAussentreppe', label: 'Außentreppe', detail: 'Montage', num: '06' },
  { value: 'treppenRaumspartreppe', label: 'Raumspartreppe', detail: 'Montage', num: '07' },
  { value: 'treppenDachbodentreppe', label: 'Dachbodentreppe', detail: 'Montage', num: '08' },
  { value: 'treppenSpindeltreppe', label: 'Spindeltreppe', detail: 'Montage', num: '09' },
  { value: 'treppenAufbereiten', label: 'Treppen aufbereiten', detail: 'Sanierung', num: '10' },
  { value: 'treppenBelegung', label: 'Treppenbelegung', detail: 'Belag', num: '11' },
];

type Props = {
  activeType: TreppenType;
  onTypeChange: (value: TreppenType) => void;
};

export default function TreppenBoard({
  activeType,
  onTypeChange,
}: Props) {
  function chooseType(value: TreppenType) {
    onTypeChange(value);
    scrollToCalculatorResult();
  }

  return (
    <div className="kalk-board">
      <div className="kalk-board__field reveal">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">01</span>
          <span className="kalk-board__label">Treppenleistung</span>
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
