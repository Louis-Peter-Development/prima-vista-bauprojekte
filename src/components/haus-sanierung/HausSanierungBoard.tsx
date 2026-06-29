import { useTranslation } from 'react-i18next';
import {
  HOUSE_TYPES,
  type HouseType,
} from '../../data/hausSanierung';
import { scrollToCalculatorResult } from '../../utils/scrollToCalculatorResult';

type Props = {
  houseType: HouseType;
  onHouseTypeChange: (value: HouseType) => void;
};

export default function HausSanierungBoard({
  houseType,
  onHouseTypeChange,
}: Props) {
  const { t } = useTranslation('kalk');
  function chooseHouseType(value: HouseType) {
    onHouseTypeChange(value);
    scrollToCalculatorResult();
  }

  return (
    <div className="kalk-board">
      <div className="kalk-board__field reveal">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">01</span>
          <span className="kalk-board__label">{t('board.houseType')}</span>
          <span className="kalk-board__hint">{t('board.houseTypeHint')}</span>
        </div>
        <div className="haus-types">
          {HOUSE_TYPES.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`haus-types__opt${option.value === houseType ? ' is-on' : ''}`}
              onClick={() => chooseHouseType(option.value)}
              aria-pressed={option.value === houseType}
            >
              <span className="haus-types__factor">× {option.factor.toFixed(2).replace('.', ',')}</span>
              <span className="haus-types__label">{t(`haus.types.${option.value}.label`, { defaultValue: option.label })}</span>
              <span className="haus-types__detail">{t(`haus.types.${option.value}.detail`, { defaultValue: option.detail })}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
