/**
 * Email sending via Resend — shared by both Netlify functions and the
 * Vite dev middleware. Two flows are supported: contact form (KontaktForm)
 * and Blitz-Angebot (BlitzForm). Each flow sends a notification email to
 * the office and a confirmation email back to the customer.
 */

import { Resend } from 'resend';
import { buildCalculatorPdf, type CalculatorPdfPayload } from './calculatorPdf.js';

const FROM = process.env.MAIL_FROM ?? 'Prima Vista Bauprojekte <noreply@primavista-bauprojekte.com>';
const TO_OFFICE = process.env.MAIL_TO_OFFICE ?? 'office@primavista-bauprojekte.com';

let resendClient: Resend | null = null;
function getResend(): Resend {
  if (!resendClient) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error('RESEND_API_KEY is not configured');
    resendClient = new Resend(key);
  }
  return resendClient;
}

type ResendSendResult = Awaited<ReturnType<Resend['emails']['send']>>;

// Resend's fetch client (v6) accepts no AbortSignal, so bound each call by
// racing it against a timeout. Keeps a stalled upstream from burning the whole
// function wall-clock — the rejection lands in the route's try/catch and yields
// a clean 502 instead of a hard platform kill.
const RESEND_TIMEOUT_MS = 8000;

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer)) as Promise<T>;
}

function ensureEmailSent(result: ResendSendResult, context: string): void {
  if (!result.error) return;
  const detail = `${result.error.name}: ${result.error.message}`;
  throw new Error(`Resend ${context} email failed (${detail})`);
}

async function sendEmail(payload: Parameters<Resend['emails']['send']>[0], context: string): Promise<void> {
  const result = await withTimeout(getResend().emails.send(payload), RESEND_TIMEOUT_MS, `Resend ${context}`);
  ensureEmailSent(result, context);
}

const COLORS = {
  ink: '#1a1a1a',
  bg: '#f6f3ef',           // cream
  card: '#ffffff',
  muted: '#5a5a5a',
  copper: '#c89a6a',
  red: '#b61d1a',
  rule: 'rgba(26, 26, 26, 0.12)',
};

// ----- Type definitions -----

export type KontaktPayload = {
  vorname: string;
  nachname: string;
  email: string;
  tel?: string;
  art?: string;
  region?: string;
  budget?: string;
  msg: string;
};

export type BlitzPayload = {
  art: string;
  artLabel: string;
  groesse: string;
  starttermin: string;
  starterminLabel: string;
  gewerke: string[];
  msg: string;
  kalkulator?: KalkulatorHandoff | null;
  name: string;
  email: string;
  tel: string;
};

export type KalkulatorRow = {
  label: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  subtotal: number;
  sku?: string;
  description?: string;
  image?: string;
  category?: string;
  subcategory?: string;
  type?: string;
};

export type KalkulatorPick = {
  key: string;
  label: string;
  subtotal: number;
  sku?: string;
  description?: string;
  image?: string;
  category?: string;
  subcategory?: string;
  type?: string;
  tradeKey?: string;
  tradeLabel?: string;
  rows?: KalkulatorRow[];
};

export type KalkulatorHandoff = {
  kind: string;
  kindLabel: string;
  scopeLabel?: string;
  area: number;
  picks: KalkulatorPick[];
  totalMin: number;
  totalMax: number;
  totalMid: number;
  perM2: number;
};

type KalkulatorGroup = {
  key: string;
  label: string;
  subtotal: number;
  items: KalkulatorPick[];
};

// ----- Helpers -----

const escape = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const nl2br = (s: string) => escape(s).replace(/\n/g, '<br />');

function shell(title: string, eyebrow: string, body: string): string {
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escape(title)}</title>
</head>
<body style="margin:0;padding:0;background:${COLORS.bg};font-family:Georgia, 'Times New Roman', serif;color:${COLORS.ink};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${COLORS.bg};">
<tr><td align="center" style="padding:40px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:${COLORS.card};">
<tr><td style="padding:40px 40px 8px 40px;">
<div style="font-family:Helvetica, Arial, sans-serif;font-size:11px;font-weight:600;letter-spacing:0.24em;text-transform:uppercase;color:${COLORS.copper};">
<span style="display:inline-block;width:28px;height:2px;background:${COLORS.red};vertical-align:middle;margin-right:10px;"></span>${escape(eyebrow)}
</div>
</td></tr>
<tr><td style="padding:12px 40px 0 40px;">
<h1 style="margin:0;font-family:Georgia, 'Times New Roman', serif;font-style:italic;font-weight:500;font-size:30px;line-height:1.15;color:${COLORS.ink};">${title}</h1>
</td></tr>
<tr><td style="padding:24px 40px 40px 40px;">
${body}
</td></tr>
<tr><td style="padding:20px 40px;background:${COLORS.bg};border-top:1px solid ${COLORS.rule};">
<div style="font-family:Helvetica, Arial, sans-serif;font-size:11px;color:${COLORS.muted};line-height:1.6;">
Prima Vista Bauprojekte · Gref-Völsing-Straße 13, 60314 Frankfurt am Main · +49 1578 98 18 308<br />
<a href="https://primavista-bauprojekte.com" style="color:${COLORS.copper};text-decoration:none;">primavista-bauprojekte.com</a>
</div>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function row(label: string, value: string | undefined | null): string {
  if (!value) return '';
  return `<tr>
<td style="padding:10px 0;border-bottom:1px solid ${COLORS.rule};vertical-align:top;width:140px;font-family:Helvetica, Arial, sans-serif;font-size:10px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:${COLORS.muted};">${escape(label)}</td>
<td style="padding:10px 0;border-bottom:1px solid ${COLORS.rule};vertical-align:top;font-family:Helvetica, Arial, sans-serif;font-size:14px;line-height:1.5;color:${COLORS.ink};">${nl2br(value)}</td>
</tr>`;
}

function bodyParagraph(text: string): string {
  return `<p style="margin:0 0 16px 0;font-family:Helvetica, Arial, sans-serif;font-size:14px;line-height:1.6;color:${COLORS.ink};">${nl2br(text)}</p>`;
}

function sectionTitle(label: string, marginTop = 32): string {
  return `<h2 style="margin:${marginTop}px 0 12px 0;font-family:Helvetica, Arial, sans-serif;font-size:11px;font-weight:600;letter-spacing:0.24em;text-transform:uppercase;color:${COLORS.copper};">${escape(label)}</h2>`;
}

function callout(title: string, text: string): string {
  return `<div style="margin:24px 0 0 0;padding:16px 18px;background:${COLORS.bg};font-family:Helvetica, Arial, sans-serif;color:${COLORS.ink};border-left:3px solid ${COLORS.copper};">
<div style="margin:0 0 6px 0;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:${COLORS.copper};">${escape(title)}</div>
<p style="margin:0;font-size:13px;line-height:1.55;color:${COLORS.muted};">${nl2br(text)}</p>
</div>`;
}

function serviceListHtml(items: string[], emptyLabel = 'Noch keine Vorauswahl'): string {
  const cleanItems = items.map((item) => item.trim()).filter(Boolean);
  if (cleanItems.length === 0) {
    return bodyParagraph(emptyLabel);
  }

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 0 0;border-top:1px solid ${COLORS.rule};">
${cleanItems
    .map((item, index) => `<tr>
<td style="padding:12px 0;border-bottom:1px solid ${COLORS.rule};vertical-align:top;width:34px;font-family:Helvetica, Arial, sans-serif;font-size:10px;font-weight:700;letter-spacing:0.18em;color:${COLORS.copper};">${String(index + 1).padStart(2, '0')}</td>
<td style="padding:12px 0;border-bottom:1px solid ${COLORS.rule};vertical-align:top;font-family:Helvetica, Arial, sans-serif;font-size:14px;line-height:1.45;color:${COLORS.ink};">${escape(item)}</td>
</tr>`)
    .join('')}
</table>`;
}

function serviceListText(items: string[], emptyLabel = 'Noch keine Vorauswahl'): string {
  const cleanItems = items.map((item) => item.trim()).filter(Boolean);
  if (cleanItems.length === 0) return `· ${emptyLabel}`;
  return cleanItems.map((item) => `· ${item}`).join('\n');
}

function formatEuro(value: number): string {
  if (!Number.isFinite(value)) return '—';
  return value.toLocaleString('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function formatQuantity(quantity: number, unit: string): string {
  if (!Number.isFinite(quantity)) return '—';
  const amount = Number.isInteger(quantity)
    ? quantity.toLocaleString('de-DE')
    : quantity.toLocaleString('de-DE', { maximumFractionDigits: 2 });
  return `${amount} ${unit || 'Stk.'}`.trim();
}

function cleanCalculatorLabel(label: string): string {
  return label
    .replace(/[🛠🔧]/gu, '')
    .replace(/\s+/g, ' ')
    .replace(/\s+\|/g, ' |')
    .replace(/\|\s+/g, '| ')
    .trim();
}

function blitzScopeLabel(p: BlitzPayload): string {
  return p.art === 'pakete' ? 'Fläche' : 'Umfang';
}

function blitzScopeValue(p: BlitzPayload): string {
  const value = p.groesse || 'Noch offen';
  return p.art === 'pakete' ? `${value} m²` : value;
}

function calculatorScopeLabel(p: BlitzPayload): string {
  return p.kalkulator?.scopeLabel || (p.art === 'pakete' ? 'Fläche' : 'Fläche / Umfang');
}

function calculatorScopeValue(p: BlitzPayload, handoff: KalkulatorHandoff): string {
  if (!Number.isFinite(handoff.area)) return blitzScopeValue(p);
  const label = calculatorScopeLabel(p).toLocaleLowerCase('de-DE');
  const amount = handoff.area.toLocaleString('de-DE');
  if (/laufmeter|zaunlänge/.test(label)) return `${amount} m`;
  if (/qm|m²|fläche|wohnfläche|dachfläche|fassadenfläche/.test(label)) return `${amount} m²`;
  return amount;
}

function isLegacyCalculatorNote(message: string): boolean {
  const normalized = message.toLocaleLowerCase('de-DE');
  return normalized.includes('aus dem kalkulator übernommen')
    || (normalized.includes('vorab-schätzung') && normalized.includes('gewählte gewerke'));
}

function legacyCalculatorField(message: string, label: string): string | null {
  const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = message.match(new RegExp(`^\\s*${escapedLabel}\\s*:\\s*(.+)$`, 'im'));
  return match?.[1]?.trim() || null;
}

function legacyCalculatorScope(message: string): { label: string; value: string } | null {
  const match = message.match(/^\s*(Fläche|Wohnfläche|Umfang|Anzahl|Dachfläche|Fassadenfläche|Zaunlänge)\s*:\s*(.+)$/im);
  if (!match?.[1] || !match[2]) return null;
  return { label: match[1].trim(), value: match[2].trim() };
}

function cleanLegacyCalculatorNote(message: string): string {
  return message
    .replace(/^\s*[—-]\s*Aus dem Kalkulator übernommen\s*[—-]\s*$/im, 'Aus dem Kalkulator übernommen')
    .trim();
}

function hasCalculatorContext(p: BlitzPayload): boolean {
  return Boolean(p.kalkulator) || isLegacyCalculatorNote(p.msg);
}

function blitzRequestContext(p: BlitzPayload): string {
  if (p.kalkulator) return `${calculatorScopeValue(p, p.kalkulator)} ${p.kalkulator.kindLabel || p.artLabel}`;
  if (isLegacyCalculatorNote(p.msg)) {
    const kind = legacyCalculatorField(p.msg, 'Objektart') || p.artLabel;
    const scope = legacyCalculatorScope(p.msg)?.value || blitzScopeValue(p);
    return `${scope} ${kind}`.trim();
  }
  return `${blitzScopeValue(p)} ${p.artLabel}`.trim();
}

function blitzProjectRows(p: BlitzPayload): string {
  if (p.kalkulator) {
    return [
      row('Anfrage', 'Aus dem Kalkulator übernommen'),
      row('Rechner', p.kalkulator.kindLabel || p.artLabel),
      row(calculatorScopeLabel(p), calculatorScopeValue(p, p.kalkulator)),
      row('Vorab-Schätzung', `${formatEuro(p.kalkulator.totalMin)} – ${formatEuro(p.kalkulator.totalMax)}`),
      row('Baubeginn', p.starterminLabel),
    ].join('');
  }

  if (isLegacyCalculatorNote(p.msg)) {
    const scope = legacyCalculatorScope(p.msg);
    return [
      row('Anfrage', 'Aus dem Kalkulator übernommen'),
      row('Rechner', legacyCalculatorField(p.msg, 'Objektart') || p.artLabel),
      scope ? row(scope.label, scope.value) : row(blitzScopeLabel(p), blitzScopeValue(p)),
      row('Vorab-Schätzung', legacyCalculatorField(p.msg, 'Vorab-Schätzung')),
      row('Baubeginn', p.starterminLabel),
    ].join('');
  }

  return [
    row('Objektart', p.artLabel),
    row(blitzScopeLabel(p), blitzScopeValue(p)),
    row('Baubeginn', p.starterminLabel),
  ].join('');
}

function blitzServiceSectionHtml(title: string, p: BlitzPayload, marginTop = 28): string {
  if (p.gewerke.length === 0 && hasCalculatorContext(p)) return '';
  return `${sectionTitle(title, marginTop)}${serviceListHtml(p.gewerke)}`;
}

function blitzServiceSectionText(title: string, p: BlitzPayload): string {
  if (p.gewerke.length === 0 && hasCalculatorContext(p)) return '';
  return `\n${title}:\n${serviceListText(p.gewerke)}`;
}

function legacyCalculatorBlockHtml(p: BlitzPayload, heading: string): string {
  if (p.kalkulator || !isLegacyCalculatorNote(p.msg)) return '';
  return `
${sectionTitle(heading)}
<div style="margin:0 0 18px 0;padding:16px 18px;background:${COLORS.bg};border-left:3px solid ${COLORS.copper};">
${bodyParagraph(cleanLegacyCalculatorNote(p.msg))}
</div>`;
}

function groupCalculatorPicks(picks: KalkulatorPick[]): KalkulatorGroup[] {
  const groups: KalkulatorGroup[] = [];
  const byKey = new Map<string, KalkulatorGroup>();
  let lastGroup: KalkulatorGroup | null = null;

  function push(group: KalkulatorGroup, pick: KalkulatorPick) {
    group.items.push(pick);
    group.subtotal += pick.subtotal;
    lastGroup = group;
  }

  for (const pick of picks) {
    if (pick.tradeKey) {
      let group = byKey.get(pick.tradeKey);
      if (!group) {
        group = {
          key: pick.tradeKey,
          label: pick.tradeLabel ?? pick.label,
          subtotal: 0,
          items: [],
        };
        byKey.set(pick.tradeKey, group);
        groups.push(group);
      }
      push(group, pick);
    } else if (lastGroup) {
      push(lastGroup, pick);
    } else {
      const group: KalkulatorGroup = {
        key: `_${pick.key}`,
        label: pick.label,
        subtotal: 0,
        items: [],
      };
      groups.push(group);
      push(group, pick);
    }
  }

  return groups;
}

function calculatorSummaryHtml(p: BlitzPayload, handoff: KalkulatorHandoff): string {
  const summaryRows = [
    row('Objektart', handoff.kindLabel || p.artLabel),
    row(calculatorScopeLabel(p), calculatorScopeValue(p, handoff)),
    row('Vorab-Schätzung', `${formatEuro(handoff.totalMin)} – ${formatEuro(handoff.totalMax)}`),
    row('Mittelwert', formatEuro(handoff.totalMid)),
    handoff.perM2 > 0 ? row('Richtwert', `${formatEuro(handoff.perM2)} / m²`) : '',
  ].join('');

  return `
<div style="margin:24px 0;padding:18px 20px;background:${COLORS.bg};border-left:3px solid ${COLORS.copper};">
  <div style="font-family:Helvetica, Arial, sans-serif;font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:${COLORS.copper};margin-bottom:10px;">Aus dem Kalkulator übernommen</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${summaryRows}</table>
</div>`;
}

function calculatorDetailsHtml(
  p: BlitzPayload,
  options: { includeRows: boolean; heading: string },
): string {
  const handoff = p.kalkulator;
  if (!handoff) return '';

  const groups = groupCalculatorPicks(handoff.picks);
  const details = groups.map((group) => {
    const groupHasNested = group.items.length > 1 || group.items[0]?.label !== group.label;
    const items = group.items.map((item) => {
      const itemRows = options.includeRows && item.rows && item.rows.length > 0
        ? `<tr><td colspan="3" style="padding:0 0 10px 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${COLORS.rule};">
            <tr>
              <th align="left" style="padding:8px 10px;background:${COLORS.bg};font-family:Helvetica, Arial, sans-serif;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:${COLORS.muted};">Position</th>
              <th align="left" style="padding:8px 10px;background:${COLORS.bg};font-family:Helvetica, Arial, sans-serif;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:${COLORS.muted};width:84px;">Menge</th>
              <th align="right" style="padding:8px 10px;background:${COLORS.bg};font-family:Helvetica, Arial, sans-serif;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:${COLORS.muted};width:90px;">Summe</th>
            </tr>
            ${item.rows.map((line) => `<tr>
              <td style="padding:8px 10px;border-top:1px solid ${COLORS.rule};font-family:Helvetica, Arial, sans-serif;font-size:12px;line-height:1.4;color:${COLORS.ink};">${escape(cleanCalculatorLabel(line.label))}</td>
              <td style="padding:8px 10px;border-top:1px solid ${COLORS.rule};font-family:Helvetica, Arial, sans-serif;font-size:12px;color:${COLORS.muted};white-space:nowrap;">${escape(formatQuantity(line.quantity, line.unit))}</td>
              <td align="right" style="padding:8px 10px;border-top:1px solid ${COLORS.rule};font-family:Helvetica, Arial, sans-serif;font-size:12px;color:${COLORS.ink};white-space:nowrap;">${escape(formatEuro(line.subtotal))}</td>
            </tr>`).join('')}
          </table>
        </td></tr>`
        : '';

      if (!groupHasNested && !options.includeRows) return '';

      return `<tr>
        <td style="padding:9px 0;border-bottom:1px solid ${COLORS.rule};font-family:Helvetica, Arial, sans-serif;font-size:13px;line-height:1.4;color:${COLORS.ink};">${escape(cleanCalculatorLabel(item.label))}</td>
        <td style="padding:9px 0;border-bottom:1px solid ${COLORS.rule};font-family:Helvetica, Arial, sans-serif;font-size:12px;color:${COLORS.muted};">${item.rows?.length ? `${item.rows.length} Positionen` : ''}</td>
        <td align="right" style="padding:9px 0;border-bottom:1px solid ${COLORS.rule};font-family:Helvetica, Arial, sans-serif;font-size:13px;color:${COLORS.ink};white-space:nowrap;">${escape(formatEuro(item.subtotal))}</td>
      </tr>${itemRows}`;
    }).join('');

    const simpleRows = !groupHasNested && options.includeRows && group.items[0]?.rows
      ? group.items[0].rows.map((line) => `<tr>
          <td style="padding:8px 0;border-bottom:1px solid ${COLORS.rule};font-family:Helvetica, Arial, sans-serif;font-size:12px;line-height:1.4;color:${COLORS.ink};">${escape(cleanCalculatorLabel(line.label))}</td>
          <td style="padding:8px 0;border-bottom:1px solid ${COLORS.rule};font-family:Helvetica, Arial, sans-serif;font-size:12px;color:${COLORS.muted};white-space:nowrap;">${escape(formatQuantity(line.quantity, line.unit))}</td>
          <td align="right" style="padding:8px 0;border-bottom:1px solid ${COLORS.rule};font-family:Helvetica, Arial, sans-serif;font-size:12px;color:${COLORS.ink};white-space:nowrap;">${escape(formatEuro(line.subtotal))}</td>
        </tr>`).join('')
      : items;

    return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px 0;">
  <tr>
    <td style="padding:12px 0;border-bottom:2px solid ${COLORS.rule};font-family:Helvetica, Arial, sans-serif;font-size:14px;font-weight:700;color:${COLORS.ink};">${escape(cleanCalculatorLabel(group.label))}</td>
    <td align="right" colspan="2" style="padding:12px 0;border-bottom:2px solid ${COLORS.rule};font-family:Helvetica, Arial, sans-serif;font-size:14px;font-weight:700;color:${COLORS.ink};white-space:nowrap;">${escape(formatEuro(group.subtotal))}</td>
  </tr>
  ${simpleRows}
</table>`;
  }).join('');

  return `
${sectionTitle(options.heading)}
${calculatorSummaryHtml(p, handoff)}
${details}`;
}

function calculatorDetailsText(p: BlitzPayload, options: { includeRows: boolean; heading: string }): string {
  const handoff = p.kalkulator;
  if (!handoff) return '';
  const groups = groupCalculatorPicks(handoff.picks);
  const lines = [
    options.heading,
    `Objektart: ${handoff.kindLabel || p.artLabel}`,
    `${calculatorScopeLabel(p)}: ${calculatorScopeValue(p, handoff)}`,
    `Vorab-Schätzung: ${formatEuro(handoff.totalMin)} – ${formatEuro(handoff.totalMax)}`,
    `Mittelwert: ${formatEuro(handoff.totalMid)}`,
    handoff.perM2 > 0 ? `Richtwert: ${formatEuro(handoff.perM2)} / m²` : '',
    '',
    'Gewählte Leistungen:',
  ].filter(Boolean);

  for (const group of groups) {
    lines.push(`- ${cleanCalculatorLabel(group.label)}: ${formatEuro(group.subtotal)}`);
    const groupHasNested = group.items.length > 1 || group.items[0]?.label !== group.label;
    for (const item of group.items) {
      if (groupHasNested) lines.push(`  - ${cleanCalculatorLabel(item.label)}: ${formatEuro(item.subtotal)}`);
      if (options.includeRows && item.rows) {
        for (const itemRow of item.rows) {
          lines.push(`    · ${cleanCalculatorLabel(itemRow.label)} (${formatQuantity(itemRow.quantity, itemRow.unit)}): ${formatEuro(itemRow.subtotal)}`);
        }
      }
    }
  }

  return lines.join('\n');
}

function steps(items: string[]): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0 0 0;border-top:1px solid ${COLORS.rule};">
${items
  .map(
    (item, i) => `<tr>
<td style="padding:14px 0;border-bottom:1px solid ${COLORS.rule};vertical-align:top;width:32px;font-family:Helvetica, Arial, sans-serif;font-size:10px;font-weight:600;letter-spacing:0.24em;color:${COLORS.copper};">${String(i + 1).padStart(2, '0')}</td>
<td style="padding:14px 0;border-bottom:1px solid ${COLORS.rule};vertical-align:top;font-family:Helvetica, Arial, sans-serif;font-size:13px;line-height:1.5;color:${COLORS.ink};">${escape(item)}</td>
</tr>`,
  )
  .join('')}
</table>`;
}

// ----- Office notification — Kontakt -----

function kontaktOfficeHtml(p: KontaktPayload): string {
  const rows = [
    row('Name', `${p.vorname} ${p.nachname}`),
    row('E-Mail', p.email),
    row('Telefon', p.tel || ''),
    row('Art', p.art || ''),
    row('Region', p.region || ''),
    row('Budget', p.budget || ''),
  ].join('');
  const body = `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>
<h2 style="margin:32px 0 12px 0;font-family:Helvetica, Arial, sans-serif;font-size:11px;font-weight:600;letter-spacing:0.24em;text-transform:uppercase;color:${COLORS.copper};">Nachricht</h2>
${bodyParagraph(p.msg)}
<p style="margin:24px 0 0 0;padding:14px 16px;background:${COLORS.bg};font-family:Helvetica, Arial, sans-serif;font-size:12px;line-height:1.5;color:${COLORS.muted};border-left:2px solid ${COLORS.copper};">
Antworten Sie direkt auf diese E-Mail, um mit ${escape(p.vorname)} in Kontakt zu treten.
</p>`;
  return shell(`Neue Anfrage von ${escape(p.vorname)} ${escape(p.nachname)}`, 'Kontaktformular · Neue Anfrage', body);
}

function kontaktOfficeText(p: KontaktPayload): string {
  return [
    `Neue Anfrage über das Kontaktformular`,
    ``,
    `Name: ${p.vorname} ${p.nachname}`,
    `E-Mail: ${p.email}`,
    p.tel ? `Telefon: ${p.tel}` : '',
    p.art ? `Art: ${p.art}` : '',
    p.region ? `Region: ${p.region}` : '',
    p.budget ? `Budget: ${p.budget}` : '',
    ``,
    `Nachricht:`,
    p.msg,
    ``,
    `— Antworten Sie direkt auf diese E-Mail, um mit ${p.vorname} in Kontakt zu treten.`,
  ]
    .filter(Boolean)
    .join('\n');
}

// ----- Customer confirmation — Kontakt -----

function kontaktConfirmHtml(p: KontaktPayload): string {
  const echo = [
    row('Ihre E-Mail', p.email),
    row('Telefon', p.tel || ''),
    row('Art', p.art || ''),
  ].join('');
  const body = `
${bodyParagraph(
  `Ihre Anfrage ist bei uns eingegangen. Wir prüfen Ihr Vorhaben und melden uns innerhalb von 24 Stunden bei Ihnen — per E-Mail an ${p.email}${p.tel ? ` oder telefonisch unter ${p.tel}` : ''}.`,
)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 0 0;">${echo}</table>
<h2 style="margin:32px 0 8px 0;font-family:Helvetica, Arial, sans-serif;font-size:11px;font-weight:600;letter-spacing:0.24em;text-transform:uppercase;color:${COLORS.copper};">So geht es weiter</h2>
${steps([
  'Wir lesen Ihre Angaben und bereiten erste Fragen vor.',
  'Sie erhalten eine schriftliche Antwort oder einen Rückruf.',
  'Auf Wunsch vereinbaren wir einen Termin vor Ort.',
])}
${bodyParagraph(`Mit freundlichen Grüßen,\nDaniel & Monica Irimia · Prima Vista Bauprojekte`)}`;
  return shell(`Vielen Dank, ${escape(p.vorname)}.`, 'Eingangsbestätigung · Kontaktanfrage', body);
}

function kontaktConfirmText(p: KontaktPayload): string {
  return [
    `Vielen Dank, ${p.vorname}.`,
    ``,
    `Ihre Anfrage ist bei uns eingegangen. Wir melden uns innerhalb von 24 Stunden bei Ihnen — per E-Mail an ${p.email}${p.tel ? ` oder telefonisch unter ${p.tel}` : ''}.`,
    ``,
    `So geht es weiter:`,
    `01  Wir lesen Ihre Angaben und bereiten erste Fragen vor.`,
    `02  Sie erhalten eine schriftliche Antwort oder einen Rückruf.`,
    `03  Auf Wunsch vereinbaren wir einen Termin vor Ort.`,
    ``,
    `Mit freundlichen Grüßen,`,
    `Daniel & Monica Irimia`,
    `Prima Vista Bauprojekte`,
  ].join('\n');
}

// ----- Office notification — Blitz -----

function blitzOfficeHtml(p: BlitzPayload): string {
  const rows = [
    row('Name', p.name),
    row('E-Mail', p.email),
    row('Telefon', p.tel || ''),
    blitzProjectRows(p),
  ].join('');
  const calculatorBlock = calculatorDetailsHtml(p, {
    includeRows: true,
    heading: 'Übernommene Kalkulation',
  });
  const legacyCalculatorBlock = legacyCalculatorBlockHtml(p, 'Übernommene Kalkulation');
  const msgBlock = p.msg && !isLegacyCalculatorNote(p.msg)
    ? `${sectionTitle('Besonderheiten / Kundennotiz')}${bodyParagraph(p.msg)}`
    : '';
  const body = `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>
${blitzServiceSectionHtml('Gewählte Leistungen / Anfragebereich', p, 28)}
${calculatorBlock}
${legacyCalculatorBlock}
${msgBlock}
${callout(
  'Nächster Schritt',
  `Innerhalb von 24 Stunden mit einer ersten Kostenschätzung antworten. Eine Antwort auf diese E-Mail geht direkt an ${p.email}.`,
)}`;
  return shell(`Blitz-Anfrage von ${escape(p.name)}`, 'Blitz-Angebot · 24-Std-Schätzung', body);
}

function blitzOfficeText(p: BlitzPayload): string {
  return [
    `Neue Blitz-Anfrage`,
    ``,
    `Name: ${p.name}`,
    `E-Mail: ${p.email}`,
    p.tel ? `Telefon: ${p.tel}` : '',
    hasCalculatorContext(p) ? `Anfrage: Aus dem Kalkulator übernommen` : `Objektart: ${p.artLabel}`,
    hasCalculatorContext(p) ? `Rechner: ${p.kalkulator?.kindLabel || legacyCalculatorField(p.msg, 'Objektart') || p.artLabel}` : `${blitzScopeLabel(p)}: ${blitzScopeValue(p)}`,
    p.kalkulator
      ? `${calculatorScopeLabel(p)}: ${calculatorScopeValue(p, p.kalkulator)}`
      : isLegacyCalculatorNote(p.msg) && legacyCalculatorScope(p.msg)
        ? `${legacyCalculatorScope(p.msg)!.label}: ${legacyCalculatorScope(p.msg)!.value}`
        : '',
    p.kalkulator
      ? `Vorab-Schätzung: ${formatEuro(p.kalkulator.totalMin)} – ${formatEuro(p.kalkulator.totalMax)}`
      : isLegacyCalculatorNote(p.msg) && legacyCalculatorField(p.msg, 'Vorab-Schätzung')
        ? `Vorab-Schätzung: ${legacyCalculatorField(p.msg, 'Vorab-Schätzung')}`
        : '',
    `Baubeginn: ${p.starterminLabel}`,
    blitzServiceSectionText('Gewählte Leistungen / Anfragebereich', p),
    p.kalkulator ? `\n${calculatorDetailsText(p, { includeRows: true, heading: 'Übernommene Kalkulation' })}` : '',
    !p.kalkulator && isLegacyCalculatorNote(p.msg) ? `\nÜbernommene Kalkulation:\n${cleanLegacyCalculatorNote(p.msg)}` : '',
    p.msg && !isLegacyCalculatorNote(p.msg) ? `\nBesonderheiten / Kundennotiz:\n${p.msg}` : '',
    ``,
    `Nächster Schritt: Innerhalb von 24 Stunden mit einer ersten Kostenschätzung antworten.`,
  ]
    .filter(Boolean)
    .join('\n');
}

// ----- Customer confirmation — Blitz -----

function blitzConfirmHtml(p: BlitzPayload): string {
  const firstName = p.name.trim().split(/\s+/)[0] ?? p.name;
  const echo = blitzProjectRows(p);
  const calculatorBlock = calculatorDetailsHtml(p, {
    includeRows: false,
    heading: 'Ihre übernommene Kalkulation',
  });
  const legacyCalculatorBlock = legacyCalculatorBlockHtml(p, 'Ihre übernommene Kalkulation');
  const noteBlock = p.msg && !isLegacyCalculatorNote(p.msg)
    ? `${sectionTitle('Ihre Notiz')}${bodyParagraph(p.msg)}`
    : '';
  const body = `
${bodyParagraph(
  `Ihre Blitz-Anfrage ist bei uns eingegangen. Wir werten Ihr Projekt aus und stellen Ihnen innerhalb von 24 Stunden eine erste Kostenschätzung zu — per E-Mail an ${p.email}${p.tel ? ` oder telefonisch unter ${p.tel}` : ''}.`,
)}
<h2 style="margin:24px 0 8px 0;font-family:Helvetica, Arial, sans-serif;font-size:11px;font-weight:600;letter-spacing:0.24em;text-transform:uppercase;color:${COLORS.copper};">Ihre Angaben</h2>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${echo}</table>
${blitzServiceSectionHtml('Ihre ausgewählten Leistungen', p, 28)}
${calculatorBlock}
${legacyCalculatorBlock}
${noteBlock}
<h2 style="margin:32px 0 8px 0;font-family:Helvetica, Arial, sans-serif;font-size:11px;font-weight:600;letter-spacing:0.24em;text-transform:uppercase;color:${COLORS.copper};">So geht es weiter</h2>
${steps([
  'Bauleitung prüft Fläche bzw. Umfang, Standort und gewünschte Leistungen.',
  'Sie erhalten eine schriftliche Vorab-Kostenschätzung.',
  'Auf Wunsch verfeinern wir das Angebot vor Ort — verbindlich nach Aufmaß.',
])}
${bodyParagraph(`Mit freundlichen Grüßen,\nDaniel & Monica Irimia · Prima Vista Bauprojekte`)}`;
  return shell(`Vielen Dank, ${escape(firstName)}.`, 'Eingangsbestätigung · Blitz-Angebot', body);
}

function blitzConfirmText(p: BlitzPayload): string {
  const firstName = p.name.trim().split(/\s+/)[0] ?? p.name;
  return [
    `Vielen Dank, ${firstName}.`,
    ``,
    `Ihre Blitz-Anfrage ist bei uns eingegangen. Sie erhalten innerhalb von 24 Stunden eine erste Kostenschätzung per E-Mail an ${p.email}${p.tel ? ` oder telefonisch unter ${p.tel}` : ''}.`,
    ``,
    `Ihre Angaben:`,
    hasCalculatorContext(p) ? `· Anfrage: Aus dem Kalkulator übernommen` : `· Objektart: ${p.artLabel}`,
    hasCalculatorContext(p) ? `· Rechner: ${p.kalkulator?.kindLabel || legacyCalculatorField(p.msg, 'Objektart') || p.artLabel}` : `· ${blitzScopeLabel(p)}: ${blitzScopeValue(p)}`,
    p.kalkulator
      ? `· ${calculatorScopeLabel(p)}: ${calculatorScopeValue(p, p.kalkulator)}`
      : isLegacyCalculatorNote(p.msg) && legacyCalculatorScope(p.msg)
        ? `· ${legacyCalculatorScope(p.msg)!.label}: ${legacyCalculatorScope(p.msg)!.value}`
        : '',
    p.kalkulator
      ? `· Vorab-Schätzung: ${formatEuro(p.kalkulator.totalMin)} – ${formatEuro(p.kalkulator.totalMax)}`
      : isLegacyCalculatorNote(p.msg) && legacyCalculatorField(p.msg, 'Vorab-Schätzung')
        ? `· Vorab-Schätzung: ${legacyCalculatorField(p.msg, 'Vorab-Schätzung')}`
        : '',
    `· Baubeginn: ${p.starterminLabel}`,
    blitzServiceSectionText('Ihre ausgewählten Leistungen', p),
    p.kalkulator ? `\n${calculatorDetailsText(p, { includeRows: false, heading: 'Ihre übernommene Kalkulation' })}` : '',
    !p.kalkulator && isLegacyCalculatorNote(p.msg) ? `\nIhre übernommene Kalkulation:\n${cleanLegacyCalculatorNote(p.msg)}` : '',
    p.msg && !isLegacyCalculatorNote(p.msg) ? `\nIhre Notiz:\n${p.msg}` : '',
    ``,
    `So geht es weiter:`,
    `01  Bauleitung prüft Fläche bzw. Umfang, Standort und gewünschte Leistungen.`,
    `02  Sie erhalten eine schriftliche Vorab-Kostenschätzung.`,
    `03  Auf Wunsch verfeinern wir das Angebot vor Ort.`,
    ``,
    `Mit freundlichen Grüßen,`,
    `Daniel & Monica Irimia`,
    `Prima Vista Bauprojekte`,
  ].join('\n');
}

function calculatorPdfHtml(p: CalculatorPdfPayload): string {
  const body = `
${bodyParagraph(
  `Im Anhang finden Sie Ihre PDF-Aufstellung aus dem Prima Vista Kalkulator für ${p.kalkulator.kindLabel}. Alle Summen, Positionen und Hinweise sind dort kompakt zusammengefasst.`,
)}
${steps([
  'Öffnen Sie die PDF im Anhang für die vollständige Aufstellung.',
  'Für ein verbindliches Angebot prüfen wir Aufmaß, Bestand und Materialauswahl.',
  'Antworten Sie direkt auf diese E-Mail, wenn wir die Schätzung verfeinern sollen.',
])}
${bodyParagraph(`Mit freundlichen Grüßen,\nDaniel & Monica Irimia · Prima Vista Bauprojekte`)}`;

  return shell('Ihre PDF-Aufstellung ist da.', 'Kalkulator · PDF-Aufstellung', body);
}

function calculatorPdfText(p: CalculatorPdfPayload): string {
  return [
    `Ihre PDF-Aufstellung ist da.`,
    ``,
    `Im Anhang finden Sie Ihre PDF-Aufstellung aus dem Prima Vista Kalkulator für ${p.kalkulator.kindLabel}.`,
    `Alle Summen, Positionen und Hinweise sind dort kompakt zusammengefasst.`,
    ``,
    `So geht es weiter:`,
    `01  Öffnen Sie die PDF im Anhang für die vollständige Aufstellung.`,
    `02  Für ein verbindliches Angebot prüfen wir Aufmaß, Bestand und Materialauswahl.`,
    `03  Antworten Sie direkt auf diese E-Mail, wenn wir die Schätzung verfeinern sollen.`,
    ``,
    `Mit freundlichen Grüßen,`,
    `Daniel & Monica Irimia`,
    `Prima Vista Bauprojekte`,
  ].join('\n');
}

// ----- Public API -----

type RenderedEmail = {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  html: string;
  text: string;
};

export function renderBlitzEmails(payload: BlitzPayload): {
  office: RenderedEmail;
  customer: RenderedEmail;
} {
  return {
    office: {
      from: FROM,
      to: TO_OFFICE,
      replyTo: payload.email,
      subject: `Blitz-Anfrage · ${payload.name} · ${blitzRequestContext(payload)}`,
      html: blitzOfficeHtml(payload),
      text: blitzOfficeText(payload),
    },
    customer: {
      from: FROM,
      to: payload.email,
      replyTo: TO_OFFICE,
      subject: `Ihre Blitz-Anfrage ist eingegangen — Prima Vista Bauprojekte`,
      html: blitzConfirmHtml(payload),
      text: blitzConfirmText(payload),
    },
  };
}

export async function sendKontaktEmails(payload: KontaktPayload): Promise<void> {
  // Office notification — reply-to set to customer so the team can reply directly.
  await sendEmail({
    from: FROM,
    to: TO_OFFICE,
    replyTo: payload.email,
    subject: `Neue Anfrage · ${payload.vorname} ${payload.nachname}`,
    html: kontaktOfficeHtml(payload),
    text: kontaktOfficeText(payload),
  }, 'Kontakt office');
  // Customer confirmation — reply-to set to office so the customer can write back.
  await sendEmail({
    from: FROM,
    to: payload.email,
    replyTo: TO_OFFICE,
    subject: `Vielen Dank für Ihre Anfrage — Prima Vista Bauprojekte`,
    html: kontaktConfirmHtml(payload),
    text: kontaktConfirmText(payload),
  }, 'Kontakt confirmation');
}

export async function sendBlitzEmails(payload: BlitzPayload): Promise<void> {
  const rendered = renderBlitzEmails(payload);
  await sendEmail({
    from: rendered.office.from,
    to: rendered.office.to,
    replyTo: rendered.office.replyTo,
    subject: rendered.office.subject,
    html: rendered.office.html,
    text: rendered.office.text,
  }, 'Blitz office');
  await sendEmail({
    from: rendered.customer.from,
    to: rendered.customer.to,
    replyTo: rendered.customer.replyTo,
    subject: rendered.customer.subject,
    html: rendered.customer.html,
    text: rendered.customer.text,
  }, 'Blitz confirmation');
}

export async function sendCalculatorPdfEmail(payload: CalculatorPdfPayload): Promise<void> {
  const pdf = await buildCalculatorPdf(payload);
  const slug = cleanCalculatorLabel(payload.kalkulator.kindLabel)
    .toLocaleLowerCase('de-DE')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    || 'kalkulator';

  await sendEmail({
    from: FROM,
    to: payload.email,
    bcc: TO_OFFICE,
    replyTo: TO_OFFICE,
    subject: `Ihre PDF-Aufstellung · ${payload.kalkulator.kindLabel}`,
    html: calculatorPdfHtml(payload),
    text: calculatorPdfText(payload),
    attachments: [{
      filename: `prima-vista-${slug}.pdf`,
      content: pdf,
    }],
  }, 'Calculator PDF');
}
