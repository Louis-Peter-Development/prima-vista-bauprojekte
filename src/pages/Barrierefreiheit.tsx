import GewerkePage from '../components/gewerke/GewerkePage';
import BarrierefreiesBadConfigurator from '../components/gewerke/BarrierefreiesBadConfigurator';

export default function Barrierefreiheit() {
  return (
    <GewerkePage tradeKey="barrierefreiheit" crumbNumber="03" backgroundImage="/assets/img/leistungen/badsanierung-06.webp" photoSet="barrierefreiheit" className="kalk-intro">
      <BarrierefreiesBadConfigurator />
    </GewerkePage>
  );
}
