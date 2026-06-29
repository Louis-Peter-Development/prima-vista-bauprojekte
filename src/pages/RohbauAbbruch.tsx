import GewerkePage from '../components/gewerke/GewerkePage';
import RohbauConfigurator from '../components/gewerke/RohbauConfigurator';

export default function RohbauAbbruch() {
  return (
    <GewerkePage tradeKey="rohbau" crumbNumber="23" backgroundImage="/assets/img/leistungen/rohbau-trockenbau-01.webp" photoSet="rohbau">
      <RohbauConfigurator />
    </GewerkePage>
  );
}
