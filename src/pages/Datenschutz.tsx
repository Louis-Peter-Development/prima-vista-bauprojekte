import PageIntro from '../components/common/PageIntro';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/impressum.css';

const PRIVACY_SECTIONS = [
  {
    title: 'Datenschutz auf einen Blick',
    body: (
      <>
        <h3>Allgemeine Hinweise</h3>
        <p>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
        </p>
        <h3>Datenerfassung auf dieser Website</h3>
        <p>
          Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen.
        </p>
        <p>
          Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich zum Beispiel um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten, zum Beispiel Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs.
        </p>
      </>
    ),
  },
  {
    title: 'Hosting',
    body: (
      <>
        <p>
          Die technische Bereitstellung dieser Website erfolgt über den jeweils eingesetzten Hosting- und Deployment-Anbieter. Dabei können insbesondere technische Zugriffsdaten wie IP-Adresse, Zeitpunkt des Seitenaufrufs, Browserinformationen und Server-Log-Dateien verarbeitet werden, soweit dies zur sicheren und stabilen Bereitstellung der Website erforderlich ist.
        </p>
        <p>
          Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der technisch fehlerfreien, sicheren und effizienten Bereitstellung unseres Online-Angebots.
        </p>
      </>
    ),
  },
  {
    title: 'Allgemeine Hinweise und Pflichtinformationen',
    body: (
      <>
        <h3>Datenschutz</h3>
        <p>
          Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
        </p>
        <h3>Hinweis zur verantwortlichen Stelle</h3>
        <p>
          Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
          <br />
          Monica Irimia
          <br />
          Gref-Völsing-Straße 13
          <br />
          60314 Frankfurt am Main
          <br />
          E-Mail: <a href="mailto:info@primavista-bauprojekte.com">info@primavista-bauprojekte.com</a>
        </p>
        <p>
          Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
        </p>
        <h3>Speicherdauer</h3>
        <p>
          Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben.
        </p>
      </>
    ),
  },
  {
    title: 'Ihre Rechte',
    body: (
      <>
        <p>
          Sie können eine bereits erteilte Einwilligung zur Datenverarbeitung jederzeit widerrufen. Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, haben Sie außerdem das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen.
        </p>
        <p>
          Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde zu. Sie haben außerdem das Recht auf Datenübertragbarkeit sowie im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft, Berichtigung oder Löschung Ihrer gespeicherten personenbezogenen Daten.
        </p>
        <h3>SSL- bzw. TLS-Verschlüsselung</h3>
        <p>
          Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung.
        </p>
      </>
    ),
  },
  {
    title: 'Datenerfassung auf dieser Website',
    body: (
      <>
        <h3>Cookies</h3>
        <p>
          Unsere Internetseiten können sogenannte Cookies verwenden. Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung oder dauerhaft auf Ihrem Endgerät gespeichert. Soweit einwilligungspflichtige Cookies oder vergleichbare Technologien eingesetzt werden, erfolgt dies nur nach Ihrer Einwilligung.
        </p>
        <h3>Server-Log-Dateien</h3>
        <p>
          Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind insbesondere Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse.
        </p>
        <p>
          Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
        </p>
        <h3>Kontaktformular / Anfrage per E-Mail</h3>
        <p>
          Wenn Sie uns per Kontaktformular oder E-Mail Anfragen zukommen lassen, werden Ihre Angaben inklusive der dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
        </p>
      </>
    ),
  },
  {
    title: 'Analyse-Tools und Werbung',
    body: (
      <>
        <h3>Google Analytics</h3>
        <p>
          Diese Website kann Google Analytics einsetzen, um die Nutzung der Website zu analysieren und unser Angebot zu verbessern. Google Analytics verwendet Technologien, die eine Wiedererkennung der Nutzerinnen und Nutzer zum Zwecke der Analyse des Nutzerverhaltens ermöglichen können.
        </p>
        <p>
          Soweit Google Analytics eingesetzt wird, erfolgt die Verarbeitung einwilligungspflichtiger Daten nur auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit widerrufbar.
        </p>
      </>
    ),
  },
  {
    title: 'Chatbot',
    body: (
      <>
        <h3>Claude-basierter Chatbot</h3>
        <p>
          Wir setzen auf dieser Website einen Chatbot („Bau-Concierge“) ein, der auf dem KI-Modell Claude des Anbieters Anthropic PBC, 548 Market Street, PMB 90375, San Francisco, CA 94104, USA, basiert. Der Chatbot ist nur aktiv, wenn Sie über das Cookie-Banner Ihre Einwilligung erteilt haben.
        </p>
        <h3>Verarbeitete Daten</h3>
        <p>
          Wenn Sie den Chatbot nutzen, werden die von Ihnen im Chat eingegebenen Inhalte sowie technische Metadaten (z. B. Zeitpunkt der Anfrage, IP-Adresse) verarbeitet, um Ihre Anfrage zu beantworten und den Dienst technisch bereitzustellen. Ihre Eingaben werden von unserem Server an die Schnittstelle von Anthropic übermittelt und dort zur Generierung der Antwort verarbeitet.
        </p>
        <h3>Rechtsgrundlage</h3>
        <p>
          Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Sie können diese Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie Ihre Cookie-Einstellungen ändern oder Ihre Browser-Speicherdaten für diese Website löschen.
        </p>
        <h3>Drittlandübermittlung (USA)</h3>
        <p>
          Anthropic verarbeitet Daten unter anderem in den USA. Die Übermittlung erfolgt auf Grundlage der Standardvertragsklauseln der EU-Kommission gemäß Art. 46 Abs. 2 lit. c DSGVO sowie ergänzender technischer und organisatorischer Maßnahmen. Weitere Informationen finden Sie in den Datenschutzhinweisen von Anthropic unter <a href="https://www.anthropic.com/legal/privacy" target="_blank" rel="noopener noreferrer">anthropic.com/legal/privacy</a>.
        </p>
        <h3>Speicherdauer</h3>
        <p>
          Wir speichern Chatverläufe nicht dauerhaft auf unseren Servern. Anthropic kann übermittelte Inhalte gemäß den geltenden Geschäftsbedingungen für einen begrenzten Zeitraum zu Zwecken der Diensterbringung, Missbrauchsprävention und Einhaltung gesetzlicher Pflichten speichern; Einzelheiten ergeben sich aus den oben verlinkten Hinweisen von Anthropic.
        </p>
        <h3>Hinweis</h3>
        <p>
          Bitte geben Sie im Chat keine sensiblen Daten (z. B. Gesundheitsdaten, Finanzdaten, Passwörter) ein. Für vertrauliche Anliegen wenden Sie sich bitte direkt per E-Mail oder Telefon an uns.
        </p>
      </>
    ),
  },
  {
    title: 'Plugins und Tools',
    body: (
      <>
        <h3>Google Web Fonts (lokales Hosting)</h3>
        <p>
          Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten Web Fonts. Die im Projekt eingebundenen Schriftarten werden lokal bereitgestellt, soweit dies technisch möglich ist. Dadurch wird beim Aufruf der Seite keine Verbindung zu Servern von Google Fonts hergestellt.
        </p>
      </>
    ),
  },
];

export default function Datenschutz() {
  usePageTitle('Datenschutzerklärung');
  return (
    <>
      <PageIntro
        className="impressum-intro"
        backgroundImage="/assets/img/photo-office-light.webp"
        crumbNumber="08"
        crumbLabel="Datenschutz · DSGVO"
        title={<>Datenschutz</>}
        lede="Informationen zur Verarbeitung personenbezogener Daten auf dieser Website."
        meta={[
          { label: 'Verantwortlich', value: 'Monica Irimia' },
          { label: 'Kontakt', value: 'info@primavista-bauprojekte.com' },
          { label: 'Analyse', value: 'Google Analytics' },
          { label: 'Chatbot', value: 'Claude (Anthropic)' },
        ]}
      />

      <main className="impressum-page">
        <section className="impressum-page__grid">
          <aside className="impressum-page__summary reveal">
            <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;Verantwortliche Stelle</div>
            <address>
              <span>Monica Irimia</span>
              <span>Gref-Völsing-Straße 13</span>
              <span>60314 Frankfurt am Main</span>
            </address>
            <div className="impressum-page__contact">
              <h2>Kontakt</h2>
              <p>
                E-Mail: <a href="mailto:info@primavista-bauprojekte.com">info@primavista-bauprojekte.com</a>
              </p>
            </div>
          </aside>

          <div className="impressum-page__content">
            {PRIVACY_SECTIONS.map((section, index) => (
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
