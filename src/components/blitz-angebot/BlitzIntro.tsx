export default function BlitzIntro() {
  return (
    <div className="kontakt__intro reveal reveal--left">
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

      <figure className="kontakt__media kontakt__media--blitz">
        <img src="/assets/img/photo-altbausanierung.webp" alt="Altbau vor der Sanierung als Grundlage für ein Blitz-Angebot" width="1600" height="897" loading="lazy" />
        <figcaption>
          <span className="num">№ 06</span>
          <span>Substanzaufnahme · Vorab-Schätzung</span>
        </figcaption>
      </figure>
    </div>
  );
}
