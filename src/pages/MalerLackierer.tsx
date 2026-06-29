import GewerkePage from '../components/gewerke/GewerkePage';
import MalerConfigurator from '../components/gewerke/MalerConfigurator';

export default function MalerLackierer() {
  return (
    <GewerkePage tradeKey="maler" crumbNumber="03" backgroundImage="/assets/img/leistungen/maler-lackierer-03.webp" photoSet="maler">
      <MalerConfigurator />
    </GewerkePage>
  );
}
