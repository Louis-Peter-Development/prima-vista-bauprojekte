import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROHBAU_EXTRAS, ROHBAU_VARIANTS, formatEuro, type RohbauVariantKey } from '../../data/rohbau';

type ExtraKey = (typeof ROHBAU_EXTRAS)[number]['key'];
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
  erdarbeiten: true,
  kanal: false,
  stahltraeger: false,
  verputzen: true,
  schornstein: false,
};

export default function RohbauCalculator({ embedded }: { embedded?: boolean } = {}) {
  const [variantKey, setVariantKey] = useState<RohbauVariantKey>('all');
  const [area, setArea] = useState(140);
  const [extras, setExtras] = useState<ExtrasState>(defaultExtras);

  const variant = ROHBAU_VARIANTS.find((item) => item.key === variantKey) ?? ROHBAU_VARIANTS[0];

  const lines = useMemo(() => {
    const areaFactor = Math.max(0.5, area / 140);
    const base: CalcLine[] = [
      {
        key: variant.key,
        label: variant.title,
        detail: variant.detail,
        qty: area,
        unit: 'm²',
        totalNet: Math.round(variant.netBase * areaFactor),
      },
    ];

    ROHBAU_EXTRAS.forEach((extra) => {
      if (!extras[extra.key]) return;
      base.push({
        key: extra.key,
        label: extra.label,
        detail: 'Optionale Position aus dem Rohbau- & Abbruch-Kalkulator.',
        qty: 1,
        unit: 'Paket',
        totalNet: extra.netPrice,
      });
    });

    return base;
  }, [extras, area, variant]);

  const net = lines.reduce((sum, line) => sum + line.totalNet, 0);
  const vat = net * 0.19;
  const gross = net + vat;

  return (
    <section className="hk-calc hk-calc--rohbau" aria-label="Rohbau & Abbruch Kostenrechner">
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
              Rohbau<br />
              <em>{variant.lead}.</em>
            </h2>
            <p>
              Abbruch, Fundament, Mauerwerk, Decken oder Komplett-Rohbau: Bruttogrundfläche, Leistungsumfang und Zusatzpositionen ergeben direkt eine Vorab-Schätzung.
            </p>
          </div>
        </div>
        )}

        <div className="hk-config reveal" data-delay="1">
          <div className="hk-config__field">
            <div className="hk-config__head">
              <span>01</span>
              <strong>Bruttogrundfläche</strong>
              <em>{area} m²</em>
            </div>
            <div className="hk-meter hk-meter--wide">
              <label htmlFor="rohbau-area">Fläche</label>
              <input
                id="rohbau-area"
                type="range"
                min={40}
                max={420}
                step={5}
                value={area}
                onChange={(event) => setArea(Number(event.target.value))}
              />
              <strong>{area} m²</strong>
            </div>
            <div className="hk-stepper hk-stepper--compact">
              <button type="button" onClick={() => setArea((value) => Math.max(40, value - 5))} aria-label="Fläche reduzieren">-</button>
              <input
                type="number"
                min={40}
                max={420}
                value={area}
                onChange={(event) => setArea(Math.min(420, Math.max(40, Number(event.target.value) || 40)))}
                aria-label="Fläche"
              />
              <button type="button" onClick={() => setArea((value) => Math.min(420, value + 5))} aria-label="Fläche erhöhen">+</button>
            </div>
          </div>

          <div className="hk-config__field">
            <div className="hk-config__head">
              <span>02</span>
              <strong>Rohbauleistung</strong>
              <em>{ROHBAU_VARIANTS.length} Varianten</em>
            </div>
            <div className="hk-options">
              {ROHBAU_VARIANTS.map((item) => (
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
              {ROHBAU_EXTRAS.map((extra) => (
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
              Vorab-Schätzung nach Varianten aus dem importierten Rohbau- & Abbruch-Kalkulator. Verbindlich wird der Preis nach Baugrundgutachten, Erschließung, Statik, Geschosszahl und Mauerwerksart.
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
