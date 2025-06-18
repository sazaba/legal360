import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Drawer, Button, Affix, Tooltip } from 'antd';
import {
    MenuOutlined,
    CloseOutlined,
    UserOutlined,
    FileTextOutlined,
    CheckCircleOutlined,
    AppstoreOutlined,
    HomeOutlined,
    EditOutlined
} from '@ant-design/icons';

export default function NavbarUsuarioAutenticado() {
    const [collapsed, setCollapsed] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);

    const items = [
        { to: '/', label: 'Volver al Inicio', icon: <HomeOutlined /> },
        { to: '/admin/usuarios', label: 'Gestión de Usuarios', icon: <UserOutlined /> },
        { to: '/admin/diagnosticos', label: 'Consulta de Diagnósticos', icon: <FileTextOutlined /> },
        { to: '/admin/pqsfr', label: 'Consulta de PQSFR', icon: <CheckCircleOutlined /> },
        { to: '/admin/blog', label: 'Gestión de Blog', icon: <EditOutlined /> },
    ];

    const menuLinks = (
        <nav className="space-y-2 px-2">
            {items.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setDrawerVisible(false)}
                    className={({ isActive }) =>
                        `flex items-center w-full text-left px-3 py-2 rounded transition ${isActive
                            ? 'bg-blue-800 font-semibold text-white'
                            : 'hover:bg-gray-700 text-white'
                        }`
                    }
                >
                    <span className="mr-2 text-lg">{item.icon}</span>
                    {item.label}
                </NavLink>
            ))}
        </nav>
    );

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Sidebar Desktop */}
            <aside
                className={`hidden md:flex flex-col ${collapsed ? 'w-16' : 'w-64'
                    } bg-gray-800 shadow-lg transition-width duration-200 rounded-md`}
            >
                <div className="flex items-center justify-between p-4">
                    {!collapsed && <h3 className="text-xl font-bold">Opciones</h3>}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-1 hover:bg-gray-700 rounded text-white"
                    >
                        {collapsed ? <MenuOutlined /> : <CloseOutlined />}
                    </button>
                </div>
                <div className="flex-1 overflow-auto px-2">
                    {collapsed ? (
                        <div className="space-y-4 text-center text-xl">
                            {items.map((i) => (
                                <span key={i.to} title={i.label} className="block text-white">
                                    {i.icon}
                                </span>
                            ))}
                        </div>
                    ) : (
                        menuLinks
                    )}
                </div>
            </aside>

            {/* Mobile Bottom Button (only on mobile and tablet) */}
            <Affix
                className="block lg:hidden"
                style={{
                    position: 'fixed',
                    bottom: 16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 20,
                }}
            >
                <Tooltip title="Abrir menú">
                    <Button
                        type="primary"
                        shape="circle"
                        size="large"
                        icon={<AppstoreOutlined style={{ fontSize: 22 }} />}
                        onClick={() => setDrawerVisible(true)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    />
                </Tooltip>
            </Affix>

            {/* Mobile Drawer */}
            <Drawer
                placement="bottom"
                closable={false}
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
                height="60vh"
                bodyStyle={{
                    backgroundColor: '#1f2937',
                    borderTopLeftRadius: '12px',
                    borderTopRightRadius: '12px',
                    paddingTop: '16px',
                }}
                drawerStyle={{ backgroundColor: '#1f2937' }}
            >
                {menuLinks}
            </Drawer>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}
