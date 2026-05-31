import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageIntro from '../components/common/PageIntro';
import { usePageTitle } from '../hooks/usePageTitle';
import type { BlogPost } from '../types/blog';
import '../styles/pages/blog.css';

function formatDate(value: string | null) {
  if (!value) return 'Entwurf';
  return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }).format(
    new Date(value),
  );
}

export default function Blog() {
  usePageTitle('Magazin');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    fetch('/api/posts')
      .then(async (res) => {
        if (!res.ok) throw new Error('Beiträge konnten nicht geladen werden.');
        return res.json() as Promise<{ posts: BlogPost[] }>;
      })
      .then((data) => {
        if (!cancelled) setPosts(data.posts);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <PageIntro
        backgroundImage="/assets/img/photo-altbausanierung.webp"
        crumbNumber="07"
        crumbLabel="Magazin"
        title={<>Ideen für<br />bessere <em>Räume.</em></>}
        lede="Planung, Material, Ablauf und Entscheidungen rund um Sanierung, Ausbau und Renovierung."
        meta={[
          { label: 'Format', value: 'Ratgeber & Einblicke' },
          { label: 'Fokus', value: 'Wohnsitz · Gewerbe · Gastro' },
          { label: 'Region', value: 'Frankfurt · Luzern' },
          { label: 'Archiv', value: `${posts.length} Beiträge` },
        ]}
      />

      <section className="blog-list" aria-busy={loading}>
        <div className="blog-list__inner">
          {loading && (
            <>
              <p className="blog-state blog-state--sr" role="status">
                Beiträge werden geladen.
              </p>
              <div className="blog-list__grid" aria-hidden="true">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div className="blog-card blog-card--skeleton" key={index}>
                    <span className="blog-card__media sk-shimmer" />
                    <span className="blog-card__body">
                      <span className="sk-line sk-line--meta sk-shimmer" />
                      <span className="sk-line sk-line--title sk-shimmer" />
                      <span className="sk-line sk-line--title sk-line--short sk-shimmer" />
                      <span className="sk-line sk-line--text sk-shimmer" />
                      <span className="sk-line sk-line--text sk-shimmer" />
                      <span className="sk-line sk-line--text sk-line--short sk-shimmer" />
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
          {error && <p className="blog-state blog-state--error">{error}</p>}
          {!loading && !error && posts.length === 0 && (
            <p className="blog-state">Noch keine veröffentlichten Beiträge.</p>
          )}

          <div className="blog-list__grid">
            {posts.map((post) => (
              <Link className="blog-card" to={`/blog/${post.slug}`} key={post.id}>
                <span className="blog-card__media">
                  {post.coverImageUrl ? (
                    <img src={post.coverImageUrl} alt="" loading="lazy" />
                  ) : (
                    <span className="blog-card__placeholder" />
                  )}
                </span>
                <span className="blog-card__body">
                  <span className="blog-card__meta">
                    {formatDate(post.publishedAt)} · {post.readingTime} Min.
                  </span>
                  <span className="blog-card__title">{post.title}</span>
                  <span className="blog-card__excerpt">{post.excerpt}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
