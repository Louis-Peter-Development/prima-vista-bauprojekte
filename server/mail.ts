/**
 * Email sending via Resend — shared by both Netlify functions and the
 * Vite dev middleware. Two flows are supported: contact form (KontaktForm)
 * and Blitz-Angebot (BlitzForm). Each flow sends a notification email to
 * the office and a confirmation email back to the customer.
 */

import { Resend } from 'resend';

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
  name: string;
  email: string;
  tel: string;
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
    row('Objektart', p.artLabel),
    row('Fläche', `${p.groesse} m²`),
    row('Baubeginn', p.starterminLabel),
    row('Gewerke', p.gewerke.length ? p.gewerke.join(', ') : '—'),
  ].join('');
  const msgBlock = p.msg
    ? `<h2 style="margin:32px 0 12px 0;font-family:Helvetica, Arial, sans-serif;font-size:11px;font-weight:600;letter-spacing:0.24em;text-transform:uppercase;color:${COLORS.copper};">Besonderheiten / Kurzfassung</h2>${bodyParagraph(p.msg)}`
    : '';
  const body = `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>
${msgBlock}
<p style="margin:24px 0 0 0;padding:14px 16px;background:${COLORS.bg};font-family:Helvetica, Arial, sans-serif;font-size:12px;line-height:1.5;color:${COLORS.muted};border-left:2px solid ${COLORS.copper};">
Antworten Sie innerhalb von 24 Stunden mit einer ersten Kostenschätzung. Reply geht direkt an ${escape(p.email)}.
</p>`;
  return shell(`Blitz-Anfrage von ${escape(p.name)}`, 'Blitz-Angebot · 24-Std-Schätzung', body);
}

function blitzOfficeText(p: BlitzPayload): string {
  return [
    `Neue Blitz-Anfrage`,
    ``,
    `Name: ${p.name}`,
    `E-Mail: ${p.email}`,
    p.tel ? `Telefon: ${p.tel}` : '',
    `Objektart: ${p.artLabel}`,
    `Fläche: ${p.groesse} m²`,
    `Baubeginn: ${p.starterminLabel}`,
    `Gewerke: ${p.gewerke.length ? p.gewerke.join(', ') : '—'}`,
    p.msg ? `\nBesonderheiten / Kurzfassung:\n${p.msg}` : '',
    ``,
    `— Antwort innerhalb von 24 Stunden zugesagt.`,
  ]
    .filter(Boolean)
    .join('\n');
}

// ----- Customer confirmation — Blitz -----

function blitzConfirmHtml(p: BlitzPayload): string {
  const firstName = p.name.trim().split(/\s+/)[0] ?? p.name;
  const echo = [
    row('Objektart', p.artLabel),
    row('Fläche', `${p.groesse} m²`),
    row('Baubeginn', p.starterminLabel),
    row('Gewerke', p.gewerke.length ? p.gewerke.join(', ') : '—'),
  ].join('');
  const body = `
${bodyParagraph(
  `Ihre Blitz-Anfrage ist bei uns eingegangen. Wir werten Ihr Projekt aus und stellen Ihnen innerhalb von 24 Stunden eine erste Kostenschätzung zu — per E-Mail an ${p.email}${p.tel ? ` oder telefonisch unter ${p.tel}` : ''}.`,
)}
<h2 style="margin:24px 0 8px 0;font-family:Helvetica, Arial, sans-serif;font-size:11px;font-weight:600;letter-spacing:0.24em;text-transform:uppercase;color:${COLORS.copper};">Ihre Angaben</h2>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${echo}</table>
<h2 style="margin:32px 0 8px 0;font-family:Helvetica, Arial, sans-serif;font-size:11px;font-weight:600;letter-spacing:0.24em;text-transform:uppercase;color:${COLORS.copper};">So geht es weiter</h2>
${steps([
  'Bauleitung prüft Fläche, Standort und gewünschte Gewerke.',
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
    `· Objektart: ${p.artLabel}`,
    `· Fläche: ${p.groesse} m²`,
    `· Baubeginn: ${p.starterminLabel}`,
    `· Gewerke: ${p.gewerke.length ? p.gewerke.join(', ') : '—'}`,
    ``,
    `So geht es weiter:`,
    `01  Bauleitung prüft Fläche, Standort und gewünschte Gewerke.`,
    `02  Sie erhalten eine schriftliche Vorab-Kostenschätzung.`,
    `03  Auf Wunsch verfeinern wir das Angebot vor Ort.`,
    ``,
    `Mit freundlichen Grüßen,`,
    `Daniel & Monica Irimia`,
    `Prima Vista Bauprojekte`,
  ].join('\n');
}

// ----- Public API -----

export async function sendKontaktEmails(payload: KontaktPayload): Promise<void> {
  const resend = getResend();
  // Office notification — reply-to set to customer so the team can reply directly.
  await resend.emails.send({
    from: FROM,
    to: TO_OFFICE,
    replyTo: payload.email,
    subject: `Neue Anfrage · ${payload.vorname} ${payload.nachname}`,
    html: kontaktOfficeHtml(payload),
    text: kontaktOfficeText(payload),
  });
  // Customer confirmation — reply-to set to office so the customer can write back.
  await resend.emails.send({
    from: FROM,
    to: payload.email,
    replyTo: TO_OFFICE,
    subject: `Vielen Dank für Ihre Anfrage — Prima Vista Bauprojekte`,
    html: kontaktConfirmHtml(payload),
    text: kontaktConfirmText(payload),
  });
}

export async function sendBlitzEmails(payload: BlitzPayload): Promise<void> {
  const resend = getResend();
  await resend.emails.send({
    from: FROM,
    to: TO_OFFICE,
    replyTo: payload.email,
    subject: `Blitz-Anfrage · ${payload.name} · ${payload.groesse} m² ${payload.artLabel}`,
    html: blitzOfficeHtml(payload),
    text: blitzOfficeText(payload),
  });
  await resend.emails.send({
    from: FROM,
    to: payload.email,
    replyTo: TO_OFFICE,
    subject: `Ihre Blitz-Anfrage ist eingegangen — Prima Vista Bauprojekte`,
    html: blitzConfirmHtml(payload),
    text: blitzConfirmText(payload),
  });
}
