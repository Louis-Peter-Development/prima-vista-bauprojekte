import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import type { BlogPost } from '../types/blog';
import '../styles/pages/blog.css';

type StatusFilter = 'all' | 'published' | 'draft';
type SortKey = 'order' | 'newest' | 'views' | 'likes';

function formatDate(value: string | null) {
  if (!value) return 'Entwurf';
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value));
}

const numberFormat = new Intl.NumberFormat('de-DE');
const fmtNum = (n: number) => numberFormat.format(n);

export default function AdminBlog() {
  usePageTitle('Admin Magazin');
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // Gate the dashboard behind a confirmed admin session so we never flash the
  // logged-in UI before the auth check resolves (and redirects) for visitors.
  const [authorized, setAuthorized] = useState(false);

  // Client-side board controls.
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('order');

  const loadPosts = () => {
    setLoading(true);
    setError('');
    fetch('/api/posts?all=true')
      .then(async (res) => {
        if (res.status === 401) throw new Error('unauthorized');
        if (!res.ok) throw new Error('Beiträge konnten nicht geladen werden.');
        return res.json() as Promise<{ posts: BlogPost[]; isAdmin: boolean }>;
      })
      .then((data) => {
        if (!data.isAdmin) {
          navigate('/admin/login', { replace: true });
          return;
        }
        setAuthorized(true);
        setPosts(data.posts);
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.message === 'unauthorized') navigate('/admin/login', { replace: true });
        else setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(loadPosts, [navigate]);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    navigate('/admin/login');
  };

  const remove = async (post: BlogPost) => {
    if (!window.confirm(`Beitrag "${post.title}" löschen?`)) return;
    const res = await fetch(`/api/posts/${post.slug}`, { method: 'DELETE' });
    if (res.ok) loadPosts();
  };

  const move = async (post: BlogPost, direction: 'up' | 'down') => {
    const res = await fetch(`/api/posts/${post.slug}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ direction }),
    });
    if (res.ok) loadPosts();
  };

  const published = posts.filter((post) => post.status === 'published').length;
  const drafts = posts.length - published;

  // Manual reorder is only coherent in the natural "Reihenfolge" order with no
  // filter or search narrowing the list.
  const canReorder = sort === 'order' && filter === 'all' && !query.trim();

  const visiblePosts = useMemo(() => {
    let list = posts.slice();
    if (filter !== 'all') list = list.filter((post) => post.status === filter);
    const q = query.trim().toLowerCase();
    if (q) list = list.filter((post) => post.title.toLowerCase().includes(q));
    if (sort === 'newest') {
      list.sort(
        (a, b) =>
          (b.publishedAt ? +new Date(b.publishedAt) : Infinity) -
          (a.publishedAt ? +new Date(a.publishedAt) : Infinity),
      );
    } else if (sort === 'views') {
      list.sort((a, b) => b.views - a.views);
    } else if (sort === 'likes') {
      list.sort((a, b) => b.likes - a.likes);
    }
    // 'order' keeps the server's sortOrder (the array is returned pre-sorted).
    return list;
  }, [posts, filter, query, sort]);

  // Until the session is confirmed, show a neutral check screen — not the
  // dashboard — so unauthenticated visitors don't briefly see admin content.
  if (!authorized) {
    return (
      <section className="blog-admin-login">
        <p className="blog-state" role="status">
          {error || 'Anmeldung wird geprüft …'}
        </p>
      </section>
    );
  }

  const views = posts.reduce((sum, post) => sum + post.views, 0);
  const likes = posts.reduce((sum, post) => sum + post.likes, 0);
  const total = posts.length;

  const boardCount =
    visiblePosts.length === total
      ? `${total} ${total === 1 ? 'Eintrag' : 'Einträge'} im Magazin.`
      : `${visiblePosts.length} von ${total} Einträgen`;

  return (
    <section className="blog-admin">
      <div className="blog-admin__hero">
        <div>
          <span className="pv-eyebrow">Admin</span>
          <h1>Magazin</h1>
          <p>
            Beiträge planen, veröffentlichen und die wichtigsten Signale aus
            dem Magazin im Blick behalten.
          </p>
        </div>
        <div className="blog-admin__actions">
          <Link className="btn btn--solid" to="/admin/blog/new">Neuer Beitrag</Link>
          <Link className="btn btn--light" to="/blog">Öffentlich ansehen</Link>
          <button className="btn btn--light" type="button" onClick={logout}>Logout</button>
        </div>
      </div>

      {error && <p className="blog-state blog-state--error">{error}</p>}

      <div className="blog-admin-stats" aria-label="Magazin Übersicht">
        <div>
          <span>Beiträge</span>
          <strong>{total}</strong>
        </div>
        <div>
          <span>Veröffentlicht</span>
          <strong>{published}</strong>
        </div>
        <div>
          <span>Entwürfe</span>
          <strong>{drafts}</strong>
        </div>
        <div>
          <span>Views / Likes</span>
          <strong>{fmtNum(views)} / {fmtNum(likes)}</strong>
        </div>
      </div>

      <div className="blog-admin-board">
        <div className="blog-admin-board__head">
          <div>
            <h2>Beiträge</h2>
            <p>{loading ? 'Wird geladen.' : boardCount}</p>
          </div>
          <Link className="blog-admin-board__mini-link" to="/admin/blog/new">
            Beitrag anlegen
          </Link>
        </div>

        {total > 0 && (
          <div className="admin-toolbar">
            <div className="admin-toolbar__left">
              <div className="admin-filter" role="group" aria-label="Nach Status filtern">
                <button
                  type="button"
                  className={filter === 'all' ? 'is-active' : ''}
                  onClick={() => setFilter('all')}
                >
                  Alle <span className="count">{total}</span>
                </button>
                <button
                  type="button"
                  className={filter === 'published' ? 'is-active' : ''}
                  onClick={() => setFilter('published')}
                >
                  Veröffentlicht <span className="count">{published}</span>
                </button>
                <button
                  type="button"
                  className={filter === 'draft' ? 'is-active' : ''}
                  onClick={() => setFilter('draft')}
                >
                  Entwürfe <span className="count">{drafts}</span>
                </button>
              </div>
            </div>
            <div className="admin-toolbar__right">
              <div className="admin-search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Titel suchen…"
                  aria-label="Beiträge nach Titel suchen"
                />
              </div>
              <label className="admin-sort">
                <span>Sortieren</span>
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value as SortKey)}
                  aria-label="Beiträge sortieren"
                >
                  <option value="order">Reihenfolge</option>
                  <option value="newest">Neueste zuerst</option>
                  <option value="views">Meiste Views</option>
                  <option value="likes">Meiste Likes</option>
                </select>
              </label>
            </div>
          </div>
        )}

        {sort === 'order' && !canReorder && total > 0 && (
          <p className="admin-orderhint">
            Manuelle Reihenfolge ist nur in der Sortierung „Reihenfolge" und ohne Filter/Suche verfügbar.
          </p>
        )}

        {!loading && total === 0 && !error && (
          <div className="blog-admin-empty">
            <img src="/assets/img/photo-altbausanierung.webp" alt="" loading="lazy" />
            <div>
              <span className="pv-eyebrow">Erster Beitrag</span>
              <h2>Noch keine Inhalte.</h2>
              <p>
                Starten Sie mit einem Ratgeber, einer Projektgeschichte oder
                einer kurzen Checkliste für Bauherrinnen und Bauherren.
              </p>
              <Link className="btn btn--solid" to="/admin/blog/new">Ersten Beitrag schreiben</Link>
            </div>
          </div>
        )}

        {loading && <p className="blog-state" style={{ padding: '28px' }}>Beiträge werden geladen.</p>}

        {!loading && total > 0 && visiblePosts.length === 0 && (
          <div className="admin-noresults">
            <h3>Keine Beiträge gefunden.</h3>
            <p>Passen Sie Suche oder Filter an, um weitere Einträge zu sehen.</p>
          </div>
        )}

        <div className="blog-admin-table">
          {visiblePosts.map((post, index) => (
            <article className="blog-admin-row" key={post.id}>
              <div className="blog-admin-row__media">
                {post.coverImageUrl ? <img src={post.coverImageUrl} alt="" loading="lazy" /> : <span />}
              </div>
              <div className="blog-admin-row__main">
                <span className={`blog-admin-status blog-admin-status--${post.status}`}>
                  {post.status === 'published' ? 'Veröffentlicht' : 'Entwurf'}
                </span>
                <strong>{post.title}</strong>
                <span>{formatDate(post.publishedAt)} · {post.readingTime} Min. · {fmtNum(post.views)} Views · {fmtNum(post.likes)} Likes</span>
                {post.excerpt && <p>{post.excerpt}</p>}
              </div>
              <div className="blog-admin-row__actions">
                {canReorder && (
                  <div className="blog-admin-row__move" aria-label="Beitrag verschieben">
                    <button className="btn btn--light" type="button" disabled={index === 0} onClick={() => move(post, 'up')}>Hoch</button>
                    <button className="btn btn--light" type="button" disabled={index === visiblePosts.length - 1} onClick={() => move(post, 'down')}>Runter</button>
                  </div>
                )}
                {post.status === 'published' && (
                  <Link className="btn btn--light" to={`/blog/${post.slug}`}>Ansehen</Link>
                )}
                <Link className="btn btn--light" to={`/admin/blog/${post.slug}`}>Bearbeiten</Link>
                <button className="btn btn--light" type="button" onClick={() => remove(post)}>Löschen</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
