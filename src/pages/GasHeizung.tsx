import CalcPage from '../components/common/CalcPage';
import GasHeizungCalculator from '../components/gas-heizung/GasHeizungCalculator';

export default function GasHeizung() {
  return (
    <CalcPage pageKey="gas" crumbNumber="14" backgroundImage="/assets/img/leistungen/gas-heizung-01.webp" photoSet="gasHeizung" endCta wrapSection={false}>
      <GasHeizungCalculator />
    </CalcPage>
  );
}
