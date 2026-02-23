import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { HashLink as Link } from 'react-router-hash-link';

const Footer = () => {
    return (
        // Mismo fondo #030912 sin bordes superiores para que nazca directamente del componente anterior
        <footer className="bg-[#030912] text-white font-roboto pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-8 sm:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10 lg:gap-12 mb-12">

                {/* Columna 1: Branding */}
                <div className="xl:col-span-2">
                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f5e27a] mb-4 font-montserrat tracking-tight drop-shadow-md">
                        Legal 360 S.A.S.
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
                        NIT. 901.938.444-1 <br />
                        Legal, claro y eficiente. Protege tu empresa con verdaderos expertos legales en Colombia.
                    </p>
                    
                    {/* Redes Sociales en Burbujas Glass */}
                    <div className="flex gap-4">
                        <a href="https://www.instagram.com/legal360abogados/" target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 p-3.5 rounded-full hover:bg-[#e6d769] hover:text-[#001e33] hover:border-[#e6d769] text-gray-300 transition-all duration-300 shadow-lg hover:-translate-y-1">
                            <FaInstagram className="text-xl" />
                        </a>
                        <a href="https://wa.link/twbzum" target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 p-3.5 rounded-full hover:bg-[#e6d769] hover:text-[#001e33] hover:border-[#e6d769] text-gray-300 transition-all duration-300 shadow-lg hover:-translate-y-1">
                            <FaWhatsapp className="text-xl" />
                        </a>
                    </div>
                </div>

                {/* Columna 2: Navegación */}
                <div>
                    <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest font-montserrat">Navegación</h3>
                    <ul className="space-y-4 text-gray-400 text-sm font-medium">
                        <li>
                            <Link smooth to="/#top" className="hover:text-[#e6d769] hover:translate-x-1 inline-block transition-all duration-300">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link smooth to="/#servicios" className="hover:text-[#e6d769] hover:translate-x-1 inline-block transition-all duration-300">
                                Servicios
                            </Link>
                        </li>
                        <li>
                            <Link smooth to="/#por-que-nosotros" className="hover:text-[#e6d769] hover:translate-x-1 inline-block transition-all duration-300">
                                Nosotros
                            </Link>
                        </li>
                        <li>
                            <a href="https://wa.link/twbzum" target="_blank" rel="noopener noreferrer" className="hover:text-[#e6d769] hover:translate-x-1 inline-block transition-all duration-300">
                                Contacto
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Columna 3: Contacto Directo */}
                <div>
                    <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest font-montserrat">Contacto</h3>
                    <ul className="space-y-4 text-gray-400 text-sm">
                        <li className="hover:text-white transition-colors cursor-default">juridico@legal360.co</li>
                        <li className="hover:text-white transition-colors cursor-default">+57 312 324 0463</li>
                        <li className="hover:text-white transition-colors cursor-default">+57 322 767 1911</li>
                        <li className="hover:text-white transition-colors cursor-default leading-relaxed">Cra. 23 # 79 - 09<br/>Pereira, Colombia</li>
                    </ul>
                </div>

                {/* Columna 4: Legales */}
                <div>
                    <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest font-montserrat">Legal</h3>
                    <ul className="space-y-4 text-gray-400 text-sm font-medium">
                        <li>
                            <Link to="/politica-datos" className="hover:text-[#e6d769] hover:translate-x-1 inline-block transition-all duration-300">
                                Política de Datos
                            </Link>
                        </li>
                        <li>
                            <Link to="/terminos-condiciones" className="hover:text-[#e6d769] hover:translate-x-1 inline-block transition-all duration-300">
                                Términos y Condiciones
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>

            {/* Copyright Line */}
            <div className="w-full border-t border-white/5 pt-8 mt-4">
                <div className="max-w-7xl mx-auto px-8 text-center sm:text-left text-xs text-gray-500 font-montserrat tracking-wider flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p>© {new Date().getFullYear()} Legal 360 S.A.S. Todos los derechos reservados.</p>
                    <p className="text-[#e6d769]/70">Diseñado con excelencia.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;