import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from './icons';

/** Hide the rail while the home hero is in view and reveal it once the
 *  user scrolls past. Pages without a `.hero` element show it immediately. */
function useRevealAfterHero() {
  const { pathname } = useLocation();
  // Default to revealed when there's no hero on the page — avoids a brief
  // invisible flash on mount for non-hero routes.
  const [revealed, setRevealed] = useState(
    () => typeof document === 'undefined' || !document.querySelector('.hero'),
  );

  useEffect(() => {
    const hero = document.querySelector('.hero');
    if (!hero) {
      setRevealed(true);
      return;
    }
    setRevealed(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Reveal once the hero is almost entirely out of the viewport.
        setRevealed(entry.intersectionRatio < 0.1);
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  return revealed;
}

export default function SocialRail() {
  const revealed = useRevealAfterHero();
  return (
    <aside
      className={`pv-social-rail${revealed ? ' is-visible' : ''}`}
      aria-label="Soziale Medien"
      aria-hidden={revealed ? undefined : true}
    >
      <a href="https://www.facebook.com/profile.php?id=61584837772416" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
        <FacebookIcon />
      </a>
      <a href="https://www.instagram.com/primavista.bauprojekte" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
        <InstagramIcon />
      </a>
      <a href="https://www.youtube.com/@PrimaVistaBauprojekte" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
        <YoutubeIcon />
      </a>
    </aside>
  );
}
