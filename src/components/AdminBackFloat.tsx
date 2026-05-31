import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

/** Floating shortcut back to the admin panel. Only rendered when an admin is
 *  logged in (verified via the httpOnly session cookie) and the user is on a
 *  public page — so after "Öffentlich ansehen" there's always a way back. */
export default function AdminBackFloat() {
  const { pathname } = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/auth/session')
      .then((res) => res.json() as Promise<{ isAdmin: boolean }>)
      .then((data) => {
        if (!cancelled) setIsAdmin(!!data.isAdmin);
      })
      .catch(() => {
        if (!cancelled) setIsAdmin(false);
      });
    return () => {
      cancelled = true;
    };
    // Re-check on navigation so the button appears right after login and
    // disappears after logout.
  }, [pathname]);

  // No shortcut needed when not logged in or already inside the admin area.
  if (!isAdmin || pathname.startsWith('/admin')) return null;

  return (
    <Link to="/admin/blog" className="pv-admin-float" aria-label="Zurück zum Admin-Panel">
      <span className="pv-admin-float__arrow" aria-hidden="true">←</span>
      <span className="pv-admin-float__label">Admin</span>
    </Link>
  );
}
