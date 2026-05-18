import {
  AREA_OPTIONS,
  WOHNUNG_GEWERKE,
  WOHNUNG_TYPES,
  type WohnungType,
} from '../../data/wohnungSanierung';

type Props = {
  wohnungType: WohnungType;
  area: number;
  picked: string[];
  onWohnungTypeChange: (value: WohnungType) => void;
  onAreaChange: (value: number) => void;
  onToggleGewerk: (key: string) => void;
};

export default function WohnungSanierungBoard({
  wohnungType,
  area,
  picked,
  onWohnungTypeChange,
  onAreaChange,
  onToggleGewerk,
}: Props) {
  const selectedType = WOHNUNG_TYPES.find((t) => t.value === wohnungType);
  const multiLevel = selectedType?.multiLevel ?? false;

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
              onClick={() => onWohnungTypeChange(t.value)}
              aria-pressed={t.value === wohnungType}
            >
              <span className="haus-types__factor">× {t.factor.toFixed(2).replace('.', ',')}</span>
              <span className="haus-types__label">{t.label}</span>
              <span className="haus-types__detail">{t.detail}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="kalk-board__field reveal" data-delay="1">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">02</span>
          <span className="kalk-board__label">Fläche</span>
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
          <span className="kalk-board__label">Gewerke</span>
          <span className="kalk-board__counter">
            <em>{picked.length}</em> von {WOHNUNG_GEWERKE.length} gewählt
          </span>
        </div>
        <ul className="kalk-trades">
          {WOHNUNG_GEWERKE.map((g) => {
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
                  title={disabled ? 'Nur für Maisonette / mehrgeschossige Wohnungen' : undefined}
                >
                  <span className="kalk-trades__check" aria-hidden="true"></span>
                  <span className="kalk-trades__num">{g.num}</span>
                  <span className="kalk-trades__body">
                    <span className="kalk-trades__name">{g.label}</span>
                    <span className="kalk-trades__lead">{g.lede}</span>
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
