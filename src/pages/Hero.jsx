import { useState } from 'react';
import estatua from '../assets/images/Hero4.webp';
import estatuaresponsive from '../assets/images/estatuaresponsive.webp';
import estatuatablet from '../assets/images/estatuatablet.webp';
import logo from '../assets/images/logolegal.webp';
import { FaWhatsapp } from 'react-icons/fa';
import Typewriter from 'typewriter-effect';
import '../index.css';

const Hero = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    // 1. Usamos 100dvh (Dynamic Viewport) para que se adapte suavemente a la barra de Safari
    <section className="relative min-h-screen sm:min-h-[100dvh] w-full overflow-hidden bg-[#0c111b] flex flex-col justify-center">
      
      {/* 2. pointer-events-none para que no interfiera con los toques en la pantalla */}
      <picture className="absolute inset-0 w-full h-full z-0 block pointer-events-none">
        <source media="(min-width: 1025px)" srcSet={estatua} />
        <source media="(min-width: 768px)" srcSet={estatuatablet} />
        {/* 3. El truco maestro: scale-[1.05]. Expande la imagen un 5% fuera de la pantalla. */}
        {/* Así, durante el salto de Safari, los bordes ocultos cubren el hueco azul oscuro. */}
        <img
          src={estatuaresponsive}
          alt="Fondo Hero Legal 360"
          loading="eager"
          fetchpriority="high"
          onLoad={() => setIsImageLoaded(true)}
          className={`w-full h-full object-cover object-[70%_center] md:object-center transform scale-[1.05] transition-opacity duration-1000 ease-in-out ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ color: 'transparent', backgroundColor: 'transparent' }}
        />
      </picture>

      <div className="absolute inset-0 bg-black/40 md:bg-black/20 z-10 pointer-events-none" />

      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between px-4 sm:px-8 md:px-20 gap-8 pt-20 pb-16">
        
        <div className="text-center md:text-left max-w-2xl space-y-4 sm:space-y-6 flex flex-col items-center md:items-start pt-10 sm:pt-0">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-lg">
            Cumple con la Ley{' '}
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f5e27a] to-[#d4af37]">
              Protege tu Empresa
            </span>
            <br />
            <span className="block text-[#e6d769] mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold drop-shadow-md">
              Crece con Legal 360
            </span>
          </h1>

          <div className="mt-4 sm:mt-6 min-h-[2rem] sm:min-h-[2.5rem]">
            <div className="font-bold text-lg sm:text-xl md:text-2xl text-[#f5e27a] drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)] tracking-wide">
              <Typewriter
                options={{
                  strings: ['Acompañamiento Mensual o Por Evento!'],
                  autoStart: true,
                  loop: true,
                  delay: 60,
                  deleteSpeed: 40,
                  cursorClassName: 'animate-pulse text-[#f5e27a]',
                }}
              />
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-center justify-center w-full max-w-[280px] lg:max-w-[320px] drop-shadow-2xl">
          <img src={logo} alt="Logo Legal 360" className="w-full h-auto object-contain" />
        </div>
      </div>

     {/* Separador SVG Inferior - Optimizado anti-glitch Safari */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-20 pointer-events-none translate-y-[2px]">
        <svg 
          viewBox="0 0 500 150" 
          preserveAspectRatio="none" 
          /* Eliminamos drop-shadow-md y forzamos block */
          className="w-full h-[30px] sm:h-[40px] block"
        >
          <path
            d="M0.00,49.98 C150.00,150.00 349.19,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            className="fill-[#0c111b]" /* Asegúrate de que este color coincida con el fondo de "Quienes Somos" */
          />
        </svg>
      </div>

      {/* Botón WhatsApp */}
      <a
        href="https://wa.link/twbzum"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 p-4 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 animate-bounce z-50 bg-gradient-to-br from-[#d4af37] via-[#f5e27a] to-[#d4af37] text-[#001e33] pointer-events-auto"
      >
        <FaWhatsapp className="text-3xl" />
      </a>
    </section>
  );
};


export default Hero;