import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logolegal.webp";
import Relevo from "../assets/images/relevo.webp";

export default function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 0);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setMenuAbierto(false);
        }
    };

    return (
        <nav className={`${scrolled ? "bg-[#001e33] shadow-md" : "bg-transparent"} fixed w-full top-0 z-50 transition duration-300 font-roboto`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex items-center space-x-4">
                        <img src={logo} alt="Legal360" className="w-28 sm:w-32 md:w-40 h-auto object-contain" />
                    </div>

                    {/* Links desktop */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button onClick={() => scrollTo("top")} className="text-white hover:text-[#e6d769] text-lg font-montserrat">Inicio</button>
                        <button onClick={() => scrollTo("por-que-nosotros")} className="text-white hover:text-[#e6d769] text-lg font-montserrat">Nosotros</button>
                        <button onClick={() => scrollTo("servicios")} className="text-white hover:text-[#e6d769] text-lg font-montserrat">Servicios</button>
                        <a href="https://api.whatsapp.com/send?phone=573015207556&text=Hola%2C%20estoy%20interesado%20en%20sus%20servicios!" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#e6d769] text-lg font-montserrat">Contacto</a>
                        <a href="https://www.centroderelevo.gov.co/632/w3-channel.html" target="_blank" rel="noopener noreferrer" title="Centro de Relevo">
                            <img src={Relevo} alt="Centro de Relevo" className="w-16 h-auto object-contain" />
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setMenuAbierto(!menuAbierto)} className="text-white focus:outline-none">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

            {/* Fullscreen mobile menu */}
            <div
                className={`md:hidden fixed inset-0 bg-[#001e33]/95 z-40 flex flex-col transition-all duration-500 ease-in-out ${menuAbierto ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    }`}
            >
                <button
                    onClick={() => setMenuAbierto(false)}
                    className="absolute top-6 right-6 text-white text-3xl font-bold"
                >
                    ×
                </button>

                <div className="flex flex-col items-center justify-center space-y-8 text-center h-full w-full px-6">
                    <button onClick={() => scrollTo("top")} className="text-white hover:text-[#e6d769] text-2xl font-semibold font-montserrat">Inicio</button>
                    <button onClick={() => scrollTo("por-que-nosotros")} className="text-white hover:text-[#e6d769] text-2xl font-semibold font-montserrat">Nosotros</button>
                    <button onClick={() => scrollTo("servicios")} className="text-white hover:text-[#e6d769] text-2xl font-semibold font-montserrat">Servicios</button>
                    <a href="https://api.whatsapp.com/send?phone=573015207556&text=Hola%2C%20estoy%20interesado%20en%20sus%20servicios!" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#e6d769] text-2xl font-semibold font-montserrat">Contacto</a>
                    <a href="https://www.centroderelevo.gov.co/632/w3-channel.html" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#e6d769] text-2xl font-semibold font-montserrat">Centro de Relevo</a>
                </div>
            </div>
        </nav>
    );
}
