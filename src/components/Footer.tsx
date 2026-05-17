import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="pv-footer">
      <div className="pv-footer__inner">
        <div className="pv-footer__grid">
          <div className="pv-footer__brand">
            <Link className="pv-logo" to="/" aria-label="Prima Vista">
              <img src="/assets/img/logo.png" alt="" style={{ filter: 'brightness(1.2)' }} />
              <span className="pv-logo__txt">
                <span className="pv-logo__name">Prima Vista</span>
                <span className="pv-logo__tag">Bauprojekte</span>
              </span>
            </Link>
            <p className="pv-footer__brand-blurb">
              Sanierung &amp; Renovierung aus einer Hand &mdash; für Wohnsitz und Gastronomie, in Frankfurt und Emmenbrücke.
            </p>
          </div>
          <div>
            <h4>Standorte</h4>
            <p>
              <strong style={{ color: 'var(--pv-bone)', fontWeight: 500 }}>Frankfurt</strong>
              <br />
              Hessen, Deutschland
              <br />
              +49 69 0000 0000
            </p>
            <p style={{ marginTop: 16 }}>
              <strong style={{ color: 'var(--pv-bone)', fontWeight: 500 }}>Emmenbrücke</strong>
              <br />
              Luzern, Schweiz
              <br />
              +41 41 000 00 00
            </p>
          </div>
          <div>
            <h4>Leistungen</h4>
            <ul>
              <li><Link to="/komplett-pakete">Komplett-Pakete</Link></li>
              <li><Link to="/gewerke">Gewerke</Link></li>
              <li><Link to="/projekte">Projekte</Link></li>
              <li><Link to="/kontakt">Service</Link></li>
              <li><Link to="/kontakt">Blitz-Angebote</Link></li>
            </ul>
          </div>
          <div>
            <h4>Kontakt</h4>
            <ul>
              <li><Link to="/kontakt">Termin vereinbaren</Link></li>
              <li><Link to="/kontakt">Anfrage senden</Link></li>
              <li><Link to="/kontakt">Über uns</Link></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="pv-footer__bottom">
          <small>© 2026 Prima Vista Bauprojekte GmbH</small>
          <div className="pv-footer__legal">
            <a href="#">Impressum</a>
            <a href="#">Datenschutz</a>
            <a href="#">AGB</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
