import { useEffect, useState } from 'react';
import axios from '../api/axios';
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
    Modal,
    App as AntApp,
    ConfigProvider,
    theme,
} from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';

export default function UserCrudForm() {
    const [usuarios, setUsuarios] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [form] = Form.useForm();
    const [editId, setEditId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);

    const fetchUsuarios = async () => {
        try {
            const res = await axios.get('/api/usuarios');
            setUsuarios(res.data);
        } catch (error) {
            message.error('Error al cargar los usuarios');
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

    const handleDelete = (usuario) => {
        setUsuarioAEliminar(usuario);
        setModalVisible(true);
    };

    const confirmarEliminacion = async () => {
        try {
            await axios.delete(`/api/usuarios/${usuarioAEliminar.id}`);
            message.success('Usuario eliminado correctamente');
            fetchUsuarios();
        } catch (error) {
            console.error('Error al eliminar:', error);
            message.error('Error al eliminar el usuario');
        } finally {
            setModalVisible(false);
            setUsuarioAEliminar(null);
        }
    };

    const handleFinish = async (values) => {
        try {
            if (editId) {
                await axios.put(`/api/usuarios/${editId}`, values);
                message.success('Usuario actualizado correctamente');
            } else {
                await axios.post('/api/usuarios', values);
                message.success('Usuario creado correctamente');
            }
            fetchUsuarios();
            setFormVisible(false);
            form.resetFields();
            setEditId(null);
        } catch (error) {
            if (error.response?.data?.message) {
                message.error(error.response.data.message);
            } else {
                message.error('Error al guardar el usuario');
            }
        }
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Usuario', dataIndex: 'nombre_usuario', key: 'nombre_usuario' },
        { title: 'Correo', dataIndex: 'correo', key: 'correo' },
        { title: 'Rol', dataIndex: 'rol', key: 'rol' },
        {
            title: 'Activo',
            dataIndex: 'activo',
            key: 'activo',
            render: (value) => (value ? 'Sí' : 'No'),
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (_, record) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record)} />
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
                        colorPrimary: '#1f2937',
                        colorBgContainer: '#1f2937',
                        colorText: '#ffffff',
                        controlItemBgActive: '#374151',
                        controlItemBgHover: '#4b5563',
                    },
                }}
            >
                <div className="p-6 mt-20 max-w-6xl mx-auto text-white">
                    <Row justify="space-between" align="middle" className="mb-6">
                        <Col>
                            <h2 className="text-3xl font-bold">Gestión de Usuarios</h2>
                        </Col>
                        <Col>
                            <Button type="primary" icon={<PlusOutlined />} onClick={openNewDrawer}>
                                Nuevo
                            </Button>
                        </Col>
                    </Row>

                    <Table
                        columns={columns}
                        dataSource={usuarios}
                        rowKey="id"
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: 'max-content' }}
                    />

                    <Drawer
                        title={editId ? 'Editar Usuario' : 'Nuevo Usuario'}
                        open={formVisible}
                        onClose={() => setFormVisible(false)}
                        width={window.innerWidth < 768 ? '100%' : 600}
                        bodyStyle={{ background: '#111827', height: '100%', overflowY: 'auto' }}
                        headerStyle={{ background: '#1f2937', color: '#fff' }}
                    >
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleFinish}
                            initialValues={{ rol: 'usuario', activo: 1 }}
                        >
                            <Form.Item
                                name="nombre_usuario"
                                label={<span className="text-gray-200">Nombre de Usuario</span>}
                                rules={[{ required: true, message: 'Campo requerido' }]}
                            >
                                <Input className="bg-gray-800 text-white" />
                            </Form.Item>

                            <Form.Item
                                name="correo"
                                label={<span className="text-gray-200">Correo Electrónico</span>}
                                rules={[{ required: true, type: 'email', message: 'Correo válido requerido' }]}
                            >
                                <Input className="bg-gray-800 text-white" />
                            </Form.Item>

                            <Form.Item
                                name="contrasena"
                                label={<span className="text-gray-200">Contraseña</span>}
                                rules={!editId ? [{ required: true, message: 'Campo requerido' }] : []}
                            >
                                <Input.Password className="bg-gray-800 text-white" />
                            </Form.Item>

                            <Form.Item name="rol" label={<span className="text-gray-200">Rol</span>}>
                                <Select className="bg-gray-800 text-white">
                                    <Select.Option value="admin">Admin</Select.Option>
                                    <Select.Option value="usuario">Usuario</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item name="activo" label={<span className="text-gray-200">Activo</span>}>
                                <Select className="bg-gray-800 text-white">
                                    <Select.Option value={1}>Activo</Select.Option>
                                    <Select.Option value={0}>Inactivo</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    {editId ? 'Actualizar Usuario' : 'Crear Usuario'}
                                </Button>
                            </Form.Item>
                        </Form>
                    </Drawer>

                    <Modal
                        title="¿Estás seguro de eliminar este usuario?"
                        open={modalVisible}
                        onOk={confirmarEliminacion}
                        onCancel={() => setModalVisible(false)}
                        okText="Sí, eliminar"
                        okType="danger"
                        cancelText="Cancelar"
                    >
                        <p>Esta acción no se puede deshacer.</p>
                    </Modal>
                </div>
            </ConfigProvider>
        </AntApp>
    );
}
