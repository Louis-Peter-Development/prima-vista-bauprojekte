import type { RenovationPackage, RenovationProduct } from '../types';

function createProduct(
  id: string,
  category: string,
  subcategory: string,
  title: string,
  sku: string,
  basePrice: number,
  unit: string,
  description: string,
  enabled = true,
  optional = false,
  baseQuantity = 1,
  type: 'service' | 'material' | 'extra' | 'optional' = 'service'
): RenovationProduct {
  return {
    id,
    category,
    subcategory,
    title,
    sku,
    type,
    unit,
    basePrice,
    enabled,
    optional,
    minQuantity: 1,
    quantityStep: 1,
    baseQuantity,
    scalable: unit.toLowerCase().includes('qm') || unit.toLowerCase().includes('lfm') || unit === 'm',
    quantity: baseQuantity,
    canDuplicate: false,
    canRemove: true,
    canReplace: false,
    description,
    alternatives: []
  };
}

export const packageRohbauAlles: RenovationPackage = {
  id: 'rohbauAlles',
  title: 'Alles zu Rohbau',
  defaultArea: 100,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'art-der-ausfuehrung',
      title: 'Art der Ausführung',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'art-der-ausfuehrung-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('rohb-101-1-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ABBRUCH-DECKEN (Leichtbau) | 🛠 Demontage-Leistungspaket`, 'ROHB-101-1-ZU', 21.14, 'qm', `🛠 Demontage-Leistungspaket`, false, false, 1, 'service'),
            createProduct('rohb-101-1-mat', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ABBRUCH-WÄNDE (6-16 cm) | 🛠 Demontage-Leistungspaket`, 'ROHB-101.1-MAT', 78.21, 'qm', `🛠 Demontage-Leistungspaket`, false, false, 1, 'service'),
            createProduct('rohb-101-2-mat', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ABBRUCH-WÄNDE (17-35 cm) | 🛠 Demontage-Leistungspaket`, 'ROHB-101.2-MAT', 98.01, 'qm', `🛠 Demontage-Leistungspaket`, false, false, 1, 'service'),
            createProduct('rohb-100-au', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Weitere Produkte - zu ROHBAU |**Varianten**`, 'ROHB-100-AU', 0, 'Stk', `**Varianten**`, false, true, 1, 'optional')
          ]
        }
      ]
    },
    {
      id: 'verputze-basis-haus',
      title: 'VERPUTZE | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'verputze-basis-haus-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('rohb-401-mat', 'verputze-basis-haus', 'verputze-basis-haus-sub', `WANDPUTZ-GIPS | 🛠 Montage-Leistungspaket`, 'ROHB-401-MAT', 34.6, 'qm', `🛠 Montage-Leistungspaket`, false, false, 1, 'service'),
            createProduct('rohb-401-1-op', 'verputze-basis-haus', 'verputze-basis-haus-sub', `ALT-PUTZ |🛠 Demontage & Entsorgung`, 'ROHB-401-1-OP', 11.88, 'qm', `🛠 Demontage & Entsorgung`, false, false, 1, 'service')
          ]
        }
      ]
    },
    {
      id: 'stahltraeger-basis-haus',
      title: 'STAHLTRÄGER | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'stahltraeger-basis-haus-sub',
          title: 'Leistungen & Materialien',
          type: 'optional',
          products: [
            createProduct('rohb-201-mat', 'stahltraeger-basis-haus', 'stahltraeger-basis-haus-sub', `STAHLTRÄGER | Profil HE-A-140 - (max. 2m) |**Varianten**`, 'ROHB-201-MAT', 1781.33, 'Stk', `Profil HE-A-140 - (max. 2m) |**Varianten**`, false, true, 1, 'optional'),
            createProduct('rohb-201-1-zu', 'stahltraeger-basis-haus', 'stahltraeger-basis-haus-sub', `BETON-AUFLAGER FÜR STAHLTRÄGER |**VARIANTEN** | 🛠 Zusatz-Montage`, 'ROHB-201-1-ZU', 188.1, 'Stk', `**VARIANTEN** | 🛠 Zusatz-Montage`, false, true, 1, 'optional')
          ]
        }
      ]
    },
    {
      id: 'extra-positionen',
      title: 'Extra Positionen',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'extra-positionen-sub',
          title: 'Leistungen & Materialien',
          type: 'extra',
          products: [
            createProduct('rohb-10003-basis', 'extra-positionen', 'extra-positionen-sub', `GARTENMAUERN | 🛠 Montage-Leistungspaket`, 'ROHB-10003-Basis', 149, 'qm', `🛠 Montage-Leistungspaket`, false, false, 1, 'extra'),
            createProduct('uv229-00499', 'extra-positionen', 'extra-positionen-sub', `Gala-Lusit Spaltino Mauerblock - Gelbsand-Melange ohne Fase`, 'uv229-00499', 23.85, 'Stk', `Gala-Lusit Spaltino Mauerblock - Gelbsand-Melange ohne Fase`, false, false, 1, 'extra'),
            createProduct('uv633-00009', 'extra-positionen', 'extra-positionen-sub', `Stebah Fugenmörtel - 25 Kg - Hellgrau`, 'uv633-00009', 23.3, 'Sack', `Stebah Fugenmörtel - 25 Kg - Hellgrau`, false, false, 1, 'extra'),
            createProduct('uv31-00018', 'extra-positionen', 'extra-positionen-sub', `1A BAUCHEMIE T-FLEX TE C2 Flex Klebemörtel für keramische Wand- und Bodenbeläge im Innen- und Außenbereich grau`, 'uv31-00018', 19.73, 'Sack', `1A BAUCHEMIE T-FLEX TE C2 Flex Klebemörtel für keramische Wand- und Bodenbeläge im Innen- und Außenbereich grau`, false, false, 1, 'extra'),
            createProduct('rohb-501-2-op', 'extra-positionen', 'extra-positionen-sub', `Ausgleichsschüttung Herstellen (bis 3 cm)`, 'ROHB-501-2-OP', 11.68, 'qm', `Ausgleichsschüttung Herstellen (bis 3 cm)`, false, false, 1, 'extra'),
            createProduct('204-85', 'extra-positionen', 'extra-positionen-sub', `Fermacell Wabenschüttung - 15 Liter Sack`, '204-85', 9.24, 'Stk', `Fermacell Wabenschüttung - 15 Liter Sack`, false, false, 1, 'extra'),
            createProduct('204-00088', 'extra-positionen', 'extra-positionen-sub', `Fermacell Wärmedämmschüttung - 100 Liter Sack`, '204-00088', 25.85, 'Stk', `Fermacell Wärmedämmschüttung - 100 Liter Sack`, false, false, 1, 'extra'),
            createProduct('204-00086', 'extra-positionen', 'extra-positionen-sub', `Fermacell Estrich-Wabe 1.500x1.000 mm, Dicke 30 mm`, '204-00086', 15.84, 'Stk', `Fermacell Estrich-Wabe 1.500x1.000 mm, Dicke 30 mm`, false, false, 1, 'extra'),
            createProduct('021-187', 'extra-positionen', 'extra-positionen-sub', `ALUJET Floorjet Speed Abdichtungsbahn 1500 mm x 50 m`, '021-187', 270.6, 'Stk', `ALUJET Floorjet Speed Abdichtungsbahn 1500 mm x 50 m`, false, false, 1, 'extra'),
            createProduct('rohb-401-zu', 'extra-positionen', 'extra-positionen-sub', `VERPUTZEN DES DURCHGANGS | 🛠 Zusatz-Montage`, 'ROHB-401-ZU', 465.35, 'Stk', `🛠 Zusatz-Montage`, false, false, 1, 'extra'),
            createProduct('rohb-10002-basis', 'extra-positionen', 'extra-positionen-sub', `LICHTSCHÄCHTE | 🛠 Montage-Leistungspaket`, 'ROHB-10002-Basis', 295, 'Stk', `🛠 Montage-Leistungspaket`, false, false, 1, 'extra'),
            createProduct('uv4-11523', 'extra-positionen', 'extra-positionen-sub', `ACO Therm Kunststofflichtschacht Set 600 mm Tiefe`, 'uv4-11523', 341.73, 'Stk', `ACO Therm Kunststofflichtschacht Set 600 mm Tiefe`, false, false, 1, 'extra'),
            createProduct('fass-10012', 'extra-positionen', 'extra-positionen-sub', `VERBLENDMAUERWERK | 🛠 Montage`, 'FASS-10012', 149, 'qm', `🛠 Montage`, false, false, 1, 'extra'),
            createProduct('744-10030', 'extra-positionen', 'extra-positionen-sub', `Terca Klinker KMz 28-2,4-DF voll KK1 rotbunt glatt`, '744-10030', 2.42, 'Stk', `Terca Klinker KMz 28-2,4-DF voll KK1 rotbunt glatt`, false, false, 1, 'extra'),
            createProduct('uv633-00009-2', 'extra-positionen', 'extra-positionen-sub', `Stebah Fugenmörtel - 25 Kg - Hellgrau`, 'uv633-00009', 23.3, 'Sack', `Stebah Fugenmörtel - 25 Kg - Hellgrau`, false, false, 1, 'extra'),
            createProduct('rohb-10003-basis-2', 'extra-positionen', 'extra-positionen-sub', `GARTENMAUERN | 🛠 Montage-Leistungspaket`, 'ROHB-10003-Basis', 149, 'qm', `🛠 Montage-Leistungspaket`, false, false, 1, 'extra'),
            createProduct('heiz-10006-basis', 'extra-positionen', 'extra-positionen-sub', `SCHORNSTEIN | 🛠 Montage-Leistungspaket`, 'HEIZ-10006-Basis', 189, 'lfm', `🛠 Montage-Leistungspaket`, false, false, 1, 'extra'),
            createProduct('743-13964', 'extra-positionen', 'extra-positionen-sub', `Wienerberger Kamtec FF 14 LW Fertigfuss inkl. Grundbausatz Zuschlag, HAN.: 34765462`, '743-13964', 1111, 'Stk', `Wienerberger Kamtec FF 14 LW Fertigfuss inkl. Grundbausatz Zuschlag, HAN.: 34765462`, false, false, 1, 'extra'),
            createProduct('743-1018', 'extra-positionen', 'extra-positionen-sub', `Wienerberger ISSr 14 P Kamtec Kaminsystem 1 stgm, HAN.: 34865102`, '743-1018', 204.6, 'Stk', `Wienerberger ISSr 14 P Kamtec Kaminsystem 1 stgm, HAN.: 34865102`, false, false, 1, 'extra'),
            createProduct('743-10059', 'extra-positionen', 'extra-positionen-sub', `Wienerberger Kamtec Mantelstein einzügig Planziegel ZMS 14, HAN.: 30054001`, '743-10059', 70.51, 'Stk', `Wienerberger Kamtec Mantelstein einzügig Planziegel ZMS 14, HAN.: 30054001`, false, false, 1, 'extra'),
            createProduct('743-10109', 'extra-positionen', 'extra-positionen-sub', `Wienerberger Kamtec Muffenrohr, HAN.: 34859212`, '743-10109', 97.68, 'Stk', `Wienerberger Kamtec Muffenrohr, HAN.: 34859212`, false, false, 1, 'extra'),
            createProduct('743-10175', 'extra-positionen', 'extra-positionen-sub', `Wienerberger Kamtec Rauchrohrstutzen, HAN.: 30053404`, '743-10175', 82.61, 'Stk', `Wienerberger Kamtec Rauchrohrstutzen, HAN.: 30053404`, false, false, 1, 'extra'),
            createProduct('743-10122', 'extra-positionen', 'extra-positionen-sub', `Wienerberger Kamtec Sparrenhalterung, HAN.: 30054510`, '743-10122', 504.9, 'Stk', `Wienerberger Kamtec Sparrenhalterung, HAN.: 30054510`, false, false, 1, 'extra')
          ]
        }
      ]
    },
    {
      id: 'estrich-basis-haus',
      title: 'ESTRICH | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'estrich-basis-haus-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('mon-10222', 'estrich-basis-haus', 'estrich-basis-haus-sub', `ESTRICH | 🛠 Montage`, 'MON-10222', 29, 'qm', `🛠 Montage`, false, false, 1, 'service'),
            createProduct('rohb-501-1-op', 'estrich-basis-haus', 'estrich-basis-haus-sub', `ALT-ESTRICH |🛠 Demontage & Entsorgung`, 'ROHB-501-1-OP', 45.89, 'qm', `🛠 Demontage & Entsorgung`, false, false, 1, 'service'),
            createProduct('uv298-373', 'estrich-basis-haus', 'estrich-basis-haus-sub', `Holcim ECOPact - klimafreundlicher Transportbeton für Außenbauteile - C25/30 XC4 XF1 XA1 F3 L`, 'uv298-373', 4973.95, 'Lieferung', `Holcim ECOPact - klimafreundlicher Transportbeton für Außenbauteile - C25/30 XC4 XF1 XA1 F3 L`, false, false, 1, 'material'),
            createProduct('uv50-00011', 'estrich-basis-haus', 'estrich-basis-haus-sub', `Bekaert Armanet-D Distanet Armierungsgitter Maschenweite 19,0x19,0x1,0 mm - 2 m Tafel`, 'uv50-00011', 38.45, 'Stk', `Bekaert Armanet-D Distanet Armierungsgitter Maschenweite 19,0x19,0x1,0 mm - 2 m Tafel`, false, false, 1, 'material'),
            createProduct('uv21-117', 'estrich-basis-haus', 'estrich-basis-haus-sub', `ALUJET Jetfoam Dämmbahn RS grn | 8 mm, Rolle á 50 m`, 'uv21-117', 32.89, 'Rolle', `8 mm, Rolle á 50 m`, false, false, 1, 'material'),
            createProduct('mon-10222-2', 'estrich-basis-haus', 'estrich-basis-haus-sub', `ESTRICH | 🛠 Montage`, 'MON-10222', 29, 'qm', `🛠 Montage`, false, false, 1, 'service'),
            createProduct('rohb-501-1-op-2', 'estrich-basis-haus', 'estrich-basis-haus-sub', `ALT-ESTRICH |🛠 Demontage & Entsorgung`, 'ROHB-501-1-OP', 45.89, 'qm', `🛠 Demontage & Entsorgung`, false, false, 1, 'service'),
            createProduct('uv204-000321', 'estrich-basis-haus', 'estrich-basis-haus-sub', `Fermacell Estrich-Elemente (MW) mit Mineralwolldämmung 1500x500 mm - Dicke: 30 mm`, 'uv204-000321', 26.39, 'Stk', `Fermacell Estrich-Elemente (MW) mit Mineralwolldämmung 1500x500 mm - Dicke: 30 mm`, false, false, 1, 'material'),
            createProduct('204-00071', 'estrich-basis-haus', 'estrich-basis-haus-sub', `Fermacell Estrich-Kleber - 1 kg Flasche`, '204-00071', 25.19, 'Stk', `Fermacell Estrich-Kleber - 1 kg Flasche`, false, false, 1, 'material'),
            createProduct('204-00073', 'estrich-basis-haus', 'estrich-basis-haus-sub', `Fermacell Schnellbauschrauben für Estrichelemente 3,9x19 mm, 1000 Stück`, '204-00073', 21.89, 'Stk', `Fermacell Schnellbauschrauben für Estrichelemente 3,9x19 mm, 1000 Stück`, false, false, 1, 'material')
          ]
        }
      ]
    },
    {
      id: 'optionale-positionen',
      title: 'Optionale Positionen',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'optionale-positionen-sub',
          title: 'Leistungen & Materialien',
          type: 'optional',
          products: [
            createProduct('uv454-40086', 'optionale-positionen', 'optionale-positionen-sub', `MEA GFK-Lichtschacht MEAMULTINORM begehbar+PKW-befahrbar`, 'uv454-40086', 183.63, 'Stk', `MEA GFK-Lichtschacht MEAMULTINORM begehbar+PKW-befahrbar`, false, true, 1, 'optional'),
            createProduct('uv454-40001', 'optionale-positionen', 'optionale-positionen-sub', `MEA GFK-Lichtschacht MEAMAX mit runder Entwässerungsöffnung`, 'uv454-40001', 158.35, 'Stk', `MEA GFK-Lichtschacht MEAMAX mit runder Entwässerungsöffnung`, false, true, 1, 'optional'),
            createProduct('uv4-10979', 'optionale-positionen', 'optionale-positionen-sub', `ACO Aufstockelement 4-seitig geschlossen für Kunststofflichtschächte mit 400 mm Tiefe`, 'uv4-10979', 288.01, 'Stk', `ACO Aufstockelement 4-seitig geschlossen für Kunststofflichtschächte mit 400 mm Tiefe`, false, true, 1, 'optional'),
            createProduct('uv4-10983', 'optionale-positionen', 'optionale-positionen-sub', `ACO Aufstockelement fixe Bauhöhe 275 mm für Kunststofflichtschächte`, 'uv4-10983', 171.58, 'Stk', `ACO Aufstockelement fixe Bauhöhe 275 mm für Kunststofflichtschächte`, false, true, 1, 'optional'),
            createProduct('uv4-11005', 'optionale-positionen', 'optionale-positionen-sub', `ACO Aufstockelement Set höhenverstellbar 30-300 mm für Kunststofflichtschächte mit 800 mm Tiefe`, 'uv4-11005', 238.61, 'Stk', `ACO Aufstockelement Set höhenverstellbar 30-300 mm für Kunststofflichtschächte mit 800 mm Tiefe`, false, true, 1, 'optional'),
            createProduct('uv4-11036', 'optionale-positionen', 'optionale-positionen-sub', `ACO Längsstabrost für Lüftungskasten Edelstahl für Kunststofflichtschächte begehbar 1,5 kN`, 'uv4-11036', 349.01, 'Stk', `ACO Längsstabrost für Lüftungskasten Edelstahl für Kunststofflichtschächte begehbar 1,5 kN`, false, true, 1, 'optional'),
            createProduct('uv4-11051', 'optionale-positionen', 'optionale-positionen-sub', `ACO Lichtschachtabdeckung mit Lüftungsgitter für Kunststofflichtschächte`, 'uv4-11051', 499.46, 'Stk', `ACO Lichtschachtabdeckung mit Lüftungsgitter für Kunststofflichtschächte`, false, true, 1, 'optional'),
            createProduct('743-1204', 'optionale-positionen', 'optionale-positionen-sub', `Wienerberger LAS 1216 LW Kamtec Kaminsystem 1 stgm, HAN.: 34765146`, '743-1204', 545.6, 'Stk', `Wienerberger LAS 1216 LW Kamtec Kaminsystem 1 stgm, HAN.: 34765146`, false, true, 1, 'optional'),
            createProduct('743-10076', 'optionale-positionen', 'optionale-positionen-sub', `Wienerberger Kamtec Abströmkopf ASK 120, HAN.: 30056461`, '743-10076', 190.3, 'Stk', `Wienerberger Kamtec Abströmkopf ASK 120, HAN.: 30056461`, false, true, 1, 'optional'),
            createProduct('743-10042', 'optionale-positionen', 'optionale-positionen-sub', `Wienerberger Kamtec Krag und Abdeckplatte KP/AP-U 20 W für Untermauerung einzügig, HAN.: 34765655`, '743-10042', 457.6, 'Stk', `Wienerberger Kamtec Krag und Abdeckplatte KP/AP-U 20 W für Untermauerung einzügig, HAN.: 34765655`, false, true, 1, 'optional'),
            createProduct('743-10068', 'optionale-positionen', 'optionale-positionen-sub', `Wienerberger Kamtec ISSr Fugenkleber, HAN.: 30054461`, '743-10068', 68.75, 'Stk', `Wienerberger Kamtec ISSr Fugenkleber, HAN.: 30054461`, false, true, 1, 'optional'),
            createProduct('ents-101-mat', 'optionale-positionen', 'optionale-positionen-sub', `CONTAINER | Entsorgung Bauschutt |**Varianten**`, 'ENTS-101-MAT', 490.05, 'Stk', `Entsorgung Bauschutt |**Varianten**`, false, true, 1, 'optional')
          ]
        }
      ]
    },
    {
      id: 'material',
      title: 'Material',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'material-sub',
          title: 'Leistungen & Materialien',
          type: 'material',
          products: [
            createProduct('uv229-00499-2', 'material', 'material-sub', `Gala-Lusit Spaltino Mauerblock - Gelbsand-Melange ohne Fase`, 'uv229-00499', 23.85, 'Stk', `Gala-Lusit Spaltino Mauerblock - Gelbsand-Melange ohne Fase`, false, false, 1, 'material'),
            createProduct('uv633-00009-3', 'material', 'material-sub', `Stebah Fugenmörtel - 25 Kg - Hellgrau`, 'uv633-00009', 23.3, 'Sack', `Stebah Fugenmörtel - 25 Kg - Hellgrau`, false, false, 1, 'material'),
            createProduct('uv31-00018-2', 'material', 'material-sub', `1A BAUCHEMIE T-FLEX TE C2 Flex Klebemörtel für keramische Wand- und Bodenbeläge im Innen- und Außenbereich grau`, 'uv31-00018', 19.73, 'Sack', `1A BAUCHEMIE T-FLEX TE C2 Flex Klebemörtel für keramische Wand- und Bodenbeläge im Innen- und Außenbereich grau`, false, false, 1, 'material')
          ]
        }
      ]
    }
  ]
};

export const packageRohbauAbbruch: RenovationPackage = {
  id: 'rohbauAbbruch',
  title: 'Abbruch',
  defaultArea: 100,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'art-der-ausfuehrung',
      title: 'Art der Ausführung',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'art-der-ausfuehrung-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('rohb-101-1-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ABBRUCH-DECKEN (Leichtbau) | 🛠 Demontage-Leistungspaket`, 'ROHB-101-1-ZU', 21.14, 'qm', `🛠 Demontage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('rohb-101-1-mat', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ABBRUCH-WÄNDE (6-16 cm) | 🛠 Demontage-Leistungspaket`, 'ROHB-101.1-MAT', 78.21, 'qm', `🛠 Demontage-Leistungspaket`, true, false, 6, 'service'),
            createProduct('rohb-101-2-mat', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ABBRUCH-WÄNDE (17-35 cm) | 🛠 Demontage-Leistungspaket`, 'ROHB-101.2-MAT', 98.01, 'qm', `🛠 Demontage-Leistungspaket`, true, false, 4, 'service')
          ]
        }
      ]
    },
    {
      id: 'stahltraeger-basis-haus',
      title: 'STAHLTRÄGER | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'stahltraeger-basis-haus-sub',
          title: 'Leistungen & Materialien',
          type: 'optional',
          products: [
            createProduct('rohb-201-mat', 'stahltraeger-basis-haus', 'stahltraeger-basis-haus-sub', `STAHLTRÄGER | Profil HE-A-140 - (max. 2m) |**Varianten**`, 'ROHB-201-MAT', 1781.33, 'Stk', `Profil HE-A-140 - (max. 2m) |**Varianten**`, false, true, 1, 'optional'),
            createProduct('rohb-201-1-zu', 'stahltraeger-basis-haus', 'stahltraeger-basis-haus-sub', `BETON-AUFLAGER FÜR STAHLTRÄGER |**VARIANTEN** | 🛠 Zusatz-Montage`, 'ROHB-201-1-ZU', 188.1, 'Stk', `**VARIANTEN** | 🛠 Zusatz-Montage`, true, true, 2, 'optional')
          ]
        }
      ]
    },
    {
      id: 'optionale-positionen',
      title: 'Optionale Positionen',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'optionale-positionen-sub',
          title: 'Leistungen & Materialien',
          type: 'optional',
          products: [
            createProduct('rohb-100-au', 'optionale-positionen', 'optionale-positionen-sub', `Weitere Produkte - zu ROHBAU |**Varianten**`, 'ROHB-100-AU', 0, 'Stk', `**Varianten**`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageRohbauEstrich: RenovationPackage = {
  id: 'rohbauEstrich',
  title: 'Estrich',
  defaultArea: 100,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'art-der-ausfuehrung',
      title: 'Art der Ausführung',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'art-der-ausfuehrung-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('mon-10222', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ESTRICH | 🛠 Montage`, 'MON-10222', 29, 'qm', `🛠 Montage`, true, false, 20, 'service'),
            createProduct('rohb-501-1-op', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ALT-ESTRICH |🛠 Demontage & Entsorgung`, 'ROHB-501-1-OP', 45.89, 'qm', `🛠 Demontage & Entsorgung`, false, false, 1, 'service')
          ]
        }
      ]
    },
    {
      id: 'material',
      title: 'Material',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'material-sub',
          title: 'Leistungen & Materialien',
          type: 'material',
          products: [
            createProduct('uv298-373', 'material', 'material-sub', `Holcim ECOPact - klimafreundlicher Transportbeton für Außenbauteile - C25/30 XC4 XF1 XA1 F3 L`, 'uv298-373', 4973.95, 'Lieferung', `Holcim ECOPact - klimafreundlicher Transportbeton für Außenbauteile - C25/30 XC4 XF1 XA1 F3 L`, true, false, 1, 'material'),
            createProduct('uv50-00011', 'material', 'material-sub', `Bekaert Armanet-D Distanet Armierungsgitter Maschenweite 19,0x19,0x1,0 mm - 2 m Tafel`, 'uv50-00011', 38.45, 'Stk', `Bekaert Armanet-D Distanet Armierungsgitter Maschenweite 19,0x19,0x1,0 mm - 2 m Tafel`, true, false, 20, 'material'),
            createProduct('uv21-117', 'material', 'material-sub', `ALUJET Jetfoam Dämmbahn RS grn | 8 mm, Rolle á 50 m`, 'uv21-117', 32.89, 'Rolle', `8 mm, Rolle á 50 m`, false, false, 1, 'material'),
            createProduct('uv204-000321', 'material', 'material-sub', `Fermacell Estrich-Elemente (MW) mit Mineralwolldämmung 1500x500 mm - Dicke: 30 mm`, 'uv204-000321', 26.39, 'Stk', `Fermacell Estrich-Elemente (MW) mit Mineralwolldämmung 1500x500 mm - Dicke: 30 mm`, true, false, 1, 'material')
          ]
        }
      ]
    },
    {
      id: 'optionale-positionen',
      title: 'Optionale Positionen',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'optionale-positionen-sub',
          title: 'Leistungen & Materialien',
          type: 'optional',
          products: [
            createProduct('mon-10222-2', 'optionale-positionen', 'optionale-positionen-sub', `ESTRICH | 🛠 Montage`, 'MON-10222', 29, 'qm', `🛠 Montage`, true, true, 1, 'optional'),
            createProduct('rohb-501-1-op-2', 'optionale-positionen', 'optionale-positionen-sub', `ALT-ESTRICH |🛠 Demontage & Entsorgung`, 'ROHB-501-1-OP', 45.89, 'qm', `🛠 Demontage & Entsorgung`, false, true, 1, 'optional')
          ]
        }
      ]
    },
    {
      id: 'extra-positionen',
      title: 'Extra Positionen',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'extra-positionen-sub',
          title: 'Leistungen & Materialien',
          type: 'extra',
          products: [
            createProduct('204-00071', 'extra-positionen', 'extra-positionen-sub', `Fermacell Estrich-Kleber - 1 kg Flasche`, '204-00071', 25.19, 'Stk', `Fermacell Estrich-Kleber - 1 kg Flasche`, false, false, 1, 'extra'),
            createProduct('204-00073', 'extra-positionen', 'extra-positionen-sub', `Fermacell Schnellbauschrauben für Estrichelemente 3,9x19 mm, 1000 Stück`, '204-00073', 21.89, 'Stk', `Fermacell Schnellbauschrauben für Estrichelemente 3,9x19 mm, 1000 Stück`, false, false, 1, 'extra'),
            createProduct('rohb-501-2-op', 'extra-positionen', 'extra-positionen-sub', `Ausgleichsschüttung Herstellen (bis 3 cm)`, 'ROHB-501-2-OP', 11.68, 'qm', `Ausgleichsschüttung Herstellen (bis 3 cm)`, true, false, 1, 'extra'),
            createProduct('204-85', 'extra-positionen', 'extra-positionen-sub', `Fermacell Wabenschüttung - 15 Liter Sack`, '204-85', 9.24, 'Stk', `Fermacell Wabenschüttung - 15 Liter Sack`, false, false, 1, 'extra'),
            createProduct('204-00088', 'extra-positionen', 'extra-positionen-sub', `Fermacell Wärmedämmschüttung - 100 Liter Sack`, '204-00088', 25.85, 'Stk', `Fermacell Wärmedämmschüttung - 100 Liter Sack`, false, false, 1, 'extra'),
            createProduct('204-00086', 'extra-positionen', 'extra-positionen-sub', `Fermacell Estrich-Wabe 1.500x1.000 mm, Dicke 30 mm`, '204-00086', 15.84, 'Stk', `Fermacell Estrich-Wabe 1.500x1.000 mm, Dicke 30 mm`, false, false, 1, 'extra'),
            createProduct('021-187', 'extra-positionen', 'extra-positionen-sub', `ALUJET Floorjet Speed Abdichtungsbahn 1500 mm x 50 m`, '021-187', 270.6, 'Stk', `ALUJET Floorjet Speed Abdichtungsbahn 1500 mm x 50 m`, false, false, 1, 'extra')
          ]
        }
      ]
    }
  ]
};

export const packageRohbauStahltraeger: RenovationPackage = {
  id: 'rohbauStahltraeger',
  title: 'Stahlträger',
  defaultArea: 1,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'art-der-ausfuehrung',
      title: 'Art der Ausführung',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'art-der-ausfuehrung-sub',
          title: 'Leistungen & Materialien',
          type: 'optional',
          products: [
            createProduct('rohb-201-mat', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `STAHLTRÄGER | Profil HE-A-140 - (max. 2m) |**Varianten**`, 'ROHB-201-MAT', 1781.33, 'Stk', `Profil HE-A-140 - (max. 2m) |**Varianten**`, false, true, 1, 'optional'),
            createProduct('rohb-201-1-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `BETON-AUFLAGER FÜR STAHLTRÄGER |**VARIANTEN** | 🛠 Zusatz-Montage`, 'ROHB-201-1-ZU', 188.1, 'Stk', `**VARIANTEN** | 🛠 Zusatz-Montage`, true, true, 2, 'optional'),
            createProduct('rohb-100-au', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Weitere Produkte - zu ROHBAU |**Varianten**`, 'ROHB-100-AU', 0, 'Stk', `**Varianten**`, false, true, 1, 'optional')
          ]
        }
      ]
    },
    {
      id: 'optionale-positionen',
      title: 'Optionale Positionen',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'optionale-positionen-sub',
          title: 'Leistungen & Materialien',
          type: 'optional',
          products: [
            createProduct('rohb-101-1-zu', 'optionale-positionen', 'optionale-positionen-sub', `ABBRUCH-DECKEN (Leichtbau) | 🛠 Demontage-Leistungspaket`, 'ROHB-101-1-ZU', 21.14, 'qm', `🛠 Demontage-Leistungspaket`, false, true, 1, 'optional'),
            createProduct('rohb-101-1-mat', 'optionale-positionen', 'optionale-positionen-sub', `ABBRUCH-WÄNDE (6-16 cm) | 🛠 Demontage-Leistungspaket`, 'ROHB-101.1-MAT', 78.21, 'qm', `🛠 Demontage-Leistungspaket`, false, true, 1, 'optional'),
            createProduct('rohb-101-2-mat', 'optionale-positionen', 'optionale-positionen-sub', `ABBRUCH-WÄNDE (17-35 cm) | 🛠 Demontage-Leistungspaket`, 'ROHB-101.2-MAT', 98.01, 'qm', `🛠 Demontage-Leistungspaket`, false, true, 1, 'optional')
          ]
        }
      ]
    },
    {
      id: 'abbruch-basis-haus',
      title: 'ABBRUCH | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'abbruch-basis-haus-sub',
          title: 'Leistungen & Materialien',
          type: 'optional',
          products: [
            createProduct('ents-101-mat', 'abbruch-basis-haus', 'abbruch-basis-haus-sub', `CONTAINER | Entsorgung Bauschutt |**Varianten**`, 'ENTS-101-MAT', 490.05, 'Stk', `Entsorgung Bauschutt |**Varianten**`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageRohbauVerputzen: RenovationPackage = {
  id: 'rohbauVerputzen',
  title: 'Verputzen',
  defaultArea: 100,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'art-der-ausfuehrung',
      title: 'Art der Ausführung',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'art-der-ausfuehrung-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('rohb-401-mat', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `WANDPUTZ-GIPS | 🛠 Montage-Leistungspaket`, 'ROHB-401-MAT', 34.6, 'qm', `🛠 Montage-Leistungspaket`, true, false, 100, 'service'),
            createProduct('rohb-401-1-op', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ALT-PUTZ |🛠 Demontage & Entsorgung`, 'ROHB-401-1-OP', 11.88, 'qm', `🛠 Demontage & Entsorgung`, false, false, 1, 'service'),
            createProduct('rohb-401-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `VERPUTZEN DES DURCHGANGS | 🛠 Zusatz-Montage`, 'ROHB-401-ZU', 465.35, 'Stk', `🛠 Zusatz-Montage`, false, false, 1, 'extra')
          ]
        }
      ]
    },
    {
      id: 'material',
      title: 'Material',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'material-sub',
          title: 'Leistungen & Materialien',
          type: 'material',
          products: [
            createProduct('uv50-00004', 'material', 'material-sub', `Bekaert Armanet Putzarmierungsgitter Maschenweite 12,7x12,7x1,0 mm - 25 m Rolle`, 'uv50-00004', 381.63, 'Rolle', `Bekaert Armanet Putzarmierungsgitter Maschenweite 12,7x12,7x1,0 mm - 25 m Rolle`, true, false, 4, 'material'),
            createProduct('uv545-00450', 'material', 'material-sub', `Protektor Nr.: 1044Z Kantenprofil 135° für den Innen- und Außenputz`, 'uv545-00450', 33.77, 'lfm', `Protektor Nr.: 1044Z Kantenprofil 135° für den Innen- und Außenputz`, true, false, 10, 'material'),
            createProduct('uv545-00534', 'material', 'material-sub', `Protektor Nr.: 1005 Kantenprofil für den Innenputz`, 'uv545-00534', 1.36, 'lfm', `Protektor Nr.: 1005 Kantenprofil für den Innenputz`, false, false, 1, 'material'),
            createProduct('uv121-2119', 'material', 'material-sub', `Claytec YOSIMA Lehm-Designputz SCRO 1.0 - siena-braun`, 'uv121-2119', 87.88, 'Stk', `Claytec YOSIMA Lehm-Designputz SCRO 1.0 - siena-braun`, false, false, 1, 'material')
          ]
        }
      ]
    },
    {
      id: 'container-entsorgung-basis-haus',
      title: 'CONTAINER & ENTSORGUNG | Basis-Haus',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'container-entsorgung-basis-haus-sub',
          title: 'Leistungen & Materialien',
          type: 'optional',
          products: [
            createProduct('ents-101-mat', 'container-entsorgung-basis-haus', 'container-entsorgung-basis-haus-sub', `CONTAINER | Entsorgung Bauschutt |**Varianten**`, 'ENTS-101-MAT', 490.05, 'Stk', `Entsorgung Bauschutt |**Varianten**`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageRohbauLichtschaechte: RenovationPackage = {
  id: 'rohbauLichtschaechte',
  title: 'Lichtschächte',
  defaultArea: 1,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'art-der-ausfuehrung',
      title: 'Art der Ausführung',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'art-der-ausfuehrung-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('rohb-10002-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `LICHTSCHÄCHTE | 🛠 Montage-Leistungspaket`, 'ROHB-10002-Basis', 295, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
          ]
        }
      ]
    },
    {
      id: 'material',
      title: 'Material',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'material-sub',
          title: 'Leistungen & Materialien',
          type: 'material',
          products: [
            createProduct('uv4-11523', 'material', 'material-sub', `ACO Therm Kunststofflichtschacht Set 600 mm Tiefe`, 'uv4-11523', 341.73, 'Stk', `ACO Therm Kunststofflichtschacht Set 600 mm Tiefe`, true, false, 1, 'material')
          ]
        }
      ]
    },
    {
      id: 'optionale-positionen',
      title: 'Optionale Positionen',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'optionale-positionen-sub',
          title: 'Leistungen & Materialien',
          type: 'optional',
          products: [
            createProduct('uv454-40086', 'optionale-positionen', 'optionale-positionen-sub', `MEA GFK-Lichtschacht MEAMULTINORM begehbar+PKW-befahrbar`, 'uv454-40086', 183.63, 'Stk', `MEA GFK-Lichtschacht MEAMULTINORM begehbar+PKW-befahrbar`, false, true, 1, 'optional'),
            createProduct('uv454-40001', 'optionale-positionen', 'optionale-positionen-sub', `MEA GFK-Lichtschacht MEAMAX mit runder Entwässerungsöffnung`, 'uv454-40001', 158.35, 'Stk', `MEA GFK-Lichtschacht MEAMAX mit runder Entwässerungsöffnung`, false, true, 1, 'optional'),
            createProduct('uv4-10979', 'optionale-positionen', 'optionale-positionen-sub', `ACO Aufstockelement 4-seitig geschlossen für Kunststofflichtschächte mit 400 mm Tiefe`, 'uv4-10979', 288.01, 'Stk', `ACO Aufstockelement 4-seitig geschlossen für Kunststofflichtschächte mit 400 mm Tiefe`, false, true, 1, 'optional'),
            createProduct('uv4-10983', 'optionale-positionen', 'optionale-positionen-sub', `ACO Aufstockelement fixe Bauhöhe 275 mm für Kunststofflichtschächte`, 'uv4-10983', 171.58, 'Stk', `ACO Aufstockelement fixe Bauhöhe 275 mm für Kunststofflichtschächte`, false, true, 1, 'optional'),
            createProduct('uv4-11005', 'optionale-positionen', 'optionale-positionen-sub', `ACO Aufstockelement Set höhenverstellbar 30-300 mm für Kunststofflichtschächte mit 800 mm Tiefe`, 'uv4-11005', 238.61, 'Stk', `ACO Aufstockelement Set höhenverstellbar 30-300 mm für Kunststofflichtschächte mit 800 mm Tiefe`, false, true, 1, 'optional')
          ]
        }
      ]
    },
    {
      id: 'extra-positionen',
      title: 'Extra Positionen',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'extra-positionen-sub',
          title: 'Leistungen & Materialien',
          type: 'extra',
          products: [
            createProduct('uv4-11036', 'extra-positionen', 'extra-positionen-sub', `ACO Längsstabrost für Lüftungskasten Edelstahl für Kunststofflichtschächte begehbar 1,5 kN`, 'uv4-11036', 349.01, 'Stk', `ACO Längsstabrost für Lüftungskasten Edelstahl für Kunststofflichtschächte begehbar 1,5 kN`, false, false, 1, 'extra'),
            createProduct('uv4-11051', 'extra-positionen', 'extra-positionen-sub', `ACO Lichtschachtabdeckung mit Lüftungsgitter für Kunststofflichtschächte`, 'uv4-11051', 499.46, 'Stk', `ACO Lichtschachtabdeckung mit Lüftungsgitter für Kunststofflichtschächte`, false, false, 1, 'extra'),
            createProduct('uv4-11579', 'extra-positionen', 'extra-positionen-sub', `ACO Vario Designabdeckung mit Längsprofilrost und Einfassungsrahmen Silber für Kunststofflichtschächte`, 'uv4-11579', 1759.03, 'Stk', `ACO Vario Designabdeckung mit Längsprofilrost und Einfassungsrahmen Silber für Kunststofflichtschächte`, false, false, 1, 'extra'),
            createProduct('uv4-11605', 'extra-positionen', 'extra-positionen-sub', `ACO Vario Designabdeckung Teilglas mit Maschenrost und Einfassungsrahmen Anthrazit für Kunststofflichtschächte`, 'uv4-11605', 2229.1, 'Stk', `ACO Vario Designabdeckung Teilglas mit Maschenrost und Einfassungsrahmen Anthrazit für Kunststofflichtschächte`, false, false, 1, 'extra'),
            createProduct('uv4-11617', 'extra-positionen', 'extra-positionen-sub', `ACO Vario Designabdeckung Vollglas mit Einfassungsrahmen Anthrazit für Kunststofflichtschächte`, 'uv4-11617', 1873.22, 'Stk', `ACO Vario Designabdeckung Vollglas mit Einfassungsrahmen Anthrazit für Kunststofflichtschächte`, false, false, 1, 'extra'),
            createProduct('uv4-110991', 'extra-positionen', 'extra-positionen-sub', `ACO Rückwand für Kunststofflichtschächte mit 600 mm Tiefe`, 'uv4-110991', 150.15, 'Stk', `ACO Rückwand für Kunststofflichtschächte mit 600 mm Tiefe`, false, false, 1, 'extra'),
            createProduct('uv4-11112', 'extra-positionen', 'extra-positionen-sub', `ACO Therm® Block Erhöhungselement für Therm Block Standardmontage für Kunststofflichtschächte 1230x650 mm`, 'uv4-11112', 293.22, 'Stk', `ACO Therm® Block Erhöhungselement für Therm Block Standardmontage für Kunststofflichtschächte 1230x650 mm`, false, false, 1, 'extra'),
            createProduct('uv4-11133', 'extra-positionen', 'extra-positionen-sub', `ACO Therm® Block Leibungselement Set für Therm Block Set 1000x1000 mm für Kunststofflichtschächte`, 'uv4-11133', 238.24, 'Stk', `ACO Therm® Block Leibungselement Set für Therm Block Set 1000x1000 mm für Kunststofflichtschächte`, false, false, 1, 'extra')
          ]
        }
      ]
    }
  ]
};

export const packageRohbauSchornstein: RenovationPackage = {
  id: 'rohbauSchornstein',
  title: 'Schornstein',
  defaultArea: 1,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'art-der-ausfuehrung',
      title: 'Art der Ausführung',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'art-der-ausfuehrung-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('heiz-10006-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `SCHORNSTEIN | 🛠 Montage-Leistungspaket`, 'HEIZ-10006-Basis', 189, 'lfm', `🛠 Montage-Leistungspaket`, true, false, 10, 'service')
          ]
        }
      ]
    },
    {
      id: 'material',
      title: 'Material',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'material-sub',
          title: 'Leistungen & Materialien',
          type: 'material',
          products: [
            createProduct('743-13964', 'material', 'material-sub', `Wienerberger Kamtec FF 14 LW Fertigfuss inkl. Grundbausatz Zuschlag, HAN.: 34765462`, '743-13964', 1111, 'Stk', `Wienerberger Kamtec FF 14 LW Fertigfuss inkl. Grundbausatz Zuschlag, HAN.: 34765462`, true, false, 1, 'material'),
            createProduct('743-1018', 'material', 'material-sub', `Wienerberger ISSr 14 P Kamtec Kaminsystem 1 stgm, HAN.: 34865102`, '743-1018', 204.6, 'Stk', `Wienerberger ISSr 14 P Kamtec Kaminsystem 1 stgm, HAN.: 34865102`, true, false, 24, 'material'),
            createProduct('743-10059', 'material', 'material-sub', `Wienerberger Kamtec Mantelstein einzügig Planziegel ZMS 14, HAN.: 30054001`, '743-10059', 70.51, 'Stk', `Wienerberger Kamtec Mantelstein einzügig Planziegel ZMS 14, HAN.: 30054001`, true, false, 1, 'material'),
            createProduct('743-10109', 'material', 'material-sub', `Wienerberger Kamtec Muffenrohr, HAN.: 34859212`, '743-10109', 97.68, 'Stk', `Wienerberger Kamtec Muffenrohr, HAN.: 34859212`, true, false, 1, 'material'),
            createProduct('743-10175', 'material', 'material-sub', `Wienerberger Kamtec Rauchrohrstutzen, HAN.: 30053404`, '743-10175', 82.61, 'Stk', `Wienerberger Kamtec Rauchrohrstutzen, HAN.: 30053404`, true, false, 1, 'material')
          ]
        }
      ]
    },
    {
      id: 'extra-positionen',
      title: 'Extra Positionen',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'extra-positionen-sub',
          title: 'Leistungen & Materialien',
          type: 'extra',
          products: [
            createProduct('743-10122', 'extra-positionen', 'extra-positionen-sub', `Wienerberger Kamtec Sparrenhalterung, HAN.: 30054510`, '743-10122', 504.9, 'Stk', `Wienerberger Kamtec Sparrenhalterung, HAN.: 30054510`, true, false, 1, 'extra')
          ]
        }
      ]
    },
    {
      id: 'optionale-positionen',
      title: 'Optionale Positionen',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'optionale-positionen-sub',
          title: 'Leistungen & Materialien',
          type: 'optional',
          products: [
            createProduct('743-1204', 'optionale-positionen', 'optionale-positionen-sub', `Wienerberger LAS 1216 LW Kamtec Kaminsystem 1 stgm, HAN.: 34765146`, '743-1204', 545.6, 'Stk', `Wienerberger LAS 1216 LW Kamtec Kaminsystem 1 stgm, HAN.: 34765146`, false, true, 1, 'optional'),
            createProduct('743-10076', 'optionale-positionen', 'optionale-positionen-sub', `Wienerberger Kamtec Abströmkopf ASK 120, HAN.: 30056461`, '743-10076', 190.3, 'Stk', `Wienerberger Kamtec Abströmkopf ASK 120, HAN.: 30056461`, false, true, 1, 'optional'),
            createProduct('743-10042', 'optionale-positionen', 'optionale-positionen-sub', `Wienerberger Kamtec Krag und Abdeckplatte KP/AP-U 20 W für Untermauerung einzügig, HAN.: 34765655`, '743-10042', 457.6, 'Stk', `Wienerberger Kamtec Krag und Abdeckplatte KP/AP-U 20 W für Untermauerung einzügig, HAN.: 34765655`, false, true, 1, 'optional'),
            createProduct('743-10068', 'optionale-positionen', 'optionale-positionen-sub', `Wienerberger Kamtec ISSr Fugenkleber, HAN.: 30054461`, '743-10068', 68.75, 'Stk', `Wienerberger Kamtec ISSr Fugenkleber, HAN.: 30054461`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageRohbauMauerwerk: RenovationPackage = {
  id: 'rohbauMauerwerk',
  title: 'Mauerwerk',
  defaultArea: 100,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'art-der-ausfuehrung',
      title: 'Art der Ausführung',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'art-der-ausfuehrung-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('fass-10012', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `VERBLENDMAUERWERK | 🛠 Montage`, 'FASS-10012', 149, 'qm', `🛠 Montage`, true, false, 100, 'service')
          ]
        }
      ]
    },
    {
      id: 'material',
      title: 'Material',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'material-sub',
          title: 'Leistungen & Materialien',
          type: 'material',
          products: [
            createProduct('744-10030', 'material', 'material-sub', `Terca Klinker KMz 28-2,4-DF voll KK1 rotbunt glatt`, '744-10030', 2.42, 'Stk', `Terca Klinker KMz 28-2,4-DF voll KK1 rotbunt glatt`, true, false, 440, 'material'),
            createProduct('uv633-00009', 'material', 'material-sub', `Stebah Fugenmörtel - 25 Kg - Hellgrau`, 'uv633-00009', 23.3, 'Sack', `Stebah Fugenmörtel - 25 Kg - Hellgrau`, true, false, 6, 'material')
          ]
        }
      ]
    },
    {
      id: 'extra-positionen',
      title: 'Extra Positionen',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'extra-positionen-sub',
          title: 'Leistungen & Materialien',
          type: 'extra',
          products: [
            createProduct('uv31-00018', 'extra-positionen', 'extra-positionen-sub', `1A BAUCHEMIE T-FLEX TE C2 Flex Klebemörtel für keramische Wand- und Bodenbeläge im Innen- und Außenbereich grau`, 'uv31-00018', 19.73, 'Sack', `1A BAUCHEMIE T-FLEX TE C2 Flex Klebemörtel für keramische Wand- und Bodenbeläge im Innen- und Außenbereich grau`, true, false, 16, 'extra')
          ]
        }
      ]
    }
  ]
};

export const packageRohbauPflastern: RenovationPackage = {
  id: 'rohbauPflastern',
  title: 'Pflastern',
  defaultArea: 100,
  defaultFloorCount: 1,
  categories: [
    {
      id: 'art-der-ausfuehrung',
      title: 'Art der Ausführung',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'art-der-ausfuehrung-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('gart-10008-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `PFLASTERN MIT STEINE | 🛠 Montage-Leistungspaket`, 'GART-10008-Basis', 19, 'qm', `🛠 Montage-Leistungspaket`, true, false, 20, 'service')
          ]
        }
      ]
    },
    {
      id: 'material',
      title: 'Material',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'material-sub',
          title: 'Leistungen & Materialien',
          type: 'material',
          products: [
            createProduct('uv881-01020', 'material', 'material-sub', `Diephaus Pflasterstein Lineo Quarzit PE2`, 'uv881-01020', 47.54, 'Stk', `Diephaus Pflasterstein Lineo Quarzit PE2`, true, false, 40, 'material')
          ]
        }
      ]
    },
    {
      id: 'optionale-positionen',
      title: 'Optionale Positionen',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'optionale-positionen-sub',
          title: 'Leistungen & Materialien',
          type: 'optional',
          products: [
            createProduct('uv881-01018', 'optionale-positionen', 'optionale-positionen-sub', `Diephaus Pflasterstein Lineo Muschelkalk PE2`, 'uv881-01018', 47.54, 'Stk', `Diephaus Pflasterstein Lineo Muschelkalk PE2`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};
