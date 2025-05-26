import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-[#001e33] to-[#1d1d1b] text-white pt-0 pb-12 px-0 font-roboto relative">

            {/* Contenido del Footer */}
            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 items-stretch px-6 md:px-20 mt-10">
                {/* Legal360 */}
                <div className="flex flex-col justify-between h-full">
                    <h2 className="text-3xl font-bold text-[#e6d769] mb-4">Legal 360</h2>
                    <p className="text-lg text-gray-300">
                        Asesoría legal clara, eficiente y al alcance de todos.<br />
                        Protege tu empresa con expertos que te acompañan.
                    </p>
                </div>

                {/* Enlaces */}
                <div className="flex flex-col justify-between h-full">
                    <h3 className="text-3xl font-semibold mb-4 text-[#e6d769]">Enlaces</h3>
                    <ul className="space-y-2 text-lg text-gray-300">
                        <li><a href="/#inicio" className="hover:text-white transition">Inicio</a></li>
                        <li><a href="/#servicios" className="hover:text-white transition">Servicios</a></li>
                        <li><a href="/#nosotros" className="hover:text-white transition">Nosotros</a></li>
                        <li><a href="/#contacto" className="hover:text-white transition">Contacto</a></li>
                    </ul>
                </div>

                {/* Contacto */}
                <div className="flex flex-col justify-between h-full">
                    <h3 className="text-3xl font-semibold mb-4 text-[#e6d769]">Contacto</h3>
                    <div className="text-lg text-gray-300 space-y-1">
                        <p>juridico@legal360.co</p>
                        <p>+57 312 324 0463</p>
                        <p>+57 322 767 1911</p>
                        <p>Carrea 23 # 79 - 09 | Pereira, Risaralda</p>
                    </div>
                </div>

                {/* Redes sociales */}
                <div className="flex flex-col justify-between h-full">
                    <h3 className="text-3xl font-semibold mb-4 text-[#e6d769]">Síguenos</h3>
                    <div className="flex space-x-4">
                        <a href="#" className="p-3 bg-[#e6d769] text-[#001e33] rounded-full hover:scale-110 transition-all"><FaFacebookF /></a>
                        <a href="#" className="p-3 bg-[#e6d769] text-[#001e33] rounded-full hover:scale-110 transition-all"><FaTwitter /></a>
                        <a href="#" className="p-3 bg-[#e6d769] text-[#001e33] rounded-full hover:scale-110 transition-all"><FaInstagram /></a>
                        <a href="#" className="p-3 bg-[#e6d769] text-[#001e33] rounded-full hover:scale-110 transition-all"><FaLinkedin /></a>
                    </div>
                </div>
            </div>

            {/* Línea inferior */}
            <div className="mt-12 border-t border-gray-700 pt-6 text-center text-xs text-gray-400 px-6">
                © {new Date().getFullYear()} Legal 360. Todos los derechos reservados.
            </div>
        </footer>
    );
};

export default Footer;
