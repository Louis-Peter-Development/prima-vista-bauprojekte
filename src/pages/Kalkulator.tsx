import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/kalkulator.css';

type Objekt = 'haus' | 'wohnung' | 'gastro' | 'anderes';
type Quality = 'standard' | 'gehoben' | 'premium';

const OBJEKT_OPTIONS: Array<{ value: Objekt; label: string; baseFactor: number }> = [
  { value: 'haus',    label: 'Haus',        baseFactor: 1.0 },
  { value: 'wohnung', label: 'Wohnung',     baseFactor: 0.9 },
  { value: 'gastro',  label: 'Gastronomie', baseFactor: 1.25 },
  { value: 'anderes', label: 'Anderes',     baseFactor: 1.0 },
];

const QUALITY_OPTIONS: Array<{ value: Quality; label: string; multiplier: number; note: string }> = [
  { value: 'standard', label: 'Standard',  multiplier: 1.0,  note: 'Solide Materialien, klare Linie.' },
  { value: 'gehoben',  label: 'Gehoben',   multiplier: 1.35, note: 'Markenfabrikate, individuelle Details.' },
  { value: 'premium',  label: 'Premium',   multiplier: 1.75, note: 'Maßanfertigung, Naturmaterialien.' },
];

type Gewerk = { key: string; num: string; label: string; pricePerM2: number; lead: string };

const GEWERKE: Gewerk[] = [
  { key: 'rohbau',     num: '01', label: 'Rohbau / Abriss',     pricePerM2: 280, lead: 'Komplettabriss, Wände' },
  { key: 'bad',        num: '02', label: 'Bad & Sanitär',       pricePerM2: 420, lead: 'Wanne, Dusche, WC' },
  { key: 'kueche',     num: '03', label: 'Küche & Möbelbau',    pricePerM2: 380, lead: 'Schreinerei, Geräte' },
  { key: 'boden',      num: '04', label: 'Böden & Beläge',      pricePerM2: 140, lead: 'Parkett, Stein, Vinyl' },
  { key: 'maler',      num: '05', label: 'Wände & Maler',       pricePerM2: 95,  lead: 'Spachtel, Farben' },
  { key: 'elektro',    num: '06', label: 'Elektroinstallation', pricePerM2: 180, lead: 'Strom, Licht, KNX' },
  { key: 'sanitaer',   num: '07', label: 'Sanitärinstallation', pricePerM2: 150, lead: 'Wasser, Abwasser' },
  { key: 'heizung',    num: '08', label: 'Heizung / Energie',   pricePerM2: 240, lead: 'Wärmepumpe, FBH' },
  { key: 'fassade',    num: '09', label: 'Fassade / Dach',      pricePerM2: 320, lead: 'Putz, WDVS, Eindeckung' },
  { key: 'trockenbau', num: '10', label: 'Trockenbau',          pricePerM2: 110, lead: 'Wände, Decken' },
];

function formatTsd(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2).replace('.', ',')} Mio.`;
  return `${Math.round(n / 1000).toLocaleString('de-DE')} Tsd.`;
}

export default function Kalkulator() {
  const [objekt, setObjekt] = useState<Objekt>('wohnung');
  const [flaeche, setFlaeche] = useState<number>(120);
  const [quality, setQuality] = useState<Quality>('gehoben');
  const [picked, setPicked] = useState<string[]>(['bad', 'kueche', 'boden', 'elektro']);

  function toggle(key: string) {
    setPicked((p) => p.includes(key) ? p.filter(k => k !== key) : [...p, key]);
  }

  const { totalMid, totalMin, totalMax, perM2, objektFactor, qMult } = useMemo(() => {
    const objektFactor = OBJEKT_OPTIONS.find(o => o.value === objekt)?.baseFactor ?? 1;
    const qMult = QUALITY_OPTIONS.find(q => q.value === quality)?.multiplier ?? 1;
    const sumPerM2 = GEWERKE.filter(g => picked.includes(g.key))
      .reduce((acc, g) => acc + g.pricePerM2, 0);
    const adjustedPerM2 = sumPerM2 * objektFactor * qMult;
    const total = adjustedPerM2 * flaeche;
    return {
      totalMid: total,
      totalMin: total * 0.85,
      totalMax: total * 1.20,
      perM2: adjustedPerM2,
      objektFactor,
      qMult,
    };
  }, [objekt, flaeche, quality, picked]);

  const hasPicks = picked.length > 0 && flaeche > 0;
  const sliderPct = ((flaeche - 20) / (500 - 20)) * 100;

  return (
    <>
      {/* HERO */}
      <section
        className="page-intro kalk-intro"
        style={{ ['--page-intro-bg' as string]: 'url(/assets/img/photo-parkett-altbau.jpg)' }}
      >
        <div className="page-intro__inner">
          <div className="reveal">
            <div className="crumb"><span className="num">06</span> Kalkulator · Live-Schätzung</div>
            <h1>
              Was kostet<br />
              Ihr <em>Bauprojekt?</em>
            </h1>
          </div>
          <div className="reveal" data-delay="1">
            <p className="lede">
              Ein paar Klicks. Eine ehrliche Spanne. Auf Basis von Daten aus über 400 abgeschlossenen Projekten in Hessen und der Innerschweiz — ohne Anmeldung, ohne Verkaufstaktik.
            </p>
            <ul className="meta-list">
              <li>Berechnung<span>Live, in Echtzeit</span></li>
              <li>Datenbasis<span>412 reale Projekte</span></li>
              <li>Genauigkeit<span>± 15 % Vorab-Spanne</span></li>
              <li>Festpreis<span>Auf Wunsch in 24 Std.</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* BOARD + RESULT */}
      <section className="kalkulator">
        <div className="kalkulator__inner">
          <div className="kalk-board">

            <div className="kalk-board__field reveal">
              <div className="kalk-board__field-head">
                <span className="kalk-board__num">01</span>
                <span className="kalk-board__label">Objektart</span>
                <span className="kalk-board__hint">Bestimmt den Komplexitäts­faktor</span>
              </div>
              <div className="kalk-chips">
                {OBJEKT_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    className={`kalk-chip${o.value === objekt ? ' is-on' : ''}`}
                    onClick={() => setObjekt(o.value)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="kalk-board__field reveal" data-delay="1">
              <div className="kalk-board__field-head">
                <span className="kalk-board__num">02</span>
                <span className="kalk-board__label">Fläche</span>
                <span className="kalk-board__value-large">
                  {flaeche}<small>m²</small>
                </span>
              </div>
              <div className="kalk-slider-wrap" style={{ ['--pct' as string]: `${sliderPct}%` }}>
                <input
                  className="kalk-slider"
                  type="range"
                  min={20}
                  max={500}
                  step={5}
                  value={flaeche}
                  onChange={(e) => setFlaeche(Number(e.target.value))}
                  aria-label="Fläche in Quadratmetern"
                />
                <div className="kalk-slider__scale">
                  <span>20</span>
                  <span>100</span>
                  <span>200</span>
                  <span>350</span>
                  <span>500</span>
                </div>
              </div>
            </div>

            <div className="kalk-board__field reveal">
              <div className="kalk-board__field-head">
                <span className="kalk-board__num">03</span>
                <span className="kalk-board__label">Ausbaustandard</span>
                <span className="kalk-board__hint">Material- &amp; Verarbeitungsniveau</span>
              </div>
              <div className="kalk-quality">
                {QUALITY_OPTIONS.map((q) => (
                  <button
                    key={q.value}
                    type="button"
                    className={`kalk-quality__opt${q.value === quality ? ' is-on' : ''}`}
                    onClick={() => setQuality(q.value)}
                  >
                    <span className="kalk-quality__mult">× {q.multiplier.toFixed(2).replace('.', ',')}</span>
                    <span className="kalk-quality__label">{q.label}</span>
                    <span className="kalk-quality__note">{q.note}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="kalk-board__field reveal" data-delay="1">
              <div className="kalk-board__field-head">
                <span className="kalk-board__num">04</span>
                <span className="kalk-board__label">Gewerke</span>
                <span className="kalk-board__counter">
                  <em>{picked.length}</em> von {GEWERKE.length} gewählt
                </span>
              </div>
              <ul className="kalk-trades">
                {GEWERKE.map((g) => {
                  const on = picked.includes(g.key);
                  return (
                    <li key={g.key} className={`kalk-trades__item${on ? ' is-on' : ''}`}>
                      <button type="button" onClick={() => toggle(g.key)} aria-pressed={on}>
                        <span className="kalk-trades__check" aria-hidden="true"></span>
                        <span className="kalk-trades__num">{g.num}</span>
                        <span className="kalk-trades__body">
                          <span className="kalk-trades__name">{g.label}</span>
                          <span className="kalk-trades__lead">{g.lead}</span>
                        </span>
                        <span className="kalk-trades__price">€ {g.pricePerM2}<small>/m²</small></span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

          </div>

          <aside className="kalk-result">
            <div className="kalk-result__sticky">
              <div className="kalk-result__head">
                <div className="kalk-result__eyebrow">
                  <span className="rule-red"></span>
                  Live-Schätzung
                </div>
                {hasPicks ? (
                  <>
                    <div className="kalk-result__range">
                      <span className="kalk-result__from">
                        <small>ab</small>
                        <strong>€ {formatTsd(totalMin)}</strong>
                      </span>
                      <span className="kalk-result__dash">—</span>
                      <span className="kalk-result__to">
                        <small>bis</small>
                        <strong>€ {formatTsd(totalMax)}</strong>
                      </span>
                    </div>
                    <div className="kalk-result__meta">
                      <span><small>Mittelwert</small> € {formatTsd(totalMid)}</span>
                      <span><small>pro m²</small> € {Math.round(perM2).toLocaleString('de-DE')}</span>
                    </div>
                  </>
                ) : (
                  <div className="kalk-result__empty-state">
                    <div className="kalk-result__placeholder">— — —</div>
                    <p>Wählen Sie mindestens ein Gewerk, um eine erste Spanne zu sehen.</p>
                  </div>
                )}
              </div>

              {hasPicks && (
                <div className="kalk-result__breakdown">
                  <div className="kalk-result__breakdown-head">
                    <span>Aufstellung</span>
                    <span>nach Gewerk</span>
                  </div>
                  <ul>
                    {GEWERKE.filter(g => picked.includes(g.key)).map((g) => {
                      const sub = g.pricePerM2 * flaeche * objektFactor * qMult;
                      return (
                        <li key={g.key}>
                          <span className="kalk-result__row-num">{g.num}</span>
                          <span className="kalk-result__row-name">{g.label}</span>
                          <span className="kalk-result__row-value">€ {formatTsd(sub)}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              <p className="kalk-result__disclaimer">
                Vorab-Schätzung auf Basis von Erfahrungswerten — exklusive Sondergewerke, Genehmigungen und Bauleitungspauschale. Verbindliche Preise nach Aufmaß vor Ort.
              </p>

              <div className="kalk-result__actions">
                <Link className="btn btn--solid" to="/blitz-angebot">
                  Verbindliches Angebot <span className="arrow">&gt;</span>
                </Link>
                <Link className="btn btn--light kalk-result__btn-light" to="/kontakt">
                  Termin vereinbaren <span className="arrow">&gt;</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
