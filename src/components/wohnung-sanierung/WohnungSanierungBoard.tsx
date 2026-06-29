import { useTranslation } from 'react-i18next';
import {
  WOHNUNG_TYPES,
  type WohnungType,
} from '../../data/wohnungSanierung';
import { scrollToCalculatorResult } from '../../utils/scrollToCalculatorResult';

type Props = {
  wohnungType: WohnungType;
  onWohnungTypeChange: (value: WohnungType) => void;
};

export default function WohnungSanierungBoard({
  wohnungType,
  onWohnungTypeChange,
}: Props) {
  const { t } = useTranslation('kalk');
  function chooseWohnungType(value: WohnungType) {
    onWohnungTypeChange(value);
    scrollToCalculatorResult();
  }

  return (
    <div className="kalk-board">
      <div className="kalk-board__field reveal">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">01</span>
          <span className="kalk-board__label">{t('board.wohnungType')}</span>
          <span className="kalk-board__hint">{t('board.wohnungTypeHint')}</span>
        </div>
        <div className="haus-types">
          {WOHNUNG_TYPES.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`haus-types__opt${option.value === wohnungType ? ' is-on' : ''}`}
              onClick={() => chooseWohnungType(option.value)}
              aria-pressed={option.value === wohnungType}
            >
              <span className="haus-types__factor">× {option.factor.toFixed(2).replace('.', ',')}</span>
              <span className="haus-types__label">{t(`wohnung.types.${option.value}.label`, { defaultValue: option.label })}</span>
              <span className="haus-types__detail">{t(`wohnung.types.${option.value}.detail`, { defaultValue: option.detail })}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
