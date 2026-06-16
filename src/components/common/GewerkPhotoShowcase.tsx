import { GEWERK_PHOTO_SETS, type GewerkPhotoSetKey } from '../../data/gewerkPhotoSets';

type Props = {
  photoSet: GewerkPhotoSetKey;
};

export default function GewerkPhotoShowcase({ photoSet }: Props) {
  const set = GEWERK_PHOTO_SETS[photoSet];
  const imageCount = set.images.length;

  if (imageCount === 0) {
    return null;
  }

  return (
    <section className="gewerk-photos" aria-label={`${set.label} in Bildern`}>
      <div className="gewerk-photos__inner">
        <div className="gewerk-photos__head reveal">
          <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;Einblicke</div>
          <h2>
            {set.label}{' '}<br />
            <em>aus der Nähe.</em>
          </h2>
          <p>Ausgewählte Eindrücke aus Material, Detail und Ausführung.</p>
        </div>

        <div className="gewerk-photos__grid" data-count={imageCount}>
          {set.images.map((image, index) => (
            <figure className="gewerk-photos__item reveal" data-delay={String((index % 3) + 1)} key={image.src}>
              <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
