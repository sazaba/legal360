import React, { useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import {
    FaGavel,
    FaFileAlt,
    FaUserShield,
    FaClipboardList,
    FaLock,
    FaWhatsapp
} from 'react-icons/fa';

import { ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons';
import v1 from '../assets/videos/v1.mp4';

const services = [
    {
        title: 'Asesoría Laboral',
        icon: <FaUserShield className="text-5xl text-[#e6d769]" />,
        description: (
            <ul className="text-left space-y-2">
                <li className="flex items-start gap-2">
                    <CheckCircleOutlined style={{ color: '#e6d769', marginTop: '4px' }} />
                    Asesoría en las diferentes formas de contratación laboral que más convengan a sus intereses.
                </li>
                <li className="flex items-start gap-2">
                    <CheckCircleOutlined style={{ color: '#e6d769', marginTop: '4px' }} />
                    Verificación del cumplimiento de la normatividad laboral.
                </li>
                <li className="flex items-start gap-2">
                    <CheckCircleOutlined style={{ color: '#e6d769', marginTop: '4px' }} />
                    Asesoría en la elaboración o actualización de contratos laborales.
                </li>
                <li className="flex items-start gap-2">
                    <CheckCircleOutlined style={{ color: '#e6d769', marginTop: '4px' }} />
                    Revisión de contratación con terceros (proveedores y contratistas).
                </li>
            </ul>
        )
    },
    {
        title: 'Procesos Disciplinarios y Documentación Interna',
        icon: <FaGavel className="text-5xl text-[#e6d769]" />,
        description: (
            <ul className="text-left space-y-2">
                <li className="flex items-start gap-2">
                    <CheckCircleOutlined style={{ color: '#e6d769', marginTop: '4px' }} />
                    Elaboración y/o actualización del Reglamento de Trabajo.
                </li>
                <li className="flex items-start gap-2">
                    <CheckCircleOutlined style={{ color: '#e6d769', marginTop: '4px' }} />
                    Elaboración y actualización de Manuales de funciones.
                </li>
                <li className="flex items-start gap-2">
                    <CheckCircleOutlined style={{ color: '#e6d769', marginTop: '4px' }} />
                    Actualización del procedimiento disciplinario: minutas de citación a descargos, diligencias, decisiones y recursos.
                </li>
                <li className="flex items-start gap-2">
                    <CheckCircleOutlined style={{ color: '#e6d769', marginTop: '4px' }} />
                    Manejo legal en la finalización de contratos.
                </li>
            </ul>
        )
    },
    {
        title: 'Seguridad Social',
        icon: <FaClipboardList className="text-5xl text-[#e6d769]" />,
        description: (
            <ul className="text-left space-y-2">
                <li className="flex items-start gap-2">
                    <CheckCircleOutlined style={{ color: '#e6d769', marginTop: '4px' }} />
                    Auditoría legal de la nómina y pagos a seguridad social.
                </li>
                <li className="flex items-start gap-2">
                    <CheckCircleOutlined style={{ color: '#e6d769', marginTop: '4px' }} />
                    Asesoría en trámites de registro, radicación y pago de incapacidades.
                </li>
                <li className="flex items-start gap-2">
                    <CheckCircleOutlined style={{ color: '#e6d769', marginTop: '4px' }} />
                    Actualización de procedimientos de permisos, licencias e incapacidades.
                </li>
            </ul>
        )
    },
    {
        title: 'Normativa y Cumplimiento Legal',
        icon: <FaLock className="text-5xl text-[#e6d769]" />,
        description: (
            <ul className="text-left space-y-2">
                <li className="flex items-start gap-2">
                    <CheckCircleOutlined style={{ color: '#e6d769', marginTop: '4px' }} />
                    Implementación de datos personales y habeas data.
                </li>
                <li className="flex items-start gap-2">
                    <CheckCircleOutlined style={{ color: '#e6d769', marginTop: '4px' }} />
                    Redacción y actualización de acuerdos de confidencialidad.
                </li>
                <li className="flex items-start gap-2">
                    <CheckCircleOutlined style={{ color: '#e6d769', marginTop: '4px' }} />
                    Documentación de políticas legales al interior de la empresa.
                </li>
                <li className="flex items-start gap-2">
                    <CheckCircleOutlined style={{ color: '#e6d769', marginTop: '4px' }} />
                    Estructuración documental de programas de bienestar laboral.
                </li>
            </ul>
        )
    }
];

const DerechoLaboral = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    return (
        <section className="relative w-full min-h-screen overflow-hidden pt-6">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src={v1} type="video/mp4" />
                Tu navegador no soporta el video.
            </video>

            <div className="absolute inset-0 bg-[#001e33]/60 z-10" />

            <div className="relative z-20 px-6 py-20 lg:px-24 text-white">
                <div className="max-w-6xl mx-auto text-center mb-16">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#e6d769] mb-4 ">
                        Derecho Laboral y Seguridad Social
                    </h1>
                    <p className="text-md md:text-lg text-gray-200 max-w-3xl mx-auto">
                        Eficiencia Laboral Entre Tu Empresa y Tus Colaboradores
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center items-stretch">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white/10 rounded-2xl shadow-md p-6 text-center backdrop-blur-md hover:scale-105 transition-transform duration-300 w-full max-w-md"
                        >
                            <div className="flex justify-center mb-4">{service.icon}</div>
                            <h2 className="text-lg font-semibold text-[#e6d769] mb-2">
                                {service.title}
                            </h2>
                            <div className="text-sm text-gray-200">{service.description}</div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <Link
                        to="/#servicios"
                        className="gap-2 bg-[#e6d769] hover:bg-[#f1e28c] text-[#001e33] font-bold py-2 px-5 rounded-full shadow-md hover:scale-105 transition duration-300 fixed sm:top-24 sm:left-6 hidden sm:inline-flex"
                    >
                        <ArrowLeftOutlined />
                        <span>Volver</span>
                    </Link>

                    <div className="block sm:hidden mt-20 text-center z-20">
                        <Link
                            to="/#servicios"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d4af37] via-[#f5e27a] to-[#95642a] text-[#001e33] font-semibold py-2 px-5 rounded-full text-sm shadow-md hover:scale-105 transition-all duration-300"
                        >
                            <ArrowLeftOutlined className="text-base" />
                            Regresar
                        </Link>
                    </div>
                </div>
            </div>
            <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 p-4 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl animate-bounce z-50"
                style={{
                    background: 'linear-gradient(135deg, #d4af37 0%, #f5e27a 50%, #d4af37 100%)',
                    color: '#001e33',
                }}
            >
                <FaWhatsapp className="text-2xl sm:text-3xl" />
            </a>
        </section>
    );
};

export default DerechoLaboral;
