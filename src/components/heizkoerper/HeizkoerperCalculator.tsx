import HeizmethodenRouteCalculator from '../gewerke/HeizmethodenRouteCalculator';

export default function HeizkoerperCalculator({ embedded }: { embedded?: boolean } = {}) {
  return (
    <HeizmethodenRouteCalculator
      embedded={embedded}
      initialType="heizmethodenHeizkoerper"
    />
  );
}
