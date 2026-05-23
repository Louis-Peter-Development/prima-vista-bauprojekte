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
  function chooseHouseType(value: HouseType) {
    onHouseTypeChange(value);
    scrollToCalculatorResult();
  }

  return (
    <div className="kalk-board">
      <div className="kalk-board__field reveal">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">01</span>
          <span className="kalk-board__label">Haustyp</span>
          <span className="kalk-board__hint">Bestimmt Aufwand & Logistik</span>
        </div>
        <div className="haus-types">
          {HOUSE_TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              className={`haus-types__opt${t.value === houseType ? ' is-on' : ''}`}
              onClick={() => chooseHouseType(t.value)}
              aria-pressed={t.value === houseType}
            >
              <span className="haus-types__factor">× {t.factor.toFixed(2).replace('.', ',')}</span>
              <span className="haus-types__label">{t.label}</span>
              <span className="haus-types__detail">{t.detail}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
