import { Link } from 'react-router-dom';
import { FacebookIcon, InstagramIcon, MailIcon } from './icons';

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
            <h4>Leistungen</h4>
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
                <Link className="pv-footer__contact-link" to="/projekte">
                  <span className="pv-footer__contact-icon pv-footer__contact-icon--text" aria-hidden="true">03</span>
                  <span>Projekte</span>
                </Link>
              </li>
              <li>
                <Link className="pv-footer__contact-link" to="/kontakt">
                  <span className="pv-footer__contact-icon pv-footer__contact-icon--text" aria-hidden="true">04</span>
                  <span>Service</span>
                </Link>
              </li>
              <li>
                <Link className="pv-footer__contact-link" to="/kontakt">
                  <span className="pv-footer__contact-icon pv-footer__contact-icon--text" aria-hidden="true">05</span>
                  <span>Blitz-Angebote</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Kontakt</h4>
            <ul className="pv-footer__contact-list">
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
              <li>
                <Link className="pv-footer__contact-link" to="/#ueber-uns">
                  <span className="pv-footer__contact-icon pv-footer__contact-icon--text" aria-hidden="true">PV</span>
                  <span>Über uns</span>
                </Link>
              </li>
              <li>
                <a className="pv-footer__contact-link" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <span className="pv-footer__contact-icon" aria-hidden="true"><InstagramIcon /></span>
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a className="pv-footer__contact-link" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <span className="pv-footer__contact-icon" aria-hidden="true"><FacebookIcon /></span>
                  <span>Facebook</span>
                </a>
              </li>
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
