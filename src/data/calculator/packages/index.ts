import type { RenovationPackage } from '../types';

type Loader = () => Promise<Record<string, unknown>>;
type FileEntry = { loader: Loader; entries: ReadonlyArray<readonly [string, string]> };

const FILES: ReadonlyArray<FileEntry> = [
  { loader: () => import('./blitz-haus-1'), entries: [['1e-d', 'packageBlitzHaus1']] },
  { loader: () => import('./blitz-haus-2'), entries: [['2e-d', 'packageBlitzHaus2']] },
  { loader: () => import('./blitz-haus-3'), entries: [['1e', 'packageBlitzHaus3']] },
  { loader: () => import('./blitz-haus-4'), entries: [['2e', 'packageBlitzHaus4']] },
  {
    loader: () => import('./wohnung'),
    entries: [
      ['studio', 'packageWohnungStudio'],
      ['2zi', 'packageWohnung2zi'],
      ['3zi', 'packageWohnung3zi'],
      ['maisonette', 'packageWohnungMaisonette'],
    ],
  },
  {
    loader: () => import('./abdichtung'),
    entries: [
      ['abdichtung', 'packageAbdichtungAlles'],
      ['abdichtungHorizontal', 'packageAbdichtungHorizontal'],
      ['abdichtungPerimeter', 'packageAbdichtungPerimeter'],
      ['abdichtungKeller', 'packageAbdichtungKeller'],
    ],
  },
  {
    loader: () => import('./badsanierung'),
    entries: [
      ['badGaeste', 'packageBadGaeste'],
      ['badKomplett', 'packageBadKomplett'],
      ['badWanne', 'packageBadWanne'],
      ['badDusche', 'packageBadDusche'],
      ['badWhirlpool', 'packageBadWhirlpool'],
      ['badWhirlpoolDusche', 'packageBadWhirlpoolDusche'],
      ['badBarrierefrei', 'packageBadBarrierefrei'],
    ],
  },
  {
    loader: () => import('./barrierefrei'),
    entries: [
      ['barrierefreiDusche', 'packageBarrierefreiDusche'],
      ['barrierefreiWc', 'packageBarrierefreiWc'],
      ['barrierefreiSenioren', 'packageBarrierefreiSenioren'],
      ['barrierefreiRollstuhl', 'packageBarrierefreiRollstuhl'],
    ],
  },
  {
    loader: () => import('./boeden'),
    entries: [
      ['boedenAlles', 'packageBoedenAlles'],
      ['boedenParkettVerlegung', 'packageBoedenParkettVerlegung'],
      ['boedenParkettAufbereiten', 'packageBoedenParkettAufbereiten'],
      ['boedenLaminatVerlegung', 'packageBoedenLaminatVerlegung'],
      ['boedenFliesenVerlegung', 'packageBoedenFliesenVerlegung'],
      ['boedenSockelleisten', 'packageBoedenSockelleisten'],
      ['boedenKorkboden', 'packageBoedenKorkboden'],
      ['boedenVinyl', 'packageBoedenVinyl'],
      ['boedenEstrichplatten', 'packageBoedenEstrichplatten'],
      ['boedenSichtestrich', 'packageBoedenSichtestrich'],
      ['boedenTeppich', 'packageBoedenTeppich'],
    ],
  },
  {
    loader: () => import('./dach'),
    entries: [
      ['dachAlles', 'packageDachAlles'],
      ['dachNeubedachung', 'packageDachDachNeubedachung'],
      ['dachDachstuhl', 'packageDachDachDachstuhl'],
      ['dachDaemmung', 'packageDachDachDaemmung'],
      ['dachGauben', 'packageDachDachGauben'],
      ['dachFenster', 'packageDachDachFenster'],
      ['dachanhebung', 'packageDachDachanhebung'],
      ['dachInnenausbau', 'packageDachDachInnenausbau'],
      ['flachdach', 'packageFlachdach'],
      ['dachbodenDaemmung', 'packageDachbodenDaemmung'],
    ],
  },
  {
    loader: () => import('./elektro'),
    entries: [
      ['elektroAlles', 'packageElektroAlles'],
      ['elektroNeuinstallation', 'packageElektroNeuinstallation'],
      ['elektroSicherungskasten', 'packageElektroSicherungskasten'],
      ['elektroNetzwerk', 'packageElektroNetzwerk'],
      ['elektroEinzelinstallation', 'packageElektroEinzelinstallation'],
      ['elektroLichttechnik', 'packageElektroLichttechnik'],
      ['elektroFreeHome', 'packageElektroFreeHome'],
      ['elektroRolladen', 'packageElektroRolladen'],
      ['elektroSprechanlagen', 'packageElektroSprechanlagen'],
    ],
  },
  {
    loader: () => import('./fassade'),
    entries: [
      ['fassadeAlles', 'packageFassadeAlles'],
      ['fassadeDaemmung', 'packageFassadeDaemmung'],
      ['fassadeAnstrich', 'packageFassadeAnstrich'],
      ['fassadeHolzverkleidung', 'packageFassadeHolzverkleidung'],
      ['fassadeSockeldaemmung', 'packageFassadeSockeldaemmung'],
      ['fassadeKlinkerSteinriemchen', 'packageFassadeKlinkerSteinriemchen'],
      ['fassadePlattenverkleidung', 'packageFassadePlattenverkleidung'],
      ['fassadeNatursteinverkleidung', 'packageFassadeNatursteinverkleidung'],
      ['fassadeVorhangfassade', 'packageFassadeVorhangfassade'],
      ['fassadeVerblendmauerwerk', 'packageFassadeVerblendmauerwerk'],
    ],
  },
  {
    loader: () => import('./fenster'),
    entries: [
      ['fensterAlles', 'packageFensterAlles'],
      ['fensterKunststoff', 'packageFensterKunststoff'],
      ['fensterHolz', 'packageFensterHolz'],
      ['fensterAluminium', 'packageFensterAluminium'],
      ['fensterFensterlaeden', 'packageFensterFensterlaeden'],
      ['fensterRolladen', 'packageFensterRolladen'],
      ['fensterDachfenster', 'packageFensterDachfenster'],
      ['fensterBalkontueren', 'packageFensterBalkontueren'],
      ['fensterCarportGaragentore', 'packageFensterCarportGaragentore'],
      ['fensterFensterLackierung', 'packageFensterFensterLackierung'],
      ['fensterMarkisen', 'packageFensterMarkisen'],
    ],
  },
  {
    loader: () => import('./garten'),
    entries: [
      ['gartenAlles', 'packageGartenAlles'],
      ['gartenBeleuchtung', 'packageGartenBeleuchtung'],
      ['gartenBlockstufen', 'packageGartenBlockstufen'],
      ['gartenCarport', 'packageGartenCarport'],
      ['gartenHochbeete', 'packageGartenHochbeete'],
      ['gartenGartenhaus', 'packageGartenGartenhaus'],
      ['gartenGartenmauern', 'packageGartenGartenmauern'],
      ['gartenGeraetehaus', 'packageGartenGeraetehaus'],
      ['gartenPavillon', 'packageGartenPavillon'],
      ['gartenTerrassenHolz', 'packageGartenTerrassenHolz'],
      ['gartenTerrassenStein', 'packageGartenTerrassenStein'],
      ['gartenUeberdachung', 'packageGartenUeberdachung'],
      ['gartenWintergarten', 'packageGartenWintergarten'],
      ['gartenZaunanlagen', 'packageGartenZaunanlagen'],
      ['gartenWasserwirtschaft', 'packageGartenWasserwirtschaft'],
    ],
  },
  {
    loader: () => import('./heizmethoden'),
    entries: [
      ['heizmethodenAlles', 'packageHeizmethodenAlles'],
      ['heizmethodenHeizkoerper', 'packageHeizmethodenHeizkoerper'],
      ['heizmethodenHeizstraenge', 'packageHeizmethodenHeizstraenge'],
      ['heizmethodenFussbodenheizung', 'packageHeizmethodenFussbodenheizung'],
      ['heizmethodenWaermepumpe', 'packageHeizmethodenWaermepumpe'],
      ['heizmethodenGasHeizung', 'packageHeizmethodenGasHeizung'],
      ['heizmethodenOelHeizung', 'packageHeizmethodenOelHeizung'],
      ['heizmethodenPelletofen', 'packageHeizmethodenPelletofen'],
      ['heizmethodenThermenOefen', 'packageHeizmethodenThermenOefen'],
      ['heizmethodenThermenAlle', 'packageHeizmethodenThermenAlle'],
      ['heizmethodenKaminofen', 'packageHeizmethodenKaminofen'],
      ['heizmethodenSaunaofen', 'packageHeizmethodenSaunaofen'],
      ['heizmethodenDurchlauferhitzer', 'packageHeizmethodenDurchlauferhitzer'],
      ['heizmethodenWarmwasserspeicher', 'packageHeizmethodenWarmwasserspeicher'],
      ['heizmethodenElektroHeizung', 'packageHeizmethodenElektroHeizung'],
    ],
  },
  {
    loader: () => import('./kueche'),
    entries: [
      ['kuecheAlles', 'packageKuecheAlles'],
      ['kuecheKomplettkueche', 'packageKuecheKomplettkueche'],
      ['kuecheSingleMinikuechen', 'packageKuecheSingleMinikuechen'],
      ['kuecheBuerokueche', 'packageKuecheBuerokueche'],
      ['kuecheEinbaukueche', 'packageKuecheEinbaukueche'],
      ['kuecheKuechenzeile', 'packageKuecheKuechenzeile'],
      ['kuecheArbeitsplatteSpuele', 'packageKuecheArbeitsplatteSpuele'],
      ['kuecheDunstabzugshaube', 'packageKuecheDunstabzugshaube'],
      ['kuecheBodenDecken', 'packageKuecheBodenDecken'],
      ['kuecheElektroBeleuchtung', 'packageKuecheElektroBeleuchtung'],
      ['kuecheWasserinstallation', 'packageKuecheWasserinstallation'],
    ],
  },
  {
    loader: () => import('./maler'),
    entries: [
      ['malerAlles', 'packageMalerAlles'],
      ['malerAnstrich', 'packageMalerAnstrich'],
      ['malerGlaettenAnstrich', 'packageMalerGlaettenAnstrich'],
      ['malerTapezieren', 'packageMalerTapezieren'],
      ['malerDeckenLackierung', 'packageMalerDeckenLackierung'],
      ['malerHeizkoerperLackierung', 'packageMalerHeizkoerperLackierung'],
      ['malerFensterLackierung', 'packageMalerFensterLackierung'],
      ['malerTuerenLackierung', 'packageMalerTuerenLackierung'],
      ['malerTreppenGelaenderLackierung', 'packageMalerTreppenGelaenderLackierung'],
      ['malerFassadenAnstrich', 'packageMalerFassadenAnstrich'],
    ],
  },
  {
    loader: () => import('./rohbau'),
    entries: [
      ['rohbauAlles', 'packageRohbauAlles'],
      ['rohbauAbbruch', 'packageRohbauAbbruch'],
      ['rohbauEstrich', 'packageRohbauEstrich'],
      ['rohbauStahltraeger', 'packageRohbauStahltraeger'],
      ['rohbauVerputzen', 'packageRohbauVerputzen'],
      ['rohbauLichtschaechte', 'packageRohbauLichtschaechte'],
      ['rohbauSchornstein', 'packageRohbauSchornstein'],
      ['rohbauMauerwerk', 'packageRohbauMauerwerk'],
      ['rohbauPflastern', 'packageRohbauPflastern'],
    ],
  },
  {
    loader: () => import('./treppen'),
    entries: [
      ['treppenAlles', 'packageTreppenAlles'],
      ['treppenHolztreppe', 'packageTreppenHolztreppe'],
      ['treppenBetontreppe', 'packageTreppenBetontreppe'],
      ['treppenDurchbruch', 'packageTreppenDurchbruch'],
      ['treppenGelaender', 'packageTreppenGelaender'],
      ['treppenAussentreppe', 'packageTreppenAussentreppe'],
      ['treppenRaumspartreppe', 'packageTreppenRaumspartreppe'],
      ['treppenDachbodentreppe', 'packageTreppenDachbodentreppe'],
      ['treppenSpindeltreppe', 'packageTreppenSpindeltreppe'],
      ['treppenAufbereiten', 'packageTreppenAufbereiten'],
      ['treppenBelegung', 'packageTreppenBelegung'],
    ],
  },
  {
    loader: () => import('./trockenbau'),
    entries: [
      ['trockenbauAlles', 'packageTrockenbauAlles'],
      ['trockenbauDecken', 'packageTrockenbauDecken'],
      ['trockenbauWaendeStellen', 'packageTrockenbauWaendeStellen'],
      ['trockenbauWaendeVerkleiden', 'packageTrockenbauWaendeVerkleiden'],
      ['trockenbauEstrich', 'packageTrockenbauEstrich'],
      ['trockenbauDachschraegen', 'packageTrockenbauDachschraegen'],
    ],
  },
  {
    loader: () => import('./tueren'),
    entries: [
      ['tuerenAlles', 'packageTuerenAlles'],
      ['tuerenZimmertueren', 'packageTuerenZimmertueren'],
      ['tuerenSchiebetueren', 'packageTuerenSchiebetueren'],
      ['tuerenGlastueren', 'packageTuerenGlastueren'],
      ['tuerenBalkonTerrassen', 'packageTuerenBalkonTerrassen'],
      ['tuerenHaustueren', 'packageTuerenHaustueren'],
      ['tuerenKellertueren', 'packageTuerenKellertueren'],
      ['tuerenGaragentore', 'packageTuerenGaragentore'],
      ['tuerenToreEinfahrt', 'packageTuerenToreEinfahrt'],
    ],
  },
  {
    loader: () => import('./wasser'),
    entries: [
      ['wasserAlles', 'packageWasserAlles'],
      ['wasserBadezimmer', 'packageWasserBadezimmer'],
      ['wasserGaesteWc', 'packageWasserGaesteWc'],
      ['wasserKueche', 'packageWasserKueche'],
      ['wasserWaschmaschine', 'packageWasserWaschmaschine'],
      ['wasserKeller', 'packageWasserKeller'],
      ['wasserGarten', 'packageWasserGarten'],
      ['wasserSpuelkasten', 'packageWasserSpuelkasten'],
      ['wasserHauptstrang', 'packageWasserHauptstrang'],
    ],
  },
  {
    loader: () => import('./zaeune'),
    entries: [
      ['zaeuneAluminium', 'packageZaeuneAluminium'],
      ['zaeuneHolz', 'packageZaeuneHolz'],
      ['zaeuneGlas', 'packageZaeuneGlas'],
      ['zaeuneMetall', 'packageZaeuneMetall'],
      ['zaeuneDoppelstab', 'packageZaeuneDoppelstab'],
      ['zaeuneGabionen', 'packageZaeuneGabionen'],
      ['zaeuneSichtschutz', 'packageZaeuneSichtschutz'],
      ['zaeuneMaschendraht', 'packageZaeuneMaschendraht'],
      ['zaeuneSteck', 'packageZaeuneSteck'],
      ['zaeuneVorgarten', 'packageZaeuneVorgarten'],
      ['zaeuneSichtschutzstreifen', 'packageZaeuneSichtschutzstreifen'],
    ],
  },
];

const idToFileIndex = new Map<string, number>();
for (let i = 0; i < FILES.length; i++) {
  for (const [id] of FILES[i].entries) idToFileIndex.set(id, i);
}

export const RENOVATION_PACKAGE_IDS: readonly string[] = Array.from(idToFileIndex.keys());
export const DEFAULT_PACKAGE_ID = '1e';

const cache = new Map<string, RenovationPackage>();
const inflight = new Map<number, Promise<void>>();

export function getCachedRenovationPackage(id: string): RenovationPackage | undefined {
  return cache.get(id);
}

export async function loadRenovationPackage(id: string): Promise<RenovationPackage | undefined> {
  if (cache.has(id)) return cache.get(id);

  const fileIndex = idToFileIndex.get(id) ?? idToFileIndex.get(DEFAULT_PACKAGE_ID);
  if (fileIndex == null) return undefined;

  let pending = inflight.get(fileIndex);
  if (!pending) {
    const file = FILES[fileIndex];
    pending = file.loader().then((mod) => {
      const record = mod as Record<string, RenovationPackage | undefined>;
      for (const [pkgId, exportName] of file.entries) {
        const pkg = record[exportName];
        if (pkg) cache.set(pkgId, pkg);
      }
    });
    inflight.set(fileIndex, pending);
  }
  await pending;

  return cache.get(id) ?? cache.get(DEFAULT_PACKAGE_ID);
}
