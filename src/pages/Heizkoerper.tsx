import CalcPage from '../components/common/CalcPage';
import HeizkoerperCalculator from '../components/heizkoerper/HeizkoerperCalculator';

export default function Heizkoerper() {
  return (
    <CalcPage pageKey="heizkoerper" crumbNumber="10" backgroundImage="/assets/img/leistungen/heizkoerper-01.webp" photoSet="heizkoerper" endCta wrapSection={false}>
      <HeizkoerperCalculator />
    </CalcPage>
  );
}
