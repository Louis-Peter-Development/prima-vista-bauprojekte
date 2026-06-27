import CalcPage from '../components/common/CalcPage';
import PelletofenCalculator from '../components/pelletofen/PelletofenCalculator';

export default function Pelletofen() {
  return (
    <CalcPage pageKey="pellet" crumbNumber="15" backgroundImage="/assets/img/leistungen/gas-heizung-01.webp" endCta wrapSection={false}>
      <PelletofenCalculator />
    </CalcPage>
  );
}
