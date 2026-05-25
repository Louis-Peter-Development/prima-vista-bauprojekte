import SectionEyebrow from '../common/SectionEyebrow';

const CITIES = [
  ['DE', 'Frankfurt am Main'],
  ['CH', 'Emmenbrücke / Luzern'],
  ['DE', 'Wiesbaden'],
  ['CH', 'Zug, Zürich'],
  ['DE', 'Darmstadt, Offenbach'],
  ['CH', 'Innerschweiz'],
];

export default function MapBand() {
  return (
    <section className="map-band">
      <div className="map-band__inner">
        <div className="reveal reveal--left">
          <SectionEyebrow onDark>Standorte</SectionEyebrow>
          <h2>
            Gebaut in zwei<br />
            Ländern, gleicher<br />
            <em>Anspruch.</em>
          </h2>
          <p>
            Von der Frankfurter Zentrale aus betreuen wir Projekte in ganz Hessen. Aus Emmenbrücke heraus die Innerschweiz. Beide Büros teilen Bauleiter, Lieferanten und Standards.
          </p>
          <ul className="map-band__cities">
            {CITIES.map(([country, city]) => (
              <li key={`${country}-${city}`}><span className="num">{country}</span><span className="city">{city}</span></li>
            ))}
          </ul>
        </div>
        <div className="map-band__photo reveal reveal--right" data-delay="1">
          <img src="/assets/img/proj-team-jacket.webp" alt="Prima Vista Team auf der Baustelle" width="900" height="1600" loading="lazy" />
          <div className="map-band__photo-label">
            <span>Team Frankfurt — 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}
