import { motion } from 'framer-motion';
import { AiOutlineMail, AiOutlineMessage } from 'react-icons/ai';
import { BsFillTelephoneFill } from 'react-icons/bs';

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

    const cardVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        hover: { 
            scale: 1.02,
            rotateX: 5,
            rotateY: -5,
            transition: { duration: 0.3 }
        },
        tap: { scale: 0.95 }
    };

    const actions = [
        {
            id: 1,
            label: "Llámanos",
            desc: "Línea Directa",
            value: "+573123240463",
            type: "tel",
            icon: <BsFillTelephoneFill />,
            color: "from-[#d4af37] to-[#f5e27a]"
        },
        {
            id: 2,
            label: "WhatsApp",
            desc: "Chat en Vivo",
            value: "https://wa.link/twbzum",
            type: "link",
            icon: <AiOutlineMessage />,
            color: "from-[#e6d769] to-[#b8860b]"
        },
        {
            id: 3,
            label: "Email",
            desc: "Consultas",
            value: "servicioalcliente@legal360.co",
            type: "mail",
            icon: <AiOutlineMail />,
            color: "from-[#f5e27a] to-[#d4af37]"
        }
    ];

    return (
        <section className="relative w-full bg-[#030912] py-20 px-6 sm:px-10 lg:px-20 overflow-hidden font-montserrat">
            
            {/* Fondo con Rayas de Seguridad Abstractas (Muy Legal Tech) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: `linear-gradient(45deg, #e6d769 25%, transparent 25%, transparent 50%, #e6d769 50%, #e6d769 75%, transparent 75%, transparent)` , backgroundSize: '100px 100px'}}>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* Título Disruptivo */}
                <div className="mb-16 text-center md:text-left">
                    <motion.h2 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none"
                    >
                        Conecta con el <br /> 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f5e27a]">
                            Poder Jurídico
                        </span>
                    </motion.h2>
                </div>

                {/* Grid de Acción Brutalista */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                    {actions.map((action, index) => (
                        <motion.div
                            key={action.id}
                            variants={cardVariants}
                            initial="initial"
                            whileInView="animate"
                            whileHover="hover"
                            whileTap="tap"
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => handleNavigation(action.type, action.value)}
                            className="relative group cursor-pointer overflow-hidden aspect-square md:aspect-video lg:aspect-square bg-[#0a1524] border border-white/5 flex flex-col justify-between p-8 sm:p-10"
                        >
                            {/* Efecto de Brillo Magnético en el Hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#e6d769]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            {/* Icono Flotante Grande */}
                            <div className="relative z-10 text-4xl sm:text-5xl text-[#e6d769] group-hover:scale-110 transition-transform duration-500">
                                {action.icon}
                            </div>

                            {/* Textos Inferiores */}
                            <div className="relative z-10">
                                <p className="text-[#e6d769] text-xs font-bold uppercase tracking-[0.3em] mb-2 opacity-60">
                                    {action.desc}
                                </p>
                                <h3 className="text-3xl sm:text-4xl font-black text-white uppercase leading-none group-hover:tracking-widest transition-all duration-500">
                                    {action.label}
                                </h3>
                            </div>

                            {/* Barra de progreso decorativa inferior */}
                            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#e6d769] to-transparent w-0 group-hover:w-full transition-all duration-700" />
                        </motion.div>
                    ))}
                </div>

                {/* Footer del Componente */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-12 flex justify-center md:justify-end"
                >
                    <p className="text-white/20 text-xs font-bold uppercase tracking-[0.5em]">
                        Disponibilidad Inmediata
                    </p>
                </motion.div>
            </div>

            <style jsx>{`
                section {
                    perspective: 1000px;
                }
            `}</style>
        </section>
    );
};

export default ContactoAccesos;