import { useTranslation } from 'react-i18next';
import PageIntro from '../components/common/PageIntro';
import '../styles/pages/impressum.css';

export default function Datenschutz() {
  const { t } = useTranslation('legal');

  const sections = [
    { key: 'overview', body: (
      <>
        <h3>{t('datenschutz.overview.hGeneral')}</h3>
        <p>{t('datenschutz.overview.p1')}</p>
        <h3>{t('datenschutz.overview.hCollection')}</h3>
        <p>{t('datenschutz.overview.p2')}</p>
        <p>{t('datenschutz.overview.p3')}</p>
      </>
    ) },
    { key: 'hosting', body: (
      <>
        <p>{t('datenschutz.hosting.p1')}</p>
        <p>{t('datenschutz.hosting.p2')}</p>
      </>
    ) },
    { key: 'general', body: (
      <>
        <h3>{t('datenschutz.general.hPrivacy')}</h3>
        <p>{t('datenschutz.general.p1')}</p>
        <h3>{t('datenschutz.general.hResponsible')}</h3>
        <p>
          {t('datenschutz.general.responsibleIntro')}
          <br />Monica Irimia
          <br />Gref-Völsing-Straße 13
          <br />60314 Frankfurt am Main
          <br />{t('datenschutz.emailLabel')}: <a href="mailto:info@primavista-bauprojekte.com">info@primavista-bauprojekte.com</a>
        </p>
        <p>{t('datenschutz.general.p2')}</p>
        <h3>{t('datenschutz.general.hStorage')}</h3>
        <p>{t('datenschutz.general.p3')}</p>
      </>
    ) },
    { key: 'rights', body: (
      <>
        <p>{t('datenschutz.rights.p1')}</p>
        <p>{t('datenschutz.rights.p2')}</p>
        <h3>{t('datenschutz.rights.hSsl')}</h3>
        <p>{t('datenschutz.rights.p3')}</p>
      </>
    ) },
    { key: 'collection', body: (
      <>
        <h3>{t('datenschutz.collection.hCookies')}</h3>
        <p>{t('datenschutz.collection.p1')}</p>
        <h3>{t('datenschutz.collection.hLogs')}</h3>
        <p>{t('datenschutz.collection.p2')}</p>
        <p>{t('datenschutz.collection.p3')}</p>
        <h3>{t('datenschutz.collection.hContact')}</h3>
        <p>{t('datenschutz.collection.p4')}</p>
      </>
    ) },
    { key: 'analytics', body: (
      <>
        <h3>{t('datenschutz.analytics.hGa')}</h3>
        <p>{t('datenschutz.analytics.p1')}</p>
        <p>{t('datenschutz.analytics.p2')}</p>
        <p>
          {t('datenschutz.analytics.p3pre')}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>
          {t('datenschutz.analytics.p3post')}
        </p>
      </>
    ) },
    { key: 'chatbot', body: (
      <>
        <h3>{t('datenschutz.chatbot.hClaude')}</h3>
        <p>{t('datenschutz.chatbot.p1')}</p>
        <h3>{t('datenschutz.chatbot.hData')}</h3>
        <p>{t('datenschutz.chatbot.p2')}</p>
        <h3>{t('datenschutz.chatbot.hLegal')}</h3>
        <p>{t('datenschutz.chatbot.p3')}</p>
        <h3>{t('datenschutz.chatbot.hThirdCountry')}</h3>
        <p>
          {t('datenschutz.chatbot.p4pre')}
          <a href="https://www.anthropic.com/legal/privacy" target="_blank" rel="noopener noreferrer">anthropic.com/legal/privacy</a>
          {t('datenschutz.chatbot.p4post')}
        </p>
        <h3>{t('datenschutz.chatbot.hStorage')}</h3>
        <p>{t('datenschutz.chatbot.p5')}</p>
        <h3>{t('datenschutz.chatbot.hNote')}</h3>
        <p>{t('datenschutz.chatbot.p6')}</p>
      </>
    ) },
    { key: 'plugins', body: (
      <>
        <h3>{t('datenschutz.plugins.hFonts')}</h3>
        <p>{t('datenschutz.plugins.p1')}</p>
        <h3>{t('datenschutz.plugins.hYoutube')}</h3>
        <p>{t('datenschutz.plugins.p2')}</p>
        <p>{t('datenschutz.plugins.p3')}</p>
        <p>
          {t('datenschutz.plugins.p4pre')}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>
          {t('datenschutz.plugins.p4post')}
        </p>
      </>
    ) },
  ];

  return (
    <>
      <PageIntro
        className="impressum-intro"
        backgroundImage="/assets/img/photo-office-light.webp"
        crumbNumber="08"
        crumbLabel={t('datenschutz.crumbLabel')}
        title={t('datenschutz.title')}
        lede={t('datenschutz.lede')}
        meta={[
          { label: t('datenschutz.metaResponsible'), value: 'Monica Irimia' },
          { label: t('datenschutz.metaContact'), value: 'info@primavista-bauprojekte.com' },
          { label: t('datenschutz.metaAnalytics'), value: 'Google Analytics' },
          { label: t('datenschutz.metaChatbot'), value: 'Claude (Anthropic)' },
        ]}
      />

      <main className="impressum-page">
        <section className="impressum-page__grid">
          <aside className="impressum-page__summary reveal">
            <div className="eyebrow"><span className="rule-red"></span>&nbsp;&nbsp;{t('datenschutz.summaryEyebrow')}</div>
            <address>
              <span>Monica Irimia</span>
              <span>Gref-Völsing-Straße 13</span>
              <span>60314 Frankfurt am Main</span>
            </address>
            <div className="impressum-page__contact">
              <h2>{t('datenschutz.contactHeading')}</h2>
              <p>
                {t('datenschutz.emailLabel')}: <a href="mailto:info@primavista-bauprojekte.com">info@primavista-bauprojekte.com</a>
              </p>
            </div>
            <p className="impressum-page__binding">{t('bindingNote')}</p>
          </aside>

          <div className="impressum-page__content">
            {sections.map((section, index) => (
              <section key={section.key} className="impressum-section reveal" data-delay={index % 3 || undefined}>
                <span className="impressum-section__num">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h2>{t(`datenschutz.${section.key}.title`)}</h2>
                  {section.body}
                </div>
              </section>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
