import { useCallback, useEffect, useRef, useState } from 'react';
import { ChatIcon, CloseIcon } from './icons';

type Message = {
  id: number;
  role: 'user' | 'assistant';
  content: string;
};

const GREETING: Message = {
  id: 0,
  role: 'assistant',
  content:
    'Hallo, ich bin der digitale Empfang von Prima Vista. Wie kann ich helfen — Kostenrahmen, Ablauf, Termin?',
};

const SUGGESTIONS = [
  'Was kostet eine Komplettsanierung?',
  'Wie läuft ein Projekt ab?',
  'Termin vereinbaren',
];

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (open) {
      document.body.classList.add('pv-chat-open');
      const focus = window.setTimeout(() => inputRef.current?.focus(), 200);
      return () => {
        document.body.classList.remove('pv-chat-open');
        window.clearTimeout(focus);
      };
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || sending) return;
      setError(null);

      const userMsg: Message = {
        id: Date.now(),
        role: 'user',
        content: trimmed,
      };
      const assistantMsg: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: '',
      };

      setInput('');
      setSending(true);
      setMessages((prev) => [...prev, userMsg, assistantMsg]);

      const history = [...messages, userMsg]
        .filter((m) => m.id !== 0)
        .map((m) => ({ role: m.role, content: m.content }));

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal,
        });
        if (!res.ok || !res.body) {
          throw new Error(`HTTP ${res.status}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const parts = buffer.split('\n\n');
          buffer = parts.pop() ?? '';

          for (const part of parts) {
            const line = part.trim();
            if (!line.startsWith('data:')) continue;
            const payload = line.slice(5).trim();
            if (!payload) continue;
            try {
              const evt = JSON.parse(payload) as {
                text?: string;
                done?: boolean;
                error?: string;
              };
              if (evt.error) throw new Error(evt.error);
              if (evt.text) {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMsg.id
                      ? { ...m, content: m.content + evt.text }
                      : m,
                  ),
                );
              }
            } catch (e) {
              if (e instanceof SyntaxError) continue;
              throw e;
            }
          }
        }
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id && m.content === ''
              ? {
                  ...m,
                  content:
                    'Entschuldigung — gerade gibt es ein technisches Problem. Bitte schreiben Sie uns direkt: office@primavista-bauprojekte.com oder rufen Sie an: +49 1578 98 18 308.',
                }
              : m,
          ),
        );
      } finally {
        setSending(false);
        abortRef.current = null;
      }
    },
    [messages, sending],
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <>
      <button
        className="pv-chat"
        type="button"
        aria-label={open ? 'Chat schließen' : 'Chat starten'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
        <span>{open ? 'Schließen' : 'Chat'}</span>
      </button>

      {open && (
        <div className="pv-chat-panel" role="dialog" aria-label="Chat mit Prima Vista">
          <header className="pv-chat-panel__header">
            <div className="pv-chat-panel__title">
              <span className="pv-chat-panel__dot" aria-hidden="true" />
              <div>
                <strong>Prima Vista</strong>
                <small>Antwort meist sofort</small>
              </div>
            </div>
            <button
              type="button"
              className="pv-chat-panel__close"
              onClick={() => setOpen(false)}
              aria-label="Chat schließen"
            >
              <CloseIcon />
            </button>
          </header>

          <div className="pv-chat-panel__messages" ref={scrollRef}>
            {messages.map((m) => (
              <div
                key={m.id}
                className={`pv-chat-msg pv-chat-msg--${m.role}`}
              >
                <div className="pv-chat-msg__bubble">
                  {m.content || <span className="pv-chat-msg__cursor" aria-hidden="true" />}
                </div>
              </div>
            ))}
          </div>

          {messages.length === 1 && (
            <div className="pv-chat-panel__suggestions">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  disabled={sending}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form className="pv-chat-panel__form" onSubmit={onSubmit}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ihre Nachricht …"
              rows={1}
              disabled={sending}
              aria-label="Nachricht eingeben"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              aria-label="Senden"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  d="M4 12l16-8-6 16-2-7-8-1z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </form>
          {error && <div className="pv-chat-panel__error">{error}</div>}
          <p className="pv-chat-panel__footnote">
            KI-Assistent · Keine Speicherung. Bei Bedarf direkt:{' '}
            <a href="tel:+4915789818308">+49 1578 98 18 308</a>
          </p>
        </div>
      )}
    </>
  );
}
