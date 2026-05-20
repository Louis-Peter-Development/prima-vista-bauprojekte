import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Gewerke from './pages/Gewerke';
import Badsanierung from './pages/Badsanierung';
import KuechenMoebelbau from './pages/KuechenMoebelbau';
import BoedenBelaege from './pages/BoedenBelaege';
import Elektroinstallation from './pages/Elektroinstallation';
import Trockenbau from './pages/Trockenbau';
import MalerLackierer from './pages/MalerLackierer';
import Fassadensanierung from './pages/Fassadensanierung';
import AbdichtungKeller from './pages/AbdichtungKeller';
import Dachsanierung from './pages/Dachsanierung';
import TreppenGelaender from './pages/TreppenGelaender';
import GartenAussenanlagen from './pages/GartenAussenanlagen';
import Barrierefreiheit from './pages/Barrierefreiheit';
import Fenstertechnik from './pages/Fenstertechnik';
import RohbauAbbruch from './pages/RohbauAbbruch';
import TuerenZargen from './pages/TuerenZargen';
import Sanitaerinstallation from './pages/Sanitaerinstallation';
import Zaeune from './pages/Zaeune';
import KomplettPakete from './pages/KomplettPakete';
import Projekte from './pages/Projekte';
import Kontakt from './pages/Kontakt';
import BlitzAngebot from './pages/BlitzAngebot';
import Kalkulator from './pages/Kalkulator';
import HausSanierung from './pages/HausSanierung';
import WohnungSanierung from './pages/WohnungSanierung';
import GastronomieAusbau from './pages/GastronomieAusbau';
import Heizmethoden from './pages/Heizmethoden';
import Heizkoerper from './pages/Heizkoerper';
import Heizstraenge from './pages/Heizstraenge';
import Fussbodenheizung from './pages/Fussbodenheizung';
import Waermepumpe from './pages/Waermepumpe';
import GasHeizung from './pages/GasHeizung';
import Pelletofen from './pages/Pelletofen';
import Saunaofen from './pages/Saunaofen';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/gewerke" element={<Gewerke />} />
        <Route path="/badsanierung" element={<Badsanierung />} />
        <Route path="/kuechen-moebelbau" element={<KuechenMoebelbau />} />
        <Route path="/boeden-belaege" element={<BoedenBelaege />} />
        <Route path="/elektroinstallation" element={<Elektroinstallation />} />
        <Route path="/trockenbau" element={<Trockenbau />} />
        <Route path="/maler-lackierer" element={<MalerLackierer />} />
        <Route path="/fassadensanierung" element={<Fassadensanierung />} />
        <Route path="/abdichtung-keller" element={<AbdichtungKeller />} />
        <Route path="/dachsanierung" element={<Dachsanierung />} />
        <Route path="/treppen-gelaender" element={<TreppenGelaender />} />
        <Route path="/garten-aussenanlagen" element={<GartenAussenanlagen />} />
        <Route path="/barrierefreiheit" element={<Barrierefreiheit />} />
        <Route path="/fenstertechnik" element={<Fenstertechnik />} />
        <Route path="/rohbau-abbruch" element={<RohbauAbbruch />} />
        <Route path="/tueren-zargen" element={<TuerenZargen />} />
        <Route path="/sanitaerinstallation" element={<Sanitaerinstallation />} />
        <Route path="/zaeune" element={<Zaeune />} />
        <Route path="/komplett-pakete" element={<KomplettPakete />} />
        <Route path="/projekte" element={<Projekte />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/blitz-angebot" element={<BlitzAngebot />} />
        <Route path="/kalkulator" element={<Kalkulator />} />
        <Route path="/haus-sanierung" element={<HausSanierung />} />
        <Route path="/wohnung-sanierung" element={<WohnungSanierung />} />
        <Route path="/gastronomie-ausbau" element={<GastronomieAusbau />} />
        <Route path="/heizmethoden" element={<Heizmethoden />} />
        <Route path="/heizkoerper" element={<Heizkoerper />} />
        <Route path="/heizstraenge" element={<Heizstraenge />} />
        <Route path="/fussbodenheizung" element={<Fussbodenheizung />} />
        <Route path="/waermepumpe" element={<Waermepumpe />} />
        <Route path="/gas-heizung" element={<GasHeizung />} />
        <Route path="/pelletofen" element={<Pelletofen />} />
        <Route path="/saunaofen" element={<Saunaofen />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
      </Route>
    </Routes>
  );
}
