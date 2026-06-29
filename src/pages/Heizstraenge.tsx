import CalcPage from '../components/common/CalcPage';
import HeizstraengeCalculator from '../components/heizstraenge/HeizstraengeCalculator';

export default function Heizstraenge() {
  return (
    <CalcPage pageKey="heizstraenge" crumbNumber="11" backgroundImage="/assets/img/leistungen/wasserinstallation-02.webp" endCta wrapSection={false}>
      <HeizstraengeCalculator />
    </CalcPage>
  );
}
