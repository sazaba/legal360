import { useEffect, useState } from 'react';
import axios from '../api/axios';
import {
    Table,
    Drawer,
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
    EyeOutlined,
    DeleteOutlined,
    DownloadOutlined,
} from '@ant-design/icons';

const API_URL = import.meta.env.VITE_API_URL;

export default function PQRSFCrud() {
    const [registros, setRegistros] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [registroAEliminar, setRegistroAEliminar] = useState(null);
    const [registroDetalle, setRegistroDetalle] = useState(null);

    const fetchRegistros = async () => {
        try {
            const res = await axios.get('/api/pqrsf');
            setRegistros(res.data);
        } catch (error) {
            message.error('Error al cargar los registros');
        }
    };

    useEffect(() => {
        fetchRegistros();
    }, []);

    const handleDelete = (registro) => {
        setRegistroAEliminar(registro);
        setModalVisible(true);
    };

    const confirmarEliminacion = async () => {
        try {
            await axios.delete(`/api/pqrsf/${registroAEliminar.id}`);
            message.success('Registro eliminado correctamente');
            fetchRegistros();
        } catch (error) {
            message.error('Error al eliminar el registro');
        } finally {
            setModalVisible(false);
            setRegistroAEliminar(null);
        }
    };

    const descargarArchivos = (archivos) => {
        archivos.forEach((archivo) => {
            const url = `${API_URL}/uploads/${archivo}`;
            window.open(url, '_blank');
        });
    };

    const mostrarDetalles = (registro) => {
        setRegistroDetalle(registro);
    };

    const cerrarDrawer = () => {
        setRegistroDetalle(null);
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Nombre', dataIndex: 'nombres', key: 'nombres' },
        { title: 'Apellido', dataIndex: 'apellidos', key: 'apellidos' },
        { title: 'Correo', dataIndex: 'correo_electronico', key: 'correo_electronico' },
        { title: 'Teléfono', dataIndex: 'telefono_principal', key: 'telefono_principal' },
        { title: 'Objeto', dataIndex: 'objeto', key: 'objeto' },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (_, record) => (
                <Space>
                    {record.archivos?.length > 0 && (
                        <Button
                            icon={<DownloadOutlined />}
                            onClick={() => descargarArchivos(record.archivos)}
                            type="link"
                        />
                    )}
                    <Button icon={<EyeOutlined />} onClick={() => mostrarDetalles(record)} />
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
                            <h2 className="text-3xl font-bold">Gestión de PQRSF</h2>
                        </Col>
                    </Row>

                    <Table
                        columns={columns}
                        dataSource={registros}
                        rowKey="id"
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: 'max-content' }}
                    />

                    <Modal
                        title="¿Estás seguro de eliminar este registro?"
                        open={modalVisible}
                        onOk={confirmarEliminacion}
                        onCancel={() => setModalVisible(false)}
                        okText="Sí, eliminar"
                        okType="danger"
                        cancelText="Cancelar"
                    >
                        <p>Esta acción no se puede deshacer.</p>
                    </Modal>

                    <Drawer
                        title="Detalles de PQRSF"
                        placement="right"
                        onClose={cerrarDrawer}
                        open={!!registroDetalle}
                        width={400}
                    >
                        {registroDetalle && (
                            <div className="space-y-2 text-sm">
                                <p><strong>Nombre:</strong> {registroDetalle.nombres} {registroDetalle.apellidos}</p>
                                <p><strong>Correo:</strong> {registroDetalle.correo_electronico}</p>
                                <p><strong>Teléfono:</strong> {registroDetalle.telefono_principal}</p>
                                <p><strong>Objeto:</strong> {registroDetalle.objeto}</p>
                                <p><strong>Descripción:</strong> {registroDetalle.descripcion}</p>
                                {registroDetalle.archivos?.length > 0 && (
                                    <div>
                                        <p className="mt-4 font-semibold">Archivos Adjuntos:</p>
                                        <ul className="list-disc list-inside text-blue-400">
                                            {registroDetalle.archivos.map((archivo, idx) => (
                                                <li key={idx}>
                                                    <a href={`${API_URL}/uploads/${archivo}`} target="_blank" rel="noopener noreferrer">
                                                        {archivo}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </Drawer>
                </div>
            </ConfigProvider>
        </AntApp>
    );
}
