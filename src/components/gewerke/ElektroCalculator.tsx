import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ELEKTRO_EXTRAS, ELEKTRO_VARIANTS, formatEuro, type ElektroVariantKey } from '../../data/elektro';

type ExtraKey = (typeof ELEKTRO_EXTRAS)[number]['key'];
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
  slots: false,
  documentation: true,
};

export default function ElektroCalculator({ embedded }: { embedded?: boolean } = {}) {
  const [variantKey, setVariantKey] = useState<ElektroVariantKey>('all');
  const [rooms, setRooms] = useState(5);
  const [extras, setExtras] = useState<ExtrasState>(defaultExtras);

  const variant = ELEKTRO_VARIANTS.find((item) => item.key === variantKey) ?? ELEKTRO_VARIANTS[0];

  const lines = useMemo(() => {
    const roomFactor = Math.max(0.62, rooms / 5);
    const base: CalcLine[] = [
      {
        key: variant.key,
        label: variant.title,
        detail: variant.detail,
        qty: rooms,
        unit: 'Räume',
        totalNet: Math.round(variant.netBase * roomFactor),
      },
    ];

    ELEKTRO_EXTRAS.forEach((extra) => {
      if (!extras[extra.key]) return;
      base.push({
        key: extra.key,
        label: extra.label,
        detail: 'Optionale Position aus dem Elektroinstallationspaket.',
        qty: 1,
        unit: 'Paket',
        totalNet: extra.netPrice,
      });
    });

    return base;
  }, [extras, rooms, variant]);

  const net = lines.reduce((sum, line) => sum + line.totalNet, 0);
  const vat = net * 0.19;
  const gross = net + vat;

  return (
    <section className="hk-calc hk-calc--elektro" aria-label="Elektroinstallation Kostenrechner">
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
              Elektroinstallation<br />
              <em>{variant.lead}.</em>
            </h2>
            <p>
              Strom, Licht, Netzwerk, Sicherungskasten oder Smart Home: Räume, Leistungsart und Zusatzpositionen ergeben direkt eine erste Vorab-Schätzung.
            </p>
          </div>
        </div>
        )}

        <div className="hk-config reveal" data-delay="1">
          <div className="hk-config__field">
            <div className="hk-config__head">
              <span>01</span>
              <strong>Umfang</strong>
              <em>{rooms} Räume</em>
            </div>
            <div className="hk-meter hk-meter--wide">
              <label htmlFor="elektro-rooms">Menge</label>
              <input
                id="elektro-rooms"
                type="range"
                min={1}
                max={14}
                step={1}
                value={rooms}
                onChange={(event) => setRooms(Number(event.target.value))}
              />
              <strong>{rooms} Räume</strong>
            </div>
            <div className="hk-stepper hk-stepper--compact">
              <button type="button" onClick={() => setRooms((value) => Math.max(1, value - 1))} aria-label="Raumanzahl reduzieren">-</button>
              <input
                type="number"
                min={1}
                max={14}
                value={rooms}
                onChange={(event) => setRooms(Math.min(14, Math.max(1, Number(event.target.value) || 1)))}
                aria-label="Raumanzahl"
              />
              <button type="button" onClick={() => setRooms((value) => Math.min(14, value + 1))} aria-label="Raumanzahl erhöhen">+</button>
            </div>
          </div>

          <div className="hk-config__field">
            <div className="hk-config__head">
              <span>02</span>
              <strong>Elektroleistung</strong>
              <em>{ELEKTRO_VARIANTS.length} Varianten</em>
            </div>
            <div className="hk-options">
              {ELEKTRO_VARIANTS.map((item) => (
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
              {ELEKTRO_EXTRAS.map((extra) => (
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
              Vorab-Schätzung nach Varianten aus dem importierten Elektroinstallation-Kalkulator. Verbindlich wird der Preis nach Aufmaß, Leitungswegen, Verteilerprüfung und Ausstattungsstandard.
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
