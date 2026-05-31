import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Lazy load all pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Gewerke = lazy(() => import('./pages/Gewerke'));
const Badsanierung = lazy(() => import('./pages/Badsanierung'));
const KuechenMoebelbau = lazy(() => import('./pages/KuechenMoebelbau'));
const BoedenBelaege = lazy(() => import('./pages/BoedenBelaege'));
const Elektroinstallation = lazy(() => import('./pages/Elektroinstallation'));
const Trockenbau = lazy(() => import('./pages/Trockenbau'));
const MalerLackierer = lazy(() => import('./pages/MalerLackierer'));
const Fassadensanierung = lazy(() => import('./pages/Fassadensanierung'));
const AbdichtungKeller = lazy(() => import('./pages/AbdichtungKeller'));
const Dachsanierung = lazy(() => import('./pages/Dachsanierung'));
const TreppenGelaender = lazy(() => import('./pages/TreppenGelaender'));
const GartenAussenanlagen = lazy(() => import('./pages/GartenAussenanlagen'));
const Barrierefreiheit = lazy(() => import('./pages/Barrierefreiheit'));
const Fenstertechnik = lazy(() => import('./pages/Fenstertechnik'));
const RohbauAbbruch = lazy(() => import('./pages/RohbauAbbruch'));
const TuerenZargen = lazy(() => import('./pages/TuerenZargen'));
const Sanitaerinstallation = lazy(() => import('./pages/Sanitaerinstallation'));
const Zaeune = lazy(() => import('./pages/Zaeune'));
const KomplettPakete = lazy(() => import('./pages/KomplettPakete'));
const Projekte = lazy(() => import('./pages/Projekte'));
const ProjektDetail = lazy(() => import('./pages/ProjektDetail'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Kontakt = lazy(() => import('./pages/Kontakt'));
const BlitzAngebot = lazy(() => import('./pages/BlitzAngebot'));
const Kalkulator = lazy(() => import('./pages/Kalkulator'));
const HausSanierung = lazy(() => import('./pages/HausSanierung'));
const WohnungSanierung = lazy(() => import('./pages/WohnungSanierung'));
const GastronomieAusbau = lazy(() => import('./pages/GastronomieAusbau'));
const Heizmethoden = lazy(() => import('./pages/Heizmethoden'));
const Heizkoerper = lazy(() => import('./pages/Heizkoerper'));
const Heizstraenge = lazy(() => import('./pages/Heizstraenge'));
const Fussbodenheizung = lazy(() => import('./pages/Fussbodenheizung'));
const Waermepumpe = lazy(() => import('./pages/Waermepumpe'));
const GasHeizung = lazy(() => import('./pages/GasHeizung'));
const Pelletofen = lazy(() => import('./pages/Pelletofen'));
const Saunaofen = lazy(() => import('./pages/Saunaofen'));
const Impressum = lazy(() => import('./pages/Impressum'));
const Datenschutz = lazy(() => import('./pages/Datenschutz'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminBlog = lazy(() => import('./pages/AdminBlog'));
const AdminEditor = lazy(() => import('./pages/AdminEditor'));

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/gewerke" element={<Gewerke />} />
          <Route path="/badsanierung" element={<Badsanierung />} />
          <Route path="/badsanierung-gaeste-wc" element={<Badsanierung />} />
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
          <Route path="/projekte/:slug" element={<ProjektDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
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
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/blog" element={<AdminBlog />} />
          <Route path="/admin/blog/new" element={<AdminEditor />} />
          <Route path="/admin/blog/:slug" element={<AdminEditor />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
