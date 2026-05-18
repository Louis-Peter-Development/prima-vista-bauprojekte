import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  CONTACT_ART_OPTIONS,
  INITIAL_CONTACT_FORM,
  type ContactFormState,
} from '../../data/kontakt';

export default function KontaktForm() {
  const [form, setForm] = useState(INITIAL_CONTACT_FORM);
  const [sent, setSent] = useState(false);

  function update<K extends keyof ContactFormState>(key: K, value: ContactFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="kontakt__form-wrap reveal reveal--right" data-delay="1" style={sent ? { opacity: 0.7 } : undefined}>
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
            {CONTACT_ART_OPTIONS.map(({ value, label }) => (
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
            Ich bin damit einverstanden, dass meine Angaben zur Beantwortung verwendet werden. Eine Weitergabe an Dritte erfolgt nicht. <Link to="/datenschutz">Datenschutz</Link>.
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
  );
}
