import React, { useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import {
    FaGavel,
    FaFileAlt,
    FaUserShield,
    FaClipboardList,
    FaLock
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
                    Asesoría en las formas de vinculación laboral
                </li>
                <li className="flex items-start gap-2">
                    <CheckCircleOutlined style={{ color: '#e6d769', marginTop: '4px' }} />
                    Verificación del cumplimiento de la normatividad laboral
                </li>
                <li className="flex items-start gap-2">
                    <CheckCircleOutlined style={{ color: '#e6d769', marginTop: '4px' }} />
                    Asesoría en la elaboración o actualización de contratos laborales
                </li>
                <li className="flex items-start gap-2">
                    <CheckCircleOutlined style={{ color: '#e6d769', marginTop: '4px' }} />
                    Revisión de contratación con terceros (proveedores y contratistas)
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
                    Manejo legal en la finalización de contratos
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
                    Asesoría en el manejo legal de datos personales y habeas data (Circular Externa 003 de 2024).
                </li>
                <li className="flex items-start gap-2">
                    <CheckCircleOutlined style={{ color: '#e6d769', marginTop: '4px' }} />
                    Redacción y actualización de acuerdos de confidencialidad.
                </li>
                <li className="flex items-start gap-2">
                    <CheckCircleOutlined style={{ color: '#e6d769', marginTop: '4px' }} />
                    Documentación de políticas legales: disminución laboral, día de la familia, vinculación de personal extranjero.
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
                    <h1 className="text-4xl md:text-5xl font-bold text-[#e6d769] mb-4 ">
                        Derecho Laboral y Seguridad Social
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
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
                            <h2 className="text-xl font-semibold text-[#e6d769] mb-2">
                                {service.title}
                            </h2>
                            <div className="text-md text-gray-200">{service.description}</div>
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

                    <div className="block sm:hidden mt-20 text-center">
                        <Link
                            to="/#servicios"
                            className="inline-block bg-gradient-to-r from-[#e6d769] to-[#95642a] text-[#001e33] font-bold py-3 px-6 rounded-full text-sm shadow-md hover:scale-105 transition duration-300"
                        >
                            <ArrowLeftOutlined style={{ fontSize: '16px' }} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DerechoLaboral;
