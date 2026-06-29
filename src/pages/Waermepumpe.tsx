import CalcPage from '../components/common/CalcPage';
import WaermepumpeCalculator from '../components/waermepumpe/WaermepumpeCalculator';

export default function Waermepumpe() {
  return (
    <CalcPage pageKey="waermepumpe" crumbNumber="13" backgroundImage="/assets/img/leistungen/waermepumpe-01.webp" photoSet="waermepumpe" endCta wrapSection={false}>
      <WaermepumpeCalculator />
    </CalcPage>
  );
}
