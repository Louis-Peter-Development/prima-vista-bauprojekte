import { scrollToCalculatorResult } from '../../utils/scrollToCalculatorResult';

export type AbdichtungType = 'abdichtungHorizontal' | 'abdichtungPerimeter' | 'abdichtungKeller' | 'abdichtung';

type VariantDefinition = {
  value: AbdichtungType;
  label: string;
  detail: string;
  num: string;
};

const ABDICHTUNG_TYPES: VariantDefinition[] = [
  { value: 'abdichtung', label: 'Komplette Abdichtung', detail: 'Komplettpaket', num: '01' },
  { value: 'abdichtungHorizontal', label: 'Horizontal-Abdichtung', detail: 'Horizontalsperre', num: '02' },
  { value: 'abdichtungPerimeter', label: 'Perimeter-Abdichtung', detail: 'Außenabdichtung', num: '03' },
  { value: 'abdichtungKeller', label: 'Keller-Abdichtung (Innen)', detail: 'Innenabdichtung', num: '04' },
];

type Props = {
  activeType: AbdichtungType;
  onTypeChange: (value: AbdichtungType) => void;
};

export default function AbdichtungKellerBoard({
  activeType,
  onTypeChange,
}: Props) {
  function chooseType(value: AbdichtungType) {
    onTypeChange(value);
    scrollToCalculatorResult();
  }

  return (
    <div className="kalk-board">
      <div className="kalk-board__field reveal">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">01</span>
          <span className="kalk-board__label">Abdichtungssystem</span>
          <span className="kalk-board__hint">Wählen Sie Ihre Abdichtungsart</span>
        </div>
        <div className="haus-types" style={{ flexWrap: 'wrap', gap: '12px' }}>
          {ABDICHTUNG_TYPES.map((t) => (
            <button
              key={t.num}
              type="button"
              className={`haus-types__opt${t.value === activeType ? ' is-on' : ''}`}
              onClick={() => chooseType(t.value)}
              aria-pressed={t.value === activeType}
              style={{ flex: '1 1 calc(50% - 12px)', minWidth: '180px' }}
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
