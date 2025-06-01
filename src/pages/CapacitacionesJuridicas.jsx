import React, { useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons';
import v1 from '../assets/videos/V6.mp4';
import { FaWhatsapp } from 'react-icons/fa';

const CapacitacionesJuridicas = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    const cards = [
        {
            title: 'Asesoría para trámites Pensión',
            items: [
                'Pensión de vejez ante Colpensiones o fondos privados.',
                'Pensión por invalidez, con o sin dictamen de pérdida de capacidad laboral.',
                'Pensión de sobrevivientes (viudos(as), hijos, padres dependientes).',
                'Análisis del cumplimiento de requisitos y acompañamiento durante el proceso.'
            ]
        },
        {
            title: 'Cálculo y revisión financiera',
            items: [
                'Revisión de historia laboral para validar semanas cotizadas.',
                'Cálculo actuarial para traslado de régimen pensional',
                'Estimación de retroactivo pensional y simulaciones del valor a recibir.'
            ]
        },
        {
            title: 'Defensa y recursos legales',
            items: [
                'Interposición de recursos ante la Junta Regional o Nacional de Calificación de Invalidez.',
                'Representación en controversias relacionadas con pérdida de capacidad laboral.',
                'Revisión de inconsistencias y soporte documental en procesos de reclamación.'
            ]
        }
    ];

    return (
        <section className="relative w-full min-h-screen overflow-hidden pt-10">
            {/* Video de fondo */}
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

            {/* Capa oscura */}
            <div className="absolute inset-0 bg-[#001e33]/70 z-10" />

            {/* Contenido */}
            <div className="relative z-20 px-6 py-10 sm:px-12 lg:px-24 text-white text-center">
                <div className="max-w-6xl mx-auto mb-12">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#e6d769] mb-4">
                        Pensiones
                    </h1>
                    <p className="text-md sm:text-lg md:text-lg text-gray-200 max-w-4xl mx-auto">
                        Asesoría jurídica integral en pensiones, revisión financiera y defensa legal.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white/10 rounded-2xl shadow-md p-6 text-left backdrop-blur-md hover:scale-105 transition-transform duration-300"
                        >
                            <h2 className="text-lg font-semibold text-[#e6d769] mb-4">{card.title}</h2>
                            <ul className="space-y-3 text-sm text-gray-100">
                                {card.items.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <CheckCircleOutlined style={{ color: '#e6d769', marginTop: '4px' }} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Botón volver */}
                <div className="mt-10 sm:mt-12">
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

            {/* Botón WhatsApp */}
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

export default CapacitacionesJuridicas;
