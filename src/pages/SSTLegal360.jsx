import React, { useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import {
    FileTextOutlined,
    TeamOutlined,
    SafetyCertificateOutlined,
    ArrowLeftOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';
import v1 from '../assets/videos/v5.mp4';

const services = [
    {
        title: 'Protocolos y Políticas Legales',
        icon: <FileTextOutlined className="text-5xl text-[#e6d769]" />,
        bullets: [
            'Elaboración del protocolo y política para la prevención, atención y protección del acoso laboral, sexual, violencia basada en género y discriminación contra mujeres y personas LGBTIQ+ en el ámbito laboral',
            'Documentación del protocolo y política de desconexión laboral',
            'Elaboración del protocolo para teletrabajo y trabajo en casa'
        ]
    },
    {
        title: 'Formación Legal Aplicada',
        icon: <TeamOutlined className="text-5xl text-[#e6d769]" />,
        bullets: [
            'Capacitación al Comité de Convivencia Laboral sobre sus deberes legales en materia de acoso, género y diversidad.',
            'Formación sobre el procedimiento legal en caso de trabajadores bajo efectos de sustancias psicoactivas o alcohol',
            'Capacitación a empleadores y responsables de SST en normatividad vigente, jurisprudencia y prevención de sanciones por incumplimientos legales.'
        ]
    },
    {
        title: 'Acompañamiento Legal',
        icon: <SafetyCertificateOutlined className="text-5xl text-[#e6d769]" />,
        bullets: [
            'Asesoría frente a requerimientos del Ministerio del Trabajo, actos administrativos y planes de mejora.',
            'Defensa legal en accidentes laborales graves y enfermedades laborales y situaciones críticas del área SST.',
            'Emisión de conceptos jurídicos sobre incapacidades y restricciones médicas.',
            'Revisión legal de contratos de servicios con terceros.'
        ]
    }
];

const SSTLegal360 = () => {
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

            <div className="absolute inset-0 bg-[#001e33]/70 z-10" />

            <div className="relative z-20 px-6 py-10 lg:px-24 text-white">
                <div className="max-w-6xl mx-auto text-center mb-16">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#e6d769] mb-4">
                        Seguridad y Salud en el Trabajo
                    </h1>
                    <p className="text-sm sm:text-md md:text-lg text-gray-200 max-w-3xl mx-auto">
                        Apoyo legal integral para fortalecer el área de SST en tu empresa.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center items-stretch">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`bg-white/10 rounded-2xl shadow-md p-6 text-center backdrop-blur-md hover:scale-105 transition-transform duration-300 w-full max-w-sm 
      ${index === 0 ? 'min-h-[440px] md:min-h-[400px]' : ''}`}
                        >
                            <div className="flex justify-center mb-4">{service.icon}</div>
                            <h2 className="text-lg sm:text-2xl font-semibold text-[#e6d769] mb-4">
                                {service.title}
                            </h2>

                            {service.bullets ? (
                                <ul className="text-left space-y-2 text-gray-200 text-sm sm:text-sm">
                                    {service.bullets.map((bullet, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <CheckCircleOutlined style={{ color: '#e6d769', marginTop: '4px' }} />
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-base sm:text-lg text-gray-200">{service.description}</p>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-16 sm:mt-20 text-center">
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

export default SSTLegal360;
