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
  const unit = t('reno.areaUnit');
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
        <div className="aptplan">
          {WOHNUNG_TYPES.map((option) => {
            const label = t(`wohnung.types.${option.value}.label`, { defaultValue: option.label });
            return (
              <button
                key={option.value}
                type="button"
                className={`aptplan__card${option.value === wohnungType ? ' is-on' : ''}`}
                onClick={() => chooseWohnungType(option.value)}
                aria-pressed={option.value === wohnungType}
                aria-label={t('board.floorplanAlt', { label })}
              >
                <img
                  className="aptplan__img"
                  src={option.floorplan}
                  alt=""
                  width="640"
                  height="340"
                  loading="lazy"
                />
                <span className="aptplan__cap">
                  <span className="aptplan__area">{option.defaultArea} {unit}</span>
                  <span className="aptplan__label">{t('board.livingArea')}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
