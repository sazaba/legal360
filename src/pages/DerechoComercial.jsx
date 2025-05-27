import React, { useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import {
    AiOutlineSchedule,
    AiOutlineGlobal,
    AiOutlineCustomerService,
    AiOutlineLock
} from 'react-icons/ai';
import { ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons';

import v1 from '../assets/videos/lawyer.mp4';
import { FaWhatsapp } from 'react-icons/fa';

const sections = [
    {
        title: 'Asesoría Comercial',
        icon: <AiOutlineSchedule className="text-5xl text-[#e6d769]" />,
        bullets: [
            'Elaboración y/o revisión de procedimientos comerciales internos.',
            'Revisión y validación legal de contratos y ofertas comerciales.',
            'Asesoría en el manejo de pólizas operativas.',
            'Contratación legal con terceros conforme a la normativa vigente.'
        ]
    },
    {
        title: 'Entorno Digital y Publicidad',
        icon: <AiOutlineGlobal className="text-5xl text-[#e6d769]" />,
        bullets: [
            'Documentación legal de sitios web y redes sociales empresariales (Términos y Condiciones, Avisos de Privacidad, Cookies, etc.).',
            'Capacitación sobre el uso adecuado de la publicidad en redes sociales, según las normas de protección al consumidor.'
        ]
    },
    {
        title: 'Atención al Cliente y Cumplimiento',
        icon: <AiOutlineCustomerService className="text-5xl text-[#e6d769]" />,
        bullets: [
            'Asesoría y diseño del procedimiento de peticiones, quejas, reclamos, sugerencias y felicitaciones (PQRSF).',
            'Emisión de conceptos jurídicos en materia comercial, contractual y de cumplimiento.'
        ]
    },
    {
        title: 'Protección de Datos',
        icon: <AiOutlineLock className="text-5xl text-[#e6d769]" />,
        bullets: [
            'Actualización documental sobre protección de datos personales de clientes, proveedores y contratistas, según la Ley 1581, Decreto 1367 de 2013 y Circular Externa 003 de 2024.',
            'Elaboración y revisión de acuerdos de confidencialidad con terceros.'
        ]
    }
];

const DerechoComercial = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    return (
        <section className="relative w-full min-h-screen overflow-hidden pt-10">
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
                    <h1 className="text-3xl md:text-4xl font-bold text-[#e6d769] mb-4">
                        Derecho Comercial
                    </h1>
                    <p className="text-md md:text-lg text-gray-200 max-w-3xl mx-auto">
                        Servicios clave para fortalecer y proteger tu actividad empresarial.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center items-stretch">
                    {sections.map((section, index) => (
                        <div
                            key={index}
                            className="bg-white/10 rounded-2xl shadow-md p-6 text-center backdrop-blur-md hover:scale-105 transition-transform duration-300 w-full max-w-sm"
                        >
                            <div className="flex justify-center mb-4">{section.icon}</div>
                            <h2 className="text-lg font-semibold text-[#e6d769] mb-2">
                                {section.title}
                            </h2>
                            <ul className="text-left space-y-2 text-gray-200 text-sm">
                                {section.bullets.map((item, i) => (
                                    <li key={i} className="flex gap-2">
                                        <CheckCircleOutlined style={{ color: '#e6d769', marginTop: '4px' }} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
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

export default DerechoComercial;
