import { scrollToCalculatorResult } from '../../utils/scrollToCalculatorResult';

export type BoedenGridType = 
  | 'boedenParkettVerlegung'
  | 'boedenLaminatVerlegung'
  | 'boedenFliesenVerlegung'
  | 'boedenSockelleisten'
  | 'boedenParkettAufbereiten'
  | 'boedenKorkboden'
  | 'boedenVinyl'
  | 'boedenEstrichplatten'
  | 'boedenSichtestrich'
  | 'boedenTeppich'
  | 'boedenAlles';

type VariantDefinition = {
  value: BoedenGridType;
  label: string;
  detail: string;
  num: string;
};

const BOEDEN_TYPES: VariantDefinition[] = [
  { value: 'boedenParkettVerlegung', label: 'Parkett', detail: 'Verlegung', num: '01' },
  { value: 'boedenLaminatVerlegung', label: 'Laminat', detail: 'Verlegung', num: '02' },
  { value: 'boedenFliesenVerlegung', label: 'Fliesen', detail: 'Verlegung', num: '03' },
  { value: 'boedenSockelleisten', label: 'Sockelleisten', detail: 'Verlegung', num: '04' },
  { value: 'boedenParkettAufbereiten', label: 'Parkett', detail: 'Aufbereiten', num: '05' },
  { value: 'boedenKorkboden', label: 'Korkboden', detail: 'Verlegung', num: '06' },
  { value: 'boedenVinyl', label: 'Vinyl o. Linoleum', detail: 'Verlegung', num: '07' },
  { value: 'boedenEstrichplatten', label: 'Estrichplatten', detail: 'Verlegung', num: '08' },
  { value: 'boedenSichtestrich', label: 'Sichtestrich', detail: 'Verlegung', num: '09' },
  { value: 'boedenTeppich', label: 'Teppich', detail: 'Verlegung', num: '10' },
  { value: 'boedenAlles', label: 'Alles zu Böden', detail: 'Pauschal', num: '11' },
];

type Props = {
  activeType: BoedenGridType;
  onTypeChange: (value: BoedenGridType) => void;
};

export default function BoedenBoard({
  activeType,
  onTypeChange,
}: Props) {
  function chooseType(value: BoedenGridType) {
    onTypeChange(value);
    scrollToCalculatorResult();
  }

  return (
    <div className="kalk-board">
      <div className="kalk-board__field reveal">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">01</span>
          <span className="kalk-board__label">Belagsart</span>
          <span className="kalk-board__hint">Wählen Sie den gewünschten Kalkulator</span>
        </div>
        <div className="haus-types" style={{ flexWrap: 'wrap', gap: '12px' }}>
          {BOEDEN_TYPES.map((t) => (
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
