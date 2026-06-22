# Leistungs- & Preiskatalog (Prima Vista Bauprojekte)

Dieses Dokument fasst alle angebotenen Dienstleistungen, Sanierungspakete und die im Code hinterlegten Preise für **Prima Vista Bauprojekte** zusammen. Es dient als Referenz und Arbeitsdokument.

---

## 1. Komplett-Pakete & Sanierungs-Flachraten

Diese Pakete bieten eine schlüsselfertige Sanierung auf Quadratmeterbasis, angepasst durch objektspezifische Faktoren.

### 1.1 Wohnhaussanierung (Haus-Sanierung)
*Definiert in [hausSanierung.ts](file:///Users/louisclarencepetersgmail.com/Projects/prima-vista-bauprojekte/src/data/hausSanierung.ts)*

#### Objekttypen & Faktoren
| Typ | Beschreibung | Multiplikator (Faktor) | Dach inkludiert? |
| :--- | :--- | :---: | :---: |
| **1e** | Bungalow / Erdgeschoss (ohne Dach) | 1,00 | Nein |
| **1e-d** | Erdgeschoss mit Bedachung | 1,12 | Ja |
| **2e** | Mehrgeschossig (ohne Dachsanierung) | 1,08 | Nein |
| **2e-d** | Komplettes Wohnhaus mit Dach | 1,18 | Ja |

#### Gewerke-Flachraten (pro m²)
| Gewerk | Leistung / Details | Preis pro m² (netto) |
| :--- | :--- | :---: |
| **Planung & Bauleitung** | Statik, Genehmigung, Koordination | 120 € |
| **Rohbau-Leistungen** | Abbruch, Mauerwerk, Träger, Estrich | 280 € |
| **Dachsanierung** | Eindeckung, Dämmung, Dachstuhl *(nur bei Dach-Faktor)* | 280 € |
| **Fassaden & Dämmung** | WDVS, Putz, Sockel, Anstrich | 220 € |
| **Abdichtung Haus & Keller**| Horizontal-, Perimeter-, Kellerabdichtung | 110 € |
| **Trockenbau** | Wände, Decken, Vorsatzschalen | 110 € |
| **Elektro-Installation** | Verteilung, Leitungen, KNX, Licht | 180 € |
| **Wasser-Installation** | Zu- und Abwasser, Hauptstrang | 150 € |
| **Heizkörper & Bodenheizung**| Flächenheizung, Heizkörper, Stränge | 160 € |
| **Thermen & Öfen** | Gas-, Öl-Therme, Wärmepumpe, Kamin | 180 € |
| **Badsanierung & Gäste-WC**| Wanne, Dusche, Sanitärobjekte | 420 € |
| **Böden & Dielen** | Parkett, Fliesen, Vinyl, Estrich | 140 € |
| **Maler & Lackierung** | Wände, Decken, Heizkörper, Türen | 95 € |
| **Türen & Tore** | Zimmer-, Haus-, Schiebetüren, Tore | 130 € |
| **Treppen & Geländer** | Holz, Beton, Aufbereitung | 90 € |

---

### 1.2 Wohnungssanierung
*Definiert in [wohnungSanierung.ts](file:///Users/louisclarencepetersgmail.com/Projects/prima-vista-bauprojekte/src/data/wohnungSanierung.ts)*

#### Wohnungstypen & Faktoren
| Typ | Beschreibung | Multiplikator (Faktor) | Mehrgeschossig? |
| :--- | :--- | :---: | :---: |
| **studio** | 1-Zimmer · Studio (Kompakte Etagenwohnung) | 0,96 | Nein |
| **2zi** | 2-Zimmer-Wohnung (Standard-Etagenwohnung) | 1,00 | Nein |
| **3zi** | 3-Zimmer-Wohnung (Familienwohnung) | 1,04 | Nein |
| **maisonette**| Maisonette / Penthouse (4+ Zimmer) | 1,12 | Ja |

#### Gewerke-Flachraten (pro m²)
| Gewerk | Leistung / Details | Preis pro m² (netto) |
| :--- | :--- | :---: |
| **Planung & Bauleitung** | Koordination, Aufmaß, Abnahme | 100 € |
| **Trockenbau & Innenausbau**| Wände, Decken, Vorsatzschalen | 110 € |
| **Elektro-Installation** | Verteilung, Leitungen, Licht, KNX | 180 € |
| **Sanitärstränge** | Zu- und Abwasser entlang Etage | 150 € |
| **Heizkörper & Bodenheizung**| Flächenheizung, Heizkörper, Stränge | 160 € |
| **Badsanierung & Gäste-WC**| Wanne, Dusche, Sanitärobjekte | 420 € |
| **Küche & Möbelbau** | Einbauküche, Geräte, Schreinerei | 380 € |
| **Böden & Dielen** | Parkett, Fliesen, Vinyl, Estrich | 140 € |
| **Maler & Lackierung** | Wände, Decken, Heizkörper, Türen | 95 € |
| **Türen — Zimmer & Wohnungs**| Zimmertüren, Wohnungseingang, Schiebetüren | 130 € |
| **Fenster & Balkontüren** | Kunststoff, Holz, Aluminium | 240 € |
| **Treppen & Geländer** | Holz, Stahl, Glas *(nur bei Maisonette)* | 90 € |

---

### 1.3 Büroausbau (Gewerbe)
*Definiert in [bueroAusbau.ts](file:///Users/louisclarencepetersgmail.com/Projects/prima-vista-bauprojekte/src/data/bueroAusbau.ts)*

#### Bürotypen & Faktoren
| Typ | Beschreibung | Multiplikator (Faktor) |
| :--- | :--- | :---: |
| **refresh** | Büro-Refresh (Boden, Maler, Licht, Kosmetik) | 0,85 |
| **klassisch** | Klassisches Büro (Zellenbüros, Meetingräume, Küche) | 1,00 |
| **open-space**| Open Space (Akustik, Lichtzonen, Flex-Arbeitsplätze) | 1,12 |
| **praxis** | Praxis / Beratung (Empfang, Diskretion, Sanitär, Brandschutz) | 1,22 |

#### Gewerke-Flachraten (pro m²)
| Gewerk | Leistung / Details | Preis pro m² (netto) |
| :--- | :--- | :---: |
| **Rückbau & Entkernung** | Altbestand, Boden, Decken öffnen | 55 € |
| **Trockenbau & Räume** | Trennwände, Vorsatzschalen, Decken | 110 € |
| **Akustik** | Akustikdecken, Absorber, Telefonboxen | 95 € |
| **Elektroinstallation** | Steckdosen, Unterverteilung, Sicherheit | 135 € |
| **Netzwerk & Daten** | LAN, WLAN, Server-/Patchfeld | 70 € |
| **Lichtkonzept** | Arbeitsplatzlicht, Schienen, Steuerung | 95 € |
| **Bodenbeläge** | Vinyl, Teppichfliese, Parkett, Sockel | 120 € |
| **Malerarbeiten** | Spachteln, Anstrich, Lackdetails | 65 € |
| **Sanitär & WCs** | Mitarbeiter-WC, Gäste-WC, Anschlüsse | 110 € |
| **Teeküche** | Anschlüsse, Einbau, Arbeitsflächen | 160 € |
| **Brandschutz** | Fluchtwege, Türen, Beschilderung | 75 € |
| **Einbauten & Möbel** | Empfang, Stauraum, Besprechung | 220 € |
| **Klima & Lüftung** | Splitgeräte, Luftführung, Nachrüstung | 130 € |

---

### 1.4 Gastronomieausbau (Gewerbe)
*Definiert in [gastronomieAusbau.ts](file:///Users/louisclarencepetersgmail.com/Projects/prima-vista-bauprojekte/src/data/gastronomieAusbau.ts)*

#### Gastronomietypen & Faktoren
| Typ | Beschreibung | Multiplikator (Faktor) |
| :--- | :--- | :---: |
| **cafe** | Café / Bistro (Einfacher Ausbau ohne Großküche) | 0,90 |
| **restaurant** | Restaurant (Vollausbau mit professioneller Gastroküche) | 1,15 |
| **bar** | Bar / Club (Aufwendige Bar- und Lüftungstechnik) | 1,25 |
| **systemgastro**| Systemgastronomie (Standardisierter Multi-Level Ausbau) | 1,05 |

#### Gewerke-Flachraten (pro m²)
| Gewerk | Leistung / Details | Preis pro m² (netto) |
| :--- | :--- | :---: |
| **Abbruch & Entkernung** | Entfernung Altbestand | 80 € |
| **Lüftungs- & Klimatechnik**| Gastro-Lüftung, Klimaanlage | 250 € |
| **Gastro-Küche** | Großküchentechnik, Edelstahlmöbel | 450 € |
| **Kühl- & Schanktechnik** | Kühlzellen, Thekenanlage | 180 € |
| **Sanitär & Gäste-WC** | Gäste-WCs, Personal-WCs | 220 € |
| **Elektro & Beleuchtung** | Starkstrom, Beleuchtungskonzept | 200 € |
| **Bodenbeläge** | Rutschfeste Fliesen, Gastraumboden | 140 € |
| **Trockenbau & Akustik** | Akustikdecken, Trennwände | 130 € |
| **Malerarbeiten** | Wandgestaltung, Lackierungen | 90 € |
| **Brandschutz & Sicherheit**| Brandmelder, Fluchtwege | 110 € |
| **Möbel & Innenausbau** | Sitzbänke, Tische, Thekenbau | 320 € |
| **Treppen & Geländer** | Interne Verbindungstreppen *(nur Systemgastro)* | 90 € |

---

## 2. Spezialpakete (Feste Kalkulationen)

### 2.1 Wärmepumpen-Pakete
*Definiert in [waermepumpe.ts](file:///Users/louisclarencepetersgmail.com/Projects/prima-vista-bauprojekte/src/data/waermepumpe.ts)*

| Position / Paket | SKU | Einheit | Netto-Preis | Details |
| :--- | :--- | :---: | :---: | :--- |
| **Montage-Leistungspaket** | `HEIZ-400-BASIS` | Stück | 4.500,00 € | Montage, Anschlusskoordination & Inbetriebnahme |
| **12 kW LG Wärmepumpe** | `HEIZ-411.4-MAT` | Stück | 10.542,42 € | LG Wärmepumpen-Paket TM187/123 |
| **LG Zubehör-Set** | `HEIZ-411-ZU` | Stück | 1.500,00 € | Passendes Zubehör-Set für LG Installationen |
| **Alt-Öltank Entsorgung** | `HEIZ-431.1-ZU` | Stück | 2.900,00 € | Rückbau und fachgerechte Öltankentsorgung |
| **Außenfundament** | `HEIZ-401-BASIS` | Stück | 2.495,00 € | Fundamentposition für das Außengerät |

---

### 2.2 Keller- & Mauerwerksabdichtung
*Definiert in [abdichtungPakete.tsx](file:///Users/louisclarencepetersgmail.com/Projects/prima-vista-bauprojekte/src/data/abdichtungPakete.tsx)*

| Paket | Kalkulation ab | Inklusivleistungen |
| :--- | :---: | :--- |
| **Horizontal-Abdichtung** | **150 € / m** | Bohrlochketten, Injektionscreme/Harz, Verpressung unter Druck, Verschließen |
| **Perimeter-Abdichtung** | **280 € / lfm** | Baggereinsatz (Ausschachten), KMB-Dickbeschichtung (2-lagig), XPS-Dämmung, Noppenbahn |
| **Keller-Innenabdichtung** | **180 € / m²** | Altputzentfernung, Fugenauskratzung, Dichtschlämme (mehrlagig), Sanierputz |
| **Komplett-Abdichtung** | **Individuell**| Freie Kombination aller Abdichtungsmethoden inkl. Rissverpressungen |

---

### 2.3 Trockenbau-Systeme (Festpreise)
*Definiert in [trockenbau.ts](file:///Users/louisclarencepetersgmail.com/Projects/prima-vista-bauprojekte/src/data/trockenbau.ts)*

| Projektpaket | Netto-Basispreis | Leistungsumfang |
| :--- | :---: | :--- |
| **Alles zu Trockenbau** | **18.200,00 €** | Decken, Wände, Verkleidungen, Anschlüsse, Spachtelung im Paket |
| **Decken abhängen** | **9.200,00 €** | GK-Decken mit Unterkonstruktion, Plattenlage, Revisionsöffnungen |
| **Wände stellen** | **10.400,00 €** | Metallständerwände, Beplankung, Dämmung, verspachtelt |
| **Wände verkleiden** | **8.600,00 €** | Direkte Wandverkleidung, Installationsführung, Spachtelung |
| **Estrich verlegen** | **11.800,00 €** | Estrich- oder Trockenestrichaufbau inkl. Randdämmung & Ausgleich |
| **Dachschrägen verkleiden**| **12.600,00 €** | Unterkonstruktion, Dämmanschluss, GK-Beplankung & Spachtelung |

#### Trockenbau-Optionen (Zusatzpakete)
- **Rückbau & Entsorgung**: `1.700,00 €` (netto)
- **Schall- oder Wärmedämmung**: `2.600,00 €` (netto)
- **Q3-Spachtelung malerfertig**: `1.900,00 €` (netto)

---

## 3. Einzelgewerke & Detaillierte Positionen (Auszug)
*Zentralisiert im Detailkalkulator-Katalog [common.ts](file:///Users/louisclarencepetersgmail.com/Projects/prima-vista-bauprojekte/src/data/calculator/packages/common.ts)*

Der Detailkalkulator arbeitet mit genauen Einzelpreisen für Material, Montage und Zubehör:

### 3.1 Abbruch & Rohbau
- **Abbruch Decken (Leichtbau)** (`PV-ROH-101`): `21,14 € / qm`
- **Abbruch Wände (6-16 cm)** (`PV-ROH-102`): `78,21 € / qm`
- **Abbruch Wände (17-35 cm)** (`PV-ROH-103`): `98,01 € / qm`
- **Altputz entfernen & entsorgen** (`PV-ROH-402`): `11,88 € / qm`
- **Wandputz Gips** (`PV-ROH-401`): `34,60 € / qm`
- **Stahlträger HEA bis 2 m** (`PV-ROH-201`): `1.781,33 € / Stück` (Material)
- **Betonauflager für Stahlträger** (`PV-ROH-202`): `188,10 € / Stück`

### 3.2 Trockenbau
- **Decken in Trockenbauweise** (`PV-TRO-100`): `49,00 € / qm` (Montage)
- **Wände in Trockenbauweise** (`PV-TRO-200`): `49,00 € / qm` (Montage)
- **Vorsatzwände** (`PV-TRO-300`): `49,00 € / qm` (Montage)
- **Verspachtelung streichfertig** (`PV-TRO-101`): `22,82 € / qm`
- **Türloch in GK-Wand herstellen** (`PV-TRO-201`): `64,22 € / Stück`
- **Rigips Gipsplatte 12,5 mm** (`PV-MAT-GK`): `3,49 € / qm` (Material)
- **Feuchtraum-Gipsplatte imprägniert** (`PV-MAT-GKBI`): `8,90 € / qm` (Material)
- **Rohrkasten / Koffer bauen** (`PV-TRO-401`): `235,91 € / Stück`

### 3.3 Elektroinstallation
- **Elektro-Neuinstallation pro Etage** (`PV-ELE-100`): `1.995,90 € / Stk`
- **Zuleitungen Set (Schalter & Steckdosen)** (`PV-ELE-201`): `3.495,90 € / Stk` (pro Etage)
- **Sicherungskasten Montagepaket** (`PV-ELE-102`): `1.678,50 € / Stk`
- **Herdanschluss mit Zuleitung** (`PV-ELE-202`): `391,90 € / Stk`
- **Schalter- und Steckdosen-Set** (`PV-ELE-MAT-201`): `1.495,90 € / Stk` (Material)
- **Beleuchtung Montagepaket** (`PV-ELE-LHT-100`): `129,00 € / Stk`
- **SLV NUMINOS Einbaustrahler** (`PV-LHT-5368`): `68,02 € / Stk` (Material)

### 3.4 Maler & Oberflächen
- **Glättung mit Feinspachtel** (`PV-MAL-101`): `17,90 € / qm`
- **Anstrich Wand- & Deckenflächen** (`PV-MAL-201`): `9,85 € / qm`
- **Grundierung** (`PV-MAL-102`): `3,91 € / qm`
- **Alttapeten entfernen & entsorgen** (`PV-MAL-103`): `7,87 € / qm`

### 3.5 Wasser & Sanitär (Rohinstallation)
- **Wasserinstallation Bad** (`PV-WAS-100`): `1.995,90 € / Stück`
- **Wasserinstallation Gäste-WC** (`PV-WAS-200`): `1.195,90 € / Stück`
- **Wasserinstallation Küche** (`PV-WAS-300`): `995,90 € / Stück`
- **Hauptstrang Trink- & Abwasser** (`PV-WAS-501`): `2.767,90 € / Stück` (pro Etage)
- **WC-Montageelement mit Spülkasten** (`PV-WAS-MAT-02`): `390,06 € / Stück`

### 3.6 Heizung
- **Heizkörper Montage** (`PV-HEI-101`): `149,00 € / Stk`
- **Badheizkörper weiß** (`PV-HEI-MAT-01`): `388,95 € / Stk`
- **Heizstränge bis 5 m** (`PV-HEI-301`): `434,56 € / Stück`
- **Bodenheizung Montagepaket** (`PV-HEI-FBH-100`): `89,00 € / qm`
- **Trockenestrichplatten** (`PV-ROH-501`): `48,46 € / qm`

### 3.7 Bad & Fliesen
- **Fliesen Bad Montagepaket** (`PV-BAD-100`): `5.995,00 € / Stück`
- **Wand- & Bodenfliesen Standard** (`PV-BAD-FL-01`): `30,22 € / qm`
- **Mosaikfliese Akzent** (`PV-BAD-FL-03`): `298,67 € / qm`
- **Sanitär Bad Montagepaket** (`PV-BAD-500`): `1.995,00 € / Stück`
- **Badewanne Stahl 180x80 cm** (`PV-BAD-WANNE`): `1.039,50 € / Stück`
- **Duschsystem mit Einhandmischer** (`PV-BAD-DUSCH`): `608,85 € / Stück`
- **Ebenerdiger Duschbereich** (`PV-BAD-507`): `1.579,90 € / Stück`

### 3.8 Böden & Beläge
- **Holzboden verlegen** (`PV-BOD-100`): `19,90 € / qm`
- **Altboden entfernen & entsorgen** (`PV-BOD-101`): `15,79 € / qm`
- **Fertigparkett 3-Schicht** (`PV-BOD-MAT-01`): `49,83 € / qm` (Material)
- **Bodenfliesen verlegen** (`PV-BOD-400`): `59,90 € / qm`

### 3.9 Türen & Fenster
- **Türen Montagepaket** (`PV-TUER-100`): `149,90 € / Stk`
- **Innentürelement weiß** (`PV-TUER-MAT-01`): `387,59 € / Stk`
- **Aluminium Haustür anthrazit** (`PV-TUER-MAT-03`): `1.755,60 € / Stk`
- **Fenster Montagepaket** (`PV-FEN-100`): `415,31 € / Stk`
- **Kunststofffenster (bis 2m Breite)** (`PV-FEN-MAT-02`): `1.264,16 € / Stück`
- **Balkontür Kunststoff** (`PV-FEN-MAT-04`): `653,19 € / Stück`

### 3.10 Küche & Möbel
- **Küchenmontage pauschal** (`PV-KUE-100`): `290,00 € / lfm`
- **Einbauküche L-Form weiß** (`PV-KUE-MAT-01`): `5.424,02 € / Stk`
- **Einbauküche kompakt weiß** (`PV-KUE-MAT-02`): `3.616,41 € / Stk`

---

## Entwickler-Hinweise zur Preisanpassung

Falls Sie Preise oder Beschreibungen ändern möchten, finden Sie die Rohdaten in folgenden Dateien:
- **Komplett-Flachraten**: [src/data/wohnungSanierung.ts](file:///Users/louisclarencepetersgmail.com/Projects/prima-vista-bauprojekte/src/data/wohnungSanierung.ts), [src/data/hausSanierung.ts](file:///Users/louisclarencepetersgmail.com/Projects/prima-vista-bauprojekte/src/data/hausSanierung.ts), [src/data/bueroAusbau.ts](file:///Users/louisclarencepetersgmail.com/Projects/prima-vista-bauprojekte/src/data/bueroAusbau.ts), [src/data/gastronomieAusbau.ts](file:///Users/louisclarencepetersgmail.com/Projects/prima-vista-bauprojekte/src/data/gastronomieAusbau.ts).
- **Detail-Kalkulationen (SKUs & Einzelpreise)**: [src/data/calculator/packages/common.ts](file:///Users/louisclarencepetersgmail.com/Projects/prima-vista-bauprojekte/src/data/calculator/packages/common.ts) sowie objektspezifische Voreinstellungen im selben Ordner.
- **Sondergewerke**: [waermepumpe.ts](file:///Users/louisclarencepetersgmail.com/Projects/prima-vista-bauprojekte/src/data/waermepumpe.ts), [abdichtungPakete.tsx](file:///Users/louisclarencepetersgmail.com/Projects/prima-vista-bauprojekte/src/data/abdichtungPakete.tsx), [trockenbau.ts](file:///Users/louisclarencepetersgmail.com/Projects/prima-vista-bauprojekte/src/data/trockenbau.ts).
