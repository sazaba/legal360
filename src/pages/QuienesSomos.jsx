import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import Mari from '../assets/images/maribg.webp';

const QuienesSomos = () => {
  return (
    <section
      className="relative bg-cover bg-no-repeat min-h-screen flex items-center justify-center md:justify-start px-6 py-24 sm:py-32 bg-[60%_center] md:bg-center"
      style={{ backgroundImage: `url(${Mari})` }}
    >
      {/* Capa oscura para mejorar contraste */}
      <div className="absolute inset-0 z-0 bg-black/70 md:bg-transparent" />

      {/* Ola superior conectada al Hero */}
      <div className="w-full overflow-hidden absolute top-0 left-0 z-0">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-[40px] rotate-180">
          <path
            d="M0.00,49.98 C150.00,150.00 349.19,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            className="fill-[#001e33]"
          />
        </svg>
      </div>

      {/* Contenido sobre el fondo */}
      <div className="relative z-10 max-w-6xl w-full text-white">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Texto descriptivo */}
          <div className="text-left px-2 sm:px-6 md:px-10">
            <p className="text-[#e6d769] uppercase tracking-widest text-sm mb-4">Nuestra razón de ser</p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-center lg:text-left">
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

            <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-5">
              Legal 360 S.A.S., es un equipo multidisciplinario de profesionales altamente capacitados en derecho laboral, seguridad social, derecho comercial y seguridad y salud en el trabajo.
            </p>

            <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-5">
              Brindamos soluciones jurídicas integrales, oportunas y comprensibles, diseñadas para fortalecer la toma de decisiones tanto a nivel empresarial como individual. Nuestro enfoque preventivo busca anticipar conflictos, reducir riesgos legales y ofrecer una experiencia de acompañamiento que garantice tranquilidad jurídica.
            </p>

            <p className="text-gray-400 text-sm sm:text-base md:text-lg italic mb-6">
              Ofrecemos planes y tarifas flexibles que se adaptan a las necesidades reales de tu empresa.
            </p>

            <p
              className="font-semibold text-lg sm:text-xl md:text-2xl mb-10"
              style={{
                background: 'linear-gradient(to right, #d4af37, #f5e27a, #d4af37)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              "Legal, claro y eficiente".
            </p>

            <div className="flex justify-start space-x-6 text-[#e6d769] text-3xl">
              <a href="#">
                <FaWhatsapp className="hover:scale-110 transition" />
              </a>
              <a href="#">
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
