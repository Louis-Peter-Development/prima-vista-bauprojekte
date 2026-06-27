import GewerkePage from '../components/gewerke/GewerkePage';
import WasserConfigurator from '../components/gewerke/WasserConfigurator';

export default function Sanitaerinstallation() {
  return (
    <GewerkePage tradeKey="wasser" crumbNumber="05" backgroundImage="/assets/img/leistungen/wasserinstallation-04.webp" photoSet="wasser">
      <WasserConfigurator />
    </GewerkePage>
  );
}
