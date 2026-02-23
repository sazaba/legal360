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

    // 1. Lógica de Scroll Premium
    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            setScrolled(currentY > 20);

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

    // 2. Cerrar dropdowns
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
            confirmButtonColor: '#d4af37',
            cancelButtonColor: '#3b82f6',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar',
            customClass: { popup: 'rounded-3xl border border-gray-700' }
        });

        if (result.isConfirmed) {
            logout();
            navigate("/");
        }
    };

    const isDarkBgRoute = location.pathname === "/politica-datos" || location.pathname === "/terminos-condiciones";
    const isFloating = scrolled || isDarkBgRoute;

    return (
        <>
            {/* WRAPPER PRINCIPAL - Posicionamiento Flotante */}
            <header 
                className={`fixed left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
                    ${showNavbar ? "top-4 sm:top-6" : "-top-32"}
                    ${isFloating ? "w-[92%] lg:w-[85%] max-w-7xl" : "w-full sm:w-[96%] max-w-7xl"}
                `}
            >
                {/* CUERPO DEL NAVBAR (Cápsula Glass) */}
                <div 
                    className={`relative w-full flex items-center justify-between transition-all duration-700 px-6 sm:px-10 h-16 sm:h-20
                        ${isFloating 
                            ? "bg-[#001e33]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)]" 
                            : "bg-transparent border border-transparent rounded-none"}
                    `}
                    style={isFloating ? { WebkitBackdropFilter: 'blur(20px)' } : {}}
                >
                    
                    {/* LOGO - Centrado verticalmente por el flex h-full */}
                    <div 
                        onClick={() => handleSmartScroll("top")}
                        className="flex items-center cursor-pointer select-none group h-full"
                    >
                        <img
                            src={logo}
                            alt="Legal360"
                            className="h-10 sm:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>

                    {/* MENÚ DESKTOP - Centrado verticalmente */}
                    <nav className="hidden md:flex items-center space-x-1 sm:space-x-4 lg:space-x-8 h-full">
                        {['top', 'por-que-nosotros', 'servicios'].map((item, index) => {
                            const labels = ['Inicio', 'Nosotros', 'Servicios'];
                            return (
                                <button 
                                    key={item}
                                    onClick={() => handleSmartScroll(item)} 
                                    className="relative text-gray-200 hover:text-[#e6d769] text-sm lg:text-base font-montserrat font-semibold transition-all duration-300 px-4 py-2 group overflow-hidden"
                                >
                                    <span className="relative z-10">{labels[index]}</span>
                                    {/* Indicador inferior disruptivo */}
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-[#e6d769] transition-all duration-500 group-hover:w-full rounded-full shadow-[0_0_10px_#e6d769]"></span>
                                </button>
                            );
                        })}
                        
                        <a href="https://wa.link/twbzum" target="_blank" rel="noopener noreferrer" className="relative text-gray-200 hover:text-[#e6d769] text-sm lg:text-base font-montserrat font-semibold transition-all duration-300 px-4 py-2 group">
                            Contacto
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-[#e6d769] transition-all duration-500 group-hover:w-full rounded-full shadow-[0_0_10px_#e6d769]"></span>
                        </a>

                        {/* Dropdown Usuario */}
                        {usuario && usuario.nombre ? (
                            <div className="relative ml-4" ref={dropdownRef}>
                                <button 
                                    onClick={() => setUserDropdown(!userDropdown)}
                                    className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2.5 rounded-full hover:bg-[#e6d769] hover:text-[#001e33] transition-all duration-500 group"
                                >
                                    <div className="bg-gradient-to-r from-[#d4af37] to-[#f5e27a] text-[#001e33] rounded-full w-8 h-8 flex items-center justify-center font-black text-sm shadow-md">
                                        {usuario.nombre.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-montserrat font-bold">{usuario.nombre}</span>
                                    <DownOutlined className={`text-xs transition-transform duration-500 ${userDropdown ? 'rotate-180' : ''}`} />
                                </button>

                                <div className={`absolute right-0 mt-4 w-60 rounded-3xl overflow-hidden shadow-2xl bg-[#001e33]/95 backdrop-blur-2xl border border-white/10 transition-all duration-500 origin-top-right ${userDropdown ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                                    <div className="p-2 flex flex-col gap-1">
                                        <button onClick={() => { setUserDropdown(false); navigate('/admin'); }} className="flex items-center gap-3 w-full text-left px-5 py-4 text-sm text-gray-200 hover:text-[#001e33] hover:bg-[#e6d769] rounded-2xl transition-all">
                                            <DashboardOutlined className="text-lg" /> <span>Panel Administrativo</span>
                                        </button>
                                        <div className="h-[1px] bg-white/5 mx-4 my-1"></div>
                                        <button onClick={handleLogout} className="flex items-center gap-3 w-full text-left px-5 py-4 text-sm text-red-400 hover:text-white hover:bg-red-500 rounded-2xl transition-all">
                                            <LogoutOutlined className="text-lg" /> <span>Cerrar Sesión</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button onClick={() => navigate('/login')} className="ml-4 bg-[#e6d769] text-[#001e33] border border-[#e6d769] hover:bg-transparent hover:text-[#e6d769] px-7 py-2.5 rounded-full text-sm font-montserrat font-black transition-all duration-500 shadow-[0_10px_20px_rgba(230,215,105,0.2)]">
                                LOGIN
                            </button>
                        )}

                        <a href="https://www.cancilleria.gov.co/centro-relevo" target="_blank" rel="noopener noreferrer" className="ml-4 hover:scale-110 transition-transform duration-500">
                            <img src={Relevo} alt="Centro de Relevo" className="w-10 object-contain brightness-110" />
                        </a>
                    </nav>

                    {/* BOTÓN HAMBURGUESA MÓVIL */}
                    <button 
                        onClick={() => setMenuAbierto(true)} 
                        className="md:hidden flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-[#e6d769] active:scale-90 transition-all"
                    >
                        <MenuOutlined className="text-xl" />
                    </button>
                </div>
            </header>

            {/* MENÚ MÓVIL (Full Screen Overlay - Sin cambios funcionales, solo estilo) */}
            <div className={`fixed inset-0 z-[200] md:hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${menuAbierto ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <div className="absolute inset-0 bg-[#001e33]/90 backdrop-blur-2xl" style={{ WebkitBackdropFilter: 'blur(20px)' }} onClick={() => setMenuAbierto(false)}></div>
                
                <div className={`absolute top-0 right-0 w-[85%] sm:w-[400px] h-full bg-[#031525] border-l border-white/10 shadow-2xl flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${menuAbierto ? "translate-x-0" : "translate-x-full"}`}>
                    
                    <div className="flex justify-between items-center p-8 border-b border-white/5">
                        <img src={logo} alt="Legal360" className="h-10 w-auto object-contain" />
                        <button onClick={() => setMenuAbierto(false)} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 text-gray-300 hover:text-white transition-all">
                            <CloseOutlined className="text-xl" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-8 py-10 flex flex-col gap-8">
                        {usuario && usuario.nombre ? (
                            <div className="bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center text-center shadow-xl">
                                <div className="bg-gradient-to-r from-[#d4af37] to-[#f5e27a] text-[#001e33] rounded-full w-20 h-20 flex items-center justify-center font-black text-4xl shadow-2xl mb-4">
                                    {usuario.nombre.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-2xl text-white font-montserrat font-black mb-6">Hola, {usuario.nombre.split(' ')[0]}</span>
                                
                                <div className="w-full flex flex-col gap-3">
                                    <button onClick={() => { setMenuAbierto(false); navigate('/admin'); }} className="w-full py-4 bg-[#e6d769] text-[#001e33] rounded-2xl font-black text-sm flex items-center justify-center gap-3 shadow-lg">
                                        <DashboardOutlined className="text-lg"/> PANEL DE CONTROL
                                    </button>
                                    <button onClick={handleLogout} className="w-full py-4 bg-red-500/10 text-red-400 border border-red-500/20 rounded-2xl font-black text-sm flex items-center justify-center gap-3">
                                        <LogoutOutlined className="text-lg"/> CERRAR SESIÓN
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button onClick={() => { setMenuAbierto(false); navigate('/login'); }} className="w-full py-5 bg-gradient-to-r from-[#d4af37] to-[#f5e27a] text-[#001e33] rounded-2xl font-black font-montserrat text-lg shadow-[0_15px_30px_rgba(212,175,55,0.3)] active:scale-95 transition-all">
                                INICIAR SESIÓN
                            </button>
                        )}

                        <div className="flex flex-col gap-2">
                            {['top', 'por-que-nosotros', 'servicios'].map((item, index) => {
                                const labels = ['Inicio', 'Nosotros', 'Servicios'];
                                return (
                                    <button key={item} onClick={() => handleSmartScroll(item)} className="text-left w-full py-5 text-3xl font-montserrat font-black text-gray-400 hover:text-[#e6d769] transition-all border-b border-white/5 uppercase tracking-tighter">
                                        {labels[index]}
                                    </button>
                                );
                            })}
                            <a href="https://wa.link/twbzum" target="_blank" rel="noopener noreferrer" className="text-left w-full py-5 text-3xl font-montserrat font-black text-gray-400 hover:text-[#e6d769] transition-all border-b border-white/5 uppercase tracking-tighter">
                                Contacto
                            </a>
                        </div>
                    </div>

                    <div className="p-10 border-t border-white/5 flex flex-col items-center justify-center bg-black/20">
                        <span className="text-[10px] text-gray-500 font-montserrat font-bold uppercase tracking-[0.4em] mb-4">Accesibilidad</span>
                        <a href="https://www.centroderelevo.gov.co/632/w3-channel.html" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-500">
                            <img src={Relevo} alt="Centro de Relevo" className="w-16 opacity-80" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}