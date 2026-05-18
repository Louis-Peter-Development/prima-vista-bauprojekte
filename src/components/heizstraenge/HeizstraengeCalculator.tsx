import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PIPE_MODES,
  PIPE_PACKAGE,
  formatEuro,
  type PipeModeKey,
} from '../../data/heizstraenge';

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

export default function HeizstraengeCalculator() {
  const [modeKey, setModeKey] = useState<PipeModeKey>('ap');
  const [meters, setMeters] = useState(50);
  const [shortRunPackage, setShortRunPackage] = useState(false);

  const mode = PIPE_MODES.find((item) => item.key === modeKey) ?? PIPE_MODES[0];

  const lines = useMemo<QuoteLine[]>(() => {
    const base: QuoteLine[] = [
      {
        key: mode.key,
        label: mode.label,
        detail: mode.detail,
        sku: mode.sku,
        qty: meters,
        unit: mode.unit,
        unitNet: mode.netPrice,
        totalNet: mode.netPrice * meters,
      },
    ];

    if (shortRunPackage) {
      base.push({
        key: 'package',
        label: PIPE_PACKAGE.label,
        detail: PIPE_PACKAGE.detail,
        sku: PIPE_PACKAGE.sku,
        qty: 1,
        unit: PIPE_PACKAGE.unit,
        unitNet: PIPE_PACKAGE.netPrice,
        totalNet: PIPE_PACKAGE.netPrice,
      });
    }

    return base;
  }, [meters, mode, shortRunPackage]);

  const net = lines.reduce((sum, line) => sum + line.totalNet, 0);
  const vat = net * 0.19;
  const gross = net + vat;

  return (
    <section className="hk-calc hk-calc--pipes" aria-label="Heizstränge Kostenrechner">
      <div className="hk-calc__inner">
        <div className="hk-product reveal">
          <div className="hk-product__media">
            <img src="/assets/img/photo-parkett-rohbau.jpg" alt="Rohbau mit vorbereiteter Leitungsführung" />
            <span>№ 11</span>
          </div>
          <div className="hk-product__copy">
            <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;Komponente</div>
            <h2>
              Heizstränge<br />
              <em>neu führen.</em>
            </h2>
            <p>
              Für neue Steig- und Verteilleitungen im Bestand. Wählen Sie Aufputz oder Unterputz und passen Sie die laufenden Meter an.
            </p>
          </div>
        </div>

        <div className="hk-config reveal" data-delay="1">
          <div className="hk-config__field">
            <div className="hk-config__head">
              <span>01</span>
              <strong>Leitungsart</strong>
              <em>{mode.unit}</em>
            </div>
            <div className="hk-options">
              {PIPE_MODES.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={`hk-option${item.key === modeKey ? ' is-on' : ''}`}
                  onClick={() => setModeKey(item.key)}
                >
                  <span className="hk-option__label">{item.label}</span>
                  <span className="hk-option__detail">{item.detail}</span>
                  <span className="hk-option__price">{formatEuro(item.netPrice)} netto pro {item.unit}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="hk-config__field">
            <div className="hk-config__head">
              <span>02</span>
              <strong>Laufmeter</strong>
              <em>{meters} lfm.</em>
            </div>
            <div className="hk-meter hk-meter--wide">
              <label htmlFor="hs-meters">Menge</label>
              <input
                id="hs-meters"
                type="range"
                min={1}
                max={120}
                step={1}
                value={meters}
                onChange={(event) => setMeters(Number(event.target.value))}
              />
              <strong>{meters} lfm.</strong>
            </div>
            <div className="hk-stepper hk-stepper--compact">
              <button type="button" onClick={() => setMeters((value) => Math.max(1, value - 1))} aria-label="Laufmeter reduzieren">-</button>
              <input
                type="number"
                min={1}
                max={120}
                value={meters}
                onChange={(event) => setMeters(Math.max(1, Number(event.target.value) || 1))}
                aria-label="Laufmeter Heizstränge"
              />
              <button type="button" onClick={() => setMeters((value) => Math.min(120, value + 1))} aria-label="Laufmeter erhöhen">+</button>
            </div>
          </div>

          <div className="hk-config__field">
            <div className="hk-config__head">
              <span>03</span>
              <strong>Kurzer Leitungsweg</strong>
              <em>optional</em>
            </div>
            <label className={`hk-toggle${shortRunPackage ? ' is-on' : ''}`}>
              <input
                type="checkbox"
                checked={shortRunPackage}
                onChange={(event) => setShortRunPackage(event.target.checked)}
              />
              <span>
                <strong>{PIPE_PACKAGE.label}</strong>
                <small>{formatEuro(PIPE_PACKAGE.netPrice)} netto als Leistungspaket</small>
              </span>
            </label>
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
              Vorab-Schätzung nach Positionswerten aus dem importierten Rechner. Leitungsweg, Wandaufbau, Schlitze und Brandschutz werden beim Aufmaß geprüft.
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
