import {
  AREA_OPTIONS,
  HAUS_GEWERKE,
  HOUSE_TYPES,
  type HouseType,
} from '../../data/hausSanierung';

type Props = {
  houseType: HouseType;
  area: number;
  picked: string[];
  onHouseTypeChange: (value: HouseType) => void;
  onAreaChange: (value: number) => void;
  onToggleGewerk: (key: string) => void;
};

export default function HausSanierungBoard({
  houseType,
  area,
  picked,
  onHouseTypeChange,
  onAreaChange,
  onToggleGewerk,
}: Props) {
  const selectedType = HOUSE_TYPES.find((t) => t.value === houseType);
  const hasDach = selectedType?.includesDach ?? false;

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
              onClick={() => onHouseTypeChange(t.value)}
              aria-pressed={t.value === houseType}
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
            <em>{picked.length}</em> von {HAUS_GEWERKE.length} gewählt
          </span>
        </div>
        <ul className="kalk-trades">
          {HAUS_GEWERKE.map((g) => {
            const on = picked.includes(g.key);
            const disabled = g.requiresDach && !hasDach;
            return (
              <li key={g.key} className={`kalk-trades__item${on ? ' is-on' : ''}${disabled ? ' is-disabled' : ''}`}>
                <button
                  type="button"
                  onClick={() => !disabled && onToggleGewerk(g.key)}
                  aria-pressed={on}
                  aria-disabled={disabled}
                  disabled={disabled}
                  title={disabled ? 'Nur in Konfigurationen mit Dach verfügbar' : undefined}
                >
                  <span className="kalk-trades__check" aria-hidden="true"></span>
                  <span className="kalk-trades__num">{g.num}</span>
                  <span className="kalk-trades__body">
                    <span className="kalk-trades__name">{g.label}</span>
                    <span className="kalk-trades__lead">{g.lead}</span>
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
