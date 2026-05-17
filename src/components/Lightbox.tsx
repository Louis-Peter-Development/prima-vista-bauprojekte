import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from './icons';

export type LightboxItem = { src: string; title?: string };

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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, close, step]);

  const value = useMemo<LightboxContextValue>(() => ({ open }), [open]);
  const current = items[index];

  return (
    <LightboxContext.Provider value={value}>
      {children}
      <div
        className={`pv-lightbox${isOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-hidden={!isOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <button className="pv-lightbox__close" aria-label="Schließen" onClick={close} type="button">
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
          <span className="index">
            {items.length
              ? `${String(index + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`
              : ''}
          </span>
          <span className="title">{current?.title ?? ''}</span>
        </div>
      </div>
    </LightboxContext.Provider>
  );
}
