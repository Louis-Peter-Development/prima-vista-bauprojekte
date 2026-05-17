import { Link } from 'react-router-dom';
import Counter from '../components/Counter';
import { useLightbox, type LightboxItem } from '../components/Lightbox';
import '../styles/pages/home.css';

const TRADES = [
  'Sanierung', 'Renovierung', 'Gastronomie-Ausbau', 'Bäder', 'Küchen', 'Böden',
  'Elektro', 'Heizung', 'Fassade', 'Maler & Lack', 'Treppen', 'Trockenbau',
];

const FEATURED: Array<LightboxItem & { gridClass: string; year: string; alt: string; revealDelay?: number }> = [
  {
    src: '/assets/img/proj-moroccan-dining.jpg',
    title: 'Riad — Gastronomie · Frankfurt · 2025',
    year: '2025',
    alt: 'Riad Restaurant Frankfurt',
    gridClass: 'proj--a',
  },
  {
    src: '/assets/img/proj-concrete-sofa-tall.jpg',
    title: 'Villa Sichtbeton — Wohnsitz · Luzern · 2024',
    year: '2024',
    alt: 'Villa Sichtbeton Luzern',
    gridClass: 'proj--b',
    revealDelay: 1,
  },
  {
    src: '/assets/img/proj-kitchen-oak.jpg',
    title: 'Küche Eichenholz — Wohnsitz · Frankfurt · 2025',
    year: '2025',
    alt: 'Küche Eichenholz Frankfurt',
    gridClass: 'proj--c',
  },
  {
    src: '/assets/img/proj-spa-bath.jpg',
    title: 'Spa-Bad — Hotel · Emmenbrücke · 2025',
    year: '2025',
    alt: 'Spa-Bad Hotel',
    gridClass: 'proj--d',
    revealDelay: 1,
  },
  {
    src: '/assets/img/proj-lobby-tree.jpg',
    title: 'Lobby — Office · Frankfurt · 2026',
    year: '2026',
    alt: 'Lobby Office Frankfurt',
    gridClass: 'proj--e',
    revealDelay: 2,
  },
];

const FEATURED_TITLES: Record<string, string> = {
  'proj--a': 'Riad — Gastronomie',
  'proj--b': 'Villa Sichtbeton',
  'proj--c': 'Küche Eichenholz',
  'proj--d': 'Spa-Bad — Hotel',
  'proj--e': 'Office Lobby',
};

export default function Home() {
  const { open } = useLightbox();
  const items: LightboxItem[] = FEATURED.map((p) => ({ src: p.src, title: p.title }));

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero__inner">
          <div className="hero__topline">
            <span><span className="dot"></span>Frankfurt &amp; Emmenbrücke</span>
            <span>Sanierung &amp; Renovierung — Bauprojekte seit 2014</span>
            <span>N° 26 / Frühjahr 2026</span>
          </div>

          <h1 className="hero__headline">
            Räume, die <em>bleiben.</em><br />
            Handwerk <span className="amp">&amp;</span> <em>Vision</em>
          </h1>

          <div className="hero__meta">
            <div>
              <div className="hero__meta-num">01 — Editorial</div>
              <p className="hero__lede">
                <strong>Verwandeln Sie Ihr Zuhause in Ihren Traumort.</strong>{' '}
                Von der ersten Skizze bis zur finalen Fuge: Komplettsanierung für Haus, Wohnung und Gastronomie — Bauleitung und alle Materialien inklusive.
              </p>
            </div>
            <div></div>
            <div className="hero__cta">
              <small>Termin in 48 Stunden</small>
              <Link className="btn btn--light" to="/kontakt">
                Termin vereinbaren <span className="arrow">&gt;</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="hero__photo">
          <img className="kenburns" src="/assets/img/proj-moroccan-dining-wide.jpg" alt="Innenausbau eines orientalischen Restaurants — Prima Vista Bauprojekte" />
          <div className="hero__photo-cap">
            <span className="num">№ 142</span>
            <span className="ttl">Riad — Gastronomie-Ausbau · Frankfurt</span>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...TRADES, ...TRADES].map((label, i) => (
            <span className="marquee__item" key={`${label}-${i}`}>{label}</span>
          ))}
        </div>
      </section>

      {/* PROMISE */}
      <section className="promise">
        <div className="promise__inner">
          <div className="reveal">
            <div className="promise__num">№ 01 — Versprechen</div>
            <h2 className="promise__title">
              Eine Baustelle.<br />
              <em>Eine Adresse.</em><br />
              Ein Vertrag.
            </h2>
          </div>
          <div className="promise__copy reveal" data-delay="1">
            <p>
              Wir glauben an Sanierung ohne Übergaben: ein Generalunternehmer, der die Verantwortung für jedes Gewerk trägt — vom Rohbau bis zur Möbelfuge. Sie sprechen mit einem Ansprechpartner, der für alles bürgt.
            </p>
            <p>
              Diese Klarheit ist kein Komfort, sondern die Voraussetzung für Räume, die in fünfzehn Jahren noch dieselbe Ruhe ausstrahlen wie am ersten Tag.
            </p>
            <ul className="promise__list">
              <li><span className="num">01</span>Bauleitung inkl.</li>
              <li><span className="num">02</span>Alle Materialien</li>
              <li><span className="num">03</span>Festpreisgarantie</li>
              <li><span className="num">04</span>Termin in 48 Std.</li>
              <li><span className="num">05</span>Festes Endtermin-Datum</li>
              <li><span className="num">06</span>5 Jahre Werksgewähr</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="packages">
        <div className="packages__head">
          <div className="reveal">
            <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;Komplett-Pakete</div>
            <h2 style={{ marginTop: 24 }}>
              Drei Wege zum<br />
              fertigen <em>Raum.</em>
            </h2>
          </div>
          <p className="reveal" data-delay="1">
            Ob Einzimmer-Refresh oder Generalsanierung: jedes Paket bündelt Planung, Bauleitung und alle Gewerke — mit klarem Preis und festem Endtermin.
          </p>
        </div>
        <div className="packages__grid">
          <Link className="pkg-card reveal" data-delay="1" to="/komplett-pakete">
            <img src="/assets/img/photo-haus-clean.jpg" alt="Haus-Sanierung" />
            <div className="pkg-card__body">
              <span className="pkg-card__num">№ 01 — Komplett</span>
              <h3 className="pkg-card__title">Haus-<br />Sanierung</h3>
              <p className="pkg-card__desc">Generalsanierung von Bestandsbauten — Dach, Fassade, Innenausbau aus einer Hand.</p>
              <span className="pkg-card__more">Mehr erfahren <span>&gt;</span></span>
            </div>
          </Link>
          <Link className="pkg-card reveal" data-delay="2" to="/komplett-pakete">
            <img src="/assets/img/photo-wohnung-clean.jpg" alt="Wohnung-Sanierung" />
            <div className="pkg-card__body">
              <span className="pkg-card__num">№ 02 — Modular</span>
              <h3 className="pkg-card__title">Wohnung-<br />Sanierung</h3>
              <p className="pkg-card__desc">Bäder, Küchen, Böden, Elektrik: Etagenwohnungen — bewohnbar in 6–10 Wochen.</p>
              <span className="pkg-card__more">Mehr erfahren <span>&gt;</span></span>
            </div>
          </Link>
          <Link className="pkg-card reveal" data-delay="3" to="/komplett-pakete">
            <img src="/assets/img/proj-moroccan-corner.jpg" alt="Gastronomie-Ausbau" />
            <div className="pkg-card__body">
              <span className="pkg-card__num">№ 03 — Konzept</span>
              <h3 className="pkg-card__title">Gastronomie-<br />Ausbau</h3>
              <p className="pkg-card__desc">Restaurants, Bars, Hotels: von der Konzeptphase bis zur Eröffnung — schlüsselfertig.</p>
              <span className="pkg-card__more">Mehr erfahren <span>&gt;</span></span>
            </div>
          </Link>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stats__inner">
          <div className="stats__intro">
            <h2 className="reveal">
              Zwölf Jahre. <em>Eine Linie.</em>
            </h2>
            <p className="reveal" data-delay="1">
              Zahlen schaffen keine Räume — aber sie sagen, wie ernst wir den Auftrag nehmen. Hier ein nüchterner Schnitt durch unser Schaffen seit 2014.
            </p>
          </div>
          <div className="stats__grid">
            <div className="stat reveal">
              <span className="stat__label">Bauleitung seit</span>
              <Counter className="stat__num" target={2014} style={{ textAlign: 'left' }} />
              <span className="stat__desc">Gegründet von Daniel und Monica in Frankfurt am Main.</span>
            </div>
            <div className="stat reveal" data-delay="1">
              <span className="stat__label">Abgeschlossene Projekte</span>
              <Counter className="stat__num" target={412} />
              <span className="stat__desc">Von der Einliegerwohnung bis zum 220-Sitzplatz-Restaurant.</span>
            </div>
            <div className="stat reveal" data-delay="2">
              <span className="stat__label">Gewerke aus einer Hand</span>
              <Counter className="stat__num" target={20} />
              <span className="stat__desc">Vom Rohbau bis zum Schreiner — alles inhouse oder unter Vertrag.</span>
            </div>
            <div className="stat reveal" data-delay="3">
              <span className="stat__label">Termintreue</span>
              <Counter className="stat__num" target={98} suffix="%" />
              <span className="stat__desc">Festes Endtermin-Datum im Vertrag — sonst Konventionalstrafe.</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="featured">
        <div className="featured__head">
          <div className="reveal">
            <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;Ausgewählte Projekte</div>
            <h2 style={{ marginTop: 24 }}>
              Zuletzt aus der<br />
              <em>Werkstatt.</em>
            </h2>
          </div>
          <div className="meta reveal" data-delay="1">
            2024 — 2026<br />
            Frankfurt · Wiesbaden · Luzern
          </div>
        </div>

        <div className="featured__grid">
          {FEATURED.map((p, i) => (
            <a
              key={p.src}
              className={`proj ${p.gridClass} reveal`}
              data-delay={p.revealDelay}
              href={p.src}
              onClick={(e) => {
                e.preventDefault();
                open(items, i);
              }}
            >
              <img src={p.src} alt={p.alt} />
              <div className="proj__cap">
                <span className="ttl">{FEATURED_TITLES[p.gridClass]}</span>
                <span className="yr">{p.year}</span>
              </div>
            </a>
          ))}
        </div>

        <div className="featured__more reveal">
          <Link className="btn btn--light" to="/projekte">
            Alle Projekte ansehen <span className="arrow">&gt;</span>
          </Link>
        </div>
      </section>

      {/* FOUNDERS */}
      <section className="founders">
        <div className="founders__inner">
          <div className="founders__photo reveal">
            <img src="/assets/img/founders.jpg" alt="Daniel und Monica — Gründer Prima Vista Bauprojekte" />
            <div className="founders__photo-label">
              <span className="num">№ 00</span>
              <span>Daniel &amp; Monica — Frankfurt, 2026</span>
            </div>
          </div>
          <div className="founders__body reveal" data-delay="1">
            <div className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
              <span className="rule-red"></span>&nbsp;Über uns
            </div>
            <h2>
              Ein Bauunternehmen<br />
              geführt wie ein<br />
              <em>Familienbetrieb.</em>
            </h2>
            <p>
              Daniel und Monica führen Prima Vista seit 2014 — als Paar, als Bauleiter, als Ansprechpartner. Wer hier baut, redet nicht mit einem Callcenter, sondern mit den Menschen, deren Namen am Vertrag stehen.
            </p>
            <p>
              Von der Frankfurter Zentrale aus betreuen wir Projekte in Hessen; aus Emmenbrücke heraus die ganze Innerschweiz. Beide Büros teilen Materialien, Pläne und Standards — Sie bekommen überall denselben Anspruch.
            </p>
            <div className="founders__sig">
              <span className="founders__sig-name">Daniel &amp; Monica</span>
              <span className="founders__sig-role">Gründer &amp; Bauleitung</span>
            </div>
          </div>
        </div>
      </section>

      {/* HEATING */}
      <section className="heating">
        <div className="heating__head reveal">
          <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;Moderne Heizmethoden</div>
          <h2 style={{ marginTop: 24 }}>
            Bereit für die <em>Zukunft.</em>
          </h2>
          <p>
            Rüsten Sie mit unseren Paketen auf innovative Heizmethoden auf — förderfähig, geräuscharm und unabhängig vom Gas.
          </p>
        </div>
        <div className="heating__grid">
          <article className="heat-card reveal">
            <div className="heat-card__photo">
              <img src="/assets/img/photo-luftwaerme-clean.jpg" alt="Luftwärmepumpe" />
            </div>
            <div className="heat-card__body">
              <span className="heat-card__num">№ 01</span>
              <h3 className="heat-card__title">Luftwärme-<br />pumpe</h3>
              <p className="heat-card__desc">Bis zu 70 % Energieersparnis. Bestandsumstellung in 7–10 Tagen, BAFA-förderfähig.</p>
              <span className="heat-card__more">Mehr erfahren <span>&gt;</span></span>
            </div>
          </article>
          <article className="heat-card reveal" data-delay="1">
            <div className="heat-card__photo">
              <img src="/assets/img/photo-heizstraenge-clean.jpg" alt="Heizungsstränge" />
            </div>
            <div className="heat-card__body">
              <span className="heat-card__num">№ 02</span>
              <h3 className="heat-card__title">Heizungs-<br />stränge</h3>
              <p className="heat-card__desc">Vertikale Stränge mit hydraulischem Abgleich — präzise Wärmeverteilung, geringere Pumpenleistung.</p>
              <span className="heat-card__more">Mehr erfahren <span>&gt;</span></span>
            </div>
          </article>
          <article className="heat-card reveal" data-delay="2">
            <div className="heat-card__photo">
              <img src="/assets/img/photo-heizkoerper-clean.jpg" alt="Heizkörper" />
            </div>
            <div className="heat-card__body">
              <span className="heat-card__num">№ 03</span>
              <h3 className="heat-card__title">Design-<br />Heizkörper</h3>
              <p className="heat-card__desc">Architektonisch integrierte Flachheizkörper aus Aluminium — schlank, leise, niedertemperaturtauglich.</p>
              <span className="heat-card__more">Mehr erfahren <span>&gt;</span></span>
            </div>
          </article>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="testimonial">
        <div className="testimonial__inner reveal">
          <div className="quote-mark">&ldquo;</div>
          <blockquote>
            Wir hatten Angst vor der Sanierung — und wurden überrascht: Prima Vista lieferte pünktlich, sauber und so präzise, dass wir <em>schon einen Monat früher</em> einziehen konnten.
          </blockquote>
          <div className="testimonial__attr">
            <span className="name">Familie Brauer</span>
            <span className="sep">·</span>
            <span>Komplettsanierung Eigentumswohnung · Sachsenhausen</span>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="end-cta">
        <div className="end-cta__inner reveal">
          <h2>
            Lassen Sie uns über<br />
            Ihr <em>Bauprojekt</em> reden.
          </h2>
          <p>
            Erste Beratung kostenlos. Termin innerhalb von 48 Stunden, vor Ort oder per Video — in Frankfurt und Emmenbrücke.
          </p>
          <div className="end-cta__buttons">
            <Link className="btn btn--dark" to="/kontakt">
              Termin vereinbaren <span className="arrow">&gt;</span>
            </Link>
            <a className="btn btn--dark" href="tel:+4969000000" style={{ borderColor: 'rgba(236, 229, 223, .25)' }}>
              +49 69 0000 0000
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
