import { useEffect, useState } from 'react';
import estatua from '../assets/images/Hero4.webp';
import estatuaresponsive from '../assets/images/estatuaresponsive.webp';
import estatuatablet from '../assets/images/estatuatablet.webp';
import logo from '../assets/images/logolegal.webp';
import { FaWhatsapp } from 'react-icons/fa';
import Typewriter from 'typewriter-effect';
import '../index.css';

const Hero = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let backgroundImage;
  if (windowWidth < 768) {
    backgroundImage = estatuaresponsive;
  } else if (windowWidth >= 768 && windowWidth <= 1024) {
    backgroundImage = estatuatablet;
  } else {
    backgroundImage = estatua;
  }

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundPosition: windowWidth < 768 ? '70% center' : 'center',
        backgroundAttachment: windowWidth < 768 ? 'scroll' : 'fixed'
      }}
    >
      <img
        src={backgroundImage}
        alt="Fondo Hero"
        loading="lazy"
        onLoad={() => setIsImageLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-all duration-700 ease-in-out ${isImageLoaded ? 'blur-0 opacity-100' : 'blur-md opacity-0'}`}
      />

      <div className="absolute inset-0 bg-black opacity-10 z-10" />

      <div className="relative z-20 w-full max-w-screen-xl mx-auto min-h-screen flex flex-col md:flex-row items-center justify-center md:justify-between px-4 sm:px-8 md:px-20 gap-6">
        <div className="text-center md:text-left max-w-2xl space-y-6 pt-32 md:pt-20">
          <div className="w-full px-6 py-8 flex flex-col items-center md:items-start gap-4">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
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
              <span className="block text-[#e6d769] mt-2 text-2xl sm:text-3xl">
                Crece con Legal 360
              </span>
            </h1>

            <div className="mt-6">
              <p
                className="font-bold text-sm sm:text-base shadow-lg px-4 py-3 rounded-xl bg-white text-center"
                style={{
                  background: 'white',
                  color: 'transparent',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundImage: 'linear-gradient(90deg, #d4af37, #f5e27a, #d4af37)',
                }}
              >
                <Typewriter
                  options={{
                    strings: ['Acompa\u00f1amiento Mensual o Por Evento!'],
                    autoStart: true,
                    loop: true,
                    delay: 60,
                    deleteSpeed: 40,
                  }}
                />
              </p>
            </div>
          </div>
        </div>

        {windowWidth >= 768 && (
          <div className="hidden md:block">
            <img src={logo} alt="Logo Legal 360" className="w-72 max-w-full h-auto" />
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-20 leading-none">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-[30px]">
          <path
            d="M0.00,49.98 C150.00,150.00 349.19,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            className="fill-[#001e33]"
          />
        </svg>
      </div>

      <a
        href="https://wa.link/twbzum"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 p-4 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl animate-bounce z-50"
        style={{
          background: 'linear-gradient(135deg, #d4af37 0%, #f5e27a 50%, #d4af37 100%)',
          color: '#001e33',
        }}
      >
        <FaWhatsapp className="text-xl sm:text-2xl" />
      </a>
    </section>
  );
};

export default Hero;
