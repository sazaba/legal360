import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import Swal from 'sweetalert2';
import {
    Table,
    Button,
    Space,
    App as AntApp,
    ConfigProvider,
    theme,
    Avatar,
    Spin,
    Tag,
    Tooltip
} from 'antd';
import { 
    DeleteOutlined, 
    UserOutlined, 
    MailOutlined, 
    PhoneOutlined,
    BankOutlined,
    LoadingOutlined,
    MessageOutlined
} from '@ant-design/icons';

export default function DiagnosticoCrud() {
    const [diagnosticos, setDiagnosticos] = useState([]);
    const [loading, setLoading] = useState(false);

    // Paleta Premium
    const goldColor = '#e6d769';

    const fetchDiagnosticos = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/api/diagnosticos');
            setDiagnosticos(res.data);
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'No se pudieron cargar los registros',
                icon: 'error',
                background: '#0a1929',
                color: '#ffffff',
                confirmButtonColor: goldColor,
                customClass: { popup: 'premium-swal-popup' }
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDiagnosticos();
    }, []);

    const handleDelete = async (registro) => {
        const result = await Swal.fire({
            title: '¿Eliminar registro?',
            text: `Se eliminará el diagnóstico de ${registro.nombre} ${registro.apellido}. Esta acción no se puede deshacer.`,
            icon: 'warning',
            background: '#0a1929',
            color: '#ffffff',
            showCancelButton: true,
            confirmButtonColor: '#e11d48', // Mantenemos el rojo para la acción destructiva
            cancelButtonColor: 'rgba(255,255,255,0.1)',
            confirmButtonText: '<span style="color:#ffffff; font-weight:600;">Sí, eliminar</span>',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'premium-swal-popup'
            }
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`/api/diagnosticos/${registro.id}`);
                await Swal.fire({
                    title: 'Eliminado',
                    text: 'El registro ha sido eliminado exitosamente.',
                    icon: 'success',
                    timer: 1800,
                    showConfirmButton: false,
                    background: '#0a1929',
                    color: '#ffffff',
                    customClass: { popup: 'premium-swal-popup' }
                });
                fetchDiagnosticos();
            } catch (error) {
                await Swal.fire({
                    title: 'Error',
                    text: 'No se pudo eliminar el registro.',
                    icon: 'error',
                    background: '#0a1929',
                    color: '#ffffff',
                    confirmButtonColor: goldColor,
                    customClass: { popup: 'premium-swal-popup' }
                });
            }
        }
    };

    // Icono de carga personalizado
    const antIcon = <LoadingOutlined style={{ fontSize: 24, color: goldColor }} spin />;

    const columns = [
        {
            title: 'Contacto',
            key: 'contacto',
            render: (_, record) => (
                <Space size="middle">
                    <Avatar 
                        size="large"
                        style={{ backgroundColor: 'rgba(230, 215, 105, 0.1)', color: goldColor, border: `1px solid ${goldColor}` }} 
                        icon={<UserOutlined />} 
                    />
                    <div className="flex flex-col">
                        <span className="font-semibold text-gray-100 text-base">{record.nombre} {record.apellido}</span>
                        <span className="text-xs text-gray-500 font-medium tracking-wider">ID: {record.id}</span>
                    </div>
                </Space>
            ),
        },
        { 
            title: 'Datos de Contacto', 
            key: 'datos_contacto',
            render: (_, record) => (
                <div className="flex flex-col space-y-1">
                    <span className="text-gray-300 font-light text-sm"><MailOutlined className="mr-2 text-gray-500" />{record.correo_electronico}</span>
                    <span className="text-gray-400 font-light text-sm"><PhoneOutlined className="mr-2 text-gray-500" />{record.telefono}</span>
                </div>
            )
        },
        { 
            title: 'Empresa', 
            key: 'empresa_info',
            render: (_, record) => (
                <div className="flex flex-col space-y-1 items-start">
                    <span className="text-gray-200 font-medium"><BankOutlined className="mr-2 text-[#e6d769]" />{record.tamano_empresa}</span>
                    <Tag className="m-0 rounded-full uppercase px-3 py-0.5 text-[10px] font-bold tracking-widest bg-white/5 border-white/10 text-gray-400">
                        {record.cargo}
                    </Tag>
                </div>
            )
        },
        { 
            title: 'Mensaje', 
            dataIndex: 'mensaje', 
            key: 'mensaje',
            width: '25%',
            render: (text) => (
                <Tooltip title={text} color="#0a1929" overlayClassName="premium-font text-xs">
                    <div className="text-gray-400 font-light italic truncate max-w-[200px] xl:max-w-[300px]">
                        "{text}"
                    </div>
                </Tooltip>
            )
        },
        {
            title: '',
            key: 'acciones',
            fixed: 'right',
            align: 'right',
            render: (_, record) => (
                <Button 
                    type="text" 
                    danger 
                    icon={<DeleteOutlined />} 
                    onClick={() => handleDelete(record)}
                    className="hover:bg-red-500/10 transition-all rounded-lg"
                />
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
                        colorBgContainer: 'rgba(5, 17, 26, 0.4)',
                        borderRadius: 12,
                        fontFamily: "'Montserrat', sans-serif",
                    },
                }}
            >
                <div className="min-h-full pb-20 premium-font">
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-10">
                        {/* ENCABEZADO */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight m-0">
                                    Registros de <span style={{ color: goldColor }}>Diagnóstico</span>
                                </h2>
                                <p className="text-gray-400 mt-2 font-light text-sm">Consultas y solicitudes de prospectos.</p>
                            </div>
                        </div>

                        {/* VISTA DESKTOP CON ANIMACIÓN */}
                        <div className="hidden lg:block glass-panel rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up">
                            <Table
                                columns={columns}
                                dataSource={diagnosticos}
                                rowKey="id"
                                loading={{ indicator: antIcon, spinning: loading }}
                                pagination={{ 
                                    pageSize: 10,
                                    position: ['bottomCenter'],
                                    className: 'premium-pagination' 
                                }}
                                className="premium-table"
                            />
                        </div>

                        {/* VISTA MOBILE CARDS CON ANIMACIÓN Y LOADING */}
                        <div className="lg:hidden">
                            {loading ? (
                                <div className="flex justify-center items-center h-64">
                                     <Spin indicator={antIcon} />
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in-up">
                                    {diagnosticos.map((record) => (
                                        <div key={record.id} className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#e6d769] opacity-[0.03] rounded-bl-full pointer-events-none"></div>
                                            
                                            <div className="flex justify-between items-start mb-5 relative z-10">
                                                <Space size="middle">
                                                    <Avatar size="large" style={{ backgroundColor: 'rgba(230, 215, 105, 0.1)', color: goldColor, border: `1px solid rgba(230, 215, 105, 0.3)` }} icon={<UserOutlined />} />
                                                    <div>
                                                        <h4 className="text-gray-100 font-semibold text-lg m-0">{record.nombre} {record.apellido}</h4>
                                                        <span className="text-[10px] text-gray-500 uppercase tracking-widest">{record.cargo}</span>
                                                    </div>
                                                </Space>
                                                <div className="flex gap-1 bg-black/20 rounded-lg p-1">
                                                    <Button size="small" type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record)} />
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-3 text-sm relative z-10">
                                                <div className="flex justify-between items-center bg-white/[0.02] p-3 rounded-lg border border-white/[0.02]">
                                                    <span className="text-gray-500 font-light"><MailOutlined className="mr-2"/>Correo</span>
                                                    <span className="text-gray-300 font-medium truncate ml-2">{record.correo_electronico}</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-white/[0.02] p-3 rounded-lg border border-white/[0.02]">
                                                    <span className="text-gray-500 font-light"><PhoneOutlined className="mr-2"/>Teléfono</span>
                                                    <span className="text-gray-300 font-medium ml-2">{record.telefono}</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-white/[0.02] p-3 rounded-lg border border-white/[0.02]">
                                                    <span className="text-gray-500 font-light"><BankOutlined className="mr-2"/>Empresa</span>
                                                    <span className="text-gray-300 font-medium ml-2 truncate max-w-[150px] text-right">{record.tamano_empresa}</span>
                                                </div>
                                                
                                                {record.mensaje && (
                                                    <div className="mt-4 pt-3 border-t border-white/[0.05]">
                                                        <span className="text-gray-500 font-light block mb-1"><MessageOutlined className="mr-2"/>Mensaje:</span>
                                                        <p className="text-gray-400 text-xs italic bg-black/20 p-3 rounded-lg m-0">
                                                            "{record.mensaje}"
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <style dangerouslySetInnerHTML={{ __html: `
                    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

                    .premium-font {
                        font-family: 'Montserrat', sans-serif;
                    }

                    /* --- ANIMACIONES CSS PURAS --- */
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    .animate-fade-in-up {
                        animation: fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                    }

                    /* Efecto Glassmorphism compatible con Safari */
                    .glass-panel {
                        background: rgba(255, 255, 255, 0.02);
                        backdrop-filter: blur(12px);
                        -webkit-backdrop-filter: blur(12px);
                        border: 1px solid rgba(255, 255, 255, 0.05);
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
                        display: none !important;
                    }
                    .premium-table .ant-table-tbody > tr > td { 
                        border-bottom: 1px solid rgba(255,255,255,0.03) !important; 
                        padding: 20px 16px !important;
                    }
                    .premium-table .ant-table-tbody > tr:hover > td { 
                        background: rgba(230, 215, 105, 0.03) !important; 
                    }
                    .premium-table .ant-spin-nested-loading {
                        min-height: 200px;
                    }

                    /* Paginación */
                    .premium-pagination .ant-pagination-item a { color: #9ca3af; }
                    .premium-pagination .ant-pagination-item-active { background: transparent; border-color: #e6d769; }
                    .premium-pagination .ant-pagination-item-active a { color: #e6d769; }

                    /* SweetAlert2 Premium */
                    .premium-swal-popup {
                        border: 1px solid rgba(255,255,255,0.05) !important;
                        border-radius: 16px !important;
                        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
                        font-family: 'Montserrat', sans-serif;
                    }
                `}} />
            </ConfigProvider>
        </AntApp>
    );
}