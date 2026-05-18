import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FLOOR_HEATING_BASE,
  FLOOR_HEATING_ELECTRIC,
  FLOOR_HEATING_EXTRAS,
  formatEuro,
} from '../../data/fussbodenheizung';

type QuoteLine = {
  key: string;
  label: string;
  detail: string;
  sku: string;
  qty: number;
  unit: string;
  unitNet: number;
  totalNet: number;
};

export default function FussbodenheizungCalculator() {
  const [area, setArea] = useState(100);
  const [dryScreed, setDryScreed] = useState(false);
  const [removeScreed, setRemoveScreed] = useState(false);
  const [electricSystem, setElectricSystem] = useState(false);
  const [electricArea, setElectricArea] = useState(3);
  const [warmupCount, setWarmupCount] = useState(1);

  const lines = useMemo<QuoteLine[]>(() => {
    const base: QuoteLine[] = [
      {
        key: 'base',
        label: FLOOR_HEATING_BASE.label,
        detail: FLOOR_HEATING_BASE.detail,
        sku: FLOOR_HEATING_BASE.sku,
        qty: area,
        unit: FLOOR_HEATING_BASE.unit,
        unitNet: FLOOR_HEATING_BASE.netPrice,
        totalNet: FLOOR_HEATING_BASE.netPrice * area,
      },
    ];

    const selectedExtras = FLOOR_HEATING_EXTRAS.filter((item) => (
      (item.key === 'dryScreed' && dryScreed)
      || (item.key === 'removeScreed' && removeScreed)
    ));

    selectedExtras.forEach((item) => {
      base.push({
        key: item.key,
        label: item.label,
        detail: item.detail,
        sku: item.sku,
        qty: area,
        unit: item.unit,
        unitNet: item.netPrice,
        totalNet: item.netPrice * area,
      });
    });

    if (electricSystem) {
      const mount = FLOOR_HEATING_ELECTRIC[0];
      const foil = FLOOR_HEATING_ELECTRIC[1];
      base.push({
        key: mount.key,
        label: mount.label,
        detail: mount.detail,
        sku: mount.sku,
        qty: electricArea,
        unit: mount.unit,
        unitNet: mount.netPrice,
        totalNet: mount.netPrice * electricArea,
      });
      base.push({
        key: foil.key,
        label: foil.label,
        detail: foil.detail,
        sku: foil.sku,
        qty: warmupCount,
        unit: foil.unit,
        unitNet: foil.netPrice,
        totalNet: foil.netPrice * warmupCount,
      });
    }

    return base;
  }, [area, dryScreed, electricArea, electricSystem, removeScreed, warmupCount]);

  const net = lines.reduce((sum, line) => sum + line.totalNet, 0);
  const vat = net * 0.19;
  const gross = net + vat;

  return (
    <section className="hk-calc hk-calc--floor" aria-label="Fußbodenheizung Kostenrechner">
      <div className="hk-calc__inner">
        <div className="hk-product reveal">
          <div className="hk-product__media">
            <img src="/assets/img/proj-floor-oak.jpg" alt="Holzboden als Oberfläche für Fußbodenheizung" />
            <span>№ 12</span>
          </div>
          <div className="hk-product__copy">
            <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;Komponente</div>
            <h2>
              Fußbodenheizung<br />
              <em>flächenweise.</em>
            </h2>
            <p>
              Für wassergeführte Bodenheizung, Trockenaufbau und elektrische Flächenheizung unter Holz-, Vinyl- oder Laminatböden.
            </p>
          </div>
        </div>

        <div className="hk-config reveal" data-delay="1">
          <div className="hk-config__field">
            <div className="hk-config__head">
              <span>01</span>
              <strong>Fläche</strong>
              <em>{area} qm</em>
            </div>
            <div className="hk-meter hk-meter--wide">
              <label htmlFor="fbh-area">Menge</label>
              <input
                id="fbh-area"
                type="range"
                min={5}
                max={250}
                step={5}
                value={area}
                onChange={(event) => setArea(Number(event.target.value))}
              />
              <strong>{area} qm</strong>
            </div>
            <div className="hk-stepper hk-stepper--compact">
              <button type="button" onClick={() => setArea((value) => Math.max(5, value - 5))} aria-label="Fläche reduzieren">-</button>
              <input
                type="number"
                min={5}
                max={250}
                value={area}
                onChange={(event) => setArea(Math.max(5, Number(event.target.value) || 5))}
                aria-label="Fläche Fußbodenheizung"
              />
              <button type="button" onClick={() => setArea((value) => Math.min(250, value + 5))} aria-label="Fläche erhöhen">+</button>
            </div>
          </div>

          <div className="hk-config__field">
            <div className="hk-config__head">
              <span>02</span>
              <strong>Basis-Leistung</strong>
              <em>{formatEuro(FLOOR_HEATING_BASE.netPrice)} / qm</em>
            </div>
            <div className="hk-option is-on hk-option--static">
              <span className="hk-option__label">{FLOOR_HEATING_BASE.label}</span>
              <span className="hk-option__detail">{FLOOR_HEATING_BASE.detail}</span>
              <span className="hk-option__price">{FLOOR_HEATING_BASE.sku}</span>
            </div>
          </div>

          <div className="hk-config__field">
            <div className="hk-config__head">
              <span>03</span>
              <strong>Estrich-Positionen</strong>
              <em>optional</em>
            </div>
            <div className="hk-toggle-list">
              <label className={`hk-toggle${dryScreed ? ' is-on' : ''}`}>
                <input type="checkbox" checked={dryScreed} onChange={(event) => setDryScreed(event.target.checked)} />
                <span>
                  <strong>{FLOOR_HEATING_EXTRAS[0].label}</strong>
                  <small>{formatEuro(FLOOR_HEATING_EXTRAS[0].netPrice)} netto pro qm</small>
                </span>
              </label>
              <label className={`hk-toggle${removeScreed ? ' is-on' : ''}`}>
                <input type="checkbox" checked={removeScreed} onChange={(event) => setRemoveScreed(event.target.checked)} />
                <span>
                  <strong>{FLOOR_HEATING_EXTRAS[1].label}</strong>
                  <small>{formatEuro(FLOOR_HEATING_EXTRAS[1].netPrice)} netto pro qm</small>
                </span>
              </label>
            </div>
          </div>

          <div className="hk-config__field">
            <div className="hk-config__head">
              <span>04</span>
              <strong>Elektrische Flächenheizung</strong>
              <em>optional</em>
            </div>
            <label className={`hk-toggle${electricSystem ? ' is-on' : ''}`}>
              <input type="checkbox" checked={electricSystem} onChange={(event) => setElectricSystem(event.target.checked)} />
              <span>
                <strong>Warmup System ergänzen</strong>
                <small>Montage plus Aluminiumfolien-Heizsystem</small>
              </span>
            </label>

            {electricSystem && (
              <div className="hk-mini-grid">
                <label>
                  <span>Montagefläche</span>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={electricArea}
                    onChange={(event) => setElectricArea(Math.max(1, Number(event.target.value) || 1))}
                  />
                  <small>qm</small>
                </label>
                <label>
                  <span>Heizsysteme</span>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={warmupCount}
                    onChange={(event) => setWarmupCount(Math.max(1, Number(event.target.value) || 1))}
                  />
                  <small>Stk.</small>
                </label>
              </div>
            )}
          </div>
        </div>

        <aside className="hk-summary reveal" data-delay="2">
          <div className="hk-summary__sticky">
            <div className="hk-summary__top">
              <span>Live-Angebot</span>
              <strong>{formatEuro(gross)}</strong>
              <small>inkl. 19 % MwSt.</small>
            </div>

            <div className="hk-summary__totals">
              <span>Gesamtnettosumme <strong>{formatEuro(net)}</strong></span>
              <span>zzgl. 19 % MwSt. <strong>{formatEuro(vat)}</strong></span>
              <span>Gesamtsumme <strong>{formatEuro(gross)}</strong></span>
            </div>

            <div className="hk-lines">
              {lines.map((line) => (
                <div className="hk-line" key={line.key}>
                  <div>
                    <strong>{line.label}</strong>
                    <span>{line.detail}</span>
                    <small>{line.sku}</small>
                  </div>
                  <div>
                    <span>{line.qty} {line.unit}</span>
                    <strong>{formatEuro(line.totalNet)}</strong>
                  </div>
                </div>
              ))}
            </div>

            <p>
              Vorab-Schätzung nach Positionswerten aus dem importierten Rechner. Aufbauhöhe, Dämmung, Estrich und Bodenbelag werden beim Aufmaß geprüft.
            </p>

            <div className="hk-summary__actions">
              <Link className="btn btn--solid" to="/blitz-angebot">
                Als Angebot anfragen <span className="arrow">&gt;</span>
              </Link>
              <Link className="btn btn--light" to="/kontakt">
                Vor-Ort-Termin <span className="arrow">&gt;</span>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
