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
  function chooseWohnungType(value: WohnungType) {
    onWohnungTypeChange(value);
    scrollToCalculatorResult();
  }

  return (
    <div className="kalk-board">
      <div className="kalk-board__field reveal">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">01</span>
          <span className="kalk-board__label">Wohnungstyp</span>
          <span className="kalk-board__hint">Bestimmt Komplexität & Trennwände</span>
        </div>
        <div className="haus-types">
          {WOHNUNG_TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              className={`haus-types__opt${t.value === wohnungType ? ' is-on' : ''}`}
              onClick={() => chooseWohnungType(t.value)}
              aria-pressed={t.value === wohnungType}
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
