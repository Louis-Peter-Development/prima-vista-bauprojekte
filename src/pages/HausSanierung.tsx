import CalcPage from '../components/common/CalcPage';
import HausSanierungConfigurator from '../components/haus-sanierung/HausSanierungConfigurator';

export default function HausSanierung() {
  return (
    <CalcPage pageKey="haus" crumbNumber="07" backgroundImage="/assets/img/photo-haus-exterior.webp" className="kalk-intro">
      <HausSanierungConfigurator />
    </CalcPage>
  );
}
