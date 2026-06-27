import CalcPage from '../components/common/CalcPage';
import FussbodenheizungCalculator from '../components/fussbodenheizung/FussbodenheizungCalculator';

export default function Fussbodenheizung() {
  return (
    <CalcPage pageKey="fussboden" crumbNumber="12" backgroundImage="/assets/img/leistungen/fussbodenheizung-01.webp" photoSet="fussbodenheizung" endCta wrapSection={false}>
      <FussbodenheizungCalculator />
    </CalcPage>
  );
}
