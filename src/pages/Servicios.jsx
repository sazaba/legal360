import { useState } from 'react';
import {
  UserSwitchOutlined,
  FileProtectOutlined,
  SafetyCertificateOutlined,
  ReadOutlined,
  BulbOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Teamlegal from '../assets/images/Teamlegal.webp';
import serviciosmobile from '../assets/images/serviciosmobile.webp';

const Servicios = ({ id }) => {
  const [activeId, setActiveId] = useState(null);
  const navigate = useNavigate();

  const animationDelays = ['0s', '0.15s', '0.3s', '0.45s', '0.6s'];

  const iconStyle = {
    fontSize: '3.5rem',
    color: '#e6d769',
    filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.4))'
  };

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
      resumen: 'Asesoría legal en pensiones de vejez, invalidez y sobrevivientes, cálculo actuarial y reclamaciones ante la Junta de Calificación.',
      link: '/capacitaciones'
    },
    {
      id: 3,
      titulo: 'Derecho Comercial',
      icono: <FileProtectOutlined style={iconStyle} />,
      resumen: 'Asesoría legal en derecho comercial para la toma de decisiones empresariales seguras, protegiendo tu negocio y respaldando cada acuerdo con confianza.',
      link: '/comercial'
    },
    {
      id: 4,
      titulo: 'Seguridad y Salud en el Trabajo',
      icono: <SafetyCertificateOutlined style={iconStyle} />,
      resumen: 'Apoyo legal a tu área de Seguridad y Salud en el Trabajo para asegurar el cumplimiento normativo y prevenir riesgos jurídicos y laborales.',
      link: '/sst'
    },
    {
      id: 5,
      titulo: 'Ciclo de Capacitaciones',
      icono: <BulbOutlined style={iconStyle} />,
      resumen: 'Capacitación integral para el talento humano, fortaleciendo tus habilidades y optimizando la gestión y bienestar laboral de tu empresa.',
      link: '/ciclo-capacitaciones'
    }
  ];

  return (
    <section
      id={id || "servicios"}
      className="relative pt-24 text-white min-h-screen pb-32 overflow-hidden isolate"
    >
      {/* FONDO OPTIMIZADO: CSS puro sin JS para evitar lag en Safari */}
      <div className="absolute inset-0 z-[-2]">
        <picture className="w-full h-full block">
          <source media="(min-width: 1024px)" srcSet={Teamlegal} />
          <img 
            src={serviciosmobile} 
            alt="Servicios Legal 360" 
            loading="lazy"
            className="w-full h-full object-cover object-[center_20%] transform-gpu will-change-transform"
          />
        </picture>
      </div>

      <div className="absolute inset-0 bg-[#001e33]/40 z-[-1] pointer-events-none mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#001e33] via-[#001e33]/80 to-[#001e33] opacity-90 z-[-1] pointer-events-none"></div>
      
      {/* OLA SUPERIOR (Conecta con Quienes Somos) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden z-20 -translate-y-[1px]">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-[40px] sm:h-[60px] block rotate-180 drop-shadow-md">
          <path d="M0.00,49.98 C150.00,150.00 349.19,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" className="fill-[#0c111b]" />
        </svg>
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center mt-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-montserrat text-transparent bg-clip-text bg-gradient-to-r from-[#e6d769] to-[#f1e28c] drop-shadow-lg">
          Asesoría y Consultoría Empresarial
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-14 font-roboto font-light tracking-wide max-w-2xl mx-auto">
          Asesoría legal, clara y eficiente para proteger a tu empresa.
        </p>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 px-2">
          {servicios.map((servicio, index) => {
            const isFlipped = activeId === servicio.id;
            return (
              <div
                key={servicio.id}
                className="relative w-full max-w-[280px] aspect-[3/4] perspective mobile-fade-in"
                style={{ '--delay': animationDelays[index % animationDelays.length] }}
              >
                <div className={`relative w-full h-full card-transition transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                  
                  {/* FRONT CARD */}
                  <div
                    onClick={() => setActiveId(servicio.id)}
                    className="absolute w-full h-full backface-hidden rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] border border-white/10 glass-panel hover:border-[#e6d769]/50 flex flex-col justify-center items-center text-center cursor-pointer group transition-colors duration-300"
                  >
                    <div className="mb-5 transform group-hover:scale-110 transition-transform duration-500 ease-out">
                      {servicio.icono}
                    </div>
                    <h3 className="text-sm font-semibold text-[#e6d769] uppercase tracking-wider mb-6 leading-relaxed">
                      {servicio.titulo}
                    </h3>
                    <div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveId(servicio.id);
                        }}
                        className="text-xs text-[#001e33] bg-gradient-to-r from-[#e6d769] to-[#f1e28c] hover:shadow-[0_0_15px_rgba(230,215,105,0.4)] font-bold px-6 py-2.5 rounded-full transition-all duration-300 uppercase tracking-widest"
                      >
                        Ver detalles
                      </button>
                    </div>
                  </div>

                  {/* BACK CARD */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] border border-[#e6d769]/40 glass-panel-dark flex flex-col justify-center items-center text-center">
                    <h3 className="text-base sm:text-lg font-bold text-[#e6d769] mb-3">
                      {servicio.titulo}
                    </h3>
                    <p className="text-gray-200 text-xs sm:text-sm mb-5 leading-relaxed font-light">
                      {servicio.resumen}
                    </p>
                    <div className="flex flex-col items-center gap-3">
                      <button
                        onClick={() => navigate(servicio.link)}
                        className="text-xs bg-transparent border border-[#e6d769] text-[#e6d769] font-bold px-5 py-2 rounded-full hover:bg-[#e6d769] hover:text-[#001e33] transition-all duration-300 uppercase tracking-wider"
                      >
                        Más información
                      </button>
                      <button
                        onClick={() => setActiveId(null)}
                        className="text-xs text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-1"
                      >
                        <span aria-hidden="true">&larr;</span> Volver
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* OLA INFERIOR (Transición suave hacia FormularioPlanes) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-20 translate-y-[2px] pointer-events-none">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-[50px] sm:h-[80px] block">
          {/* El color #f8fafc coincide exactamente con el fondo del Formulario */}
          <path d="M0.00,49.98 C150.00,150.00 349.19,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" className="fill-[#f8fafc]" />
        </svg>
      </div>

      <style jsx>{`
        /* Animación optimizada por CSS Media Queries (Cero JS) */
        .mobile-fade-in { opacity: 1; }
        @media (max-width: 767px) {
          @keyframes fadeInMobile {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .mobile-fade-in {
            opacity: 0;
            animation: fadeInMobile 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards var(--delay, 0s);
          }
        }
        
        .glass-panel {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .glass-panel-dark {
          background: linear-gradient(135deg, rgba(0, 30, 51, 0.85) 0%, rgba(3, 43, 76, 0.95) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .perspective {
          perspective: 2000px;
          -webkit-perspective: 2000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
        }
        .card-transition {
          transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
          -webkit-transition: -webkit-transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
          -webkit-transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

export default Servicios;