import HeizmethodenRouteCalculator from '../gewerke/HeizmethodenRouteCalculator';

export default function SaunaofenCalculator({ embedded }: { embedded?: boolean } = {}) {
  return (
    <HeizmethodenRouteCalculator
      embedded={embedded}
      initialType="heizmethodenSaunaofen"
    />
  );
}
