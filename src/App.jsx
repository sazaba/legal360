import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SSTLegal360 from './pages/SSTLegal360'; // importa la nueva página
import DerechoLaboral from './pages/DerechoLaboral';
import DerechoComercial from './pages/DerechoComercial';
import CapacitacionesJuridicas from './pages/CapacitacionesJuridicas';
import PoliticaDatos from './pages/PoliticaDatos';
import Footer from './pages/Footer';
import TerminosWeb from './pages/TerminosWeb';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sst" element={<SSTLegal360 />} /> {/* nueva ruta */}
        <Route path="/derecho-laboral" element={<DerechoLaboral />} />
        <Route path="/comercial" element={<DerechoComercial />} />
        <Route path="/capacitaciones" element={<CapacitacionesJuridicas />} />
        <Route path="/" element={<Home />} />
        <Route path="/politica-datos" element={<PoliticaDatos />} />
        <Route path="/terminos-condiciones" element={<TerminosWeb />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
