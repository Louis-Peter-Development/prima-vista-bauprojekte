import CalcPage from '../components/common/CalcPage';
import BueroAusbauCalculator from '../components/buero-ausbau/BueroAusbauCalculator';

export default function BueroAusbau() {
  return (
    <CalcPage pageKey="buero" crumbNumber="09" backgroundImage="/assets/img/photo-office-modern.webp" className="kalk-intro">
      <BueroAusbauCalculator />
    </CalcPage>
  );
}
