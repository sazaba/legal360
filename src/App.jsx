import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SSTLegal360 from './pages/SSTLegal360';
import DerechoLaboral from './pages/DerechoLaboral';
import DerechoComercial from './pages/DerechoComercial';
import CapacitacionesJuridicas from './pages/CapacitacionesJuridicas';
import CicloCapacitaciones from './pages/CicloCapacitaciones';
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
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Oculta elementos públicos si estamos en /admin
  const hideNavbar = location.pathname.startsWith('/admin');

  // NUEVO: Lista de rutas donde NO queremos que estorbe WhatsApp
  const rutasServicios = [
    '/sst', 
    '/derecho-laboral', 
    '/comercial', 
    '/capacitaciones', 
    '/ciclo-capacitaciones'
  ];
  const hideWhatsAppEnServicios = rutasServicios.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sst" element={<SSTLegal360 />} />
        <Route path="/derecho-laboral" element={<DerechoLaboral />} />
        <Route path="/comercial" element={<DerechoComercial />} />
        <Route path="/capacitaciones" element={<CapacitacionesJuridicas />} />
        <Route path="/ciclo-capacitaciones" element={<CicloCapacitaciones />} /> 
        <Route path="/politica-datos" element={<PoliticaDatos />} />
        <Route path="/terminos-condiciones" element={<TerminosWeb />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog/:slug" element={<BlogView />} />

        {/* Rutas protegidas con layout administrativo */}
        <Route
          path="/admin"
          element={
            <RutaPrivada>
              <AdminLayout />
            </RutaPrivada>
          }
        >
          <Route index element={<UserCrudForm />} />
          <Route path="usuarios" element={<UserCrudForm />} />
          <Route path="diagnosticos" element={<DiagnosticoCrud />} />
          <Route path="pqsfr" element={<PQRSFManagement />} />
          <Route path="blog" element={<BlogCRUD />} />
        </Route>
      </Routes>

      {!hideNavbar && <Footer />}

      {/* Condición final para WhatsApp: 
          No mostrar en Admin, No mostrar si el menú responsive está abierto, 
          y NO mostrar si estamos dentro de la vista de un servicio específico. */}
      {!hideNavbar && !isMenuOpen && !hideWhatsAppEnServicios && <WhatsAppButton />}
    </>
  );
}

export default App;