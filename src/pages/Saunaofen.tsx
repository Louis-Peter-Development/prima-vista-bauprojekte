import CalcPage from '../components/common/CalcPage';
import SaunaofenCalculator from '../components/saunaofen/SaunaofenCalculator';

export default function Saunaofen() {
  return (
    <CalcPage pageKey="sauna" crumbNumber="16" backgroundImage="/assets/img/proj-spa-tub.webp" photoSet="saunaofen" endCta wrapSection={false}>
      <SaunaofenCalculator />
    </CalcPage>
  );
}
