import { AiOutlineMail, AiOutlineMessage } from 'react-icons/ai';
import { BsFillTelephoneFill } from 'react-icons/bs';
import logowhitebg from '../assets/images/logowhitebg.webp';

const ContactoAccesos = () => {
    // Función para manejar la navegación usando DIVs (evita conflictos con index.css)
    const handleNavigation = (type, value) => {
        let url = "";
        if (type === 'tel') url = `tel:${value}`;
        if (type === 'mail') url = `mailto:${value}`;
        if (type === 'link') url = value;

        if (type === 'link') {
            window.open(url, "_blank", "noopener,noreferrer");
        } else {
            window.location.href = url;
        }
    };

    return (
        <section className="relative w-full bg-[#030912] pt-24 pb-12 px-4 sm:px-6 lg:px-12 font-roboto isolate">
            
            {/* Brillo de fondo sutil externo */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#001e33]/40 via-transparent to-transparent z-[-1]"></div>

            {/* ================= TARJETA BLANCA FLOTANTE PREMIUM ================= */}
            {/* Agregamos 'overflow-hidden' y 'isolate' para contener los SVGs de fondo */}
            <div className="max-w-6xl mx-auto bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row items-center justify-between gap-10 border border-gray-100 relative z-10 overflow-hidden isolate">
                
                {/* ---> FONDO DE TEXTURA SVG ANIMADO <--- */}
                <div className="absolute inset-0 z-[-1] pointer-events-none overflow-hidden opacity-10">
                    
                    {/* SVG 1: Balanza de la Justicia (Izquierda) - Flota lento */}
                    <svg className="absolute -top-10 -left-10 w-64 h-64 text-[#001e33] animate-float-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3v18"/><path d="M6 8l-4 2 2 4h4l2-4-4-2z"/><path d="M18 8l-4 2 2 4h4l2-4-4-2z"/><path d="M12 3L6 6"/><path d="M12 3l6 3"/>
                    </svg>

                    {/* SVG 2: Columna Clásica (Derecha Inferior) - Flota en reversa */}
                    <svg className="absolute -bottom-20 -right-20 w-80 h-80 text-[#001e33] animate-float-reverse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 4h12"/><path d="M6 20h12"/><path d="M8 4v16"/><path d="M16 4v16"/><path d="M4 2h16"/><path d="M4 22h16"/>
                    </svg>
                    
                    {/* SVG 3: Libro/Código Legal (Centro sutil) - Pulso muy lento */}
                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 text-[#d4af37] opacity-20 animate-pulse-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.3" strokeLinecap="round" strokeLinejoin="round">
                         <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                    </svg>

                    {/* Trama geométrica sutil de fondo */}
                    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
                        <pattern id="legal-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M0 20h40M20 0v40" fill="none" stroke="#001e33" strokeWidth="0.5"/>
                        </pattern>
                        <rect x="0" y="0" width="100%" height="100%" fill="url(#legal-pattern)"></rect>
                    </svg>

                </div>
                {/* ---> FIN FONDO SVG <--- */}


                {/* CONTENIDO PRINCIPAL (Con z-index superior relativo) */}
                
                {/* Logo Legal 360 */}
                <div className="flex justify-center lg:justify-start w-full lg:w-auto relative z-10">
                    <img
                        src={logowhitebg}
                        alt="Legal 360 Logo"
                        className="w-[180px] sm:w-[220px] object-contain drop-shadow-sm hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* BOTONES DE CONTACTO */}
                <div className="w-full lg:w-auto flex flex-wrap justify-center lg:justify-end gap-4 sm:gap-6 relative z-10">
                    
                    {/* Botón Llámanos */}
                    <div 
                        onClick={() => handleNavigation('tel', '+573123240463')}
                        className="group flex items-center gap-4 bg-[#001e33] hover:bg-[#062c4f] px-6 py-4 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer select-none"
                    >
                        <BsFillTelephoneFill className="text-[#e6d769] text-xl" />
                        <span className="text-white font-montserrat font-bold text-xs sm:text-sm tracking-widest uppercase group-hover:text-[#e6d769] transition-colors">
                            Llámanos
                        </span>
                    </div>

                    {/* Botón WhatsApp */}
                    <div 
                        onClick={() => handleNavigation('link', 'https://wa.link/twbzum')}
                        className="group flex items-center gap-4 bg-[#001e33] hover:bg-[#062c4f] px-6 py-4 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer select-none"
                    >
                        <AiOutlineMessage className="text-[#e6d769] text-2xl" />
                        <span className="text-white font-montserrat font-bold text-xs sm:text-sm tracking-widest uppercase group-hover:text-[#e6d769] transition-colors">
                            Chatea
                        </span>
                    </div>

                    {/* Botón Email */}
                    <div 
                        onClick={() => handleNavigation('mail', 'servicioalcliente@legal360.co')}
                        className="group flex items-center gap-4 bg-[#001e33] hover:bg-[#062c4f] px-6 py-4 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer select-none"
                    >
                        <AiOutlineMail className="text-[#e6d769] text-2xl" />
                        <span className="text-white font-montserrat font-bold text-xs sm:text-sm tracking-widest uppercase group-hover:text-[#e6d769] transition-colors">
                            Email
                        </span>
                    </div>

                </div>
            </div>

            {/* Estilos para las animaciones lentas y premium */}
            <style jsx>{`
                @keyframes float-slow {
                    0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
                    50% { transform: translate(20px, -20px) rotate(3deg); }
                }
                @keyframes float-reverse {
                    0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
                    50% { transform: translate(-15px, 15px) rotate(-2deg); }
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.1; transform: translate(-50%, -50%) scale(1); }
                    50% { opacity: 0.2; transform: translate(-50%, -50%) scale(1.05); }
                }

                .animate-float-slow {
                    animation: float-slow 20s ease-in-out infinite;
                }
                .animate-float-reverse {
                    animation: float-reverse 25s ease-in-out infinite;
                }
                .animate-pulse-slow {
                    animation: pulse-slow 15s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default ContactoAccesos;