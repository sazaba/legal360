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
      className="relative bg-cover bg-no-repeat min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${estatua})`,
        backgroundPosition: isMobile ? '70% center' : 'center center',
        backgroundAttachment: isMobile ? 'scroll' : 'fixed',
      }}
    >
      {/* Capa de opacidad más oscura en móviles */}
      {isMobile && <div className="absolute inset-0 bg-black opacity-20 z-0"></div>}

      {/* Contenido */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center md:justify-start px-4 sm:px-6 md:px-12">
        <div className="text-center md:text-left max-w-2xl">
          <h1 className="text-white text-3xl sm:text-4xl md:text-4xl lg:text-6xl font-bold mb-6 leading-tight font-montserrat">
            Cumple con la Ley{' '}
            <span className="bg-gradient-to-r from-[#d4af37] via-[#f5e27a] to-[#d4af37] bg-clip-text text-transparent">
              Protege tu Empresa
            </span>
            <br />
            Crece con Legal 360
          </h1>

          <p className="text-white text-base sm:text-lg md:text-xl mb-6 font-roboto">
            Legal, Claro y Eficiente
          </p>

          <a
            href="#servicios"
            className="inline-block font-bold py-3 px-8 rounded-full text-xs sm:text-sm md:text-base font-roboto shadow-lg transition-all duration-300 transform hover:bg-[#CC0000] hover:text-[#001e33] hover:shadow-xl hover:scale-105 text-[#001e33]"
            style={{
              background:
                'linear-gradient(90deg, #d4af37 0%, #f5e27a 50%, #d4af37 100%)',
            }}
          >
            Conoce nuestros servicios
          </a>
        </div>
      </div>

      {/* Separador decorativo */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-20">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="w-full h-[40px]"
        >
          <path
            d="M0.00,49.98 C150.00,150.00 349.19,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            className="fill-[#001e33]"
          />
        </svg>
      </div>

      {/* Botón WhatsApp */}
      <a
        href="https://wa.link/biqv3m"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 p-4 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl animate-bounce z-50"
        style={{
          background:
            'linear-gradient(135deg, #d4af37 0%, #f5e27a 50%, #d4af37 100%)',
          color: '#001e33',
        }}
      >
        <FaWhatsapp className="text-2xl sm:text-3xl" />
      </a>
    </section>
  );
};

export default Hero;
