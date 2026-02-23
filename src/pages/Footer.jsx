import { motion } from 'framer-motion';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { HashLink as Link } from 'react-router-hash-link';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 }
        }
    };

    return (
        <footer className="relative w-full bg-[#030912] pt-16 pb-8 px-6 lg:px-20 overflow-hidden border-t border-white/5 font-roboto isolate">
            
            {/* Elemento decorativo: Resplandor sutil en la esquina inferior */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#d4af37]/5 blur-[100px] rounded-full pointer-events-none" />

            <motion.div 
                className="max-w-7xl mx-auto relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
            >
                {/* --- SECCIÓN SUPERIOR: BRANDING --- */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12 border-b border-white/5 pb-12">
                    <div className="max-w-md">
                        <motion.h2 
                            className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f5e27a] to-[#d4af37] font-montserrat tracking-tighter mb-4"
                        >
                            Legal 360 S.A.S.
                        </motion.h2>
                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light">
                            NIT. 901.938.444-1 <br />
                            Soluciones jurídicas preventivas. <span className="text-white/60">Legal, claro y eficiente.</span>
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <a href="https://www.instagram.com/legal360abogados/" target="_blank" rel="noopener noreferrer" 
                           className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl text-gray-300 hover:bg-[#e6d769] hover:text-[#001e33] hover:border-[#e6d769] transition-all duration-500 shadow-xl group">
                            <FaInstagram className="group-hover:scale-110 transition-transform" />
                        </a>
                        <a href="https://wa.link/twbzum" target="_blank" rel="noopener noreferrer" 
                           className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl text-gray-300 hover:bg-[#e6d769] hover:text-[#001e33] hover:border-[#e6d769] transition-all duration-500 shadow-xl group">
                            <FaWhatsapp className="group-hover:scale-110 transition-transform" />
                        </a>
                    </div>
                </div>

                {/* --- SECCIÓN MEDIA: GRID COMPACTO (2 COL EN MÓVIL) --- */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-16">
                    
                    {/* Navegación */}
                    <div className="flex flex-col gap-5">
                        <h3 className="text-[10px] font-bold text-[#e6d769] uppercase tracking-[0.3em] font-montserrat">Navegación</h3>
                        <nav className="flex flex-col gap-3 text-sm text-gray-400 font-medium">
                            <Link smooth to="/#top" className="hover:text-white transition-colors">Inicio</Link>
                            <Link smooth to="/#servicios" className="hover:text-white transition-colors">Servicios</Link>
                            <Link smooth to="/#por-que-nosotros" className="hover:text-white transition-colors">Nosotros</Link>
                            <a href="https://wa.link/twbzum" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contacto</a>
                        </nav>
                    </div>

                    {/* Contacto */}
                    <div className="flex flex-col gap-5">
                        <h3 className="text-[10px] font-bold text-[#e6d769] uppercase tracking-[0.3em] font-montserrat">Contacto</h3>
                        <div className="flex flex-col gap-3 text-sm text-gray-400">
                            <span className="truncate">juridico@legal360.co</span>
                            <span>+57 312 324 0463</span>
                            <span className="leading-tight">Pereira, <br className="lg:hidden"/> Colombia</span>
                        </div>
                    </div>

                    {/* Legal */}
                    <div className="flex flex-col gap-5">
                        <h3 className="text-[10px] font-bold text-[#e6d769] uppercase tracking-[0.3em] font-montserrat">Legal</h3>
                        <nav className="flex flex-col gap-3 text-sm text-gray-400 font-medium">
                            <Link to="/politica-datos" className="hover:text-white transition-colors">Privacidad</Link>
                            <Link to="/terminos-condiciones" className="hover:text-white transition-colors">Términos</Link>
                        </nav>
                    </div>

                    {/* Disponibilidad */}
                    <div className="flex flex-col gap-5 col-span-1 lg:col-span-1">
                        <h3 className="text-[10px] font-bold text-[#e6d769] uppercase tracking-[0.3em] font-montserrat">Status</h3>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-sm text-gray-400 font-medium">Atención Activa</span>
                        </div>
                    </div>
                </div>

                {/* --- FOOTER INFERIOR --- */}
                <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] sm:text-xs font-montserrat tracking-widest text-gray-500 uppercase">
                    <p>© {currentYear} LEGAL 360 S.A.S. </p>
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-[1px] bg-white/10" />
                        <p className="text-white/20">Diseño de Vanguardia</p>
                    </div>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;