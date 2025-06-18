import { useEffect, useState } from 'react';
import axios from '../api/axios';
import Swal from 'sweetalert2';
import {
    Table,
    Drawer,
    Button,
    Row,
    Col,
    Space,
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
    const [registroDetalle, setRegistroDetalle] = useState(null);

    const fetchRegistros = async () => {
        try {
            const res = await axios.get('/api/pqrsf');
            setRegistros(res.data);
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
        fetchRegistros();
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
                await axios.delete(`/api/pqrsf/${registro.id}`);
                await Swal.fire({
                    title: 'Eliminado',
                    text: 'El registro ha sido eliminado.',
                    icon: 'success',
                    timer: 1800,
                    showConfirmButton: false,
                    background: '#0f172a',
                    color: '#ffffff',
                });
                fetchRegistros();
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

    const descargarArchivos = async (archivos) => {
        const confirm = await Swal.fire({
            title: '¿Descargar archivos?',
            text: 'Se abrirán los archivos adjuntos en nuevas pestañas.',
            icon: 'info',
            background: '#0f172a',
            color: '#ffffff',
            showCancelButton: true,
            confirmButtonColor: '#3b82f6',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Descargar',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'rounded-xl shadow-lg border border-gray-700'
            }
        });

        if (confirm.isConfirmed) {
            archivos.forEach((archivo) => {
                const url = `${API_URL}/uploads/${archivo}`;
                window.open(url, '_blank');
            });
        }
    };

    const mostrarDetalles = async (registro) => {
        await Swal.fire({
            title: 'Mostrando detalles',
            text: 'Puedes visualizar los detalles completos a continuación.',
            icon: 'info',
            timer: 1200,
            showConfirmButton: false,
            background: '#0f172a',
            color: '#ffffff'
        });
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
                <div className="mt-20 px-2 sm:px-6 xl:px-12 max-w-full text-white">
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

                    <Drawer
                        title="Detalles de PQRSF"
                        placement="right"
                        onClose={cerrarDrawer}
                        open={!!registroDetalle}
                        width={window.innerWidth < 768 ? '100%' : 400}
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
