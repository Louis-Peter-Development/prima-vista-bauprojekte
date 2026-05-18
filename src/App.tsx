import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Gewerke from './pages/Gewerke';
import KomplettPakete from './pages/KomplettPakete';
import Projekte from './pages/Projekte';
import Kontakt from './pages/Kontakt';
import BlitzAngebot from './pages/BlitzAngebot';
import Kalkulator from './pages/Kalkulator';
import HausSanierung from './pages/HausSanierung';
import WohnungSanierung from './pages/WohnungSanierung';
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
        <Route path="/komplett-pakete" element={<KomplettPakete />} />
        <Route path="/projekte" element={<Projekte />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/blitz-angebot" element={<BlitzAngebot />} />
        <Route path="/kalkulator" element={<Kalkulator />} />
        <Route path="/haus-sanierung" element={<HausSanierung />} />
        <Route path="/wohnung-sanierung" element={<WohnungSanierung />} />
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
