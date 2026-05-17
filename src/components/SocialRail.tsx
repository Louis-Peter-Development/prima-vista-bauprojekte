import { FacebookIcon, InstagramIcon } from './icons';

export default function SocialRail() {
  return (
    <aside className="pv-social-rail" aria-label="Soziale Medien">
      <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
        <FacebookIcon />
      </a>
      <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
        <InstagramIcon />
      </a>
    </aside>
  );
}
