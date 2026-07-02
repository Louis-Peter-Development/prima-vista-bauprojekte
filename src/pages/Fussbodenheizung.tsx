import CalcPage from '../components/common/CalcPage';
import FussbodenheizungCalculator from '../components/fussbodenheizung/FussbodenheizungCalculator';

export default function Fussbodenheizung() {
  return (
    <CalcPage pageKey="fussboden" crumbNumber="12" backgroundImage="/assets/img/projects/bad-soden-einfamilienhaus-11.webp" photoSet="fussbodenheizung" endCta wrapSection={false}>
      <FussbodenheizungCalculator />
    </CalcPage>
  );
}
