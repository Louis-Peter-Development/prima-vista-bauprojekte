import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('kalk');
  function chooseType(value: BarrierefreiType) {
    onTypeChange(value);
    scrollToCalculatorResult();
  }

  return (
    <div className="kalk-board">
      <div className="kalk-board__field reveal">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">01</span>
          <span className="kalk-board__label">{t('gw.barrierefrei.field')}</span>
          <span className="kalk-board__hint">{t('gw.barrierefrei.hint')}</span>
        </div>
        <div className="haus-types">
          {BARRIEREFREI_TYPES.map((option) => (
            <button
              key={option.num}
              type="button"
              className={`haus-types__opt${option.value === activeType ? ' is-on' : ''}`}
              onClick={() => chooseType(option.value)}
              aria-pressed={option.value === activeType}
            >
              <span className="haus-types__label">{t(`gw.barrierefrei.types.${option.value}.label`, { defaultValue: option.label })}</span>
              <span className="haus-types__detail" style={{ fontSize: '13px', lineHeight: '1.4' }}>{t(`gw.barrierefrei.types.${option.value}.detail`, { defaultValue: option.detail })}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
