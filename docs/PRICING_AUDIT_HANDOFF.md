# Handoff — Pricing Audit & Market Comparison

**Date:** 2026-06-29 · **Author:** Antigravity (Pair Programming with User)

---

## TL;DR
A comprehensive pricing audit was conducted on the Prima Vista Bauprojekte calculator database. We compared internal material and labor prices with 2026 online retail rates and standard trade prices in Germany and Switzerland. The audit revealed that while standard material and labor prices are generally realistic, there are **critical underpricing issues** (such as painting a whole floor for 355.50 €), a **lack of minimum project setup fees** making small quantities unprofitable, and a **lack of regional Swiss pricing adjustments** for projects in Emmenbrücke (CH).

---

## Current Status
- 📑 Analysis complete and compiled.
- 💾 Pricing comparison data extracted to `extracted-prices.json`.
- 📁 Handoff and detailed reports added to the `docs/` folder.

---

## 1. Key Pricing Comparisons (Germany 2026)

Our material and labor items were cross-referenced with online retail stores and German trade averages:

* **Egger Laminat Classic 31 (`680700`):** **14.35 € / qm** (internal) vs. **~17.08 € / qm** (online retail). *Result: Excellent wholesale/builder pricing.*
* **Fermacell Estrich-Kleber 1 kg (`204-00071`):** **25.19 €** (internal) vs. **21.29 € – 28.00 €** (online retail). *Result: Exactly average.*
* **VIGOUR derby style Waschtischbatterie (`DES`):** **152.96 €** (internal) vs. **120.00 € – 170.00 €** (online retail). *Result: Standard retail rate.*
* **Vaillant electronicVED E 21/8 B pro (`VEDE218B`):** **373.23 €** (internal) vs. **235.00 € – 290.00 €** (online retail). *Result: Standard builder markup (approx. +35%) to cover procurement, logistics, and warranty risk.*
* **Wohnraum Malerarbeiten Anstrich (`MALE-201-MAT`):** **9.85 € / qm** (internal) vs. **8.00 € – 15.00 € / qm** (German average for 2x coats). *Result: On the lower end of the market.*
* **Luft-Wasser-Wärmepumpe Montage (`HEIZ-400-BASIS`):** **4,500.00 €** (internal) vs. **2,500.00 € – 7,000.00 €** (German trade average). *Result: Standard market average.*

---

## 2. Identified Pricing Risks & Gaps

We discovered three main areas where our prices are "too small" or lead to unprofitable quotes:

### A. Typos & Extremely Low Prices
* **MALER (pro Etage) | 🛠 Montage-Leistungspaket (`MALE-100-BASIS`):** Priced at **355.50 €**. Painting an entire floor (50–120 qm) takes 1–2 days of professional labor, prep, and materials, which costs **1,500 € – 3,500 €**. This flat rate is currently a major loss maker.
* **TÜRLOCH HERSTELLUNG (`TROC-201-1-ZU`):** Priced at **64.22 € / Stück**. Creating a door opening in a drywall with proper framing/lintels takes hours of skilled labor. Typical market rate is **150 € – 250 €**.
* **HEIZKÖRPER Montage (`HEIZ-101-MON`):** Priced at **149.00 € / Stück**. Swapping a radiator and adapting pipe connections should be raised to **195.00 €** to cover standard labor overhead.

### B. The "Small Project" Trap
The calculator calculates project costs linearly (`basePrice * quantity`). If a user requests a tiny quantity (e.g., painting a 10 qm wall or installing 1 Zimmertür):
* **10 qm Painting:** 98.50 €
* **1 Zimmertür Installation:** 149.90 €
These amounts do not cover the travel time, tool setup, masking, and cleaning required for a professional trade team. 

### C. The Swiss Discrepancy (Emmenbrücke vs. Frankfurt)
Prima Vista Bauprojekte operates in Germany and Switzerland.
* Swiss trade labor wages and transport costs are 2–3 times higher than in Germany.
* A Swiss painter's hourly rate is **90 CHF – 140 CHF**, compared to **45 € – 75 €** in Germany.
* Applying German pricing directly in Switzerland results in quotes that are **40% to 60% too cheap**.

---

## 3. Recommended Actions

We recommend the following database and logic updates to protect margins:

1. **Database Adjustments:** surgically update base prices of underpriced SKUs in `/src/data/calculator/packages/` files (e.g., `MALE-100-BASIS` → 1,250.00 €, `TROC-201-1-ZU` → 180.00 €).
2. **Implement Base Surcharges (Grundpauschale):** Add a one-time base fee for trades (e.g., a 250 € setup fee for Maler/Böden) if the configured area is below a minimum threshold (e.g., 50 qm).
3. **Regional Swiss Multiplier:** Introduce a location selector in the calculator interface (DE vs. CH). Apply a **1.8x** multiplier to all base prices for CH projects to offset Swiss labor and overhead.

---

## Verification & Files Created
* 📑 Detailed report: [price_comparison_report.md](file:///Users/louisclarencepetersgmail.com/.gemini/antigravity/brain/f73a1686-9648-4c9c-a753-f594ccb70afe/price_comparison_report.md)
* 📑 Underpricing analysis: [underpricing_analysis.md](file:///Users/louisclarencepetersgmail.com/.gemini/antigravity/brain/f73a1686-9648-4c9c-a753-f594ccb70afe/underpricing_analysis.md)
* 💾 JSON Raw Output: `/Users/louisclarencepetersgmail.com/.gemini/antigravity/brain/f73a1686-9648-4c9c-a753-f594ccb70afe/scratch/extracted-prices.json`
