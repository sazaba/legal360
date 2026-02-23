import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { DownOutlined, LogoutOutlined, DashboardOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import logo from "../assets/images/logolegal.webp";
import Relevo from "../assets/images/relevo.webp";

export default function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [userDropdown, setUserDropdown] = useState(false);
    
    const dropdownRef = useRef(null);
    const { usuario, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // 1. Lógica de Scroll Premium y Optimizada
    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            
            // Detectar si bajamos de los primeros 20px
            setScrolled(currentY > 20);

            // Ocultar al bajar, mostrar al subir (solo si el menú móvil y dropdown están cerrados)
            if (currentY > lastScrollY && currentY > 100 && !menuAbierto && !userDropdown) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }
            setLastScrollY(currentY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY, menuAbierto, userDropdown]);

    // 2. Cerrar dropdowns al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setUserDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 3. Navegación Inteligente
    const handleSmartScroll = (id) => {
        setMenuAbierto(false);
        setUserDropdown(false);
        if (location.pathname === "/") {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "smooth" });
        } else {
            navigate(`/#${id}`);
            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: "smooth" });
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
            customClass: { popup: 'rounded-2xl border border-gray-700' }
        });

        if (result.isConfirmed) {
            logout();
            navigate("/");
        }
    };

    const isDarkBgRoute = location.pathname === "/politica-datos" || location.pathname === "/terminos-condiciones";
    const isActiveBackground = scrolled || isDarkBgRoute;

    return (
        <>
            {/* HEADER PRINCIPAL - Nueva Estructura */}
            <header 
                className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out font-roboto
                    ${showNavbar ? "translate-y-0" : "-translate-y-full"}
                    ${isActiveBackground ? "py-2 sm:py-3" : "py-4 sm:py-6"}
                `}
            >
                {/* Capa de Fondo Aislada (Evita el bug de Safari) */}
                <div 
                    className={`absolute inset-0 transition-all duration-500 mx-auto
                        ${isActiveBackground ? "bg-[#001e33]/90 backdrop-blur-md shadow-lg border-b sm:border border-white/5 sm:w-[96%] sm:rounded-2xl sm:top-2 sm:bottom-[-8px]" : "bg-transparent w-full border-transparent"}
                    `}
                    style={isActiveBackground ? { WebkitBackdropFilter: 'blur(12px)' } : {}}
                />

                {/* Capa de Contenido Frontal */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-14">
                    
                    {/* LOGO - Dimensiones estrictas */}
                    <div 
                        onClick={() => handleSmartScroll("top")}
                        className="flex items-center cursor-pointer select-none group"
                    >
                        <img
                            src={logo}
                            alt="Legal360"
                            loading="eager"
                            className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:opacity-90"
                            style={{ WebkitUserDrag: 'none' }}
                        />
                    </div>

                    {/* MENÚ DESKTOP - Enlaces con Hover Premium */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {['top', 'por-que-nosotros', 'servicios'].map((item, index) => {
                            const labels = ['Inicio', 'Nosotros', 'Servicios'];
                            return (
                                <button 
                                    key={item}
                                    onClick={() => handleSmartScroll(item)} 
                                    className="relative text-gray-200 hover:text-[#e6d769] text-sm lg:text-base font-montserrat font-medium transition-colors group py-2"
                                >
                                    {labels[index]}
                                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#e6d769] transition-all duration-300 group-hover:w-full rounded-full"></span>
                                </button>
                            );
                        })}
                        
                        <a href="https://wa.link/twbzum" target="_blank" rel="noopener noreferrer" className="relative text-gray-200 hover:text-[#e6d769] text-sm lg:text-base font-montserrat font-medium transition-colors group py-2">
                            Contacto
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#e6d769] transition-all duration-300 group-hover:w-full rounded-full"></span>
                        </a>

                        {/* Dropdown Usuario Desktop */}
                        {usuario && usuario.nombre ? (
                            <div className="relative" ref={dropdownRef}>
                                <button 
                                    onClick={() => setUserDropdown(!userDropdown)}
                                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full transition-all duration-300"
                                >
                                    <div className="bg-gradient-to-r from-[#d4af37] to-[#f5e27a] text-[#001e33] rounded-full w-7 h-7 flex items-center justify-center font-bold text-xs shadow-sm">
                                        {usuario.nombre.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm text-white font-montserrat font-medium">{usuario.nombre}</span>
                                    <DownOutlined className={`text-white text-xs transition-transform duration-300 ${userDropdown ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Menú Desplegable */}
                                <div className={`absolute right-0 mt-3 w-56 rounded-2xl overflow-hidden shadow-2xl bg-[#001e33]/95 backdrop-blur-xl border border-white/10 transition-all duration-300 origin-top-right ${userDropdown ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                                    <div className="p-2 flex flex-col gap-1">
                                        <button onClick={() => { setUserDropdown(false); navigate('/admin'); }} className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-gray-200 hover:text-[#001e33] hover:bg-[#e6d769] rounded-xl transition-colors">
                                            <DashboardOutlined /> Panel Administrativo
                                        </button>
                                        <div className="h-[1px] bg-white/5 my-1 mx-2"></div>
                                        <button onClick={handleLogout} className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-red-400 hover:text-white hover:bg-red-500 rounded-xl transition-colors">
                                            <LogoutOutlined /> Cerrar Sesión
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button onClick={() => navigate('/login')} className="bg-transparent border border-[#e6d769] text-[#e6d769] hover:bg-[#e6d769] hover:text-[#001e33] px-6 py-2 rounded-full text-sm font-montserrat font-semibold transition-all duration-300">
                                Iniciar Sesión
                            </button>
                        )}

                        <a href="https://www.cancilleria.gov.co/centro-relevo" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                            <img src={Relevo} alt="Centro de Relevo" className="w-10 object-contain" />
                        </a>
                    </nav>

                    {/* BOTÓN HAMBURGUESA MÓVIL */}
                    <button 
                        onClick={() => setMenuAbierto(true)} 
                        className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-[#e6d769] active:scale-95 transition-transform"
                    >
                        <MenuOutlined className="text-lg" />
                    </button>
                </div>
            </header>

            {/* MENÚ MÓVIL (Full Screen Overlay) */}
            <div className={`fixed inset-0 z-[200] md:hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${menuAbierto ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                
                {/* Fondo oscuro nativo */}
                <div className="absolute inset-0 bg-[#001e33]/95 backdrop-blur-xl" style={{ WebkitBackdropFilter: 'blur(20px)' }} onClick={() => setMenuAbierto(false)}></div>
                
                {/* Contenedor Lateral (Desliza desde la derecha) */}
                <div className={`absolute top-0 right-0 w-[85%] sm:w-[350px] h-full bg-[#031525] border-l border-white/10 shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${menuAbierto ? "translate-x-0" : "translate-x-full"}`}>
                    
                    {/* Cabecera del Menú Móvil */}
                    <div className="flex justify-between items-center p-6 border-b border-white/5">
                        <img src={logo} alt="Legal360" className="h-8 w-auto object-contain" />
                        <button onClick={() => setMenuAbierto(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-gray-300 hover:text-white transition-colors">
                            <CloseOutlined className="text-lg" />
                        </button>
                    </div>

                    {/* Contenido scrolleable */}
                    <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-6">
                        
                        {/* Perfil Móvil */}
                        {usuario && usuario.nombre ? (
                            <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl p-5 flex flex-col items-center text-center">
                                <div className="bg-gradient-to-r from-[#d4af37] to-[#f5e27a] text-[#001e33] rounded-full w-16 h-16 flex items-center justify-center font-bold text-3xl shadow-lg mb-3">
                                    {usuario.nombre.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-lg text-white font-montserrat font-semibold mb-4">Hola, {usuario.nombre}</span>
                                
                                <div className="w-full flex flex-col gap-2">
                                    <button onClick={() => { setMenuAbierto(false); navigate('/admin'); }} className="w-full py-3 bg-[#e6d769] text-[#001e33] rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                                        <DashboardOutlined /> Panel
                                    </button>
                                    <button onClick={handleLogout} className="w-full py-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                                        <LogoutOutlined /> Salir
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button onClick={() => { setMenuAbierto(false); navigate('/login'); }} className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#f5e27a] text-[#001e33] rounded-xl font-bold font-montserrat text-base shadow-lg active:scale-95 transition-transform">
                                Iniciar Sesión
                            </button>
                        )}

                        <div className="w-full h-[1px] bg-white/5 my-2"></div>

                        {/* Enlaces Móviles */}
                        <div className="flex flex-col gap-1">
                            {['top', 'por-que-nosotros', 'servicios'].map((item, index) => {
                                const labels = ['Inicio', 'Nosotros', 'Servicios'];
                                return (
                                    <button key={item} onClick={() => handleSmartScroll(item)} className="text-left w-full py-4 text-xl font-montserrat font-medium text-gray-300 hover:text-[#e6d769] hover:pl-2 transition-all">
                                        {labels[index]}
                                    </button>
                                );
                            })}
                            <a href="https://wa.link/twbzum" target="_blank" rel="noopener noreferrer" className="text-left w-full py-4 text-xl font-montserrat font-medium text-gray-300 hover:text-[#e6d769] hover:pl-2 transition-all">
                                Contacto
                            </a>
                        </div>
                    </div>

                    {/* Footer del Menú Móvil */}
                    <div className="p-6 border-t border-white/5 flex flex-col items-center justify-center bg-black/20">
                        <span className="text-xs text-gray-500 font-montserrat uppercase tracking-widest mb-3">Accesibilidad</span>
                        <a href="https://www.centroderelevo.gov.co/632/w3-channel.html" target="_blank" rel="noopener noreferrer">
                            <img src={Relevo} alt="Centro de Relevo" className="w-14 opacity-80" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}