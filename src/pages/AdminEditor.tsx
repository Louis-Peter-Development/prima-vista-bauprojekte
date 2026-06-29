import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BlogEditor from '../components/blog/BlogEditor';
import { usePageTitle } from '../hooks/usePageTitle';
import { EMPTY_TIPTAP_DOC, type BlogPost, type PostStatus, type TiptapDoc } from '../types/blog';
import '../styles/pages/blog.css';

// The admin editor lives outside the localized URL space, so its UI/labels stay
// German on purpose. The DE/EN/IT tabs below are a *functional* control for
// authoring the per-language post content — not a localization of the chrome.
type EditLang = 'de' | 'en' | 'it' | 'fr';

// Per-language title + body. German maps to the canonical top-level post
// fields; en/it map to translations.en/.it (optional, German fallback).
type LangContent = { title: string; body: TiptapDoc };

const EMPTY_LANG: LangContent = { title: '', body: EMPTY_TIPTAP_DOC };

export default function AdminEditor() {
  const { slug } = useParams();
  const isNew = !slug || slug === 'new';
  usePageTitle(isNew ? 'Neuer Magazinbeitrag' : 'Magazinbeitrag bearbeiten');
  const navigate = useNavigate();
  const [author, setAuthor] = useState('Prima Vista Bauprojekte');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [status, setStatus] = useState<PostStatus>('draft');
  // Title + body per language. `de` is required; `en`/`it` are optional and
  // only sent when both their title and body are non-empty.
  const [content, setContent] = useState<Record<EditLang, LangContent>>({
    de: { ...EMPTY_LANG },
    en: { ...EMPTY_LANG },
    it: { ...EMPTY_LANG },
    fr: { ...EMPTY_LANG },
  });
  const [lang, setLang] = useState<EditLang>('de');
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  // Gate the editor behind a confirmed session so visitors never flash the
  // admin UI before the auth check resolves and redirects them to login.
  const [authorized, setAuthorized] = useState(false);

  const active = content[lang];
  const setActive = (patch: Partial<LangContent>) =>
    setContent((current) => ({ ...current, [lang]: { ...current[lang], ...patch } }));

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json() as Promise<{ isAdmin: boolean }>)
      .then((session) => {
        if (session.isAdmin) setAuthorized(true);
        else navigate('/admin/login', { replace: true });
      })
      .catch(() => navigate('/admin/login', { replace: true }));
  }, [navigate]);

  useEffect(() => {
    if (isNew || !slug) return;
    // Admin GET returns the German top-level fields plus `translations` (en/it),
    // so we can hydrate every language tab at once.
    fetch(`/api/posts/${slug}`)
      .then(async (res) => {
        if (res.status === 401) throw new Error('unauthorized');
        if (!res.ok) throw new Error('Beitrag konnte nicht geladen werden.');
        return res.json() as Promise<{ post: BlogPost }>;
      })
      .then(({ post }) => {
        setAuthor(post.author);
        setCoverImageUrl(post.coverImageUrl);
        setStatus(post.status);
        setContent({
          de: { title: post.title, body: post.body },
          en: post.translations?.en
            ? { title: post.translations.en.title, body: post.translations.en.body }
            : { ...EMPTY_LANG },
          it: post.translations?.it
            ? { title: post.translations.it.title, body: post.translations.it.body }
            : { ...EMPTY_LANG },
          fr: post.translations?.fr
            ? { title: post.translations.fr.title, body: post.translations.fr.body }
            : { ...EMPTY_LANG },
        });
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.message === 'unauthorized') navigate('/admin/login');
        else setMessage(err instanceof Error ? err.message : 'Unbekannter Fehler');
      });
  }, [isNew, navigate, slug]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    // Include en/it only when they have a title (the server further requires a
    // valid body); absent languages fall back to German on the public site.
    const translations: Record<string, LangContent> = {};
    (['en', 'it', 'fr'] as const).forEach((code) => {
      if (content[code].title.trim()) translations[code] = content[code];
    });
    const res = await fetch(isNew ? '/api/posts' : `/api/posts/${slug}`, {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        title: content.de.title,
        author,
        coverImageUrl,
        status,
        body: content.de.body,
        translations,
      }),
    });
    const data = (await res.json()) as { post?: BlogPost; error?: string };
    if (!res.ok || !data.post) {
      setMessage(data.error ?? 'Speichern fehlgeschlagen.');
      return;
    }
    navigate(`/admin/blog/${data.post.slug}`);
    setMessage('Gespeichert.');
  };

  const uploadCoverImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError('');
    setUploading(true);

    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/uploads', {
        method: 'POST',
        body: form,
      });
      const data = (await res.json()) as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        throw new Error(data.error ?? 'Upload fehlgeschlagen.');
      }

      setCoverImageUrl(data.url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload fehlgeschlagen.');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  if (!authorized) {
    return (
      <section className="blog-admin-login">
        <p className="blog-state" role="status">Anmeldung wird geprüft …</p>
      </section>
    );
  }

  return (
    <section className="blog-admin blog-admin--editor">
      <div className="blog-admin__head">
        <div>
          <span className="pv-eyebrow">Admin</span>
          <h1>{isNew ? 'Neuer Beitrag' : 'Beitrag bearbeiten'}</h1>
        </div>
        <Link className="btn btn--light" to="/admin/blog">Zurück</Link>
      </div>

      <form className="blog-admin-form" onSubmit={submit}>
        {/* Functional language tabs (admin tooling, kept German). DE edits the
            canonical post; EN/IT edit optional translations. */}
        <div className="blog-admin-langs" role="group" aria-label="Sprache">
          {(['de', 'en', 'it', 'fr'] as const).map((code) => (
            <button
              key={code}
              type="button"
              className={lang === code ? 'is-active' : ''}
              aria-pressed={lang === code}
              onClick={() => setLang(code)}
            >
              {code.toUpperCase()}
              {code !== 'de' && content[code].title.trim() ? ' ●' : ''}
            </button>
          ))}
        </div>
        <label>
          {lang === 'de' ? 'Titel' : `Titel (${lang.toUpperCase()}, optional)`}
          <input
            value={active.title}
            onChange={(event) => setActive({ title: event.target.value })}
            required={lang === 'de'}
          />
        </label>
        <label>
          Autor
          <input value={author} onChange={(event) => setAuthor(event.target.value)} required />
        </label>
        <div className="blog-admin-form__field">
          <span>Titelbild-URL</span>
          <div className="blog-admin-upload">
            <input value={coverImageUrl} onChange={(event) => setCoverImageUrl(event.target.value)} placeholder="/assets/img/..." />
            <div className="blog-admin-upload__controls">
              <label className="btn btn--light blog-admin-upload__button">
                {uploading ? 'Wird hochgeladen...' : 'Vom Gerät hochladen'}
                <input type="file" accept="image/*" onChange={uploadCoverImage} disabled={uploading} />
              </label>
              {coverImageUrl && (
                <a className="btn btn--light" href={coverImageUrl} target="_blank" rel="noreferrer">
                  Bild ansehen
                </a>
              )}
            </div>
            {coverImageUrl && (
              <div className="blog-admin-upload__preview">
                <img src={coverImageUrl} alt="Titelbild-Vorschau" />
              </div>
            )}
            {uploadError && <p className="blog-admin-upload__error">{uploadError}</p>}
          </div>
        </div>
        <div className="blog-admin-form__field">
          Status
          <div className="blog-admin-status" role="group" aria-label="Beitragsstatus">
            <button
              className={status === 'draft' ? 'is-active' : ''}
              type="button"
              aria-pressed={status === 'draft'}
              onClick={() => setStatus('draft')}
            >
              Entwurf
            </button>
            <button
              className={status === 'published' ? 'is-active' : ''}
              type="button"
              aria-pressed={status === 'published'}
              onClick={() => setStatus('published')}
            >
              Veröffentlicht
            </button>
          </div>
        </div>

        <BlogEditor key={lang} value={active.body} onChange={(value) => setActive({ body: value })} />

        <div className="blog-admin-form__actions">
          {!isNew && slug && (
            <Link className="btn btn--light" to={`/blog/${slug}`} target="_blank" rel="noreferrer">
              Vorschau
            </Link>
          )}
          <button className="btn btn--solid" type="submit">Speichern</button>
          {message && <p>{message}</p>}
        </div>
      </form>
    </section>
  );
}
