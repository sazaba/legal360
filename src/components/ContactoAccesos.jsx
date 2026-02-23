import { motion } from 'framer-motion';
import { AiOutlineMail } from 'react-icons/ai';
import { BsFillTelephoneFill, BsWhatsapp } from 'react-icons/bs';

const ContactoAccesos = () => {
    
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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
    };

    const contactItems = [
        {
            id: 1,
            name: "Llámanos",
            info: "+57 312 324 0463",
            icon: <BsFillTelephoneFill />,
            action: () => handleNavigation('tel', '+573123240463')
        },
        {
            id: 2,
            name: "WhatsApp",
            info: "Chat Inmediato",
            icon: <BsWhatsapp />,
            action: () => handleNavigation('link', 'https://wa.link/twbzum')
        },
        {
            id: 3,
            name: "Email",
            info: "juridico@legal360.co",
            icon: <AiOutlineMail />,
            action: () => handleNavigation('mail', 'juridico@legal360.co')
        }
    ];

    return (
        <section className="relative w-full bg-[#030912] py-16 px-5 lg:px-20 overflow-hidden isolate">
            
            {/* Luces de fondo optimizadas (Gradientes simples > Filtros complejos para Safari) */}
            <div className="absolute top-0 left-1/4 w-80 h-80 bg-[#d4af37]/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#001e33]/30 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                
                <div className="flex flex-col items-center mb-10">
                    <motion.span 
                        initial={{ opacity: 0, letterSpacing: "0.1em" }}
                        whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
                        className="text-[#e6d769] text-[10px] sm:text-xs font-bold uppercase mb-3 font-montserrat"
                    >
                        Canales Directos
                    </motion.span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-montserrat text-center tracking-tight px-4">
                        ¿Cómo prefieres <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f5e27a]">contactarnos?</span>
                    </h2>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
                >
                    {contactItems.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={itemVariants}
                            whileTap={{ scale: 0.97 }}
                            onClick={item.action}
                            className="group relative cursor-pointer"
                            style={{ WebkitTapHighlightColor: 'transparent' }}
                        >
                            {/* Borde Neón */}
                            <div className="absolute -inset-[1px] bg-gradient-to-r from-[#d4af37]/10 via-[#f5e27a]/30 to-[#d4af37]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]" />
                            
                            {/* Cuerpo de la tarjeta - Glassmorphism optimizado para iOS */}
                            <div className="relative bg-[#0a1524]/60 backdrop-blur-xl border border-white/5 p-5 sm:p-6 rounded-2xl flex items-center gap-4 transition-all duration-300 group-hover:bg-[#0c1c30]/80"
                                 style={{ WebkitBackdropFilter: 'blur(20px)' }}>
                                
                                {/* Icono */}
                                <div className="relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#030912] to-[#0a1524] rounded-full flex items-center justify-center border border-white/10 text-[#e6d769] text-xl sm:text-2xl transition-transform duration-500 group-hover:scale-110 shadow-lg transform-gpu">
                                    {item.icon}
                                    {/* Pulso animado solo en dispositivos con hover (PC) */}
                                    <div className="absolute inset-0 rounded-full border border-[#e6d769]/30 animate-ping opacity-0 group-hover:opacity-100 hidden md:block" />
                                </div>

                                <div className="flex flex-col min-w-0">
                                    <span className="text-[#e6d769] text-[9px] font-bold uppercase tracking-widest font-montserrat mb-0.5 opacity-70 group-hover:opacity-100">
                                        {item.name}
                                    </span>
                                    <span className="text-white text-xs sm:text-sm md:text-base font-semibold font-roboto truncate tracking-tight pr-2">
                                        {item.info}
                                    </span>
                                </div>

                                {/* Flecha */}
                                <div className="ml-auto opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#e6d769] flex-shrink-0">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer sutil */}
                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.3 }}
                    className="text-center text-white text-[9px] uppercase tracking-[0.3em] font-montserrat mt-10 px-6"
                >
                    Respuesta inmediata de Lunes a Viernes
                </motion.p>
            </div>
        </section>
    );
};

export default ContactoAccesos;