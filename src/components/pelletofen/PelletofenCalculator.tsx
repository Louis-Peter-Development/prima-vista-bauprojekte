import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PELLET_CHIMNEY_ITEMS,
  PELLET_OPTIONS,
  PELLET_PACKAGE,
  formatEuro,
} from '../../data/pelletofen';

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

const chimneyTotal = PELLET_CHIMNEY_ITEMS.reduce((sum, item) => sum + item.netPrice, 0);

export default function PelletofenCalculator({ embedded }: { embedded?: boolean } = {}) {
  const [quantity, setQuantity] = useState(1);
  const [chimney, setChimney] = useState(false);
  const [oilTank, setOilTank] = useState(false);
  const [pelletGrill, setPelletGrill] = useState(false);

  const lines = useMemo<QuoteLine[]>(() => {
    const base = PELLET_PACKAGE.map((item) => ({
      key: item.key,
      label: item.label,
      detail: item.detail,
      sku: item.sku,
      qty: quantity,
      unit: item.unit,
      unitNet: item.netPrice,
      totalNet: item.netPrice * quantity,
    }));

    if (chimney) {
      PELLET_CHIMNEY_ITEMS.forEach((item) => {
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

    PELLET_OPTIONS.forEach((item) => {
      const selected = (item.key === 'oilTank' && oilTank) || (item.key === 'pelletGrill' && pelletGrill);
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
  }, [chimney, oilTank, pelletGrill, quantity]);

  const net = lines.reduce((sum, line) => sum + line.totalNet, 0);
  const vat = net * 0.19;
  const gross = net + vat;

  return (
    <section className="hk-calc hk-calc--pellet" aria-label="Pelletofen Kostenrechner">
      <div className="hk-calc__inner">
        {!embedded && (
        <div className="hk-product reveal">
          <div className="hk-product__media">
            <img src="/assets/img/proj-concrete-sofa.jpg" alt="Wohnbereich mit ruhiger Oberfläche als Referenz für Pelletofen-Wärme" />
            <span>№ 15</span>
          </div>
          <div className="hk-product__copy">
            <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;Komponente</div>
            <h2>
              Pelletofen<br />
              <em>als Wärmepaket.</em>
            </h2>
            <p>
              Für Pelletheizung und Ofenlösung mit Vitoligno 300. Kaminsystem, Öltank-Rückbau und Pelletgrill bleiben als optionale Positionen wählbar.
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
                aria-label="Anzahl Pelletanlagen"
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
              {PELLET_PACKAGE.map((item) => (
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
              <label className={`hk-toggle${chimney ? ' is-on' : ''}`}>
                <input type="checkbox" checked={chimney} onChange={(event) => setChimney(event.target.checked)} />
                <span>
                  <strong>Kaminsystem ergänzen</strong>
                  <small>{formatEuro(chimneyTotal)} netto als Bauteilpaket</small>
                </span>
              </label>
              <label className={`hk-toggle${oilTank ? ' is-on' : ''}`}>
                <input type="checkbox" checked={oilTank} onChange={(event) => setOilTank(event.target.checked)} />
                <span>
                  <strong>{PELLET_OPTIONS[0].label}</strong>
                  <small>{formatEuro(PELLET_OPTIONS[0].netPrice)} netto pauschal</small>
                </span>
              </label>
              <label className={`hk-toggle${pelletGrill ? ' is-on' : ''}`}>
                <input type="checkbox" checked={pelletGrill} onChange={(event) => setPelletGrill(event.target.checked)} />
                <span>
                  <strong>{PELLET_OPTIONS[1].label}</strong>
                  <small>{formatEuro(PELLET_OPTIONS[1].netPrice)} netto</small>
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
              Vorab-Schätzung nach Positionswerten aus dem importierten Rechner. Verbindlich wird der Preis nach Schornsteinführung, Lagerung, Brandschutz und Bestandsprüfung.
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
