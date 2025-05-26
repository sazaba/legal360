import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-[#001e33] to-[#1d1d1b] text-white font-roboto pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                {/* Columna 1: Marca */}
                <div>
                    <h2 className="text-3xl font-bold text-[#e6d769] mb-4">Legal 360</h2>
                    <p className="text-gray-300 text-base leading-relaxed">
                        Asesoría legal clara, eficiente y al alcance de todos.<br />
                        Protege tu empresa con expertos que te acompañan.
                    </p>
                </div>

                {/* Columna 2: Enlaces */}
                <div>
                    <h3 className="text-xl font-semibold text-[#e6d769] mb-4">Enlaces</h3>
                    <ul className="space-y-2 text-gray-300 text-base">
                        <li><a href="/#inicio" className="hover:text-white transition-colors">Inicio</a></li>
                        <li><a href="/#servicios" className="hover:text-white transition-colors">Servicios</a></li>
                        <li><a href="/#nosotros" className="hover:text-white transition-colors">Nosotros</a></li>
                        <li><a href="/#contacto" className="hover:text-white transition-colors">Contacto</a></li>
                    </ul>
                </div>

                {/* Columna 3: Contacto */}
                <div>
                    <h3 className="text-xl font-semibold text-[#e6d769] mb-4">Contacto</h3>
                    <ul className="text-gray-300 text-base space-y-1">
                        <li>juridico@legal360.co</li>
                        <li>+57 312 324 0463</li>
                        <li>+57 322 767 1911</li>
                        <li>Cra. 23 # 79 - 09, Pereira</li>
                    </ul>
                </div>

                {/* Columna 4: Redes sociales */}
                <div>
                    <h3 className="text-xl font-semibold text-[#e6d769] mb-4">Síguenos</h3>
                    <div className="flex flex-wrap gap-4">
                        <a href="#" className="p-2 bg-[#e6d769] text-[#001e33] rounded-full hover:scale-110 transition-all"><FaFacebookF /></a>
                        <a href="#" className="p-2 bg-[#e6d769] text-[#001e33] rounded-full hover:scale-110 transition-all"><FaTwitter /></a>
                        <a href="#" className="p-2 bg-[#e6d769] text-[#001e33] rounded-full hover:scale-110 transition-all"><FaInstagram /></a>
                        <a href="#" className="p-2 bg-[#e6d769] text-[#001e33] rounded-full hover:scale-110 transition-all"><FaLinkedin /></a>
                    </div>
                </div>
            </div>

            {/* Línea final */}
            <div className="mt-10 border-t border-gray-700 pt-6 px-6 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} Legal 360. Todos los derechos reservados.
            </div>
        </footer>
    );
};

export default Footer;
