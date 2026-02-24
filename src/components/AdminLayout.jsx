import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Drawer, Button, Tooltip, ConfigProvider } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    FileTextOutlined,
    CheckCircleOutlined,
    AppstoreOutlined,
    HomeOutlined,
    EditOutlined,
    LogoutOutlined
} from '@ant-design/icons';

export default function NavbarUsuarioAutenticado() {
    const [collapsed, setCollapsed] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);

    const items = [
        { to: '/', label: 'Inicio', icon: <HomeOutlined /> },
        { to: '/admin/usuarios', label: 'Gestión Usuarios', icon: <UserOutlined /> },
        { to: '/admin/diagnosticos', label: 'Diagnósticos', icon: <FileTextOutlined /> },
        { to: '/admin/pqsfr', label: 'Consultas PQSFR', icon: <CheckCircleOutlined /> },
        { to: '/admin/blog', label: 'Gestión Blog', icon: <EditOutlined /> },
    ];

    const goldColor = '#e6d769';

    // Componente de Link Estilizado
    const MenuLink = ({ item, isCollapsed, onClick }) => (
        <NavLink
            to={item.to}
            onClick={onClick}
            className={({ isActive }) => `
                relative flex items-center group px-4 py-3 rounded-xl transition-all duration-300 mb-2
                ${isActive 
                    ? 'bg-gradient-to-r from-[#e6d769]/20 to-transparent text-[#e6d769] shadow-inner' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'}
            `}
        >
            {({ isActive }) => (
                <>
                    {/* Indicador Activo Lateral */}
                    {isActive && (
                        <div className="absolute left-0 w-1 h-6 bg-[#e6d769] rounded-r-full shadow-[0_0_10px_#e6d769]" />
                    )}
                    
                    <span className={`text-xl transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                        {item.icon}
                    </span>
                    
                    {!isCollapsed && (
                        <span className="ml-4 font-medium tracking-wide text-sm whitespace-nowrap overflow-hidden">
                            {item.label}
                        </span>
                    )}
                </>
            )}
        </NavLink>
    );

    return (
        <ConfigProvider
            theme={{
                token: { colorPrimary: goldColor, borderRadius: 12 },
            }}
        >
            {/* Contenedor Principal con altura dinámica para Safari (dvh) */}
            <div className="flex h-screen h-[100dvh] bg-[#000b14] text-white overflow-hidden font-sans">
                
                {/* --- SIDEBAR DESKTOP (Glassmorphism) --- */}
                <aside
                    className={`hidden md:flex flex-col relative z-30 transition-all duration-500 ease-in-out border-r border-white/10
                        ${collapsed ? 'w-20' : 'w-72'} 
                        bg-[#001e33]/40 backdrop-blur-xl`}
                >
                    {/* Header Sidebar */}
                    <div className="flex items-center justify-between p-6 mb-4">
                        {!collapsed && (
                            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent uppercase tracking-tighter">
                                Admin Panel
                            </span>
                        )}
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-[#e6d769]"
                        >
                            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        </button>
                    </div>

                    {/* Links */}
                    <nav className="flex-1 px-4 overflow-y-auto custom-scrollbar">
                        {items.map((item) => (
                            <MenuLink key={item.to} item={item} isCollapsed={collapsed} />
                        ))}
                    </nav>

                    {/* Footer Sidebar */}
                    <div className="p-4 border-t border-white/10">
                        <button className="flex items-center w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all group">
                            <LogoutOutlined className="text-xl group-hover:rotate-12 transition-transform" />
                            {!collapsed && <span className="ml-4 font-medium">Cerrar Sesión</span>}
                        </button>
                    </div>
                </aside>

                {/* --- CONTENIDO PRINCIPAL --- */}
                <main className="relative flex-1 flex flex-col min-w-0 bg-[#001e33]/10">
                    {/* Decoración de fondo premium */}
                    <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#e6d769]/5 blur-[120px] rounded-full pointer-events-none" />
                    
                    <div className="flex-1 overflow-auto p-4 md:p-8 relative z-10 custom-scrollbar">
                        <Outlet />
                    </div>
                </main>

                {/* --- NAVEGACIÓN MOBILE (Safari Optimized) --- */}
                <div className="md:hidden fixed bottom-6 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">
                    <div className="pointer-events-auto flex items-center bg-[#001e33]/80 backdrop-blur-2xl border border-white/20 px-6 py-3 rounded-full shadow-2xl">
                        <Tooltip title="Menú">
                            <Button
                                type="text"
                                icon={<AppstoreOutlined style={{ fontSize: '24px', color: goldColor }} />}
                                onClick={() => setDrawerVisible(true)}
                                className="flex items-center justify-center hover:scale-110 transition-transform"
                            />
                        </Tooltip>
                        <div className="w-[1px] h-6 bg-white/20 mx-4" />
                        <NavLink to="/" className="text-white/70 hover:text-[#e6d769] transition-colors">
                            <HomeOutlined style={{ fontSize: '22px' }} />
                        </NavLink>
                    </div>
                </div>

                {/* Mobile Drawer Estilizado */}
                <Drawer
                    placement="bottom"
                    closable={true}
                    closeIcon={<CloseOutlined className="text-white" />}
                    onClose={() => setDrawerVisible(false)}
                    open={drawerVisible}
                    height="auto"
                    contentWrapperStyle={{ borderRadius: '24px 24px 0 0', overflow: 'hidden' }}
                    bodyStyle={{
                        backgroundColor: '#001e33',
                        padding: '24px 16px 40px 16px',
                    }}
                >
                    <div className="mb-6 text-center">
                        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4" />
                        <h2 className="text-[#e6d769] text-lg font-bold">Opciones de Gestión</h2>
                    </div>
                    <div className="space-y-1">
                        {items.map((item) => (
                            <MenuLink 
                                key={item.to} 
                                item={item} 
                                isCollapsed={false} 
                                onClick={() => setDrawerVisible(false)} 
                            />
                        ))}
                    </div>
                </Drawer>
            </div>

            {/* Estilos CSS adicionales para el scrollbar premium */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(230, 215, 105, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(230, 215, 105, 0.3);
                }
            `}</style>
        </ConfigProvider>
    );
}