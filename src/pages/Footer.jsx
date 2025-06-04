import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { HashLink as Link } from 'react-router-hash-link';

const Footer = () => {
    return (
        <footer className="bg-[#0d1a2b] text-white font-roboto pt-6 pb-6">
            <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-12">
                {/* Marca */}
                <div>
                    <h2 className="text-2xl font-bold text-[#e6d769] mb-4 tracking-tight">Legal 360 S.A.S.</h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        NIT. 901.938.444-1 <br />
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Legal, claro y eficiente.<br /> Protege tu empresa con expertos legales.
                    </p>
                </div>

                {/* Enlaces */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wide">Enlaces</h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li>
                            <Link smooth to="/#top" className="hover:text-white transition-colors duration-150">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link smooth to="/#servicios" className="hover:text-white transition-colors duration-150">
                                Servicios
                            </Link>
                        </li>
                        <li>
                            <Link smooth to="/#por-que-nosotros" className="hover:text-white transition-colors duration-150">
                                Nosotros
                            </Link>
                        </li>
                        <li>
                            <a
                                href="https://wa.link/twbzum"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors duration-150"
                            >
                                Contacto
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contacto */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wide">Contacto</h3>
                    <ul className="space-y-1 text-gray-400 text-sm">
                        <li>juridico@legal360.co</li>
                        <li>+57 312 324 0463</li>
                        <li>+57 322 767 1911</li>
                        <li>Cra. 23 # 79 - 09, Pereira</li>
                    </ul>
                </div>



                {/* Políticas y Condiciones */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wide">Políticas y Condiciones</h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li>
                            <Link to="/politica-datos" className="hover:text-white transition-colors duration-150">
                                Política de Datos
                            </Link>
                        </li>
                        <li>
                            <Link to="/terminos-condiciones" className="hover:text-white transition-colors duration-150">
                                Términos y Condiciones
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* Redes Sociales */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wide">Síguenos</h3>
                    <div className="flex gap-5 pb-4">
                        <a
                            href="https://www.instagram.com/legal360abogados/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors duration-200 text-xl"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://wa.link/twbzum"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors duration-200 text-xl"
                        >
                            <FaWhatsapp />
                        </a>
                    </div>
                </div>
            </div>

            <div className="pt-3 border-t border-gray-800 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Legal 360. Todos los derechos reservados.
            </div>
        </footer>
    );
};

export default Footer;
