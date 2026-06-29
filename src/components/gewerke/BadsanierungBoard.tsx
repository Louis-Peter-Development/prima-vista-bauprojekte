import { useTranslation } from 'react-i18next';
import { scrollToCalculatorResult } from '../../utils/scrollToCalculatorResult';

export type BadsanierungType =
  | 'badGaeste'
  | 'badKomplett'
  | 'badWanne'
  | 'badDusche'
  | 'badWhirlpool'
  | 'badWhirlpoolDusche'
  | 'badBarrierefrei';

type BadTypeDefinition = {
  value: BadsanierungType;
  label: string;
  detail: string;
  num: string;
};

const BAD_TYPES: BadTypeDefinition[] = [
  { value: 'badGaeste', label: 'Gäste-WC', detail: 'Alle Varianten', num: '01' },
  { value: 'badKomplett', label: 'Wanne & Dusche', detail: 'Komplettbad', num: '02' },
  { value: 'badWanne', label: 'Bad mit Wanne', detail: 'Nur mit Badewanne', num: '03' },
  { value: 'badDusche', label: 'Bad mit Dusche', detail: 'Nur mit Dusche', num: '04' },
  { value: 'badWhirlpool', label: 'Bad mit Whirlpool', detail: 'Nur mit Whirlpool', num: '05' },
  { value: 'badWhirlpoolDusche', label: 'Whirlpool & Dusche', detail: 'Luxus Komplettbad', num: '06' },
  { value: 'badBarrierefrei', label: 'Barrierefreies Bad', detail: 'Rollstuhlgerecht', num: '07' },
];

type Props = {
  activeType: BadsanierungType;
  onTypeChange: (value: BadsanierungType) => void;
};

export default function BadsanierungBoard({
  activeType,
  onTypeChange,
}: Props) {
  const { t } = useTranslation('kalk');
  function chooseType(value: BadsanierungType) {
    onTypeChange(value);
    scrollToCalculatorResult();
  }

  return (
    <div className="kalk-board">
      <div className="kalk-board__field reveal">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">01</span>
          <span className="kalk-board__label">{t('gw.bad.field')}</span>
          <span className="kalk-board__hint">{t('board.configHint')}</span>
        </div>
        <div className="haus-types" style={{ flexWrap: 'wrap', gap: '12px' }}>
          {BAD_TYPES.map((option) => (
            <button
              key={option.num}
              type="button"
              className={`haus-types__opt${option.value === activeType ? ' is-on' : ''}`}
              onClick={() => chooseType(option.value)}
              aria-pressed={option.value === activeType}
              style={{ flex: '1 1 calc(33.333% - 12px)', minWidth: '180px' }}
            >
              <span className="haus-types__label">{t(`gw.bad.types.${option.value}.label`, { defaultValue: option.label })}</span>
              <span className="haus-types__detail" style={{ fontSize: '13px', lineHeight: '1.4' }}>{t(`gw.bad.types.${option.value}.detail`, { defaultValue: option.detail })}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
