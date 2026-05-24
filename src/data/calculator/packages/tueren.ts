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

export const packageTuerenAlles: RenovationPackage = {
  id: 'tuerenAlles',
  title: 'Alles zu Türen',
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
            createProduct('tuer-100-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `TÜREN | 🛠 Montage-Leistungspaket`, 'TUER-100-BASIS', 149.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('tuer-101-1-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ALT-TÜREN |🛠 Demontage & Entsorgung`, 'TUER-101-1-ZU', 49.5, 'Stk', `🛠 Demontage & Entsorgung`, true, false, 1, 'service'),
            createProduct('tuer-100-au', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Weitere Produkte - zu TÜREN |**Varianten**`, 'TUER-100-AU', 0, 'Stk', `**Varianten**`, false, true, 1, 'optional'),
            createProduct('tuer-10001-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `GARAGENTOR | 🛠 Montage-Leistungspaket`, 'TUER-10001-Basis', 1490, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('tuer-101-mon', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `TOR | 🛠 Montage`, 'TUER-101-MON', 690, 'Stk', `🛠 Montage`, true, false, 1, 'service')
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
            createProduct('uv339-90130', 'material', 'material-sub', `JELD-WEN Innentürelement Optima 30 (Zarge + Türblatt) - Rundkante - DuriTop CPL Weisslack`, 'uv339-90130', 387.59, 'Stk', `JELD-WEN Innentürelement Optima 30 (Zarge + Türblatt) - Rundkante - DuriTop CPL Weisslack`, true, false, 1, 'material'),
            createProduct('uv354-10091', 'material', 'material-sub', `Karcher Design Rosettengarnitur Rhodos PLAN-Rosetten flächenbündig 2-tlg. | Edelstahl matt`, 'uv354-10091', 57.56, 'Stk', `Edelstahl matt`, true, false, 1, 'material'),
            createProduct('uv339-90246', 'material', 'material-sub', `JELD-WEN Innentürelement Optima 30 (Zarge + Türblatt) - Rundkante - DuriTop CPL Weisslack`, 'uv339-90246', 442.61, 'Stk', `JELD-WEN Innentürelement Optima 30 (Zarge + Türblatt) - Rundkante - DuriTop CPL Weisslack`, true, false, 1, 'material'),
            createProduct('uv218-165', 'material', 'material-sub', `FM Nebeneingangstür NBT 56 Modell 05 Weiss`, 'uv218-165', 547.8, 'Stk', `FM Nebeneingangstür NBT 56 Modell 05 Weiss`, true, false, 1, 'material'),
            createProduct('165466', 'material', 'material-sub', `BBE Stahl-Staenderwerkzarge Typ Bud 875x 2000x 125 mm DIN L/R`, '165466', 235.99, 'Stk', `BBE Stahl-Staenderwerkzarge Typ Bud 875x 2000x 125 mm DIN L/R`, true, false, 1, 'material'),
            createProduct('uv501-705', 'material', 'material-sub', `Novoferm Sektionaltor iso 20 Grosssicke Woodgrain Verkehrsweiss`, 'uv501-705', 1604.44, 'Stk', `Novoferm Sektionaltor iso 20 Grosssicke Woodgrain Verkehrsweiss`, true, false, 1, 'material'),
            createProduct('1172244', 'material', 'material-sub', `Terralis Schiebetor Rundstaebe steingrau B=300 cm H=120 cm E-Antrieb+Handsender`, '1172244', 6684.16, 'Stk', `Terralis Schiebetor Rundstaebe steingrau B=300 cm H=120 cm E-Antrieb+Handsender`, true, false, 1, 'material')
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
            createProduct('uv293-17108', 'optionale-positionen', 'optionale-positionen-sub', `Herholz Innentürelement Modern Decora horizontal CPL (Zarge+Türblatt) - SR-Kante - Sandbirke`, 'uv293-17108', 276.22, 'Stk', `Herholz Innentürelement Modern Decora horizontal CPL (Zarge+Türblatt) - SR-Kante - Sandbirke`, false, true, 1, 'optional'),
            createProduct('uv293-17316', 'optionale-positionen', 'optionale-positionen-sub', `Herholz Innentürelement Modern Decora horizontal CPL (Zarge+Türblatt) - SR-Kante - Sandbirke`, 'uv293-17316', 298.54, 'Stk', `Herholz Innentürelement Modern Decora horizontal CPL (Zarge+Türblatt) - SR-Kante - Sandbirke`, false, true, 1, 'optional'),
            createProduct('1013690', 'optionale-positionen', 'optionale-positionen-sub', `Pruem TB CK4 RS-KA Weißlack ex cl 610x 1985 mm DIN R BB Band 2-tlg vern`, '1013690', 162.03, 'Stk', `Pruem TB CK4 RS-KA Weißlack ex cl 610x 1985 mm DIN R BB Band 2-tlg vern`, false, true, 1, 'optional'),
            createProduct('1013695', 'optionale-positionen', 'optionale-positionen-sub', `Pruem TB CK4 RS-KA Weißlack ex cl 985x 1985 mm DIN L BB Band 2-tlg vern`, '1013695', 171.14, 'Stk', `Pruem TB CK4 RS-KA Weißlack ex cl 985x 1985 mm DIN L BB Band 2-tlg vern`, false, true, 1, 'optional'),
            createProduct('144904', 'optionale-positionen', 'optionale-positionen-sub', `Pruem Zarge FU-RF Weißlack 610x 2110x 125 mm DIN L`, '144904', 97.58, 'Stk', `Pruem Zarge FU-RF Weißlack 610x 2110x 125 mm DIN L`, false, true, 1, 'optional'),
            createProduct('1194968', 'optionale-positionen', 'optionale-positionen-sub', `Weißlack Schiebetuer, RS-Einlage, stumpf 860x 1985 mm, Giffmuschel u. Bodennut`, '1194968', 299.01, 'Stk', `Weißlack Schiebetuer, RS-Einlage, stumpf 860x 1985 mm, Giffmuschel u. Bodennut`, false, true, 1, 'optional'),
            createProduct('uv789-648', 'optionale-positionen', 'optionale-positionen-sub', `Griffwerk PLANEO 120 COMFORT Schiebetürsystem für Holztür - Deckenmontage`, 'uv789-648', 700.96, 'Stk', `Griffwerk PLANEO 120 COMFORT Schiebetürsystem für Holztür - Deckenmontage`, false, true, 1, 'optional'),
            createProduct('uv789-10221', 'optionale-positionen', 'optionale-positionen-sub', `Griffwerk Glasschiebetür ESG Typo 688`, 'uv789-10221', 321.5, 'Stk', `Griffwerk Glasschiebetür ESG Typo 688`, false, true, 1, 'optional'),
            createProduct('uv789-3122', 'optionale-positionen', 'optionale-positionen-sub', `Griffwerk Glasdrehtür ESG All Satin 501 Studio/Office - Basic Green matt`, 'uv789-3122', 248.16, 'Stk', `Griffwerk Glasdrehtür ESG All Satin 501 Studio/Office - Basic Green matt`, false, true, 1, 'optional'),
            createProduct('uv789-125', 'optionale-positionen', 'optionale-positionen-sub', `Griffwerk CLASSICO Ganzglastürbeschlagset - 3-teiliger Bandsatz - mit Griff LUCIA PROF`, 'uv789-125', 219.95, 'Stk', `Griffwerk CLASSICO Ganzglastürbeschlagset - 3-teiliger Bandsatz - mit Griff LUCIA PROF`, false, true, 1, 'optional'),
            createProduct('uv789-3785', 'optionale-positionen', 'optionale-positionen-sub', `Griffwerk Glasdrehtür ESG 3D 636 Studio/Office`, 'uv789-3785', 523.24, 'Stk', `Griffwerk Glasdrehtür ESG 3D 636 Studio/Office`, false, true, 1, 'optional'),
            createProduct('uv789-10221-2', 'optionale-positionen', 'optionale-positionen-sub', `Griffwerk Glasschiebetür ESG Typo 688`, 'uv789-10221', 321.5, 'Stk', `Griffwerk Glasschiebetür ESG Typo 688`, false, true, 1, 'optional'),
            createProduct('uv789-653', 'optionale-positionen', 'optionale-positionen-sub', `Griffwerk R8 - Schiebetürsystem für Glastür - Wandmontage`, 'uv789-653', 478.03, 'Stk', `Griffwerk R8 - Schiebetürsystem für Glastür - Wandmontage`, false, true, 1, 'optional'),
            createProduct('uv218-10284', 'optionale-positionen', 'optionale-positionen-sub', `FM Aluminium Haustür DS 92 Modell 04 Anthrazit mit Vierfachverglasung`, 'uv218-10284', 1755.6, 'Stk', `FM Aluminium Haustür DS 92 Modell 04 Anthrazit mit Vierfachverglasung`, false, true, 1, 'optional'),
            createProduct('1074251', 'optionale-positionen', 'optionale-positionen-sub', `Bayerwald Alu-Haustuer Modell 4201 RW4 1100x 2100 mm DIN R`, '1074251', 12205.22, 'Stk', `Bayerwald Alu-Haustuer Modell 4201 RW4 1100x 2100 mm DIN R`, false, true, 1, 'optional'),
            createProduct('uv308-106', 'optionale-positionen', 'optionale-positionen-sub', `Hömann Sektionaltor RenoMatic 42 waagerechte L-Sicke Slategrain`, 'uv308-106', 1827.03, 'Stk', `Hömann Sektionaltor RenoMatic 42 waagerechte L-Sicke Slategrain`, false, true, 1, 'optional'),
            createProduct('1172107', 'optionale-positionen', 'optionale-positionen-sub', `Terralis Schiebetor 6/5/6 mm steingrau B=500 cm H=160 cm E-Antrieb+Handsender`, '1172107', 8736.14, 'Stk', `Terralis Schiebetor 6/5/6 mm steingrau B=500 cm H=160 cm E-Antrieb+Handsender`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageTuerenZimmertueren: RenovationPackage = {
  id: 'tuerenZimmertueren',
  title: 'Zimmertüren',
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
            createProduct('tuer-100-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `TÜREN | 🛠 Montage-Leistungspaket`, 'TUER-100-BASIS', 149.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('tuer-101-1-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ALT-TÜREN |🛠 Demontage & Entsorgung`, 'TUER-101-1-ZU', 49.5, 'Stk', `🛠 Demontage & Entsorgung`, true, false, 1, 'service'),
            createProduct('tuer-100-au', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Weitere Produkte - zu TÜREN |**Varianten**`, 'TUER-100-AU', 0, 'Stk', `**Varianten**`, false, true, 1, 'optional')
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
            createProduct('uv339-90130', 'material', 'material-sub', `JELD-WEN Innentürelement Optima 30 (Zarge + Türblatt) - Rundkante - DuriTop CPL Weisslack`, 'uv339-90130', 387.59, 'Stk', `JELD-WEN Innentürelement Optima 30 (Zarge + Türblatt) - Rundkante - DuriTop CPL Weisslack`, true, false, 1, 'material'),
            createProduct('uv354-10091', 'material', 'material-sub', `Karcher Design Rosettengarnitur Rhodos PLAN-Rosetten flächenbündig 2-tlg. | Edelstahl matt`, 'uv354-10091', 57.56, 'Stk', `Edelstahl matt`, true, false, 1, 'material'),
            createProduct('uv339-90246', 'material', 'material-sub', `JELD-WEN Innentürelement Optima 30 (Zarge + Türblatt) - Rundkante - DuriTop CPL Weisslack`, 'uv339-90246', 442.61, 'Stk', `JELD-WEN Innentürelement Optima 30 (Zarge + Türblatt) - Rundkante - DuriTop CPL Weisslack`, true, false, 1, 'material')
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
            createProduct('uv293-17108', 'optionale-positionen', 'optionale-positionen-sub', `Herholz Innentürelement Modern Decora horizontal CPL (Zarge+Türblatt) - SR-Kante - Sandbirke`, 'uv293-17108', 276.22, 'Stk', `Herholz Innentürelement Modern Decora horizontal CPL (Zarge+Türblatt) - SR-Kante - Sandbirke`, false, true, 1, 'optional'),
            createProduct('uv293-17316', 'optionale-positionen', 'optionale-positionen-sub', `Herholz Innentürelement Modern Decora horizontal CPL (Zarge+Türblatt) - SR-Kante - Sandbirke`, 'uv293-17316', 298.54, 'Stk', `Herholz Innentürelement Modern Decora horizontal CPL (Zarge+Türblatt) - SR-Kante - Sandbirke`, false, true, 1, 'optional'),
            createProduct('1013690', 'optionale-positionen', 'optionale-positionen-sub', `Pruem TB CK4 RS-KA Weißlack ex cl 610x 1985 mm DIN R BB Band 2-tlg vern`, '1013690', 162.03, 'Stk', `Pruem TB CK4 RS-KA Weißlack ex cl 610x 1985 mm DIN R BB Band 2-tlg vern`, false, true, 1, 'optional'),
            createProduct('1013695', 'optionale-positionen', 'optionale-positionen-sub', `Pruem TB CK4 RS-KA Weißlack ex cl 985x 1985 mm DIN L BB Band 2-tlg vern`, '1013695', 171.14, 'Stk', `Pruem TB CK4 RS-KA Weißlack ex cl 985x 1985 mm DIN L BB Band 2-tlg vern`, false, true, 1, 'optional'),
            createProduct('144904', 'optionale-positionen', 'optionale-positionen-sub', `Pruem Zarge FU-RF Weißlack 610x 2110x 125 mm DIN L`, '144904', 97.58, 'Stk', `Pruem Zarge FU-RF Weißlack 610x 2110x 125 mm DIN L`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageTuerenSchiebetueren: RenovationPackage = {
  id: 'tuerenSchiebetueren',
  title: 'Schiebetüren',
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
            createProduct('tuer-100-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `TÜREN | 🛠 Montage-Leistungspaket`, 'TUER-100-BASIS', 149.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('tuer-101-1-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ALT-TÜREN |🛠 Demontage & Entsorgung`, 'TUER-101-1-ZU', 49.5, 'Stk', `🛠 Demontage & Entsorgung`, true, false, 1, 'service'),
            createProduct('tuer-100-au', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Weitere Produkte - zu TÜREN |**Varianten**`, 'TUER-100-AU', 0, 'Stk', `**Varianten**`, false, true, 1, 'optional')
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
            createProduct('1194968', 'material', 'material-sub', `Weißlack Schiebetuer, RS-Einlage, stumpf 860x 1985 mm, Giffmuschel u. Bodennut`, '1194968', 299.01, 'Stk', `Weißlack Schiebetuer, RS-Einlage, stumpf 860x 1985 mm, Giffmuschel u. Bodennut`, true, false, 1, 'material'),
            createProduct('uv789-648', 'material', 'material-sub', `Griffwerk PLANEO 120 COMFORT Schiebetürsystem für Holztür - Deckenmontage`, 'uv789-648', 700.96, 'Stk', `Griffwerk PLANEO 120 COMFORT Schiebetürsystem für Holztür - Deckenmontage`, true, false, 1, 'service')
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
            createProduct('uv789-10221', 'optionale-positionen', 'optionale-positionen-sub', `Griffwerk Glasschiebetür ESG Typo 688`, 'uv789-10221', 321.5, 'Stk', `Griffwerk Glasschiebetür ESG Typo 688`, false, true, 1, 'optional'),
            createProduct('uv789-653', 'optionale-positionen', 'optionale-positionen-sub', `Griffwerk R8 - Schiebetürsystem für Glastür - Wandmontage`, 'uv789-653', 478.03, 'Stk', `Griffwerk R8 - Schiebetürsystem für Glastür - Wandmontage`, false, true, 1, 'optional'),
            createProduct('uv767-10091', 'optionale-positionen', 'optionale-positionen-sub', `Wingburg Belport B1T-H Schiebetürsystem zargenlos für Trockenbauwand, 1-flügelig für Holztürblatt`, 'uv767-10091', 848.87, 'Stk', `Wingburg Belport B1T-H Schiebetürsystem zargenlos für Trockenbauwand, 1-flügelig für Holztürblatt`, false, true, 1, 'optional'),
            createProduct('uv767-10655', 'optionale-positionen', 'optionale-positionen-sub', `Wingburg Belport B2T-G Schiebetürsystem zargenlos für Trockenbauwand, 2-flügelig für Glastürblatt`, 'uv767-10655', 1929.47, 'Stk', `Wingburg Belport B2T-G Schiebetürsystem zargenlos für Trockenbauwand, 2-flügelig für Glastürblatt`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageTuerenGlastueren: RenovationPackage = {
  id: 'tuerenGlastueren',
  title: 'Glastüren',
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
            createProduct('tuer-100-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `TÜREN | 🛠 Montage-Leistungspaket`, 'TUER-100-BASIS', 149.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('tuer-101-1-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ALT-TÜREN |🛠 Demontage & Entsorgung`, 'TUER-101-1-ZU', 49.5, 'Stk', `🛠 Demontage & Entsorgung`, true, false, 1, 'service'),
            createProduct('tuer-100-au', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Weitere Produkte - zu TÜREN |**Varianten**`, 'TUER-100-AU', 0, 'Stk', `**Varianten**`, false, true, 1, 'optional')
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
            createProduct('uv789-3122', 'material', 'material-sub', `Griffwerk Glasdrehtür ESG All Satin 501 Studio/Office - Basic Green matt`, 'uv789-3122', 248.16, 'Stk', `Griffwerk Glasdrehtür ESG All Satin 501 Studio/Office - Basic Green matt`, true, false, 1, 'material'),
            createProduct('uv789-125', 'material', 'material-sub', `Griffwerk CLASSICO Ganzglastürbeschlagset - 3-teiliger Bandsatz - mit Griff LUCIA PROF`, 'uv789-125', 219.95, 'Stk', `Griffwerk CLASSICO Ganzglastürbeschlagset - 3-teiliger Bandsatz - mit Griff LUCIA PROF`, true, false, 1, 'material')
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
            createProduct('uv789-3785', 'optionale-positionen', 'optionale-positionen-sub', `Griffwerk Glasdrehtür ESG 3D 636 Studio/Office`, 'uv789-3785', 523.24, 'Stk', `Griffwerk Glasdrehtür ESG 3D 636 Studio/Office`, false, true, 1, 'optional'),
            createProduct('uv789-10221', 'optionale-positionen', 'optionale-positionen-sub', `Griffwerk Glasschiebetür ESG Typo 688`, 'uv789-10221', 321.5, 'Stk', `Griffwerk Glasschiebetür ESG Typo 688`, false, true, 1, 'optional'),
            createProduct('uv789-653', 'optionale-positionen', 'optionale-positionen-sub', `Griffwerk R8 - Schiebetürsystem für Glastür - Wandmontage`, 'uv789-653', 478.03, 'Stk', `Griffwerk R8 - Schiebetürsystem für Glastür - Wandmontage`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageTuerenBalkonTerrassen: RenovationPackage = {
  id: 'tuerenBalkonTerrassen',
  title: 'Balkon/Terrasse',
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
            createProduct('mon-10238', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `HEBESCHIEBE | 🛠 Montage`, 'MON-10238', 395, 'qm', `🛠 Montage`, true, false, 1, 'service'),
            createProduct('tuer-101-1-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ALT-TÜREN |🛠 Demontage & Entsorgung`, 'TUER-101-1-ZU', 49.5, 'Stk', `🛠 Demontage & Entsorgung`, true, false, 1, 'service')
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
            createProduct('fens-701-1', 'material', 'material-sub', `Hebeschiebetür Schüco EasySlide CT 70`, 'FENS-701.1', 4163.69, 'Stk', `Hebeschiebetür Schüco EasySlide CT 70`, true, false, 1, 'material')
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
            createProduct('fens-601-11', 'optionale-positionen', 'optionale-positionen-sub', `PSK Tür Kunststoff Schüco LivIng 82 AS`, 'FENS-601.11', 2780.88, 'Stk', `PSK Tür Kunststoff Schüco LivIng 82 AS`, false, true, 1, 'optional'),
            createProduct('fens-501-10', 'optionale-positionen', 'optionale-positionen-sub', `Balkontür Kunststoff Schüco LivIng 82 AS`, 'FENS-501.10', 653.19, 'Stk', `Balkontür Kunststoff Schüco LivIng 82 AS`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageTuerenHaustueren: RenovationPackage = {
  id: 'tuerenHaustueren',
  title: 'Haustüren',
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
            createProduct('tuer-100-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `TÜREN | 🛠 Montage-Leistungspaket`, 'TUER-100-BASIS', 149.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('tuer-101-1-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ALT-TÜREN |🛠 Demontage & Entsorgung`, 'TUER-101-1-ZU', 49.5, 'Stk', `🛠 Demontage & Entsorgung`, true, false, 1, 'service')
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
            createProduct('uv218-10284', 'material', 'material-sub', `FM Aluminium Haustür DS 92 Modell 04 Anthrazit mit Vierfachverglasung`, 'uv218-10284', 1755.6, 'Stk', `FM Aluminium Haustür DS 92 Modell 04 Anthrazit mit Vierfachverglasung`, true, false, 1, 'material')
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
            createProduct('1074251', 'optionale-positionen', 'optionale-positionen-sub', `Bayerwald Alu-Haustuer Modell 4201 RW4 1100x 2100 mm DIN R`, '1074251', 12205.22, 'Stk', `Bayerwald Alu-Haustuer Modell 4201 RW4 1100x 2100 mm DIN R`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageTuerenKellertueren: RenovationPackage = {
  id: 'tuerenKellertueren',
  title: 'Kellertüren',
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
            createProduct('tuer-100-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `TÜREN | 🛠 Montage-Leistungspaket`, 'TUER-100-BASIS', 149.9, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('tuer-101-1-zu', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ALT-TÜREN |🛠 Demontage & Entsorgung`, 'TUER-101-1-ZU', 49.5, 'Stk', `🛠 Demontage & Entsorgung`, true, false, 1, 'service')
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
            createProduct('uv218-165', 'material', 'material-sub', `FM Nebeneingangstür NBT 56 Modell 05 Weiss`, 'uv218-165', 547.8, 'Stk', `FM Nebeneingangstür NBT 56 Modell 05 Weiss`, true, false, 1, 'material'),
            createProduct('165466', 'material', 'material-sub', `BBE Stahl-Staenderwerkzarge Typ Bud 875x 2000x 125 mm DIN L/R`, '165466', 235.99, 'Stk', `BBE Stahl-Staenderwerkzarge Typ Bud 875x 2000x 125 mm DIN L/R`, true, false, 1, 'material')
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
            createProduct('uv354-10094', 'extra-positionen', 'extra-positionen-sub', `Karcher Design Rosettengarnitur Rhodos PLAN-Rosetten flächenbündig 2-tlg. | Edelstahl matt`, 'uv354-10094', 57.56, 'Stk', `Edelstahl matt`, true, false, 1, 'extra')
          ]
        }
      ]
    }
  ]
};

export const packageTuerenGaragentore: RenovationPackage = {
  id: 'tuerenGaragentore',
  title: 'Garagentore',
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
            createProduct('tuer-10001-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `GARAGENTOR | 🛠 Montage-Leistungspaket`, 'TUER-10001-Basis', 1490, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
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
            createProduct('uv501-705', 'material', 'material-sub', `Novoferm Sektionaltor iso 20 Grosssicke Woodgrain Verkehrsweiss`, 'uv501-705', 1604.44, 'Stk', `Novoferm Sektionaltor iso 20 Grosssicke Woodgrain Verkehrsweiss`, true, false, 1, 'material')
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
            createProduct('uv308-106', 'optionale-positionen', 'optionale-positionen-sub', `Hömann Sektionaltor RenoMatic 42 waagerechte L-Sicke Slategrain`, 'uv308-106', 1827.03, 'Stk', `Hömann Sektionaltor RenoMatic 42 waagerechte L-Sicke Slategrain`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageTuerenToreEinfahrt: RenovationPackage = {
  id: 'tuerenToreEinfahrt',
  title: 'Tore/Einfahrt',
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
            createProduct('tuer-101-mon', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `TOR | 🛠 Montage`, 'TUER-101-MON', 690, 'Stk', `🛠 Montage`, true, false, 1, 'service')
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
            createProduct('1172244', 'material', 'material-sub', `Terralis Schiebetor Rundstaebe steingrau B=300 cm H=120 cm E-Antrieb+Handsender`, '1172244', 6684.16, 'Stk', `Terralis Schiebetor Rundstaebe steingrau B=300 cm H=120 cm E-Antrieb+Handsender`, true, false, 1, 'material')
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
            createProduct('1172107', 'optionale-positionen', 'optionale-positionen-sub', `Terralis Schiebetor 6/5/6 mm steingrau B=500 cm H=160 cm E-Antrieb+Handsender`, '1172107', 8736.14, 'Stk', `Terralis Schiebetor 6/5/6 mm steingrau B=500 cm H=160 cm E-Antrieb+Handsender`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};
