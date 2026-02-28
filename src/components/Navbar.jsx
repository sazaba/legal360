import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { 
    DownOutlined, 
    LogoutOutlined, 
    DashboardOutlined, 
    MenuOutlined, 
    CloseOutlined, 
    ScheduleOutlined,
    UserOutlined
} from '@ant-design/icons';
import logo from "../assets/images/logolegal.webp";

// NUEVO: Recibimos isMenuOpen y setIsMenuOpen como props desde App.js
export default function Navbar({ isMenuOpen, setIsMenuOpen }) {
    const [scrolled, setScrolled] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [userDropdown, setUserDropdown] = useState(false);
    
    const dropdownRef = useRef(null);
    const { usuario, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            setScrolled(currentY > 20);
            if (currentY > lastScrollY && currentY > 100 && !isMenuOpen && !userDropdown) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }
            setLastScrollY(currentY);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY, isMenuOpen, userDropdown]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setUserDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSmartScroll = (id) => {
        setIsMenuOpen(false); // Cierra usando la prop
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
        setIsMenuOpen(false); // Cierra usando la prop
        await Swal.fire({
            title: '<span class="font-montserrat font-black">¿Cerrar Sesión?</span>',
            html: '<span class="font-montserrat font-medium text-sm">Tu sesión actual será finalizada.</span>',
            icon: 'question',
            background: '#0f172a',
            color: '#ffffff',
            showCancelButton: true,
            confirmButtonColor: '#d4af37',
            cancelButtonColor: '#3b82f6',
            confirmButtonText: '<span class="font-montserrat font-bold text-sm">Sí, cerrar</span>',
            cancelButtonText: '<span class="font-montserrat font-medium text-sm">Cancelar</span>',
            customClass: { popup: 'rounded-2xl border border-white/10 font-montserrat' }
        });

        logout();
        navigate("/");
    };

    const isFloating = scrolled || location.pathname !== "/";

    return (
        <>
            <header 
                className={`fixed left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] font-montserrat
                    ${showNavbar ? "top-3 sm:top-6" : "-top-32"}
                    ${isFloating ? "w-[94%] lg:w-[88%] max-w-7xl" : "w-full sm:w-[96%] max-w-7xl"}
                `}
            >
                <div 
                    className={`relative w-full flex items-center justify-between transition-all duration-700 px-4 sm:px-10 h-16 sm:h-20
                        ${isFloating 
                            ? "bg-[#001e33]/80 backdrop-blur-xl border border-white/10 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl" 
                            : "bg-transparent border border-transparent rounded-none"}
                    `}
                    style={isFloating ? { WebkitBackdropFilter: 'blur(20px)' } : {}}
                >
                    
                    <div onClick={() => handleSmartScroll("top")} className="flex items-center cursor-pointer select-none group h-full">
                        <img src={logo} alt="Legal360" className="h-8 sm:h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
                    </div>

                    <nav className="hidden md:flex items-center space-x-1 lg:space-x-4 h-full font-montserrat">
                        {['top', 'por-que-nosotros', 'servicios'].map((item, index) => (
                            <button 
                                key={item}
                                onClick={() => handleSmartScroll(item)} 
                                className="relative text-gray-200 hover:text-[#e6d769] text-sm lg:text-base font-semibold transition-all duration-300 px-3 py-2 group uppercase tracking-wider"
                            >
                                <span className="relative z-10">{['Inicio', 'Nosotros', 'Servicios'][index]}</span>
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-[#e6d769] transition-all duration-500 group-hover:w-full rounded-full shadow-[0_0_10px_#e6d769]"></span>
                            </button>
                        ))}

                        <button 
                            onClick={() => handleSmartScroll('planes')}
                            className="ml-2 bg-gradient-to-r from-[#d4af37] via-[#f5e27a] to-[#d4af37] text-[#001e33] px-5 py-2.5 rounded-full text-xs lg:text-sm font-black transition-all duration-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(230,215,105,0.4)] active:scale-95 flex items-center gap-2 group uppercase tracking-tight"
                        >
                            <ScheduleOutlined style={{ color: '#001e33' }} className="text-lg flex-shrink-0" />
                            <span>Agenda tu diagnóstico</span>
                        </button>

                        {usuario ? (
                            <div className="relative ml-2" ref={dropdownRef}>
                                <button 
                                    onClick={() => setUserDropdown(!userDropdown)}
                                    className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-full hover:bg-white/10 transition-all"
                                >
                                    <div className="bg-[#e6d769] text-[#001e33] rounded-full w-7 h-7 flex items-center justify-center font-black text-xs uppercase">
                                        {usuario.nombre?.charAt(0)}
                                    </div>
                                    <DownOutlined className={`text-[10px] text-gray-400 transition-transform ${userDropdown ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`absolute right-0 mt-3 w-48 bg-[#001e33] border border-white/10 rounded-xl shadow-2xl transition-all duration-300 ${userDropdown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                                    <button onClick={() => { setUserDropdown(false); navigate('/admin'); }} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-300 hover:bg-[#e6d769] hover:text-[#001e33] rounded-t-xl transition-all">
                                        <DashboardOutlined /> Panel Admin
                                    </button>
                                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wide text-red-400 hover:bg-red-500 hover:text-white rounded-b-xl transition-all">
                                        <LogoutOutlined /> Cerrar Sesión
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button onClick={() => navigate('/login')} className="ml-2 text-white/70 hover:text-[#e6d769] text-xs font-black uppercase tracking-widest transition-colors px-4 py-2 border border-transparent hover:border-[#e6d769] rounded-full">
                                LOGIN
                            </button>
                        )}
                    </nav>

                    <div className="flex md:hidden items-center gap-2 font-montserrat">
                        <button 
                            onClick={() => handleSmartScroll('planes')}
                            className="bg-gradient-to-r from-[#d4af37] via-[#f5e27a] to-[#d4af37] text-[#001e33] h-9 px-3 rounded-lg flex items-center gap-2 shadow-md active:scale-95 transition-all"
                        >
                            <ScheduleOutlined style={{ color: '#001e33' }} className="text-base flex-shrink-0" />
                            <span className="text-[10px] font-black uppercase tracking-tight hidden xs:block">Agenda</span>
                        </button>

                        <button 
                            onClick={() => setIsMenuOpen(true)} // Abre usando la prop
                            className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-[#e6d769] active:bg-[#e6d769] active:text-[#001e33] transition-all"
                        >
                            <MenuOutlined className="text-lg" />
                        </button>
                    </div>
                </div>
            </header>

            {/* MENÚ MÓVIL */}
            <div className={`fixed inset-0 z-[200] md:hidden transition-all duration-500 font-montserrat ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <div className="absolute inset-0 bg-[#000c14]/80 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
                
                <div className={`absolute top-0 right-0 w-full max-w-xs h-full bg-[#001524] border-l border-[#d4af37]/10 flex flex-col transition-transform duration-500 shadow-2xl ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                    
                    <div className="flex justify-between items-center p-4 border-b border-white/5">
                        <img src={logo} alt="Legal360" className="h-8 w-auto" />
                        <button onClick={() => setIsMenuOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white transition-all">
                            <CloseOutlined className="text-base"/>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-6">
                        
                        <button 
                            onClick={() => handleSmartScroll('planes')}
                            className="w-full py-3 px-4 bg-gradient-to-r from-[#d4af37] to-[#f5e27a] rounded-xl shadow-lg flex items-center justify-center gap-3 group active:scale-95 transition-all"
                        >
                            <ScheduleOutlined className="text-xl text-[#001e33]" /> 
                            <span className="text-[#001e33] font-black text-sm uppercase tracking-tight">Agenda tu diagnóstico</span>
                        </button>

                        {/* NUEVO DISEÑO DE ENLACES MÓVILES (Estilo Hero) */}
                        <div className="flex flex-col mt-4 gap-2">
                            {['top', 'por-que-nosotros', 'servicios'].map((item, index) => (
                                <button 
                                    key={item} 
                                    onClick={() => handleSmartScroll(item)} 
                                    className="text-left py-4 px-2 text-[1.15rem] font-bold text-gray-200 hover:text-[#e6d769] uppercase tracking-[0.15em] transition-colors border-b border-white/5 last:border-0"
                                >
                                    {['Inicio', 'Nosotros', 'Servicios'][index]}
                                </button>
                            ))}
                            <a href="https://wa.link/twbzum" target="_blank" rel="noopener noreferrer" className="text-left py-4 px-2 text-[1.15rem] font-bold text-gray-200 hover:text-[#e6d769] uppercase tracking-[0.15em] transition-colors">
                                Contacto
                            </a>
                        </div>
                    </div>

                    <div className="p-4 bg-[#000f1a] border-t border-white/5 mt-auto">
                        {usuario ? (
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3 px-2 mb-1">
                                    <div className="bg-[#e6d769] text-[#001e33] rounded-full w-8 h-8 flex items-center justify-center font-black text-sm uppercase">
                                        {usuario.nombre?.charAt(0)}
                                    </div>
                                    <p className="text-white text-sm font-bold uppercase truncate">Hola, {usuario.nombre}</p>
                                </div>
                                <button 
                                    onClick={() => { setIsMenuOpen(false); navigate('/admin'); }} 
                                    className="w-full py-3 bg-white/5 border border-white/10 hover:border-[#e6d769] text-gray-200 hover:text-[#e6d769] rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                                >
                                    <DashboardOutlined /> Panel Admin
                                </button>
                                <button 
                                    onClick={handleLogout} 
                                    className="w-full py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                                >
                                    <LogoutOutlined /> Cerrar Sesión
                                </button>
                            </div>
                        ) : (
                            <button 
                                onClick={() => { setIsMenuOpen(false); navigate('/login'); }} 
                                className="w-full py-3 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#001e33] rounded-xl font-black text-sm uppercase tracking-[0.15em] flex items-center justify-center gap-3 transition-all"
                            >
                                <UserOutlined /> LOGIN
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}   