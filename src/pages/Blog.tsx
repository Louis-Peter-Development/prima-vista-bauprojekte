import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '../i18n/Link';
import { useLocale } from '../i18n/useLocale';
import type { Locale } from '../i18n/routes';
import CoverImage from '../components/blog/CoverImage';
import { usePageTitle } from '../hooks/usePageTitle';
import type { BlogPost } from '../types/blog';
import '../styles/pages/blog.css';

const DATE_LOCALE: Record<Locale, string> = {
  de: 'de-DE',
  en: 'en-GB',
  it: 'it-IT',
};

function formatDate(value: string | null, locale: Locale, draft: string) {
  if (!value) return draft;
  return new Intl.DateTimeFormat(DATE_LOCALE[locale], {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value));
}

const pad = (n: number) => String(n).padStart(2, '0');

export default function Blog() {
  const { t } = useTranslation('blog');
  const locale = useLocale();
  usePageTitle(t('pageTitle'));
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/posts?locale=${locale}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(t('loadError'));
        return res.json() as Promise<{ posts: BlogPost[] }>;
      })
      .then((data) => {
        if (!cancelled) setPosts(data.posts);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : t('unknownError'));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [locale, t]);

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
    <header className="mag-masthead">
      <img className="mag-masthead__bg" src="/assets/img/photo-altbausanierung.webp" alt="" />
      <div className="mag-masthead__inner">
        <div className="mag-masthead__rule animate-in">
          <span>Prima Vista Bauprojekte</span>
          <span>
            <span className="num">
              {total > 0 ? t('masthead.issue', { number: pad(total) }) : t('masthead.issueEmpty')}
            </span>
            &nbsp;&nbsp;·&nbsp;&nbsp;{t('masthead.place')}
          </span>
        </div>

        <div className="mag-masthead__foot">
          <div className="mag-masthead__plate animate-in" data-delay="1">
            <span className="mag-masthead__eyebrow">{t('masthead.eyebrow')}</span>
            <h1 className="mag-masthead__name">{t('masthead.name')}</h1>
            <p className="mag-masthead__sub">{t('masthead.sub')}</p>
          </div>

          <dl className="mag-masthead__meta animate-in" data-delay="2">
            <div>
              <dt>{t('meta.formatLabel')}</dt>
              <dd>{t('meta.formatValue')}</dd>
            </div>
            <div>
              <dt>{t('meta.focusLabel')}</dt>
              <dd>{t('meta.focusValue')}</dd>
            </div>
            <div>
              <dt>{t('meta.regionLabel')}</dt>
              <dd>{t('meta.regionValue')}</dd>
            </div>
            <div>
              <dt>{t('meta.archiveLabel')}</dt>
              <dd>{t('meta.archiveValue', { count: total })}</dd>
            </div>
          </dl>
        </div>
      </div>
    </header>
    <section className="mag" aria-busy={loading}>
      <div className="mag__inner">

        {loading && (
          <>
            <p className="blog-state blog-state--sr" role="status">
              {t('loading')}
            </p>
            <div className="mag-divider" aria-hidden="true">
              <span className="mag-divider__label">{t('divider')}</span>
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
          <p className="blog-state">{t('empty')}</p>
        )}

        {!loading && !error && lead && (
          <Link className="mag-lead" to={`/blog/${lead.slug}`}>
            <span className="mag-lead__media">
              <span className="mag-lead__tag">{t('leadTag')}</span>
              <CoverImage src={lead.coverImageUrl} />
            </span>
            <span className="mag-lead__body">
              <span className="mag-lead__kicker">
                <span className="num">№ {pad(issueOf(lead))}</span> ·{' '}
                {t('readingTime', { minutes: lead.readingTime })}
              </span>
              <h2 className="mag-lead__title">{lead.title}</h2>
              <p className="mag-lead__excerpt">{lead.excerpt}</p>
              <span className="mag-lead__foot">
                <span className="author">{lead.author}</span>
                <span className="sep">/</span>
                <span>{formatDate(lead.publishedAt, locale, t('draft'))}</span>
                <span className="mag-lead__more">
                  {t('readMore')} <span className="arr">→</span>
                </span>
              </span>
            </span>
          </Link>
        )}

        {!loading && !error && rest.length > 0 && (
          <>
            <div className="mag-divider">
              <span className="mag-divider__label">{t('divider')}</span>
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
                      {formatDate(post.publishedAt, locale, t('draft'))} ·{' '}
                      {t('readingTimeShort', { minutes: post.readingTime })}
                    </span>
                    <h3 className="mag-card__title">{post.title}</h3>
                    <p className="mag-card__excerpt">{post.excerpt}</p>
                    <span className="mag-card__more">
                      {t('read')} <span className="arr">→</span>
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
