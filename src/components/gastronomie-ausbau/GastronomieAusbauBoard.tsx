import { Trans, useTranslation } from 'react-i18next';
import {
  AREA_OPTIONS,
  GASTRONOMIE_GEWERKE,
  GASTRONOMIE_TYPES,
  type GastronomieType,
} from '../../data/gastronomieAusbau';
import { scrollToCalculatorResult } from '../../utils/scrollToCalculatorResult';

type Props = {
  gastronomieType: GastronomieType;
  area: number;
  picked: string[];
  onGastronomieTypeChange: (value: GastronomieType) => void;
  onAreaChange: (value: number) => void;
  onToggleGewerk: (key: string) => void;
};

export default function GastronomieAusbauBoard({
  gastronomieType,
  area,
  picked,
  onGastronomieTypeChange,
  onAreaChange,
  onToggleGewerk,
}: Props) {
  const { t } = useTranslation('kalk');
  const selectedType = GASTRONOMIE_TYPES.find((type) => type.value === gastronomieType);
  const multiLevel = selectedType?.multiLevel ?? false;

  function chooseGastronomieType(value: GastronomieType) {
    onGastronomieTypeChange(value);
    scrollToCalculatorResult();
  }

  return (
    <div className="kalk-board">
      <div className="kalk-board__field reveal">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">01</span>
          <span className="kalk-board__label">{t('board.gastroType')}</span>
          <span className="kalk-board__hint">{t('board.gastroTypeHint')}</span>
        </div>
        <div className="haus-types">
          {GASTRONOMIE_TYPES.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`haus-types__opt${option.value === gastronomieType ? ' is-on' : ''}`}
              onClick={() => chooseGastronomieType(option.value)}
              aria-pressed={option.value === gastronomieType}
            >
              <span className="haus-types__factor">× {option.factor.toFixed(2).replace('.', ',')}</span>
              <span className="haus-types__label">{t(`gastro.types.${option.value}.label`, { defaultValue: option.label })}</span>
              <span className="haus-types__detail">{t(`gastro.types.${option.value}.detail`, { defaultValue: option.detail })}</span>
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
          {AREA_OPTIONS.map((a) => (
            <button
              key={a.value}
              type="button"
              className={`kalk-chip${a.value === area ? ' is-on' : ''}`}
              onClick={() => onAreaChange(a.value)}
              aria-pressed={a.value === area}
            >
              {a.label}
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
              values={{ count: picked.length, total: GASTRONOMIE_GEWERKE.length }}
              components={{ em: <em /> }}
            />
          </span>
        </div>
        <ul className="kalk-trades">
          {GASTRONOMIE_GEWERKE.map((g) => {
            const on = picked.includes(g.key);
            const disabled = g.multiLevelOnly && !multiLevel;
            return (
              <li key={g.key} className={`kalk-trades__item${on ? ' is-on' : ''}${disabled ? ' is-disabled' : ''}`}>
                <button
                  type="button"
                  onClick={() => !disabled && onToggleGewerk(g.key)}
                  aria-pressed={on}
                  aria-disabled={disabled}
                  disabled={disabled}
                  title={disabled ? t('board.multiLevelOnly') : undefined}
                >
                  <span className="kalk-trades__check" aria-hidden="true"></span>
                  <span className="kalk-trades__num">{g.num}</span>
                  <span className="kalk-trades__body">
                    <span className="kalk-trades__name">{t(`gastro.gewerke.${g.key}.label`, { defaultValue: g.label })}</span>
                    <span className="kalk-trades__lead">{t(`gastro.gewerke.${g.key}.lede`, { defaultValue: g.lede })}</span>
                  </span>
                  <span className="kalk-trades__price">€ {g.pricePerM2}<small>/m²</small></span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
