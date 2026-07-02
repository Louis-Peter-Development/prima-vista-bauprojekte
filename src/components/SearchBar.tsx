import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocale, useLocalizedPath } from '../i18n/useLocale';
import { SEARCH_INDEX, SEARCH_GROUP_LABELS, type SearchGroup } from '../data/searchIndex';
import { SearchIcon, CloseIcon } from './icons';

type Result = {
  path: string;
  label: string;
  lead?: string;
  group: SearchGroup | 'magazine';
};

type PostLite = { title: string; slug: string };

const MAX_RESULTS = 8;
const GROUP_ORDER: Array<SearchGroup | 'magazine'> = ['page', 'service', 'magazine'];

/** Lowercase + strip diacritics so "fenster" matches "Fenstertechnik" and
 *  "cucina" matches "Cucina", regardless of accents. */
function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

export default function SearchBar({ className = '' }: { className?: string }) {
  const { t } = useTranslation();
  const locale = useLocale();
  const localizedPath = useLocalizedPath();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [compactOpen, setCompactOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [posts, setPosts] = useState<PostLite[]>([]);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listId = useId();

  // Magazine posts for the active locale (best-effort; absent in pure-static dev).
  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    fetch(`/api/posts?locale=${locale}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : { posts: [] }))
      .then((data: { posts?: Array<{ title?: string; slug?: string }> }) => {
        if (cancelled) return;
        const list = (data.posts ?? [])
          .filter((p): p is PostLite => Boolean(p.title && p.slug))
          .map((p) => ({ title: p.title, slug: p.slug }));
        setPosts(list);
      })
      .catch(() => {
        /* search still works over pages/services without the posts API */
      });
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [locale]);

  const results = useMemo<Result[]>(() => {
    const q = normalize(query.trim());
    if (!q) return [];

    const indexResults: Result[] = SEARCH_INDEX.map((entry) => ({
      path: entry.path,
      label: t(entry.label),
      lead: entry.lead ? t(entry.lead) : undefined,
      group: entry.group,
    }));

    const postResults: Result[] = posts.map((p) => ({
      path: `/blog/${p.slug}`,
      label: p.title,
      group: 'magazine' as const,
    }));

    return [...indexResults, ...postResults]
      .filter((r) => {
        const haystack = normalize(`${r.label} ${r.lead ?? ''}`);
        return haystack.includes(q);
      })
      .slice(0, MAX_RESULTS);
  }, [query, posts, t]);

  // Group results in a stable order while keeping a flat index for keyboard nav.
  const grouped = useMemo(() => {
    return GROUP_ORDER.map((group) => ({
      group,
      items: results.filter((r) => r.group === group),
    })).filter((g) => g.items.length > 0);
  }, [results]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setCompactOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  const go = (path: string) => {
    navigate(localizedPath(path));
    setOpen(false);
    setCompactOpen(false);
    setQuery('');
    inputRef.current?.blur();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
      setCompactOpen(false);
      inputRef.current?.blur();
      return;
    }
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = results[active];
      if (target) go(target.path);
    }
  };

  const showPanel = open && query.trim().length > 0;
  let flatIndex = -1;

  return (
    <div className={`pv-search${compactOpen ? ' is-compact-open' : ''} ${className}`} ref={rootRef}>
      <button
        type="button"
        className="pv-search__trigger"
        aria-label={t('search.open')}
        aria-expanded={compactOpen}
        onClick={() => {
          setCompactOpen(true);
          setOpen(true);
          requestAnimationFrame(() => inputRef.current?.focus());
        }}
      >
        <SearchIcon aria-hidden="true" />
      </button>
      <div className="pv-search__field">
        <SearchIcon className="pv-search__icon" aria-hidden="true" />
        <input
          ref={inputRef}
          type="search"
          className="pv-search__input"
          value={query}
          placeholder={t('search.placeholder')}
          aria-label={t('search.aria')}
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="off"
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
        {(query || compactOpen) && (
          <button
            type="button"
            className="pv-search__clear"
            aria-label={t('search.close')}
            onClick={() => {
              if (query) {
                setQuery('');
                inputRef.current?.focus();
              } else {
                setOpen(false);
                setCompactOpen(false);
                inputRef.current?.blur();
              }
            }}
          >
            <CloseIcon aria-hidden="true" />
          </button>
        )}
      </div>

      {showPanel && (
        <div className="pv-search__panel" id={listId} role="listbox">
          {results.length === 0 ? (
            <p className="pv-search__empty">{t('search.noResults', { query: query.trim() })}</p>
          ) : (
            grouped.map((g) => (
              <div className="pv-search__group" key={g.group}>
                <p className="pv-search__group-label">{t(SEARCH_GROUP_LABELS[g.group])}</p>
                <ul>
                  {g.items.map((r) => {
                    flatIndex += 1;
                    const isActive = flatIndex === active;
                    return (
                      <li key={`${r.group}-${r.path}`}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={isActive}
                          className={`pv-search__result${isActive ? ' is-active' : ''}`}
                          onMouseEnter={() => setActive(results.indexOf(r))}
                          onClick={() => go(r.path)}
                        >
                          <span className="pv-search__result-label">{r.label}</span>
                          {r.lead && <span className="pv-search__result-lead">{r.lead}</span>}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
