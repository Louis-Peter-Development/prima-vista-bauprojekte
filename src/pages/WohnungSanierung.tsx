import CalcPage from '../components/common/CalcPage';
import WohnungSanierungConfigurator from '../components/wohnung-sanierung/WohnungSanierungConfigurator';

export default function WohnungSanierung() {
  return (
    <CalcPage pageKey="wohnung" crumbNumber="08" backgroundImage="/assets/img/photo-parkett-altbau.webp" className="kalk-intro">
      <WohnungSanierungConfigurator />
    </CalcPage>
  );
}
