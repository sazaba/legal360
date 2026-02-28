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
    ScheduleOutlined, // <--- Nuevo icono más alusivo a "Agenda/Planificar"
    UserOutlined,
    ArrowRightOutlined // Un pequeño detalle para los enlaces
} from '@ant-design/icons';
import logo from "../assets/images/logolegal.webp";
// import Relevo from "../assets/images/relevo.webp"; // Lo quité del rediseño para limpiar, si lo necesitas lo volvemos a poner.

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

    // --- (Lógica de Scroll y Auth se mantiene igual) ---
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
        // AQUI TAMBIEN FORZAMOS MONTSERRAT EN EL SWAL
        const result = await Swal.fire({
            title: '<span class="font-montserrat font-black">¿Cerrar Sesión?</span>',
            html: '<span class="font-montserrat font-medium">Tu sesión actual será finalizada.</span>',
            icon: 'question',
            background: '#0f172a',
            color: '#ffffff',
            showCancelButton: true,
            confirmButtonColor: '#d4af37',
            cancelButtonColor: '#3b82f6',
            confirmButtonText: '<span class="font-montserrat font-bold">Sí, cerrar</span>',
            cancelButtonText: '<span class="font-montserrat font-medium">Cancelar</span>',
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
                className={`fixed left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] font-montserrat
                    ${showNavbar ? "top-3 sm:top-6" : "-top-32"}
                    ${isFloating ? "w-[94%] lg:w-[88%] max-w-7xl" : "w-full sm:w-[96%] max-w-7xl"}
                `}
            >
                {/* CUERPO DEL NAVBAR (DESKTOP SE MANTIENE CASI IGUAL PERO CON EL NUEVO ICONO) */}
                <div 
                    className={`relative w-full flex items-center justify-between transition-all duration-700 px-4 sm:px-10 h-16 sm:h-20
                        ${isFloating 
                            ? "bg-[#001e33]/80 backdrop-blur-xl border border-white/10 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl" 
                            : "bg-transparent border border-transparent rounded-none"}
                    `}
                    style={isFloating ? { WebkitBackdropFilter: 'blur(20px)' } : {}}
                >
                    
                    {/* LOGO */}
                    <div onClick={() => handleSmartScroll("top")} className="flex items-center cursor-pointer select-none group h-full">
                        <img src={logo} alt="Legal360" className="h-8 sm:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
                    </div>

                    {/* MENÚ DESKTOP */}
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

                        {/* BOTÓN CTA DESKTOP (Con nuevo icono) */}
                        <button 
                            onClick={() => handleSmartScroll('planes')}
                            className="ml-2 bg-gradient-to-r from-[#d4af37] via-[#f5e27a] to-[#d4af37] text-[#001e33] px-6 py-2.5 rounded-full text-xs lg:text-sm font-black transition-all duration-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(230,215,105,0.4)] active:scale-95 flex items-center gap-2 group uppercase tracking-tight"
                        >
                            <ScheduleOutlined style={{ color: '#001e33' }} className="text-lg flex-shrink-0" />
                            <span>Agenda tu diagnóstico</span>
                        </button>

                        {/* USUARIO / LOGIN DESKTOP */}
                        {usuario ? (
                            <div className="relative ml-2" ref={dropdownRef}>
                                <button 
                                    onClick={() => setUserDropdown(!userDropdown)}
                                    className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-all"
                                >
                                    <div className="bg-[#e6d769] text-[#001e33] rounded-full w-7 h-7 flex items-center justify-center font-black text-xs uppercase">
                                        {usuario.nombre?.charAt(0)}
                                    </div>
                                    <DownOutlined className={`text-[10px] text-gray-400 transition-transform ${userDropdown ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`absolute right-0 mt-4 w-56 bg-[#001e33] border border-white/10 rounded-2xl shadow-2xl transition-all duration-300 ${userDropdown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                                    <button onClick={() => { setUserDropdown(false); navigate('/admin'); }} className="w-full flex items-center gap-3 px-5 py-4 text-sm font-bold uppercase tracking-wide text-gray-300 hover:bg-[#e6d769] hover:text-[#001e33] rounded-t-2xl transition-all">
                                        <DashboardOutlined /> Panel Admin
                                    </button>
                                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-5 py-4 text-sm font-bold uppercase tracking-wide text-red-400 hover:bg-red-500 hover:text-white rounded-b-2xl transition-all">
                                        <LogoutOutlined /> Cerrar Sesión
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button onClick={() => navigate('/login')} className="ml-2 text-white/70 hover:text-[#e6d769] text-sm font-black uppercase tracking-widest transition-colors px-4">
                                LOGIN
                            </button>
                        )}
                    </nav>

                    {/* ACCIONES MÓVIL (Header contraído) */}
                    <div className="flex md:hidden items-center gap-2 sm:gap-3 font-montserrat">
                        <button 
                            onClick={() => handleSmartScroll('planes')}
                            className="bg-gradient-to-r from-[#d4af37] via-[#f5e27a] to-[#d4af37] text-[#001e33] h-10 px-4 rounded-xl flex items-center gap-2 shadow-lg active:scale-90 transition-all"
                        >
                            <ScheduleOutlined style={{ color: '#001e33' }} className="text-lg flex-shrink-0" />
                            <span className="text-[11px] font-black uppercase tracking-tighter hidden xs:block">Agenda</span>
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

            {/* =====================================================================================
                NUEVO MENÚ MÓVIL REDISEÑADO DESDE CERO
               ===================================================================================== */}
            <div className={`fixed inset-0 z-[200] md:hidden transition-all duration-500 font-montserrat ${menuAbierto ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                {/* Backdrop oscuro */}
                <div className="absolute inset-0 bg-[#000c14]/95 backdrop-blur-md" onClick={() => setMenuAbierto(false)}></div>
                
                {/* Panel Lateral */}
                <div className={`absolute top-0 right-0 w-full sm:w-[400px] h-full bg-[#001e33] border-l border-[#d4af37]/20 flex flex-col transition-transform duration-500 ${menuAbierto ? "translate-x-0" : "translate-x-full"}`}>
                    
                    {/* 1. CABECERA DEL MENÚ */}
                    <div className="flex justify-between items-center p-6 sm:p-8 border-b border-white/5 bg-[#001524]">
                        <img src={logo} alt="Legal360" className="h-10 w-auto" />
                        <button onClick={() => setMenuAbierto(false)} className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                            <CloseOutlined className="text-xl"/>
                        </button>
                    </div>

                    {/* 2. CUERPO PRINCIPAL (Scrollable) */}
                    <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col gap-8">
                        
                        {/* TARJETA DE AGENDA PREMIUM (Nuevo diseño) */}
                        <div className="relative group cursor-pointer" onClick={() => handleSmartScroll('planes')}>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] to-[#f5e27a] rounded-2xl blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
                            <div className="relative bg-gradient-to-r from-[#d4af37] to-[#f5e27a] p-[2px] rounded-2xl">
                                <div className="bg-[#001e33] rounded-2xl p-6 flex items-center gap-5 group-hover:bg-[#00253d] transition-colors">
                                    {/* ÍCONO SCHEDULE GRANDE */}
                                    <ScheduleOutlined className="text-5xl text-[#e6d769]" />
                                    <div>
                                        <p className="text-[#e6d769] font-bold text-xs uppercase tracking-widest mb-1">Empieza ahora</p>
                                        <h3 className="text-white font-black text-2xl uppercase leading-none tracking-tight">Agenda tu<br/>Diagnóstico</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ENLACES DE NAVEGACIÓN PRINCIPAL (Tipografía MUY grande y pesada) */}
                        <div className="flex flex-col gap-4 mt-4">
                            {['top', 'por-que-nosotros', 'servicios'].map((item, index) => (
                                <button 
                                    key={item} 
                                    onClick={() => handleSmartScroll(item)} 
                                    className="group flex items-center justify-between w-full text-left p-4 rounded-xl hover:bg-white/5 transition-all"
                                >
                                    <span className="text-3xl sm:text-4xl font-black text-white/50 group-hover:text-white uppercase tracking-tight transition-colors">
                                        {['Inicio', 'Nosotros', 'Servicios'][index]}
                                    </span>
                                    <ArrowRightOutlined className="text-white/0 group-hover:text-[#e6d769] -translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-xl"/>
                                </button>
                            ))}
                            <a href="https://wa.link/twbzum" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between w-full text-left p-4 rounded-xl hover:bg-white/5 transition-all">
                                <span className="text-3xl sm:text-4xl font-black text-white/50 group-hover:text-white uppercase tracking-tight transition-colors">
                                    Contacto
                                </span>
                                <ArrowRightOutlined className="text-white/0 group-hover:text-[#e6d769] -translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-xl"/>
                            </a>
                        </div>
                    </div>

                    {/* 3. PIE DE MENÚ (Footer de Auth - Separado) */}
                    <div className="p-6 sm:p-8 bg-[#001524] border-t border-[#d4af37]/20 mt-auto">
                        {usuario ? (
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="bg-[#e6d769] text-[#001e33] rounded-full w-12 h-12 flex items-center justify-center font-black text-xl uppercase">
                                        {usuario.nombre?.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">Hola,</p>
                                        <p className="text-white text-xl font-black uppercase tracking-wide truncate">{usuario.nombre}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => { setMenuAbierto(false); navigate('/admin'); }} 
                                    className="w-full py-4 bg-white/5 border border-white/10 hover:bg-[#e6d769] hover:text-[#001e33] text-white rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all"
                                >
                                    <DashboardOutlined className="text-xl" /> Panel Admin
                                </button>
                                <button 
                                    onClick={handleLogout} 
                                    className="w-full py-4 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all"
                                >
                                    <LogoutOutlined className="text-xl" /> Cerrar Sesión
                                </button>
                            </div>
                        ) : (
                            <button 
                                onClick={() => { setMenuAbierto(false); navigate('/login'); }} 
                                className="w-full py-5 bg-white/5 border-2 border-white/10 hover:border-[#e6d769] text-white hover:text-[#e6d769] rounded-2xl font-black text-xl uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all group"
                            >
                                <UserOutlined className="text-2xl group-hover:scale-110 transition-transform" /> LOGIN
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}