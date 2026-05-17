import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SocialRail from './SocialRail';
import ChatBubble from './ChatBubble';
import { LightboxProvider } from './Lightbox';
import { useReveal } from '../hooks/useReveal';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
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
      <Footer />
    </LightboxProvider>
  );
}
