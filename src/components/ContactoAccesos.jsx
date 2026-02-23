import { AiOutlineMail, AiOutlineMessage } from 'react-icons/ai';
import { BsFillTelephoneFill } from 'react-icons/bs';
import logowhitebg from '../assets/images/logowhitebg.webp';

const ContactoAccesos = () => {
    return (
        // FONDO UNIFICADO: Usa exactamente el mismo #030912 que el Footer para una fusión invisible
        <section className="relative w-full bg-[#030912] pt-24 pb-8 px-4 sm:px-6 lg:px-12 font-roboto isolate">
            
            {/* Opcional: Un pequeño brillo detrás de la tarjeta para destacarla */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#001e33]/40 via-transparent to-transparent z-[-1]"></div>

            {/* LA TARJETA BLANCA FLOTANTE */}
            <div className="max-w-6xl mx-auto bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row items-center justify-between gap-10 border border-gray-100 transform-gpu hover:shadow-[0_20px_60px_rgba(212,175,55,0.15)] transition-all duration-500 relative z-10">
                
                {/* Columna del Logo (Resalta perfectamente sobre blanco) */}
                <div className="flex justify-center lg:justify-start w-full lg:w-auto">
                    <img
                        src={logowhitebg}
                        alt="Legal 360 Logo"
                        loading="lazy"
                        className="w-[180px] sm:w-[220px] object-contain drop-shadow-sm hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* Columna de Botones (Oscuros con letras blancas para contraste sobre la tarjeta) */}
                <div className="w-full lg:w-auto flex flex-wrap justify-center lg:justify-end gap-4 sm:gap-5">
                    
                    {/* Botón Llámanos */}
                    <a href="tel:+573123240463" className="group flex items-center gap-4 bg-[#001e33] hover:bg-[#062c4f] px-6 py-4 rounded-full shadow-lg hover:shadow-[0_10px_20px_rgba(0,30,51,0.3)] transition-all duration-300 hover:-translate-y-1">
                        <BsFillTelephoneFill className="text-[#e6d769] text-xl" />
                        <span className="text-white font-montserrat font-bold text-xs sm:text-sm tracking-widest uppercase group-hover:text-[#e6d769] transition-colors">
                            Llámanos
                        </span>
                    </a>

                    {/* Botón Chatea */}
                    <a href="https://wa.link/twbzum" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 bg-[#001e33] hover:bg-[#062c4f] px-6 py-4 rounded-full shadow-lg hover:shadow-[0_10px_20px_rgba(0,30,51,0.3)] transition-all duration-300 hover:-translate-y-1">
                        <AiOutlineMessage className="text-[#e6d769] text-2xl" />
                        <span className="text-white font-montserrat font-bold text-xs sm:text-sm tracking-widest uppercase group-hover:text-[#e6d769] transition-colors">
                            Chatea
                        </span>
                    </a>

                    {/* Botón Email */}
                    <a href="mailto:servicioalcliente@legal360.co" className="group flex items-center gap-4 bg-[#001e33] hover:bg-[#062c4f] px-6 py-4 rounded-full shadow-lg hover:shadow-[0_10px_20px_rgba(0,30,51,0.3)] transition-all duration-300 hover:-translate-y-1">
                        <AiOutlineMail className="text-[#e6d769] text-2xl" />
                        <span className="text-white font-montserrat font-bold text-xs sm:text-sm tracking-widest uppercase group-hover:text-[#e6d769] transition-colors">
                            Email
                        </span>
                    </a>

                </div>
            </div>
        </section>
    );
};

export default ContactoAccesos;