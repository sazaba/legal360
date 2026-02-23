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
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
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
            info: "servicioalcliente@legal360.co",
            icon: <AiOutlineMail />,
            action: () => handleNavigation('mail', 'servicioalcliente@legal360.co')
        }
    ];

    return (
        <section className="relative w-full bg-[#030912] py-16 px-6 lg:px-20 overflow-hidden isolate">
            
            {/* Elementos decorativos de fondo (Luces sutiles) */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d4af37]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#001e33]/40 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                
                <div className="flex flex-col items-center mb-12">
                    <motion.span 
                        initial={{ opacity: 0, tracking: "0.1em" }}
                        whileInView={{ opacity: 1, tracking: "0.3em" }}
                        className="text-[#e6d769] text-xs font-bold uppercase mb-3 font-montserrat"
                    >
                        Canales Directos
                    </motion.span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white font-montserrat text-center tracking-tight">
                        ¿Cómo prefieres <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f5e27a]">contactarnos?</span>
                    </h2>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {contactItems.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                            onClick={item.action}
                            className="group relative cursor-pointer"
                        >
                            {/* Borde con Gradiente Animado */}
                            <div className="absolute -inset-[1px] bg-gradient-to-r from-[#d4af37]/20 via-[#f5e27a]/40 to-[#d4af37]/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
                            
                            {/* Cuerpo de la tarjeta */}
                            <div className="relative bg-[#0a1524]/80 backdrop-blur-xl border border-white/5 p-6 rounded-2xl flex items-center gap-5 transition-all duration-300 group-hover:border-[#e6d769]/30 group-hover:bg-[#0c1c30]">
                                
                                {/* Icono Circular con Pulso */}
                                <div className="relative flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#030912] to-[#0a1524] rounded-full flex items-center justify-center border border-white/10 text-[#e6d769] text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:border-[#e6d769]/50 shadow-lg">
                                    {item.icon}
                                    {/* Anillo de pulso */}
                                    <div className="absolute inset-0 rounded-full border border-[#e6d769]/30 animate-ping opacity-0 group-hover:opacity-100" />
                                </div>

                                <div className="flex flex-col overflow-hidden">
                                    <span className="text-[#e6d769] text-[10px] font-bold uppercase tracking-widest font-montserrat mb-1 opacity-70 group-hover:opacity-100 transition-opacity">
                                        {item.name}
                                    </span>
                                    <span className="text-white text-sm sm:text-base font-semibold font-roboto truncate tracking-tight">
                                        {item.info}
                                    </span>
                                </div>

                                {/* Flecha indicadora que aparece al final */}
                                <div className="ml-auto opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#e6d769]">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer de sección sutil */}
                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.4 }}
                    className="text-center text-white text-[10px] uppercase tracking-[0.4em] font-montserrat mt-12"
                >
                    Atención inmediata de Lunes a Viernes
                </motion.p>
            </div>
        </section>
    );
};

export default ContactoAccesos;