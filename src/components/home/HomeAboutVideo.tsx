import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { hasYouTubeConsent, openConsentBanner, useConsent } from '../../hooks/useConsent';
import { useVideoActive } from '../../hooks/useVideoPlayback';

const ABOUT_VIDEO_ID = 'pm5HSjADlOs';
// Self-hosted poster shown before consent so no request reaches Google/YouTube.
const LOCAL_POSTER = '/assets/img/proj-team-jacket.webp';

export default function HomeAboutVideo() {
  const { t } = useTranslation('home');
  const videoTitle = t('aboutVideo.title');
  const consent = useConsent();
  const consented = hasYouTubeConsent(consent);
  const [active, setActive] = useState(false);
  useVideoActive(active);

  function handleActivate() {
    if (!consented) {
      openConsentBanner();
      return;
    }
    setActive(true);
  }

  return (
    <div className="founders-video">
      {!consented && (
        <p className="founders-video__notice">
          {t('aboutVideo.notice')}{' '}
          <button type="button" className="founders-video__notice-btn" onClick={openConsentBanner}>
            {t('aboutVideo.manage')}
          </button>
        </p>
      )}

      {active ? (
        <div className="founders-video__frame founders-video__frame--playing">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${ABOUT_VIDEO_ID}?autoplay=1&rel=0`}
            title={videoTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <button
          type="button"
          className="founders-video__frame founders-video__frame--facade"
          onClick={handleActivate}
          aria-label={consented ? t('aboutVideo.playAria', { title: videoTitle }) : t('aboutVideo.consentAria', { title: videoTitle })}
        >
          <img
            src={consented ? `https://i.ytimg.com/vi/${ABOUT_VIDEO_ID}/maxresdefault.jpg` : LOCAL_POSTER}
            onError={
              consented
                ? (event) => {
                    const img = event.currentTarget;
                    if (!img.dataset.fallback) {
                      img.dataset.fallback = '1';
                      img.src = `https://i.ytimg.com/vi/${ABOUT_VIDEO_ID}/hqdefault.jpg`;
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
          <span className="founders-video__play" aria-hidden="true">
            <svg viewBox="0 0 68 48" width="76" height="54">
              <path
                className="founders-video__play-bg"
                d="M66.52 7.74a8 8 0 0 0-5.64-5.66C56.07.85 34 .85 34 .85s-22.07 0-26.88 1.23a8 8 0 0 0-5.64 5.66A83.6 83.6 0 0 0 .5 24a83.6 83.6 0 0 0 .98 16.26 8 8 0 0 0 5.64 5.66C11.93 47.15 34 47.15 34 47.15s22.07 0 26.88-1.23a8 8 0 0 0 5.64-5.66A83.6 83.6 0 0 0 67.5 24a83.6 83.6 0 0 0-.98-16.26z"
              />
              <path className="founders-video__play-icon" d="M45 24 27 14v20z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
