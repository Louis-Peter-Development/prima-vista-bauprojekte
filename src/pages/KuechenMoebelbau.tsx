import GewerkePage from '../components/gewerke/GewerkePage';
import KuechenConfigurator from '../components/gewerke/KuechenConfigurator';

export default function KuechenMoebelbau() {
  return (
    <GewerkePage tradeKey="kueche" crumbNumber="03" backgroundImage="/assets/img/leistungen/kuechen-moebelbau-02.webp" photoSet="kueche">
      <KuechenConfigurator />
    </GewerkePage>
  );
}
