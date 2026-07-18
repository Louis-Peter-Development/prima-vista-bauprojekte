import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../i18n/useLocale';

type Availability = { configured: boolean; days: Record<string, boolean> };

const LOCALE_TAGS: Record<string, string> = { de: 'de-DE', en: 'en-GB', it: 'it-IT', fr: 'fr-FR' };
const MAX_MONTHS_AHEAD = 6;

// Month availability shared across picker instances (Wunsch + Alternativ).
const availabilityCache = new Map<string, Promise<Availability>>();

function fetchAvailability(monthKey: string): Promise<Availability> {
  let pending = availabilityCache.get(monthKey);
  if (!pending) {
    pending = fetch(`/api/termine?month=${monthKey}`)
      .then((res) => (res.ok ? res.json() : { configured: false, days: {} }))
      .catch(() => ({ configured: false, days: {} }));
    availabilityCache.set(monthKey, pending);
  }
  return pending;
}

function iso(year: number, monthIndex: number, day: number): string {
  return `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function todayIso(): string {
  const now = new Date();
  return iso(now.getFullYear(), now.getMonth(), now.getDate());
}

type Props = {
  idPrefix: string;
  value: string;
  onChange: (value: string) => void;
  /** Disable this date (e.g. the already-chosen Wunschtermin on the alt picker). */
  excludeDate?: string;
};

export default function DatePickerField({ idPrefix, value, onChange, excludeDate }: Props) {
  const { t } = useTranslation('kontakt');
  const locale = useLocale();
  const localeTag = LOCALE_TAGS[locale] ?? 'de-DE';
  const today = todayIso();

  const [view, setView] = useState(() => {
    const base = value ? new Date(`${value}T12:00:00`) : new Date();
    return { year: base.getFullYear(), monthIndex: base.getMonth() };
  });
  const [availability, setAvailability] = useState<Availability | null>(null);

  const monthKey = `${view.year}-${String(view.monthIndex + 1).padStart(2, '0')}`;

  useEffect(() => {
    let alive = true;
    setAvailability(null);
    fetchAvailability(monthKey).then((result) => {
      if (alive) setAvailability(result);
    });
    return () => { alive = false; };
  }, [monthKey]);

  const now = new Date();
  const currentMonthValue = now.getFullYear() * 12 + now.getMonth();
  const viewMonthValue = view.year * 12 + view.monthIndex;
  const canGoPrev = viewMonthValue > currentMonthValue;
  const canGoNext = viewMonthValue < currentMonthValue + MAX_MONTHS_AHEAD;

  function shiftMonth(delta: number) {
    setView(({ year, monthIndex }) => {
      const shifted = new Date(year, monthIndex + delta, 1);
      return { year: shifted.getFullYear(), monthIndex: shifted.getMonth() };
    });
  }

  const weekdayLabels = useMemo(() => {
    const format = new Intl.DateTimeFormat(localeTag, { weekday: 'short' });
    // 2024-01-01 was a Monday; grid weeks start on Monday.
    return Array.from({ length: 7 }, (_, i) => format.format(new Date(2024, 0, 1 + i)));
  }, [localeTag]);

  const monthLabel = useMemo(
    () => new Intl.DateTimeFormat(localeTag, { month: 'long', year: 'numeric' })
      .format(new Date(view.year, view.monthIndex, 1)),
    [localeTag, view.year, view.monthIndex],
  );

  const daysInMonth = new Date(view.year, view.monthIndex + 1, 0).getDate();
  const leadingBlanks = (new Date(view.year, view.monthIndex, 1).getDay() + 6) % 7;
  const maxDate = iso(now.getFullYear(), now.getMonth() + MAX_MONTHS_AHEAD + 1, now.getDate());

  function dayState(dateIso: string): 'disabled' | 'busy' | 'free' {
    if (dateIso <= today || dateIso > maxDate) return 'disabled';
    if (new Date(`${dateIso}T12:00:00`).getDay() === 0) return 'disabled';
    if (excludeDate && dateIso === excludeDate) return 'disabled';
    if (availability?.configured && availability.days[dateIso] === false) return 'busy';
    return 'free';
  }

  const dayAriaFormat = useMemo(
    () => new Intl.DateTimeFormat(localeTag, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    [localeTag],
  );

  return (
    <div className="pv-datepicker" role="group" aria-label={t('form.termin.calendarAria')}>
      <div className="pv-datepicker__head">
        <button
          type="button"
          className="pv-datepicker__nav"
          onClick={() => shiftMonth(-1)}
          disabled={!canGoPrev}
          aria-label={t('form.termin.prevMonth')}
        >
          ‹
        </button>
        <span className="pv-datepicker__month" aria-live="polite">{monthLabel}</span>
        <button
          type="button"
          className="pv-datepicker__nav"
          onClick={() => shiftMonth(1)}
          disabled={!canGoNext}
          aria-label={t('form.termin.nextMonth')}
        >
          ›
        </button>
      </div>
      <div className="pv-datepicker__grid">
        {weekdayLabels.map((label) => (
          <span key={label} className="pv-datepicker__weekday" aria-hidden="true">{label}</span>
        ))}
        {Array.from({ length: leadingBlanks }, (_, i) => (
          <span key={`blank-${i}`} aria-hidden="true" />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const dateIso = iso(view.year, view.monthIndex, i + 1);
          const state = dayState(dateIso);
          const selected = value === dateIso;
          return (
            <button
              key={dateIso}
              type="button"
              id={i === 0 ? `${idPrefix}-first-day` : undefined}
              className={[
                'pv-datepicker__day',
                selected ? 'is-selected' : '',
                state === 'busy' ? 'is-busy' : '',
              ].filter(Boolean).join(' ')}
              disabled={state !== 'free'}
              aria-pressed={selected}
              aria-label={`${dayAriaFormat.format(new Date(`${dateIso}T12:00:00`))}${state === 'busy' ? ` — ${t('form.termin.busyDay')}` : ''}`}
              onClick={() => onChange(selected ? '' : dateIso)}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      {availability?.configured && (
        <p className="pv-datepicker__legend">{t('form.termin.legend')}</p>
      )}
    </div>
  );
}
