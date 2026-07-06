import { useTranslation } from 'react-i18next';
import {
  AwardCheckIcon,
  CalendarCheckIcon,
  HomeOutlineIcon,
  ShieldCheckIcon,
  UsersIcon,
} from '../icons';

const PROOF_ITEMS = [
  { key: 'contact', Icon: UsersIcon },
  { key: 'fixedPrice', Icon: ShieldCheckIcon },
  { key: 'schedule', Icon: CalendarCheckIcon },
  { key: 'warranty', Icon: AwardCheckIcon },
  { key: 'region', Icon: HomeOutlineIcon },
] as const;

export default function HomeMarquee() {
  const { t } = useTranslation('home');

  return (
    <section className="marquee" aria-label={t('marquee.aria')}>
      <div className="marquee__track reveal-group" role="list">
        {PROOF_ITEMS.map(({ key, Icon }, i) => (
          <span className="marquee__item" role="listitem" key={key} style={{ ['--i' as string]: i }}>
            <span className="marquee__icon" aria-hidden="true">
              <Icon />
            </span>
            <span className="marquee__copy">
              <strong>{t(`marquee.proofs.${key}.title`)}</strong>
              <small>{t(`marquee.proofs.${key}.desc`)}</small>
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
