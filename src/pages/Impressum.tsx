import PageIntro from '../components/common/PageIntro';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/impressum.css';

const COMPANY_DETAILS = [
  'Prima Vista Bauprojekte',
  'Monica Irimia',
  'Gref-Völsing-Straße 13',
  '60314 Frankfurt',
  'Steuernr.: 01483039527',
];

const LEGAL_SECTIONS = [
  {
    title: 'Umsatzsteuer-ID',
    body: (
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
        <br />
        DE 358812805
      </p>
    ),
  },
  {
    title: 'Aufsichtsbehörde',
    body: <p>Amtsgericht Frankfurt am Main</p>,
  },
  {
    title: 'EU-Streitschlichtung',
    body: (
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
        {' '}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr/
        </a>
        . Unsere E-Mail-Adresse finden Sie oben im Impressum.
      </p>
    ),
  },
  {
    title: 'Verbraucherstreitbeilegung / Universalschlichtungsstelle',
    body: (
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    ),
  },
  {
    title: 'Haftung für Inhalte',
    body: (
      <>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </p>
        <p>
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
        </p>
      </>
    ),
  },
  {
    title: 'Haftung für Links',
    body: (
      <>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
        </p>
        <p>
          Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
        </p>
      </>
    ),
  },
  {
    title: 'Urheberrecht',
    body: (
      <>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
        </p>
        <p>
          Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
        </p>
      </>
    ),
  },
];

export default function Impressum() {
  usePageTitle('Impressum');
  return (
    <>
      <PageIntro
        className="impressum-intro"
        backgroundImage="/assets/img/photo-office-light.webp"
        crumbNumber="07"
        crumbLabel="Impressum · Rechtliches"
        title={<>Impressum</>}
        lede="Angaben gemäß § 5 DDG für Prima Vista Bauprojekte."
        meta={[
          { label: 'Sitz', value: 'Frankfurt am Main' },
          { label: 'Kontakt', value: 'info@primavista-bauprojekte.com' },
          { label: 'Telefon', value: '+49 (0)1578 9818308' },
          { label: 'USt-ID', value: 'DE 358812805' },
        ]}
      />

      <main className="impressum-page">
        <section className="impressum-page__grid">
          <aside className="impressum-page__summary reveal">
            <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;Angaben gemäß § 5 DDG</div>
            <address>
              {COMPANY_DETAILS.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <div className="impressum-page__contact">
              <h2>Kontakt</h2>
              <p>
                Telefon: <a href="tel:+4915789818308">+49 (0)1578 9818308</a>
                <br />
                E-Mail: <a href="mailto:info@primavista-bauprojekte.com">info@primavista-bauprojekte.com</a>
              </p>
            </div>
          </aside>

          <div className="impressum-page__content">
            {LEGAL_SECTIONS.map((section, index) => (
              <section key={section.title} className="impressum-section reveal" data-delay={index % 3 || undefined}>
                <span className="impressum-section__num">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h2>{section.title}</h2>
                  {section.body}
                </div>
              </section>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
