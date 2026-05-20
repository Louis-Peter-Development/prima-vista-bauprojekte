import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MOUNTING_ITEM,
  PIPE_OPTIONS,
  RADIATOR_MODELS,
  formatEuro,
  type PipeOptionKey,
  type RadiatorModelKey,
} from '../../data/heizkoerper';

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

export default function HeizkoerperCalculator({ embedded }: { embedded?: boolean } = {}) {
  const [modelKey, setModelKey] = useState<RadiatorModelKey>('plan');
  const [quantity, setQuantity] = useState(1);
  const [pipePackage, setPipePackage] = useState(false);
  const [pipeMode, setPipeMode] = useState<PipeOptionKey | 'none'>('none');
  const [pipeMeters, setPipeMeters] = useState(5);

  const model = RADIATOR_MODELS.find((item) => item.key === modelKey) ?? RADIATOR_MODELS[0];
  const selectedPipe = PIPE_OPTIONS.find((item) => item.key === pipeMode);

  const lines = useMemo<QuoteLine[]>(() => {
    const base: QuoteLine[] = [
      {
        key: 'mounting',
        label: MOUNTING_ITEM.label,
        detail: MOUNTING_ITEM.detail,
        sku: MOUNTING_ITEM.sku,
        qty: quantity,
        unit: MOUNTING_ITEM.unit,
        unitNet: MOUNTING_ITEM.netPrice,
        totalNet: MOUNTING_ITEM.netPrice * quantity,
      },
      {
        key: model.key,
        label: model.label,
        detail: model.detail,
        sku: model.sku,
        qty: quantity,
        unit: model.unit,
        unitNet: model.netPrice,
        totalNet: model.netPrice * quantity,
      },
    ];

    if (pipePackage) {
      const option = PIPE_OPTIONS.find((item) => item.key === 'package');
      if (option) {
        base.push({
          key: option.key,
          label: option.label,
          detail: option.detail,
          sku: option.sku,
          qty: quantity,
          unit: option.unit,
          unitNet: option.netPrice,
          totalNet: option.netPrice * quantity,
        });
      }
    }

    if (selectedPipe && selectedPipe.key !== 'package') {
      base.push({
        key: selectedPipe.key,
        label: selectedPipe.label,
        detail: selectedPipe.detail,
        sku: selectedPipe.sku,
        qty: pipeMeters,
        unit: selectedPipe.unit,
        unitNet: selectedPipe.netPrice,
        totalNet: selectedPipe.netPrice * pipeMeters,
      });
    }

    return base;
  }, [model, pipeMeters, pipePackage, quantity, selectedPipe]);

  const net = lines.reduce((sum, line) => sum + line.totalNet, 0);
  const vat = net * 0.19;
  const gross = net + vat;

  return (
    <section className="hk-calc" aria-label="Heizkörper Kostenrechner">
      <div className="hk-calc__inner">
        {!embedded && (
        <div className="hk-product reveal">
          <div className="hk-product__media">
            <img src="/assets/img/photo-bad-prima-vista.jpg" alt="Modernisiertes Bad mit Heizkörper- und Sanitärdetails" />
            <span>№ 10</span>
          </div>
          <div className="hk-product__copy">
            <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;Komponente</div>
            <h2>
              Heizkörper<br />
              <em>als Einzelgewerk.</em>
            </h2>
            <p>
              Für einzelne Räume, Badheizkörper oder den Austausch mehrerer Heizkörper. Der Rechner trennt Montage, Material und optionale Heizstränge sauber auf.
            </p>
          </div>
        </div>
        )}

        <div className="hk-config reveal" data-delay="1">
          <div className="hk-config__field">
            <div className="hk-config__head">
              <span>01</span>
              <strong>Anzahl Heizkörper</strong>
              <em>{quantity} Stück</em>
            </div>
            <div className="hk-stepper">
              <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Anzahl reduzieren">-</button>
              <input
                type="number"
                min={1}
                max={30}
                value={quantity}
                onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
                aria-label="Anzahl Heizkörper"
              />
              <button type="button" onClick={() => setQuantity((value) => Math.min(30, value + 1))} aria-label="Anzahl erhöhen">+</button>
            </div>
          </div>

          <div className="hk-config__field">
            <div className="hk-config__head">
              <span>02</span>
              <strong>Heizkörper-Modell</strong>
              <em>Material</em>
            </div>
            <div className="hk-options">
              {RADIATOR_MODELS.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={`hk-option${item.key === modelKey ? ' is-on' : ''}`}
                  onClick={() => setModelKey(item.key)}
                >
                  <span className="hk-option__label">{item.label}</span>
                  <span className="hk-option__detail">{item.detail}</span>
                  <span className="hk-option__price">{formatEuro(item.netPrice)} netto</span>
                </button>
              ))}
            </div>
          </div>

          <div className="hk-config__field">
            <div className="hk-config__head">
              <span>03</span>
              <strong>Optionale Heizstränge</strong>
              <em>bei Bedarf</em>
            </div>
            <label className={`hk-toggle${pipePackage ? ' is-on' : ''}`}>
              <input
                type="checkbox"
                checked={pipePackage}
                onChange={(event) => setPipePackage(event.target.checked)}
              />
              <span>
                <strong>Heizstränge bis 5 m</strong>
                <small>{formatEuro(434.56)} netto pro Heizkörper</small>
              </span>
            </label>

            <div className="hk-pipes">
              <button type="button" className={pipeMode === 'none' ? 'is-on' : ''} onClick={() => setPipeMode('none')}>
                Keine Meterposition
              </button>
              <button type="button" className={pipeMode === 'ap' ? 'is-on' : ''} onClick={() => setPipeMode('ap')}>
                Aufputz
              </button>
              <button type="button" className={pipeMode === 'up' ? 'is-on' : ''} onClick={() => setPipeMode('up')}>
                Unterputz
              </button>
            </div>

            {pipeMode !== 'none' && (
              <div className="hk-meter">
                <label htmlFor="hk-pipe-meters">Laufmeter</label>
                <input
                  id="hk-pipe-meters"
                  type="range"
                  min={1}
                  max={40}
                  step={1}
                  value={pipeMeters}
                  onChange={(event) => setPipeMeters(Number(event.target.value))}
                />
                <strong>{pipeMeters} lfm.</strong>
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
              Vorab-Schätzung nach Positionswerten aus dem importierten Rechner. Verbindlich wird der Preis nach Aufmaß, Leitungsführung und Bestandsprüfung.
            </p>

            <div className="hk-summary__actions">
              <Link className="btn btn--solid" to="/blitz-angebot">
                Als Angebot anfragen <span className="arrow">&gt;</span>
              </Link>
              <Link className="btn btn--light" to="/kontakt">
                Termin vereinbaren <span className="arrow">&gt;</span>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
