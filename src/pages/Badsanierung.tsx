import GewerkePage from '../components/gewerke/GewerkePage';
import BadsanierungConfigurator from '../components/gewerke/BadsanierungConfigurator';

export default function Badsanierung() {
  return (
    <GewerkePage tradeKey="badsanierung" crumbNumber="04" backgroundImage="/assets/img/leistungen/badsanierung-02.webp" photoSet="badsanierung" className="kalk-intro">
      <BadsanierungConfigurator />
    </GewerkePage>
  );
}
