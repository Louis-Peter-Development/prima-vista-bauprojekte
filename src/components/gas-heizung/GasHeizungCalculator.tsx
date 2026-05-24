import HeizmethodenRouteCalculator from '../gewerke/HeizmethodenRouteCalculator';

export default function GasHeizungCalculator({ embedded }: { embedded?: boolean } = {}) {
  return (
    <HeizmethodenRouteCalculator
      embedded={embedded}
      initialType="heizmethodenGasHeizung"
    />
  );
}
