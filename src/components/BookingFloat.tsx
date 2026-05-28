import { Link } from 'react-router-dom';
import { useRevealMidPage } from '../hooks/useRevealMidPage';

/** Floating "Termin vereinbaren" CTA mirroring the social rail on the
 *  right edge. Shares the hero/footer reveal behavior so it stays out of
 *  the way of the headline and the footer. */
export default function BookingFloat() {
  const revealed = useRevealMidPage();
  return (
    <Link
      to="/kontakt"
      className={`pv-booking-float${revealed ? ' is-visible' : ''}`}
      aria-hidden={revealed ? undefined : true}
      tabIndex={revealed ? undefined : -1}
    >
      <span className="pv-booking-float__dot" aria-hidden="true"></span>
      <span className="pv-booking-float__label">Termin vereinbaren</span>
    </Link>
  );
}
