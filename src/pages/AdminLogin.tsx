import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/pages/blog.css';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential?: string }) => void;
          }) => void;
          renderButton: (
            element: HTMLElement,
            options: {
              theme?: 'outline' | 'filled_blue' | 'filled_black';
              size?: 'large' | 'medium' | 'small';
              width?: number;
              text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
            },
          ) => void;
        };
      };
    };
  }
}

function GoogleG() {
  return (
    <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true" focusable="false">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.02-3.7H.96v2.34A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.98 10.72a5.4 5.4 0 0 1 0-3.44V4.94H.96a9 9 0 0 0 0 8.12l3.02-2.34z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.9 11.42 0 9 0A9 9 0 0 0 .96 4.94l3.02 2.34C4.68 5.16 6.66 3.58 9 3.58z" />
    </svg>
  );
}

export default function AdminLogin() {
  usePageTitle('Admin Login');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // Public Google OAuth client id, served at runtime by /api/auth/session when
  // Google login is configured on the server. Null = hide the Google button.
  const [googleClientId, setGoogleClientId] = useState<string | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const googleButtonRef = useRef<HTMLDivElement | null>(null);
  const googleWrapRef = useRef<HTMLDivElement | null>(null);

  // Already signed in (valid session cookie)? Skip the form and go straight to
  // the dashboard. An expired/idle session returns isAdmin:false and stays here.
  useEffect(() => {
    let cancelled = false;
    fetch('/api/auth/session')
      .then((res) => res.json() as Promise<{ isAdmin: boolean; googleClientId?: string | null }>)
      .then((data) => {
        if (cancelled) return;
        if (data.isAdmin) {
          navigate('/admin/blog', { replace: true });
          return;
        }
        setGoogleClientId(data.googleClientId ?? null);
      })
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) setCheckingSession(false);
      });
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  useEffect(() => {
    if (!googleClientId || !googleButtonRef.current) return;

    let cleanupResize = () => {};

    const render = () => {
      if (!window.google || !googleButtonRef.current || !googleWrapRef.current) return;
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: async ({ credential }) => {
          if (!credential) return;
          setError('');
          const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ credential }),
          });
          if (!res.ok) {
            setError('Google-Login ist für dieses Konto nicht freigegeben.');
            return;
          }
          navigate('/admin/blog');
        },
      });
      // We show our own styled button; Google's real button is rendered
      // transparently on top of it (see .pv-google in blog.css) so the click
      // still flows through Google's verified ID-token flow. Match its width
      // to our button so the invisible hit-target covers it exactly.
      const width = Math.min(400, Math.round(googleWrapRef.current.getBoundingClientRect().width));
      googleButtonRef.current.innerHTML = '';
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: 'outline',
        size: 'large',
        width,
        text: 'continue_with',
      });
    };

    const start = () => {
      render();
      window.addEventListener('resize', render);
      cleanupResize = () => window.removeEventListener('resize', render);
    };

    if (window.google) {
      start();
      return () => cleanupResize();
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = start;
    document.head.appendChild(script);

    return () => {
      script.onload = null;
      cleanupResize();
    };
  }, [navigate, googleClientId]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      setError('Login fehlgeschlagen.');
      return;
    }
    navigate('/admin/blog');
  };

  return (
    <section className="login">
      <div className="login__stage">
        <img className="login__bg" src="/assets/img/proj-lobby-tree.webp" alt="" />
        <div className="login__pitch">
          <span className="pv-eyebrow">Magazin · Redaktion</span>
          <h2>Das Magazin hinter den Projekten.</h2>
          <p>
            Melden Sie sich an, um Beiträge zu planen, zu schreiben und zu
            veröffentlichen — vom Altbau-Ratgeber bis zur Projektgeschichte.
          </p>
        </div>
      </div>

      <div className="login__panel">
        <form className="login__form" onSubmit={submit}>
          <span className="pv-eyebrow">Admin</span>
          <h1>Magazin-Login</h1>

          <div className="login__field">
            <label htmlFor="login-email">E-Mail</label>
            <input
              id="login-email"
              type="email"
              name="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="redaktion@prima-vista.de"
              required
            />
          </div>

          <div className="login__field">
            <label htmlFor="login-password">Passwort</label>
            <input
              id="login-password"
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button className="btn btn--solid" type="submit">Einloggen</button>

          {(checkingSession || googleClientId) && (
            <>
              <span className="login__divider">oder</span>
              {googleClientId ? (
                <div className="pv-google" ref={googleWrapRef}>
                  <span className="login__google pv-google__face" aria-hidden="true">
                    <GoogleG />
                    Mit Google anmelden
                  </span>
                  <div className="pv-google__gsi" ref={googleButtonRef} />
                </div>
              ) : (
                <span className="login__google pv-google__face pv-google__face--pending" aria-hidden="true">
                  <GoogleG />
                  Google wird geprüft …
                </span>
              )}
            </>
          )}

          {error && <p className="blog-state blog-state--error">{error}</p>}

          <p className="login__note">Zugang nur für die Redaktion.</p>
        </form>
      </div>
    </section>
  );
}
