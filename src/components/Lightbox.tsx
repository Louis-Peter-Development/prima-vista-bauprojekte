import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode, type TouchEvent as ReactTouchEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from './icons';

export type LightboxItem = { src: string; title?: string; slug?: string };

type LightboxContextValue = {
  open: (items: LightboxItem[], index: number) => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error('useLightbox must be used inside <LightboxProvider>');
  return ctx;
}

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<LightboxItem[]>([]);
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const open = useCallback((nextItems: LightboxItem[], i: number) => {
    setItems(nextItems);
    setIndex(i);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);
  const step = useCallback(
    (delta: number) => {
      setIndex((i) => (items.length ? (i + delta + items.length) % items.length : 0));
    },
    [items.length],
  );

  // Touch swipe: horizontal to step between images, swipe-down to close.
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const didSwipe = useRef(false);

  const onTouchStart = useCallback((e: ReactTouchEvent) => {
    if (e.touches.length !== 1) {
      touchStart.current = null;
      return;
    }
    const t = e.changedTouches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
    didSwipe.current = false;
  }, []);

  const onTouchEnd = useCallback(
    (e: ReactTouchEvent) => {
      const start = touchStart.current;
      touchStart.current = null;
      if (!start) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        didSwipe.current = true;
        step(dx < 0 ? 1 : -1);
      } else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.4) {
        didSwipe.current = true;
        close();
      }
    },
    [step, close],
  );

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    // Remember what was focused so we can restore it on close, then move focus
    // into the dialog.
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      } else if (e.key === 'ArrowLeft') {
        step(-1);
      } else if (e.key === 'ArrowRight') {
        step(1);
      } else if (e.key === 'Tab') {
        // Trap focus among the dialog's controls so Tab can't reach the page behind.
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusable = dialog.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const activeEl = document.activeElement as HTMLElement | null;
        if (!dialog.contains(activeEl)) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && activeEl === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && activeEl === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      restoreFocusRef.current?.focus();
      restoreFocusRef.current = null;
    };
  }, [isOpen, close, step]);

  const value = useMemo<LightboxContextValue>(() => ({ open }), [open]);
  const current = items[index];

  return (
    <LightboxContext.Provider value={value}>
      {children}
      <div
        ref={dialogRef}
        className={`pv-lightbox${isOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal={isOpen}
        aria-hidden={!isOpen}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={(e) => {
          if (didSwipe.current) {
            didSwipe.current = false;
            return;
          }
          if (e.target === e.currentTarget) close();
        }}
      >
        <button ref={closeButtonRef} className="pv-lightbox__close" aria-label="Schließen" onClick={close} type="button">
          <CloseIcon />
        </button>
        <button
          className="pv-lightbox__nav pv-lightbox__nav--prev"
          aria-label="Zurück"
          type="button"
          onClick={() => step(-1)}
        >
          <ArrowLeftIcon />
        </button>
        <img className="pv-lightbox__img" src={current?.src} alt={current?.title ?? ''} />
        <button
          className="pv-lightbox__nav pv-lightbox__nav--next"
          aria-label="Weiter"
          type="button"
          onClick={() => step(1)}
        >
          <ArrowRightIcon />
        </button>
        <div className="pv-lightbox__caption">
          <div className="pv-lightbox__caption-info">
            <span className="index">
              {items.length
                ? `${String(index + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`
                : ''}
            </span>
            <span className="title">{current?.title ?? ''}</span>
          </div>
          {current?.slug && (
            <Link className="pv-lightbox__more" to={`/projekte/${current.slug}`} onClick={close}>
              Mehr erfahren <span>›</span>
            </Link>
          )}
        </div>
      </div>
    </LightboxContext.Provider>
  );
}
