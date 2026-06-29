import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { hasYouTubeConsent, openConsentBanner, useConsent } from '../../hooks/useConsent';
import { useVideoActive } from '../../hooks/useVideoPlayback';
import type { ProjectVideo } from './ProjectVideos';

type ProjectFeatureVideoProps = {
  video: ProjectVideo;
  headline: string;
  /** Self-hosted poster shown before consent so no request reaches Google/YouTube. */
  poster: string;
};

export default function ProjectFeatureVideo({ video, headline, poster }: ProjectFeatureVideoProps) {
  const { t } = useTranslation('projects');
  const consent = useConsent();
  const consented = hasYouTubeConsent(consent);
  const [active, setActive] = useState(false);
  useVideoActive(active);
  const title = video.label ?? t('detail.featureFallback', { headline });

  function handleActivate() {
    if (!consented) {
      openConsentBanner();
      return;
    }
    setActive(true);
  }

  return (
    <section className="pd-feature">
      <div className="pd-feature__inner">
        <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;{t('detail.filmEyebrow')}</div>
        {!consented && (
          <p className="pd-videos__notice pd-feature__notice">
            {t('detail.videoNoticeOne')}{' '}
            <button type="button" className="pd-videos__notice-btn" onClick={openConsentBanner}>
              {t('detail.videoManage')}
            </button>
          </p>
        )}

        {active ? (
          <div className="pd-video pd-video--playing pd-feature__media">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <button
            type="button"
            className="pd-video pd-video--facade pd-feature__media"
            onClick={handleActivate}
            aria-label={consented ? t('detail.videoPlayAria', { title }) : t('detail.videoConsentAria', { title })}
          >
            <img
              className="pd-video__poster"
              src={consented ? `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg` : poster}
              onError={
                consented
                  ? (e) => {
                      const img = e.currentTarget;
                      if (!img.dataset.fallback) {
                        img.dataset.fallback = '1';
                        img.src = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
                      }
                    }
                  : undefined
              }
              alt=""
              width={1280}
              height={720}
              loading="lazy"
              decoding="async"
            />
            <span className="pd-video__play" aria-hidden="true">
              <svg viewBox="0 0 68 48" width="92" height="64">
                <path
                  className="pd-video__play-bg"
                  d="M66.52 7.74a8 8 0 0 0-5.64-5.66C56.07.85 34 .85 34 .85s-22.07 0-26.88 1.23a8 8 0 0 0-5.64 5.66A83.6 83.6 0 0 0 .5 24a83.6 83.6 0 0 0 .98 16.26 8 8 0 0 0 5.64 5.66C11.93 47.15 34 47.15 34 47.15s22.07 0 26.88-1.23a8 8 0 0 0 5.64-5.66A83.6 83.6 0 0 0 67.5 24a83.6 83.6 0 0 0-.98-16.26z"
                />
                <path className="pd-video__play-icon" d="M45 24 27 14v20z" />
              </svg>
            </span>
            {video.label && <span className="pd-video__label pd-feature__label">{video.label}</span>}
          </button>
        )}
      </div>
    </section>
  );
}
