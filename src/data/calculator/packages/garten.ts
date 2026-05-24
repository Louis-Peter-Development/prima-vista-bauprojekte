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

export const packageGartenAlles: RenovationPackage = {
  id: 'gartenAlles',
  title: 'Alles zu Garten',
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
            createProduct('gart-10001-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `BELEUCHTUNG IM GARTEN | 🛠 Montage-Leistungspaket`, 'GART-10001-Basis', 129, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('lht-94741', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `LED Pollerleuchte Bako 50cm IP44 Anthrazit`, 'LHT-94741', 54.54, 'Stk', `LED Pollerleuchte Bako 50cm IP44 Anthrazit`, true, false, 1, 'material'),
            createProduct('gart-10002-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `BLOCKSTUFEN | 🛠 Montage-Leistungspaket`, 'GART-10002-Basis', 195, 'lfm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('uv628-04021', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Seltra Blockstufe BIASCA satiniert 15x35 cm Silbergrau-liniert Gneis`, 'uv628-04021', 184.94, 'Stk', `Seltra Blockstufe BIASCA satiniert 15x35 cm Silbergrau-liniert Gneis`, true, false, 1, 'material'),
            createProduct('gart-10004-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `HOCHBEET | 🛠 Montage-Leistungspaket`, 'GART-10004-Basis', 95, 'qm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('uv66-20633', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Biohort HochBeet`, 'uv66-20633', 390.5, 'Stk', `Biohort HochBeet`, true, false, 1, 'material'),
            createProduct('carp-10002-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `CARPORTBAU AN BESTEHENDEM GEBÄUDE | Montage-Leistungspaket`, 'CARP-10002-Basis', 695, 'Stk', `Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('uv595-30018', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Skan Holz Carport Eifel mit Bogen mit Doppelstegplatten`, 'uv595-30018', 2848.95, 'Stk', `Skan Holz Carport Eifel mit Bogen mit Doppelstegplatten`, true, false, 1, 'material'),
            createProduct('carp-10002-basis-2', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `CARPORTBAU AN BESTEHENDEM GEBÄUDE | Montage-Leistungspaket`, 'CARP-10002-Basis', 695, 'Stk', `Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('uv595-30018-2', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Skan Holz Carport Eifel mit Bogen mit Doppelstegplatten`, 'uv595-30018', 2848.95, 'Stk', `Skan Holz Carport Eifel mit Bogen mit Doppelstegplatten`, true, false, 1, 'material'),
            createProduct('gart-10005-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `GARTENHAUS | 🛠 Montage-Leistungspaket`, 'GART-10005-Basis', 149, 'qm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('uv595-10098', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Skan Holz Gartenhaus Porto Natur mit Vordach 40 cm`, 'uv595-10098', 2001.95, 'Stk', `Skan Holz Gartenhaus Porto Natur mit Vordach 40 cm`, true, false, 1, 'material'),
            createProduct('gart-10006-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `GERÄTEHAUS | 🛠 Montage-Leistungspaket`, 'GART-10006-Basis', 149, 'qm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('uv66-20086', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Biohort Europa Gerätehaus - Gerätehütte`, 'uv66-20086', 789.79, 'Stk', `Biohort Europa Gerätehaus - Gerätehütte`, true, false, 1, 'material'),
            createProduct('gart-10007-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `PAVILLON | 🛠 Montage-Leistungspaket`, 'GART-10007-Basis', 129, 'qm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('uv595-40073', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Skan Holz 6-Eck Pavillon Versailles`, 'uv595-40073', 3904.93, 'Stk', `Skan Holz 6-Eck Pavillon Versailles`, true, false, 1, 'material'),
            createProduct('gart-10007-basis-2', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `PAVILLON | 🛠 Montage-Leistungspaket`, 'GART-10007-Basis', 129, 'qm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('uv595-40073-2', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Skan Holz 6-Eck Pavillon Versailles`, 'uv595-40073', 3904.93, 'Stk', `Skan Holz 6-Eck Pavillon Versailles`, true, false, 1, 'material'),
            createProduct('gart-10008-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `PFLASTERN MIT STEINE | 🛠 Montage-Leistungspaket`, 'GART-10008-Basis', 19, 'qm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('uv881-01020', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Diephaus Pflasterstein Lineo Quarzit PE2`, 'uv881-01020', 47.54, 'Stk', `Diephaus Pflasterstein Lineo Quarzit PE2`, true, false, 1, 'material'),
            createProduct('gart-10009-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `TERRASSEN AUS HOLZ | 🛠 Montage-Leistungspaket`, 'GART-10009-Basis', 149, 'qm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('uv399-00135', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Kovalex WPC-Terrassendiele mit Struktur Walnussfarben mattiert - 145x20 mm Massiv | Längen-Zuschnitt`, 'uv399-00135', 13.3, 'lfm', `Längen-Zuschnitt`, true, false, 1, 'material'),
            createProduct('399-00283', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Kovalex WPC-Universal-Unterkonstruktion Schwarz 300 cm`, '399-00283', 26.07, 'Stk', `Kovalex WPC-Universal-Unterkonstruktion Schwarz 300 cm`, true, false, 1, 'material'),
            createProduct('gart-10010-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `TERRASSEN AUS STEIN | 🛠 Montage-Leistungspaket`, 'GART-10010-Basis', 129, 'qm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('769-116', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Mirage Evo_2/E Tribeca Harrison TB 02 - 60 x 60 x 2 cm - Feinsteinzeug Terrassenplatten`, '769-116', 63.69, 'Stk', `Mirage Evo_2/E Tribeca Harrison TB 02 - 60 x 60 x 2 cm - Feinsteinzeug Terrassenplatten`, true, false, 1, 'material'),
            createProduct('gart-10011-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ÜBERDACHUNG | 🛠 Montage-Leistungspaket`, 'GART-10011-Basis', 195, 'qm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('uv232-525', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Gardendreams Terrassenüberdachung Alu anthrazit Glanz`, 'uv232-525', 1978.68, 'Stk', `Gardendreams Terrassenüberdachung Alu anthrazit Glanz`, true, false, 1, 'material'),
            createProduct('gart-10012-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `WINTERGÄRTEN | 🛠 Montage-Leistungspaket`, 'GART-10012-Basis', 249, 'qm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service'),
            createProduct('uv232-325', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Gardendreams Terrassenüberdachung Legend Alu cremeweiß`, 'uv232-325', 1978.68, 'Stk', `Gardendreams Terrassenüberdachung Legend Alu cremeweiß`, true, false, 1, 'material'),
            createProduct('mon-100-stk', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `MONTAGE | 🛠 Montage 100`, 'MON-100-stk', 999.9, 'Stk', `🛠 Montage 100`, true, false, 1, 'service'),
            createProduct('uv563-01018', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `Rewatec NEO Gartenanlage Basic`, 'uv563-01018', 1946.93, 'Stk', `Rewatec NEO Gartenanlage Basic`, true, false, 1, 'material')
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
            createProduct('lht-661-320', 'optionale-positionen', 'optionale-positionen-sub', `Konstsmide Mode Zink Sockelleuchte E27 IP54`, 'LHT-661-320', 261.68, 'Stk', `Konstsmide Mode Zink Sockelleuchte E27 IP54`, false, true, 1, 'optional'),
            createProduct('lht-94828', 'optionale-positionen', 'optionale-positionen-sub', `Paulmann 94828 LED Pollerleuchte Zenera IP44`, 'LHT-94828', 142.51, 'Stk', `Paulmann 94828 LED Pollerleuchte Zenera IP44`, false, true, 1, 'optional'),
            createProduct('lht-48688-06', 'optionale-positionen', 'optionale-positionen-sub', `Brilliant Istria 3-flg. Außenleuchte E27 IP23`, 'LHT-48688-06', 249.78, 'Stk', `Brilliant Istria 3-flg. Außenleuchte E27 IP23`, false, true, 1, 'optional'),
            createProduct('uv353-00813', 'optionale-positionen', 'optionale-positionen-sub', `KANN La Tierra Blockstufe Sunset`, 'uv353-00813', 38.02, 'Stk', `KANN La Tierra Blockstufe Sunset`, false, true, 1, 'optional'),
            createProduct('uv353-00822', 'optionale-positionen', 'optionale-positionen-sub', `KANN Travino Blockstufe sandstein`, 'uv353-00822', 50.96, 'Stk', `KANN Travino Blockstufe sandstein`, false, true, 1, 'optional'),
            createProduct('mon-10142', 'optionale-positionen', 'optionale-positionen-sub', `HOCHBETE| 🛠 Montage`, 'MON-10142', 295, 'Stk', `🛠 Montage`, false, true, 1, 'optional'),
            createProduct('uv237-00169', 'optionale-positionen', 'optionale-positionen-sub', `Gerwing GerloCastell "Hochbeet" rechteckig MURADA beige-hell`, 'uv237-00169', 874.5, 'Set', `Gerwing GerloCastell "Hochbeet" rechteckig MURADA beige-hell`, false, true, 1, 'optional'),
            createProduct('uv595-30003', 'optionale-positionen', 'optionale-positionen-sub', `Skan Holz Caravan-Carport Emsland mit Aluminium-Dachplatten`, 'uv595-30003', 4168.93, 'Stk', `Skan Holz Caravan-Carport Emsland mit Aluminium-Dachplatten`, false, true, 1, 'optional'),
            createProduct('uv595-30003-2', 'optionale-positionen', 'optionale-positionen-sub', `Skan Holz Caravan-Carport Emsland mit Aluminium-Dachplatten`, 'uv595-30003', 4168.93, 'Stk', `Skan Holz Caravan-Carport Emsland mit Aluminium-Dachplatten`, false, true, 1, 'optional'),
            createProduct('uv595-10004', 'optionale-positionen', 'optionale-positionen-sub', `Skan Holz Gartenhaus Basel Natur`, 'uv595-10004', 6584.53, 'Stk', `Skan Holz Gartenhaus Basel Natur`, false, true, 1, 'optional'),
            createProduct('uv66-20125', 'optionale-positionen', 'optionale-positionen-sub', `Biohort HighLine Gerätehaus - Geräteschuppen`, 'uv66-20125', 1970.09, 'Stk', `Biohort HighLine Gerätehaus - Geräteschuppen`, false, true, 1, 'optional'),
            createProduct('uv595-40026', 'optionale-positionen', 'optionale-positionen-sub', `Skan Holz 4-Eck Pavillon Orleans`, 'uv595-40026', 5884.95, 'Stk', `Skan Holz 4-Eck Pavillon Orleans`, false, true, 1, 'optional'),
            createProduct('uv595-40026-2', 'optionale-positionen', 'optionale-positionen-sub', `Skan Holz 4-Eck Pavillon Orleans`, 'uv595-40026', 5884.95, 'Stk', `Skan Holz 4-Eck Pavillon Orleans`, false, true, 1, 'optional'),
            createProduct('uv881-01018', 'optionale-positionen', 'optionale-positionen-sub', `Diephaus Pflasterstein Lineo Muschelkalk PE2`, 'uv881-01018', 47.54, 'Stk', `Diephaus Pflasterstein Lineo Muschelkalk PE2`, false, true, 1, 'optional'),
            createProduct('756-2360', 'optionale-positionen', 'optionale-positionen-sub', `Novabell Terrassenplatte 40x120x2cm NOVA ARTWOOD honey RT | AWD42RT`, '756-2360', 111.1, 'Stk', `AWD42RT`, false, true, 1, 'optional'),
            createProduct('uv773-01162', 'optionale-positionen', 'optionale-positionen-sub', `EHL Milena-Terrassenplatte basalt gestrahlt`, 'uv773-01162', 62.45, 'Stk', `EHL Milena-Terrassenplatte basalt gestrahlt`, false, true, 1, 'optional'),
            createProduct('uv262-10237', 'optionale-positionen', 'optionale-positionen-sub', `Alpensteine Gabionensteine gebrochen Körnung`, 'uv262-10237', 269.49, 'BigB', `Alpensteine Gabionensteine gebrochen Körnung`, false, true, 1, 'optional'),
            createProduct('uv232-475', 'optionale-positionen', 'optionale-positionen-sub', `Gardendreams Terrassenüberdachung Legend Alu weiß`, 'uv232-475', 1978.68, 'Stk', `Gardendreams Terrassenüberdachung Legend Alu weiß`, false, true, 1, 'optional'),
            createProduct('563-01505', 'optionale-positionen', 'optionale-positionen-sub', `Rewatec Wasserverteiler RainStar - extern - ebenerdiger Einbau - begehbar`, '563-01505', 173.8, 'Stk', `Rewatec Wasserverteiler RainStar - extern - ebenerdiger Einbau - begehbar`, false, true, 1, 'optional'),
            createProduct('563-01504', 'optionale-positionen', 'optionale-positionen-sub', `Rewatec Wasser-Entnahmearmatur für TwinCover`, '563-01504', 104.39, 'Stk', `Rewatec Wasser-Entnahmearmatur für TwinCover`, false, true, 1, 'optional'),
            createProduct('007-00208', 'optionale-positionen', 'optionale-positionen-sub', `ACO Rain4me Haus und Garten Professional vollautomatische Regenwasserzentrale mit Pumpe`, '007-00208', 3211.95, 'Stk', `ACO Rain4me Haus und Garten Professional vollautomatische Regenwasserzentrale mit Pumpe`, false, true, 1, 'optional'),
            createProduct('007-00206', 'optionale-positionen', 'optionale-positionen-sub', `ACO Rain4me Garten Plus Klarwasserpumpe, schwimmende Ansaugung 1m`, '007-00206', 1033.95, 'Stk', `ACO Rain4me Garten Plus Klarwasserpumpe, schwimmende Ansaugung 1m`, false, true, 1, 'optional'),
            createProduct('uv7-00036', 'optionale-positionen', 'optionale-positionen-sub', `ACO Rain4me Gartenanlage Plus Einbau stehend`, 'uv7-00036', 3090.93, 'Stk', `ACO Rain4me Gartenanlage Plus Einbau stehend`, false, true, 1, 'optional'),
            createProduct('uv7-00277', 'optionale-positionen', 'optionale-positionen-sub', `ACO Rain4me Regenwassertzisterne für Regenwassernutzung`, 'uv7-00277', 1484.93, 'Stk', `ACO Rain4me Regenwassertzisterne für Regenwassernutzung`, false, true, 1, 'optional')
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
            createProduct('399-00312', 'extra-positionen', 'extra-positionen-sub', `Kovalex Terrassenlager 0 (Nicht höhenverstellbar)`, '399-00312', 2.96, 'Stk', `Kovalex Terrassenlager 0 (Nicht höhenverstellbar)`, true, false, 1, 'extra'),
            createProduct('399-00300', 'extra-positionen', 'extra-positionen-sub', `Kovalex Alu-Einfassprofil für 20 mm-Diele Anthrazit 250 cm`, '399-00300', 27.17, 'Stk', `Kovalex Alu-Einfassprofil für 20 mm-Diele Anthrazit 250 cm`, true, false, 1, 'extra'),
            createProduct('399-00310', 'extra-positionen', 'extra-positionen-sub', `Kovalex Blech-Schrauben-Set 2 (bei Alu-Unterkonstruktion)`, '399-00310', 19.8, 'Stk', `Kovalex Blech-Schrauben-Set 2 (bei Alu-Unterkonstruktion)`, true, false, 1, 'extra'),
            createProduct('399-00305', 'extra-positionen', 'extra-positionen-sub', `Kovalex Holz- und Bautenschutzunterlage Schwarz 60 Stück 9 x 6 cm`, '399-00305', 18.26, 'Stk', `Kovalex Holz- und Bautenschutzunterlage Schwarz 60 Stück 9 x 6 cm`, true, false, 1, 'extra'),
            createProduct('563-01344', 'extra-positionen', 'extra-positionen-sub', `Rewatec Wasserzapfsäule Premium Art.Nr.: RWZT0041`, '563-01344', 299.2, 'Stk', `Rewatec Wasserzapfsäule Premium Art.Nr.: RWZT0041`, true, false, 1, 'extra')
          ]
        }
      ]
    },
    {
      id: 'alternativ',
      title: 'Alternativ',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'alternativ-sub',
          title: 'Leistungen & Materialien',
          type: 'material',
          products: [
            createProduct('wass-607-1-mat', 'alternativ', 'alternativ-sub', `GARTEN-ANSCHLUSS | inkl. frostsicheren Außenwasserhahn`, 'WASS-607.1-MAT', 346.5, 'Stk', `inkl. frostsicheren Außenwasserhahn`, true, false, 1, 'material')
          ]
        }
      ]
    }
  ]
};

export const packageGartenBeleuchtung: RenovationPackage = {
  id: 'gartenBeleuchtung',
  title: 'Beleuchtung',
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
            createProduct('gart-10001-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `BELEUCHTUNG IM GARTEN | 🛠 Montage-Leistungspaket`, 'GART-10001-Basis', 129, 'Stk', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
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
            createProduct('lht-94741', 'material', 'material-sub', `LED Pollerleuchte Bako 50cm IP44 Anthrazit`, 'LHT-94741', 54.54, 'Stk', `LED Pollerleuchte Bako 50cm IP44 Anthrazit`, true, false, 1, 'material')
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
            createProduct('lht-661-320', 'optionale-positionen', 'optionale-positionen-sub', `Konstsmide Mode Zink Sockelleuchte E27 IP54`, 'LHT-661-320', 261.68, 'Stk', `Konstsmide Mode Zink Sockelleuchte E27 IP54`, false, true, 1, 'optional'),
            createProduct('lht-94828', 'optionale-positionen', 'optionale-positionen-sub', `Paulmann 94828 LED Pollerleuchte Zenera IP44`, 'LHT-94828', 142.51, 'Stk', `Paulmann 94828 LED Pollerleuchte Zenera IP44`, false, true, 1, 'optional'),
            createProduct('lht-48688-06', 'optionale-positionen', 'optionale-positionen-sub', `Brilliant Istria 3-flg. Außenleuchte E27 IP23`, 'LHT-48688-06', 249.78, 'Stk', `Brilliant Istria 3-flg. Außenleuchte E27 IP23`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageGartenBlockstufen: RenovationPackage = {
  id: 'gartenBlockstufen',
  title: 'Blockstufen',
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
            createProduct('gart-10002-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `BLOCKSTUFEN | 🛠 Montage-Leistungspaket`, 'GART-10002-Basis', 195, 'lfm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
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
            createProduct('uv628-04021', 'material', 'material-sub', `Seltra Blockstufe BIASCA satiniert 15x35 cm Silbergrau-liniert Gneis`, 'uv628-04021', 184.94, 'Stk', `Seltra Blockstufe BIASCA satiniert 15x35 cm Silbergrau-liniert Gneis`, true, false, 1, 'material')
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
            createProduct('uv353-00813', 'optionale-positionen', 'optionale-positionen-sub', `KANN La Tierra Blockstufe Sunset`, 'uv353-00813', 38.02, 'Stk', `KANN La Tierra Blockstufe Sunset`, false, true, 1, 'optional'),
            createProduct('uv353-00822', 'optionale-positionen', 'optionale-positionen-sub', `KANN Travino Blockstufe sandstein`, 'uv353-00822', 50.96, 'Stk', `KANN Travino Blockstufe sandstein`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageGartenCarport: RenovationPackage = {
  id: 'gartenCarport',
  title: 'Carport',
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
            createProduct('carp-10002-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `CARPORTBAU AN BESTEHENDEM GEBÄUDE | Montage-Leistungspaket`, 'CARP-10002-Basis', 695, 'Stk', `Montage-Leistungspaket`, true, false, 1, 'service')
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
            createProduct('uv595-30018', 'material', 'material-sub', `Skan Holz Carport Eifel mit Bogen mit Doppelstegplatten`, 'uv595-30018', 2848.95, 'Stk', `Skan Holz Carport Eifel mit Bogen mit Doppelstegplatten`, true, false, 1, 'material')
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
            createProduct('uv595-30003', 'optionale-positionen', 'optionale-positionen-sub', `Skan Holz Caravan-Carport Emsland mit Aluminium-Dachplatten`, 'uv595-30003', 4168.93, 'Stk', `Skan Holz Caravan-Carport Emsland mit Aluminium-Dachplatten`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageGartenHochbeete: RenovationPackage = {
  id: 'gartenHochbeete',
  title: 'Hochbeete',
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
            createProduct('gart-10004-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `HOCHBEET | 🛠 Montage-Leistungspaket`, 'GART-10004-Basis', 95, 'qm', `🛠 Montage-Leistungspaket`, true, false, 1, 'service')
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
            createProduct('uv66-20633', 'material', 'material-sub', `Biohort HochBeet`, 'uv66-20633', 390.5, 'Stk', `Biohort HochBeet`, true, false, 1, 'material')
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
            createProduct('mon-10142', 'optionale-positionen', 'optionale-positionen-sub', `HOCHBETE| 🛠 Montage`, 'MON-10142', 295, 'Stk', `🛠 Montage`, false, true, 1, 'optional'),
            createProduct('uv237-00169', 'optionale-positionen', 'optionale-positionen-sub', `Gerwing GerloCastell "Hochbeet" rechteckig MURADA beige-hell`, 'uv237-00169', 874.5, 'Set', `Gerwing GerloCastell "Hochbeet" rechteckig MURADA beige-hell`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageGartenGartenhaus: RenovationPackage = {
  id: 'gartenGartenhaus',
  title: 'Gartenhaus',
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
            createProduct('gart-10005-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `GARTENHAUS | 🛠 Montage-Leistungspaket`, 'GART-10005-Basis', 149, 'qm', `🛠 Montage-Leistungspaket`, true, false, 5, 'service')
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
            createProduct('uv595-10098', 'material', 'material-sub', `Skan Holz Gartenhaus Porto Natur mit Vordach 40 cm`, 'uv595-10098', 2001.95, 'Stk', `Skan Holz Gartenhaus Porto Natur mit Vordach 40 cm`, true, false, 1, 'material')
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
            createProduct('uv595-10004', 'optionale-positionen', 'optionale-positionen-sub', `Skan Holz Gartenhaus Basel Natur`, 'uv595-10004', 6584.53, 'Stk', `Skan Holz Gartenhaus Basel Natur`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageGartenGartenmauern: RenovationPackage = {
  id: 'gartenGartenmauern',
  title: 'Gartenmauern',
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
            createProduct('rohb-10003-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `GARTENMAUERN | 🛠 Montage-Leistungspaket`, 'ROHB-10003-Basis', 149, 'qm', `🛠 Montage-Leistungspaket`, true, false, 20, 'service')
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
            createProduct('uv229-00499', 'material', 'material-sub', `Gala-Lusit Spaltino Mauerblock - Gelbsand-Melange ohne Fase`, 'uv229-00499', 23.85, 'Stk', `Gala-Lusit Spaltino Mauerblock - Gelbsand-Melange ohne Fase`, true, false, 132, 'material')
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
            createProduct('uv633-00009', 'extra-positionen', 'extra-positionen-sub', `Stebah Fugenmörtel - 25 Kg - Hellgrau`, 'uv633-00009', 23.3, 'Sack', `Stebah Fugenmörtel - 25 Kg - Hellgrau`, true, false, 2, 'extra'),
            createProduct('uv31-00018', 'extra-positionen', 'extra-positionen-sub', `1A BAUCHEMIE T-FLEX TE C2 Flex Klebemörtel für keramische Wand- und Bodenbeläge im Innen- und Außenbereich grau`, 'uv31-00018', 19.73, 'Sack', `1A BAUCHEMIE T-FLEX TE C2 Flex Klebemörtel für keramische Wand- und Bodenbeläge im Innen- und Außenbereich grau`, true, false, 4, 'extra')
          ]
        }
      ]
    }
  ]
};

export const packageGartenGeraetehaus: RenovationPackage = {
  id: 'gartenGeraetehaus',
  title: 'Gerätehaus',
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
            createProduct('gart-10006-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `GERÄTEHAUS | 🛠 Montage-Leistungspaket`, 'GART-10006-Basis', 149, 'qm', `🛠 Montage-Leistungspaket`, true, false, 2, 'service')
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
            createProduct('uv66-20086', 'material', 'material-sub', `Biohort Europa Gerätehaus - Gerätehütte`, 'uv66-20086', 789.79, 'Stk', `Biohort Europa Gerätehaus - Gerätehütte`, true, false, 1, 'material')
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
            createProduct('uv66-20125', 'optionale-positionen', 'optionale-positionen-sub', `Biohort HighLine Gerätehaus - Geräteschuppen`, 'uv66-20125', 1970.09, 'Stk', `Biohort HighLine Gerätehaus - Geräteschuppen`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageGartenPavillon: RenovationPackage = {
  id: 'gartenPavillon',
  title: 'Pavillon',
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
            createProduct('gart-10007-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `PAVILLON | 🛠 Montage-Leistungspaket`, 'GART-10007-Basis', 129, 'qm', `🛠 Montage-Leistungspaket`, true, false, 8, 'service')
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
            createProduct('uv595-40073', 'material', 'material-sub', `Skan Holz 6-Eck Pavillon Versailles`, 'uv595-40073', 3904.93, 'Stk', `Skan Holz 6-Eck Pavillon Versailles`, true, false, 1, 'material')
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
            createProduct('uv595-40026', 'optionale-positionen', 'optionale-positionen-sub', `Skan Holz 4-Eck Pavillon Orleans`, 'uv595-40026', 5884.95, 'Stk', `Skan Holz 4-Eck Pavillon Orleans`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageGartenTerrassenHolz: RenovationPackage = {
  id: 'gartenTerrassenHolz',
  title: 'Terrasse Holz',
  defaultArea: 20,
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
            createProduct('gart-10009-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `TERRASSEN AUS HOLZ | 🛠 Montage-Leistungspaket`, 'GART-10009-Basis', 149, 'qm', `🛠 Montage-Leistungspaket`, true, false, 20, 'service')
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
            createProduct('uv399-00135', 'material', 'material-sub', `Kovalex WPC-Terrassendiele mit Struktur Walnussfarben mattiert - 145x20 mm Massiv | Längen-Zuschnitt`, 'uv399-00135', 13.3, 'lfm', `Längen-Zuschnitt`, true, false, 240, 'material'),
            createProduct('399-00283', 'material', 'material-sub', `Kovalex WPC-Universal-Unterkonstruktion Schwarz 300 cm`, '399-00283', 26.07, 'Stk', `Kovalex WPC-Universal-Unterkonstruktion Schwarz 300 cm`, true, false, 24, 'material')
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
            createProduct('399-00312', 'extra-positionen', 'extra-positionen-sub', `Kovalex Terrassenlager 0 (Nicht höhenverstellbar)`, '399-00312', 2.96, 'Stk', `Kovalex Terrassenlager 0 (Nicht höhenverstellbar)`, true, false, 1, 'extra'),
            createProduct('399-00300', 'extra-positionen', 'extra-positionen-sub', `Kovalex Alu-Einfassprofil für 20 mm-Diele Anthrazit 250 cm`, '399-00300', 27.17, 'Stk', `Kovalex Alu-Einfassprofil für 20 mm-Diele Anthrazit 250 cm`, true, false, 4, 'extra'),
            createProduct('399-00310', 'extra-positionen', 'extra-positionen-sub', `Kovalex Blech-Schrauben-Set 2 (bei Alu-Unterkonstruktion)`, '399-00310', 19.8, 'Stk', `Kovalex Blech-Schrauben-Set 2 (bei Alu-Unterkonstruktion)`, true, false, 2, 'extra'),
            createProduct('399-00305', 'extra-positionen', 'extra-positionen-sub', `Kovalex Holz- und Bautenschutzunterlage Schwarz 60 Stück 9 x 6 cm`, '399-00305', 18.26, 'Stk', `Kovalex Holz- und Bautenschutzunterlage Schwarz 60 Stück 9 x 6 cm`, true, false, 1, 'extra')
          ]
        }
      ]
    }
  ]
};

export const packageGartenTerrassenStein: RenovationPackage = {
  id: 'gartenTerrassenStein',
  title: 'Terrasse Stein',
  defaultArea: 20,
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
            createProduct('gart-10010-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `TERRASSEN AUS STEIN | 🛠 Montage-Leistungspaket`, 'GART-10010-Basis', 129, 'qm', `🛠 Montage-Leistungspaket`, true, false, 20, 'service')
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
            createProduct('769-116', 'material', 'material-sub', `Mirage Evo_2/E Tribeca Harrison TB 02 - 60 x 60 x 2 cm - Feinsteinzeug Terrassenplatten`, '769-116', 63.69, 'Stk', `Mirage Evo_2/E Tribeca Harrison TB 02 - 60 x 60 x 2 cm - Feinsteinzeug Terrassenplatten`, true, false, 22, 'material')
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
            createProduct('756-2360', 'optionale-positionen', 'optionale-positionen-sub', `Novabell Terrassenplatte 40x120x2cm NOVA ARTWOOD honey RT | AWD42RT`, '756-2360', 111.1, 'Stk', `AWD42RT`, false, true, 1, 'optional'),
            createProduct('uv773-01162', 'optionale-positionen', 'optionale-positionen-sub', `EHL Milena-Terrassenplatte basalt gestrahlt`, 'uv773-01162', 62.45, 'Stk', `EHL Milena-Terrassenplatte basalt gestrahlt`, false, true, 1, 'optional'),
            createProduct('uv262-10237', 'optionale-positionen', 'optionale-positionen-sub', `Alpensteine Gabionensteine gebrochen Körnung`, 'uv262-10237', 269.49, 'BigB', `Alpensteine Gabionensteine gebrochen Körnung`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageGartenUeberdachung: RenovationPackage = {
  id: 'gartenUeberdachung',
  title: 'Überdachung',
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
            createProduct('gart-10011-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `ÜBERDACHUNG | 🛠 Montage-Leistungspaket`, 'GART-10011-Basis', 195, 'qm', `🛠 Montage-Leistungspaket`, true, false, 7, 'service')
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
            createProduct('uv232-525', 'material', 'material-sub', `Gardendreams Terrassenüberdachung Alu anthrazit Glanz`, 'uv232-525', 1978.68, 'Stk', `Gardendreams Terrassenüberdachung Alu anthrazit Glanz`, true, false, 1, 'material')
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
            createProduct('uv232-475', 'optionale-positionen', 'optionale-positionen-sub', `Gardendreams Terrassenüberdachung Legend Alu weiß`, 'uv232-475', 1978.68, 'Stk', `Gardendreams Terrassenüberdachung Legend Alu weiß`, false, true, 1, 'optional')
          ]
        }
      ]
    }
  ]
};

export const packageGartenWintergarten: RenovationPackage = {
  id: 'gartenWintergarten',
  title: 'Wintergarten',
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
            createProduct('gart-10012-basis', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `WINTERGÄRTEN | 🛠 Montage-Leistungspaket`, 'GART-10012-Basis', 249, 'qm', `🛠 Montage-Leistungspaket`, true, false, 6, 'service')
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
            createProduct('uv232-325', 'material', 'material-sub', `Gardendreams Terrassenüberdachung Legend Alu cremeweiß`, 'uv232-325', 1978.68, 'Stk', `Gardendreams Terrassenüberdachung Legend Alu cremeweiß`, true, false, 1, 'material')
          ]
        }
      ]
    }
  ]
};

export const packageGartenZaunanlagen: RenovationPackage = {
  id: 'gartenZaunanlagen',
  title: 'Zaunanlagen',
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
            createProduct('zaun-10004', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `METALLZAUN | 🛠 Montage`, 'ZAUN-10004', 149, 'lfm', `🛠 Montage`, true, false, 20, 'service'),
            createProduct('uv12-00202', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `DZT Metallzaun-Komplett-Set VALENCIA anthrazitgrau (RAL7016) - Elemente 2,0 m breit (Schmuckzaun)`, 'uv12-00202', 1875.14, 'Set', `DZT Metallzaun-Komplett-Set VALENCIA anthrazitgrau (RAL7016) - Elemente 2,0 m breit (Schmuckzaun)`, true, false, 1, 'material')
          ]
        }
      ]
    },
    {
      id: 'alternativ',
      title: 'Alternativ',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'alternativ-sub',
          title: 'Leistungen & Materialien',
          type: 'service',
          products: [
            createProduct('mon-10299', 'alternativ', 'alternativ-sub', `DOPPELSTABMATTENZAUN | 🛠 Montage`, 'MON-10299', 98, 'lfm', `🛠 Montage`, true, false, 20, 'service'),
            createProduct('uv265-84105', 'alternativ', 'alternativ-sub', `Hadra Doppelstabmattenzaun Komplettset Anthrazit - Elemente 2,5 m breit - incl. Pfosten und Befestigungen`, 'uv265-84105', 847.69, 'Set', `Hadra Doppelstabmattenzaun Komplettset Anthrazit - Elemente 2,5 m breit - incl. Pfosten und Befestigungen`, true, false, 1, 'material'),
            createProduct('mon-10305', 'alternativ', 'alternativ-sub', `STECKZAUN | 🛠 Montage`, 'MON-10305', 98, 'lfm', `🛠 Montage`, true, false, 20, 'service'),
            createProduct('uv257-00567', 'alternativ', 'alternativ-sub', `GroJa Lumino Alu-Steckzaun Steckzaun quadratisch 180x180 cm, ohne Pfosten`, 'uv257-00567', 478.43, 'Stk', `GroJa Lumino Alu-Steckzaun Steckzaun quadratisch 180x180 cm, ohne Pfosten`, true, false, 24, 'material'),
            createProduct('uv257-00946', 'alternativ', 'alternativ-sub', `GroJa WPC-Steckzaunpfosten inkl. Kappe zum Aufdübeln, 10x10 cm - Terra`, 'uv257-00946', 41.73, 'Stk', `GroJa WPC-Steckzaunpfosten inkl. Kappe zum Aufdübeln, 10x10 cm - Terra`, true, false, 48, 'material'),
            createProduct('uv257-00746', 'alternativ', 'alternativ-sub', `GroJa Lumino Alu-Steckzaun Tor 2-flügelig 300 x 180 cm, ohne Pfosten - mit Anthrazitrahmen - anthrazitgrau`, 'uv257-00746', 2804.95, 'Stk', `GroJa Lumino Alu-Steckzaun Tor 2-flügelig 300 x 180 cm, ohne Pfosten - mit Anthrazitrahmen - anthrazitgrau`, true, false, 1, 'material'),
            createProduct('uv257-00569', 'alternativ', 'alternativ-sub', `GroJa Lumino Alu-Steckzaun Tor 1-flügelig 100 x 180 cm, ohne Pfosten - mit Alurahmen`, 'uv257-00569', 780.95, 'Stk', `GroJa Lumino Alu-Steckzaun Tor 1-flügelig 100 x 180 cm, ohne Pfosten - mit Alurahmen`, true, false, 1, 'material'),
            createProduct('zaun-10013', 'alternativ', 'alternativ-sub', `GLASZAUN 🛠 Montage`, 'ZAUN-10013', 149, 'lfm', `GLASZAUN 🛠 Montage`, true, false, 20, 'service'),
            createProduct('uv257-00457', 'alternativ', 'alternativ-sub', `GroJa Ambiente Glaszaun schräg, 90 x 180/90 cm, ohne Pfosten - Klarglas`, 'uv257-00457', 174.77, 'Stk', `GroJa Ambiente Glaszaun schräg, 90 x 180/90 cm, ohne Pfosten - Klarglas`, true, false, 24, 'material'),
            createProduct('zaun-10005', 'alternativ', 'alternativ-sub', `GABIONENZAUN | 🛠 Montage`, 'ZAUN-10005', 149, 'lfm', `🛠 Montage`, true, false, 20, 'service'),
            createProduct('uv12-00355', 'alternativ', 'alternativ-sub', `DZT Gabione Onyx KL: 400x347 mm - feuerverzinkt`, 'uv12-00355', 295.77, 'Stk', `DZT Gabione Onyx KL: 400x347 mm - feuerverzinkt`, true, false, 48, 'material'),
            createProduct('mon-10302', 'alternativ', 'alternativ-sub', `LATTENZAUN | 🛠 Montage`, 'MON-10302', 98, 'lfm', `🛠 Montage`, true, false, 20, 'service'),
            createProduct('679-01308', 'alternativ', 'alternativ-sub', `LIGHTLINE Lamellenzaun 180 x 150 cm`, '679-01308', 314.6, 'Stk', `LIGHTLINE Lamellenzaun 180 x 150 cm`, true, false, 24, 'material')
          ]
        }
      ]
    }
  ]
};

export const packageGartenWasserwirtschaft: RenovationPackage = {
  id: 'gartenWasserwirtschaft',
  title: 'Wasserwirtschaft',
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
            createProduct('mon-100-stk', 'art-der-ausfuehrung', 'art-der-ausfuehrung-sub', `MONTAGE | 🛠 Montage 100`, 'MON-100-stk', 999.9, 'Stk', `🛠 Montage 100`, true, false, 1, 'service')
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
            createProduct('uv563-01018', 'material', 'material-sub', `Rewatec NEO Gartenanlage Basic`, 'uv563-01018', 1946.93, 'Stk', `Rewatec NEO Gartenanlage Basic`, true, false, 1, 'material')
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
            createProduct('563-01344', 'extra-positionen', 'extra-positionen-sub', `Rewatec Wasserzapfsäule Premium Art.Nr.: RWZT0041`, '563-01344', 299.2, 'Stk', `Rewatec Wasserzapfsäule Premium Art.Nr.: RWZT0041`, true, false, 1, 'extra')
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
            createProduct('563-01505', 'optionale-positionen', 'optionale-positionen-sub', `Rewatec Wasserverteiler RainStar - extern - ebenerdiger Einbau - begehbar`, '563-01505', 173.8, 'Stk', `Rewatec Wasserverteiler RainStar - extern - ebenerdiger Einbau - begehbar`, false, true, 1, 'optional'),
            createProduct('563-01504', 'optionale-positionen', 'optionale-positionen-sub', `Rewatec Wasser-Entnahmearmatur für TwinCover`, '563-01504', 104.39, 'Stk', `Rewatec Wasser-Entnahmearmatur für TwinCover`, false, true, 1, 'optional'),
            createProduct('007-00208', 'optionale-positionen', 'optionale-positionen-sub', `ACO Rain4me Haus und Garten Professional vollautomatische Regenwasserzentrale mit Pumpe`, '007-00208', 3211.95, 'Stk', `ACO Rain4me Haus und Garten Professional vollautomatische Regenwasserzentrale mit Pumpe`, false, true, 1, 'optional'),
            createProduct('007-00206', 'optionale-positionen', 'optionale-positionen-sub', `ACO Rain4me Garten Plus Klarwasserpumpe, schwimmende Ansaugung 1m`, '007-00206', 1033.95, 'Stk', `ACO Rain4me Garten Plus Klarwasserpumpe, schwimmende Ansaugung 1m`, false, true, 1, 'optional'),
            createProduct('uv7-00036', 'optionale-positionen', 'optionale-positionen-sub', `ACO Rain4me Gartenanlage Plus Einbau stehend`, 'uv7-00036', 3090.93, 'Stk', `ACO Rain4me Gartenanlage Plus Einbau stehend`, false, true, 1, 'optional'),
            createProduct('uv7-00277', 'optionale-positionen', 'optionale-positionen-sub', `ACO Rain4me Regenwassertzisterne für Regenwassernutzung`, 'uv7-00277', 1484.93, 'Stk', `ACO Rain4me Regenwassertzisterne für Regenwassernutzung`, false, true, 1, 'optional')
          ]
        }
      ]
    },
    {
      id: 'alternativ',
      title: 'Alternativ',
      lead: 'Ausgewählte Leistungen und Materialien.',
      subsections: [
        {
          id: 'alternativ-sub',
          title: 'Leistungen & Materialien',
          type: 'material',
          products: [
            createProduct('wass-607-1-mat', 'alternativ', 'alternativ-sub', `GARTEN-ANSCHLUSS | inkl. frostsicheren Außenwasserhahn`, 'WASS-607.1-MAT', 346.5, 'Stk', `inkl. frostsicheren Außenwasserhahn`, true, false, 1, 'material')
          ]
        }
      ]
    }
  ]
};
