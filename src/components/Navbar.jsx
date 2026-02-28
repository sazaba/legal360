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
    CrownOutlined,
    UserOutlined
} from '@ant-design/icons';
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

    // 1. Lógica de Scroll Premium (Auto-hide y Transparencia)
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

    // 2. Cerrar dropdown de usuario al hacer click fuera
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
        setMenuAbierto(false);
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
            customClass: { popup: 'rounded-3xl border border-gray-700 font-montserrat' }
        });

        if (result.isConfirmed) {
            logout();
            navigate("/");
        }
    };

    const isFloating = scrolled || location.pathname !== "/";

    return (
        <>
            <header 
                className={`fixed left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
                    ${showNavbar ? "top-3 sm:top-6" : "-top-32"}
                    ${isFloating ? "w-[94%] lg:w-[88%] max-w-7xl" : "w-full sm:w-[96%] max-w-7xl"}
                `}
            >
                {/* CUERPO DEL NAVBAR */}
                <div 
                    className={`relative w-full flex items-center justify-between transition-all duration-700 px-4 sm:px-10 h-16 sm:h-20
                        ${isFloating 
                            ? "bg-[#001e33]/80 backdrop-blur-xl border border-white/10 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl" 
                            : "bg-transparent border border-transparent rounded-none"}
                    `}
                    style={isFloating ? { WebkitBackdropFilter: 'blur(20px)' } : {}}
                >
                    
                    {/* LOGO */}
                    <div 
                        onClick={() => handleSmartScroll("top")}
                        className="flex items-center cursor-pointer select-none group h-full"
                    >
                        <img
                            src={logo}
                            alt="Legal360"
                            className="h-8 sm:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>

                    {/* MENÚ DESKTOP */}
                    <nav className="hidden md:flex items-center space-x-1 lg:space-x-4 h-full">
                        {['top', 'por-que-nosotros', 'servicios'].map((item, index) => (
                            <button 
                                key={item}
                                onClick={() => handleSmartScroll(item)} 
                                className="relative text-gray-200 hover:text-[#e6d769] text-sm lg:text-base font-montserrat font-semibold transition-all duration-300 px-3 py-2 group"
                            >
                                <span className="relative z-10">{['Inicio', 'Nosotros', 'Servicios'][index]}</span>
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-[#e6d769] transition-all duration-500 group-hover:w-full rounded-full shadow-[0_0_10px_#e6d769]"></span>
                            </button>
                        ))}

                        {/* BOTÓN CTA DESKTOP */}
                        <button 
                            onClick={() => handleSmartScroll('planes')}
                            className="ml-2 bg-gradient-to-r from-[#d4af37] via-[#f5e27a] to-[#d4af37] text-[#001e33] px-6 py-2.5 rounded-full text-xs lg:text-sm font-montserrat font-black transition-all duration-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(230,215,105,0.4)] active:scale-95 flex items-center gap-2 group"
                        >
                            <CrownOutlined style={{ color: '#001e33' }} className="text-base flex-shrink-0" />
                            <span className="uppercase tracking-tighter">Agenda tu diagnóstico</span>
                        </button>

                        {/* USUARIO / LOGIN DESKTOP */}
                        {usuario ? (
                            <div className="relative ml-2" ref={dropdownRef}>
                                <button 
                                    onClick={() => setUserDropdown(!userDropdown)}
                                    className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-all font-montserrat"
                                >
                                    <div className="bg-[#e6d769] text-[#001e33] rounded-full w-7 h-7 flex items-center justify-center font-black text-xs uppercase">
                                        {usuario.nombre?.charAt(0)}
                                    </div>
                                    <DownOutlined className={`text-[10px] text-gray-400 transition-transform ${userDropdown ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`absolute right-0 mt-4 w-56 bg-[#001e33] border border-white/10 rounded-2xl shadow-2xl transition-all duration-300 ${userDropdown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                                    <button onClick={() => { setUserDropdown(false); navigate('/admin'); }} className="w-full flex items-center gap-3 px-5 py-4 text-sm font-montserrat font-semibold text-gray-300 hover:bg-[#e6d769] hover:text-[#001e33] rounded-t-2xl transition-all">
                                        <DashboardOutlined /> Panel Admin
                                    </button>
                                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-5 py-4 text-sm font-montserrat font-semibold text-red-400 hover:bg-red-500 hover:text-white rounded-b-2xl transition-all">
                                        <LogoutOutlined /> Cerrar Sesión
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button onClick={() => navigate('/login')} className="ml-2 text-white/70 hover:text-[#e6d769] text-sm font-montserrat font-semibold uppercase tracking-wide transition-colors px-4">
                                LOGIN
                            </button>
                        )}
                    </nav>

                    {/* ACCIONES MÓVIL */}
                    <div className="flex md:hidden items-center gap-2 sm:gap-3">
                        <button 
                            onClick={() => handleSmartScroll('planes')}
                            className="bg-gradient-to-r from-[#d4af37] via-[#f5e27a] to-[#d4af37] text-[#001e33] h-10 px-4 rounded-xl flex items-center gap-2 shadow-lg active:scale-90 transition-all"
                        >
                            <CrownOutlined style={{ color: '#001e33' }} className="text-lg flex-shrink-0" />
                            <span className="text-[10px] font-black font-montserrat uppercase hidden xs:block">Agenda</span>
                        </button>

                        <button 
                            onClick={() => setMenuAbierto(true)} 
                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-[#e6d769] active:bg-[#e6d769] active:text-[#001e33] transition-all"
                        >
                            <MenuOutlined className="text-xl" />
                        </button>
                    </div>
                </div>
            </header>

            {/* MENÚ MÓVIL FULL SCREEN */}
            <div className={`fixed inset-0 z-[200] md:hidden transition-all duration-500 ${menuAbierto ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <div className="absolute inset-0 bg-[#001e33]/95 backdrop-blur-xl" onClick={() => setMenuAbierto(false)}></div>
                
                <div className={`absolute top-0 right-0 w-[85%] h-full bg-[#031525] border-l border-white/10 flex flex-col transition-transform duration-500 ${menuAbierto ? "translate-x-0" : "translate-x-full"}`}>
                    
                    <div className="flex justify-between items-center p-6 border-b border-white/5">
                        <img src={logo} alt="Legal360" className="h-8 w-auto" />
                        <button onClick={() => setMenuAbierto(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-gray-400">
                            <CloseOutlined />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                        <button 
                            onClick={() => handleSmartScroll('planes')}
                            className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#f5e27a] text-[#001e33] rounded-2xl font-black font-montserrat text-base shadow-xl flex items-center justify-center gap-3"
                        >
                            <CrownOutlined style={{ color: '#001e33' }} className="text-xl flex-shrink-0" /> AGENDA TU DIAGNÓSTICO
                        </button>

                        <div className="space-y-2">
                            {['top', 'por-que-nosotros', 'servicios'].map((item, index) => (
                                <button 
                                    key={item} 
                                    onClick={() => handleSmartScroll(item)} 
                                    className="w-full text-left py-4 text-2xl font-montserrat font-black text-gray-400 hover:text-[#e6d769] border-b border-white/5 uppercase"
                                >
                                    {['Inicio', 'Nosotros', 'Servicios'][index]}
                                </button>
                            ))}
                            <a href="https://wa.link/twbzum" target="_blank" rel="noopener noreferrer" className="block w-full text-left py-4 text-2xl font-montserrat font-black text-gray-400 border-b border-white/5 uppercase">
                                Contacto
                            </a>

                            {/* --- SECCIÓN ADMINISTRATIVA / LOGIN MÓVIL --- */}
                            {usuario ? (
                                <>
                                    <button 
                                        onClick={() => { setMenuAbierto(false); navigate('/admin'); }} 
                                        className="w-full flex items-center gap-3 text-left py-4 text-2xl font-montserrat font-black text-[#e6d769] border-b border-white/5 uppercase transition-colors"
                                    >
                                        <DashboardOutlined /> Panel Admin
                                    </button>
                                    <button 
                                        onClick={handleLogout} 
                                        className="w-full flex items-center gap-3 text-left py-4 text-2xl font-montserrat font-black text-red-400 border-b border-white/5 uppercase transition-colors"
                                    >
                                        <LogoutOutlined /> Cerrar Sesión
                                    </button>
                                </>
                            ) : (
                                <button 
                                    onClick={() => { setMenuAbierto(false); navigate('/login'); }} 
                                    className="w-full flex items-center gap-3 text-left py-4 text-2xl font-montserrat font-black text-white/70 hover:text-[#e6d769] border-b border-white/5 uppercase transition-colors"
                                >
                                    <UserOutlined /> Login
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="p-8 border-t border-white/5 flex justify-center bg-black/20">
                        <img src={Relevo} alt="Centro de Relevo" className="w-16 opacity-50" />
                    </div>
                </div>
            </div>
        </>
    );
}