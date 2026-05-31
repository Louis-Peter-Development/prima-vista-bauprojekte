import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ArticleRenderer from '../components/blog/ArticleRenderer';
import { usePageTitle } from '../hooks/usePageTitle';
import type { BlogComment, BlogPost } from '../types/blog';
import '../styles/pages/blog.css';

function formatDate(value: string | null) {
  if (!value) return 'Entwurf';
  return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }).format(
    new Date(value),
  );
}

export default function BlogDetail() {
  const { slug = '' } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [morePosts, setMorePosts] = useState<BlogPost[]>([]);
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [liked, setLiked] = useState(() => localStorage.getItem(`pv-liked-${slug}`) === 'true');

  usePageTitle(post ? `${post.title} - Magazin` : 'Magazin');

  const shareUrl = useMemo(() => window.location.href, []);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;

    Promise.all([
      fetch(`/api/posts/${slug}`).then(async (res) => {
        if (!res.ok) throw new Error('Beitrag nicht gefunden.');
        return res.json() as Promise<{ post: BlogPost }>;
      }),
      fetch(`/api/comments/${slug}`).then((res) => res.json() as Promise<{ comments: BlogComment[] }>),
      fetch('/api/posts').then((res) => res.json() as Promise<{ posts: BlogPost[] }>),
    ])
      .then(([postData, commentsData, postsData]) => {
        if (cancelled) return;
        setPost(postData.post);
        setComments(commentsData.comments ?? []);
        setMorePosts((postsData.posts ?? []).filter((item) => item.slug !== slug).slice(0, 3));
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
      });

    const viewKey = `pv-viewed-${slug}`;
    if (!sessionStorage.getItem(viewKey)) {
      sessionStorage.setItem(viewKey, 'true');
      fetch(`/api/views/${slug}`, { method: 'POST' }).catch(() => undefined);
    }

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    setLiked(localStorage.getItem(`pv-liked-${slug}`) === 'true');
  }, [slug]);

  const likePost = async () => {
    if (!post || liked) return;
    const res = await fetch(`/api/likes/${post.slug}`, { method: 'POST' });
    if (!res.ok) return;
    const data = (await res.json()) as { likes: number };
    localStorage.setItem(`pv-liked-${post.slug}`, 'true');
    setLiked(true);
    setPost({ ...post, likes: data.likes });
  };

  const sharePost = async () => {
    if (navigator.share && post) {
      await navigator.share({ title: post.title, url: shareUrl });
      return;
    }
    await navigator.clipboard.writeText(shareUrl);
    setMessage('Link kopiert.');
  };

  const submitComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    const res = await fetch(`/api/comments/${slug}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name, body }),
    });
    const data = (await res.json()) as { comment?: BlogComment; error?: string };
    if (!res.ok || !data.comment) {
      setMessage(data.error ?? 'Kommentar konnte nicht gespeichert werden.');
      return;
    }
    setComments((current) => [...current, data.comment as BlogComment]);
    setName('');
    setBody('');
    setMessage('Kommentar veröffentlicht.');
  };

  if (error) {
    return (
      <section className="blog-shell">
        <div className="blog-shell__inner">
          <p className="blog-state blog-state--error">{error}</p>
          <Link className="btn btn--light" to="/blog">Zurück zum Magazin</Link>
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="blog-shell">
        <div className="blog-shell__inner">
          <p className="blog-state">Beitrag wird geladen.</p>
        </div>
      </section>
    );
  }

  return (
    <article className="blog-article">
      <header className="blog-article__hero">
        {post.coverImageUrl && <img src={post.coverImageUrl} alt="" />}
        <div className="blog-article__hero-inner">
          <Link className="blog-back" to="/blog">Magazin</Link>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <div className="blog-article__meta">
            <span>{post.author}</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span>{post.readingTime} Min. Lesezeit</span>
          </div>
        </div>
      </header>

      <section className="blog-article__main">
        <ArticleRenderer content={post.body} />

        <div className="blog-article__tools">
          <button type="button" className="btn btn--light" disabled={liked} onClick={likePost}>
            {liked ? 'Gemerkt' : 'Like'} <span>{post.likes}</span>
          </button>
          <button type="button" className="btn btn--light" onClick={sharePost}>
            Teilen
          </button>
        </div>

        <section className="blog-comments">
          <div className="blog-comments__head">
            <h2>Kommentare</h2>
            <span>{comments.length}</span>
          </div>

          <div className="blog-comments__list">
            {comments.map((comment) => (
              <article className="blog-comment" key={comment.id}>
                <strong>{comment.name}</strong>
                <time>{formatDate(comment.createdAt)}</time>
                <p>{comment.body}</p>
              </article>
            ))}
          </div>

          <form className="blog-comment-form" onSubmit={submitComment}>
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Name" required />
            <textarea value={body} onChange={(event) => setBody(event.target.value)} placeholder="Kommentar" rows={4} required />
            <button className="btn btn--solid" type="submit">Kommentar senden</button>
            {message && <p>{message}</p>}
          </form>
        </section>

        {morePosts.length > 0 && (
          <section className="blog-more">
            <div className="blog-more__head">
              <span className="pv-eyebrow">Weiterlesen</span>
              <h2>Weitere Beiträge</h2>
            </div>
            <div className="blog-more__grid">
              {morePosts.map((item) => (
                <Link className="blog-more-card" to={`/blog/${item.slug}`} key={item.id}>
                  <span className="blog-card__media">
                    {item.coverImageUrl ? <img src={item.coverImageUrl} alt="" /> : <span className="blog-card__placeholder" />}
                  </span>
                  <span className="blog-more-card__body">
                    <span className="blog-card__meta">{formatDate(item.publishedAt)} · {item.readingTime} Min.</span>
                    <span className="blog-more-card__title">{item.title}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </section>
    </article>
  );
}
