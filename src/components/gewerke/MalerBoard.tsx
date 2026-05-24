import { scrollToCalculatorResult } from '../../utils/scrollToCalculatorResult';

export type MalerType =
  | 'malerAlles'
  | 'malerAnstrich'
  | 'malerGlaettenAnstrich'
  | 'malerTapezieren'
  | 'malerDeckenLackierung'
  | 'malerHeizkoerperLackierung'
  | 'malerFensterLackierung'
  | 'malerTuerenLackierung'
  | 'malerTreppenGelaenderLackierung'
  | 'malerFassadenAnstrich';

type VariantDefinition = {
  value: MalerType;
  label: string;
  detail: string;
  num: string;
};

const TYPES: VariantDefinition[] = [
  { value: 'malerAlles', label: 'Alles zu Maler', detail: 'Alle Varianten', num: '01' },
  { value: 'malerAnstrich', label: 'Anstrich', detail: 'Wandflächen', num: '02' },
  { value: 'malerGlaettenAnstrich', label: 'Glätten & Anstrich', detail: 'Wände', num: '03' },
  { value: 'malerTapezieren', label: 'Tapezieren', detail: 'Wandflächen', num: '04' },
  { value: 'malerDeckenLackierung', label: 'Holzdecken', detail: 'Lackierung', num: '05' },
  { value: 'malerHeizkoerperLackierung', label: 'Heizkörper', detail: 'Lackierung', num: '06' },
  { value: 'malerFensterLackierung', label: 'Fenster', detail: 'Lackierung', num: '07' },
  { value: 'malerTuerenLackierung', label: 'Türen', detail: 'Lackierung', num: '08' },
  { value: 'malerTreppenGelaenderLackierung', label: 'Treppen/Geländer', detail: 'Lackierung', num: '09' },
  { value: 'malerFassadenAnstrich', label: 'Fassadenanstrich', detail: 'Außenflächen', num: '10' },
];

type Props = {
  activeType: MalerType;
  onTypeChange: (value: MalerType) => void;
};

export default function MalerBoard({
  activeType,
  onTypeChange,
}: Props) {
  function chooseType(value: MalerType) {
    onTypeChange(value);
    scrollToCalculatorResult();
  }

  return (
    <div className="kalk-board">
      <div className="kalk-board__field reveal">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">01</span>
          <span className="kalk-board__label">Malerleistung</span>
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
