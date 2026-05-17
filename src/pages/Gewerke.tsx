import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useLightbox, type LightboxItem } from '../components/Lightbox';
import '../styles/pages/gewerke.css';

type TradeKey =
  | 'bad' | 'kueche' | 'fassade' | 'dach' | 'elektro' | 'boden'
  | 'treppen' | 'heizung' | 'abdichtung' | 'maler' | 'trockenbau' | 'sanitaer';

const PREVIEW_IMAGES: Record<TradeKey, string> = {
  bad: '/assets/img/photo-badezimmer.jpg',
  kueche: '/assets/img/proj-kitchen-oak.jpg',
  fassade: '/assets/img/photo-fassade.jpg',
  dach: '/assets/img/photo-dach.jpg',
  elektro: '/assets/img/photo-elektro.jpg',
  boden: '/assets/img/proj-floor-oak.jpg',
  treppen: '/assets/img/proj-stairs-concrete.jpg',
  heizung: '/assets/img/photo-luftwaerme-clean.jpg',
  abdichtung: '/assets/img/photo-abdichtung.jpg',
  maler: '/assets/img/proj-paint-swatches.jpg',
  trockenbau: '/assets/img/proj-concrete-corner.jpg',
  sanitaer: '/assets/img/photo-heizstraenge-clean.jpg',
};

type TradeRow = { num: string; name: string; lead: string; key: TradeKey };

const TRADES: TradeRow[] = [
  { num: '01', name: 'Bäder & Sanitär',           lead: 'Wanne, Dusche, WC',     key: 'bad' },
  { num: '02', name: 'Küchen & Möbelbau',         lead: 'Schreinerei',           key: 'kueche' },
  { num: '03', name: 'Böden & Beläge',            lead: 'Parkett, Stein, Vinyl', key: 'boden' },
  { num: '04', name: 'Elektroinstallation',       lead: 'Strom, Licht, KNX',     key: 'elektro' },
  { num: '05', name: 'Sanitärinstallation',       lead: 'Wasser, Abwasser',      key: 'sanitaer' },
  { num: '06', name: 'Heizungsbau',               lead: 'Wärmepumpe, FBH',       key: 'heizung' },
  { num: '07', name: 'Trockenbau',                lead: 'Wände, Decken',         key: 'trockenbau' },
  { num: '08', name: 'Maler & Lackierer',         lead: 'Farben, Tapeten',       key: 'maler' },
  { num: '09', name: 'Fassadensanierung',         lead: 'Putz, WDVS',            key: 'fassade' },
  { num: '10', name: 'Dachsanierung',             lead: 'Eindeckung, Dämmung',   key: 'dach' },
  { num: '11', name: 'Abdichtung & Keller',       lead: 'Feuchtigkeit',          key: 'abdichtung' },
  { num: '12', name: 'Treppen & Geländer',        lead: 'Holz, Beton, Stahl',    key: 'treppen' },
  { num: '13', name: 'Fliesenleger',              lead: 'Bad, Küche, Bodenfliesen', key: 'kueche' },
  { num: '14', name: 'Stuckateur',                lead: 'Putz, Altbau-Profile',  key: 'trockenbau' },
  { num: '15', name: 'Estrich & Industrieboden',  lead: 'Zement, Anhydrit',      key: 'boden' },
  { num: '16', name: 'Glaser & Spiegel',          lead: 'Duschen, Fenster',      key: 'elektro' },
  { num: '17', name: 'Marmor & Naturstein',       lead: 'Platten, Sockel',       key: 'bad' },
  { num: '18', name: 'Tischlerei & Türen',        lead: 'Innen, Außen, Fenster', key: 'trockenbau' },
  { num: '19', name: 'Smart-Home & KNX',          lead: 'Licht, Audio, Klima',   key: 'elektro' },
  { num: '20', name: 'Garten & Außenanlagen',     lead: 'Terrasse, Wege',        key: 'fassade' },
];

const FEATURED: Array<{ src: string; title: string; count: string; heading: ReactNode; desc: string; feature?: boolean; revealDelay?: number }> = [
  {
    src: '/assets/img/photo-badezimmer.jpg',
    title: 'Badezimmer — Sanitär & Fliesen',
    count: '01 — 142 Projekte',
    heading: <>Bäder &amp;<br />Sanitär</>,
    desc: 'Komplettbäder von 4 bis 28 m². Fliesen, Sanitär, Heizkörper, Beleuchtung — aus einer Bestellung.',
    feature: true,
  },
  {
    src: '/assets/img/proj-kitchen-oak.jpg',
    title: 'Küchen & Möbelbau',
    count: '02 — 98 Projekte',
    heading: <>Küchen &amp;<br />Möbelbau</>,
    desc: 'Maßgefertigte Schreiner­küchen und Einbauten.',
    revealDelay: 1,
  },
  {
    src: '/assets/img/proj-floor-oak.jpg',
    title: 'Bodenbeläge',
    count: '03 — 187 Projekte',
    heading: <>Böden &amp;<br />Beläge</>,
    desc: 'Parkett, Vinyl, Naturstein, Estrich, Industrieboden.',
    revealDelay: 2,
  },
];

export default function Gewerke() {
  const { open } = useLightbox();
  const [active, setActive] = useState<TradeRow>(TRADES[0]);

  const featuredItems: LightboxItem[] = FEATURED.map((f) => ({ src: f.src, title: f.title }));

  return (
    <>
      <section className="page-intro">
        <div className="page-intro__inner">
          <div className="reveal">
            <div className="crumb"><span className="num">02</span> Gewerke · Bauleistungen</div>
            <h1>
              Zwanzig<br />
              Gewerke,<br />
              <em>eine Hand.</em>
            </h1>
          </div>
          <div className="reveal" data-delay="1">
            <p className="lede">
              Entdecken Sie individuelle Produkte, Baumaterialien und Komplettpakete für alle Gewerke — koordiniert durch unsere Bauleitung in Frankfurt und Emmenbrücke.
            </p>
            <ul className="meta-list">
              <li>Auswahl<span>20 Gewerke</span></li>
              <li>Koordination<span>Inhouse-Bauleitung</span></li>
              <li>Materialien<span>Inklusive Festpreis</span></li>
              <li>Garantie<span>5 Jahre</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="featured-trades">
        <div className="featured-trades__inner">
          <div className="featured-trades__head">
            <div className="reveal">
              <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;Am häufigsten gefragt</div>
              <h2 style={{ marginTop: 18 }}>
                Drei Gewerke, die fast<br />
                jedes Projekt <em>tragen.</em>
              </h2>
            </div>
            <p className="reveal" data-delay="1">
              Ob Komplettsanierung oder Einzelauftrag — drei Disziplinen sind in jedem zweiten Auftrag dabei. Mit eigenen Teams in Bad, Küche und Boden.
            </p>
          </div>
          <div className="featured-trades__grid">
            {FEATURED.map((card, i) => (
              <a
                key={card.src}
                className={`ft-card${card.feature ? ' ft-card--feature' : ''} reveal`}
                data-delay={card.revealDelay}
                href={card.src}
                onClick={(e) => { e.preventDefault(); open(featuredItems, i); }}
              >
                <img src={card.src} alt={card.title} />
                <div className="ft-card__body">
                  <span className="ft-card__count">{card.count}</span>
                  <h3 className="ft-card__title">{card.heading}</h3>
                  <p className="ft-card__desc">{card.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="trade-index">
        <div className="trade-index__head">
          <div className="reveal">
            <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;Alle Gewerke</div>
            <h2 style={{ marginTop: 18 }}>
              Das vollständige<br />
              <em>Verzeichnis.</em>
            </h2>
          </div>
          <p className="reveal" data-delay="1">
            Fahren Sie über einen Eintrag, um eine Vorschau zu sehen. Jedes Gewerk wird durch eigene Bauleitung koordiniert — Sie buchen einzeln oder gebündelt.
          </p>
        </div>

        <div className="trade-index__split">
          <div className="trade-index__preview">
            {(Object.keys(PREVIEW_IMAGES) as TradeKey[]).map((key) => (
              <img
                key={key}
                src={PREVIEW_IMAGES[key]}
                alt=""
                className={key === active.key ? 'is-active' : ''}
              />
            ))}
            <div className="trade-index__preview-cap">
              <span className="num">№ {active.num}</span>
              <span className="ttl">{active.name}</span>
            </div>
          </div>

          <ul className="trade-list">
            {TRADES.map((row) => (
              <li
                key={row.num}
                className={`trade-list__row${row === active ? ' is-active' : ''}`}
                onMouseEnter={() => setActive(row)}
                onClick={() => setActive(row)}
              >
                <span className="num">{row.num}</span>
                <span className="name">{row.name}</span>
                <span className="lead">{row.lead}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="process">
        <div className="process__inner">
          <div className="process__head">
            <div className="reveal">
              <div className="eyebrow eyebrow--on-dark"><span className="rule-red"></span>&nbsp;&nbsp;So arbeiten wir</div>
              <h2 style={{ marginTop: 18 }}>Vom Anruf bis zur<br />schlüssel­fertigen <em>Übergabe.</em></h2>
            </div>
            <p className="reveal" data-delay="1">
              Vier Etappen — jede mit fester Ansprechperson, festem Termin und schriftlichem Festpreis. Keine Stundenabrechnung, keine Übergaben zwischen Subunternehmern.
            </p>
          </div>
          <div className="process__steps">
            {[
              { num: '01', label: 'Erstgespräch', title: 'Aufnahme vor Ort',     desc: 'Termin in 48 Stunden. Wir messen, hören zu und skizzieren grobe Optionen.' },
              { num: '02', label: 'Festpreis',    title: 'Verbindliches Angebot', desc: 'Innerhalb von 14 Tagen erhalten Sie ein Festpreis-Angebot mit Endtermin.' },
              { num: '03', label: 'Bauphase',     title: 'Eine Bauleitung',       desc: 'Wöchentlicher Status, ein Ansprechpartner, alle Gewerke unter Vertrag.' },
              { num: '04', label: 'Übergabe',     title: 'Abnahme & Pflege',      desc: 'Schlüsselübergabe, Pflegeprotokoll, 5 Jahre Werks­gewähr — und Sie sind drin.' },
            ].map((step, i) => (
              <div key={step.num} className="process-step reveal" data-delay={i || undefined}>
                <span className="process-step__num">{step.num}</span>
                <span className="process-step__label">{step.label}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="end-cta-local">
        <div className="end-cta-local__inner reveal">
          <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;Bereit zu starten?</div>
          <h2 style={{ marginTop: 24 }}>
            Welches <em>Gewerk</em><br />steht bei Ihnen an?
          </h2>
          <Link className="btn btn--light" to="/kontakt">Anfrage senden <span className="arrow">&gt;</span></Link>
        </div>
      </section>
    </>
  );
}
