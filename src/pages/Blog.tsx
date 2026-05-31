import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import CoverImage from '../components/blog/CoverImage';
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

const pad = (n: number) => String(n).padStart(2, '0');

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

  const total = posts.length;
  const lead = posts[0];
  const rest = posts.slice(1);

  // Stable archive numbers: each post is numbered by chronological publish
  // order (oldest = №01, newest = highest), so a given post keeps its number
  // as the archive grows or is reordered — unlike a list-position counter.
  const archiveNumbers = useMemo(() => {
    const map = new Map<string, number>();
    posts
      .slice()
      .sort(
        (a, b) =>
          new Date(a.publishedAt ?? a.createdAt).getTime() -
          new Date(b.publishedAt ?? b.createdAt).getTime(),
      )
      .forEach((post, index) => map.set(post.id, index + 1));
    return map;
  }, [posts]);
  const issueOf = (post: BlogPost) => archiveNumbers.get(post.id) ?? 0;

  // The grid is 6 columns: the first two cards span 3 (2-up features), the
  // rest span 2 (3-up). Center an incomplete final row instead of leaving a
  // right-hand gap — and center a lone card when only one follows the lead.
  const gridClassName = (() => {
    const n = rest.length;
    const cls = ['mag-grid'];
    if (n === 1) cls.push('mag-grid--solo');
    else if (n > 2 && (n - 2) % 3 === 1) cls.push('mag-grid--tail-1');
    else if (n > 2 && (n - 2) % 3 === 2) cls.push('mag-grid--tail-2');
    if (n % 2 === 1) cls.push('mag-grid--odd');
    return cls.join(' ');
  })();

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
        { label: 'Archiv', value: `${total} ${total === 1 ? 'Beitrag' : 'Beiträge'}` },
      ]}
    />
    <section className="mag" aria-busy={loading}>
      <div className="mag__inner">

        {loading && (
          <>
            <p className="blog-state blog-state--sr" role="status">
              Beiträge werden geladen.
            </p>
            <div className="mag-divider" aria-hidden="true">
              <span className="mag-divider__label">Aktuelle Beiträge</span>
              <span className="mag-divider__line" />
            </div>
            <div className="mag-grid" aria-hidden="true">
              {Array.from({ length: 6 }).map((_, index) => (
                <article className="mag-card mag-card--skeleton" key={index}>
                  <span className="mag-card__media sk-shimmer" />
                  <span className="mag-card__body">
                    <span className="sk-line sk-line--meta sk-shimmer" />
                    <span className="sk-line sk-line--title sk-shimmer" />
                    <span className="sk-line sk-line--text sk-shimmer" />
                    <span className="sk-line sk-line--text sk-line--short sk-shimmer" />
                  </span>
                </article>
              ))}
            </div>
          </>
        )}

        {!loading && error && <p className="blog-state blog-state--error">{error}</p>}

        {!loading && !error && total === 0 && (
          <p className="blog-state">Noch keine veröffentlichten Beiträge.</p>
        )}

        {!loading && !error && lead && (
          <Link className="mag-lead" to={`/blog/${lead.slug}`}>
            <span className="mag-lead__media">
              <span className="mag-lead__tag">Leitartikel</span>
              <CoverImage src={lead.coverImageUrl} />
            </span>
            <span className="mag-lead__body">
              <span className="mag-lead__kicker">
                <span className="num">№ {pad(issueOf(lead))}</span> · {lead.readingTime} Min. Lesezeit
              </span>
              <h2 className="mag-lead__title">{lead.title}</h2>
              <p className="mag-lead__excerpt">{lead.excerpt}</p>
              <span className="mag-lead__foot">
                <span className="author">{lead.author}</span>
                <span className="sep">/</span>
                <span>{formatDate(lead.publishedAt)}</span>
                <span className="mag-lead__more">
                  Weiterlesen <span className="arr">→</span>
                </span>
              </span>
            </span>
          </Link>
        )}

        {!loading && !error && rest.length > 0 && (
          <>
            <div className="mag-divider">
              <span className="mag-divider__label">Aktuelle Beiträge</span>
              <span className="mag-divider__line" />
              <span className="mag-divider__count">
                {pad(rest.length)} / {pad(total)}
              </span>
            </div>

            <div className={gridClassName}>
              {rest.map((post) => (
                <Link className="mag-card" to={`/blog/${post.slug}`} key={post.id}>
                  <span className="mag-card__media">
                    <span className="mag-card__num">№ {pad(issueOf(post))}</span>
                    <CoverImage src={post.coverImageUrl} loading="lazy" />
                  </span>
                  <span className="mag-card__body">
                    <span className="mag-card__kicker">
                      {formatDate(post.publishedAt)} · {post.readingTime} Min.
                    </span>
                    <h3 className="mag-card__title">{post.title}</h3>
                    <p className="mag-card__excerpt">{post.excerpt}</p>
                    <span className="mag-card__more">
                      Lesen <span className="arr">→</span>
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}

        <div className="mag__outro" />
      </div>
    </section>
    </>
  );
}
