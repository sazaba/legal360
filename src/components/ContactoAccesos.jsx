import { AiOutlineMail, AiOutlineMessage } from 'react-icons/ai';
import { BsFillTelephoneFill } from 'react-icons/bs';
import logowhitebg from '../assets/images/logowhitebg.webp';

const ContactoAccesos = () => {
    // Función para manejar la navegación sin usar etiquetas <a>
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
            
            {/* Brillo de fondo sutil */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#001e33]/40 via-transparent to-transparent z-[-1]"></div>

            {/* TARJETA BLANCA FLOTANTE */}
            <div className="max-w-6xl mx-auto bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row items-center justify-between gap-10 border border-gray-100 relative z-10">
                
                {/* Logo Legal 360 */}
                <div className="flex justify-center lg:justify-start w-full lg:w-auto">
                    <img
                        src={logowhitebg}
                        alt="Legal 360 Logo"
                        className="w-[180px] sm:w-[220px] object-contain drop-shadow-sm hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* BOTONES DE CONTACTO (Usando DIVs para saltar el index.css) */}
                <div className="w-full lg:w-auto flex flex-wrap justify-center lg:justify-end gap-4 sm:gap-6">
                    
                    {/* Botón Llámanos */}
                    <div 
                        onClick={() => handleNavigation('tel', '+573123240463')}
                        className="group flex items-center gap-4 bg-[#001e33] hover:bg-[#062c4f] px-6 py-4 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer select-none"
                    >
                        <BsFillTelephoneFill className="text-[#e6d769] text-xl" />
                        <span className="text-white font-montserrat font-bold text-xs sm:text-sm tracking-widest uppercase group-hover:text-[#e6d769]">
                            Llámanos
                        </span>
                    </div>

                    {/* Botón WhatsApp */}
                    <div 
                        onClick={() => handleNavigation('link', 'https://wa.link/twbzum')}
                        className="group flex items-center gap-4 bg-[#001e33] hover:bg-[#062c4f] px-6 py-4 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer select-none"
                    >
                        <AiOutlineMessage className="text-[#e6d769] text-2xl" />
                        <span className="text-white font-montserrat font-bold text-xs sm:text-sm tracking-widest uppercase group-hover:text-[#e6d769]">
                            Chatea
                        </span>
                    </div>

                    {/* Botón Email */}
                    <div 
                        onClick={() => handleNavigation('mail', 'servicioalcliente@legal360.co')}
                        className="group flex items-center gap-4 bg-[#001e33] hover:bg-[#062c4f] px-6 py-4 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer select-none"
                    >
                        <AiOutlineMail className="text-[#e6d769] text-2xl" />
                        <span className="text-white font-montserrat font-bold text-xs sm:text-sm tracking-widest uppercase group-hover:text-[#e6d769]">
                            Email
                        </span>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactoAccesos;