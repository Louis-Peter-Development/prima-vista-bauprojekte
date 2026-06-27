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

type ProductDetail = {
  id: string;
  label: string;
  sku?: string;
  description?: string;
  image?: string;
  category: string;
  subcategory?: string;
  type?: string;
  quantity?: number;
  unit?: string;
  unitPrice?: number;
  subtotal: number;
};

const PAGE = {
  marginX: 46,
  top: 48,
  bottom: 112,
  width: 595.28,
  height: 841.89,
};

const COLORS = {
  ink: '#171412',
  muted: '#6f6862',
  faint: '#aaa19a',
  copper: '#c28d59',
  red: '#b61d1a',
  link: '#1537e8',
  bone: '#f6f0ea',
  rule: '#ded5cd',
  paper: '#fbf8f5',
};

const DEFAULT_SOURCE_URL = 'https://primavista-bauprojekte.com';

const ADDRESS_FIELDS = [
  'Firma',
  'Vor- und Nachname',
  'Straße',
  'PLZ und Ort',
  'Bundesland',
  'Land',
  'USt-ID / Steuernummer',
];

const GENERIC_PRODUCT_DESCRIPTION = 'Kalkulationsposition fuer Montage, Material oder Zusatzleistung.';

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
    .replace(/\*+/g, '')
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

function collectProductDetails(handoff: KalkulatorHandoff): ProductDetail[] {
  const details: ProductDetail[] = [];
  const seen = new Set<string>();

  for (const group of groupCalculatorPicks(handoff.picks)) {
    for (const item of group.items) {
      const category = cleanLabel(item.category || item.tradeLabel || group.label);
      if (item.rows && item.rows.length > 0) {
        item.rows.forEach((row, index) => {
          const label = cleanLabel(row.label);
          const id = `${row.sku || item.key || group.key}:${label}:${index}`;
          if (seen.has(id)) return;
          seen.add(id);
          details.push({
            id,
            label,
            sku: row.sku,
            description: row.description,
            image: row.image,
            category: cleanLabel(row.category || category),
            subcategory: row.subcategory ? cleanLabel(row.subcategory) : undefined,
            type: row.type,
            quantity: row.quantity,
            unit: row.unit,
            unitPrice: row.unitPrice,
            subtotal: row.subtotal,
          });
        });
      } else {
        const label = cleanLabel(item.label);
        const id = `${item.sku || item.key || group.key}:${label}`;
        if (seen.has(id)) continue;
        seen.add(id);
        details.push({
          id,
          label,
          sku: item.sku,
          description: item.description,
          image: item.image,
          category,
          subcategory: item.subcategory ? cleanLabel(item.subcategory) : undefined,
          type: item.type,
          subtotal: item.subtotal,
        });
      }
    }
  }

  return details;
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

function compactDescription(detail: ProductDetail): string {
  const raw = cleanLabel(detail.description || '');
  const usable = raw && raw !== GENERIC_PRODUCT_DESCRIPTION && raw.length > 18;
  const text = usable
    ? raw
    : `${detail.label} ist Teil der ausgewählten Kalkulation im Bereich ${detail.category}. Menge, Ausführung und Materialauswahl werden vor Ort geprüft und im finalen Angebot bestätigt.`;
  return text.length > 520 ? `${text.slice(0, 517).trim()}...` : text;
}

function readableSkuPrefix(detail: ProductDetail): string {
  const fromSku = detail.sku?.split(/[-_\s]/)[0];
  const source = fromSku || detail.type || 'PV';
  return cleanLabel(source).slice(0, 5).toLocaleUpperCase('de-DE') || 'PV';
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
  const y = PAGE.height - 100;
  const columns = [
    {
      x: PAGE.marginX,
      width: 128,
      title: 'Geschäftssitz',
      lines: ['Prima Vista Bauprojekte', 'Gref-Völsing-Straße 13', '60314 Frankfurt am Main'],
    },
    {
      x: PAGE.marginX + 154,
      width: 136,
      title: 'Kontakt',
      lines: ['Telefon: +49 1578 98 18 308', 'E-Mail: office@primavista-bauprojekte.com'],
    },
    {
      x: PAGE.marginX + 316,
      width: 116,
      title: 'Rechtliches',
      lines: ['Steuernr.: 01483039527', 'USt-ID: DE 358812805', 'Amtsgericht Frankfurt am Main'],
    },
    {
      x: PAGE.marginX + 444,
      width: 104,
      title: 'Schweiz',
      lines: ['Emmenbrücke / Luzern', '+41 78 265 93 32', 'info@primavista-bauprojekte.ch'],
    },
  ];

  doc.save();
  doc.moveTo(PAGE.marginX, y - 18).lineTo(PAGE.width - PAGE.marginX, y - 18).strokeColor(COLORS.rule).lineWidth(0.8).stroke();
  doc.fillColor(COLORS.muted).font('Helvetica').fontSize(6.5);
  doc.text(`Seite ${pageNumber} / ${totalPages}`, PAGE.width - PAGE.marginX - 72, y - 35, { width: 72, align: 'right', lineBreak: false });

  for (const column of columns) {
    doc.fillColor(COLORS.ink).font('Helvetica-Bold').fontSize(6.8).text(column.title, column.x, y, {
      width: column.width,
      lineBreak: false,
    });
    column.lines.forEach((line, index) => {
      doc
        .fillColor(index === 0 && column.title === 'Geschäftssitz' ? COLORS.copper : COLORS.ink)
        .font(index === 0 && column.title === 'Geschäftssitz' ? 'Helvetica-Bold' : 'Helvetica')
        .fontSize(6.4)
        .text(line, column.x, y + 13 + (index * 10), { width: column.width, lineBreak: false });
    });
  }
  doc.restore();
}

function addStaticBrandBand(doc: PDFKit.PDFDocument) {
  const logo = getLogoBuffer();
  const logoSize = 54;
  const x = PAGE.marginX;
  const y = 34;
  const wordmarkX = logo ? x + logoSize + 16 : x;

  doc.save();
  doc.rect(0, 0, PAGE.width, 116).fill(COLORS.ink);
  if (logo) {
    doc.roundedRect(x, y - 4, logoSize, logoSize, 7).fillOpacity(0.1).fill(COLORS.bone).fillOpacity(1);
    doc.image(logo, x + 6, y + 2, { fit: [42, 42], align: 'center', valign: 'center' });
  }
  doc
    .fillColor(COLORS.bone)
    .font('Helvetica-Bold')
    .fontSize(26)
    .text('PRIMA VISTA', wordmarkX, y, { continued: true })
    .fillColor(COLORS.copper)
    .text(' BAUPROJEKTE');
  doc
    .fillColor(COLORS.faint)
    .font('Helvetica-Bold')
    .fontSize(8)
    .text('SANIERUNG & BAU · AUFTRAGSUNTERLAGEN', wordmarkX, y + 33, { characterSpacing: 1.8 });
  doc.restore();
}

function fieldBox(doc: PDFKit.PDFDocument, label: string, x: number, y: number, width: number) {
  const height = 28;
  doc.save();
  doc.roundedRect(x, y, width, height, 3).strokeColor('#9b9690').lineWidth(0.9).stroke();
  doc.fillColor('#aaa5a0').font('Helvetica').fontSize(8.5).text(label, x + 7, y + 9, {
    width: width - 14,
    lineBreak: false,
  });
  doc.restore();
}

function addAddressColumn(doc: PDFKit.PDFDocument, title: string, x: number, y: number, width: number) {
  doc.fillColor(COLORS.ink).font('Helvetica-Bold').fontSize(16).text(title, x, y, {
    width,
    align: 'center',
    lineBreak: false,
  });

  let fieldY = y + 42;
  ADDRESS_FIELDS.forEach((field) => {
    fieldBox(doc, field, x, fieldY, width);
    fieldY += 40;
  });
}

function addProjectDetailsPage(doc: PDFKit.PDFDocument, payload: CalculatorPdfPayload) {
  const x = PAGE.marginX;
  const contentWidth = PAGE.width - (PAGE.marginX * 2);
  const sourceUrl = payload.sourceUrl || DEFAULT_SOURCE_URL;

  addStaticBrandBand(doc);

  doc
    .fillColor(COLORS.ink)
    .font('Helvetica-Bold')
    .fontSize(20)
    .text('Projekt- und Rechnungsdaten', x, 154, { width: contentWidth, align: 'center' });
  doc
    .fillColor(COLORS.muted)
    .font('Helvetica')
    .fontSize(9)
    .text('Bitte bei Auftragserteilung ausfüllen. Die Kalkulator-Auswahl bleibt im Anhang nachvollziehbar.', x, 184, {
      width: contentWidth,
      align: 'center',
    });

  const linkY = 225;
  doc.fillColor(COLORS.ink).font('Helvetica').fontSize(9).text('Link zur Kalkulator-Auswahl:', x, linkY, {
    width: 126,
    lineBreak: false,
  });
  doc.fillColor(COLORS.link).font('Helvetica-Bold').fontSize(9).text(sourceUrl, x + 130, linkY, {
    width: contentWidth - 130,
    link: sourceUrl,
    underline: true,
  });

  const gap = 24;
  const columnWidth = (contentWidth - gap) / 2;
  addAddressColumn(doc, 'Rechnungsanschrift', x, 285, columnWidth);
  addAddressColumn(doc, 'Projekt-/Lieferanschrift', x + columnWidth + gap, 285, columnWidth);

  doc
    .fillColor(COLORS.muted)
    .font('Helvetica')
    .fontSize(8)
    .text('Hinweis: Wenn Rechnungs- und Projektanschrift identisch sind, genügt ein Eintrag links. Abweichende Liefer- oder Baustellenadressen bitte rechts ergänzen.', x, 610, {
      width: contentWidth,
      lineGap: 2,
    });
}

function confirmationCard(doc: PDFKit.PDFDocument, number: string, title: string, body: string, y: number): number {
  const x = PAGE.marginX;
  const width = PAGE.width - (PAGE.marginX * 2);
  const height = 76;
  const numberSize = 28;

  doc.save();
  doc.roundedRect(x, y, width, height, 5).fill(COLORS.paper).strokeColor(COLORS.rule).lineWidth(0.8).stroke();
  doc.roundedRect(x + 14, y + 16, numberSize, numberSize, 4).fill(COLORS.ink);
  doc.fillColor(COLORS.copper).font('Helvetica-Bold').fontSize(10).text(number, x + 14, y + 24, {
    width: numberSize,
    align: 'center',
    lineBreak: false,
  });
  doc.rect(x + width - 72, y + 18, 11, 11).strokeColor(COLORS.muted).lineWidth(0.8).stroke();
  doc.fillColor(COLORS.muted).font('Helvetica').fontSize(7.5).text('bestätigt', x + width - 56, y + 18, {
    width: 46,
    lineBreak: false,
  });
  doc
    .fillColor(COLORS.ink)
    .font('Helvetica-Bold')
    .fontSize(9.8)
    .text(title, x + 56, y + 14, { width: width - 138, lineBreak: false });
  doc
    .fillColor(COLORS.muted)
    .font('Helvetica')
    .fontSize(8.4)
    .text(body, x + 56, y + 34, { width: width - 84, lineGap: 1.8 });
  doc.restore();

  return y + height + 12;
}

function finalSignatureBlock(doc: PDFKit.PDFDocument, y: number) {
  const x = PAGE.marginX;
  const width = PAGE.width - (PAGE.marginX * 2);
  const leftWidth = 180;
  const rightWidth = 250;

  doc
    .fillColor(COLORS.ink)
    .font('Helvetica-Bold')
    .fontSize(10)
    .text('Abschluss der Auftragserteilung', x, y, { width });
  doc
    .fillColor(COLORS.muted)
    .font('Helvetica')
    .fontSize(8.4)
    .text('Mit Datum und Unterschrift werden die oben genannten Bestätigungen zusammen bestätigt.', x, y + 18, {
      width,
      lineGap: 1.8,
    });

  const lineY = y + 62;
  doc.save();
  doc.strokeColor('#807973').lineWidth(0.8);
  doc.moveTo(x, lineY).lineTo(x + leftWidth, lineY).stroke();
  doc.moveTo(x + width - rightWidth, lineY).lineTo(x + width, lineY).stroke();
  doc.fillColor(COLORS.ink).font('Helvetica').fontSize(8.5);
  doc.text('Datum, Ort', x, lineY + 8, { width: leftWidth, align: 'center' });
  doc.text('Unterschrift Auftraggeber/in', x + width - rightWidth, lineY + 8, { width: rightWidth, align: 'center' });
  doc.restore();
}

function addSignaturePage(doc: PDFKit.PDFDocument) {
  addStaticBrandBand(doc);

  const contentWidth = PAGE.width - (PAGE.marginX * 2);

  doc
    .fillColor(COLORS.ink)
    .font('Helvetica-Bold')
    .fontSize(20)
    .text('Auftragserteilung und Bestätigungen', PAGE.marginX, 150, {
      width: PAGE.width - (PAGE.marginX * 2),
      align: 'center',
    });

  doc
    .fillColor(COLORS.muted)
    .font('Helvetica')
    .fontSize(8.5)
    .text('Diese Seite ist für die spätere Beauftragung vorgesehen. Die PDF-Aufstellung ist eine Vorab-Schätzung. Verbindlich wird der Auftrag erst nach Aufmaß, finalem Angebot und Unterschrift.', PAGE.marginX, 182, {
      width: contentWidth,
      align: 'center',
      lineGap: 2,
    });

  let y = 222;
  y = confirmationCard(
    doc,
    '01',
    'Auftrag nach finalem Angebot',
    'Ich beauftrage Prima Vista Bauprojekte auf Basis des finalisierten Angebots und des gemeinsam abgestimmten Ausführungszeitpunkts.',
    y,
  );
  y = confirmationCard(
    doc,
    '02',
    'Vertragsbedingungen gelesen',
    'Ich bestätige, die Allgemeinen Geschäftsbedingungen und Vertragsbedingungen erhalten, gelesen und akzeptiert zu haben.',
    y,
  );
  y = confirmationCard(
    doc,
    '03',
    'Leistungsumfang und Materialbasis',
    'Die aufgeführten Leistungen, Mengen und Materialien bilden die Grundlage für Prüfung, Planung und Angebot. Änderungen werden gesondert ausgewiesen.',
    y,
  );
  y = confirmationCard(
    doc,
    '04',
    'Widerruf und Rücktritt',
    'Ich bestätige, die Widerrufsbelehrung bzw. Rücktrittsinformation inklusive Formular erhalten und gelesen zu haben, soweit diese Anwendung findet.',
    y,
  );
  finalSignatureBlock(doc, y + 8);
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

// All PDF thumbnails live under public/. `image`/`sku` arrive from the public
// calculator-pdf payload, so every constructed path must be confined to this
// directory — otherwise a value like '../../../etc/secret.png' would let an
// attacker read an arbitrary image-extension file into the emailed PDF.
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

function withinPublic(candidate: string): string | null {
  const resolved = path.resolve(candidate);
  return resolved === PUBLIC_DIR || resolved.startsWith(PUBLIC_DIR + path.sep) ? resolved : null;
}

function candidatePdfImagePaths(image?: string, sku?: string): string[] {
  const candidates: string[] = [];
  if (image && !image.includes('..') && !image.includes('\\') && !image.includes('\0')) {
    const normalized = image.startsWith('/') ? image.slice(1) : image;
    candidates.push(path.join(PUBLIC_DIR, normalized));
  }

  if (sku) {
    ['.png', '.jpg', '.jpeg'].forEach((ext) => {
      candidates.push(path.join(PUBLIC_DIR, 'assets', 'img', 'products', `${sku}${ext}`));
    });
    if (/-MON$/i.test(sku)) {
      candidates.push(path.join(PUBLIC_DIR, 'assets', 'img', 'products', 'MON-100-stk.jpg'));
    }
  }

  // Drop any candidate that escapes public/ (defends against traversal in a
  // crafted `sku` as well as `image`).
  return candidates
    .map(withinPublic)
    .filter((candidate): candidate is string => candidate !== null);
}

function resolvePdfImagePath(detail: ProductDetail): string | null {
  const candidates = candidatePdfImagePaths(detail.image, detail.sku);
  const imagePath = candidates.find((candidate) => existsSync(candidate));
  if (!imagePath) return null;
  const ext = path.extname(imagePath).toLocaleLowerCase();
  return ext === '.png' || ext === '.jpg' || ext === '.jpeg' ? imagePath : null;
}

function ensureProductDetailSpace(doc: PDFKit.PDFDocument, height: number) {
  if (doc.y + height <= PAGE.height - PAGE.bottom) return;
  doc.addPage();
  addHeader(doc, 'Produktdetails');
}

function addProductThumb(doc: PDFKit.PDFDocument, detail: ProductDetail, x: number, y: number) {
  const size = 78;
  const imagePath = resolvePdfImagePath(detail);

  doc.save();
  doc.roundedRect(x, y, size, size, 2).fill(COLORS.paper).strokeColor(COLORS.rule).lineWidth(0.8).stroke();
  let drewImage = false;
  if (imagePath) {
    try {
      doc.image(imagePath, x + 5, y + 5, {
        fit: [size - 10, size - 10],
        align: 'center',
        valign: 'center',
      });
      drewImage = true;
    } catch (err) {
      // A corrupt/unsupported image must not abort the whole PDF (which would
      // 502 the entire send) — fall back to the SKU-prefix placeholder.
      console.warn('[calculatorPdf] thumbnail render failed, using placeholder', err);
    }
  }
  if (!drewImage) {
    doc
      .fillColor(COLORS.copper)
      .font('Helvetica-Bold')
      .fontSize(18)
      .text(readableSkuPrefix(detail), x, y + 28, { width: size, align: 'center', lineBreak: false });
  }
  doc.restore();
}

function productMetaText(detail: ProductDetail): string {
  const quantity = detail.quantity != null && detail.unit ? formatQuantity(detail.quantity, detail.unit) : '';
  return [
    detail.sku ? `Prod.-Nr.: ${detail.sku}` : '',
    detail.type ? `Art: ${detail.type}` : '',
    quantity ? `Menge: ${quantity}` : '',
    detail.unitPrice != null ? `Stückpreis netto: ${formatEuro(detail.unitPrice)}` : '',
    `Gesamt netto: ${formatEuro(detail.subtotal)}`,
  ].filter(Boolean).join('  ·  ');
}

function addProductMeta(doc: PDFKit.PDFDocument, detail: ProductDetail, x: number, y: number, width: number) {
  doc
    .fillColor(COLORS.muted)
    .font('Helvetica')
    .fontSize(8.2)
    .text(productMetaText(detail), x, y, { width, lineGap: 1.5 });
}

function addProductDetailCard(doc: PDFKit.PDFDocument, detail: ProductDetail) {
  const x = PAGE.marginX;
  const thumbSize = 78;
  const gap = 18;
  const copyX = x + thumbSize + gap;
  const copyWidth = PAGE.width - PAGE.marginX - copyX;
  const title = cleanLabel(detail.label);
  const description = compactDescription(detail);
  const titleHeight = doc.font('Helvetica-Bold').fontSize(10.8).heightOfString(title, { width: copyWidth, lineGap: 1.5 });
  const metaHeight = doc.font('Helvetica').fontSize(8.2).heightOfString(productMetaText(detail), { width: copyWidth, lineGap: 1.5 });
  const descHeight = doc.font('Helvetica').fontSize(8.8).heightOfString(description, { width: copyWidth, lineGap: 2.2 });
  const rowHeight = Math.max(thumbSize, titleHeight + metaHeight + descHeight + 19);

  ensureProductDetailSpace(doc, rowHeight + 18);
  const cardY = doc.y;
  addProductThumb(doc, detail, x, cardY);

  doc
    .fillColor(COLORS.ink)
    .font('Helvetica-Bold')
    .fontSize(10.8)
    .text(title, copyX, cardY, { width: copyWidth, lineGap: 1.5 });
  addProductMeta(doc, detail, copyX, doc.y + 4, copyWidth);
  doc
    .fillColor(COLORS.ink)
    .font('Helvetica')
    .fontSize(8.8)
    .text(description, copyX, doc.y + 9, { width: copyWidth, lineGap: 2.2 });

  doc.y = cardY + rowHeight + 18;
}

function addProductDetails(doc: PDFKit.PDFDocument, handoff: KalkulatorHandoff) {
  const details = collectProductDetails(handoff);
  if (details.length === 0) return;

  doc.addPage();
  addHeader(doc, 'Produktdetails');
  doc
    .fillColor(COLORS.muted)
    .font('Helvetica')
    .fontSize(9)
    .text('Details zu den ausgewählten Positionen aus dem Kalkulator. Mengen, Ausführung und Materialauswahl werden vor Ort geprüft und im finalen Angebot bestätigt.', PAGE.marginX, doc.y, {
      width: PAGE.width - (PAGE.marginX * 2),
      align: 'center',
      lineGap: 2,
    });
  doc.y += 28;

  let currentCategory = '';
  for (const detail of details) {
    if (detail.category !== currentCategory) {
      ensureProductDetailSpace(doc, 150);
      currentCategory = detail.category;
      doc
        .fillColor(COLORS.ink)
        .font('Helvetica-BoldOblique')
        .fontSize(11)
        .text(currentCategory, PAGE.marginX, doc.y, { width: PAGE.width - (PAGE.marginX * 2) });
      if (detail.subcategory) {
        doc
          .fillColor(COLORS.copper)
          .font('Helvetica-Bold')
          .fontSize(7.5)
          .text(detail.subcategory.toLocaleUpperCase('de-DE'), PAGE.marginX, doc.y + 4, {
            width: PAGE.width - (PAGE.marginX * 2),
            characterSpacing: 1.3,
          });
      }
      doc.y += 20;
    }
    addProductDetailCard(doc, detail);
  }
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

  addProjectDetailsPage(doc, payload);

  doc.addPage();
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

  addProductDetails(doc, payload.kalkulator);

  doc.addPage();
  addSignaturePage(doc);

  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i += 1) {
    doc.switchToPage(i);
    addFooter(doc, i + 1, range.count);
  }

  doc.end();
  return await done;
}
