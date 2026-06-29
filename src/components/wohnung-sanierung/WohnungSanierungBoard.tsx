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
  const selected = WOHNUNG_TYPES.find((option) => option.value === wohnungType) ?? WOHNUNG_TYPES[0];
  const selectedLabel = t(`wohnung.types.${selected.value}.label`, { defaultValue: selected.label });
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
        <figure className="kalk-board__floorplan">
          <img
            key={selected.value}
            src={selected.floorplan}
            alt={t('board.floorplanAlt', { label: selectedLabel })}
            width="1000"
            height="880"
            loading="lazy"
          />
          <figcaption>{t('board.floorplanCaption', { area: selected.defaultArea })}</figcaption>
        </figure>
      </div>
    </div>
  );
}
