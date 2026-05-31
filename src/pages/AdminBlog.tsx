import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import type { BlogPost } from '../types/blog';
import '../styles/pages/blog.css';

function formatDate(value: string | null) {
  if (!value) return 'Entwurf';
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value));
}

export default function AdminBlog() {
  usePageTitle('Admin Magazin');
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // Gate the dashboard behind a confirmed admin session so we never flash the
  // logged-in UI before the auth check resolves (and redirects) for visitors.
  const [authorized, setAuthorized] = useState(false);

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

  const published = posts.filter((post) => post.status === 'published').length;
  const drafts = posts.length - published;
  const views = posts.reduce((sum, post) => sum + post.views, 0);
  const likes = posts.reduce((sum, post) => sum + post.likes, 0);

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
          <strong>{posts.length}</strong>
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
          <strong>{views} / {likes}</strong>
        </div>
      </div>

      <div className="blog-admin-help">
        <div>
          <h2>Schnelle Themen</h2>
          <p>Badsanierung, Kostenrahmen, Altbau, Heizung, Ablauf, Materialwahl.</p>
        </div>
        <div>
          <h2>Veröffentlichung</h2>
          <p>Entwürfe bleiben privat. Nur veröffentlichte Beiträge erscheinen auf /blog.</p>
        </div>
      </div>

      <div className="blog-admin-board">
        <div className="blog-admin-board__head">
          <div>
            <h2>Beiträge</h2>
            <p>{loading ? 'Wird geladen.' : `${posts.length} Einträge im Magazin.`}</p>
          </div>
          <Link className="blog-admin-board__mini-link" to="/admin/blog/new">
            Beitrag anlegen
          </Link>
        </div>

        {!loading && posts.length === 0 && !error && (
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

        {loading && <p className="blog-state">Beiträge werden geladen.</p>}

        <div className="blog-admin-table">
          {posts.map((post, index) => (
            <article className="blog-admin-row" key={post.id}>
              <div className="blog-admin-row__media">
                {post.coverImageUrl ? <img src={post.coverImageUrl} alt="" loading="lazy" /> : <span />}
              </div>
              <div className="blog-admin-row__main">
                <span className={`blog-admin-status blog-admin-status--${post.status}`}>
                  {post.status === 'published' ? 'Veröffentlicht' : 'Entwurf'}
                </span>
                <strong>{post.title}</strong>
                <span>{formatDate(post.publishedAt)} · {post.readingTime} Min. · {post.views} Views · {post.likes} Likes</span>
                {post.excerpt && <p>{post.excerpt}</p>}
              </div>
              <div className="blog-admin-row__actions">
                <div className="blog-admin-row__move" aria-label="Beitrag verschieben">
                  <button className="btn btn--light" type="button" disabled={index === 0} onClick={() => move(post, 'up')}>Hoch</button>
                  <button className="btn btn--light" type="button" disabled={index === posts.length - 1} onClick={() => move(post, 'down')}>Runter</button>
                </div>
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
