import PageIntro from '../components/common/PageIntro';
import WohnungSanierungConfigurator from '../components/wohnung-sanierung/WohnungSanierungConfigurator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/kalkulator.css';
import '../styles/pages/haus-sanierung.css';

export default function WohnungSanierung() {
  usePageTitle('Wohnung-Sanierung kalkulieren');

  return (
    <>
      <PageIntro
        className="kalk-intro"
        backgroundImage="/assets/img/photo-parkett-altbau.webp"
        crumbNumber="08"
        crumbLabel="Wohnung-Sanierung · Konfigurator"
        title={<>Wohnung-Sanierung<br /><em>nach Maß.</em></>}
        lede="Vier Wohnungstypen, vier Flächen, zwölf Gewerke. Vom Bad-Refresh bis zur Maisonette-Vollsanierung — die Schätzung aktualisiert sich live."
        meta={[
          { label: 'Wohnungstypen', value: '4 Konfigurationen' },
          { label: 'Gewerke', value: '12 Positionen' },
          { label: 'Genauigkeit', value: 'Detaillierte Live-Kalkulation' },
          { label: 'Angebot', value: 'Übergabe per Blitz-Formular' },
        ]}
      />

      <section className="kalkulator">
        <WohnungSanierungConfigurator />
      </section>
    </>
  );
}
