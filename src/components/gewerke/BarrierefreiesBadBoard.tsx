import { scrollToCalculatorResult } from '../../utils/scrollToCalculatorResult';

export type BarrierefreiType = 'barrierefreiDusche' | 'barrierefreiWc' | 'barrierefreiSenioren' | 'barrierefreiRollstuhl';

type VariantDefinition = {
  value: BarrierefreiType;
  label: string;
  detail: string;
  num: string;
};

const BARRIEREFREI_TYPES: VariantDefinition[] = [
  { value: 'barrierefreiDusche', label: 'Ebenerdige Dusche', detail: 'Umbau zur bodengleichen Dusche', num: '01' },
  { value: 'barrierefreiWc', label: 'WC & Waschtisch', detail: 'Unterfahrbar & rollstuhlgerecht', num: '02' },
  { value: 'barrierefreiSenioren', label: 'Seniorengerechtes Bad', detail: 'Rutschfest, Griffe & Teilsanierung', num: '03' },
  { value: 'barrierefreiRollstuhl', label: 'Rollstuhlgerecht', komplettesBad: true, detail: 'Komplettumbau nach DIN 18040-2', num: '04' } as VariantDefinition & { komplettesBad: boolean },
];

type Props = {
  activeType: BarrierefreiType;
  onTypeChange: (value: BarrierefreiType) => void;
};

export default function BarrierefreiesBadBoard({
  activeType,
  onTypeChange,
}: Props) {
  function chooseType(value: BarrierefreiType) {
    onTypeChange(value);
    scrollToCalculatorResult();
  }

  return (
    <div className="kalk-board">
      <div className="kalk-board__field reveal">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">01</span>
          <span className="kalk-board__label">Anforderung</span>
          <span className="kalk-board__hint">Wählen Sie das gewünschte Konzept</span>
        </div>
        <div className="haus-types">
          {BARRIEREFREI_TYPES.map((t) => (
            <button
              key={t.num}
              type="button"
              className={`haus-types__opt${t.value === activeType ? ' is-on' : ''}`}
              onClick={() => chooseType(t.value)}
              aria-pressed={t.value === activeType}
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
