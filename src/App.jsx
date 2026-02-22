import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SSTLegal360 from './pages/SSTLegal360';
import DerechoLaboral from './pages/DerechoLaboral';
import DerechoComercial from './pages/DerechoComercial';
import CapacitacionesJuridicas from './pages/CapacitacionesJuridicas';
import CicloCapacitaciones from './pages/CicloCapacitaciones'; // <-- Nueva importación
import PoliticaDatos from './pages/PoliticaDatos';
import Footer from './pages/Footer';
import TerminosWeb from './pages/TerminosWeb';
import Login from './pages/Login';
import UserCrudForm from './pages/userCrudForm';
import RutaPrivada from './components/RutaPrivada';
import DiagnosticoCrud from './pages/diagnosticoCrud';
import PQRSFManagement from './pages/PQRSFManagement';
import AdminLayout from './components/AdminLayout';
import BlogCRUD from './pages/BlogCRUD';
import BlogView from './pages/BlogView';

function App() {
  const location = useLocation();

  // Oculta el navbar si estamos en /admin o alguna de sus subrutas
  const hideNavbar = location.pathname.startsWith('/admin');

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sst" element={<SSTLegal360 />} />
        <Route path="/derecho-laboral" element={<DerechoLaboral />} />
        <Route path="/comercial" element={<DerechoComercial />} />
        <Route path="/capacitaciones" element={<CapacitacionesJuridicas />} />
        {/* 👇 Nueva ruta agregada */}
        <Route path="/ciclo-capacitaciones" element={<CicloCapacitaciones />} /> 
        <Route path="/politica-datos" element={<PoliticaDatos />} />
        <Route path="/terminos-condiciones" element={<TerminosWeb />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog/:slug" element={<BlogView />} />

        {/* Rutas protegidas con layout */}
        <Route
          path="/admin"
          element={
            <RutaPrivada>
              <AdminLayout />
            </RutaPrivada>
          }
        >
          <Route index element={<UserCrudForm />} /> {/* 👈 Página por defecto */}
          <Route path="usuarios" element={<UserCrudForm />} />
          <Route path="diagnosticos" element={<DiagnosticoCrud />} />
          <Route path="pqsfr" element={<PQRSFManagement />} />
          <Route path="blog" element={<BlogCRUD />} />
        </Route>
      </Routes>

      {!hideNavbar && <Footer />}
    </>
  );
}

export default App;