import { motion } from 'framer-motion';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { HashLink as Link } from 'react-router-hash-link';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative w-full bg-[#030912] pt-10 pb-6 px-6 lg:px-20 overflow-hidden border-t border-white/10 font-roboto isolate">
            
            {/* Sutil resplandor de fondo para profundidad premium */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* --- SECCIÓN PRINCIPAL: DISTRIBUCIÓN HORIZONTAL --- */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-4 mb-10">
                    
                    {/* Branding Compacto */}
                    <div className="flex flex-col gap-2 max-w-xs">
                        <motion.h2 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f5e27a] font-montserrat tracking-tight"
                        >
                            Legal 360 <span className="text-[10px] font-light tracking-widest text-white/50 ml-1">S.A.S.</span>
                        </motion.h2>
                        <p className="text-[11px] text-gray-500 leading-relaxed font-light uppercase tracking-wider">
                            NIT. 901.938.444-1 <br />
                            <span className="text-white/40 italic">Soluciones jurídicas preventivas.</span>
                        </p>
                    </div>

                    {/* Grid de Links Ultra-Compacto */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-6 lg:gap-x-16">
                        {/* Navegación */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-[9px] font-bold text-[#e6d769] uppercase tracking-[0.2em]">Navegación</h3>
                            <nav className="flex flex-col gap-2 text-[12px] text-gray-400">
                                <Link smooth to="/#top" className="hover:text-white transition-colors">Inicio</Link>
                                <Link smooth to="/#servicios" className="hover:text-white transition-colors">Servicios</Link>
                                <Link smooth to="/#por-que-nosotros" className="hover:text-white transition-colors">Nosotros</Link>
                            </nav>
                        </div>

                        {/* Contacto */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-[9px] font-bold text-[#e6d769] uppercase tracking-[0.2em]">Contacto</h3>
                            <div className="flex flex-col gap-2 text-[12px] text-gray-400">
                                <a href="mailto:juridico@legal360.co" className="hover:text-white transition-colors">juridico@legal360.co</a>
                                <span className="">+57 312 324 0463</span>
                            </div>
                        </div>

                        {/* Legal (Oculto en móvil muy pequeño o agrupado) */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-[9px] font-bold text-[#e6d769] uppercase tracking-[0.2em]">Legal</h3>
                            <nav className="flex flex-col gap-2 text-[12px] text-gray-400">
                                <Link to="/politica-datos" className="hover:text-white transition-colors">Privacidad</Link>
                                <Link to="/terminos-condiciones" className="hover:text-white transition-colors">Términos</Link>
                            </nav>
                        </div>
                    </div>

                    {/* Social & Status */}
                    <div className="flex flex-col items-start lg:items-end gap-4">
                        <div className="flex gap-3">
                            <a href="https://www.instagram.com/legal360abogados/" target="_blank" rel="noopener noreferrer" 
                               className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm text-gray-400 hover:bg-[#d4af37] hover:text-[#030912] transition-all duration-300">
                                <FaInstagram />
                            </a>
                            <a href="https://wa.link/twbzum" target="_blank" rel="noopener noreferrer" 
                               className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm text-gray-400 hover:bg-[#d4af37] hover:text-[#030912] transition-all duration-300">
                                <FaWhatsapp />
                            </a>
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">Atención Activa</span>
                        </div>
                    </div>
                </div>

                {/* --- FOOTER INFERIOR --- */}
                <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-600 uppercase tracking-[0.15em]">
                    <p>© {currentYear} LEGAL 360 S.A.S. — Pereira, Col</p>
                    <div className="flex items-center gap-4">
                        <p className="hover:text-gray-400 transition-colors cursor-default">Diseño de Vanguardia</p>
                        <span className="w-1 h-1 rounded-full bg-white/10" />
                        <p className="text-white/20">V.2.0</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;