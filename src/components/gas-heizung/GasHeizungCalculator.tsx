import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GAS_HEATING_OPTIONS,
  GAS_HEATING_PACKAGE,
  formatEuro,
} from '../../data/gasHeizung';

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

export default function GasHeizungCalculator({ embedded }: { embedded?: boolean } = {}) {
  const [quantity, setQuantity] = useState(1);
  const [foundation, setFoundation] = useState(false);
  const [oilTank, setOilTank] = useState(false);

  const lines = useMemo<QuoteLine[]>(() => {
    const base = GAS_HEATING_PACKAGE.map((item) => ({
      key: item.key,
      label: item.label,
      detail: item.detail,
      sku: item.sku,
      qty: quantity,
      unit: item.unit,
      unitNet: item.netPrice,
      totalNet: item.netPrice * quantity,
    }));

    GAS_HEATING_OPTIONS.forEach((item) => {
      const selected = (item.key === 'foundation' && foundation) || (item.key === 'oilTank' && oilTank);
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
    <section className="hk-calc hk-calc--gas" aria-label="Gas-Heizung Kostenrechner">
      <div className="hk-calc__inner">
        {!embedded && (
        <div className="hk-product reveal">
          <div className="hk-product__media">
            <img src="/assets/img/proj-stairs-concrete.jpg" alt="Sanierter Innenbereich als Referenz für Heiztechnik im Bestand" />
            <span>№ 14</span>
          </div>
          <div className="hk-product__copy">
            <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;Komponente</div>
            <h2>
              Gas-Heizung<br />
              <em>als Brennwertpaket.</em>
            </h2>
            <p>
              Für Häuser und Wohnungen mit vorhandenem Gasanschluss. Der Rechner bündelt Brennwert-Kessel, Kombitherme und optionale Vorarbeiten.
            </p>
          </div>
        </div>
        )}

        <div className="hk-config reveal" data-delay="1">
          <div className="hk-config__field">
            <div className="hk-config__head">
              <span>01</span>
              <strong>Anzahl Anlagen</strong>
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
                aria-label="Anzahl Gas-Heizungen"
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
              {GAS_HEATING_PACKAGE.map((item) => (
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
              <label className={`hk-toggle${foundation ? ' is-on' : ''}`}>
                <input type="checkbox" checked={foundation} onChange={(event) => setFoundation(event.target.checked)} />
                <span>
                  <strong>{GAS_HEATING_OPTIONS[0].label}</strong>
                  <small>{formatEuro(GAS_HEATING_OPTIONS[0].netPrice)} netto pauschal</small>
                </span>
              </label>
              <label className={`hk-toggle${oilTank ? ' is-on' : ''}`}>
                <input type="checkbox" checked={oilTank} onChange={(event) => setOilTank(event.target.checked)} />
                <span>
                  <strong>{GAS_HEATING_OPTIONS[1].label}</strong>
                  <small>{formatEuro(GAS_HEATING_OPTIONS[1].netPrice)} netto pauschal</small>
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
              Vorab-Schätzung nach Positionswerten aus dem importierten Rechner. Verbindlich wird der Preis nach Gasanschluss, Abgasführung, Heizlast und Bestandsprüfung.
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
