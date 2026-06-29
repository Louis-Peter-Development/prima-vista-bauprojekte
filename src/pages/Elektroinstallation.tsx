import GewerkePage from '../components/gewerke/GewerkePage';
import ElektroConfigurator from '../components/gewerke/ElektroConfigurator';

export default function Elektroinstallation() {
  return (
    <GewerkePage tradeKey="elektro" crumbNumber="03" backgroundImage="/assets/img/leistungen/elektroinstallation-01.webp" photoSet="elektro" className="kalk-intro">
      <ElektroConfigurator />
    </GewerkePage>
  );
}
