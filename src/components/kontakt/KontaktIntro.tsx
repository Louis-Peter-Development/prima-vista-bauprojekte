import { MailIcon, PhoneIcon } from '../icons';

export default function KontaktIntro() {
  return (
    <div className="kontakt__intro reveal reveal--left">
      <div className="crumb crumb--on-dark"><span className="num">05</span> Kontakt</div>
      <h1>
        Sprechen wir<br />
        über Ihr<br />
        <em>Bauprojekt.</em>
      </h1>
      <p>
        Erste Beratung kostenlos und unverbindlich. Termin in 48 Stunden, vor Ort oder per Video — wir hören erst zu, dann skizzieren wir.
      </p>

      <div className="kontakt__channels">
        <div className="kontakt__channel">
          <div className="kontakt__channel-icon"><PhoneIcon /></div>
          <div className="kontakt__channel-body">
            <h4 className="kontakt__channel-label">Telefon</h4>
            <p className="kontakt__channel-val">
              <a href="tel:+4915789818308">+49 1578 98 18 308</a>
              <br />
              <a href="tel:+41782659332">+41 78 265 93 32</a>
            </p>
            <p className="kontakt__channel-meta">Mo–Fr · 08:00–18:00 · DE / CH</p>
          </div>
        </div>
        <div className="kontakt__channel">
          <div className="kontakt__channel-icon"><MailIcon /></div>
          <div className="kontakt__channel-body">
            <h4 className="kontakt__channel-label">E-Mail</h4>
            <p className="kontakt__channel-val">
              <a href="mailto:office@primavista-bauprojekte.com">office@primavista-bauprojekte.com</a>
              <br />
              <a href="mailto:info@primavista-bauprojekte.ch">info@primavista-bauprojekte.ch</a>
            </p>
            <p className="kontakt__channel-meta">Antwort innerhalb von 24 Stunden — werktags.</p>
          </div>
        </div>
        <div className="kontakt__channel">
          <div className="kontakt__channel-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
          </div>
          <div className="kontakt__channel-body">
            <h4 className="kontakt__channel-label">Erstgespräch</h4>
            <p className="kontakt__channel-val">Termin in 48 Stunden</p>
            <p className="kontakt__channel-meta">Kostenlos &amp; unverbindlich · vor Ort oder per Video.</p>
          </div>
        </div>
      </div>

      <div className="kontakt__offices">
        <div className="kontakt__office">
          <h4>Frankfurt — DE</h4>
          <p><strong>Prima Vista Bauprojekte</strong><br />
            Gref-Völsing-Strasse 13<br />
            60314 Frankfurt<br />
            Deutschland<br />
            <a href="tel:+4915789818308">+49 1578 98 18 308</a></p>
        </div>
        <div className="kontakt__office">
          <h4>Emmenbrücke — CH</h4>
          <p><strong>Prima Vista Bauprojekte AG</strong><br />
            Spinnereistrasse 5<br />
            6020 Emmenbrücke<br />
            Schweiz<br />
            <a href="tel:+41782659332">+41 78 265 93 32</a></p>
        </div>
      </div>

      <figure className="kontakt__media">
        <img src="/assets/img/photo-office-light.webp" alt="Heller Besprechungsraum für die Projektberatung" loading="lazy" />
        <figcaption>
          <span className="num">№ 05</span>
          <span>Erstberatung · Frankfurt &amp; Emmenbrücke</span>
        </figcaption>
      </figure>
    </div>
  );
}
