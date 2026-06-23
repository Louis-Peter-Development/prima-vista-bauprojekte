import PDFDocument from 'pdfkit';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import type { KalkulatorHandoff, KalkulatorPick, KalkulatorRow } from './mail.js';

export type CalculatorPdfPayload = {
  email: string;
  consent: boolean;
  kalkulator: KalkulatorHandoff;
  sourceUrl?: string;
};

type PdfGroup = {
  key: string;
  label: string;
  subtotal: number;
  items: KalkulatorPick[];
};

const PAGE = {
  marginX: 46,
  top: 48,
  bottom: 92,
  width: 595.28,
  height: 841.89,
};

const COLORS = {
  ink: '#171412',
  muted: '#6f6862',
  faint: '#aaa19a',
  copper: '#c28d59',
  red: '#b61d1a',
  bone: '#f6f0ea',
  rule: '#ded5cd',
  paper: '#fbf8f5',
};

let cachedLogo: Buffer | null | undefined;

function getLogoBuffer(): Buffer | null {
  if (cachedLogo !== undefined) return cachedLogo;
  const candidates = [
    path.join(process.cwd(), 'public', 'assets', 'img', 'logo.png'),
    path.join(process.cwd(), 'assets', 'img', 'logo.png'),
  ];
  const logoPath = candidates.find((candidate) => existsSync(candidate));
  cachedLogo = logoPath ? readFileSync(logoPath) : null;
  return cachedLogo;
}

function cleanLabel(value: string): string {
  return String(value || '')
    .replace(/[🛠🔧]/gu, '')
    .replace(/\s+/g, ' ')
    .replace(/\s+\|/g, ' |')
    .replace(/\|\s+/g, '| ')
    .trim();
}

function formatEuro(value: number, cents = true): string {
  if (!Number.isFinite(value)) return '-';
  return value.toLocaleString('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  });
}

function formatQuantity(quantity: number, unit: string): string {
  if (!Number.isFinite(quantity)) return '-';
  const amount = Number.isInteger(quantity)
    ? quantity.toLocaleString('de-DE')
    : quantity.toLocaleString('de-DE', { maximumFractionDigits: 2 });
  return `${amount} ${unit || 'Stk.'}`.trim();
}

function formatScope(handoff: KalkulatorHandoff): string {
  const label = (handoff.scopeLabel || '').toLocaleLowerCase('de-DE');
  const amount = Number.isFinite(handoff.area) ? handoff.area.toLocaleString('de-DE') : '-';
  if (/laufmeter|zaunlänge/.test(label)) return `${amount} m`;
  if (/qm|m²|fläche|wohnfläche|dachfläche|fassadenfläche/.test(label)) return `${amount} m²`;
  return amount;
}

function groupCalculatorPicks(picks: KalkulatorPick[]): PdfGroup[] {
  const groups: PdfGroup[] = [];
  const byKey = new Map<string, PdfGroup>();
  let lastGroup: PdfGroup | null = null;

  function push(group: PdfGroup, pick: KalkulatorPick) {
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
      const group: PdfGroup = {
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

function collectLineItems(handoff: KalkulatorHandoff): Array<{ group: PdfGroup; line: KalkulatorRow | KalkulatorPick; nested: boolean }> {
  const result: Array<{ group: PdfGroup; line: KalkulatorRow | KalkulatorPick; nested: boolean }> = [];
  for (const group of groupCalculatorPicks(handoff.picks)) {
    for (const item of group.items) {
      if (item.rows && item.rows.length > 0) {
        for (const row of item.rows) result.push({ group, line: row, nested: true });
      } else {
        result.push({ group, line: item, nested: false });
      }
    }
  }
  return result;
}

function lineQuantity(line: KalkulatorRow | KalkulatorPick, handoff: KalkulatorHandoff): string {
  if ('quantity' in line) return formatQuantity(line.quantity, line.unit);
  return handoff.area > 0 ? formatQuantity(handoff.area, 'm²') : '1 Stk.';
}

function lineUnitPrice(line: KalkulatorRow | KalkulatorPick, handoff: KalkulatorHandoff): number {
  if ('unitPrice' in line) return line.unitPrice;
  if (handoff.area > 0) return line.subtotal / handoff.area;
  return line.subtotal;
}

function addHeader(doc: PDFKit.PDFDocument, title: string) {
  const logo = getLogoBuffer();
  const logoSize = 48;
  const wordmarkX = logo ? PAGE.marginX + logoSize + 16 : PAGE.marginX;

  doc.save();
  doc.rect(0, 0, PAGE.width, 92).fill(COLORS.ink);
  if (logo) {
    doc
      .roundedRect(PAGE.marginX, 20, logoSize, logoSize, 6)
      .fillOpacity(0.08)
      .fill(COLORS.bone)
      .fillOpacity(1)
      .strokeColor(COLORS.bone)
      .strokeOpacity(0.18)
      .lineWidth(0.6)
      .stroke()
      .strokeOpacity(1);
    doc.image(logo, PAGE.marginX + 5, 25, { fit: [38, 38], align: 'center', valign: 'center' });
  }
  doc
    .fillColor(COLORS.bone)
    .font('Helvetica-Bold')
    .fontSize(22)
    .text('PRIMA VISTA', wordmarkX, 30, { continued: true })
    .fillColor(COLORS.copper)
    .text(' BAUPROJEKTE');
  doc
    .fillColor(COLORS.faint)
    .font('Helvetica')
    .fontSize(8)
    .text('SANIERUNG & BAU · VORAB-SCHÄTZUNG', wordmarkX, 58, { characterSpacing: 1.5 });
  doc.restore();

  doc
    .fillColor(COLORS.ink)
    .font('Helvetica-Bold')
    .fontSize(22)
    .text(title, PAGE.marginX, 126, { align: 'center', width: PAGE.width - (PAGE.marginX * 2) });
  doc.y = 176;
}

function addFooter(doc: PDFKit.PDFDocument, pageNumber: number, totalPages: number) {
  const y = PAGE.height - 62;
  doc.save();
  doc.moveTo(PAGE.marginX, y - 18).lineTo(PAGE.width - PAGE.marginX, y - 18).strokeColor(COLORS.rule).lineWidth(0.8).stroke();
  doc.fillColor(COLORS.muted).font('Helvetica').fontSize(7);
  doc.text('Prima Vista Bauprojekte GmbH', PAGE.marginX, y, { width: 150, lineBreak: false });
  doc.text('Gref-Völsing-Straße 13 · 60314 Frankfurt', PAGE.marginX, y + 12, { width: 190, lineBreak: false });
  doc.text('+49 1578 98 18 308', 245, y, { width: 120, lineBreak: false });
  doc.text('office@primavista-bauprojekte.com', 245, y + 12, { width: 170, lineBreak: false });
  doc.text(`Seite ${pageNumber} / ${totalPages}`, PAGE.width - PAGE.marginX - 90, y, { width: 90, align: 'right', lineBreak: false });
  doc.restore();
}

function ensureSpace(doc: PDFKit.PDFDocument, height: number) {
  if (doc.y + height <= PAGE.height - PAGE.bottom) return;
  doc.addPage();
  addHeader(doc, 'Kostenvoranschlag');
}

function summaryBox(doc: PDFKit.PDFDocument, payload: CalculatorPdfPayload) {
  const handoff = payload.kalkulator;
  const totalNet = handoff.totalMid;
  const totalVat = totalNet * 0.19;
  const totalGross = totalNet + totalVat;
  const x = PAGE.marginX;
  const y = doc.y;
  const width = PAGE.width - (PAGE.marginX * 2);

  doc.save();
  doc.roundedRect(x, y, width, 130, 6).fill(COLORS.paper).stroke(COLORS.rule);
  doc.fillColor(COLORS.copper).font('Helvetica-Bold').fontSize(8).text('AUS DEM KALKULATOR', x + 18, y + 16, { characterSpacing: 1.8 });
  doc.fillColor(COLORS.ink).font('Helvetica-Bold').fontSize(15).text(cleanLabel(handoff.kindLabel), x + 18, y + 38, { width: 250 });
  doc.fillColor(COLORS.muted).font('Helvetica').fontSize(9).text(`${handoff.scopeLabel || 'Umfang'}: ${formatScope(handoff)}`, x + 18, y + 60, { width: 250 });
  doc.text(`Vorab-Schätzung: ${formatEuro(handoff.totalMin, false)} - ${formatEuro(handoff.totalMax, false)}`, x + 18, y + 76, { width: 250 });
  if (handoff.perM2 > 0) doc.text(`Richtwert: ${formatEuro(handoff.perM2, false)} / m²`, x + 18, y + 92, { width: 250 });

  const rightX = x + width - 190;
  doc.fillColor(COLORS.muted).font('Helvetica-Bold').fontSize(8).text('GESAMTSUMME', rightX, y + 18, { characterSpacing: 1.4 });
  doc.fillColor(COLORS.ink).font('Helvetica-Bold').fontSize(18).text(formatEuro(totalGross), rightX, y + 38, { width: 172, align: 'right' });
  doc.fillColor(COLORS.muted).font('Helvetica').fontSize(8);
  doc.text(`Netto ${formatEuro(totalNet)}`, rightX, y + 70, { width: 172, align: 'right' });
  doc.text(`zzgl. 19 % MwSt. ${formatEuro(totalVat)}`, rightX, y + 86, { width: 172, align: 'right' });
  doc.restore();
  doc.y = y + 154;
}

function tableHeader(doc: PDFKit.PDFDocument) {
  const x = PAGE.marginX;
  ensureSpace(doc, 34);
  const y = doc.y;
  doc.fillColor(COLORS.ink).font('Helvetica-Bold').fontSize(9);
  doc.text('Produkt / Leistung', x, y, { width: 255 });
  doc.text('Anzahl', x + 280, y, { width: 60, align: 'right' });
  doc.text('Stückpreis netto', x + 350, y, { width: 78, align: 'right' });
  doc.text('Gesamt netto', x + 440, y, { width: 68, align: 'right' });
  doc.moveTo(x, y + 18).lineTo(PAGE.width - PAGE.marginX, y + 18).strokeColor(COLORS.rule).lineWidth(0.8).stroke();
  doc.y = y + 32;
}

function addGroupRow(doc: PDFKit.PDFDocument, label: string, subtotal: number) {
  ensureSpace(doc, 32);
  const y = doc.y;
  doc.rect(PAGE.marginX, y, PAGE.width - (PAGE.marginX * 2), 24).fill(COLORS.paper);
  doc.fillColor(COLORS.ink).font('Helvetica-Bold').fontSize(10).text(cleanLabel(label), PAGE.marginX + 8, y + 7, { width: 330 });
  doc.text(formatEuro(subtotal), PAGE.width - PAGE.marginX - 100, y + 7, { width: 92, align: 'right' });
  doc.y = y + 34;
}

function addItemRow(doc: PDFKit.PDFDocument, handoff: KalkulatorHandoff, line: KalkulatorRow | KalkulatorPick, nested: boolean) {
  const x = PAGE.marginX;
  const label = cleanLabel(line.label);
  const descHeight = doc.font('Helvetica').fontSize(8).heightOfString(label, { width: 255 });
  const rowHeight = Math.max(32, descHeight + 18);
  ensureSpace(doc, rowHeight + 6);

  const y = doc.y;
  doc.moveTo(x, y - 6).lineTo(PAGE.width - PAGE.marginX, y - 6).strokeColor(COLORS.rule).lineWidth(0.5).stroke();
  doc
    .fillColor(COLORS.ink)
    .font(nested ? 'Helvetica' : 'Helvetica-Bold')
    .fontSize(8.5)
    .text(label, x + (nested ? 14 : 0), y, { width: nested ? 241 : 255, lineGap: 2 });
  doc
    .fillColor(COLORS.muted)
    .font('Helvetica')
    .fontSize(8)
    .text(lineQuantity(line, handoff), x + 280, y, { width: 60, align: 'right' });
  doc.text(formatEuro(lineUnitPrice(line, handoff)), x + 350, y, { width: 78, align: 'right' });
  doc.fillColor(COLORS.ink).text(formatEuro(line.subtotal), x + 440, y, { width: 68, align: 'right' });
  doc.y = y + rowHeight;
}

function addTotals(doc: PDFKit.PDFDocument, handoff: KalkulatorHandoff) {
  const totalNet = handoff.totalMid;
  const totalVat = totalNet * 0.19;
  const totalGross = totalNet + totalVat;
  ensureSpace(doc, 110);
  const x = PAGE.width - PAGE.marginX - 220;
  const y = doc.y + 4;
  const rows = [
    ['Gesamtnettosumme', formatEuro(totalNet)],
    ['zzgl. 19 % MwSt.', formatEuro(totalVat)],
    ['Gesamtsumme', formatEuro(totalGross)],
  ];
  doc.fontSize(9);
  rows.forEach(([label, value], index) => {
    const rowY = y + (index * 24);
    doc.fillColor(index === 2 ? COLORS.ink : COLORS.muted).font(index === 2 ? 'Helvetica-Bold' : 'Helvetica');
    doc.text(label, x, rowY, { width: 110 });
    doc.text(value, x + 112, rowY, { width: 108, align: 'right' });
    doc.moveTo(x, rowY + 16).lineTo(x + 220, rowY + 16).strokeColor(index === 1 ? COLORS.ink : COLORS.rule).lineWidth(index === 1 ? 1 : 0.5).stroke();
  });
  doc.y = y + 72;
}

export async function buildCalculatorPdf(payload: CalculatorPdfPayload): Promise<Buffer> {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: PAGE.top, bottom: 36, left: PAGE.marginX, right: PAGE.marginX },
    bufferPages: true,
    info: {
      Title: `Prima Vista Kostenvoranschlag - ${cleanLabel(payload.kalkulator.kindLabel)}`,
      Author: 'Prima Vista Bauprojekte',
      Subject: 'Vorab-Schätzung aus dem Kalkulator',
    },
  });
  const chunks: Buffer[] = [];
  doc.on('data', (chunk: Buffer) => chunks.push(chunk));
  const done = new Promise<Buffer>((resolve) => {
    doc.on('end', () => resolve(Buffer.concat(chunks)));
  });

  addHeader(doc, 'Kostenvoranschlag');
  summaryBox(doc, payload);

  doc
    .fillColor(COLORS.ink)
    .font('Helvetica-Bold')
    .fontSize(13)
    .text('Aufstellung der ausgewählten Positionen', PAGE.marginX, doc.y);
  doc.moveDown(0.8);
  tableHeader(doc);

  for (const group of groupCalculatorPicks(payload.kalkulator.picks)) {
    addGroupRow(doc, group.label, group.subtotal);
    for (const item of group.items) {
      if (item.rows && item.rows.length > 0) {
        for (const row of item.rows) addItemRow(doc, payload.kalkulator, row, true);
      } else {
        addItemRow(doc, payload.kalkulator, item, false);
      }
    }
  }

  if (collectLineItems(payload.kalkulator).length === 0) {
    ensureSpace(doc, 30);
    doc.fillColor(COLORS.muted).font('Helvetica').fontSize(10).text('Keine aktiven Positionen ausgewählt.', PAGE.marginX, doc.y);
    doc.y += 24;
  }

  addTotals(doc, payload.kalkulator);
  const disclaimer = 'Diese Vorab-Schätzung basiert auf den im Online-Kalkulator ausgewählten Positionen. Verbindliche Preise entstehen nach Aufmaß, Prüfung der baulichen Situation und Materialbemusterung.';
  doc.fillColor(COLORS.muted).font('Helvetica').fontSize(8).lineGap(3);
  const disclaimerHeight = doc.heightOfString(disclaimer, { width: PAGE.width - (PAGE.marginX * 2) });
  ensureSpace(doc, disclaimerHeight + 14);
  doc.text(disclaimer, PAGE.marginX, doc.y, { width: PAGE.width - (PAGE.marginX * 2) });

  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i += 1) {
    doc.switchToPage(i);
    addFooter(doc, i + 1, range.count);
  }

  doc.end();
  return await done;
}
