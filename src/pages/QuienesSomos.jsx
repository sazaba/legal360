import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import Mari from '../assets/images/maribg3.webp';

const QuienesSomos = () => {
  return (
    <section className="relative w-full min-h-[100svh] flex items-center justify-center lg:justify-start px-6 sm:px-12 lg:px-24 py-32 overflow-hidden bg-[#0c111b] isolate" id="por-que-nosotros">
      
      {/* ================= TRANSICIÓN PREMIUM SEAMLESS FADE ================= */}
      <div className="absolute top-0 left-0 w-full h-32 sm:h-48 bg-gradient-to-b from-[#0c111b] via-[#0c111b]/80 to-transparent z-30 pointer-events-none -translate-y-[1px]"></div>

      {/* 1. FONDO OPTIMIZADO (Zoom reducido) */}
      <div className="absolute inset-0 z-[-2] pointer-events-none">
        <img
          src={Mari}
          alt="Equipo Legal 360"
          loading="lazy"
          className="w-full h-full object-cover object-center lg:object-[right_center] transform-gpu"
        />
      </div>

      {/* 2. OVERLAYS */}
      <div className="absolute inset-0 z-[-1] bg-gradient-to-t from-[#0c111b]/95 via-[#0c111b]/80 to-[#0c111b]/40 lg:bg-gradient-to-r lg:from-[#0c111b]/95 lg:via-[#0c111b]/80 lg:to-transparent mix-blend-multiply pointer-events-none" />
      <div className="absolute inset-0 z-[-1] bg-[#001e33]/30 pointer-events-none" />
      
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0c111b] to-transparent z-[-1] pointer-events-none translate-y-[1px]"></div>

      {/* 3. CONTENIDO PRINCIPAL (Glassmorphism Card) */}
      <div className="relative z-20 w-full max-w-2xl mt-8 lg:mt-0">
        
        <div className="bg-[#001e33]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-colors duration-500 hover:border-white/20 hover:bg-[#001e33]/50">
          
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-[#e6d769]"></span>
            <p className="uppercase tracking-[0.3em] text-xs sm:text-sm text-[#e6d769] font-bold font-montserrat">
              Nuestra razón de ser
            </p>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-8 text-white font-montserrat drop-shadow-md">
            Somos{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f5e27a] to-[#d4af37]">
              Legal 360 S.A.S.
            </span>
          </h2>

          <div className="space-y-6 text-sm sm:text-base md:text-lg text-gray-200 font-roboto font-light leading-relaxed">
            <p>
              Legal 360 S.A.S., es un equipo multidisciplinario de profesionales altamente capacitados en derecho laboral, seguridad social, derecho comercial y seguridad y salud en el trabajo.
            </p>
            <p>
              Brindamos soluciones jurídicas integrales, oportunas y comprensibles, diseñadas para fortalecer la toma de decisiones tanto a nivel empresarial como individual. Nuestro enfoque preventivo busca anticipar conflictos, reducir riesgos legales y ofrecer una experiencia de acompañamiento que garantice tranquilidad jurídica.
            </p>
            
            <div className="p-5 rounded-2xl bg-white/5 border-l-4 border-[#e6d769] shadow-inner">
              <p className="italic text-gray-300 font-medium">
                Contamos con planes y tarifas adaptables a las necesidades específicas de tu empresa.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-8 border-t border-white/10 pt-8">
            
            <p className="font-bold text-xl sm:text-2xl font-montserrat text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f5e27a] to-[#d4af37] italic tracking-wide text-center sm:text-left">
              "Legal, claro y eficiente"
            </p>

            <div className="flex gap-4">
              <a 
                href="https://wa.link/twbzum" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-[#e6d769] hover:bg-[#e6d769] hover:text-[#001e33] hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg group"
                aria-label="Contactar por WhatsApp"
              >
                <FaWhatsapp className="text-xl drop-shadow-md group-hover:drop-shadow-none" />
              </a>
              <a 
                href="https://www.instagram.com/legal360abogados/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-[#e6d769] hover:bg-[#e6d769] hover:text-[#001e33] hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg group"
                aria-label="Visitar Instagram"
              >
                <FaInstagram className="text-xl drop-shadow-md group-hover:drop-shadow-none" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuienesSomos;