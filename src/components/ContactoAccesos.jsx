import { AiOutlineMail, AiOutlineMessage } from 'react-icons/ai';
import { BsFillTelephoneFill } from 'react-icons/bs';
import logowhitebg from '../assets/images/logowhitebg.webp';

const ContactoAccesos = () => {
    return (
        // Fondo muy oscuro que sirve de puente hacia el Footer
        <section className="w-full bg-[#070d14] py-8 px-4 sm:px-6 lg:px-12 font-roboto border-t border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

                {/* LOGO */}
                <div className="flex justify-center md:justify-start w-full md:w-auto">
                    <img
                        src={logowhitebg}
                        alt="Legal 360 Logo"
                        loading="lazy"
                        className="w-[140px] sm:w-[160px] object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* BOTONES DE CONTACTO MODERNOS */}
                <div className="w-full md:w-auto flex flex-wrap justify-center md:justify-end gap-3 sm:gap-5">
                    
                    {/* Botón Llámanos */}
                    <a href="tel:+573123240463" className="group flex items-center gap-3 bg-white/5 border border-white/10 hover:border-[#e6d769]/50 hover:bg-white/10 px-5 sm:px-6 py-3 rounded-full transition-all duration-300">
                        <div className="bg-[#001e33] p-2 rounded-full group-hover:scale-110 transition-transform">
                            <BsFillTelephoneFill className="text-[#e6d769] text-lg sm:text-xl" />
                        </div>
                        <span className="text-gray-300 group-hover:text-white font-montserrat font-semibold text-xs sm:text-sm tracking-wider">
                            LLÁMANOS
                        </span>
                    </a>

                    {/* Botón Chatea */}
                    <a href="https://wa.link/twbzum" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 bg-white/5 border border-white/10 hover:border-[#e6d769]/50 hover:bg-white/10 px-5 sm:px-6 py-3 rounded-full transition-all duration-300">
                        <div className="bg-[#001e33] p-2 rounded-full group-hover:scale-110 transition-transform">
                            <AiOutlineMessage className="text-[#e6d769] text-lg sm:text-xl" />
                        </div>
                        <span className="text-gray-300 group-hover:text-white font-montserrat font-semibold text-xs sm:text-sm tracking-wider">
                            CHATEA
                        </span>
                    </a>

                    {/* Botón Email */}
                    <a href="mailto:servicioalcliente@legal360.co" className="group flex items-center gap-3 bg-white/5 border border-white/10 hover:border-[#e6d769]/50 hover:bg-white/10 px-5 sm:px-6 py-3 rounded-full transition-all duration-300">
                        <div className="bg-[#001e33] p-2 rounded-full group-hover:scale-110 transition-transform">
                            <AiOutlineMail className="text-[#e6d769] text-lg sm:text-xl" />
                        </div>
                        <span className="text-gray-300 group-hover:text-white font-montserrat font-semibold text-xs sm:text-sm tracking-wider">
                            EMAIL
                        </span>
                    </a>

                </div>
            </div>
        </section>
    );
};

export default ContactoAccesos;