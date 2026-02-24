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

    const goldColor = '#e6d769';
    const darkBlue = '#001e33';

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
            background: '#001e33',
            color: '#ffffff',
            showCancelButton: true,
            confirmButtonColor: '#d4af37',
            cancelButtonColor: '#334155',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'rounded-2xl border border-white/10 backdrop-blur-xl'
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
                <Space>
                    <Avatar 
                        style={{ backgroundColor: goldColor, color: darkBlue }} 
                        icon={<UserOutlined />} 
                    />
                    <div className="flex flex-col">
                        <span className="font-bold text-white">{record.nombre_usuario}</span>
                        <span className="text-xs text-gray-400">ID: {record.id}</span>
                    </div>
                </Space>
            ),
        },
        { 
            title: 'Correo', 
            dataIndex: 'correo', 
            key: 'correo',
            render: (text) => <span className="text-gray-300"><MailOutlined className="mr-2" />{text}</span>
        },
        { 
            title: 'Rol', 
            dataIndex: 'rol', 
            key: 'rol',
            render: (rol) => (
                <Tag color={rol === 'admin' ? '#e6d769' : '#3b82f6'} className="rounded-full uppercase px-3 font-semibold">
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
                <Tag icon={<CheckCircleOutlined />} color="success" bordered={false}>Activo</Tag> : 
                <Tag icon={<StopOutlined />} color="error" bordered={false}>Inactivo</Tag>
            ),
        },
        {
            title: 'Acciones',
            key: 'acciones',
            fixed: 'right',
            render: (_, record) => (
                <Space>
                    <Button 
                        type="text" 
                        icon={<EditOutlined style={{ color: goldColor }} />} 
                        onClick={() => handleEdit(record)}
                        className="hover:bg-white/10"
                    />
                    <Button 
                        type="text" 
                        danger 
                        icon={<DeleteOutlined />} 
                        onClick={() => handleDelete(record)}
                        className="hover:bg-red-500/10"
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
                        colorBgContainer: 'rgba(0, 30, 51, 0.4)',
                        borderRadius: 16,
                    },
                }}
            >
                <div className="min-h-full pb-20">
                    
                    {/* ENCABEZADO */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                                Gestión de <span className="text-[#e6d769]">Usuarios</span>
                            </h2>
                            <p className="text-gray-400 mt-1">Administración de accesos del sistema.</p>
                        </div>
                        <Button 
                            type="primary" 
                            size="large"
                            icon={<PlusOutlined />} 
                            onClick={openNewDrawer}
                            className="bg-[#e6d769] hover:bg-[#f1e28c] text-[#001e33] font-bold border-none"
                        >
                            Nuevo Usuario
                        </Button>
                    </div>

                    {/* VISTA DESKTOP */}
                    <div className="hidden lg:block bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
                        <Table
                            columns={columns}
                            dataSource={usuarios}
                            rowKey="id"
                            loading={loading}
                            pagination={{ pageSize: 8 }}
                            className="premium-table"
                        />
                    </div>

                    {/* VISTA MOBILE CARDS */}
                    <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
                        {usuarios.map((user) => (
                            <div key={user.id} className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl">
                                <div className="flex justify-between items-start mb-4">
                                    <Space>
                                        <Avatar style={{ backgroundColor: goldColor, color: darkBlue }} icon={<UserOutlined />} />
                                        <div>
                                            <h4 className="text-white font-bold m-0">{user.nombre_usuario}</h4>
                                            <Tag color={user.rol === 'admin' ? goldColor : '#3b82f6'} className="m-0 text-[10px] uppercase font-bold text-black">{user.rol}</Tag>
                                        </div>
                                    </Space>
                                    <div className="flex gap-1">
                                        <Button size="small" type="text" icon={<EditOutlined style={{ color: goldColor }} />} onClick={() => handleEdit(user)} />
                                        <Button size="small" type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(user)} />
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between border-b border-white/5 pb-1">
                                        <span className="text-gray-400">Correo:</span>
                                        <span className="text-gray-200">{user.correo}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Estado:</span>
                                        {user.activo ? <span className="text-green-400">Activo</span> : <span className="text-red-400">Inactivo</span>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* DRAWER */}
                    <Drawer
                        title={<span className="text-[#e6d769]">{editId ? 'Editar Perfil' : 'Nuevo Usuario'}</span>}
                        open={formVisible}
                        onClose={() => setFormVisible(false)}
                        width={window.innerWidth < 768 ? '100%' : 450}
                        bodyStyle={{ background: '#001e33', paddingTop: '20px' }}
                        headerStyle={{ background: '#001e33', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
                    >
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleFinish}
                            initialValues={{ rol: 'usuario', activo: 1 }}
                            requiredMark={false}
                        >
                            <Form.Item
                                name="nombre_usuario"
                                label={<span className="text-gray-300">Usuario</span>}
                                rules={[{ required: true, message: 'Campo obligatorio' }]}
                            >
                                <Input prefix={<UserOutlined />} className="premium-input" />
                            </Form.Item>

                            <Form.Item
                                name="correo"
                                label={<span className="text-gray-300">Correo</span>}
                                rules={[{ required: true, type: 'email', message: 'Correo inválido' }]}
                            >
                                <Input prefix={<MailOutlined />} className="premium-input" />
                            </Form.Item>

                            <Form.Item
                                name="contrasena"
                                label={<span className="text-gray-300">Contraseña</span>}
                                rules={!editId ? [{ required: true, message: 'La contraseña es obligatoria' }] : []}
                                help={editId ? "Dejar vacío para no cambiar" : ""}
                            >
                                <Input.Password className="premium-input" />
                            </Form.Item>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item name="rol" label={<span className="text-gray-300">Rol</span>}>
                                        <Select className="premium-select">
                                            <Select.Option value="admin">admin</Select.Option>
                                            <Select.Option value="usuario">usuario</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="activo" label={<span className="text-gray-300">Estado</span>}>
                                        <Select className="premium-select">
                                            <Select.Option value={1}>Activo</Select.Option>
                                            <Select.Option value={0}>Inactivo</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <div className="mt-10">
                                <Button type="primary" htmlType="submit" block size="large" className="bg-[#e6d769] hover:bg-[#f1e28c] text-[#001e33] font-bold border-none">
                                    {editId ? 'Actualizar' : 'Crear'}
                                </Button>
                            </div>
                        </Form>
                    </Drawer>
                </div>

                <style dangerouslySetInnerHTML={{ __html: `
                    .premium-table .ant-table { background: transparent !important; color: white; }
                    .premium-table .ant-table-thead > tr > th { 
                        background: rgba(255,255,255,0.05) !important; 
                        color: #e6d769 !important; 
                        border-bottom: 1px solid rgba(255,255,255,0.1) !important;
                    }
                    .premium-table .ant-table-tbody > tr > td { border-bottom: 1px solid rgba(255,255,255,0.05) !important; }
                    .premium-table .ant-table-tbody > tr:hover > td { background: rgba(255,255,255,0.02) !important; }
                    
                    .premium-input, .premium-select .ant-select-selector {
                        background: rgba(255,255,255,0.05) !important;
                        border: 1px solid rgba(255,255,255,0.1) !important;
                        color: white !important;
                        border-radius: 12px !important;
                    }
                    
                    .ant-drawer-content { background: #001e33 !important; }
                    .ant-select-dropdown { background-color: #001e33 !important; border: 1px solid rgba(255,255,255,0.1); }
                `}} />
            </ConfigProvider>
        </AntApp>
    );
}