import GewerkePage from '../components/gewerke/GewerkePage';
import FensterConfigurator from '../components/gewerke/FensterConfigurator';

export default function Fenstertechnik() {
  return (
    <GewerkePage tradeKey="fenster" crumbNumber="03" backgroundImage="/assets/img/leistungen/fenstertechnik-02.webp" photoSet="fenster">
      <FensterConfigurator />
    </GewerkePage>
  );
}
