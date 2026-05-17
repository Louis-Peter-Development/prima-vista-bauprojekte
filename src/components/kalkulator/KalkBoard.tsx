import {
  GEWERKE,
  OBJEKT_OPTIONS,
  QUALITY_OPTIONS,
  type Objekt,
  type Quality,
} from '../../data/kalkulator';

type KalkBoardProps = {
  objekt: Objekt;
  flaeche: number;
  quality: Quality;
  picked: string[];
  sliderPct: number;
  onObjektChange: (value: Objekt) => void;
  onFlaecheChange: (value: number) => void;
  onQualityChange: (value: Quality) => void;
  onToggleGewerk: (key: string) => void;
};

export default function KalkBoard({
  objekt,
  flaeche,
  quality,
  picked,
  sliderPct,
  onObjektChange,
  onFlaecheChange,
  onQualityChange,
  onToggleGewerk,
}: KalkBoardProps) {
  return (
    <div className="kalk-board">
      <div className="kalk-board__field reveal">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">01</span>
          <span className="kalk-board__label">Objektart</span>
          <span className="kalk-board__hint">Bestimmt den Komplexitäts­faktor</span>
        </div>
        <div className="kalk-chips">
          {OBJEKT_OPTIONS.map((o) => (
            <button
              key={o.value}
              type="button"
              className={`kalk-chip${o.value === objekt ? ' is-on' : ''}`}
              onClick={() => onObjektChange(o.value)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className="kalk-board__field reveal" data-delay="1">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">02</span>
          <span className="kalk-board__label">Fläche</span>
          <span className="kalk-board__value-large">
            {flaeche}<small>m²</small>
          </span>
        </div>
        <div className="kalk-slider-wrap" style={{ ['--pct' as string]: `${sliderPct}%` }}>
          <input
            className="kalk-slider"
            type="range"
            min={20}
            max={500}
            step={5}
            value={flaeche}
            onChange={(e) => onFlaecheChange(Number(e.target.value))}
            aria-label="Fläche in Quadratmetern"
          />
          <div className="kalk-slider__scale">
            <span>20</span>
            <span>100</span>
            <span>200</span>
            <span>350</span>
            <span>500</span>
          </div>
        </div>
      </div>

      <div className="kalk-board__field reveal">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">03</span>
          <span className="kalk-board__label">Ausbaustandard</span>
          <span className="kalk-board__hint">Material- &amp; Verarbeitungsniveau</span>
        </div>
        <div className="kalk-quality">
          {QUALITY_OPTIONS.map((q) => (
            <button
              key={q.value}
              type="button"
              className={`kalk-quality__opt${q.value === quality ? ' is-on' : ''}`}
              onClick={() => onQualityChange(q.value)}
            >
              <span className="kalk-quality__mult">× {q.multiplier.toFixed(2).replace('.', ',')}</span>
              <span className="kalk-quality__label">{q.label}</span>
              <span className="kalk-quality__note">{q.note}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="kalk-board__field reveal" data-delay="1">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">04</span>
          <span className="kalk-board__label">Gewerke</span>
          <span className="kalk-board__counter">
            <em>{picked.length}</em> von {GEWERKE.length} gewählt
          </span>
        </div>
        <ul className="kalk-trades">
          {GEWERKE.map((g) => {
            const on = picked.includes(g.key);
            return (
              <li key={g.key} className={`kalk-trades__item${on ? ' is-on' : ''}`}>
                <button type="button" onClick={() => onToggleGewerk(g.key)} aria-pressed={on}>
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
