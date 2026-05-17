import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SocialRail from './SocialRail';
import ChatBubble from './ChatBubble';
import CookieConsent from './CookieConsent';
import { LightboxProvider } from './Lightbox';
import { useReveal } from '../hooks/useReveal';

function ScrollToTop() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const frame = window.requestAnimationFrame(() => {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        target?.scrollIntoView({ block: 'start', behavior: 'instant' as ScrollBehavior });
      });
      return () => window.cancelAnimationFrame(frame);
    }

    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [hash, pathname]);

  return null;
}

export default function Layout() {
  useReveal();
  return (
    <LightboxProvider>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <SocialRail />
      <ChatBubble />
      <CookieConsent />
      <Footer />
    </LightboxProvider>
  );
}
