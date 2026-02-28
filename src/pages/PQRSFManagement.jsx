import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import Swal from 'sweetalert2';
import {
    Table,
    Drawer,
    Button,
    Space,
    App as AntApp,
    ConfigProvider,
    theme,
    Avatar,
    Spin,
    Tag,
    Tooltip,
    Divider
} from 'antd';
import {
    EyeOutlined,
    DeleteOutlined,
    DownloadOutlined,
    FilePdfOutlined,
    UserOutlined,
    MailOutlined,
    PhoneOutlined,
    TagOutlined,
    LoadingOutlined,
    AlignLeftOutlined
} from '@ant-design/icons';

export default function PQRSFCrud() {
    const [registros, setRegistros] = useState([]);
    const [registroDetalle, setRegistroDetalle] = useState(null);
    const [loading, setLoading] = useState(false);

    // Paleta Premium
    const goldColor = '#e6d769';

    const fetchRegistros = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/api/pqrsf');
            const data = res.data.map(registro => {
                try {
                    registro.archivos = typeof registro.archivos === 'string'
                        ? JSON.parse(registro.archivos)
                        : Array.isArray(registro.archivos)
                            ? registro.archivos
                            : [];
                } catch (err) {
                    registro.archivos = [];
                }
                return registro;
            });
            setRegistros(data);
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
        fetchRegistros();
    }, []);

    const handleDelete = async (registro) => {
        const result = await Swal.fire({
            title: '¿Eliminar registro?',
            text: `Se eliminará la solicitud de ${registro.nombres}. Esta acción y sus archivos no se pueden recuperar.`,
            icon: 'warning',
            background: '#0a1929',
            color: '#ffffff',
            showCancelButton: true,
            confirmButtonColor: '#e11d48',
            cancelButtonColor: 'rgba(255,255,255,0.1)',
            confirmButtonText: '<span style="color:#ffffff; font-weight:600;">Sí, eliminar</span>',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'premium-swal-popup'
            }
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`/api/pqrsf/${registro.id}`);
                await Swal.fire({
                    title: 'Eliminado',
                    text: 'El registro y sus archivos han sido eliminados.',
                    icon: 'success',
                    timer: 1800,
                    showConfirmButton: false,
                    background: '#0a1929',
                    color: '#ffffff',
                    customClass: { popup: 'premium-swal-popup' }
                });
                fetchRegistros();
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

    const mostrarDetalles = (registro) => {
        setRegistroDetalle(registro);
    };

    const cerrarDrawer = () => {
        setRegistroDetalle(null);
    };

    // Icono de carga personalizado
    const antIcon = <LoadingOutlined style={{ fontSize: 24, color: goldColor }} spin />;

    const columns = [
        {
            title: 'Solicitante',
            key: 'solicitante',
            render: (_, record) => (
                <Space size="middle">
                    <Avatar 
                        size="large"
                        style={{ backgroundColor: 'rgba(230, 215, 105, 0.1)', color: goldColor, border: `1px solid ${goldColor}` }} 
                        icon={<UserOutlined />} 
                    />
                    <div className="flex flex-col">
                        <span className="font-semibold text-gray-100 text-base">{record.nombres} {record.apellidos}</span>
                        <span className="text-xs text-gray-500 font-medium tracking-wider">ID: {record.id}</span>
                    </div>
                </Space>
            ),
        },
        { 
            title: 'Contacto', 
            key: 'contacto',
            render: (_, record) => (
                <div className="flex flex-col space-y-1">
                    <span className="text-gray-300 font-light text-sm"><MailOutlined className="mr-2 text-gray-500" />{record.correo_electronico}</span>
                    <span className="text-gray-400 font-light text-sm"><PhoneOutlined className="mr-2 text-gray-500" />{record.telefono_principal}</span>
                </div>
            )
        },
        { 
            title: 'Tipo de Solicitud', 
            key: 'objeto',
            render: (_, record) => {
                // Asignamos un color sutil basado en el tipo de solicitud si es posible, por defecto usamos gold
                let tagColor = 'rgba(230, 215, 105, 0.15)';
                let textColor = goldColor;
                
                if(record.objeto?.toLowerCase().includes('queja') || record.objeto?.toLowerCase().includes('reclamo')) {
                    tagColor = 'rgba(239, 68, 68, 0.15)'; // Redish
                    textColor = '#f87171';
                } else if (record.objeto?.toLowerCase().includes('felicita')) {
                    tagColor = 'rgba(16, 185, 129, 0.15)'; // Greenish
                    textColor = '#34d399';
                }

                return (
                    <Tag 
                        className="rounded-full uppercase px-4 py-1 text-[10px] font-bold tracking-widest border-none"
                        style={{ background: tagColor, color: textColor }}
                    >
                        {record.objeto}
                    </Tag>
                )
            }
        },
        {
            title: 'Archivos',
            key: 'archivos',
            align: 'center',
            render: (_, record) => (
                record.archivos?.length > 0 ? (
                    <Tooltip title={`${record.archivos.length} archivo(s) adjunto(s)`} color="#0a1929">
                        <Tag icon={<FilePdfOutlined />} color="default" className="bg-transparent border-white/20 text-gray-300">
                            {record.archivos.length}
                        </Tag>
                    </Tooltip>
                ) : (
                    <span className="text-gray-600 text-xs italic">Ninguno</span>
                )
            )
        },
        {
            title: '',
            key: 'acciones',
            fixed: 'right',
            align: 'right',
            render: (_, record) => (
                <Space size="small">
                    {record.archivos?.length > 0 && (
                        <Tooltip title="Descargar Archivos">
                            <Button
                                icon={<DownloadOutlined />}
                                onClick={() =>
                                    record.archivos.forEach((archivoUrl) => {
                                        window.open(`${archivoUrl}?fl_attachment`, '_blank');
                                    })
                                }
                                type="text"
                                className="text-blue-400 hover:bg-blue-400/10 hover:text-blue-300 transition-all rounded-lg"
                            />
                        </Tooltip>
                    )}
                    <Tooltip title="Ver Detalles">
                        <Button 
                            type="text" 
                            icon={<EyeOutlined />} 
                            onClick={() => mostrarDetalles(record)}
                            className="text-[#e6d769] hover:bg-[#e6d769]/10 hover:text-[#e6d769] transition-all rounded-lg"
                        />
                    </Tooltip>
                    <Tooltip title="Eliminar">
                        <Button 
                            type="text" 
                            danger 
                            icon={<DeleteOutlined />} 
                            onClick={() => handleDelete(record)}
                            className="hover:bg-red-500/10 transition-all rounded-lg"
                        />
                    </Tooltip>
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
                                    Gestión de <span style={{ color: goldColor }}>PQRSF</span>
                                </h2>
                                <p className="text-gray-400 mt-2 font-light text-sm">Bandeja de entrada de Peticiones, Quejas, Reclamos y más.</p>
                            </div>
                        </div>

                        {/* VISTA DESKTOP CON ANIMACIÓN */}
                        <div className="hidden lg:block glass-panel rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up">
                            <Table
                                columns={columns}
                                dataSource={registros}
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
                                    {registros.map((record) => (
                                        <div key={record.id} className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#e6d769] opacity-[0.03] rounded-bl-full pointer-events-none"></div>
                                            
                                            <div className="flex justify-between items-start mb-5 relative z-10">
                                                <Space size="middle">
                                                    <Avatar size="large" style={{ backgroundColor: 'rgba(230, 215, 105, 0.1)', color: goldColor, border: `1px solid rgba(230, 215, 105, 0.3)` }} icon={<UserOutlined />} />
                                                    <div>
                                                        <h4 className="text-gray-100 font-semibold text-lg m-0">{record.nombres}</h4>
                                                        <span className="text-[10px] text-[#e6d769] uppercase tracking-widest">{record.objeto}</span>
                                                    </div>
                                                </Space>
                                            </div>
                                            
                                            <div className="space-y-3 text-sm relative z-10">
                                                <div className="flex justify-between items-center bg-white/[0.02] p-3 rounded-lg border border-white/[0.02]">
                                                    <span className="text-gray-500 font-light"><MailOutlined className="mr-2"/>Correo</span>
                                                    <span className="text-gray-300 font-medium truncate ml-2">{record.correo_electronico}</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-white/[0.02] p-3 rounded-lg border border-white/[0.02]">
                                                    <span className="text-gray-500 font-light"><PhoneOutlined className="mr-2"/>Teléfono</span>
                                                    <span className="text-gray-300 font-medium ml-2">{record.telefono_principal}</span>
                                                </div>
                                                
                                                {/* Botones de acción móvil */}
                                                <div className="flex justify-between pt-4 mt-2 border-t border-white/[0.05]">
                                                    <Button 
                                                        type="text" 
                                                        icon={<EyeOutlined />} 
                                                        onClick={() => mostrarDetalles(record)}
                                                        className="text-[#e6d769] bg-[#e6d769]/5 hover:bg-[#e6d769]/10 rounded-lg flex-1 mr-2"
                                                    >
                                                        Ver Detalle
                                                    </Button>
                                                    <Button 
                                                        type="text" 
                                                        danger 
                                                        icon={<DeleteOutlined />} 
                                                        onClick={() => handleDelete(record)}
                                                        className="bg-red-500/5 hover:bg-red-500/10 rounded-lg"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* DRAWER PREMIUM PARA DETALLES */}
                    <Drawer
                        title={<span className="text-lg font-semibold tracking-wide" style={{ color: goldColor }}>Detalles de la Solicitud</span>}
                        placement="right"
                        onClose={cerrarDrawer}
                        open={!!registroDetalle}
                        width={window.innerWidth < 768 ? '100%' : 480}
                        bodyStyle={{ background: '#0a1929', padding: '0' }}
                        headerStyle={{ background: '#0a1929', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                        closeIcon={<span className="text-gray-400 hover:text-white transition-colors">✕</span>}
                    >
                        {registroDetalle && (
                            <div className="p-6 space-y-6 premium-font text-gray-300">
                                
                                {/* Info Principal */}
                                <div className="flex items-center space-x-4 mb-8">
                                    <Avatar size={64} style={{ backgroundColor: 'rgba(230, 215, 105, 0.1)', color: goldColor, border: `1px solid ${goldColor}` }} icon={<UserOutlined />} />
                                    <div>
                                        <h3 className="text-xl font-bold text-white m-0">{registroDetalle.nombres} {registroDetalle.apellidos}</h3>
                                        <Tag color="gold" className="mt-1 border-none bg-[#e6d769]/10 text-[#e6d769] uppercase text-[10px] tracking-widest">{registroDetalle.objeto}</Tag>
                                    </div>
                                </div>

                                {/* Bloques de información */}
                                <div className="bg-white/[0.02] p-4 rounded-xl border border-white/[0.05] space-y-4">
                                    <div>
                                        <span className="text-gray-500 text-xs uppercase tracking-wider font-semibold block mb-1">Correo Electrónico</span>
                                        <div className="flex items-center text-gray-200">
                                            <MailOutlined className="mr-2 text-[#e6d769]" /> {registroDetalle.correo_electronico}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 text-xs uppercase tracking-wider font-semibold block mb-1">Teléfono Principal</span>
                                        <div className="flex items-center text-gray-200">
                                            <PhoneOutlined className="mr-2 text-[#e6d769]" /> {registroDetalle.telefono_principal}
                                        </div>
                                    </div>
                                </div>

                                <Divider style={{ borderColor: 'rgba(255,255,255,0.05)' }} />

                                {/* Descripción del problema */}
                                <div>
                                    <span className="text-gray-500 text-xs uppercase tracking-wider font-semibold block mb-3">
                                        <AlignLeftOutlined className="mr-2" />
                                        Descripción del caso
                                    </span>
                                    <div className="bg-black/30 p-5 rounded-xl border border-white/[0.02] text-sm leading-relaxed text-gray-300 italic">
                                        "{registroDetalle.descripcion}"
                                    </div>
                                </div>

                                {/* Archivos Adjuntos */}
                                {registroDetalle.archivos?.length > 0 && (
                                    <div className="pt-4">
                                        <span className="text-gray-500 text-xs uppercase tracking-wider font-semibold block mb-3">
                                            Evidencia / Archivos Adjuntos ({registroDetalle.archivos.length})
                                        </span>
                                        <div className="space-y-2">
                                            {registroDetalle.archivos.map((archivoUrl, idx) => (
                                                <a
                                                    key={idx}
                                                    href={`${archivoUrl}?fl_attachment`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all group text-blue-400 no-underline"
                                                >
                                                    <FilePdfOutlined className="text-2xl mr-3 group-hover:scale-110 transition-transform" />
                                                    <div className="flex-1">
                                                        <span className="block text-sm font-semibold">Documento Adjunto {idx + 1}</span>
                                                        <span className="block text-xs text-blue-300/60">Haz clic para descargar</span>
                                                    </div>
                                                    <DownloadOutlined className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </Drawer>
                </div>

                <style dangerouslySetInnerHTML={{ __html: `
                    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

                    .premium-font {
                        font-family: 'Montserrat', sans-serif;
                    }

                    /* --- ANIMACIONES CSS PURAS --- */
                    @keyframes fadeInUp {
                        from { opacity: 0; transform: translateY(30px); }
                        to { opacity: 1; transform: translateY(0); }
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