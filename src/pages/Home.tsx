import { Link } from 'react-router-dom';
import Counter from '../components/Counter';
import FeaturedProjects from '../components/home/FeaturedProjects';
import GoogleReviews from '../components/home/GoogleReviews';
import HomeHero from '../components/home/HomeHero';
import HomeMarquee from '../components/home/HomeMarquee';
import HomeKalkulatorLive from '../components/home/HomeKalkulatorLive';
import HomeBlitzLive from '../components/home/HomeBlitzLive';
import { TRADES_PREVIEW } from '../data/home';
import { PREVIEW_IMAGES } from '../data/gewerke';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/home.css';

export default function Home() {
  usePageTitle('Premium Sanierung & Bau in Frankfurt und Emmenbrücke');
  return (
    <>
      <HomeHero />
      <HomeMarquee />

      {/* PROMISE */}
      <section className="promise">
        <div className="promise__inner">
          <div className="reveal">
            <div className="promise__num">№ 01 — Versprechen</div>
            <h2 className="promise__title">
              Verantwortung<br />
              <em>aus einer</em><br />
              Hand.
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
            <h2>
              Drei Wege zum<br />
              fertigen <em>Raum.</em>
            </h2>
          </div>
          <p className="reveal" data-delay="1">
            Ob Einzimmer-Refresh oder Generalsanierung: jedes Paket bündelt Planung, Bauleitung und alle Gewerke — mit klarem Preis und festem Endtermin.
          </p>
        </div>
        <div className="packages__grid">
          <Link className="pkg-card reveal" data-delay="1" to="/haus-sanierung">
            <img src="/assets/img/photo-haus-exterior-thumb.webp" alt="Haus-Sanierung" loading="lazy" />
            <div className="pkg-card__body">
              <span className="pkg-card__num">№ 01 — Komplett</span>
              <h3 className="pkg-card__title">Haus-<br />Sanierung</h3>
              <p className="pkg-card__desc">Generalsanierung von Bestandsbauten — Dach, Fassade, Innenausbau aus einer Hand.</p>
              <span className="pkg-card__more">Mehr erfahren <span>&gt;</span></span>
            </div>
          </Link>
          <Link className="pkg-card reveal" data-delay="2" to="/wohnung-sanierung">
            <img src="/assets/img/photo-parkett-altbau-thumb.webp" alt="Wohnung-Sanierung" loading="lazy" />
            <div className="pkg-card__body">
              <span className="pkg-card__num">№ 02 — Modular</span>
              <h3 className="pkg-card__title">Wohnung-<br />Sanierung</h3>
              <p className="pkg-card__desc">Bäder, Küchen, Böden, Elektrik: Etagenwohnungen — bewohnbar in 6–10 Wochen.</p>
              <span className="pkg-card__more">Mehr erfahren <span>&gt;</span></span>
            </div>
          </Link>
          <Link className="pkg-card reveal" data-delay="3" to="/komplett-pakete">
            <img src="/assets/img/proj-moroccan-corner-thumb.webp" alt="Gastronomie-Ausbau" loading="lazy" />
            <div className="pkg-card__body">
              <span className="pkg-card__num">№ 03 — Konzept</span>
              <h3 className="pkg-card__title">Gastronomie-<br />Ausbau</h3>
              <p className="pkg-card__desc">Restaurants, Bars, Hotels: von der Konzeptphase bis zur Eröffnung — schlüsselfertig.</p>
              <span className="pkg-card__more">Mehr erfahren <span>&gt;</span></span>
            </div>
          </Link>
        </div>
      </section>

      <FeaturedProjects />

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
              <Counter className="stat__num" target={18} />
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

      {/* KALKULATOR — live interactive */}
      <section className="kalk">
        <div className="kalk__inner">
          <div className="kalk__head reveal">
            <div className="eyebrow eyebrow--on-dark"><span className="rule-red"></span>&nbsp;&nbsp;№ 05 · Kalkulator</div>
            <h2>
              Live-Schätzung.<br />
              In <em>Sekunden.</em>
            </h2>
            <p>
              Vier Klicks, eine Spanne: Objektart, Fläche, Ausbaustandard, Gewerke. Der Kalkulator rechnet in Echtzeit — keine Anmeldung, kein Telefonat. Eine erste Orientierung, sofort.
            </p>
            <ul className="kalk__steps">
              <li><span className="num">01</span>Objektart & Fläche wählen</li>
              <li><span className="num">02</span>Gewerke an- und abwählen</li>
              <li><span className="num">03</span>Spanne aktualisiert live</li>
            </ul>
            <div className="kalk__actions">
              <Link className="btn btn--solid" to="/kalkulator">
                Zum Kalkulator <span className="arrow">&gt;</span>
              </Link>
              <Link className="btn btn--dark" to="/kontakt">
                Termin vereinbaren <span className="arrow">&gt;</span>
              </Link>
            </div>
          </div>
          <HomeKalkulatorLive />
        </div>
      </section>

      {/* BLITZ-ANGEBOT — written 24h quote */}
      <section className="blitz-home">
        <div className="blitz-home__inner">
          <HomeBlitzLive />
          <div className="blitz-home__head reveal" data-delay="1">
            <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;№ 06 · Blitz-Angebot</div>
            <h2>
              Festpreis. Schwarz auf weiß.<br />
              In <em>24 Stunden.</em>
            </h2>
            <p>
              Etwas konkreter? Beantworten Sie ein Kurzformular — wir prüfen, kalkulieren und schicken eine schriftliche Vorab-Kostenschätzung, per Mail, von unserer Bauleitung gegengezeichnet.
            </p>
            <ul className="blitz-home__list">
              <li><span className="num">01</span>Kurzformular ausfüllen (3 Minuten)</li>
              <li><span className="num">02</span>Bauleitung prüft Substanz &amp; Gewerke</li>
              <li><span className="num">03</span>Schriftliches Angebot in 24 Stunden</li>
            </ul>
            <div className="blitz-home__actions">
              <Link className="btn btn--solid" to="/blitz-angebot">
                Blitz-Angebot anfordern <span className="arrow">&gt;</span>
              </Link>
              <Link className="btn btn--light" to="/kontakt">
                Termin vereinbaren <span className="arrow">&gt;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRADES PREVIEW */}
      <section className="trades-preview">
        <div className="trades-preview__head">
          <div className="reveal">
            <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;Gewerke</div>
            <h2>
              Neunzehn Gewerke,<br />
              <em>eine Hand.</em>
            </h2>
          </div>
          <p className="reveal" data-delay="1">
            Jedes Gewerk koordiniert durch unsere eigene Bauleitung — einzeln buchbar oder als Komplettpaket. Hier ein Auszug der am häufigsten gefragten Disziplinen.
          </p>
        </div>
        <ul className="trades-preview__grid">
          {TRADES_PREVIEW.map((t, i) => (
            <li key={t.num} className="trade-chip reveal" data-delay={i % 4 || undefined}>
              <Link className="trade-chip__link" to={t.detailTo ?? '/gewerke'}>
                <span className="trade-chip__thumb">
                  <img src={PREVIEW_IMAGES[t.key]} alt="" loading="lazy" />
                </span>
                <span className="trade-chip__body">
                  <span className="trade-chip__num">{t.num}</span>
                  <span className="trade-chip__name">{t.name}</span>
                  <span className="trade-chip__lead">{t.lead}</span>
                  {t.detailTo ? <span className="trade-chip__more">Kostenrechner öffnen ›</span> : null}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="trades-preview__more reveal">
          <Link className="btn btn--light" to="/gewerke">
            Alle 19 Gewerke ansehen <span className="arrow">&gt;</span>
          </Link>
        </div>
      </section>

      {/* HEATING */}
      <section className="heating">
        <div className="heating__head reveal">
          <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;Moderne Heizmethoden</div>
          <h2>
            Bereit für die <em>Zukunft.</em>
          </h2>
          <p>
            Rüsten Sie mit unseren Paketen auf innovative Heizmethoden auf — förderfähig, geräuscharm und unabhängig vom Gas.
          </p>
        </div>
        <div className="heating__grid">
          <Link className="heat-card reveal" to="/waermepumpe">
            <div className="heat-card__photo">
              <img src="/assets/img/proj-stairs-concrete.webp" alt="Luftwärmepumpe" loading="lazy" />
            </div>
            <div className="heat-card__body">
              <span className="heat-card__num">№ 01</span>
              <h3 className="heat-card__title">Luftwärme-<br />pumpe</h3>
              <p className="heat-card__desc">Bis zu 70 % Energieersparnis. Bestandsumstellung in 7–10 Tagen, BAFA-förderfähig.</p>
              <span className="heat-card__more">Mehr erfahren <span>&gt;</span></span>
            </div>
          </Link>
          <Link className="heat-card reveal" data-delay="1" to="/heizstraenge">
            <div className="heat-card__photo">
              <img src="/assets/img/proj-floor-oak.webp" alt="Heizungsstränge" loading="lazy" />
            </div>
            <div className="heat-card__body">
              <span className="heat-card__num">№ 02</span>
              <h3 className="heat-card__title">Heizungs-<br />stränge</h3>
              <p className="heat-card__desc">Vertikale Stränge mit hydraulischem Abgleich — präzise Wärmeverteilung, geringere Pumpenleistung.</p>
              <span className="heat-card__more">Mehr erfahren <span>&gt;</span></span>
            </div>
          </Link>
          <Link className="heat-card reveal" data-delay="2" to="/heizkoerper">
            <div className="heat-card__photo">
              <img src="/assets/img/proj-spa-corridor.webp" alt="Heizkörper" loading="lazy" />
            </div>
            <div className="heat-card__body">
              <span className="heat-card__num">№ 03</span>
              <h3 className="heat-card__title">Design-<br />Heizkörper</h3>
              <p className="heat-card__desc">Architektonisch integrierte Flachheizkörper aus Aluminium — schlank, leise, niedertemperaturtauglich.</p>
              <span className="heat-card__more">Mehr erfahren <span>&gt;</span></span>
            </div>
          </Link>
        </div>
        <div className="heating__more reveal">
          <Link className="btn btn--light" to="/heizmethoden">
            Alle Heizmethoden ansehen <span className="arrow">&gt;</span>
          </Link>
        </div>
      </section>

      {/* FOUNDERS */}
      <section className="founders" id="ueber-uns">
        <div className="founders__inner">
          <div className="founders__photo reveal reveal--left">
            <img src="/assets/img/founders.webp" alt="Daniel und Monica — Gründer Prima Vista Bauprojekte" loading="lazy" />
            <div className="founders__photo-label">
              <span>Daniel &amp; Monica — Frankfurt, 2026</span>
            </div>
          </div>
          <div className="founders__body reveal reveal--right" data-delay="1">
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

      {/* TESTIMONIAL */}
      <GoogleReviews
        fallback={{
          quote:
            'Wir hatten Angst vor der Sanierung — und wurden überrascht: Prima Vista lieferte pünktlich, sauber und so präzise, dass wir schon einen Monat früher einziehen konnten.',
          name: 'Familie Brauer',
          meta: 'Komplettsanierung Eigentumswohnung · Sachsenhausen',
        }}
      />

      {/* FINAL CTA */}
      <section className="end-cta">
        <div className="end-cta__inner reveal-group">
          <h2>
            Lassen Sie uns über<br />
            Ihr <em>Bauprojekt</em> reden.
          </h2>
          <p>
            Erste Beratung kostenlos. Termin innerhalb von 48 Stunden, vor Ort oder per Video — in Frankfurt und Emmenbrücke.
          </p>
          <div className="end-cta__buttons">
            <Link className="btn btn--dark btn--shimmer" to="/kontakt">
              Termin vereinbaren <span className="arrow">&gt;</span>
            </Link>
            <Link className="btn btn--dark" to="/kalkulator">
              Zum Kalkulator <span className="arrow">&gt;</span>
            </Link>
            <Link className="btn btn--dark" to="/blitz-angebot">
              Blitz-Angebot <span className="arrow">&gt;</span>
            </Link>
            <a className="btn btn--dark" href="tel:+4915789818308" style={{ borderColor: 'rgba(236, 229, 223, .25)' }}>
              +49 1578 98 18 308
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
