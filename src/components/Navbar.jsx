import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { UserOutlined, DownOutlined, LogoutOutlined, DashboardOutlined } from '@ant-design/icons';
import logo from "../assets/images/logolegal.webp";
import Relevo from "../assets/images/relevo.webp";

export default function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [userDropdown, setUserDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const { usuario, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // 1. OPTIMIZACIÓN SAFARI/MÓVIL: Scroll pasivo y prevención de re-renders innecesarios
    useEffect(() => {
        const onScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };
        
        // El { passive: true } es vital para que iOS Safari no bloquee el scroll
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [scrolled]);

    // Cerrar dropdown si se hace clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setUserDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSmartScroll = (id) => {
        setMenuAbierto(false);
        setUserDropdown(false);
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

    const handleLogout = async () => {
        setUserDropdown(false);
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
            customClass: { popup: 'rounded-xl shadow-lg border border-gray-700' }
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

    const goToLogin = () => {
        navigate("/login");
        setUserDropdown(false);
        setMenuAbierto(false);
    };

    const isDarkBgRoute = location.pathname === "/politica-datos" || location.pathname === "/terminos-condiciones";

    return (
        <nav className={`fixed w-full top-0 z-[100] transition-all duration-300 font-roboto text-white ${scrolled || isDarkBgRoute ? "bg-[#001e33]/95 backdrop-blur-md shadow-lg" : "bg-transparent"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    
                    {/* Logo */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => {
                                navigate("/");
                                setMenuAbierto(false);
                                setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
                            }}
                            className="p-0 m-0 border-none bg-transparent focus:outline-none transform hover:scale-105 transition-transform duration-300"
                        >
                            {/* Optimización de carga de imagen */}
                            <img
                                src={logo}
                                alt="Legal360"
                                fetchpriority="high"
                                className="w-16 sm:w-20 md:w-24 h-auto object-contain cursor-pointer"
                            />
                        </button>
                    </div>

                    {/* Menú Desktop */}
                    <div className="hidden md:flex items-center space-x-6 text-white">
                        <button onClick={() => handleSmartScroll("top")} className="hover:text-[#e6d769] text-base font-montserrat transition-colors">Inicio</button>
                        <button onClick={() => handleSmartScroll("por-que-nosotros")} className="hover:text-[#e6d769] text-base font-montserrat transition-colors">Nosotros</button>
                        <button onClick={() => handleSmartScroll("servicios")} className="hover:text-[#e6d769] text-base font-montserrat transition-colors">Servicios</button>
                        <a href="https://wa.link/twbzum" className="hover:text-[#e6d769] text-base font-montserrat transition-colors" target="_blank" rel="noopener noreferrer">Contacto</a>

                        {/* PROPUESTA PREMIUM: Menú de Usuario Loggeado */}
                        {usuario && usuario.nombre ? (
                            <div className="relative" ref={dropdownRef}>
                                <button 
                                    onClick={() => setUserDropdown(!userDropdown)}
                                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm transition-all duration-300 focus:outline-none"
                                >
                                    <div className="bg-[#e6d769] text-[#001e33] rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">
                                        {usuario.nombre.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-montserrat font-medium">{usuario.nombre}</span>
                                    <DownOutlined className={`text-xs transition-transform duration-300 ${userDropdown ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Glassmorphism */}
                                <div className={`absolute right-0 mt-3 w-56 rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] bg-[#001e33]/95 backdrop-blur-xl border border-white/10 transition-all duration-300 origin-top-right ${userDropdown ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
                                    <div className="p-2 flex flex-col gap-1">
                                        <button 
                                            onClick={() => { setUserDropdown(false); navigate('/admin'); }} 
                                            className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-gray-200 hover:text-[#001e33] hover:bg-[#e6d769] rounded-lg transition-colors"
                                        >
                                            <DashboardOutlined /> Panel Administrativo
                                        </button>
                                        <div className="h-[1px] bg-white/10 my-1 w-full"></div>
                                        <button 
                                            onClick={handleLogout} 
                                            className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-red-400 hover:text-white hover:bg-red-500 rounded-lg transition-colors"
                                        >
                                            <LogoutOutlined /> Cerrar Sesión
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button 
                                onClick={goToLogin} 
                                className="bg-transparent border border-[#e6d769] text-[#e6d769] hover:bg-[#e6d769] hover:text-[#001e33] px-5 py-2 rounded-full text-sm font-montserrat font-semibold transition-all duration-300"
                            >
                                Iniciar Sesión
                            </button>
                        )}

                        <a href="https://www.cancilleria.gov.co/centro-relevo" target="_blank" rel="noopener noreferrer" title="Centro de Relevo" className="inline-flex hover:scale-110 transition-transform">
                            <img src={Relevo} alt="Centro de Relevo" className="w-10 sm:w-12 object-contain" loading="lazy" />
                        </a>
                    </div>

                    {/* Botón Hamburguesa Móvil */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setMenuAbierto(!menuAbierto)} className="text-[#e6d769] focus:outline-none p-2 rounded-lg bg-white/5 border border-white/10">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuAbierto ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Menú Móvil - Optimizado para iOS Safari */}
            <div className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] transform-gpu ${menuAbierto ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                
                {/* Fondo con Glassmorphism nativo */}
                <div className="absolute inset-0 bg-[#001e33]/90 backdrop-blur-xl -webkit-backdrop-filter" />
                
                <div className={`absolute inset-0 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] transform-gpu ${menuAbierto ? "translate-y-0" : "-translate-y-8"}`}>
                    
                    <button onClick={() => setMenuAbierto(false)} className="absolute top-6 right-6 text-[#e6d769] text-4xl p-2 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 focus:outline-none z-50">×</button>
                    
                    <div className="flex flex-col flex-grow items-center justify-center space-y-6 text-center w-full px-6 text-white overflow-y-auto pb-10">
                        
                        {/* Tarjeta de Perfil Móvil */}
                        {usuario && usuario.nombre && (
                            <div className="w-full max-w-xs bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 flex flex-col items-center gap-3">
                                <div className="bg-[#e6d769] text-[#001e33] rounded-full w-14 h-14 flex items-center justify-center font-bold text-2xl shadow-lg">
                                    {usuario.nombre.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-lg font-semibold font-montserrat">Hola, {usuario.nombre}</span>
                                
                                <button onClick={() => { setMenuAbierto(false); navigate('/admin'); }} className="mt-2 w-full flex items-center justify-center gap-2 bg-[#e6d769] text-[#001e33] font-bold py-2.5 rounded-lg transition-colors">
                                    <DashboardOutlined /> Panel de Control
                                </button>
                                <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-500/20 text-red-400 border border-red-500/30 font-bold py-2.5 rounded-lg transition-colors mt-2">
                                    <LogoutOutlined /> Cerrar Sesión
                                </button>
                            </div>
                        )}

                        <button onClick={() => handleSmartScroll("top")} className="text-xl font-medium font-montserrat text-gray-200 hover:text-[#e6d769] transition-colors w-full py-2">Inicio</button>
                        <button onClick={() => handleSmartScroll("por-que-nosotros")} className="text-xl font-medium font-montserrat text-gray-200 hover:text-[#e6d769] transition-colors w-full py-2">Nosotros</button>
                        <button onClick={() => handleSmartScroll("servicios")} className="text-xl font-medium font-montserrat text-gray-200 hover:text-[#e6d769] transition-colors w-full py-2">Servicios</button>
                        <a href="https://wa.link/twbzum" className="text-xl font-medium font-montserrat text-gray-200 hover:text-[#e6d769] transition-colors w-full py-2" target="_blank" rel="noopener noreferrer">Contacto</a>

                        {!usuario && (
                            <button onClick={goToLogin} className="mt-4 bg-transparent border-2 border-[#e6d769] text-[#e6d769] px-8 py-3 rounded-full text-lg font-montserrat font-semibold w-full max-w-xs">
                                Iniciar Sesión
                            </button>
                        )}

                        <div className="mt-8 pt-8 border-t border-white/10 w-full max-w-xs flex flex-col items-center">
                            <span className="text-sm text-gray-400 mb-4 font-montserrat">Accesibilidad</span>
                            <a href="https://www.centroderelevo.gov.co/632/w3-channel.html" target="_blank" rel="noopener noreferrer" className="inline-flex">
                                <img src={Relevo} alt="Centro de Relevo" className="w-16 object-contain" loading="lazy" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}