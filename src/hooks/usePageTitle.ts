import { useEffect } from 'react';
import { setPageMeta } from '../utils/metadata';

export function usePageTitle(title: string) {
  useEffect(() => {
    setPageMeta({ title });
  }, [title]);
}
