import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logolegal.webp";
import Relevo from "../assets/images/relevo.webp"; // Asegúrate de que este archivo exista

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
        <nav
            className={`${scrolled ? "bg-[#001e33] shadow-md" : "bg-transparent"} font-roboto fixed w-full top-0 z-50 transition duration-300`}
        >
            <div className="max-w-screen-xl mx-auto py-1 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16" >
                    {/* Logo a la izquierda */}
                    <div className="flex items-center">
                        <img src={logo} alt="Legal360" className="object-contain w-30" />
                    </div>

                    {/* Enlaces + icono a la derecha */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button onClick={() => scrollTo("top")} className="px-3 py-2 rounded-md text-lg font-medium text-white hover:text-gray-300 font-montserrat">Inicio</button>
                        <button onClick={() => scrollTo("por-que-nosotros")} className="px-3 py-2 rounded-md text-md font-medium text-white hover:text-gray-300 font-montserrat">Nosotros</button>
                        <button onClick={() => scrollTo("servicios")} className="px-3 py-2 rounded-md text-lg font-medium text-white hover:text-gray-300 font-montserrat">Servicios</button>
                        <a href="https://api.whatsapp.com/send?phone=573015207556&text=Hola%2C%20estoy%20interesado%20en%20sus%20servicios!" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-md text-lg font-medium text-white hover:text-gray-300 font-montserrat">Contacto</a>
                        <a href="https://www.centroderelevo.gov.co/632/w3-channel.html" target="_blank" rel="noopener noreferrer" title="Centro de Relevo">
                            <div className="flex items-center justify-center">
                                <img src={Relevo} alt="Centro de Relevo" className="w-20" />
                            </div>
                        </a>
                    </div>

                    {/* Botón menú móvil */}
                    <div className="flex md:hidden">
                        <button onClick={() => setMenuAbierto(!menuAbierto)} className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 focus:outline-none">
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

            {/* Menú móvil */}
            {menuAbierto && (
                <div className="md:hidden bg-[#001e33] bg-opacity-95 p-4 absolute w-full top-16 left-0">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <button onClick={() => scrollTo("top")} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 font-montserrat">Inicio</button>
                        <button onClick={() => scrollTo("por-que-nosotros")} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 font-montserrat">Nosotros</button>
                        <button onClick={() => scrollTo("servicios")} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 font-montserrat">Servicios</button>
                        <a href="https://api.whatsapp.com/send?phone=573015207556&text=Hola%2C%20estoy%20interesado%20en%20sus%20servicios!" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 font-montserrat">Contacto</a>
                        <a href="https://www.centroderelevo.gov.co/632/w3-channel.html" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 font-montserrat">
                            <div className="flex items-center space-x-2">
                                <div className="bg-white rounded-full p-1 w-6 h-6 flex items-center justify-center">
                                    <img src={Relevo} alt="Centro de Relevo" className="w-4 h-4 object-contain" />
                                </div>
                                <span>Centro de Relevo</span>
                            </div>
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
