import { useEffect, useState } from 'react';
import estatua from '../assets/images/Hero4.webp';
import { FaWhatsapp } from 'react-icons/fa';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      className="relative min-h-screen bg-no-repeat bg-cover overflow-hidden"
      style={{
        backgroundImage: `url(${estatua})`,
        backgroundPosition: isMobile ? '70% center' : 'center',
        backgroundAttachment: isMobile ? 'scroll' : 'fixed',
      }}
    >
      {/* Capa oscura para móvil */}
      {isMobile && <div className="absolute inset-0 bg-black opacity-30 z-0" />}

      {/* Contenido principal */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center md:justify-start px-4 sm:px-8 md:px-20">
        <div className="text-center md:text-left max-w-2xl space-y-6">

          <div className="w-full max-w-6xl mx-auto px-6 py-12 flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight font-montserrat tracking-tight">
              Cumple con la Ley{' '}
              <span
                className="inline-block"
                style={{
                  background: 'linear-gradient(90deg, #d4af37, #f5e27a, #d4af37)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Protege tu Empresa
              </span>
              <br />
              <span className="block text-[#e6d769] mt-2">Crece con Legal 360</span>
            </h1>

            <div className="mt-10
             space-y-2">
              <p className="text-[#1d1d1b] bg-[#e6d769] px-3 py-2 inline-block rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:scale-105 transition-transform duration-300 animate-bounce">
                Acompañamiento mensual o por evento
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Separador decorativo SVG */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-20 leading-none">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="w-full h-[60px]"
        >
          <path
            d="M0.00,49.98 C150.00,150.00 349.19,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            className="fill-[#001e33]"
          />
        </svg>
      </div>

      {/* Botón WhatsApp flotante */}
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

export default Hero;
