import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import Swal from 'sweetalert2';
import {
    Table,
    Drawer,
    Form,
    Input,
    Select,
    Button,
    Row,
    Col,
    Space,
    message,
    App as AntApp,
    ConfigProvider,
    theme,
    Tag,
    Avatar
} from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    UserOutlined,
    MailOutlined,
    CheckCircleOutlined,
    StopOutlined
} from '@ant-design/icons';

export default function UserCrudForm() {
    const [usuarios, setUsuarios] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [form] = Form.useForm();
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);

    // Paleta Premium
    const goldColor = '#e6d769';
    const darkBlue = '#001e33';
    const darkBg = '#05111a'; // Un fondo ligeramente más profundo para contraste

    const fetchUsuarios = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/api/usuarios');
            setUsuarios(res.data);
        } catch (error) {
            message.error('Error al cargar los usuarios');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const openNewDrawer = () => {
        form.resetFields();
        setEditId(null);
        setFormVisible(true);
    };

    const handleEdit = (usuario) => {
        form.setFieldsValue({ ...usuario });
        setEditId(usuario.id);
        setFormVisible(true);
    };

    const handleDelete = async (usuario) => {
        const result = await Swal.fire({
            title: '¿Eliminar usuario?',
            text: `Estás a punto de eliminar a ${usuario.nombre_usuario}`,
            icon: 'warning',
            background: '#0a1929',
            color: '#ffffff',
            showCancelButton: true,
            confirmButtonColor: goldColor,
            cancelButtonColor: 'rgba(255,255,255,0.1)',
            confirmButtonText: '<span style="color:#001e33; font-weight:600;">Sí, eliminar</span>',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'premium-swal-popup'
            }
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`/api/usuarios/${usuario.id}`);
                message.success('Usuario eliminado');
                fetchUsuarios();
            } catch (error) {
                message.error('No se pudo eliminar el usuario');
            }
        }
    };

    const handleFinish = async (values) => {
        try {
            if (editId) {
                await axios.put(`/api/usuarios/${editId}`, values);
                message.success('Usuario actualizado');
            } else {
                await axios.post('/api/usuarios', values);
                message.success('Usuario creado');
            }
            fetchUsuarios();
            setFormVisible(false);
        } catch (error) {
            message.error(error.response?.data?.message || 'Error al guardar');
        }
    };

    const columns = [
        {
            title: 'Usuario',
            key: 'user',
            render: (_, record) => (
                <Space size="middle">
                    <Avatar 
                        size="large"
                        style={{ backgroundColor: 'rgba(230, 215, 105, 0.1)', color: goldColor, border: `1px solid ${goldColor}` }} 
                        icon={<UserOutlined />} 
                    />
                    <div className="flex flex-col">
                        <span className="font-semibold text-gray-100 text-base">{record.nombre_usuario}</span>
                        <span className="text-xs text-gray-500 font-medium tracking-wider">ID: {record.id}</span>
                    </div>
                </Space>
            ),
        },
        { 
            title: 'Correo', 
            dataIndex: 'correo', 
            key: 'correo',
            render: (text) => <span className="text-gray-400 font-light"><MailOutlined className="mr-2 text-gray-500" />{text}</span>
        },
        { 
            title: 'Rol', 
            dataIndex: 'rol', 
            key: 'rol',
            render: (rol) => (
                <Tag 
                    color={rol === 'admin' ? 'gold' : 'blue'} 
                    className="rounded-full uppercase px-4 py-1 text-[10px] font-bold tracking-widest border-none"
                    style={{ background: rol === 'admin' ? 'rgba(230, 215, 105, 0.15)' : 'rgba(59, 130, 246, 0.15)', color: rol === 'admin' ? goldColor : '#60a5fa' }}
                >
                    {rol}
                </Tag>
            )
        },
        {
            title: 'Estado',
            dataIndex: 'activo',
            key: 'activo',
            render: (activo) => (
                activo ? 
                <Tag icon={<CheckCircleOutlined />} className="bg-transparent border border-green-500/30 text-green-400 rounded-full px-3 py-1">Activo</Tag> : 
                <Tag icon={<StopOutlined />} className="bg-transparent border border-red-500/30 text-red-400 rounded-full px-3 py-1">Inactivo</Tag>
            ),
        },
        {
            title: '', // Dejamos el título vacío para un look más limpio
            key: 'acciones',
            fixed: 'right',
            align: 'right',
            render: (_, record) => (
                <Space size="small">
                    <Button 
                        type="text" 
                        icon={<EditOutlined />} 
                        onClick={() => handleEdit(record)}
                        className="text-[#e6d769] hover:bg-[#e6d769]/10 hover:text-[#e6d769] transition-all rounded-lg"
                    />
                    <Button 
                        type="text" 
                        danger 
                        icon={<DeleteOutlined />} 
                        onClick={() => handleDelete(record)}
                        className="hover:bg-red-500/10 transition-all rounded-lg"
                    />
                </Space>
            ),
        },
    ];

    return (
        <AntApp>
            <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm,
                    token: {
                        colorPrimary: goldColor,
                        colorBgContainer: 'rgba(5, 17, 26, 0.6)',
                        borderRadius: 12,
                        fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                    },
                }}
            >
                <div className="min-h-full pb-20 premium-font" style={{ backgroundColor: darkBg }}>
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                        {/* ENCABEZADO */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight m-0">
                                    Gestión de <span style={{ color: goldColor }}>Usuarios</span>
                                </h2>
                                <p className="text-gray-400 mt-2 font-light text-sm">Administración de accesos y roles del sistema.</p>
                            </div>
                            <Button 
                                type="primary" 
                                size="large"
                                icon={<PlusOutlined />} 
                                onClick={openNewDrawer}
                                className="premium-btn-gold"
                            >
                                Nuevo Usuario
                            </Button>
                        </div>

                        {/* VISTA DESKTOP */}
                        <div className="hidden lg:block glass-panel rounded-2xl overflow-hidden shadow-2xl">
                            <Table
                                columns={columns}
                                dataSource={usuarios}
                                rowKey="id"
                                loading={loading}
                                pagination={{ 
                                    pageSize: 8,
                                    position: ['bottomCenter'],
                                    className: 'premium-pagination' 
                                }}
                                className="premium-table"
                            />
                        </div>

                        {/* VISTA MOBILE CARDS */}
                        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-5">
                            {usuarios.map((user) => (
                                <div key={user.id} className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
                                    {/* Decoración sutil de fondo */}
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#e6d769] opacity-[0.03] rounded-bl-full pointer-events-none"></div>
                                    
                                    <div className="flex justify-between items-start mb-5 relative z-10">
                                        <Space size="middle">
                                            <Avatar size="large" style={{ backgroundColor: 'rgba(230, 215, 105, 0.1)', color: goldColor, border: `1px solid rgba(230, 215, 105, 0.3)` }} icon={<UserOutlined />} />
                                            <div>
                                                <h4 className="text-gray-100 font-semibold text-lg m-0">{user.nombre_usuario}</h4>
                                                <span className="text-[10px] text-gray-500 uppercase tracking-widest">{user.rol}</span>
                                            </div>
                                        </Space>
                                        <div className="flex gap-1 bg-black/20 rounded-lg p-1">
                                            <Button size="small" type="text" icon={<EditOutlined className="text-[#e6d769]" />} onClick={() => handleEdit(user)} />
                                            <Button size="small" type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(user)} />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3 text-sm relative z-10">
                                        <div className="flex justify-between items-center bg-white/[0.02] p-3 rounded-lg border border-white/[0.02]">
                                            <span className="text-gray-500 font-light"><MailOutlined className="mr-2"/>Correo</span>
                                            <span className="text-gray-300 font-medium truncate ml-2">{user.correo}</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-white/[0.02] p-3 rounded-lg border border-white/[0.02]">
                                            <span className="text-gray-500 font-light">Estado</span>
                                            {user.activo ? 
                                                <span className="text-green-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span>Activo</span> : 
                                                <span className="text-red-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span>Inactivo</span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* DRAWER */}
                    <Drawer
                        title={<span className="text-lg font-semibold tracking-wide" style={{ color: goldColor }}>{editId ? 'Editar Perfil' : 'Nuevo Usuario'}</span>}
                        open={formVisible}
                        onClose={() => setFormVisible(false)}
                        width={window.innerWidth < 768 ? '100%' : 480}
                        bodyStyle={{ background: '#0a1929', padding: '24px' }}
                        headerStyle={{ background: '#0a1929', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                        closeIcon={<span className="text-gray-400 hover:text-white transition-colors">✕</span>}
                    >
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleFinish}
                            initialValues={{ rol: 'usuario', activo: 1 }}
                            requiredMark={false}
                            className="premium-form"
                        >
                            <Form.Item
                                name="nombre_usuario"
                                label={<span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Usuario</span>}
                                rules={[{ required: true, message: 'Campo obligatorio' }]}
                            >
                                <Input size="large" prefix={<UserOutlined className="text-gray-500 mr-2" />} className="premium-input" placeholder="Ej. jperez" />
                            </Form.Item>

                            <Form.Item
                                name="correo"
                                label={<span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Correo Electrónico</span>}
                                rules={[{ required: true, type: 'email', message: 'Correo inválido' }]}
                            >
                                <Input size="large" prefix={<MailOutlined className="text-gray-500 mr-2" />} className="premium-input" placeholder="correo@legal360.co" />
                            </Form.Item>

                            <Form.Item
                                name="contrasena"
                                label={<span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Contraseña</span>}
                                rules={!editId ? [{ required: true, message: 'La contraseña es obligatoria' }] : []}
                                help={editId ? <span className="text-gray-500 text-xs italic">Dejar vacío para mantener la actual</span> : ""}
                            >
                                <Input.Password size="large" className="premium-input" placeholder="••••••••" />
                            </Form.Item>

                            <Row gutter={24} className="mt-4">
                                <Col span={12}>
                                    <Form.Item name="rol" label={<span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Rol</span>}>
                                        <Select size="large" popupClassName="premium-select-dropdown" className="premium-select">
                                            <Select.Option value="admin">Administrador</Select.Option>
                                            <Select.Option value="usuario">Usuario Estándar</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="activo" label={<span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Estado</span>}>
                                        <Select size="large" popupClassName="premium-select-dropdown" className="premium-select">
                                            <Select.Option value={1}>Activo</Select.Option>
                                            <Select.Option value={0}>Inactivo</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <div className="mt-12">
                                <Button type="primary" htmlType="submit" block size="large" className="premium-btn-gold">
                                    {editId ? 'Guardar Cambios' : 'Crear Usuario'}
                                </Button>
                            </div>
                        </Form>
                    </Drawer>
                </div>

                <style dangerouslySetInnerHTML={{ __html: `
                    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

                    .premium-font {
                        font-family: 'Montserrat', sans-serif;
                    }

                    /* Efecto Glassmorphism compatible con Safari */
                    .glass-panel {
                        background: rgba(255, 255, 255, 0.02);
                        backdrop-filter: blur(12px);
                        -webkit-backdrop-filter: blur(12px);
                        border: 1px solid rgba(255, 255, 255, 0.05);
                    }

                    /* Botón Dorado Premium */
                    .premium-btn-gold {
                        background: linear-gradient(135deg, #e6d769 0%, #d4af37 100%) !important;
                        color: #001e33 !important;
                        font-weight: 600 !important;
                        border: none !important;
                        box-shadow: 0 4px 15px rgba(230, 215, 105, 0.2) !important;
                        transition: all 0.3s ease !important;
                    }
                    .premium-btn-gold:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 20px rgba(230, 215, 105, 0.3) !important;
                        filter: brightness(1.1);
                    }

                    /* Tabla Premium */
                    .premium-table .ant-table { 
                        background: transparent !important; 
                        color: #f3f4f6; 
                    }
                    .premium-table .ant-table-thead > tr > th { 
                        background: rgba(0, 0, 0, 0.2) !important; 
                        color: #9ca3af !important; 
                        font-weight: 500;
                        text-transform: uppercase;
                        font-size: 11px;
                        letter-spacing: 0.05em;
                        border-bottom: 1px solid rgba(255,255,255,0.05) !important;
                    }
                    .premium-table .ant-table-thead > tr > th::before {
                        display: none !important; /* Quita los divisores de columnas de antd */
                    }
                    .premium-table .ant-table-tbody > tr > td { 
                        border-bottom: 1px solid rgba(255,255,255,0.03) !important; 
                        padding: 20px 16px !important;
                    }
                    .premium-table .ant-table-tbody > tr:hover > td { 
                        background: rgba(230, 215, 105, 0.03) !important; 
                    }

                    /* Paginación */
                    .premium-pagination .ant-pagination-item a { color: #9ca3af; }
                    .premium-pagination .ant-pagination-item-active { background: transparent; border-color: #e6d769; }
                    .premium-pagination .ant-pagination-item-active a { color: #e6d769; }

                    /* Inputs y Selects */
                    .premium-input, .premium-select .ant-select-selector {
                        background: rgba(0, 0, 0, 0.2) !important;
                        border: 1px solid rgba(255,255,255,0.08) !important;
                        color: white !important;
                        border-radius: 8px !important;
                        transition: all 0.3s ease !important;
                    }
                    .premium-input:focus, .premium-input:hover, 
                    .premium-select:hover .ant-select-selector, 
                    .premium-select-focused .ant-select-selector {
                        border-color: #e6d769 !important;
                        background: rgba(0, 0, 0, 0.4) !important;
                        box-shadow: 0 0 0 2px rgba(230, 215, 105, 0.1) !important;
                    }

                    /* Dropdowns y Modales */
                    .premium-select-dropdown { 
                        background-color: #0a1929 !important; 
                        border: 1px solid rgba(255,255,255,0.1); 
                        border-radius: 8px;
                        padding: 4px;
                    }
                    .ant-select-item-option-content { color: #e5e7eb !important; }
                    .ant-select-item-option-active { background-color: rgba(255,255,255,0.05) !important; border-radius: 6px; }
                    .ant-select-item-option-selected { background-color: rgba(230, 215, 105, 0.1) !important; color: #e6d769 !important; font-weight: 600; border-radius: 6px; }

                    /* SweetAlert2 Premium */
                    .premium-swal-popup {
                        border: 1px solid rgba(255,255,255,0.05) !important;
                        border-radius: 16px !important;
                        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
                    }
                `}} />
            </ConfigProvider>
        </AntApp>
    );
}