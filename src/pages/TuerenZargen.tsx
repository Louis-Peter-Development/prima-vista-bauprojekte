import GewerkePage from '../components/gewerke/GewerkePage';
import TuerenConfigurator from '../components/gewerke/TuerenConfigurator';

export default function TuerenZargen() {
  return (
    <GewerkePage tradeKey="tueren" crumbNumber="24" backgroundImage="/assets/img/leistungen/tueren-zargen-01.webp" photoSet="tueren">
      <TuerenConfigurator />
    </GewerkePage>
  );
}
