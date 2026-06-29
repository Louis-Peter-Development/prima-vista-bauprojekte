import GewerkePage from '../components/gewerke/GewerkePage';
import BoedenConfigurator from '../components/gewerke/BoedenConfigurator';

export default function BoedenBelaege() {
  return (
    <GewerkePage tradeKey="boeden" crumbNumber="03" backgroundImage="/assets/img/leistungen/boeden-belaege-01.webp" photoSet="boeden" className="kalk-intro">
      <BoedenConfigurator />
    </GewerkePage>
  );
}
