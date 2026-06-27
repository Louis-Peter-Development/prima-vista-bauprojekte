import GewerkePage from '../components/gewerke/GewerkePage';
import GartenConfigurator from '../components/gewerke/GartenConfigurator';

export default function GartenAussenanlagen() {
  return (
    <GewerkePage tradeKey="garten" crumbNumber="03" backgroundImage="/assets/img/leistungen/garten-aussenanlagen-01.webp" photoSet="garten">
      <GartenConfigurator />
    </GewerkePage>
  );
}
