import { useEffect, useState } from 'react';
import axios from '../api/axios';
import Swal from 'sweetalert2';
import {
    Table,
    Button,
    Row,
    Col,
    Space,
    App as AntApp,
    ConfigProvider,
    theme,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export default function DiagnosticoCrud() {
    const [diagnosticos, setDiagnosticos] = useState([]);

    const fetchDiagnosticos = async () => {
        try {
            const res = await axios.get('/api/diagnosticos');
            setDiagnosticos(res.data);
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'No se pudieron cargar los registros',
                icon: 'error',
                background: '#0f172a',
                color: '#ffffff',
            });
        }
    };

    useEffect(() => {
        fetchDiagnosticos();
    }, []);

    const handleDelete = async (registro) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            background: '#0f172a',
            color: '#ffffff',
            showCancelButton: true,
            confirmButtonColor: '#e11d48',
            cancelButtonColor: '#3b82f6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'rounded-xl shadow-lg border border-gray-700'
            }
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`/api/diagnosticos/${registro.id}`);
                await Swal.fire({
                    title: 'Eliminado',
                    text: 'El registro ha sido eliminado.',
                    icon: 'success',
                    timer: 1800,
                    showConfirmButton: false,
                    background: '#0f172a',
                    color: '#ffffff',
                });
                fetchDiagnosticos();
            } catch (error) {
                await Swal.fire({
                    title: 'Error',
                    text: 'No se pudo eliminar el registro.',
                    icon: 'error',
                    background: '#0f172a',
                    color: '#ffffff',
                });
            }
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
                <div className="mt-20 px-2 sm:px-6 xl:px-12 max-w-full text-white">
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
                </div>
            </ConfigProvider>
        </AntApp>
    );
}
