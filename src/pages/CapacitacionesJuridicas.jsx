import React, { useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { BulbOutlined, ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons';
import v1 from '../assets/videos/V6.mp4';

const CapacitacionesJuridicas = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

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
                {/* Título estático */}
                <div className="max-w-6xl mx-auto mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#e6d769] mb-4">
                        Capacitaciones Jurídicas Empresariales
                    </h1>
                    <p className="text-lg sm:text-xl md:text-xl text-gray-200 max-w-4xl mx-auto">
                        Diseñamos y facilitamos formación legal para fortalecer competencias, prevenir riesgos y responder a los principales desafíos jurídicos que enfrentan las empresas hoy.
                    </p>
                </div>

                {/* Tarjeta única descriptiva */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/10 rounded-2xl shadow-md p-6 sm:p-8 text-left backdrop-blur-md hover:scale-105 transition-transform duration-300 w-full">
                        <p className="text-base sm:text-lg md:text-lg text-gray-100 leading-relaxed mb-4">
                            En Legal 360 S.A.S diseñamos y facilitamos seminarios, talleres y capacitaciones jurídicas especializadas dirigidas a empleadores, áreas de talento humano, Seguridad y Salud en el Trabajo (SST) y líderes de procesos. Nuestro objetivo es fortalecer competencias legales, mantener a tu equipo actualizado frente a los cambios normativos y prevenir riesgos jurídicos en la gestión del personal y las operaciones empresariales:
                        </p>
                        <ul className="text-base sm:text-lg text-gray-100 leading-relaxed space-y-3 pl-6 sm:pl-10 md:pl-20">
                            <li className="flex items-start gap-2">
                                <CheckCircleOutlined style={{ color: '#e6d769', marginTop: '4px' }} />
                                Nuevas licencias laborales obligatorias
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircleOutlined style={{ color: '#e6d769', marginTop: '4px' }} />
                                Gestión legal de incapacidades prolongadas
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircleOutlined style={{ color: '#e6d769', marginTop: '4px' }} />
                                Manejo legal de prepensionados y estabilidad laboral reforzada
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircleOutlined style={{ color: '#e6d769', marginTop: '4px' }} />
                                Procedimiento legal en casos de acoso laboral o sexual
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircleOutlined style={{ color: '#e6d769', marginTop: '4px' }} />
                                Reincorporación laboral por enfermedad, accidente o maternidad
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Botón para volver */}
                <div className="mt-8 sm:mt-12">
                    <Link
                        to="/#servicios"
                        className="gap-2 bg-[#e6d769] hover:bg-[#f1e28c] text-[#001e33] font-bold py-2 px-5 rounded-full shadow-md hover:scale-105 transition duration-300 fixed sm:top-24 sm:left-6 hidden sm:inline-flex"
                    >
                        <ArrowLeftOutlined />
                        <span>Volver</span>
                    </Link>

                    <div className="block sm:hidden mt-12 text-center">
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

export default CapacitacionesJuridicas;
