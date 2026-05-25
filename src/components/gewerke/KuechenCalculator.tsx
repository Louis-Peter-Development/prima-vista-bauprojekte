import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { KUECHEN_EXTRAS, KUECHEN_VARIANTS, formatEuro, type KuechenVariantKey } from '../../data/kuechen';

type ExtraKey = (typeof KUECHEN_EXTRAS)[number]['key'];
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
  demolition: true,
  appliances: false,
  lighting: false,
};

export default function KuechenCalculator({ embedded }: { embedded?: boolean } = {}) {
  const [variantKey, setVariantKey] = useState<KuechenVariantKey>('all');
  const [meters, setMeters] = useState(4);
  const [extras, setExtras] = useState<ExtrasState>(defaultExtras);

  const variant = KUECHEN_VARIANTS.find((item) => item.key === variantKey) ?? KUECHEN_VARIANTS[0];

  const lines = useMemo(() => {
    const lengthFactor = Math.max(0.72, meters / 4);
    const base: CalcLine[] = [
      {
        key: variant.key,
        label: variant.title,
        detail: variant.detail,
        qty: meters,
        unit: 'lfm',
        totalNet: Math.round(variant.netBase * lengthFactor),
      },
    ];

    KUECHEN_EXTRAS.forEach((extra) => {
      if (!extras[extra.key]) return;
      base.push({
        key: extra.key,
        label: extra.label,
        detail: 'Optionale Position aus dem Küchen- und Möbelbaupaket.',
        qty: 1,
        unit: 'Paket',
        totalNet: extra.netPrice,
      });
    });

    return base;
  }, [extras, meters, variant]);

  const net = lines.reduce((sum, line) => sum + line.totalNet, 0);
  const vat = net * 0.19;
  const gross = net + vat;

  return (
    <section className="hk-calc hk-calc--kueche" aria-label="Küchen und Möbelbau Kostenrechner">
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
              Küchenbau<br />
              <em>{variant.lead}.</em>
            </h2>
            <p>
              Küchenzeile, Arbeitsplatte, Elektro, Wasser oder Komplettpaket: Länge, Ausführung und Zusatzpositionen laufen direkt in eine Vorab-Schätzung.
            </p>
          </div>
        </div>
        )}

        <div className="hk-config reveal" data-delay="1">
          <div className="hk-config__field">
            <div className="hk-config__head">
              <span>01</span>
              <strong>Küchenlänge</strong>
              <em>{meters} lfm</em>
            </div>
            <div className="hk-meter hk-meter--wide">
              <label htmlFor="kuechen-meters">Menge</label>
              <input
                id="kuechen-meters"
                type="range"
                min={2}
                max={10}
                step={1}
                value={meters}
                onChange={(event) => setMeters(Number(event.target.value))}
              />
              <strong>{meters} lfm</strong>
            </div>
            <div className="hk-stepper hk-stepper--compact">
              <button type="button" onClick={() => setMeters((value) => Math.max(2, value - 1))} aria-label="Küchenlänge reduzieren">-</button>
              <input
                type="number"
                min={2}
                max={10}
                value={meters}
                onChange={(event) => setMeters(Math.min(10, Math.max(2, Number(event.target.value) || 2)))}
                aria-label="Küchenlänge"
              />
              <button type="button" onClick={() => setMeters((value) => Math.min(10, value + 1))} aria-label="Küchenlänge erhöhen">+</button>
            </div>
          </div>

          <div className="hk-config__field">
            <div className="hk-config__head">
              <span>02</span>
              <strong>Leistung</strong>
              <em>{KUECHEN_VARIANTS.length} Varianten</em>
            </div>
            <div className="hk-options">
              {KUECHEN_VARIANTS.map((item) => (
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
              {KUECHEN_EXTRAS.map((extra) => (
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
              Vorab-Schätzung nach Varianten aus dem importierten Küchen- und Möbelbau-Kalkulator. Verbindlich wird der Preis nach Aufmaß, Küchenplanung, Anschlusspunkten und Materialauswahl.
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
