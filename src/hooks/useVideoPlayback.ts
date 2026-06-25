import { useEffect, useState } from 'react';

/** Fired whenever the number of actively-playing on-page videos changes. */
export const VIDEO_ACTIVITY_EVENT = 'pv-video-activity';

let activeCount = 0;

function emit() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<number>(VIDEO_ACTIVITY_EVENT, { detail: activeCount }));
}

/**
 * Register/unregister a playing video. Prefer the `useVideoActive` hook, which
 * handles the register/cleanup pairing for you.
 */
export function setVideoPlaying(playing: boolean) {
  activeCount = Math.max(0, activeCount + (playing ? 1 : -1));
  emit();
}

/** Mark a video as playing for as long as `active` is true (and while mounted). */
export function useVideoActive(active: boolean) {
  useEffect(() => {
    if (!active) return undefined;
    setVideoPlaying(true);
    return () => setVideoPlaying(false);
  }, [active]);
}

/** Reactive: true while at least one video on the page is playing. */
export function useAnyVideoPlaying(): boolean {
  const [count, setCount] = useState(activeCount);

  useEffect(() => {
    const handler = (event: Event) => setCount((event as CustomEvent<number>).detail);
    window.addEventListener(VIDEO_ACTIVITY_EVENT, handler);
    // Sync in case the count changed between render and subscription.
    setCount(activeCount);
    return () => window.removeEventListener(VIDEO_ACTIVITY_EVENT, handler);
  }, []);

  return count > 0;
}
