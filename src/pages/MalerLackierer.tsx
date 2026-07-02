import GewerkePage from '../components/gewerke/GewerkePage';
import MalerConfigurator from '../components/gewerke/MalerConfigurator';

export default function MalerLackierer() {
  return (
    <GewerkePage tradeKey="maler" crumbNumber="03" backgroundImage="/assets/img/projects/bad-soden-einfamilienhaus-12.webp" photoSet="maler">
      <MalerConfigurator />
    </GewerkePage>
  );
}
