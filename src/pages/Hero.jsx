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
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-montserrat">
            Cumple con la Ley{' '}
            <span
              className="font-bold"
              style={{
                background: 'linear-gradient(to right, #d4af37, #f5e27a, #d4af37)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Protege tu Empresa
            </span>
            <span className="block">Crece con Legal 360</span>
          </h1>

          <p className="text-white text-base sm:text-lg md:text-xl font-roboto">
            Legal, Claro y Eficiente
          </p>

          <a
            href="#servicios"
            className="inline-block font-bold py-3 px-6 sm:px-8 rounded-full text-xs sm:text-sm md:text-base font-roboto shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-[#cc0000] hover:text-[#001e33] text-[#001e33]"
            style={{
              background: 'linear-gradient(90deg, #d4af37 0%, #f5e27a 50%, #d4af37 100%)',
            }}
          >
            Conoce nuestros servicios
          </a>
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
        href="https://wa.link/biqv3m"
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
