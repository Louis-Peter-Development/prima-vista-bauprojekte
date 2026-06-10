import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/not-found.css';

const QUICK_LINKS = [
  { label: 'Komplett-Pakete', to: '/komplett-pakete' },
  { label: 'Gewerke', to: '/gewerke' },
  { label: 'Projekte', to: '/projekte' },
  { label: 'Kontakt', to: '/kontakt' },
];

export default function NotFound() {
  usePageTitle('Seite nicht gefunden');

  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <div className="not-found__inner">
        <div className="not-found__copy reveal">
          <p className="not-found__eyebrow">404 / Nicht gefunden</p>
          <h1 id="not-found-title">
            Diese Seite ist gerade nicht auf der Baustelle.
          </h1>
          <p className="not-found__lede">
            Der gesuchte Link ist veraltet, verschoben oder falsch geschrieben. Von hier aus kommen Sie schnell zurueck zu den wichtigsten Bereichen.
          </p>
          <div className="not-found__actions" aria-label="Naechste Schritte">
            <Link className="btn btn--solid" to="/">
              Zur Startseite <span className="arrow">&gt;</span>
            </Link>
            <Link className="btn btn--dark" to="/kontakt">
              Anfrage stellen <span className="arrow">&gt;</span>
            </Link>
          </div>
        </div>

        <aside className="not-found__panel reveal" data-delay="1" aria-label="Schnelleinstieg">
          <div className="not-found__code" aria-hidden="true">404</div>
          <nav className="not-found__links" aria-label="Beliebte Seiten">
            {QUICK_LINKS.map((link, index) => (
              <Link to={link.to} key={link.to}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>
      </div>
    </section>
  );
}
