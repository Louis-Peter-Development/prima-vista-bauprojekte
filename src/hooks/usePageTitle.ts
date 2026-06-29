import { useEffect } from 'react';
import { setPageMeta } from '../utils/metadata';

/**
 * Override the page <title> (and, optionally, the meta description) for the
 * current route. Runs after the global RouteMetadata effect, so a localized
 * value here wins over the route-table fallback — which is how locale-specific
 * pages keep their title/description in EN/IT even when ROUTE_META_I18N has no
 * entry for that path.
 */
export function usePageTitle(title: string, description?: string) {
  useEffect(() => {
    setPageMeta(description ? { title, description } : { title });
  }, [title, description]);
}
