/* ============================================================
   Prima Vista — site.js
   Header behavior, scroll reveal, counter animation, lightbox,
   header/footer injection.
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Inline brand SVGs ---------- */
  const ICONS = {
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22v-8.5h2.86l.43-3.32H13.5V8.06c0-.96.27-1.62 1.65-1.62h1.76V3.47c-.85-.09-1.7-.13-2.55-.13-2.53 0-4.26 1.55-4.26 4.38v2.46H7.6v3.32h2.5V22h3.4Z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>',
    arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
    arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  };

  /* ---------- Header ---------- */
  function buildHeader(active) {
    const nav = [
      ['index.html', 'Start'],
      ['gewerke.html', 'Gewerke'],
      ['komplett-pakete.html', 'Komplett-Pakete'],
      ['projekte.html', 'Projekte'],
      ['kontakt.html', 'Kontakt'],
    ];
    return `
      <header class="pv-header" id="pv-header">
        <div class="pv-header__inner">
          <a class="pv-logo" href="index.html" aria-label="Prima Vista — Startseite">
            <img src="assets/img/logo.png" alt="" />
            <span class="pv-logo__txt">
              <span class="pv-logo__name">Prima Vista</span>
              <span class="pv-logo__tag">Bauprojekte</span>
            </span>
          </a>
          <nav class="pv-nav" aria-label="Hauptnavigation">
            <ul class="pv-nav__list">
              ${nav.map(([href, label]) => `
                <li><a href="${href}" class="${active === href ? 'is-active' : ''}">${label}</a></li>
              `).join('')}
            </ul>
            <a class="btn btn--light" href="kontakt.html">
              Termin vereinbaren <span class="arrow">&gt;</span>
            </a>
          </nav>
        </div>
      </header>
    `;
  }

  /* ---------- Footer ---------- */
  function buildFooter() {
    return `
      <footer class="pv-footer">
        <div class="pv-footer__inner">
          <div class="pv-footer__grid">
            <div class="pv-footer__brand">
              <a class="pv-logo" href="index.html" aria-label="Prima Vista">
                <img src="assets/img/logo.png" alt="" style="filter: brightness(1.2);" />
                <span class="pv-logo__txt">
                  <span class="pv-logo__name">Prima Vista</span>
                  <span class="pv-logo__tag">Bauprojekte</span>
                </span>
              </a>
              <p class="pv-footer__brand-blurb">
                Sanierung &amp; Renovierung aus einer Hand &mdash; für Wohnsitz und Gastronomie, in Frankfurt und Emmenbrücke.
              </p>
            </div>
            <div>
              <h4>Standorte</h4>
              <p>
                <strong style="color: var(--pv-bone); font-weight: 500;">Frankfurt</strong><br/>
                Hessen, Deutschland<br/>
                +49 69 0000 0000
              </p>
              <p style="margin-top: 16px;">
                <strong style="color: var(--pv-bone); font-weight: 500;">Emmenbrücke</strong><br/>
                Luzern, Schweiz<br/>
                +41 41 000 00 00
              </p>
            </div>
            <div>
              <h4>Leistungen</h4>
              <ul>
                <li><a href="komplett-pakete.html">Komplett-Pakete</a></li>
                <li><a href="gewerke.html">Gewerke</a></li>
                <li><a href="projekte.html">Projekte</a></li>
                <li><a href="kontakt.html">Service</a></li>
                <li><a href="kontakt.html">Blitz-Angebote</a></li>
              </ul>
            </div>
            <div>
              <h4>Kontakt</h4>
              <ul>
                <li><a href="kontakt.html">Termin vereinbaren</a></li>
                <li><a href="kontakt.html">Anfrage senden</a></li>
                <li><a href="kontakt.html">Über uns</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener">Instagram</a></li>
                <li><a href="https://facebook.com" target="_blank" rel="noopener">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div class="pv-footer__bottom">
            <small>© 2026 Prima Vista Bauprojekte GmbH</small>
            <div class="pv-footer__legal">
              <a href="#">Impressum</a>
              <a href="#">Datenschutz</a>
              <a href="#">AGB</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  /* ---------- Floating elements ---------- */
  function buildFloating() {
    return `
      <aside class="pv-social-rail" aria-label="Soziale Medien">
        <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener">${ICONS.facebook}</a>
        <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener">${ICONS.instagram}</a>
      </aside>
      <button class="pv-chat" type="button" aria-label="Chat starten">
        ${ICONS.chat}
        <span>Chat</span>
      </button>
    `;
  }

  /* ---------- Lightbox ---------- */
  function buildLightbox() {
    return `
      <div class="pv-lightbox" id="pv-lightbox" role="dialog" aria-hidden="true">
        <button class="pv-lightbox__close" aria-label="Schließen" data-action="close">${ICONS.close}</button>
        <button class="pv-lightbox__nav pv-lightbox__nav--prev" aria-label="Zurück" data-action="prev">${ICONS.arrowLeft}</button>
        <img class="pv-lightbox__img" alt="" />
        <button class="pv-lightbox__nav pv-lightbox__nav--next" aria-label="Weiter" data-action="next">${ICONS.arrowRight}</button>
        <div class="pv-lightbox__caption"><span class="index">01 / 12</span><span class="title"></span></div>
      </div>
    `;
  }

  /* ---------- Init ---------- */
  function init() {
    // Inject shared chrome
    const headerSlot = document.querySelector('[data-pv-header]');
    if (headerSlot) {
      const active = headerSlot.getAttribute('data-pv-header');
      headerSlot.outerHTML = buildHeader(active);
    }
    const footerSlot = document.querySelector('[data-pv-footer]');
    if (footerSlot) footerSlot.outerHTML = buildFooter();
    const floatingSlot = document.querySelector('[data-pv-floating]');
    if (floatingSlot) floatingSlot.outerHTML = buildFloating();

    // Append lightbox once per page
    if (!document.getElementById('pv-lightbox')) {
      document.body.insertAdjacentHTML('beforeend', buildLightbox());
    }
    initLightbox();

    // Reveal observer
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length && 'IntersectionObserver' in window) {
      document.body.classList.add('js-reveal');
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
      reveals.forEach(el => io.observe(el));
      // Safety net: if for any reason observer doesn't fire (e.g. static
      // snapshot tools that don't simulate scroll), force everything visible
      // after a short delay.
      setTimeout(() => {
        reveals.forEach(el => el.classList.add('is-in'));
      }, 1500);
    } else {
      reveals.forEach(el => el.classList.add('is-in'));
    }

    // Animated counters
    const counters = document.querySelectorAll('[data-counter]');
    if (counters.length && 'IntersectionObserver' in window) {
      const co = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            animateCounter(e.target);
            co.unobserve(e.target);
          }
        });
      }, { threshold: 0.4 });
      counters.forEach(el => co.observe(el));
    }
  }

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-counter'));
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 1600;
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = target * eased;
      el.textContent = prefix + value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------- Lightbox controller ---------- */
  let LB_LIST = [];
  let LB_INDEX = 0;
  function initLightbox() {
    const lb = document.getElementById('pv-lightbox');
    if (!lb) return;
    const img = lb.querySelector('.pv-lightbox__img');
    const idx = lb.querySelector('.pv-lightbox__caption .index');
    const title = lb.querySelector('.pv-lightbox__caption .title');

    document.querySelectorAll('[data-lightbox]').forEach((trigger, i, all) => {
      trigger.style.cursor = 'zoom-in';
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        // collect siblings sharing the same gallery group
        const group = trigger.getAttribute('data-lightbox');
        LB_LIST = [...document.querySelectorAll(`[data-lightbox="${group}"]`)].map(el => ({
          src: el.getAttribute('data-src') || el.querySelector('img')?.src || '',
          title: el.getAttribute('data-title') || '',
        }));
        LB_INDEX = LB_LIST.findIndex(item => item === LB_LIST[[...document.querySelectorAll(`[data-lightbox="${group}"]`)].indexOf(trigger)]);
        // simpler:
        LB_INDEX = [...document.querySelectorAll(`[data-lightbox="${group}"]`)].indexOf(trigger);
        show();
      });
    });

    function show() {
      const item = LB_LIST[LB_INDEX];
      img.src = item.src;
      img.alt = item.title;
      title.textContent = item.title;
      idx.textContent = String(LB_INDEX + 1).padStart(2, '0') + ' / ' + String(LB_LIST.length).padStart(2, '0');
      lb.classList.add('is-open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lb.classList.remove('is-open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    function step(delta) {
      LB_INDEX = (LB_INDEX + delta + LB_LIST.length) % LB_LIST.length;
      show();
    }

    lb.addEventListener('click', (e) => {
      const action = e.target.closest('[data-action]')?.getAttribute('data-action');
      if (action === 'close' || e.target === lb) close();
      else if (action === 'prev') step(-1);
      else if (action === 'next') step(1);
    });
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.PV = { animateCounter };
})();
