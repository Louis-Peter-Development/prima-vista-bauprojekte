import { useState, type FormEvent } from 'react';
import { MailIcon, PhoneIcon } from '../components/icons';
import '../styles/pages/kontakt.css';

type FormState = {
  vorname: string;
  nachname: string;
  email: string;
  tel: string;
  art: 'haus' | 'wohnung' | 'gastro' | 'einzel' | 'andere';
  region: string;
  budget: string;
  msg: string;
  dsgvo: boolean;
};

const INITIAL_FORM: FormState = {
  vorname: '', nachname: '', email: '', tel: '',
  art: 'haus', region: 'Frankfurt & Hessen', budget: 'Bitte wählen',
  msg: '', dsgvo: false,
};

const ART_OPTIONS: Array<{ value: FormState['art']; label: string }> = [
  { value: 'haus',    label: 'Haus-Sanierung' },
  { value: 'wohnung', label: 'Wohnung' },
  { value: 'gastro',  label: 'Gastronomie' },
  { value: 'einzel',  label: 'Einzelgewerk' },
  { value: 'andere',  label: 'Andere' },
];

const FAQ = [
  {
    q: 'Wie kommt ein verbindlicher Festpreis zustande?',
    a: 'Nach dem Erstgespräch nehmen wir vor Ort auf, prüfen Statik und Substanz und erstellen ein detailliertes Leistungsverzeichnis. Innerhalb von 14 Tagen erhalten Sie einen schriftlichen Festpreis — gültig für 60 Tage, verbindlich nach Vertragsunterzeichnung.',
  },
  {
    q: 'Wie schnell können Sie mit den Arbeiten beginnen?',
    a: 'In der Regel 4–8 Wochen nach Vertragsabschluss. Bei Wohnungssanierungen oft schneller, bei Genehmigungs­pflichtigen Vorhaben (Statik, Dach, Fassade) entsprechend länger. Wir kommunizieren das Startdatum verbindlich.',
  },
  {
    q: 'Arbeiten Sie mit Subunternehmern?',
    a: 'Unsere Bauleitung, Elektrik, Sanitär, Trockenbau, Maler, Schreinerei sind inhouse. Fliesenleger, Dachdecker und Fassade sind langjährige, vertraglich gebundene Partnerbetriebe — keine Tagelöhner, keine Mehrfach-Übergaben.',
  },
  {
    q: 'Was ist im Festpreis enthalten?',
    a: 'Alle Materialien laut Auswahl, alle Gewerke, Bauleitung, Bauschuttentsorgung, Reinigung, Behördengänge sowie Versicherung. Nicht enthalten: Sonder­wünsche nach Vertragsabschluss (separat ausgewiesen) und Eigentumsabgaben.',
  },
  {
    q: 'Kann ich während der Sanierung in der Wohnung bleiben?',
    a: 'Bei Etagenwohnungen mit Teilsanierung (z. B. nur Bad oder Küche): ja, mit eingeschränkter Nutzung. Bei Vollsanierungen empfehlen wir den Auszug — wir helfen bei Übergangs-Möblierung und Logistik.',
  },
  {
    q: 'Welche Garantie geben Sie?',
    a: 'Fünf Jahre Werks­gewähr auf alle ausgeführten Arbeiten — das ist mehr als die gesetzliche Pflicht. Auf Material gilt die Herstellergarantie, die wir für Sie geltend machen.',
  },
];

export default function Kontakt() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <section className="kontakt">
        <div className="kontakt__inner">
          <div className="kontakt__intro reveal">
            <div className="eyebrow eyebrow--on-dark"><span className="rule-red"></span>&nbsp;&nbsp;Kontakt · № 05</div>
            <h2 style={{ marginTop: 20 }}>
              Sprechen wir<br />
              über Ihr<br />
              <em>Bauprojekt.</em>
            </h2>
            <p>
              Erste Beratung kostenlos und unverbindlich. Termin in 48 Stunden, vor Ort oder per Video — wir hören erst zu, dann skizzieren wir.
            </p>

            <div className="kontakt__channels">
              <div className="kontakt__channel">
                <div className="kontakt__channel-icon"><PhoneIcon /></div>
                <div className="kontakt__channel-body">
                  <h4 className="kontakt__channel-label">Telefon</h4>
                  <p className="kontakt__channel-val">+49 69 0000 0000</p>
                  <p className="kontakt__channel-meta">Mo–Fr · 08:00–18:00 · DE / CH</p>
                </div>
              </div>
              <div className="kontakt__channel">
                <div className="kontakt__channel-icon"><MailIcon /></div>
                <div className="kontakt__channel-body">
                  <h4 className="kontakt__channel-label">E-Mail</h4>
                  <p className="kontakt__channel-val">hallo@primavista.bau</p>
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
                  Mainzer Landstraße 000<br />
                  60329 Frankfurt am Main<br />
                  Hessen, Deutschland</p>
              </div>
              <div className="kontakt__office">
                <h4>Emmenbrücke — CH</h4>
                <p><strong>Prima Vista Bauprojekte AG</strong><br />
                  Seetalstrasse 000<br />
                  6020 Emmenbrücke<br />
                  Kanton Luzern, Schweiz</p>
              </div>
            </div>
          </div>

          <div className="kontakt__form-wrap reveal" data-delay="1" style={sent ? { opacity: 0.7 } : undefined}>
            <span className="kontakt__form-num">05</span>
            <div className="kontakt__form-eyebrow"><span className="rule-red"></span> Anfrage senden</div>
            <h3 className="kontakt__form-title">
              Erzählen Sie uns von<br />
              Ihrem <em>Vorhaben.</em>
            </h3>

            <form onSubmit={onSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="vorname">Vorname</label>
                  <input id="vorname" type="text" placeholder="Vorname" value={form.vorname} onChange={(e) => update('vorname', e.target.value)} />
                </div>
                <div className="form-field">
                  <label htmlFor="nachname">Nachname</label>
                  <input id="nachname" type="text" placeholder="Nachname" value={form.nachname} onChange={(e) => update('nachname', e.target.value)} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="email">E-Mail</label>
                  <input id="email" type="email" placeholder="ihre@email.de" value={form.email} onChange={(e) => update('email', e.target.value)} />
                </div>
                <div className="form-field">
                  <label htmlFor="tel">Telefon</label>
                  <input id="tel" type="tel" placeholder="+49 …" value={form.tel} onChange={(e) => update('tel', e.target.value)} />
                </div>
              </div>

              <div className="form-field">
                <label>Art des Vorhabens</label>
                <div className="form-chips">
                  {ART_OPTIONS.map(({ value, label }) => (
                    <span key={value}>
                      <input
                        type="radio"
                        name="art"
                        id={`art-${value}`}
                        checked={form.art === value}
                        onChange={() => update('art', value)}
                      />
                      <label htmlFor={`art-${value}`}>{label}</label>
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-row">
                <div className="form-field form-field--select">
                  <label htmlFor="region">Region</label>
                  <select id="region" value={form.region} onChange={(e) => update('region', e.target.value)}>
                    <option>Frankfurt &amp; Hessen</option>
                    <option>Innerschweiz</option>
                    <option>Außerhalb</option>
                  </select>
                </div>
                <div className="form-field form-field--select">
                  <label htmlFor="budget">Budget-Rahmen</label>
                  <select id="budget" value={form.budget} onChange={(e) => update('budget', e.target.value)}>
                    <option>Bitte wählen</option>
                    <option>Unter € 50.000</option>
                    <option>€ 50.000 – € 150.000</option>
                    <option>€ 150.000 – € 500.000</option>
                    <option>Über € 500.000</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="msg">Worum geht es?</label>
                <textarea
                  id="msg"
                  placeholder="Beschreiben Sie Ihr Vorhaben in ein paar Sätzen — wir melden uns innerhalb von 24 Stunden."
                  value={form.msg}
                  onChange={(e) => update('msg', e.target.value)}
                />
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  id="dsgvo"
                  checked={form.dsgvo}
                  onChange={(e) => update('dsgvo', e.target.checked)}
                />
                <label htmlFor="dsgvo">
                  Ich bin damit einverstanden, dass meine Angaben zur Beantwortung verwendet werden. Eine Weitergabe an Dritte erfolgt nicht. <a href="#">Datenschutz</a>.
                </label>
              </div>

              <div className="form-actions">
                <span className="form-actions__note"><span className="dot"></span>Antwort in 24 Std.</span>
                <button className="btn btn--solid" type="submit" disabled={sent}>
                  {sent ? 'Gesendet ✓' : <>Absenden <span className="arrow">&gt;</span></>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="faq">
        <div className="faq__inner">
          <div className="faq__intro reveal">
            <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;Häufige Fragen</div>
            <h2 style={{ marginTop: 18 }}>
              Was<br />
              Auftraggeber<br />
              am häufigsten<br />
              <em>fragen.</em>
            </h2>
            <p>Antworten zu Festpreis, Bauzeit, Material und Garantie. Weitere Fragen klären wir gern persönlich.</p>
          </div>
          <ul className="faq__list">
            {FAQ.map((item, i) => (
              <li key={item.q} className={`faq__item${openFaq === i ? ' is-open' : ''}`}>
                <button
                  className="faq__q"
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {item.q}
                  <span className="toggle">+</span>
                </button>
                <div className="faq__a">
                  <div className="faq__a-inner">{item.a}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
