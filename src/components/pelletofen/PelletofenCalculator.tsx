import HeizmethodenRouteCalculator from '../gewerke/HeizmethodenRouteCalculator';

export default function PelletofenCalculator({ embedded }: { embedded?: boolean } = {}) {
  return (
    <HeizmethodenRouteCalculator
      embedded={embedded}
      initialType="heizmethodenPelletofen"
    />
  );
}
