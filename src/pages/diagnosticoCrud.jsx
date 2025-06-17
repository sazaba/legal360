import { useEffect, useState } from 'react';
import axios from '../api/axios';
import {
    Table,
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
import { DeleteOutlined } from '@ant-design/icons';

export default function DiagnosticoCrud() {
    const [diagnosticos, setDiagnosticos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [diagnosticoAEliminar, setDiagnosticoAEliminar] = useState(null);

    const fetchDiagnosticos = async () => {
        try {
            const res = await axios.get('/api/diagnosticos');;
            setDiagnosticos(res.data);
        } catch (error) {
            message.error('Error al cargar los registros');
        }
    };

    useEffect(() => {
        fetchDiagnosticos();
    }, []);

    const handleDelete = (registro) => {
        setDiagnosticoAEliminar(registro);
        setModalVisible(true);
    };

    const confirmarEliminacion = async () => {
        try {
            await axios.delete(`/api/diagnosticos/${diagnosticoAEliminar.id}`);
            message.success('Registro eliminado correctamente');
            fetchDiagnosticos();
        } catch (error) {
            console.error('Error al eliminar:', error);
            message.error('Error al eliminar el registro');
        } finally {
            setModalVisible(false);
            setDiagnosticoAEliminar(null);
        }
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
        { title: 'Apellido', dataIndex: 'apellido', key: 'apellido' },
        { title: 'Correo', dataIndex: 'correo_electronico', key: 'correo_electronico' },
        { title: 'Teléfono', dataIndex: 'telefono', key: 'telefono' },
        { title: 'Cargo', dataIndex: 'cargo', key: 'cargo' },
        { title: 'Empresa', dataIndex: 'tamano_empresa', key: 'tamano_empresa' },
        { title: 'Mensaje', dataIndex: 'mensaje', key: 'mensaje' },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (_, record) => (
                <Space>
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
                            <h2 className="text-3xl font-bold">Registros de Diagnóstico</h2>
                        </Col>
                    </Row>

                    <Table
                        columns={columns}
                        dataSource={diagnosticos}
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
                </div>
            </ConfigProvider>
        </AntApp>
    );
}
