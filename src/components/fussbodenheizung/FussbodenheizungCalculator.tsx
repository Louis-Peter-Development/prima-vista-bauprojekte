import HeizmethodenRouteCalculator from '../gewerke/HeizmethodenRouteCalculator';

export default function FussbodenheizungCalculator({ embedded }: { embedded?: boolean } = {}) {
  return (
    <HeizmethodenRouteCalculator
      embedded={embedded}
      initialType="heizmethodenFussbodenheizung"
    />
  );
}
