import { Link, useLocation } from 'react-router-dom';
import { ChatIcon, FacebookIcon, InstagramIcon, MailIcon, YoutubeIcon } from './icons';

export default function Footer() {
  const { pathname } = useLocation();
  return (
    <footer className="pv-footer">
      <div className="pv-footer__inner">
        <div className="pv-footer__grid">
          <div className="pv-footer__brand">
            <Link
              className="pv-logo"
              to="/"
              aria-label="Prima Vista"
              onClick={() => {
                if (pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <img src="/assets/img/logo.png" alt="" width="1085" height="1051" loading="lazy" style={{ filter: 'brightness(1.2)' }} />
              <span className="pv-logo__txt">
                <span className="pv-logo__name">Prima Vista</span>
                <span className="pv-logo__tag">Bauprojekte</span>
              </span>
            </Link>
            <p className="pv-footer__brand-blurb">
              Sanierung &amp; Renovierung aus einer Hand &mdash; für Wohnsitz und Gastronomie, in Frankfurt und Emmenbrücke.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <Link className="pv-footer__contact-icon pv-footer__contact-icon--text" to="/#ueber-uns" title="Über uns" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', color: 'inherit', textDecoration: 'none'
              }}>
                PV
              </Link>
              <a className="pv-footer__contact-icon" href="https://www.instagram.com/primavista.bauprojekte" target="_blank" rel="noopener noreferrer" title="Instagram" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', color: 'inherit', textDecoration: 'none'
              }}>
                <InstagramIcon />
              </a>
              <a className="pv-footer__contact-icon" href="https://www.facebook.com/profile.php?id=61584837772416" target="_blank" rel="noopener noreferrer" title="Facebook" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', color: 'inherit', textDecoration: 'none'
              }}>
                <FacebookIcon />
              </a>
              <a className="pv-footer__contact-icon" href="https://www.youtube.com/@PrimaVistaBauprojekte" target="_blank" rel="noopener noreferrer" title="YouTube" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', color: 'inherit', textDecoration: 'none'
              }}>
                <YoutubeIcon />
              </a>
            </div>
          </div>
          <div>
            <h3>Standorte</h3>
            <ul className="pv-footer__contact-list">
              <li>
                <div className="pv-footer__contact-link pv-footer__contact-link--static">
                  <span className="pv-footer__contact-icon pv-footer__contact-icon--text" aria-hidden="true">DE</span>
                  <span>
                    <strong>Frankfurt</strong>
                    <br />
                    Gref-Völsing-Strasse 13
                    <br />
                    60314 Frankfurt
                    <br />
                    Deutschland
                    <br />
                    <a href="tel:+4915789818308">+49 1578 98 18 308</a>
                  </span>
                </div>
              </li>
              <li>
                <div className="pv-footer__contact-link pv-footer__contact-link--static">
                  <span className="pv-footer__contact-icon pv-footer__contact-icon--text" aria-hidden="true">CH</span>
                  <span>
                    <strong>Emmenbrücke</strong>
                    <br />
                    Spinnereistrasse 5
                    <br />
                    6020 Emmenbrücke
                    <br />
                    Schweiz
                    <br />
                    <a href="tel:+41782659332">+41 78 265 93 32</a>
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3>Leistungen</h3>
            <ul className="pv-footer__contact-list">
              <li>
                <Link className="pv-footer__contact-link" to="/komplett-pakete">
                  <span className="pv-footer__contact-icon pv-footer__contact-icon--text" aria-hidden="true">01</span>
                  <span>Komplett-Pakete</span>
                </Link>
              </li>
              <li>
                <Link className="pv-footer__contact-link" to="/gewerke">
                  <span className="pv-footer__contact-icon pv-footer__contact-icon--text" aria-hidden="true">02</span>
                  <span>Gewerke</span>
                </Link>
              </li>
              <li>
                <Link className="pv-footer__contact-link" to="/heizmethoden">
                  <span className="pv-footer__contact-icon pv-footer__contact-icon--text" aria-hidden="true">03</span>
                  <span>Heizmethoden</span>
                </Link>
              </li>
              <li>
                <Link className="pv-footer__contact-link" to="/kalkulator">
                  <span className="pv-footer__contact-icon pv-footer__contact-icon--text" aria-hidden="true">04</span>
                  <span>Kalkulator</span>
                </Link>
              </li>
              <li>
                <Link className="pv-footer__contact-link" to="/projekte">
                  <span className="pv-footer__contact-icon pv-footer__contact-icon--text" aria-hidden="true">05</span>
                  <span>Projekte</span>
                </Link>
              </li>
              <li>
                <Link className="pv-footer__contact-link" to="/blitz-angebot">
                  <span className="pv-footer__contact-icon pv-footer__contact-icon--text" aria-hidden="true">06</span>
                  <span>Blitz-Angebote</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Kontakt</h3>
            <ul className="pv-footer__contact-list">
              <li>
                <Link className="pv-footer__contact-link" to="/kontakt">
                  <span className="pv-footer__contact-icon" aria-hidden="true"><ChatIcon /></span>
                  <span>Kontaktformular</span>
                </Link>
              </li>
              <li>
                <a className="pv-footer__contact-link" href="tel:+4915789818308">
                  <span className="pv-footer__contact-icon pv-footer__contact-icon--text" aria-hidden="true">DE</span>
                  <span>+49 1578 98 18 308</span>
                </a>
              </li>
              <li>
                <a className="pv-footer__contact-link" href="tel:+41782659332">
                  <span className="pv-footer__contact-icon pv-footer__contact-icon--text" aria-hidden="true">CH</span>
                  <span>+41 78 265 93 32</span>
                </a>
              </li>
              <li>
                <a className="pv-footer__contact-link" href="mailto:office@primavista-bauprojekte.com">
                  <span className="pv-footer__contact-icon" aria-hidden="true"><MailIcon /></span>
                  <span>office@primavista-bauprojekte.com</span>
                </a>
              </li>
              <li>
                <a className="pv-footer__contact-link" href="mailto:info@primavista-bauprojekte.ch">
                  <span className="pv-footer__contact-icon" aria-hidden="true"><MailIcon /></span>
                  <span>info@primavista-bauprojekte.ch</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pv-footer__bottom">
          <small>© 2026 Prima Vista Bauprojekte GmbH</small>
          <div className="pv-footer__legal">
            <Link to="/impressum">Impressum</Link>
            <Link to="/datenschutz">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
