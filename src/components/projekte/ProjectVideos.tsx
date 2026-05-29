import { useState } from 'react';
import { hasYouTubeConsent, openConsentBanner, useConsent } from '../../hooks/useConsent';

export type ProjectVideo = { id: string; label?: string };

type ProjectVideosProps = {
  videos: ProjectVideo[];
  headline: string;
};

export default function ProjectVideos({ videos, headline }: ProjectVideosProps) {
  const consent = useConsent();
  const consented = hasYouTubeConsent(consent);
  const [active, setActive] = useState<Set<string>>(() => new Set());

  function handleActivate(id: string) {
    if (!consented) {
      openConsentBanner();
      return;
    }
    setActive((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }

  return (
    <section className="pd-videos">
      <div className="pd-videos__inner">
        <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;Rundgang</div>
        {!consented && (
          <p className="pd-videos__notice">
            Die Videos werden über YouTube eingebettet und erst nach Ihrer Zustimmung geladen.{' '}
            <button type="button" className="pd-videos__notice-btn" onClick={openConsentBanner}>
              Cookies & Dienste verwalten
            </button>
          </p>
        )}
        <div className="pd-videos__grid">
          {videos.map((video, i) => {
            const title = video.label ?? `${headline} — Video ${i + 1}`;
            const isActive = active.has(video.id);

            if (isActive) {
              return (
                <div key={video.id} className="pd-video pd-video--playing">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              );
            }

            return (
              <button
                key={video.id}
                type="button"
                className="pd-video pd-video--facade"
                onClick={() => handleActivate(video.id)}
                aria-label={consented ? `Video abspielen: ${title}` : `${title} — Cookies akzeptieren, um abzuspielen`}
              >
                <img
                  className="pd-video__poster"
                  src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                  alt=""
                  width={480}
                  height={360}
                  loading="lazy"
                />
                <span className="pd-video__play" aria-hidden="true">
                  <svg viewBox="0 0 68 48" width="68" height="48">
                    <path
                      className="pd-video__play-bg"
                      d="M66.52 7.74a8 8 0 0 0-5.64-5.66C56.07.85 34 .85 34 .85s-22.07 0-26.88 1.23a8 8 0 0 0-5.64 5.66A83.6 83.6 0 0 0 .5 24a83.6 83.6 0 0 0 .98 16.26 8 8 0 0 0 5.64 5.66C11.93 47.15 34 47.15 34 47.15s22.07 0 26.88-1.23a8 8 0 0 0 5.64-5.66A83.6 83.6 0 0 0 67.5 24a83.6 83.6 0 0 0-.98-16.26z"
                    />
                    <path className="pd-video__play-icon" d="M45 24 27 14v20z" />
                  </svg>
                </span>
                {video.label && <span className="pd-video__label">{video.label}</span>}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
