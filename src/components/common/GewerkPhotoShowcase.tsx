import { useTranslation } from 'react-i18next';
import { GEWERK_PHOTO_SETS, type GewerkPhotoSetKey } from '../../data/gewerkPhotoSets';

type Props = {
  photoSet: GewerkPhotoSetKey;
};

export default function GewerkPhotoShowcase({ photoSet }: Props) {
  const { t } = useTranslation('pages');
  const set = GEWERK_PHOTO_SETS[photoSet];
  const imageCount = set.images.length;
  const label = t(`gw.photoSets.${photoSet}.label`, { defaultValue: set.label });

  if (imageCount === 0) {
    return null;
  }

  return (
    <section className="gewerk-photos" aria-label={t('gw.photosAria', { label })}>
      <div className="gewerk-photos__inner">
        <div className="gewerk-photos__head reveal">
          <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;{t('gw.photosEyebrow')}</div>
          <h2>
            {label}{' '}<br />
            <em>{t('gw.photosTitleSuffix')}</em>
          </h2>
          <p>{t('gw.photosIntro')}</p>
        </div>

        <div className="gewerk-photos__grid" data-count={imageCount}>
          {set.images.map((image, index) => (
            <figure className="gewerk-photos__item reveal" data-delay={String((index % 3) + 1)} key={image.src}>
              <img
                src={image.src}
                alt={t(`gw.photoSets.${photoSet}.images.${index}.alt`, { defaultValue: image.alt })}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
