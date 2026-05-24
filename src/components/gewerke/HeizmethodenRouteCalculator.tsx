import HeizmethodenConfigurator from './HeizmethodenConfigurator';
import type { HeizmethodenType } from './HeizmethodenBoard';

type Props = {
  embedded?: boolean;
  initialType: HeizmethodenType;
};

export default function HeizmethodenRouteCalculator({
  embedded,
  initialType,
}: Props) {
  const calculator = <HeizmethodenConfigurator initialType={initialType} />;

  if (embedded) return calculator;

  return (
    <section className="kalkulator">
      {calculator}
    </section>
  );
}
