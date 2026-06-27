import GewerkePage from '../components/gewerke/GewerkePage';
import TrockenbauConfigurator from '../components/gewerke/TrockenbauConfigurator';

export default function Trockenbau() {
  return (
    <GewerkePage tradeKey="trockenbau" crumbNumber="03" backgroundImage="/assets/img/leistungen/trockenbau-decke-02.webp" photoSet="trockenbau">
      <TrockenbauConfigurator />
    </GewerkePage>
  );
}
