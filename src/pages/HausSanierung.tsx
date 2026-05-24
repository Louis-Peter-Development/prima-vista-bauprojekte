import PageIntro from '../components/common/PageIntro';
import HausSanierungConfigurator from '../components/haus-sanierung/HausSanierungConfigurator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/kalkulator.css';
import '../styles/pages/haus-sanierung.css';

export default function HausSanierung() {
  usePageTitle('Haus-Sanierung kalkulieren');

  return (
    <>
      <PageIntro
        className="kalk-intro"
        backgroundImage="/assets/img/photo-haus-exterior.webp"
        crumbNumber="07"
        crumbLabel="Haus-Sanierung · Konfigurator"
        title={<>Haus-Sanierung<br /><em>nach Maß.</em></>}
        lede="Vier Haustypen, vier Flächen, 16 Gewerke. Wählen Sie die Konfiguration, die zu Ihrem Vorhaben passt — die passende Kalkulation aktualisiert sich live."
        meta={[
          { label: 'Haustypen', value: '4 Konfigurationen' },
          { label: 'Optionen', value: 'Nach Haustyp' },
          { label: 'Detaildaten', value: '1 Etage ohne Dach' },
          { label: 'Angebot', value: 'Übergabe per Blitz-Formular' },
        ]}
      />

      <section className="kalkulator">
        <HausSanierungConfigurator />
      </section>
    </>
  );
}
