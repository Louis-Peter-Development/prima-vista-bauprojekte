import { Link } from 'react-router-dom';
import PageIntro from '../components/common/PageIntro';
import EndCtaLocal from '../components/common/EndCtaLocal';
import { HEIZMETHODEN } from '../data/heizmethoden';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/heizmethoden.css';

export default function Heizmethoden() {
  usePageTitle('Moderne Heizmethoden – Wärmepumpe, Gas, Pellet & mehr');

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/photo-haus-exterior.webp"
        crumbNumber="09"
        crumbLabel="Heizmethoden · Wärme & Energie"
        title={<>Moderne<br />Heizmethoden.<br /><em>Sieben Wege.</em></>}
        lede="Bereit für die Zukunft? Vom hydraulischen Abgleich der Bestandsanlage bis zur förderfähigen Luft-Wärmepumpe — wir planen, liefern und bauen ein. Inklusive Aufstellgutachten, BAFA- und KfW-Anträgen."
        meta={[
          { label: 'Methoden', value: '7 Systeme' },
          { label: 'Förderung', value: 'BAFA & KfW' },
          { label: 'Inbetriebnahme', value: 'Inhouse' },
          { label: 'Garantie', value: '5 Jahre' },
        ]}
      />

      <section className="heiz">
        <div className="heiz__inner">
          <div className="heiz__head reveal">
            <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;Übersicht</div>
            <h2>
              Sieben Heizmethoden,<br />
              ein <em>Bauleiter.</em>
            </h2>
            <p>
              Welche Heiztechnik wirklich zu Ihrem Objekt passt, hängt von Dämmstandard, Hydraulik und vorhandenen Anschlüssen ab. Unten finden Sie unsere sieben häufigsten Systeme — jedes davon planen wir, montieren wir und nehmen wir in Betrieb.
            </p>
          </div>

          <ul className="heiz__grid">
            {HEIZMETHODEN.map((m, i) => {
              const card = (
                <>
                  <div className="heiz-card__photo">
                    <img src={m.photo} alt={m.title} loading="lazy" />
                    <span className="heiz-card__num">№&nbsp;{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="heiz-card__body">
                    <h3 className="heiz-card__title">
                      {m.title}
                      {m.subtitle && <small className="heiz-card__sub">{m.subtitle}</small>}
                    </h3>
                    <p className="heiz-card__desc">{m.desc}</p>
                    {m.detailTo && <span className="heiz-card__more">Kostenrechner öffnen <span>&gt;</span></span>}
                  </div>
                </>
              );

              return (
                <li key={m.key} className="heiz-card reveal" data-delay={String((i % 4) + 1)}>
                  {m.detailTo ? (
                    <Link className="heiz-card__link" to={m.detailTo}>
                      {card}
                    </Link>
                  ) : card}
                </li>
              );
            })}
          </ul>

          <div className="heiz__foot reveal">
            <p>
              Förderung über BAFA und KfW prüfen wir kostenfrei mit. Energieberatung auf Wunsch vor der Vertragsunterzeichnung.
            </p>
            <div className="heiz__actions">
              <Link className="btn btn--solid" to="/blitz-angebot">
                Verbindliches Angebot <span className="arrow">&gt;</span>
              </Link>
              <Link className="btn btn--light" to="/kontakt">
                Energieberatung anfragen <span className="arrow">&gt;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <EndCtaLocal
        eyebrow="Bereit für die Heizungs­modernisierung?"
        title={<>Welches <em>System</em><br />passt zu Ihrem Haus?</>}
        ctaLabel="Beratung anfragen"
      />
    </>
  );
}
