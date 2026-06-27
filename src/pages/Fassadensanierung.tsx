import GewerkePage from '../components/gewerke/GewerkePage';
import FassadeConfigurator from '../components/gewerke/FassadeConfigurator';

export default function Fassadensanierung() {
  return (
    <GewerkePage tradeKey="fassade" crumbNumber="03" backgroundImage="/assets/img/leistungen/fassadensanierung-01.webp" photoSet="fassade">
      <FassadeConfigurator />
    </GewerkePage>
  );
}
