import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
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
        onClick={(e) => {
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
