import { useState, useEffect } from 'react';
import {
  UserSwitchOutlined,
  FileProtectOutlined,
  SafetyCertificateOutlined,
  ReadOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import bustos from '../assets/images/bustos.webp';
import MariCris from '../assets/videos/MariCris.MOV'
import Teamlegal from '../assets/images/Teamlegal.webp'

const Servicios = ({ id }) => {
  const [activeId, setActiveId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const animationDelays = ['0s', '0.2s', '0.4s', '0.6s'];

  const iconStyle = {
    fontSize: '3.5rem',
    color: '#e6d769'
  };

  const backgroundPosition = isMobile ? ' center top' : 'center';

  const servicios = [
    {
      id: 1,
      titulo: 'Derecho Laboral y Seguridad Social',
      icono: <UserSwitchOutlined style={iconStyle} />,
      resumen: 'Acompañamiento legal en materia laboral y de seguridad social, protegiendo a tu empresa y optimizando la relación con tus colaboradores.',
      link: '/derecho-laboral'
    },

    {
      id: 2,
      titulo: 'Pensiones',
      icono: <ReadOutlined style={iconStyle} />,
      resumen: 'Asesoria legal en pensiones de vejez, invalidez y sobrevivientes, cálculo actuarial y reclamaciones ante la Junta de Calificación.',
      link: '/capacitaciones'
    },
    {
      id: 3,
      titulo: 'Derecho Comercial',
      icono: <FileProtectOutlined style={iconStyle} />,
      resumen: 'Asesoría legal en derecho comercial para la tomas de decisiones empresariales seguras, protegiendo tu negocio y respaldando cada acuerdo con confianza.',
      link: '/comercial'
    },
    {
      id: 4,
      titulo: 'Seguridad y Salud en el Trabajo',
      icono: <SafetyCertificateOutlined style={iconStyle} />,
      resumen: 'Apoyo legal a tu área de Seguridad y Salud en el Trabajo para asegurar el cumplimiento normativo y prevenir riesgos jurídicos y laborales.',
      link: '/sst'
    },
  ];

  return (
    <section
      id="servicios"
      className="relative pt-20 text-white min-h-screen pb-10 overflow-hidden"
      style={{
        backgroundImage: `url(${Teamlegal})`,
        backgroundSize: 'cover',
        backgroundPosition: isMobile ? '40%' : 'center 20%', // aquí se baja la imagen
        backgroundAttachment: isMobile ? 'scroll' : 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/75 z-10 pointer-events-none"></div>


      {/* Capa oscura para contraste */}
      <div className="absolute inset-0 bg-black opacity-10 z-10"></div>

      {/* Ola superior */}
      <div className="w-full overflow-hidden absolute top-0 left-0 z-20">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-[40px] rotate-180">
          <path d="M0.00,49.98 C150.00,150.00 349.19,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" className="fill-[#001e33]" />
        </svg>
      </div>

      {/* Fondo oscuro */}
      <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 font-montserrat text-[#e6d769]">
          Asesoría y Consultoría Empresarial
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-12 font-roboto">
          Asesoría legal, clara y eficiente para proteger a tu empresa.
        </p>

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-2 sm:px-4 md:px-10 justify-items-center">
          {servicios.map((servicio, index) => {
            const isFlipped = activeId === servicio.id;
            return (
              <div
                key={servicio.id}
                className={`relative w-full max-w-[280px] aspect-[3/4] perspective ${isMobile ? 'mobile-fade-in' : ''}`}
                style={isMobile ? { '--delay': animationDelays[index % animationDelays.length] } : {}}
              >
                <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                  {/* Cara frontal */}
                  <div
                    onClick={() => setActiveId(servicio.id)}
                    className="absolute w-full h-full backface-hidden bg-[#032b4c]/50 rounded-2xl px-4 py-6 shadow-xl border border-[#0f3a57] hover:border-[#e6d769] flex flex-col justify-center items-center text-center cursor-pointer"
                  >
                    <div className="mb-4">{servicio.icono}</div>
                    <h3 className="text-sm font-semibold text-[#e6d769] uppercase tracking-wide mb-4 leading-snug">
                      {servicio.titulo}
                    </h3>
                    <div className="mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveId(servicio.id);
                        }}
                        className="text-xs text-[#001e33] bg-[#e6d769] hover:bg-[#f1e28c] font-semibold px-4 py-1.5 rounded-full transition"
                      >
                        Ver detalles
                      </button>
                    </div>
                  </div>

                  {/* Cara trasera */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-[#001e33] border border-[#e6d769] rounded-2xl px-4 py-6 flex flex-col justify-center items-center text-center">
                    <h3 className="text-base sm:text-lg font-bold text-[#e6d769] mb-3">
                      {servicio.titulo}
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm mb-4 leading-normal max-w-sm w-full">
                      {servicio.resumen}
                    </p>
                    <button
                      onClick={() => navigate(servicio.link)}
                      className="text-xs bg-[#e6d769] text-[#001e33] font-semibold px-4 py-1.5 rounded-full hover:bg-[#f1e28c] transition animate-bounce"
                    >
                      Más información
                    </button>
                    <button
                      onClick={() => setActiveId(null)}
                      className="mt-3 text-xs text-[#e6d769] underline hover:text-white"
                    >
                      Volver
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Estilos personalizados */}
      <style jsx>{`
        @keyframes fadeInMobile {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .mobile-fade-in {
          opacity: 0;
          animation: fadeInMobile 0.8s ease-in-out forwards var(--delay, 0s);
        }
        .perspective {
          perspective: 1500px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

export default Servicios;
