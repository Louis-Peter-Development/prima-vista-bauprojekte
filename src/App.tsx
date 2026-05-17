import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Gewerke from './pages/Gewerke';
import KomplettPakete from './pages/KomplettPakete';
import Projekte from './pages/Projekte';
import Kontakt from './pages/Kontakt';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/gewerke" element={<Gewerke />} />
        <Route path="/komplett-pakete" element={<KomplettPakete />} />
        <Route path="/projekte" element={<Projekte />} />
        <Route path="/kontakt" element={<Kontakt />} />
      </Route>
    </Routes>
  );
}
