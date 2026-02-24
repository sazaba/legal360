import React, { useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { 
  CheckCircleOutlined, 
  BulbOutlined, 
  TeamOutlined, 
  SafetyCertificateOutlined, 
  LineChartOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import { FaWhatsapp } from 'react-icons/fa';

// ESPACIO PARA IMPORTAR TU VIDEO
// import v1 from '../assets/videos/tu_video.mp4'; 

const CicloCapacitaciones = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const modulos = [
    {
      titulo: 'Actualización normativa y legal',
      descripcion: 'Cumplimiento de requisitos y manejo adecuado de la normatividad vigente.',
      icono: <CheckCircleOutlined className="text-5xl text-[#e6d769]" />
    },
    {
      titulo: 'Desarrollo de habilidades blandas',
      descripcion: 'Liderazgo, comunicación asertiva, resolución de conflictos y trabajo en equipo.',
      icono: <TeamOutlined className="text-5xl text-[#e6d769]" />
    },
    {
      titulo: 'Gestión organizacional',
      descripcion: 'Optimización de procesos, productividad y cultura de la mejora continua.',
      icono: <LineChartOutlined className="text-5xl text-[#e6d769]" />
    },
    {
      titulo: 'Salud y bienestar laboral',
      descripcion: 'Estrategias de prevención, autocuidado y promoción de entornos saludables.',
      icono: <SafetyCertificateOutlined className="text-5xl text-[#e6d769]" />
    },
    {
      titulo: 'Gestión comercial',
      descripcion: 'Prospección y fidelización de clientes, gestión de cartera y seguimiento de clientes, capacitación en servicio al cliente.',
      icono: <BulbOutlined className="text-5xl text-[#e6d769]" />
    }
  ];

  return (
    <section className="relative w-full min-h-screen overflow-hidden pt-6">
      {/* VIDEO DE FONDO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        {/* <source src={v1} type="video/mp4" /> */}
        Tu navegador no soporta el video.
      </video>

      {/* OVERLAY AZUL */}
      <div className="absolute inset-0 bg-[#001e33]/60 z-10" />

      <div className="relative z-20 px-6 py-20 lg:px-24 text-white">
        {/* ENCABEZADO */}
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-[#e6d769] mb-4">
            Ciclo de Capacitaciones
          </h1>
          <p className="text-md md:text-lg text-gray-200 max-w-3xl mx-auto">
            Ofrecemos Ciclos de Capacitaciones para fortalecer el desarrollo integral del talento humano, enfocados en:
          </p>
        </div>

        {/* GRID DE MÓDULOS (DISEÑO IDENTICO) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center items-stretch max-w-7xl mx-auto">
          {modulos.map((modulo, index) => (
            <div
              key={index}
              className="bg-white/10 rounded-2xl shadow-md p-6 text-center backdrop-blur-md hover:scale-105 transition-transform duration-300 w-full"
            >
              <div className="flex justify-center mb-4">{modulo.icono}</div>
              <h2 className="text-lg font-semibold text-[#e6d769] mb-2">
                {modulo.titulo}
              </h2>
              <p className="text-sm text-gray-200">
                {modulo.descripcion}
              </p>
            </div>
          ))}
        </div>

        {/* BOTONES DE VOLVER */}
        <div className="mt-20 text-center">
          <Link
            to="/#servicios"
            className="gap-2 bg-[#e6d769] hover:bg-[#f1e28c] text-[#001e33] font-bold py-2 px-5 rounded-full shadow-md hover:scale-105 transition duration-300 fixed sm:top-24 sm:left-6 hidden sm:inline-flex z-50"
          >
            <ArrowLeftOutlined />
            <span>Volver</span>
          </Link>

          <div className="block sm:hidden mt-20 text-center z-20">
            <Link
              to="/#servicios"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d4af37] via-[#f5e27a] to-[#95642a] text-[#001e33] font-semibold py-2 px-5 rounded-full text-sm shadow-md hover:scale-105 transition-all duration-300"
            >
              <ArrowLeftOutlined className="text-base" />
              Regresar
            </Link>
          </div>
        </div>
      </div>

      {/* BOTÓN WHATSAPP */}
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 p-4 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl animate-bounce z-50"
        style={{
          background: 'linear-gradient(135deg, #d4af37 0%, #f5e27a 50%, #d4af37 100%)',
          color: '#001e33',
        }}
      >
        <FaWhatsapp className="text-2xl sm:text-3xl" />
      </a>
    </section>
  );
};

export default CicloCapacitaciones;