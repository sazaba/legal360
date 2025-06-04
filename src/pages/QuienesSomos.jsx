import { useEffect, useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import Mari from '../assets/images/maribg3.webp';

const QuienesSomos = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getBackgroundStyle = () => {
    if (windowWidth >= 768 && windowWidth <= 1024 && window.innerHeight < window.innerWidth) {
      return {
        backgroundImage: `url(${Mari})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
      };
    }
    return {
      backgroundImage: `url(${Mari})`,
      backgroundPosition: '90% center',
      backgroundSize: 'cover',
    };
  };

  return (
    <section
      className="relative bg-no-repeat bg-center w-full min-h-screen flex items-center justify-center md:justify-start px-4 sm:px-6 py-20 sm:py-28 my-[-30px]"
      style={getBackgroundStyle()}
    >
      {/* Capa oscura para mejorar contraste */}
      <div className="absolute inset-0 z-0 bg-black/30" />

      {/* Ola superior */}
      <div className="w-full overflow-hidden absolute top-0 left-0 z-0">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-[30px] rotate-180">
          <path
            d="M0.00,49.98 C150.00,150.00 349.19,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            className="fill-[#001e33]"
          />
        </svg>
      </div>

      {/* Contenido sobre el fondo */}
      <div className="relative z-10 w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white/10 rounded-2xl shadow-md p-6 sm:p-8 text-white backdrop-blur-md">
            <p className="uppercase tracking-widest text-xs sm:text-sm mb-4 text-[#fcd34d]">Nuestra razón de ser</p>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-6 text-center lg:text-left">
              Somos{' '}
              <span
                style={{
                  background: 'linear-gradient(to right, #d4af37, #f5e27a, #d4af37)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                className="inline-block"
              >
                Legal 360 S.A.S.
              </span>
            </h1>

            <div className="space-y-4 text-sm sm:text-base md:text-lg text-[#f4f4f4]">
              <p>
                Legal 360 S.A.S., es un equipo multidisciplinario de profesionales altamente capacitados en derecho laboral, seguridad social, derecho comercial y seguridad y salud en el trabajo.
              </p>
              <p>
                Brindamos soluciones jurídicas integrales, oportunas y comprensibles, diseñadas para fortalecer la toma de decisiones tanto a nivel empresarial como individual. Nuestro enfoque preventivo busca anticipar conflictos, reducir riesgos legales y ofrecer una experiencia de acompañamiento que garantice tranquilidad jurídica.
              </p>
              <p className="italic text-[#dcdcdc]">
                Contamos con planes y tarifas adaptables a las necesidades específicas de tu empresa.
              </p>
            </div>

            <p
              className="font-semibold text-base sm:text-lg md:text-xl mt-6 mb-8"
              style={{
                background: 'linear-gradient(to right, #d4af37, #f5e27a, #d4af37)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              "Legal, claro y eficiente".
            </p>

            <div className="flex justify-center lg:justify-start space-x-6 text-[#fcd34d] text-2xl">
              <a href="https://wa.link/twbzum" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="hover:scale-110 transition" />
              </a>
              <a href="https://www.instagram.com/legal360abogados/" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="hover:scale-110 transition" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Ola inferior */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-20">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-[40px]">
          <path
            d="M0.00,49.98 C150.00,150.00 349.19,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            className="fill-[#001e33]"
          />
        </svg>
      </div>
    </section>
  );
};

export default QuienesSomos;
