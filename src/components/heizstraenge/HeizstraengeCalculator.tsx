import HeizmethodenRouteCalculator from '../gewerke/HeizmethodenRouteCalculator';

export default function HeizstraengeCalculator({ embedded }: { embedded?: boolean } = {}) {
  return (
    <HeizmethodenRouteCalculator
      embedded={embedded}
      initialType="heizmethodenHeizstraenge"
    />
  );
}
