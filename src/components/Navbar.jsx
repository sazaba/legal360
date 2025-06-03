import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import logo from "../assets/images/logolegal.webp";
import Relevo from "../assets/images/relevo.webp";

export default function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 0);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleSmartScroll = (id) => {
        if (location.pathname === "/") {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                setMenuAbierto(false);
            }
        } else {
            navigate("/#" + id);
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 500);
        }
    };

    return (
        <nav className={`${scrolled || location.pathname === "/politica-datos" || location.pathname === "/terminos-condiciones" ? "bg-[#001e33] shadow-md" : "bg-transparent"} fixed w-full top-0 z-100 transition duration-300 font-roboto`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center space-x-4">
                        <Link to="/">
                            <img
                                src={logo}
                                alt="Legal360"
                                className="w-16 sm:w-20 md:w-24 h-auto object-contain cursor-pointer"
                            />
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <button onClick={() => handleSmartScroll("top")} className="text-white hover:text-[#e6d769] text-sm lg:text-base font-montserrat">
                            Inicio
                        </button>
                        <button onClick={() => handleSmartScroll("por-que-nosotros")} className="text-white hover:text-[#e6d769] text-sm lg:text-base font-montserrat">
                            Nosotros
                        </button>
                        <button onClick={() => handleSmartScroll("servicios")} className="text-white hover:text-[#e6d769] text-sm lg:text-base font-montserrat">
                            Servicios
                        </button>
                        <a href="https://wa.link/twbzum" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#e6d769] text-sm lg:text-base font-montserrat">
                            Contacto
                        </a>

                        <button
                            onClick={() => navigate("/politica-datos")}
                            className="text-white hover:text-[#e6d769] text-sm lg:text-base font-montserrat"
                        >
                            Política de Datos
                        </button>
                        <button
                            onClick={() => navigate("/terminos-condiciones")}
                            className="text-white hover:text-[#e6d769] text-sm lg:text-base font-montserrat"
                        >
                            Términos y Condiciones
                        </button>
                        <a href="https://www.centroderelevo.gov.co/632/w3-channel.html" target="_blank" rel="noopener noreferrer" title="Centro de Relevo" className="inline-flex">
                            <img src={Relevo} alt="Centro de Relevo" className="w-10 sm:w-12 object-contain" />
                        </a>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setMenuAbierto(!menuAbierto)} className="text-white focus:outline-none">
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {menuAbierto ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`md:hidden fixed inset-0 bg-[#001e33]/95 z-40 flex flex-col transition-all duration-500 ease-in-out ${menuAbierto ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
                <button onClick={() => setMenuAbierto(false)} className="absolute top-6 right-6 text-white text-2xl font-bold">×</button>
                <div className="flex flex-col items-center justify-center space-y-6 text-center h-full w-full px-6">
                    <button onClick={() => handleSmartScroll("top")} className="text-white hover:text-[#e6d769] text-base sm:text-lg font-semibold font-montserrat">Inicio</button>
                    <button onClick={() => handleSmartScroll("por-que-nosotros")} className="text-white hover:text-[#e6d769] text-base sm:text-lg font-semibold font-montserrat">Nosotros</button>
                    <button onClick={() => handleSmartScroll("servicios")} className="text-white hover:text-[#e6d769] text-base sm:text-lg font-semibold font-montserrat">Servicios</button>
                    <a href="https://wa.link/twbzum" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#e6d769] text-base sm:text-lg font-semibold font-montserrat">Contacto</a>

                    <button
                        onClick={() => {
                            setMenuAbierto(false);
                            navigate("/politica-datos");
                        }}
                        className="text-white hover:text-[#e6d769] text-base sm:text-lg font-semibold font-montserrat"
                    >
                        Política de Datos
                    </button>
                    <button
                        onClick={() => {
                            setMenuAbierto(false);
                            navigate("/terminos-condiciones");
                        }}
                        className="text-white hover:text-[#e6d769] text-base sm:text-lg font-semibold font-montserrat"
                    >
                        Términos y Condiciones
                    </button>
                    <a href="https://www.centroderelevo.gov.co/632/w3-channel.html" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#e6d769] text-base sm:text-lg font-semibold font-montserrat">Centro de Relevo</a>
                </div>
            </div>
        </nav>
    );
}
