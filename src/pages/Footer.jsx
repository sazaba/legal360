import { motion } from 'framer-motion';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { HashLink as Link } from 'react-router-hash-link';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const fadeInUp = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    return (
        <footer className="relative w-full bg-[#030912] py-8 px-6 lg:px-16 overflow-hidden border-t border-white/5 font-roboto">
            
            {/* Línea decorativa disruptiva superior */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
            <div className="absolute top-0 left-10 w-20 h-[2px] bg-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.5)]" />

            <motion.div 
                className="max-w-7xl mx-auto"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {/* --- GRID PRINCIPAL SLIM --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 items-start mb-8">
                    
                    {/* Branding - Col 1 & 2 */}
                    <motion.div variants={fadeInUp} className="lg:col-span-2 flex flex-col gap-2">
                        <h2 className="text-2xl font-black text-[#d4af37] font-montserrat tracking-tighter leading-none">
                            Legal 360 S.A.S.
                        </h2>
                        <div className="space-y-1">
                            <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">NIT. 901.938.444-1</p>
                            <p className="text-sm text-white/70 font-light italic leading-tight">
                                Legal, claro y eficiente. <br />
                                <span className="text-white/40 not-italic">Protege tu empresa con expertos legales.</span>
                            </p>
                        </div>
                    </motion.div>

                    {/* Enlaces - Col 3 */}
                    <motion.div variants={fadeInUp} className="flex flex-col gap-3">
                        <h3 className="text-[10px] font-bold text-[#d4af37] uppercase tracking-[0.3em]">Enlaces</h3>
                        <nav className="flex flex-col gap-1.5 text-xs text-gray-400">
                            {['Inicio', 'Servicios', 'Nosotros', 'Contacto'].map((item) => (
                                <Link 
                                    key={item}
                                    smooth to={`/#${item.toLowerCase()}`} 
                                    className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit"
                                >
                                    {item}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>

                    {/* Contacto - Col 4 */}
                    <motion.div variants={fadeInUp} className="flex flex-col gap-3">
                        <h3 className="text-[10px] font-bold text-[#d4af37] uppercase tracking-[0.3em]">Contacto</h3>
                        <div className="flex flex-col gap-1.5 text-xs text-gray-400">
                            <a href="mailto:juridico@legal360.co" className="hover:text-white transition-colors">juridico@legal360.co</a>
                            <p>+57 312 324 0463</p>
                            <p>+57 322 767 1911</p>
                            <p className="text-[11px] text-gray-500 italic">Cra. 23 # 79 - 09, Pereira</p>
                        </div>
                    </motion.div>

                    {/* Políticas y Redes - Col 5 */}
                    <motion.div variants={fadeInUp} className="flex flex-col gap-3 lg:items-end">
                        <h3 className="text-[10px] font-bold text-[#d4af37] uppercase tracking-[0.3em]">Síguenos</h3>
                        <div className="flex gap-4 mb-2">
                            <a href="https://www.instagram.com/legal360abogados/" target="_blank" rel="noopener noreferrer" 
                               className="text-lg text-gray-400 hover:text-[#d4af37] transition-all transform hover:scale-125">
                                <FaInstagram />
                            </a>
                            <a href="https://wa.link/twbzum" target="_blank" rel="noopener noreferrer" 
                               className="text-lg text-gray-400 hover:text-[#d4af37] transition-all transform hover:scale-125">
                                <FaWhatsapp />
                            </a>
                        </div>
                        <nav className="flex flex-col lg:items-end gap-1.5 text-[10px] text-gray-500 uppercase tracking-wider">
                            <Link to="/politica-datos" className="hover:text-white transition-colors">Política de Datos</Link>
                            <Link to="/terminos-condiciones" className="hover:text-white transition-colors">Términos y Condiciones</Link>
                        </nav>
                    </motion.div>
                </div>

                {/* --- BARRA FINAL ULTRA SLIM --- */}
                <motion.div 
                    variants={fadeInUp}
                    className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4"
                >
                    <p className="text-[9px] text-gray-600 uppercase tracking-[0.2em]">
                        © {currentYear} Legal 360. Todos los derechos reservados.
                    </p>
                    
                    {/* Elemento disruptivo: Firma de diseño */}
                    <div className="flex items-center gap-3">
                        <div className="h-[1px] w-8 bg-white/10" />
                        <p className="text-[8px] text-white/20 uppercase tracking-[0.4em] font-light">
                            High-End Legal Solutions
                        </p>
                    </div>
                </motion.div>
            </motion.div>

            {/* Decoración de fondo minimalista */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#d4af37]/5 blur-[80px] rounded-full pointer-events-none" />
        </footer>
    );
};

export default Footer;