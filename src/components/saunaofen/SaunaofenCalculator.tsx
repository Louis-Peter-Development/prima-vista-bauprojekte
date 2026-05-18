import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  SAUNA_BASE,
  SAUNA_CHIMNEY_ITEMS,
  SAUNA_MATERIAL_REQUEST,
  SAUNA_WOOD_RACK,
  formatEuro,
} from '../../data/saunaofen';

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

const chimneyTotal = SAUNA_CHIMNEY_ITEMS.reduce((sum, item) => sum + item.netPrice, 0);

export default function SaunaofenCalculator() {
  const [quantity, setQuantity] = useState(1);
  const [materialRequest, setMaterialRequest] = useState(false);
  const [chimney, setChimney] = useState(false);
  const [woodRack, setWoodRack] = useState(false);

  const lines = useMemo<QuoteLine[]>(() => {
    const base: QuoteLine[] = [
      {
        key: SAUNA_BASE.key,
        label: SAUNA_BASE.label,
        detail: SAUNA_BASE.detail,
        sku: SAUNA_BASE.sku,
        qty: quantity,
        unit: SAUNA_BASE.unit,
        unitNet: SAUNA_BASE.netPrice,
        totalNet: SAUNA_BASE.netPrice * quantity,
      },
    ];

    if (materialRequest) {
      base.push({
        key: SAUNA_MATERIAL_REQUEST.key,
        label: SAUNA_MATERIAL_REQUEST.label,
        detail: SAUNA_MATERIAL_REQUEST.detail,
        sku: SAUNA_MATERIAL_REQUEST.sku,
        qty: 1,
        unit: SAUNA_MATERIAL_REQUEST.unit,
        unitNet: SAUNA_MATERIAL_REQUEST.netPrice,
        totalNet: SAUNA_MATERIAL_REQUEST.netPrice,
      });
    }

    if (chimney) {
      SAUNA_CHIMNEY_ITEMS.forEach((item) => {
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
    }

    if (woodRack) {
      base.push({
        key: SAUNA_WOOD_RACK.key,
        label: SAUNA_WOOD_RACK.label,
        detail: SAUNA_WOOD_RACK.detail,
        sku: SAUNA_WOOD_RACK.sku,
        qty: 1,
        unit: SAUNA_WOOD_RACK.unit,
        unitNet: SAUNA_WOOD_RACK.netPrice,
        totalNet: SAUNA_WOOD_RACK.netPrice,
      });
    }

    return base;
  }, [chimney, materialRequest, quantity, woodRack]);

  const net = lines.reduce((sum, line) => sum + line.totalNet, 0);
  const vat = net * 0.19;
  const gross = net + vat;

  return (
    <section className="hk-calc hk-calc--sauna" aria-label="Saunaofen Kostenrechner">
      <div className="hk-calc__inner">
        <div className="hk-product reveal">
          <div className="hk-product__media">
            <img src="/assets/img/proj-spa-tub.jpg" alt="Wellnessbereich als Referenz für Saunaofen und Ofenplanung" />
            <span>№ 16</span>
          </div>
          <div className="hk-product__copy">
            <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;Komponente</div>
            <h2>
              Saunaofen<br />
              <em>Prestige.</em>
            </h2>
            <p>
              Für Sauna- und Ofenbereiche mit 9-kW-Prestige-Anspruch. Montagepaket, Materialbemusterung und Kaminzubehör bleiben transparent kalkulierbar.
            </p>
          </div>
        </div>

        <div className="hk-config reveal" data-delay="1">
          <div className="hk-config__field">
            <div className="hk-config__head">
              <span>01</span>
              <strong>Anzahl Öfen</strong>
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
                aria-label="Anzahl Saunaöfen"
              />
              <button type="button" onClick={() => setQuantity((value) => Math.min(10, value + 1))} aria-label="Anzahl erhöhen">+</button>
            </div>
          </div>

          <div className="hk-config__field">
            <div className="hk-config__head">
              <span>02</span>
              <strong>Basis-Leistung</strong>
              <em>Standard</em>
            </div>
            <div className="hk-option is-on hk-option--static">
              <span className="hk-option__label">{SAUNA_BASE.label}</span>
              <span className="hk-option__detail">{SAUNA_BASE.detail}</span>
              <span className="hk-option__price">{formatEuro(SAUNA_BASE.netPrice)} netto</span>
            </div>
          </div>

          <div className="hk-config__field">
            <div className="hk-config__head">
              <span>03</span>
              <strong>Optionale Positionen</strong>
              <em>bei Bedarf</em>
            </div>
            <div className="hk-toggle-list">
              <label className={`hk-toggle${materialRequest ? ' is-on' : ''}`}>
                <input type="checkbox" checked={materialRequest} onChange={(event) => setMaterialRequest(event.target.checked)} />
                <span>
                  <strong>{SAUNA_MATERIAL_REQUEST.label}</strong>
                  <small>{formatEuro(SAUNA_MATERIAL_REQUEST.netPrice)} netto, nach Bemusterung</small>
                </span>
              </label>
              <label className={`hk-toggle${chimney ? ' is-on' : ''}`}>
                <input type="checkbox" checked={chimney} onChange={(event) => setChimney(event.target.checked)} />
                <span>
                  <strong>Kaminsystem ergänzen</strong>
                  <small>{formatEuro(chimneyTotal)} netto als Bauteilpaket</small>
                </span>
              </label>
              <label className={`hk-toggle${woodRack ? ' is-on' : ''}`}>
                <input type="checkbox" checked={woodRack} onChange={(event) => setWoodRack(event.target.checked)} />
                <span>
                  <strong>{SAUNA_WOOD_RACK.label}</strong>
                  <small>{formatEuro(SAUNA_WOOD_RACK.netPrice)} netto</small>
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
              Vorab-Schätzung nach Positionswerten aus dem importierten Rechner. Verbindlich wird der Preis nach Ofenmodell, Zuluft, Brandschutz, Materialbemusterung und Aufstellort.
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
