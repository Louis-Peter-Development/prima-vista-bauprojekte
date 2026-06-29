import { Trans, useTranslation } from 'react-i18next';
import {
  AREA_OPTIONS,
  BUERO_GEWERKE,
  BUERO_TYPES,
  type BueroType,
} from '../../data/bueroAusbau';
import { scrollToCalculatorResult } from '../../utils/scrollToCalculatorResult';

type Props = {
  bueroType: BueroType;
  area: number;
  picked: string[];
  onBueroTypeChange: (value: BueroType) => void;
  onAreaChange: (value: number) => void;
  onToggleGewerk: (key: string) => void;
};

export default function BueroAusbauBoard({
  bueroType,
  area,
  picked,
  onBueroTypeChange,
  onAreaChange,
  onToggleGewerk,
}: Props) {
  const { t } = useTranslation('kalk');
  function chooseBueroType(value: BueroType) {
    onBueroTypeChange(value);
    scrollToCalculatorResult();
  }

  return (
    <div className="kalk-board">
      <div className="kalk-board__field reveal">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">01</span>
          <span className="kalk-board__label">{t('board.bueroType')}</span>
          <span className="kalk-board__hint">{t('board.bueroTypeHint')}</span>
        </div>
        <div className="haus-types">
          {BUERO_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              className={`haus-types__opt${type.value === bueroType ? ' is-on' : ''}`}
              onClick={() => chooseBueroType(type.value)}
              aria-pressed={type.value === bueroType}
            >
              <span className="haus-types__factor">× {type.factor.toFixed(2).replace('.', ',')}</span>
              <span className="haus-types__label">{t(`buero.types.${type.value}.label`, { defaultValue: type.label })}</span>
              <span className="haus-types__detail">{t(`buero.types.${type.value}.detail`, { defaultValue: type.detail })}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="kalk-board__field reveal" data-delay="1">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">02</span>
          <span className="kalk-board__label">{t('board.area')}</span>
          <span className="kalk-board__value-large">
            {area}<small>m²</small>
          </span>
        </div>
        <div className="kalk-chips kalk-chips--equal">
          {AREA_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`kalk-chip${option.value === area ? ' is-on' : ''}`}
              onClick={() => onAreaChange(option.value)}
              aria-pressed={option.value === area}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="kalk-board__field reveal">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">03</span>
          <span className="kalk-board__label">{t('board.gewerke')}</span>
          <span className="kalk-board__counter">
            <Trans
              i18nKey="kalk:board.gewerkeCount"
              values={{ count: picked.length, total: BUERO_GEWERKE.length }}
              components={{ em: <em /> }}
            />
          </span>
        </div>
        <ul className="kalk-trades">
          {BUERO_GEWERKE.map((gewerk) => {
            const on = picked.includes(gewerk.key);
            return (
              <li key={gewerk.key} className={`kalk-trades__item${on ? ' is-on' : ''}`}>
                <button
                  type="button"
                  onClick={() => onToggleGewerk(gewerk.key)}
                  aria-pressed={on}
                >
                  <span className="kalk-trades__check" aria-hidden="true"></span>
                  <span className="kalk-trades__num">{gewerk.num}</span>
                  <span className="kalk-trades__body">
                    <span className="kalk-trades__name">{t(`buero.gewerke.${gewerk.key}.label`, { defaultValue: gewerk.label })}</span>
                    <span className="kalk-trades__lead">{t(`buero.gewerke.${gewerk.key}.lede`, { defaultValue: gewerk.lede })}</span>
                  </span>
                  <span className="kalk-trades__price">€ {gewerk.pricePerM2}<small>/m²</small></span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
