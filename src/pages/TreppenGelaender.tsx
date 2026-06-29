import GewerkePage from '../components/gewerke/GewerkePage';
import TreppenConfigurator from '../components/gewerke/TreppenConfigurator';

export default function TreppenGelaender() {
  return (
    <GewerkePage tradeKey="treppen" crumbNumber="03" backgroundImage="/assets/img/leistungen/treppen-gelaender-01.webp" photoSet="treppen">
      <TreppenConfigurator />
    </GewerkePage>
  );
}
