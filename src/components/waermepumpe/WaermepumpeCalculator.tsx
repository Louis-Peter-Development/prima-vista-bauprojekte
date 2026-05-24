import HeizmethodenRouteCalculator from '../gewerke/HeizmethodenRouteCalculator';

export default function WaermepumpeCalculator({ embedded }: { embedded?: boolean } = {}) {
  return (
    <HeizmethodenRouteCalculator
      embedded={embedded}
      initialType="heizmethodenWaermepumpe"
    />
  );
}
