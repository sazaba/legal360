import { useState, useEffect } from 'react';
import {
  UserSwitchOutlined,
  FileProtectOutlined,
  SafetyCertificateOutlined,
  ReadOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import bustos from '../assets/images/bustos.webp';
import serviciores from '../assets/images/serviciores.webp';

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

  const backgroundPosition = isMobile ? '20% center' : 'center';

  const servicios = [
    {
      id: 1,
      titulo: 'Derecho Laboral y Seguridad Social',
      icono: <UserSwitchOutlined style={iconStyle} />,
      resumen: 'Acompañamiento legal en materia laboral y de seguridad social, protegiendo a tu empresa y optimizando la relación con tus colaboradores.',
      link: 'https://legal360.com/laboral'
    },
    {
      id: 2,
      titulo: 'Derecho Comercial',
      icono: <FileProtectOutlined style={iconStyle} />,
      resumen: 'Asesoría legal en derecho comercial para la tomas de decisiones empresariales seguras, protegiendo tu negocio y respaldando cada acuerdo con confianza.',
      link: 'https://legal360.com/comercial'
    },
    {
      id: 3,
      titulo: 'Seguridad y Salud en el Trabajo',
      icono: <SafetyCertificateOutlined style={iconStyle} />,
      resumen: 'Apoyo legal a tu área de Seguridad y Salud en el Trabajo para asegurar el cumplimiento normativo y prevenir riesgos jurídicos y laborales.',
      link: '/sst'
    },
    {
      id: 4,
      titulo: 'Capacitaciones Jurídicas',
      icono: <ReadOutlined style={iconStyle} />,
      resumen: 'Capacitaciones jurídicas prácticas y actualizadas para fortalecer el cumplimiento legal en tu empresa.',
      link: 'https://legal360.com/capacitaciones'
    },
  ];

  return (
    <section
      id="servicios"
      className="relative pt-20 text-white min-h-screen pb-8"
      style={{
        backgroundImage: `url(${isMobile ? serviciores : bustos})`,
        backgroundSize: 'cover',
        backgroundPosition: backgroundPosition,
        backgroundAttachment: isMobile ? 'scroll' : 'fixed'
      }}
    >
      <div className="w-full overflow-hidden absolute top-0 left-0 z-20">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-[40px] rotate-180">
          <path
            d="M0.00,49.98 C150.00,150.00 349.19,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            className="fill-[#001e33]"
          />
        </svg>
      </div>

      <div className="absolute inset-0 bg-[#001e33] opacity-70 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 font-montserrat text-[#e6d769]">
          Asesoría y Consultoría Empresarial
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-16 font-roboto">
          Asesoría legal integral, clara y eficiente para proteger a tu empresa.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {servicios.map((servicio, index) => {
            const isFlipped = activeId === servicio.id;
            return (
              <div key={servicio.id} className={`relative w-[90%] sm:w-[80%] md:w-[280px] h-[360px] sm:h-[400px] md:h-[420px] mx-auto perspective ${isMobile ? 'mobile-fade-in' : ''}`}
                style={isMobile ? { '--delay': animationDelays[index % animationDelays.length] } : {}}>
                <div
                  className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                >
                  {/* Front */}
                  <div
                    onClick={() => setActiveId(servicio.id)}
                    className="absolute w-[90%] h-[90%] backface-hidden bg-[#032b4c]/50 rounded-2xl px-2 py-12 shadow-xl border border-[#0f3a57] hover:border-[#e6d769] flex flex-col justify-center items-center text-center cursor-pointer"
                  >
                    <div className="mb-6">{servicio.icono}</div>
                    <h3 className="text-md font-semibold text-[#e6d769] uppercase tracking-wide mb-6 w-full max-w-[360px] mx-auto leading-snug">
                      {servicio.titulo}
                    </h3>
                    <div className="mt-6">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveId(servicio.id);
                        }}
                        className="text-sm text-[#001e33] bg-[#e6d769] hover:bg-[#f1e28c] font-semibold px-6 py-2 rounded-full transition"
                      >
                        Ver detalles
                      </button>
                    </div>
                  </div>

                  {/* Back */}
                  <div className="absolute w-[90%] h-[90%]  backface-hidden rotate-y-180 bg-[#001e33] border border-[#e6d769] rounded-2xl px-8 py-12 flex flex-col justify-center items-center text-center">
                    <h3 className="text-2xl font-bold text-[#e6d769] mb-4">{servicio.titulo}</h3>
                    <p className="text-gray-300 text-sm md:text- mb-6 leading-normal max-w-2xl w-full">
                      {servicio.resumen}
                    </p>

                    {servicio.titulo === 'Seguridad y Salud en el Trabajo' ? (
                      <button
                        onClick={() => navigate('/sst')}
                        className="text-sm bg-[#e6d769] text-[#001e33] font-semibold px-6 py-2 rounded-full hover:bg-[#f1e28c] transition animate-bounce"
                      >
                        Más información
                      </button>
                    ) : servicio.titulo === 'Derecho Laboral y Seguridad Social' ? (
                      <button
                        onClick={() => navigate('/derecho-laboral')}
                        className="text-sm bg-[#e6d769] text-[#001e33] font-semibold px-6 py-2 rounded-full hover:bg-[#f1e28c] transition animate-bounce"
                      >
                        Más información
                      </button>
                    ) : servicio.titulo === 'Derecho Comercial' ? (
                      <button
                        onClick={() => navigate('/comercial')}
                        className="text-sm bg-[#e6d769] text-[#001e33] font-semibold px-6 py-2 rounded-full hover:bg-[#f1e28c] transition animate-bounce"
                      >
                        Más información
                      </button>
                    ) : servicio.titulo === 'Capacitaciones Jurídicas' ? (
                      <button
                        onClick={() => navigate('/capacitaciones')}
                        className="text-sm bg-[#e6d769] text-[#001e33] font-semibold px-6 py-2 rounded-full hover:bg-[#f1e28c] transition animate-bounce"
                      >
                        Más información
                      </button>
                    ) : (
                      <a
                        href={servicio.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm bg-[#e6d769] text-[#001e33] font-semibold px-6 py-2 rounded-full hover:bg-[#f1e28c] transition animate-bounce"
                      >
                        Más información
                      </a>
                    )}

                    <button
                      onClick={() => setActiveId(null)}
                      className="mt-4 text-xs text-[#e6d769] underline hover:text-white"
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
