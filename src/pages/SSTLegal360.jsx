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
import { FaWhatsapp } from 'react-icons/fa';

const services = [
    {
        title: 'Protocolos y Manuales',
        icon: <FileTextOutlined className="text-5xl text-[#e6d769]" />,
        bullets: [
            'Protocolo para la prevención y protección del acoso laboral, sexual, violencia de género en el ámbito laboral.',
            'Protocolo de desconexión laboral.',
            'Protocolo para legalizar modalidad de teletrabajo y trabajo en casa.',
            'Protocolo de salud mental y la prevención de problemas y trastornos mentales y del consumo de sustancias psicoactivas en el entorno laboral.',
            'Manual de contratista.'
        ]
    },
    {
        title: 'Formación Legal Aplicada',
        icon: <TeamOutlined className="text-5xl text-[#e6d769]" />,
        bullets: [
            'Capacitación al Comité de Convivencia Laboral sobre sus deberes legales en materia de acoso laboral, violencia de género, salud mental.',
            'Formación sobre el procedimiento legal en caso de trabajadores bajo efectos de sustancias psicoactivas o alcohol sobre el contexto de salud mental.',
            'Capacitación a empleadores y responsables de SST en normatividad vigente, jurisprudencia y prevención de sanciones por incumplimientos legales.'
        ]
    },
    {
        title: 'Acompañamiento Legal',
        icon: <SafetyCertificateOutlined className="text-5xl text-[#e6d769]" />,
        bullets: [
            'Asesoría frente a requerimientos del Ministerio del Trabajo, actos administrativos y planes de mejora.',
            'Defensa legal en accidentes laborales graves y enfermedades laborales y situaciones críticas del área SST.',
            'Emisión de conceptos jurídicos sobre incapacidades, recomendaciones y restricciones médicas.',
            'Revisión legal de contratos de servicios con terceros.'
        ]
    }
];

const SSTLegal360 = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    return (
        // Padding ajustado: pt-10 (móvil), md:pt-32, lg:pt-36 (desktop)
        <section className="relative w-full min-h-screen overflow-hidden pt-10 md:pt-32 lg:pt-36 font-montserrat">
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

            <div className="absolute inset-0 bg-[#001e33]/85 z-10" />

            <div className="relative z-20 px-6 py-10 lg:px-24 text-white">
                <div className="max-w-6xl mx-auto text-center mb-16">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#e6d769] mb-4 tracking-tight drop-shadow-md">
                        Seguridad y Salud en el Trabajo
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto font-medium">
                        Apoyo legal integral para fortalecer el área de SST en tu empresa.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center items-stretch">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`bg-white/5 border border-white/10 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] p-8 text-center backdrop-blur-md hover:border-[#e6d769]/50 hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 w-full max-w-sm flex flex-col items-center
      ${index === 0 ? 'min-h-[380px] md:min-h-[360px]' : ''}`}
                        >
                            <div className="flex justify-center mb-6 transform hover:scale-110 transition-transform duration-300">{service.icon}</div>
                            <h2 className="text-xl sm:text-2xl font-bold text-[#e6d769] mb-6 tracking-wide uppercase">
                                {service.title}
                            </h2>

                            {service.bullets ? (
                                <ul className="text-left space-y-3 text-gray-200 text-sm w-full">
                                    {service.bullets.map((bullet, i) => (
                                        <li key={i} className="flex items-start gap-3 leading-relaxed">
                                            <CheckCircleOutlined className="text-lg flex-shrink-0" style={{ color: '#e6d769', marginTop: '2px' }} />
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

                <div className="mt-16 sm:mt-24 text-center relative z-20">
                    {/* BOTÓN DE VOLVER RESTAURADO: Transparente, borde dorado, efecto glass */}
                    <Link
                        to="/#servicios"
                        className="gap-2 bg-white/10 border border-[#d4af37] hover:bg-[#d4af37] hover:text-[#001e33] backdrop-blur-md text-[#e6d769] font-black py-2.5 px-6 rounded-full shadow-lg hover:scale-105 transition-all duration-300 fixed sm:top-32 sm:left-8 hidden sm:inline-flex items-center uppercase text-sm tracking-wider"
                    >
                        <ArrowLeftOutlined className="text-lg" />
                        <span>Volver</span>
                    </Link>

                    {/* Botón responsive (abajo) */}
                    <div className="block sm:hidden text-center z-20 w-full flex justify-center">
                        <Link
                            to="/#servicios"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d4af37] via-[#f5e27a] to-[#d4af37] text-[#001e33] font-black py-3 px-8 rounded-full text-sm shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 uppercase tracking-widest w-full max-w-[250px] justify-center"
                        >
                            <ArrowLeftOutlined className="text-lg" />
                            Regresar
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SSTLegal360;