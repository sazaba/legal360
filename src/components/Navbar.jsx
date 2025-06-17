import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import logo from "../assets/images/logolegal.webp";
import Relevo from "../assets/images/relevo.webp";

export default function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { usuario, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 0);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleSmartScroll = (id) => {
        setMenuAbierto(false);
        if (location.pathname === "/") {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
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

    const goToLogin = () => {
        navigate("/login");
        setMenuAbierto(false);
    };

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: '¿Deseas cerrar sesión?',
            text: 'Tu sesión actual será finalizada.',
            icon: 'question',
            background: '#0f172a',
            color: '#ffffff',
            showCancelButton: true,
            confirmButtonColor: '#e11d48',
            cancelButtonColor: '#3b82f6',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'rounded-xl shadow-lg border border-gray-700'
            }
        });

        if (result.isConfirmed) {
            await Swal.fire({
                title: 'Sesión cerrada',
                text: '¡Esperamos verte pronto!',
                icon: 'success',
                timer: 1800,
                showConfirmButton: false,
                background: '#0f172a',
                color: '#ffffff'
            });
            logout();
            navigate("/");
        }
    };

    return (
        <nav className={`${scrolled || location.pathname === "/politica-datos" || location.pathname === "/terminos-condiciones" ? "bg-[#001e33] shadow-md" : "bg-transparent"} fixed w-full top-0 z-100 transition duration-300 font-roboto text-white`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => {
                                navigate("/");
                                setMenuAbierto(false);
                                setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
                            }}
                            className="p-0 m-0 border-none bg-transparent"
                        >
                            <img
                                src={logo}
                                alt="Legal360"
                                className="w-16 sm:w-20 md:w-24 h-auto object-contain cursor-pointer"
                            />
                        </button>
                    </div>

                    <div className="hidden md:flex items-center space-x-6 text-white">
                        <button onClick={() => handleSmartScroll("top")} className="hover:text-[#e6d769] text-base font-montserrat">Inicio</button>
                        <button onClick={() => handleSmartScroll("por-que-nosotros")} className="hover:text-[#e6d769] text-base font-montserrat">Nosotros</button>
                        <button onClick={() => handleSmartScroll("servicios")} className="hover:text-[#e6d769] text-base font-montserrat">Servicios</button>
                        <a href="https://wa.link/twbzum" className="hover:text-[#e6d769] text-base font-montserrat" target="_blank" rel="noopener noreferrer">Contacto</a>

                        {usuario && usuario.nombre && (
                            <button onClick={() => navigate('/admin')} className="hover:text-[#e6d769] text-base font-semibold font-montserrat">Panel Administrativo</button>
                        )}

                        {usuario && usuario.nombre ? (
                            <>
                                <span className="text-base font-montserrat">Bienvenid@ {usuario.nombre}</span>
                                <button onClick={handleLogout} className="hover:text-red-400 text-base font-montserrat ml-2">Cerrar Sesión</button>
                            </>
                        ) : (
                            <button onClick={goToLogin} className="hover:text-[#e6d769] text-base font-montserrat">Iniciar Sesión</button>
                        )}

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
                <div className="flex flex-col items-center justify-center space-y-6 text-center h-full w-full px-6 text-white">
                    <button onClick={() => handleSmartScroll("top")} className="hover:text-[#e6d769] text-base font-semibold font-montserrat">Inicio</button>
                    <button onClick={() => handleSmartScroll("por-que-nosotros")} className="hover:text-[#e6d769] text-base font-semibold font-montserrat">Nosotros</button>
                    <button onClick={() => handleSmartScroll("servicios")} className="hover:text-[#e6d769] text-base font-semibold font-montserrat">Servicios</button>
                    <a href="https://wa.link/twbzum" className="text-white hover:text-[#e6d769] text-base font-semibold font-montserrat" target="_blank" rel="noopener noreferrer">Contacto</a>

                    {usuario && usuario.nombre && (
                        <button onClick={() => navigate('/admin')} className="hover:text-[#e6d769] text-base font-semibold font-montserrat">Panel Administrativo</button>
                    )}

                    {usuario && usuario.nombre ? (
                        <>
                            <span className="text-base font-semibold font-montserrat">Bienvenid@ {usuario.nombre}</span>
                            <button onClick={handleLogout} className="hover:text-red-400 text-base font-semibold font-montserrat">Cerrar Sesión</button>
                        </>
                    ) : (
                        <button onClick={goToLogin} className="hover:text-[#e6d769] text-base font-semibold font-montserrat">Iniciar Sesión</button>
                    )}

                    <a href="https://www.centroderelevo.gov.co/632/w3-channel.html" target="_blank" rel="noopener noreferrer" className="hover:text-[#e6d769] text-base font-semibold font-montserrat">Centro de Relevo</a>
                </div>
            </div>
        </nav>
    );
}
