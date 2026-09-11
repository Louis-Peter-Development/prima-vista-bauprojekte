import { beforeEach, describe, expect, it, vi } from 'vitest';

const hooks = vi.hoisted(() => ({
  states: [] as unknown[],
  stateIndex: 0,
  dependencies: [] as (readonly unknown[] | undefined)[],
  effectIndex: 0,
  pendingEffects: [] as (() => void)[],
  allowed: true,
  markVideoActive: vi.fn(),
  openConsentBanner: vi.fn(),
}));

// Exercise the real render and click handlers without mounting YouTube frames.
vi.mock('react', async (importOriginal) => ({
  ...await importOriginal<typeof import('react')>(),
  useState: (initial: unknown) => {
    const index = hooks.stateIndex++;
    if (!(index in hooks.states)) hooks.states[index] = typeof initial === 'function' ? initial() : initial;
    return [hooks.states[index], (value: unknown) => {
      hooks.states[index] = typeof value === 'function' ? value(hooks.states[index]) : value;
    }];
  },
  useEffect: (effect: () => void, dependencies?: readonly unknown[]) => {
    const index = hooks.effectIndex++;
    const previous = hooks.dependencies[index];
    if (!dependencies || !previous || dependencies.some((value, i) => !Object.is(value, previous[i]))) {
      hooks.pendingEffects.push(effect);
    }
    hooks.dependencies[index] = dependencies;
  },
}));
vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }));
vi.mock('../../src/hooks/useVideoPlayback', () => ({ useVideoActive: hooks.markVideoActive }));
vi.mock('../../src/hooks/useConsent', async (importOriginal) => ({
  ...await importOriginal<typeof import('../../src/hooks/useConsent')>(),
  useConsent: () => ({ version: 2, choice: 'custom', youtube: hooks.allowed }),
  openConsentBanner: hooks.openConsentBanner,
}));

import HomeAboutVideo from '../../src/components/home/HomeAboutVideo';
import ProjectFeatureVideo from '../../src/components/projekte/ProjectFeatureVideo';
import ProjectVideos from '../../src/components/projekte/ProjectVideos';

type Node = { type: unknown; props: Record<string, unknown> };
function nodes(value: unknown): Node[] {
  if (Array.isArray(value)) return value.flatMap(nodes);
  if (!value || typeof value !== 'object' || !('props' in value)) return [];
  const node = value as Node;
  return [node, ...nodes(node.props.children)];
}
function render(component: () => unknown) {
  hooks.stateIndex = 0;
  hooks.effectIndex = 0;
  return nodes(component());
}
function flushEffects() {
  for (const effect of hooks.pendingEffects.splice(0)) effect();
}
function playButtons(tree: Node[]) {
  return tree.filter((node) => node.type === 'button' && String(node.props.className).includes('--facade'));
}
function activate(button: Node) {
  (button.props.onClick as () => void)();
}

const video = { id: 'local-test-video', label: 'Test video' };
const props = { headline: 'Test project', poster: '/test-poster.webp' };
const components = [
  { name: 'homepage video', component: () => HomeAboutVideo(), count: 1 },
  { name: 'project feature', component: () => ProjectFeatureVideo({ ...props, video }), count: 1 },
  { name: 'project gallery', component: () => ProjectVideos({ ...props, videos: [video, { id: 'second-test-video' }] }), count: 2 },
];

beforeEach(() => {
  hooks.states = [];
  hooks.stateIndex = 0;
  hooks.dependencies = [];
  hooks.effectIndex = 0;
  hooks.pendingEffects = [];
  hooks.allowed = true;
  hooks.markVideoActive.mockClear();
  hooks.openConsentBanner.mockClear();
});

describe.each(components)('$name consent withdrawal', ({ component, count }) => {
  it('removes every active iframe immediately and requires another play click after consent is restored', () => {
    const initial = render(component);
    flushEffects();
    for (const button of playButtons(initial)) activate(button);
    expect(render(component).filter((node) => node.type === 'iframe')).toHaveLength(count);
    expect(hooks.markVideoActive).toHaveBeenLastCalledWith(true);

    hooks.allowed = false;
    const withdrawn = render(component);
    // Assert removal before effects reset the remembered play state.
    expect(withdrawn.filter((node) => node.type === 'iframe')).toHaveLength(0);
    expect(hooks.markVideoActive).toHaveBeenLastCalledWith(false);
    flushEffects();

    hooks.allowed = true;
    const restored = render(component);
    flushEffects();
    expect(restored.filter((node) => node.type === 'iframe')).toHaveLength(0);
    expect(hooks.markVideoActive).toHaveBeenLastCalledWith(false);
    activate(playButtons(restored)[0]);
    expect(render(component).filter((node) => node.type === 'iframe')).toHaveLength(1);
  });

  it('opens settings instead of playing when consent is absent', () => {
    hooks.allowed = false;
    const tree = render(component);
    flushEffects();
    activate(playButtons(tree)[0]);
    expect(hooks.openConsentBanner).toHaveBeenCalledOnce();
    expect(render(component).filter((node) => node.type === 'iframe')).toHaveLength(0);
    expect(hooks.markVideoActive).toHaveBeenLastCalledWith(false);
  });
});
