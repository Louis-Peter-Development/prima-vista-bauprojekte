import GewerkePage from '../components/gewerke/GewerkePage';
import DachConfigurator from '../components/gewerke/DachConfigurator';

export default function Dachsanierung() {
  return (
    <GewerkePage tradeKey="dach" crumbNumber="05" backgroundImage="/assets/img/leistungen/dachsanierung-01.webp" photoSet="dach" className="kalk-intro">
      <DachConfigurator />
    </GewerkePage>
  );
}
