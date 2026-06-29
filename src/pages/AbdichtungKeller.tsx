import GewerkePage from '../components/gewerke/GewerkePage';
import AbdichtungKellerConfigurator from '../components/gewerke/AbdichtungKellerConfigurator';

export default function AbdichtungKeller() {
  return (
    <GewerkePage tradeKey="abdichtung" crumbNumber="03" backgroundImage="/assets/img/leistungen/abdichtung-keller-01.webp" photoSet="abdichtung" className="kalk-intro">
      <AbdichtungKellerConfigurator />
    </GewerkePage>
  );
}
