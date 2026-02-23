import { useState, useEffect } from 'react';
import estatua from '../assets/images/Hero4.webp';
import estatuaresponsive from '../assets/images/estatuaresponsive.webp';
import estatuatablet from '../assets/images/estatuatablet.webp';
import logo from '../assets/images/logolegal.webp';
import { FaWhatsapp } from 'react-icons/fa';
import { ArrowDownOutlined } from '@ant-design/icons';
import Typewriter from 'typewriter-effect';
import '../index.css';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Un pequeño delay para asegurar que el navegador esté listo antes de mostrar
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.getElementById('por-que-nosotros');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-[100svh] bg-[#0c111b] overflow-hidden isolate flex items-center justify-center">
      
      {/* CAPA 1: FONDO E IMAGEN ESTABILIZADA */}
      <div className="absolute inset-0 z-[-1]">
        <picture className="block w-full h-full pointer-events-none">
          <source media="(min-width: 1025px)" srcSet={estatua} />
          <source media="(min-width: 768px)" srcSet={estatuatablet} />
          <img
            src={estatuaresponsive}
            alt="Fondo Legal 360"
            loading="eager"
            fetchpriority="high"
            // FIX: Eliminamos la escala en la transición para evitar el "micro zoom".
            // Se añade 'will-change-transform' para estabilidad en el scroll.
            className={`w-full h-full object-cover object-[70%_center] md:object-center transform-gpu will-change-transform transition-opacity duration-[1.5s] ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ WebkitTransform: 'translateZ(0)' }}
          />
        </picture>

        <div className="absolute inset-0 bg-gradient-to-b from-[#0c111b]/80 via-black/40 to-[#0c111b] mix-blend-multiply" />
        <div className="absolute inset-0 bg-[#001e33]/30" />
      </div>

      {/* CAPA 2: CONTENIDO PRINCIPAL (Sin cambios en la lógica) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-12 sm:gap-16 pt-16 sm:pt-0 translate-y-[-5%] sm:translate-y-0">
        
        <div className="w-full md:w-3/5 flex flex-col items-center md:items-start text-center md:text-left space-y-8">
          <h1 className="flex flex-col gap-2">
            <span className={`text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-lg transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Cumple con la Ley
            </span>
            <span className={`text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f5e27a] to-[#d4af37] text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight pb-1 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Protege tu Empresa
            </span>
            <span className={`text-[#e6d769] text-2xl sm:text-3xl font-bold tracking-wide mt-2 drop-shadow-md transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Crece con Legal 360
            </span>
          </h1>

          <div className={`transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="inline-flex items-center justify-center bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl rounded-full px-6 sm:px-8 py-3 sm:py-4">
              <div className="font-bold text-base sm:text-lg md:text-xl text-[#f5e27a] tracking-wide">
                <Typewriter
                  options={{
                    strings: ['¡Acompañamiento Mensual o Por Evento!'],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                    deleteSpeed: 30,
                    cursorClassName: 'animate-pulse text-[#f5e27a]',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={`hidden md:flex w-full md:w-2/5 justify-center transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
          <img 
            src={logo} 
            alt="Logo Legal 360" 
            className="w-full max-w-[280px] lg:max-w-[340px] h-auto object-contain drop-shadow-[0_0_30px_rgba(230,215,105,0.15)] hover:scale-105 transition-transform duration-500" 
          />
        </div>
      </div>

      {/* CAPA 3: ELEMENTOS INFERIORES */}
      <button 
        onClick={handleScrollDown}
        className={`absolute bottom-16 sm:bottom-12 left-1/2 -translate-x-1/2 text-white/50 hover:text-[#e6d769] transition-colors duration-300 z-20 flex flex-col items-center gap-2 ${isLoaded ? 'animate-bounce' : 'opacity-0'}`}
      >
        <span className="text-xs uppercase tracking-[0.2em] font-montserrat">Descubre más</span>
        <ArrowDownOutlined className="text-lg" />
      </button>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-20 pointer-events-none translate-y-[2px]">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-[40px] sm:h-[60px] block">
          <path d="M0.00,49.98 C150.00,150.00 349.19,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" className="fill-[#0c111b]" />
        </svg>
      </div>
      
    </section>
  );
};

export default Hero;