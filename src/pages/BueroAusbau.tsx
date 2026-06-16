import PageIntro from '../components/common/PageIntro';
import BueroAusbauCalculator from '../components/buero-ausbau/BueroAusbauCalculator';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/kalkulator.css';
import '../styles/pages/haus-sanierung.css';

export default function BueroAusbau() {
  usePageTitle('Büro-Ausbau kalkulieren');

  return (
    <>
      <PageIntro
        className="kalk-intro"
        backgroundImage="/assets/img/photo-office-light.webp"
        crumbNumber="09"
        crumbLabel="Büro-Ausbau · Konfigurator"
        title={<>Büro-Ausbau<br /><em>nach Maß.</em></>}
        lede="Büroflächen, Praxen und Arbeitswelten live kalkulieren: Ausbaugrad, Fläche und Gewerke wählen — die Vorab-Schätzung aktualisiert sich direkt."
        meta={[
          { label: 'Bürotypen', value: '4 Konfigurationen' },
          { label: 'Gewerke', value: '13 Positionen' },
          { label: 'Genauigkeit', value: '± 15 % Vorab-Spanne' },
          { label: 'Angebot', value: 'Übergabe per Blitz-Formular' },
        ]}
      />

      <section className="kalkulator">
        <BueroAusbauCalculator />
      </section>
    </>
  );
}
