import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HEAT_PUMP_BASE,
  HEAT_PUMP_MATERIAL,
  HEAT_PUMP_OPTIONS,
  formatEuro,
} from '../../data/waermepumpe';

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

export default function WaermepumpeCalculator({ embedded }: { embedded?: boolean } = {}) {
  const [quantity, setQuantity] = useState(1);
  const [oilTank, setOilTank] = useState(false);
  const [foundation, setFoundation] = useState(false);

  const lines = useMemo<QuoteLine[]>(() => {
    const base: QuoteLine[] = [
      {
        key: HEAT_PUMP_BASE.key,
        label: HEAT_PUMP_BASE.label,
        detail: HEAT_PUMP_BASE.detail,
        sku: HEAT_PUMP_BASE.sku,
        qty: quantity,
        unit: HEAT_PUMP_BASE.unit,
        unitNet: HEAT_PUMP_BASE.netPrice,
        totalNet: HEAT_PUMP_BASE.netPrice * quantity,
      },
      ...HEAT_PUMP_MATERIAL.map((item) => ({
        key: item.key,
        label: item.label,
        detail: item.detail,
        sku: item.sku,
        qty: quantity,
        unit: item.unit,
        unitNet: item.netPrice,
        totalNet: item.netPrice * quantity,
      })),
    ];

    HEAT_PUMP_OPTIONS.forEach((item) => {
      const selected = (item.key === 'oilTank' && oilTank) || (item.key === 'foundation' && foundation);
      if (!selected) return;

      base.push({
        key: item.key,
        label: item.label,
        detail: item.detail,
        sku: item.sku,
        qty: 1,
        unit: item.unit,
        unitNet: item.netPrice,
        totalNet: item.netPrice,
      });
    });

    return base;
  }, [foundation, oilTank, quantity]);

  const net = lines.reduce((sum, line) => sum + line.totalNet, 0);
  const vat = net * 0.19;
  const gross = net + vat;

  return (
    <section className="hk-calc hk-calc--heat-pump" aria-label="Wärmepumpe Kostenrechner">
      <div className="hk-calc__inner">
        {!embedded && (
        <div className="hk-product reveal">
          <div className="hk-product__media">
            <img src="/assets/img/photo-haus-exterior.jpg" alt="Modernisiertes Haus als Einsatzort für eine Luft-Wärmepumpe" />
            <span>№ 13</span>
          </div>
          <div className="hk-product__copy">
            <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;Komponente</div>
            <h2>
              Luft-Wärmepumpe<br />
              <em>als Systempaket.</em>
            </h2>
            <p>
              Für gut gedämmte Bestandsgebäude und Neubauten. Der Rechner bündelt Montage, LG 12-kW-Paket, Zubehör und optionale Vorarbeiten.
            </p>
          </div>
        </div>
        )}

        <div className="hk-config reveal" data-delay="1">
          <div className="hk-config__field">
            <div className="hk-config__head">
              <span>01</span>
              <strong>Anzahl Wärmepumpen</strong>
              <em>{quantity} Stück</em>
            </div>
            <div className="hk-stepper">
              <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Anzahl reduzieren">-</button>
              <input
                type="number"
                min={1}
                max={10}
                value={quantity}
                onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
                aria-label="Anzahl Wärmepumpen"
              />
              <button type="button" onClick={() => setQuantity((value) => Math.min(10, value + 1))} aria-label="Anzahl erhöhen">+</button>
            </div>
          </div>

          <div className="hk-config__field">
            <div className="hk-config__head">
              <span>02</span>
              <strong>Paketumfang</strong>
              <em>Standard</em>
            </div>
            <div className="hk-options">
              <div className="hk-option is-on hk-option--static">
                <span className="hk-option__label">{HEAT_PUMP_BASE.label}</span>
                <span className="hk-option__detail">{HEAT_PUMP_BASE.detail}</span>
                <span className="hk-option__price">{formatEuro(HEAT_PUMP_BASE.netPrice)} netto</span>
              </div>
              {HEAT_PUMP_MATERIAL.map((item) => (
                <div className="hk-option is-on hk-option--static" key={item.key}>
                  <span className="hk-option__label">{item.label}</span>
                  <span className="hk-option__detail">{item.detail}</span>
                  <span className="hk-option__price">{formatEuro(item.netPrice)} netto</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hk-config__field">
            <div className="hk-config__head">
              <span>03</span>
              <strong>Optionale Positionen</strong>
              <em>bei Bedarf</em>
            </div>
            <div className="hk-toggle-list">
              <label className={`hk-toggle${oilTank ? ' is-on' : ''}`}>
                <input type="checkbox" checked={oilTank} onChange={(event) => setOilTank(event.target.checked)} />
                <span>
                  <strong>{HEAT_PUMP_OPTIONS[0].label}</strong>
                  <small>{formatEuro(HEAT_PUMP_OPTIONS[0].netPrice)} netto pauschal</small>
                </span>
              </label>
              <label className={`hk-toggle${foundation ? ' is-on' : ''}`}>
                <input type="checkbox" checked={foundation} onChange={(event) => setFoundation(event.target.checked)} />
                <span>
                  <strong>{HEAT_PUMP_OPTIONS[1].label}</strong>
                  <small>{formatEuro(HEAT_PUMP_OPTIONS[1].netPrice)} netto pauschal</small>
                </span>
              </label>
            </div>
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
              Vorab-Schätzung nach Positionswerten aus dem importierten Rechner. Verbindlich wird der Preis nach Heizlast, Aufstellort, Leitungswegen und Bestandsprüfung.
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
