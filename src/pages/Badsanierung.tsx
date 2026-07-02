import GewerkePage from '../components/gewerke/GewerkePage';
import BadsanierungConfigurator from '../components/gewerke/BadsanierungConfigurator';

export default function Badsanierung() {
  return (
    <GewerkePage tradeKey="badsanierung" crumbNumber="04" backgroundImage="/assets/img/projects/spa-bad-hotel-01.webp" photoSet="badsanierung" className="kalk-intro">
      <BadsanierungConfigurator />
    </GewerkePage>
  );
}
