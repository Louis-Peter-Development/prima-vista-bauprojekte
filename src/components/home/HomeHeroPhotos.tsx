import { Link } from 'react-router-dom';

const HERO_END_PHOTOS = [
  {
    src: '/assets/img/leistungen/rohbau-trockenbau-01.webp',
    alt: 'Rohbaufläche mit Betonwänden und vorbereiteten Leitungen',
    label: 'Rohbau',
    to: '/rohbau-abbruch',
    width: 1200,
    height: 900,
  },
  {
    src: '/assets/img/leistungen/badsanierung-05.webp',
    alt: 'Modernisiertes Bad mit Dusche und WC',
    label: 'Bad',
    to: '/badsanierung',
    width: 1200,
    height: 1600,
  },
  {
    src: '/assets/img/leistungen/kuechen-moebelbau-02.webp',
    alt: 'Küche mit Insel und maßgefertigten Einbauten',
    label: 'Küche',
    to: '/kuechen-moebelbau',
    width: 1402,
    height: 1122,
  },
  {
    src: '/assets/img/proj-zoi-01.webp',
    alt: 'Ausgebautes Gastronomieprojekt mit dekorativer Wandgestaltung',
    label: 'Gastronomie',
    to: '/projekte',
    width: 1600,
    height: 1200,
  },
];

export default function HomeHeroPhotos() {
  return (
    <section className="home-hero-photos" aria-label="Projektfotos">
      <ul className="home-hero-photos__grid">
        {HERO_END_PHOTOS.map((photo) => (
          <li className="home-hero-photos__tile" key={photo.src}>
            <Link className="home-hero-photos__link" to={photo.to}>
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                decoding="async"
              />
              <span className="home-hero-photos__label">
                {photo.label}
                <svg className="home-hero-photos__arrow" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
