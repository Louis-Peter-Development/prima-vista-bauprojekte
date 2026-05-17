import { useState, type FormEvent } from 'react';
import '../styles/pages/kontakt.css'; 

type FormState = {
  art: 'haus' | 'wohnung' | 'gastro' | 'anderes';
  gewerke: string[];
  groesse: string;
  starttermin: string;
  msg: string;
  name: string;
  email: string;
  tel: string;
};

const INITIAL_FORM: FormState = {
  art: 'haus', gewerke: [], groesse: '', starttermin: '', msg: '', name: '', email: '', tel: '',
};

const ART_OPTIONS: Array<{ value: FormState['art']; label: string }> = [
  { value: 'haus',    label: 'Haus' },
  { value: 'wohnung', label: 'Wohnung' },
  { value: 'gastro',  label: 'Gastronomie' },
  { value: 'anderes', label: 'Anderes' },
];

const GEWERKE_OPTIONS = [
  'Komplettabriss / Rohbau', 'Bad & Sanitär', 'Küche', 'Böden & Parkett',
  'Wände & Maler', 'Elektrik', 'Fassade / Dach', 'Heizung / Energie'
];

export default function BlitzAngebot() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [sent, setSent] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleGewerk(gewerk: string) {
    if (form.gewerke.includes(gewerk)) {
      update('gewerke', form.gewerke.filter(g => g !== gewerk));
    } else {
      update('gewerke', [...form.gewerke, gewerk]);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section className="kontakt kontakt--blitz">
      <div className="kontakt__inner">
        
        <div className="kontakt__intro reveal">
          <div className="crumb crumb--on-dark"><span className="num">06</span> Blitz-Angebot · Vorab-Schätzung</div>
          <h1>
            Das Blitz<br />
            <em>Angebot.</em>
          </h1>
          <p>
            Sie wissen genau, was Sie wollen? Beantworten Sie ein paar konkrete Fragen zu Fläche und Gewerken. Wir analysieren und schicken Ihnen innerhalb von 24 Stunden eine erste, handfeste Kostenschätzung ohne langes Vorab-Telefonat.
          </p>
          <ul className="promise__list" style={{ marginTop: '48px', paddingTop: '32px' }}>
            <li style={{ color: 'var(--pv-bone)' }}><span className="num">01</span>Kostenlose Ersteinschätzung</li>
            <li style={{ color: 'var(--pv-bone)' }}><span className="num">02</span>Antwort garantiert in 24 Std.</li>
            <li style={{ color: 'var(--pv-bone)' }}><span className="num">03</span>Realistische Preisspanne</li>
          </ul>
        </div>

        <div className="kontakt__form-wrap reveal" data-delay="1" style={sent ? { opacity: 0.7 } : undefined}>
          
          {sent ? (
            <div style={{ textAlign: 'center', padding: '64px 0' }}>
              <div className="eyebrow" style={{ justifyContent: 'center' }}>Gesendet</div>
              <h3 className="kontakt__form-title">Vielen Dank.</h3>
              <p className="pv-body">
                Ihre Anfrage ist bei uns eingegangen. Wir werten das Projekt aus und stellen Ihnen innerhalb von 24 Stunden unsere erste Einschätzung zu.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <div className="form-field">
                <label>Um was für ein Objekt handelt es sich?</label>
                <div className="form-chips">
                  {ART_OPTIONS.map(({ value, label }) => (
                    <span key={value}>
                      <input type="radio" name="blitz-art" id={`blitz-art-${value}`} checked={form.art === value} onChange={() => update('art', value)} />
                      <label htmlFor={`blitz-art-${value}`}>{label}</label>
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="groesse">Geschätzte Fläche (m²)</label>
                  <input id="groesse" type="number" placeholder="z. B. 120" value={form.groesse} onChange={(e) => update('groesse', e.target.value)} required />
                </div>
                <div className="form-field form-field--select">
                  <label htmlFor="starttermin">Gewünschter Baubeginn</label>
                  <select id="starttermin" value={form.starttermin} onChange={(e) => update('starttermin', e.target.value)} required>
                    <option value="" disabled>Bitte wählen</option>
                    <option value="sofort">So schnell wie möglich</option>
                    <option value="1-3m">In 1 – 3 Monaten</option>
                    <option value="3-6m">In 3 – 6 Monaten</option>
                    <option value="spaeter">Noch unklar / Nächstes Jahr</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label>Welche Gewerke werden in etwa benötigt? (Mehrfachauswahl)</label>
                <div className="form-chips">
                  {GEWERKE_OPTIONS.map((g) => (
                    <span key={g}>
                      <input type="checkbox" id={`blitz-g-${g}`} checked={form.gewerke.includes(g)} onChange={() => toggleGewerk(g)} />
                      <label htmlFor={`blitz-g-${g}`}>{g}</label>
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-field" style={{ marginTop: '24px' }}>
                <label htmlFor="msg">Besonderheiten / Kurzfassung Ihres Vorhabens</label>
                <textarea id="msg" placeholder="Gibt es Besonderheiten, wie z.B. Denkmalschutz, spezielle Wünsche, oder Herausforderungen? Beschreiben Sie es kurz hier." value={form.msg} onChange={(e) => update('msg', e.target.value)} />
              </div>

              <div className="form-field form-field--eyebrow" style={{ marginTop: '32px', marginBottom: '16px' }}>
                <label style={{ color: 'var(--pv-copper)' }}>Ihre Kontaktdaten</label>
              </div>

              <div className="form-field">
                <label htmlFor="name">Vollständiger Name</label>
                <input id="name" type="text" placeholder="Vor- und Nachname" value={form.name} onChange={(e) => update('name', e.target.value)} required />
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="email">E-Mail</label>
                  <input id="email" type="email" placeholder="ihre@email.de" value={form.email} onChange={(e) => update('email', e.target.value)} required />
                </div>
                <div className="form-field">
                  <label htmlFor="tel">Telefon</label>
                  <input id="tel" type="tel" placeholder="Für eventuelle Rückfragen" value={form.tel} onChange={(e) => update('tel', e.target.value)} required />
                </div>
              </div>

              <div className="form-actions" style={{ marginTop: '40px' }}>
                <span className="form-actions__note"><span className="dot"></span>Schätzung in 24 Std.</span>
                <button className="btn btn--solid" type="submit">
                  Angebot anfordern <span className="arrow">&gt;</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}