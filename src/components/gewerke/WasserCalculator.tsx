import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { WASSER_EXTRAS, WASSER_VARIANTS, formatEuro, type WasserVariantKey } from '../../data/wasser';

type ExtraKey = (typeof WASSER_EXTRAS)[number]['key'];
type ExtrasState = Record<ExtraKey, boolean>;
type CalcLine = {
  key: string;
  label: string;
  detail: string;
  qty: number;
  unit: string;
  totalNet: number;
};

const defaultExtras: ExtrasState = {
  spuelkasten: true,
  waschmaschine: true,
  warmwasser: false,
  druck: true,
  demontage: false,
};

export default function WasserCalculator({ embedded }: { embedded?: boolean } = {}) {
  const [variantKey, setVariantKey] = useState<WasserVariantKey>('all');
  const [points, setPoints] = useState(8);
  const [extras, setExtras] = useState<ExtrasState>(defaultExtras);

  const variant = WASSER_VARIANTS.find((item) => item.key === variantKey) ?? WASSER_VARIANTS[0];

  const lines = useMemo(() => {
    const pointsFactor = Math.max(0.35, points / 8);
    const base: CalcLine[] = [
      {
        key: variant.key,
        label: variant.title,
        detail: variant.detail,
        qty: points,
        unit: 'Anschlüsse',
        totalNet: Math.round(variant.netBase * pointsFactor),
      },
    ];

    WASSER_EXTRAS.forEach((extra) => {
      if (!extras[extra.key]) return;
      base.push({
        key: extra.key,
        label: extra.label,
        detail: 'Optionale Position aus dem Wasserinstallations-Kalkulator.',
        qty: 1,
        unit: 'Paket',
        totalNet: extra.netPrice,
      });
    });

    return base;
  }, [extras, points, variant]);

  const net = lines.reduce((sum, line) => sum + line.totalNet, 0);
  const vat = net * 0.19;
  const gross = net + vat;

  return (
    <section className="hk-calc hk-calc--wasser" aria-label="Wasserinstallation Kostenrechner">
      <div className="hk-calc__inner">
        {!embedded && (
        <div className="hk-product reveal">
          <div className="hk-product__media">
            <img src={variant.image} alt={variant.title} width="800" height="600" loading="lazy" />
            <span>№ {variant.num}</span>
          </div>
          <div className="hk-product__copy">
            <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;Gewerk</div>
            <h2>
              Wasserinstallation<br />
              <em>{variant.lead}.</em>
            </h2>
            <p>
              Bad, Küche, Keller oder Garten: Anzahl der Anschlüsse, Strangart und Zusatzpositionen ergeben direkt eine Vorab-Schätzung.
            </p>
          </div>
        </div>
        )}

        <div className="hk-config reveal" data-delay="1">
          <div className="hk-config__field">
            <div className="hk-config__head">
              <span>01</span>
              <strong>Anschlüsse</strong>
              <em>{points} Stück</em>
            </div>
            <div className="hk-meter hk-meter--wide">
              <label htmlFor="wasser-points">Anschlüsse</label>
              <input
                id="wasser-points"
                type="range"
                min={2}
                max={30}
                step={1}
                value={points}
                onChange={(event) => setPoints(Number(event.target.value))}
              />
              <strong>{points} Stück</strong>
            </div>
            <div className="hk-stepper hk-stepper--compact">
              <button type="button" onClick={() => setPoints((value) => Math.max(2, value - 1))} aria-label="Anschlüsse reduzieren">-</button>
              <input
                type="number"
                min={2}
                max={30}
                value={points}
                onChange={(event) => setPoints(Math.min(30, Math.max(2, Number(event.target.value) || 2)))}
                aria-label="Anschlüsse"
              />
              <button type="button" onClick={() => setPoints((value) => Math.min(30, value + 1))} aria-label="Anschlüsse erhöhen">+</button>
            </div>
          </div>

          <div className="hk-config__field">
            <div className="hk-config__head">
              <span>02</span>
              <strong>Installations-Strang</strong>
              <em>{WASSER_VARIANTS.length} Varianten</em>
            </div>
            <div className="hk-options">
              {WASSER_VARIANTS.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={`hk-option${item.key === variantKey ? ' is-on' : ''}`}
                  onClick={() => setVariantKey(item.key)}
                >
                  <span className="hk-option__label">{item.title}</span>
                  <span className="hk-option__detail">{item.detail}</span>
                  <span className="hk-option__price">{formatEuro(item.netBase)} netto als Orientierung</span>
                </button>
              ))}
            </div>
          </div>

          <div className="hk-config__field">
            <div className="hk-config__head">
              <span>03</span>
              <strong>Zusatzpositionen</strong>
              <em>optional</em>
            </div>
            <div className="hk-toggle-list">
              {WASSER_EXTRAS.map((extra) => (
                <label className={`hk-toggle${extras[extra.key] ? ' is-on' : ''}`} key={extra.key}>
                  <input
                    type="checkbox"
                    checked={extras[extra.key]}
                    onChange={(event) => setExtras((current) => ({ ...current, [extra.key]: event.target.checked }))}
                  />
                  <span>
                    <strong>{extra.label}</strong>
                    <small>{formatEuro(extra.netPrice)} netto pauschal</small>
                  </span>
                </label>
              ))}
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
                    <small>{line.qty} {line.unit}</small>
                  </div>
                  <div>
                    <span>{line.qty} {line.unit}</span>
                    <strong>{formatEuro(line.totalNet)}</strong>
                  </div>
                </div>
              ))}
            </div>

            <p>
              Vorab-Schätzung nach Varianten aus dem importierten Wasserinstallations-Kalkulator. Verbindlich wird der Preis nach Aufmaß, Leitungsführung, Materialwahl, Wandaufbau und Anschlussart.
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
