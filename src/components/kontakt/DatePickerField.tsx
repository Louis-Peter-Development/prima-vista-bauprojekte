import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../i18n/useLocale';

type Availability = {
  configured: boolean;
  days: Record<string, boolean>;
  slots: Record<string, string[]>;
};

const LOCALE_TAGS: Record<string, string> = { de: 'de-DE', en: 'en-GB', it: 'it-IT', fr: 'fr-FR' };
const MAX_MONTHS_AHEAD = 6;

const SLOT_DURATION_MINUTES = 120;
const SLOT_STEP_MINUTES = 30;
const AVAILABILITY_CACHE_MS = 30_000;

function timeFromMinutes(total: number): string {
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

const FALLBACK_SLOTS = Array.from(
  { length: ((16 * 60) - (8 * 60)) / SLOT_STEP_MINUTES + 1 },
  (_, index) => timeFromMinutes(8 * 60 + index * SLOT_STEP_MINUTES),
);

function slotLabel(start: string): string {
  const [hour, minute] = start.split(':').map(Number);
  return `${start}–${timeFromMinutes(hour * 60 + minute + SLOT_DURATION_MINUTES)}`;
}

// Short-lived dedupe across the preferred and alternative picker instances.
const availabilityCache = new Map<string, { at: number; pending: Promise<Availability> }>();

function fetchAvailability(monthKey: string): Promise<Availability> {
  const cached = availabilityCache.get(monthKey);
  if (cached && Date.now() - cached.at < AVAILABILITY_CACHE_MS) return cached.pending;
  const pending = fetch(`/api/termine?month=${monthKey}`)
    .then((res) => (res.ok ? res.json() : { configured: false, days: {}, slots: {} }))
    .catch(() => ({ configured: false, days: {}, slots: {} }));
  availabilityCache.set(monthKey, { at: Date.now(), pending });
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
  timeId: string;
  timeValue: string;
  onTimeChange: (value: string) => void;
  timeError?: string;
  /** Disable this date (e.g. the already-chosen Wunschtermin on the alt picker). */
  excludeDate?: string;
};

export default function DatePickerField({
  idPrefix,
  value,
  onChange,
  timeId,
  timeValue,
  onTimeChange,
  timeError,
  excludeDate,
}: Props) {
  const { t } = useTranslation('kontakt');
  const locale = useLocale();
  const localeTag = LOCALE_TAGS[locale] ?? 'de-DE';
  const today = todayIso();

  const [view, setView] = useState(() => {
    const base = value ? new Date(`${value}T12:00:00`) : new Date();
    return { year: base.getFullYear(), monthIndex: base.getMonth() };
  });
  const [availabilityByMonth, setAvailabilityByMonth] = useState<Record<string, Availability>>({});

  const monthKey = `${view.year}-${String(view.monthIndex + 1).padStart(2, '0')}`;
  const availability = availabilityByMonth[monthKey] ?? null;
  const selectedAvailability = value ? availabilityByMonth[value.slice(0, 7)] ?? null : null;

  useEffect(() => {
    let alive = true;
    fetchAvailability(monthKey).then((result) => {
      if (alive) setAvailabilityByMonth((current) => ({ ...current, [monthKey]: result }));
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
  const maxDateValue = new Date(now.getFullYear(), now.getMonth() + MAX_MONTHS_AHEAD, now.getDate());
  const maxDate = iso(maxDateValue.getFullYear(), maxDateValue.getMonth(), maxDateValue.getDate());
  const availableSlots = value
    ? selectedAvailability?.configured
      ? selectedAvailability.slots[value] ?? []
      : selectedAvailability ? FALLBACK_SLOTS : []
    : [];

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
              onClick={() => {
                onChange(selected ? '' : dateIso);
                onTimeChange('');
              }}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      {availability?.configured && (
        <p className="pv-datepicker__legend">{t('form.termin.legend')}</p>
      )}
      {value && (
        <div className={`pv-datepicker__time form-field--select${timeError ? ' is-invalid' : ''}`}>
          <label htmlFor={timeId}>{t('form.termin.zeitLabel')}</label>
          {!selectedAvailability ? (
            <p className="pv-datepicker__time-status" role="status">{t('form.termin.timeLoading')}</p>
          ) : availableSlots.length > 0 ? (
            <select
              id={timeId}
              value={timeValue}
              onChange={(event) => onTimeChange(event.target.value)}
              aria-invalid={timeError ? true : undefined}
              aria-describedby={timeError ? `${timeId}-error` : undefined}
            >
              <option value="">{t('form.termin.timeSelect')}</option>
              {availableSlots.map((slot) => (
                <option key={slot} value={slot}>{slotLabel(slot)}</option>
              ))}
            </select>
          ) : (
            <p className="pv-datepicker__time-status" role="status">{t('form.termin.timeUnavailable')}</p>
          )}
          {timeError && (
            <span id={`${timeId}-error`} className="form-field__error" role="alert">{timeError}</span>
          )}
        </div>
      )}
    </div>
  );
}
