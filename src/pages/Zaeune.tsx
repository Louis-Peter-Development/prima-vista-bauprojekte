import GewerkePage from '../components/gewerke/GewerkePage';
import ZaeuneConfigurator from '../components/gewerke/ZaeuneConfigurator';

export default function Zaeune() {
  return (
    <GewerkePage tradeKey="zaeune" crumbNumber="25" backgroundImage="/assets/img/leistungen/zaeune-tore-01.webp" photoSet="zaeune">
      <ZaeuneConfigurator />
    </GewerkePage>
  );
}
