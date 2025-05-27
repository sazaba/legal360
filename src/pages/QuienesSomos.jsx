import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import Mari from '../assets/images/maribg.webp';

const QuienesSomos = () => {
  return (
    <section
      className="relative bg-cover bg-no-repeat min-h-screen flex items-center justify-start px-6 py-50 bg-[60%_center] md:bg-center"
      style={{ backgroundImage: `url(${Mari})` }}
    >

      {/* Capa oscura para mejorar contraste */}
      <div className="absolute inset-0 z-0 bg-black/80 md:bg-transparent" />

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
      <div className="relative z-10 max-w-6xl w-full text-white pl-10 md:pl-12 lg:pl-12 xl:pl-12">
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Texto descriptivo */}
          <div className="text-left">
            <p className="text-[#e6d769] uppercase tracking-widest text-sm mb-4">Nuestra razón de ser</p>
            <h1 className=" text-center text-3xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-6">
              Somos{' '}
              <span className="bg-gradient-to-r from-[#d4af37] via-[#f5e27a] to-[#d4af37] bg-clip-text text-transparent">
                Legal 360 S.A.S
              </span>
            </h1>

            <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-5">
              Nuestra firma está conformada por un equipo multidisciplinario en derecho laboral, seguridad social y derecho comercial, con experiencia en conciliación, auditoría legal y gestión empresarial. Esto nos permite ofrecer soluciones jurídicas integrales que previenen conflictos y fortalecen la toma de decisiones.
            </p>

            <p className="text-gray-300 text-xl mb-5">
              Ofrecemos un servicio accesible, claro y adaptado a tu realidad empresarial, con tarifas justas y un enfoque preventivo que te brinda tranquilidad jurídica.
            </p>

            <p className="text-gray-400 text-sm sm:text-base md:text-lg italic mb-6">
              Confía en un equipo que entiende el lenguaje legal y sabe traducirlo en acciones concretas para tu empresa.
            </p>

            {/* <p className="text-[#e6d769] font-semibold text-lg sm:text-xl md:text-2xl mb-10">
              Legal 360 S.A.S
            </p> */}
            <p className="text-[#e6d769] text-right font-semibold text-lg sm:text-xl md:text-2xl mb-10">
              "Legal, claro y eficiente".
            </p>

            <div className="flex justify-start space-x-6 text-[#e6d769] text-3xl">
              <a href="#">
                <FaWhatsapp className="hover:scale-110 transition text-[#e6d769]" />
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

